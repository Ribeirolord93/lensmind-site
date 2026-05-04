/**
 * /api/webhooks/shopify-order
 *
 * Receives Shopify "orders/paid" webhook and fires the Purchase event to Meta CAPI.
 *
 * Why this is the source of truth for Purchase (vs browser pixel):
 *   - Server-to-server: ad blockers, iOS, browser closing don't matter
 *   - Has the real order total, currency, line items
 *   - Fires exactly once per paid order (no double-counting)
 *
 * Deduplication with browser Purchase event:
 *   - We use the Shopify order_id as event_id
 *   - The thank-you page pixel ALSO fires Purchase with order_id as event_id
 *   - Meta dedupes within 48h window
 *
 * IMPORTANT: Shopify expects a 200 response within 5 seconds, otherwise it retries.
 * Keep this handler fast — fire CAPI request but don't await on slow operations.
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendCapiEvent, type CapiEvent } from '@/lib/meta-capi';
import { verifyShopifyHmac, extractTrackingAttributes } from '@/lib/shopify-webhook';

export const runtime = 'nodejs';

// ============================================================================
// SHOPIFY ORDER PAYLOAD (subset of what we use)
// ============================================================================

interface ShopifyLineItem {
  product_id: number;
  variant_id: number;
  sku?: string;
  title: string;
  quantity: number;
  price: string; // Shopify sends prices as strings
}

interface ShopifyAddress {
  first_name?: string;
  last_name?: string;
  address1?: string;
  city?: string;
  province?: string; // state
  province_code?: string;
  zip?: string;
  country?: string;
  country_code?: string; // ISO-3166-1 alpha-2
  phone?: string;
}

interface ShopifyOrder {
  id: number;
  name: string; // e.g., "#1001"
  order_number?: number;
  email?: string;
  phone?: string;
  customer?: {
    id?: number;
    email?: string;
    first_name?: string;
    last_name?: string;
  };
  shipping_address?: ShopifyAddress;
  billing_address?: ShopifyAddress;
  line_items: ShopifyLineItem[];
  total_price: string;
  subtotal_price: string;
  currency: string;
  note_attributes?: Array<{ name: string; value: string }>;
  client_details?: {
    user_agent?: string;
    browser_ip?: string;
  };
  test?: boolean;
}

// ============================================================================
// POST HANDLER
// ============================================================================

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Read raw body for HMAC verification (must be exact bytes Shopify signed)
  const rawBody = await req.text();
  const hmacHeader = req.headers.get('x-shopify-hmac-sha256');

  if (!verifyShopifyHmac(rawBody, hmacHeader)) {
    console.error('[shopify-webhook] HMAC verification failed', {
      hmacPresent: !!hmacHeader,
      shopDomain: req.headers.get('x-shopify-shop-domain'),
    });
    return NextResponse.json({ ok: false, error: 'invalid_hmac' }, { status: 401 });
  }

  let order: ShopifyOrder;
  try {
    order = JSON.parse(rawBody) as ShopifyOrder;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Skip test orders so they don't pollute pixel data
  if (order.test) {
    console.log('[shopify-webhook] Skipping test order', { orderId: order.id });
    return NextResponse.json({ ok: true, skipped: 'test_order' });
  }

  // Extract tracking data persisted from cart
  const tracking = extractTrackingAttributes(order.note_attributes);

  // Build user data — prefer customer object, fall back to addresses
  const customerEmail = order.email ?? order.customer?.email;
  const customerPhone = order.phone ?? order.shipping_address?.phone ?? order.billing_address?.phone;
  const firstName =
    order.customer?.first_name ??
    order.shipping_address?.first_name ??
    order.billing_address?.first_name;
  const lastName =
    order.customer?.last_name ??
    order.shipping_address?.last_name ??
    order.billing_address?.last_name;
  const address = order.shipping_address ?? order.billing_address;

  // Build content array for CAPI
  const contents = order.line_items.map((item) => ({
    id: String(item.variant_id || item.product_id),
    quantity: item.quantity,
    item_price: parseFloat(item.price),
  }));
  const contentIds = order.line_items.map((item) => String(item.variant_id || item.product_id));

  // Use Shopify order_id as event_id — this is deterministic and matches what
  // we should fire from the thank-you page pixel. Prefix to avoid collisions.
  const eventId = `shopify_order_${order.id}`;

  const event: CapiEvent = {
    eventName: 'Purchase',
    eventId,
    actionSource: 'website',
    eventSourceUrl: `https://lensmind.lat/`, // generic fallback; thank_you page URL not in webhook
    userData: {
      email: customerEmail,
      phone: customerPhone,
      firstName,
      lastName,
      city: address?.city,
      state: address?.province_code ?? address?.province,
      zip: address?.zip,
      country: address?.country_code ?? address?.country,
      externalId: order.customer?.id ? String(order.customer.id) : undefined,
      fbp: tracking.fbp,
      fbc: tracking.fbc,
      clientIpAddress: order.client_details?.browser_ip,
      clientUserAgent: tracking.userAgent ?? order.client_details?.user_agent,
    },
    customData: {
      currency: order.currency,
      value: parseFloat(order.total_price),
      contentIds,
      contentType: 'product',
      contents,
      numItems: contents.reduce((sum, c) => sum + c.quantity, 0),
      orderId: String(order.id),
    },
  };

  const result = await sendCapiEvent(event);

  if (result.error) {
    // Log loudly but return 200 to Shopify so it doesn't retry forever.
    // Meta errors (bad payload, expired token) won't be fixed by Shopify retrying.
    console.error('[shopify-webhook] CAPI Purchase failed', {
      orderId: order.id,
      error: result.error,
    });
    // Return 200 anyway — we'll see this in logs and fix it manually.
    return NextResponse.json({ ok: false, capi_error: result.error.message }, { status: 200 });
  }

  console.log('[shopify-webhook] Purchase sent to CAPI', {
    orderId: order.id,
    orderName: order.name,
    value: order.total_price,
    currency: order.currency,
    fbtrace_id: result.fbtrace_id,
  });

  return NextResponse.json({
    ok: true,
    events_received: result.events_received,
    fbtrace_id: result.fbtrace_id,
  });
}
