/**
 * Client-side helpers for Meta Pixel + CAPI deduplication.
 *
 * The flow:
 *   1. User lands on site → fbq() pixel sets _fbp cookie
 *   2. We generate an event_id, pass it BOTH to fbq() AND to our /api/meta-capi/track
 *   3. Meta receives the same event twice (browser + server) but dedupes by event_id
 *   4. Result: maximum signal coverage even when browser is blocked
 *
 * Critical: the event_id MUST be the same on both sides. If they differ, Meta
 * counts it as 2 events (double-counting) and your ROAS reporting goes haywire.
 */

// ============================================================================
// COOKIE READERS (client-side only)
// ============================================================================

/**
 * Reads a cookie value from document.cookie. Returns undefined if missing.
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : undefined;
}

/**
 * The _fbp cookie is set by the Meta Pixel on first page load.
 * Format: fb.{subdomain_index}.{creation_time}.{random}
 * Example: fb.1.1714838400123.987654321
 */
export function getFbp(): string | undefined {
  return getCookie('_fbp');
}

/**
 * The _fbc cookie is set when the user lands via a Meta ad with ?fbclid=... in URL.
 * Format: fb.{subdomain_index}.{creation_time}.{fbclid}
 * If user didn't come from a Meta ad, this is absent — that's fine, we just skip it.
 *
 * Note: we also try to read fbclid from the URL on first visit and synthesize fbc
 * if Meta Pixel hasn't set the cookie yet (edge case during page load race).
 */
export function getFbc(): string | undefined {
  const cookie = getCookie('_fbc');
  if (cookie) return cookie;

  // Fallback: synthesize from URL fbclid if present
  if (typeof window === 'undefined') return undefined;
  const url = new URL(window.location.href);
  const fbclid = url.searchParams.get('fbclid');
  if (!fbclid) return undefined;

  // Synthesize. Meta Pixel will overwrite this on its own a moment later.
  return `fb.1.${Date.now()}.${fbclid}`;
}

// ============================================================================
// EVENT ID GENERATION (client-side, must match server)
// ============================================================================

/**
 * Generates a UUID v4 for event_id. Used to deduplicate browser pixel events
 * with server CAPI events.
 */
export function generateEventId(): string {
  // crypto.randomUUID is available in modern browsers + Node 16+
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ============================================================================
// FIRE EVENT (browser pixel + server CAPI together)
// ============================================================================

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: unknown;
  }
}

interface FireEventParams {
  eventName: 'PageView' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Search';
  customData?: {
    currency?: string;
    value?: number;
    contentIds?: string[];
    contentName?: string;
    contentCategory?: string;
    contentType?: 'product' | 'product_group';
    numItems?: number;
    contents?: Array<{ id: string; quantity: number; item_price?: number }>;
    searchString?: string;
  };
  /**
   * Optional user data to send to CAPI (NEVER sent via browser pixel — it's hashed
   * server-side). Useful when user is logged in or has provided email.
   */
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    externalId?: string;
  };
}

/**
 * Fires an event on browser pixel AND server CAPI with the same event_id.
 * Use this instead of calling fbq() directly.
 */
export async function fireMetaEvent(params: FireEventParams): Promise<void> {
  const eventId = generateEventId();

  // 1. Fire browser pixel (synchronous, sets cookies, etc)
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    const pixelParams: Record<string, unknown> = {};
    if (params.customData) {
      // Browser pixel uses snake_case keys
      if (params.customData.currency) pixelParams.currency = params.customData.currency;
      if (params.customData.value !== undefined) pixelParams.value = params.customData.value;
      if (params.customData.contentIds) pixelParams.content_ids = params.customData.contentIds;
      if (params.customData.contentName) pixelParams.content_name = params.customData.contentName;
      if (params.customData.contentCategory)
        pixelParams.content_category = params.customData.contentCategory;
      if (params.customData.contentType) pixelParams.content_type = params.customData.contentType;
      if (params.customData.numItems !== undefined) pixelParams.num_items = params.customData.numItems;
      if (params.customData.contents) pixelParams.contents = params.customData.contents;
      if (params.customData.searchString) pixelParams.search_string = params.customData.searchString;
    }

    window.fbq('track', params.eventName, pixelParams, { eventID: eventId });
  }

  // 2. Fire server CAPI (async, fire-and-forget — don't block UI)
  try {
    const capiBody = {
      eventName: params.eventName,
      eventId,
      eventSourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
      customData: params.customData,
      userData: {
        ...params.userData,
        fbp: getFbp(),
        fbc: getFbc(),
      },
    };

    // Use sendBeacon if available for reliable send during page unload, else fetch
    const bodyStr = JSON.stringify(capiBody);
    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.sendBeacon === 'function' &&
      params.eventName !== 'ViewContent' // ViewContent often races page load, use fetch
    ) {
      const blob = new Blob([bodyStr], { type: 'application/json' });
      navigator.sendBeacon('/api/meta-capi/track', blob);
    } else {
      await fetch('/api/meta-capi/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyStr,
        keepalive: true, // ensures request completes even if page unloads
      });
    }
  } catch (err) {
    // Never block UI on CAPI failures. Just log.
    console.warn('[meta-capi-client] Failed to send server event', err);
  }
}

// ============================================================================
// PERSIST TRACKING DATA INTO SHOPIFY CART (for Purchase event)
// ============================================================================

/**
 * Persists fbp, fbc, event_id, and user agent into Shopify cart attributes.
 * When the order is created, these come back to us in the Shopify webhook
 * as note_attributes — letting our server-side Purchase event have the same
 * event_id as the browser pixel Purchase event.
 *
 * Call this whenever you update the cart (add to cart, etc).
 *
 * Implementation: assumes you're using Shopify's AJAX cart API (/cart/update.js).
 */
export async function persistTrackingToShopifyCart(eventId?: string): Promise<void> {
  if (typeof window === 'undefined') return;

  const fbp = getFbp();
  const fbc = getFbc();
  const ua = navigator.userAgent;

  const attributes: Record<string, string> = {
    _user_agent: ua,
  };
  if (fbp) attributes._fbp = fbp;
  if (fbc) attributes._fbc = fbc;
  if (eventId) attributes._meta_event_id = eventId;

  try {
    await fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attributes }),
    });
  } catch (err) {
    console.warn('[meta-capi-client] Failed to persist tracking attributes', err);
  }
}
