/**
 * Client-side helpers for Meta Pixel + CAPI deduplication.
 *
 * The flow:
 *   1. User lands on site → fbq() pixel sets _fbp cookie (only if marketing consent)
 *   2. We generate an event_id, pass it BOTH to fbq() AND to our /api/meta-capi/track
 *   3. Meta receives the same event twice (browser + server) but dedupes by event_id
 *   4. Result: maximum signal coverage even when browser is blocked
 *
 * Critical: the event_id MUST be the same on both sides. If they differ, Meta
 * counts it as 2 events (double-counting) and your ROAS reporting goes haywire.
 *
 * Consent (LGPD/GDPR/Consent Mode v2):
 *   - Pixel browser ONLY loads when consent.marketing === true (Analytics.tsx blocks)
 *   - CAPI server-side ALWAYS sends, but with optOut=true when no consent
 *   - This respects user choice while still allowing Meta to model conversions
 *
 * v15 changes:
 *   - Added 'Lead' event support
 *   - Added consent check (reads localStorage, sends optOut=true if no marketing consent)
 *   - Removed persistTrackingToShopifyCart (incompatible with headless Storefront API)
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
 */
export function getFbp(): string | undefined {
  return getCookie('_fbp');
}

/**
 * The _fbc cookie is set when the user lands via a Meta ad with ?fbclid=... in URL.
 * If user didn't come from a Meta ad, this is absent — that's fine, we just skip it.
 *
 * Note: we also try to read fbclid from the URL on first visit and synthesize fbc
 * if Meta Pixel hasn't set the cookie yet (edge case during page load race).
 */
export function getFbc(): string | undefined {
  const cookie = getCookie('_fbc');
  if (cookie) return cookie;

  if (typeof window === 'undefined') return undefined;
  const url = new URL(window.location.href);
  const fbclid = url.searchParams.get('fbclid');
  if (!fbclid) return undefined;

  return `fb.1.${Date.now()}.${fbclid}`;
}

// ============================================================================
// CONSENT (LGPD/GDPR — Consent Mode v2)
// ============================================================================

type Consent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

/**
 * Reads the current cookie consent from localStorage.
 * Returns null if user hasn't responded to the cookie banner yet.
 */
export function getConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('lensmind-cookie-consent');
    if (!stored) return null;
    return JSON.parse(stored) as Consent;
  } catch {
    return null;
  }
}

/**
 * Returns true only if user explicitly granted marketing consent.
 * No consent yet (banner still showing) = false.
 */
export function hasMarketingConsent(): boolean {
  return getConsent()?.marketing === true;
}

// ============================================================================
// EVENT ID GENERATION (client-side, must match server)
// ============================================================================

export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
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
  eventName: 'PageView' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Search' | 'Lead';
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
 *
 * Consent behavior:
 *  - With marketing consent: pixel + CAPI both fire normally
 *  - Without marketing consent: pixel doesn't fire (script not loaded),
 *    CAPI still fires with optOut=true (Consent Mode v2)
 */
export async function fireMetaEvent(params: FireEventParams): Promise<void> {
  const eventId = generateEventId();
  const consentGranted = hasMarketingConsent();

  // 1. Browser pixel — only fires if consent granted AND fbq loaded
  if (consentGranted && typeof window !== 'undefined' && typeof window.fbq === 'function') {
    const pixelParams: Record<string, unknown> = {};
    if (params.customData) {
      if (params.customData.currency) pixelParams.currency = params.customData.currency;
      if (params.customData.value !== undefined) pixelParams.value = params.customData.value;
      if (params.customData.contentIds) pixelParams.content_ids = params.customData.contentIds;
      if (params.customData.contentName) pixelParams.content_name = params.customData.contentName;
      if (params.customData.contentCategory)
        pixelParams.content_category = params.customData.contentCategory;
      if (params.customData.contentType) pixelParams.content_type = params.customData.contentType;
      if (params.customData.numItems !== undefined)
        pixelParams.num_items = params.customData.numItems;
      if (params.customData.contents) pixelParams.contents = params.customData.contents;
      if (params.customData.searchString) pixelParams.search_string = params.customData.searchString;
    }

    window.fbq('track', params.eventName, pixelParams, { eventID: eventId });
  }

  // 2. Server CAPI — ALWAYS fires, but with optOut=true if no consent
  try {
    const capiBody = {
      eventName: params.eventName,
      eventId,
      eventSourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
      customData: params.customData,
      userData: {
        ...params.userData,
        // Only include fbp/fbc if consent granted (cross-site tracking cookies)
        fbp: consentGranted ? getFbp() : undefined,
        fbc: consentGranted ? getFbc() : undefined,
      },
      optOut: !consentGranted,
    };

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
        keepalive: true,
      });
    }
  } catch (err) {
    console.warn('[meta-capi-client] Failed to send server event', err);
  }
}
