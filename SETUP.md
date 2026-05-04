# Meta CAPI Custom Backend — Setup Guide

Custom Conversions API integration for Lensmind. EMQ target: 9.0+. Maintained by Claude.

---

## What this does

Sends conversion events to Meta server-to-server, bypassing iOS/ad blocker/Safari tracking restrictions. Pixel-only setups lose 40-60% of conversions in 2026 — this gets you back to ~95-100%.

**Architecture:**
- Browser pixel fires events normally (sets cookies, real-time tracking)
- For each event, server endpoint `/api/meta-capi/track` ALSO fires the same event with the same `event_id` → Meta dedupes within 48h
- For Purchase: Shopify `orders/paid` webhook → server fires Purchase to CAPI using `order_id` as event_id (more reliable than thank-you-page pixel)

**Files added:**
```
lib/meta-capi.ts                              ← Core CAPI SDK
lib/shopify-webhook.ts                        ← HMAC verification
lib/fbq-helpers.ts                            ← Client helpers (fbp/fbc, event_id)
app/api/meta-capi/track/route.ts              ← Generic event endpoint
app/api/webhooks/shopify-order/route.ts       ← Shopify Purchase webhook
components/MetaPixel.tsx                      ← React pixel component
```

---

## Step 1 — Drop files into your repo

Copy each file into your Next.js project at the matching path. The imports use `@/lib/...` and `@/components/...` — make sure your `tsconfig.json` has the path alias:

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}
```

If you're on **Pages Router** instead of App Router, the API routes need to move:
- `app/api/meta-capi/track/route.ts` → `pages/api/meta-capi/track.ts` (export default handler instead of named POST)
- `app/api/webhooks/shopify-order/route.ts` → `pages/api/webhooks/shopify-order.ts`

If you confirm which router, Claude can rewrite these.

---

## Step 2 — Get Meta credentials

### 2a. Pixel ID (you may already have one)

1. Go to https://business.facebook.com/events_manager
2. Pick your pixel (or create one if not yet — name it `Lensmind`)
3. Copy the **Pixel ID** (a 15-16 digit number)

### 2b. CAPI Access Token

1. In Events Manager, select your pixel → **Settings** tab
2. Scroll to **Conversions API** section
3. Click **Generate access token** (or "Set up manually" → "Generate access token")
4. Copy the token immediately — Meta won't show it again. Store securely.

> The token is long-lived but can be revoked. If you ever need to rotate it, generate a new one and update the env var.

### 2c. (Optional but recommended) Test Event Code

1. In Events Manager → **Test Events** tab
2. Copy the test event code (starts with `TEST`)
3. Use this in **dev only** — it routes events to the Test Events panel instead of production. Lets you verify everything works before sending real signal.

---

## Step 3 — Configure Shopify webhook

### 3a. Create the webhook

1. Shopify Admin → **Settings** → **Notifications**
2. Scroll to bottom → **Webhooks** → **Create webhook**
3. Configure:
   - **Event:** `Order payment` (this is the `orders/paid` topic)
   - **Format:** JSON
   - **URL:** `https://lensmind.lat/api/webhooks/shopify-order`
   - **Webhook API version:** Latest stable (e.g. 2025-04)
4. Save

### 3b. Get the webhook secret

After creating the webhook, scroll back to top of the Webhooks section. There's a line:
> **All your webhooks will be signed with `[long_string]` so you can verify their integrity**

Copy that string. This is your `SHOPIFY_WEBHOOK_SECRET`.

> ⚠️ This is ONE shared secret for ALL webhooks in your store, not per-webhook.

---

## Step 4 — Set environment variables on Netlify

Netlify → Site settings → **Environment variables** → Add:

| Name | Value | Where to use |
|------|-------|--------------|
| `META_PIXEL_ID` | Your pixel ID (e.g. `1234567890123456`) | Server only |
| `META_CAPI_TOKEN` | The access token from step 2b | Server only — NEVER expose |
| `META_TEST_EVENT_CODE` | Test code (only set in dev/staging) | Server only — REMOVE for production |
| `SHOPIFY_WEBHOOK_SECRET` | The secret from step 3b | Server only |
| `NEXT_PUBLIC_META_PIXEL_ID` | Your pixel ID (same as above) | Client-side, OK to expose |

Click **Save** then trigger a redeploy (or push a commit).

> The client variable is `NEXT_PUBLIC_*` because it loads in the browser. The server token is NOT prefixed because it must stay server-side.

---

## Step 5 — Mount the pixel in your app

### App Router (`app/layout.tsx`):

```tsx
import { MetaPixel } from '@/components/MetaPixel';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID!} />
        {children}
      </body>
    </html>
  );
}
```

This automatically fires `PageView` (browser + CAPI with shared event_id) on first load.

---

## Step 6 — Fire events in your pages

### Product page (`ViewContent`)

```tsx
'use client';
import { useEffect } from 'react';
import { fireMetaEvent } from '@/lib/fbq-helpers';

export default function ProductPage({ product }: { product: Product }) {
  useEffect(() => {
    fireMetaEvent({
      eventName: 'ViewContent',
      customData: {
        currency: 'USD',
        value: product.price,
        contentIds: [product.shopifyVariantId],
        contentName: product.title,
        contentCategory: 'Smart Glasses',
        contentType: 'product',
      },
    });
  }, [product]);

  return /* ... */;
}
```

### Add to Cart button

```tsx
import { fireMetaEvent, persistTrackingToShopifyCart } from '@/lib/fbq-helpers';

async function handleAddToCart(product: Product) {
  // 1. Fire Meta event (browser + CAPI)
  await fireMetaEvent({
    eventName: 'AddToCart',
    customData: {
      currency: 'USD',
      value: product.price,
      contentIds: [product.shopifyVariantId],
      contentName: product.title,
      contentType: 'product',
      numItems: 1,
    },
  });

  // 2. Persist fbp/fbc into Shopify cart so Purchase webhook has them
  await persistTrackingToShopifyCart();

  // 3. Your existing add-to-cart logic
  await addToShopifyCart(product);
}
```

### Checkout button (`InitiateCheckout`)

```tsx
async function handleCheckout(cart: Cart) {
  await fireMetaEvent({
    eventName: 'InitiateCheckout',
    customData: {
      currency: 'USD',
      value: cart.total,
      contentIds: cart.items.map((i) => i.variantId),
      numItems: cart.items.reduce((sum, i) => sum + i.quantity, 0),
      contents: cart.items.map((i) => ({
        id: i.variantId,
        quantity: i.quantity,
        item_price: i.price,
      })),
    },
  });

  // Make sure tracking attributes are persisted before redirecting
  await persistTrackingToShopifyCart();

  // Redirect to Shopify checkout
  window.location.href = cart.checkoutUrl;
}
```

### Purchase event — DON'T fire from your code

Purchase is fired automatically by `/api/webhooks/shopify-order` when Shopify sends the `orders/paid` webhook. The event_id is `shopify_order_{order.id}`.

If you ALSO want a browser pixel Purchase on the thank-you page (recommended for redundancy), add a Shopify Web Pixel that fires:

```js
fbq('track', 'Purchase', { ... }, { eventID: 'shopify_order_' + order.id });
```

The matching event_id makes Meta dedupe the two correctly.

---

## Step 7 — Verify it's working

### 7a. Test Events panel (BEFORE going live)

Set `META_TEST_EVENT_CODE` in Netlify, redeploy, then:

1. Open https://business.facebook.com/events_manager → your pixel → **Test events**
2. Visit your site
3. You should see events appear in real time within 5 seconds:
   - `PageView` — browser + server
   - `ViewContent` — when you visit a product page
   - `AddToCart` — when you add to cart
   - `Purchase` — after a real test order (use Shopify test mode or a $1 product)

For Purchase: Shopify lets you create a "Bogus Gateway" test order. Or use a real card with a $1 cart and refund yourself.

**What to look for:**
- Each event appears as **2 entries** (one "Browser", one "Server") — that's correct
- Both have the **same event_id** → "Deduplicated" badge
- "Server" entries show a populated **user_data** object with hashed values

### 7b. Event Match Quality (EMQ) score

After ~24h of real traffic:

1. Events Manager → your pixel → **Overview**
2. Look at **Event Match Quality** for Purchase

| Score | Status | Action |
|-------|--------|--------|
| 9.0+ | Excellent | You're done |
| 7.0-8.9 | Good | Acceptable |
| 6.0-6.9 | OK | Improve — see troubleshooting |
| <6.0 | Poor | Fix immediately |

### 7c. Remove test event code for production

Once verified, **remove `META_TEST_EVENT_CODE` from Netlify env vars** and redeploy. Otherwise your real events keep going to Test Events instead of production!

---

## Troubleshooting

### "HMAC verification failed" in Shopify webhook logs

- Wrong `SHOPIFY_WEBHOOK_SECRET`. Copy it again from Shopify Admin → Notifications.
- Webhook payload was modified by middleware. Make sure no body parser runs before the route — the App Router handler reads `req.text()` raw.

### Events show in browser but not server in Test Events

- Check Netlify function logs: Site → **Functions** → `meta-capi/track` (or similar)
- Look for `[meta-capi] API error` — Meta tells you what's wrong (e.g., "Invalid access token")
- Verify `META_PIXEL_ID` and `META_CAPI_TOKEN` env vars are set and the deploy was triggered after setting them

### EMQ is below 7

You're missing customer parameters. Check what's being sent:
- For browse events (PageView, ViewContent), EMQ is naturally lower (no email yet) — that's OK
- For Purchase, EMQ should be 9+ because you have email, name, address, phone from the order
- If Purchase EMQ is low: check Shopify webhook payload includes a `customer` object with email and name

### Purchase fires twice (double-counting)

- Check that the thank-you page pixel is using `eventID: 'shopify_order_' + order.id` (string with prefix)
- If your existing Shopify Web Pixel doesn't include the order_id with the prefix, Meta won't dedupe
- Verify in Test Events that both Purchase entries share the same event_id

### `fbp` / `fbc` missing in Purchase events

- The cart attributes flow isn't running. Check that `persistTrackingToShopifyCart()` is called when the user adds to cart
- Verify the Shopify order's `note_attributes` array contains `_fbp`, `_fbc` keys after a real test order
- The Shopify Cart API endpoint is `/cart/update.js` and it must be called from the same domain (no CORS issues)

### Webhook taking >5s and Shopify retries

- Don't `await` slow operations. The CAPI request itself is fast (~200-500ms) which is fine.
- If you see retries (same order_id firing 2x within seconds), that's Shopify retry — your handler is too slow OR returned non-200. Check logs.

### Token expired / "OAuthException" from Meta

- Generate a new access token in Events Manager → Conversions API → **Generate**
- Update `META_CAPI_TOKEN` in Netlify and redeploy

---

## Maintenance

**When something might break:**
1. Meta deprecates an API version (every ~2 years). You'll see warnings in Events Manager. Update `META_API_VERSION` in `lib/meta-capi.ts`.
2. Shopify changes webhook payload (rare, breaking changes are usually announced 12+ months ahead).
3. Meta changes hashing/normalization rules (very rare).

**Health checks to run weekly:**
- Events Manager → **Diagnostics** tab → fix any flagged issues
- Check EMQ score is stable
- Cross-check Meta-reported Purchases with Shopify Orders count (should be within 5%)

**When to ping Claude:**
- EMQ drops without obvious cause
- Webhook starts returning errors in Netlify logs
- New event type needed (e.g., subscription, upsell)
- Migrating to a new pixel / multiple pixels
- Adding TikTok / Google CAPI alongside (the `lib/meta-capi.ts` pattern can be adapted in ~1h)

---

## What's next after this is live

1. **Verify EMQ ≥ 8 after 48h of real traffic** (or 5-10 real test orders)
2. **Remove `META_TEST_EVENT_CODE`** env var to switch to production
3. **Set up Aggregated Event Measurement** (AEM): Events Manager → Aggregated Event Measurement → drag your 8 events in priority order (Purchase first)
4. **Verify domain** if not done yet: Business Manager → Brand Safety → Domains → add `lensmind.lat` and complete DNS or meta tag verification
5. Now you can launch ads with confidence that your pixel data is clean
