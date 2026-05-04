/**
 * Meta Conversions API (CAPI) Client
 * Server-side event tracking for Lensmind
 *
 * Why this exists: Pixel-only tracking loses 40-60% of conversions in 2026
 * due to iOS 14+ ATT, Safari ITP, ad blockers. CAPI sends events server-to-server,
 * bypassing browser restrictions entirely.
 *
 * Goal: EMQ (Event Match Quality) score 9.0+ — top tier signal quality.
 *
 * Maintained by Claude. If something breaks, share the error log + the raw
 * event payload from Test Events tool, and we fix it.
 */

import crypto from 'crypto';

// ============================================================================
// CONFIGURATION
// ============================================================================

const META_API_VERSION = 'v21.0'; // Update if Meta deprecates. Check graph.facebook.com docs.
const PIXEL_ID = process.env.META_PIXEL_ID!;
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN!;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE; // Optional, for Test Events validation

if (!PIXEL_ID || !ACCESS_TOKEN) {
  // We don't throw at module load to avoid breaking builds, but events will fail loudly
  console.warn(
    '[meta-capi] Missing META_PIXEL_ID or META_CAPI_TOKEN env vars. Events will fail.'
  );
}

// ============================================================================
// TYPES
// ============================================================================

export type MetaEventName =
  | 'PageView'
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'Search'
  | 'CompleteRegistration';

export interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string; // ISO-3166-1 alpha-2 lowercase, e.g. "mx", "co", "cl"
  externalId?: string; // your internal user/customer ID
  fbp?: string; // _fbp cookie
  fbc?: string; // _fbc cookie (set when user clicks ad with fbclid)
  clientIpAddress?: string;
  clientUserAgent?: string;
}

export interface CustomData {
  currency?: string; // ISO-4217, e.g. "USD", "MXN"
  value?: number;
  contentIds?: string[];
  contentName?: string;
  contentCategory?: string;
  contentType?: 'product' | 'product_group';
  numItems?: number;
  contents?: Array<{ id: string; quantity: number; item_price?: number }>;
  orderId?: string;
  searchString?: string;
}

export interface CapiEvent {
  eventName: MetaEventName;
  eventTime?: number; // Unix seconds. Defaults to now.
  eventId: string; // CRITICAL for deduplication with browser pixel. Must match.
  eventSourceUrl?: string;
  actionSource?: 'website' | 'email' | 'app' | 'phone_call' | 'physical_store' | 'system_generated' | 'other';
  userData: UserData;
  customData?: CustomData;
  optOut?: boolean; // Set true if user denied consent (Consent Mode v2)
}

interface CapiResponse {
  events_received?: number;
  messages?: string[];
  fbtrace_id?: string;
  error?: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id?: string;
  };
}

// ============================================================================
// HASHING (Meta requires SHA-256 of normalized fields)
// ============================================================================

/**
 * Meta requires PII to be SHA-256 hashed before sending.
 * Normalization rules (from Meta docs):
 *  - email: lowercase, trim
 *  - phone: digits only, with country code if available
 *  - firstName/lastName: lowercase, trim, remove special chars
 *  - city/state: lowercase, trim, no spaces
 *  - country: lowercase 2-letter ISO
 *  - zip: lowercase, trim, no spaces (5 digits for US-style; full for others)
 *  - externalId: lowercase, trim (no other normalization)
 */
function sha256(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function normalizeAndHashEmail(email: string): string {
  return sha256(email.trim().toLowerCase());
}

function normalizeAndHashPhone(phone: string): string {
  // Strip everything that isn't a digit
  const digits = phone.replace(/\D/g, '');
  return sha256(digits);
}

function normalizeAndHashName(name: string): string {
  // Lowercase, trim, remove non-letter chars (preserve unicode letters for LATAM names)
  const normalized = name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents (José -> jose)
    .replace(/[^a-z]/g, '');
  return sha256(normalized);
}

function normalizeAndHashCity(city: string): string {
  return sha256(city.trim().toLowerCase().replace(/\s+/g, ''));
}

function normalizeAndHashState(state: string): string {
  // Meta wants 2-letter state code lowercase. We do best effort: lowercase + strip.
  return sha256(state.trim().toLowerCase().replace(/\s+/g, ''));
}

function normalizeAndHashZip(zip: string): string {
  return sha256(zip.trim().toLowerCase().replace(/\s+/g, ''));
}

function normalizeAndHashCountry(country: string): string {
  // ISO-3166-1 alpha-2 lowercase
  return sha256(country.trim().toLowerCase().slice(0, 2));
}

function normalizeAndHashExternalId(id: string): string {
  return sha256(id.trim().toLowerCase());
}

// ============================================================================
// PAYLOAD BUILDER
// ============================================================================

function buildUserDataPayload(userData: UserData): Record<string, string | string[]> {
  const payload: Record<string, string | string[]> = {};

  if (userData.email) payload.em = normalizeAndHashEmail(userData.email);
  if (userData.phone) payload.ph = normalizeAndHashPhone(userData.phone);
  if (userData.firstName) payload.fn = normalizeAndHashName(userData.firstName);
  if (userData.lastName) payload.ln = normalizeAndHashName(userData.lastName);
  if (userData.city) payload.ct = normalizeAndHashCity(userData.city);
  if (userData.state) payload.st = normalizeAndHashState(userData.state);
  if (userData.zip) payload.zp = normalizeAndHashZip(userData.zip);
  if (userData.country) payload.country = normalizeAndHashCountry(userData.country);
  if (userData.externalId) payload.external_id = normalizeAndHashExternalId(userData.externalId);

  // These are NOT hashed (per Meta spec)
  if (userData.fbp) payload.fbp = userData.fbp;
  if (userData.fbc) payload.fbc = userData.fbc;
  if (userData.clientIpAddress) payload.client_ip_address = userData.clientIpAddress;
  if (userData.clientUserAgent) payload.client_user_agent = userData.clientUserAgent;

  return payload;
}

function buildCustomDataPayload(customData: CustomData = {}): Record<string, unknown> {
  const payload: Record<string, unknown> = {};

  if (customData.currency) payload.currency = customData.currency;
  if (customData.value !== undefined) payload.value = customData.value;
  if (customData.contentIds) payload.content_ids = customData.contentIds;
  if (customData.contentName) payload.content_name = customData.contentName;
  if (customData.contentCategory) payload.content_category = customData.contentCategory;
  if (customData.contentType) payload.content_type = customData.contentType;
  if (customData.numItems !== undefined) payload.num_items = customData.numItems;
  if (customData.contents) payload.contents = customData.contents;
  if (customData.orderId) payload.order_id = customData.orderId;
  if (customData.searchString) payload.search_string = customData.searchString;

  return payload;
}

function buildEventPayload(event: CapiEvent): Record<string, unknown> {
  const eventTime = event.eventTime ?? Math.floor(Date.now() / 1000);

  const payload: Record<string, unknown> = {
    event_name: event.eventName,
    event_time: eventTime,
    event_id: event.eventId,
    action_source: event.actionSource ?? 'website',
    user_data: buildUserDataPayload(event.userData),
  };

  if (event.eventSourceUrl) payload.event_source_url = event.eventSourceUrl;
  if (event.customData) payload.custom_data = buildCustomDataPayload(event.customData);
  if (event.optOut) payload.opt_out = true;

  return payload;
}

// ============================================================================
// SEND EVENTS (with retry)
// ============================================================================

/**
 * Send one or more events to Meta CAPI.
 * Returns the API response. Logs everything for debugging.
 */
export async function sendCapiEvents(events: CapiEvent[]): Promise<CapiResponse> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('[meta-capi] Cannot send events: missing credentials');
    return { error: { message: 'Missing credentials', type: 'config', code: 0 } };
  }

  if (events.length === 0) return { events_received: 0 };

  const url = `https://graph.facebook.com/${META_API_VERSION}/${PIXEL_ID}/events`;
  const body: Record<string, unknown> = {
    data: events.map(buildEventPayload),
    access_token: ACCESS_TOKEN,
  };

  if (TEST_EVENT_CODE) {
    body.test_event_code = TEST_EVENT_CODE;
  }

  // Retry: 1 attempt + 2 retries with exponential backoff
  const MAX_ATTEMPTS = 3;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = (await response.json()) as CapiResponse;

      if (!response.ok || json.error) {
        // Meta returns 400/500 with error details. Log and decide retry.
        console.error('[meta-capi] API error', {
          attempt,
          status: response.status,
          error: json.error,
          eventNames: events.map((e) => e.eventName),
        });

        // Don't retry on 400 Bad Request (our payload is wrong, retrying won't help)
        if (response.status >= 400 && response.status < 500) {
          return json;
        }

        // 5xx: retry with backoff
        lastError = json;
        if (attempt < MAX_ATTEMPTS) {
          await new Promise((r) => setTimeout(r, 500 * attempt));
          continue;
        }
        return json;
      }

      // Success
      console.log('[meta-capi] Events sent', {
        events_received: json.events_received,
        fbtrace_id: json.fbtrace_id,
        eventNames: events.map((e) => e.eventName),
        eventIds: events.map((e) => e.eventId),
      });
      return json;
    } catch (err) {
      lastError = err;
      console.error('[meta-capi] Network error', { attempt, error: err });
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((r) => setTimeout(r, 500 * attempt));
      }
    }
  }

  return {
    error: {
      message: `Failed after ${MAX_ATTEMPTS} attempts: ${String(lastError)}`,
      type: 'network',
      code: 0,
    },
  };
}

/**
 * Convenience wrapper for single event
 */
export async function sendCapiEvent(event: CapiEvent): Promise<CapiResponse> {
  return sendCapiEvents([event]);
}

// ============================================================================
// EVENT ID GENERATION
// ============================================================================

/**
 * Generates a unique event_id for deduplication.
 * For Purchase events from Shopify: ALWAYS use the Shopify order_id (deterministic).
 * For other events: generate UUID and pass to both pixel and CAPI.
 */
export function generateEventId(prefix?: string): string {
  const uuid = crypto.randomUUID();
  return prefix ? `${prefix}_${uuid}` : uuid;
}
