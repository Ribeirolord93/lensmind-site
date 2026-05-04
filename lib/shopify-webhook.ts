/**
 * Shopify Webhook HMAC Validation
 *
 * Shopify signs every webhook with HMAC-SHA256 using your shared secret.
 * We MUST verify this signature — otherwise anyone could POST fake purchases
 * to our endpoint and pollute our pixel data (and worse).
 *
 * The shared secret comes from Shopify Admin → Settings → Notifications →
 * Webhooks → "Webhook signing secret" (one secret for the whole shop).
 */

import crypto from 'crypto';

/**
 * Verifies the X-Shopify-Hmac-Sha256 header against the raw request body.
 * Use timingSafeEqual to prevent timing attacks.
 */
export function verifyShopifyHmac(rawBody: string, hmacHeader: string | null): boolean {
  if (!hmacHeader) {
    console.warn('[shopify-hmac] No HMAC header present');
    return false;
  }

  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[shopify-hmac] SHOPIFY_WEBHOOK_SECRET not configured');
    return false;
  }

  const computed = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('base64');

  // Buffers must be equal length for timingSafeEqual
  const computedBuf = Buffer.from(computed);
  const headerBuf = Buffer.from(hmacHeader);

  if (computedBuf.length !== headerBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(computedBuf, headerBuf);
}

/**
 * Extracts fbp/fbc from Shopify order note_attributes (or cart_attributes).
 * We persist these client-side when user adds to cart, so we have them at Purchase time.
 */
export function extractTrackingAttributes(
  noteAttributes: Array<{ name: string; value: string }> | undefined
): { fbp?: string; fbc?: string; eventId?: string; userAgent?: string } {
  if (!noteAttributes || !Array.isArray(noteAttributes)) return {};

  const result: { fbp?: string; fbc?: string; eventId?: string; userAgent?: string } = {};

  for (const attr of noteAttributes) {
    if (attr.name === '_fbp' && attr.value) result.fbp = attr.value;
    if (attr.name === '_fbc' && attr.value) result.fbc = attr.value;
    if (attr.name === '_meta_event_id' && attr.value) result.eventId = attr.value;
    if (attr.name === '_user_agent' && attr.value) result.userAgent = attr.value;
  }

  return result;
}
