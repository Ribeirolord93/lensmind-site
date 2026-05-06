/**
 * /api/meta-capi/track
 *
 * Generic CAPI endpoint called from the browser via fireMetaEvent().
 * Receives event details + fbp/fbc cookies + auto-extracts IP/UA from request.
 *
 * Used for: PageView, ViewContent, AddToCart, InitiateCheckout, Search, Lead.
 * NOT for: Purchase (that comes from /api/webhooks/shopify-order with full order data).
 *
 * Why not Purchase here too? Because Purchase from the thank-you page can be
 * blocked by ad blockers or browser closing. Shopify webhook is server-to-server,
 * 100% reliable. We use that as source of truth for revenue events.
 *
 * v15 changes:
 *   - Added rate limiting (60 req/min per IP)
 *   - Added Origin allowlist check
 *   - Accepts 'Lead' event
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendCapiEvent, type CapiEvent, type MetaEventName } from '@/lib/meta-capi';
import { rateLimit, getClientIp, isAllowedOrigin } from '@/lib/rate-limit';

// Edge-incompatible because we use crypto for hashing. Use Node runtime.
export const runtime = 'nodejs';

interface RequestBody {
  eventName: MetaEventName;
  eventId: string;
  eventSourceUrl?: string;
  customData?: CapiEvent['customData'];
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
    fbp?: string;
    fbc?: string;
  };
  optOut?: boolean; // for Consent Mode v2
}

const ALLOWED_EVENTS: MetaEventName[] = [
  'PageView',
  'ViewContent',
  'AddToCart',
  'InitiateCheckout',
  'AddPaymentInfo',
  'Search',
  'Lead',
  'CompleteRegistration',
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lensmind.lat';
const ALLOWED_ORIGINS = [
  SITE_URL,
  SITE_URL.replace('https://', 'https://www.'),
  // Netlify preview/branch deploys
  'https://neon-sopapillas-10fc4d.netlify.app',
];

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Origin check — block requests from unknown origins
  if (!isAllowedOrigin(req, ALLOWED_ORIGINS)) {
    console.warn('[api/meta-capi/track] Blocked request from disallowed origin', {
      origin: req.headers.get('origin'),
    });
    return NextResponse.json({ ok: false, error: 'invalid_origin' }, { status: 403 });
  }

  // 2. Rate limit — 60 req/min per IP (generous for legit users, blocks abuse)
  const ip = getClientIp(req);
  const rl = rateLimit(`capi:${ip}`, { limit: 60, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  // 3. Parse body
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // 4. Validation
  if (!body.eventName || !ALLOWED_EVENTS.includes(body.eventName)) {
    return NextResponse.json(
      { ok: false, error: 'invalid_event_name', allowed: ALLOWED_EVENTS },
      { status: 400 }
    );
  }
  if (!body.eventId || typeof body.eventId !== 'string') {
    return NextResponse.json({ ok: false, error: 'missing_event_id' }, { status: 400 });
  }

  // Block Purchase via this endpoint — must come from Shopify webhook
  if ((body.eventName as string) === 'Purchase') {
    return NextResponse.json(
      { ok: false, error: 'purchase_must_come_from_shopify_webhook' },
      { status: 400 }
    );
  }

  // 5. Build CAPI event
  const event: CapiEvent = {
    eventName: body.eventName,
    eventId: body.eventId,
    eventSourceUrl: body.eventSourceUrl,
    actionSource: 'website',
    optOut: body.optOut,
    userData: {
      ...body.userData,
      clientIpAddress: ip !== 'unknown' ? ip : undefined,
      clientUserAgent: req.headers.get('user-agent') ?? undefined,
    },
    customData: body.customData,
  };

  const result = await sendCapiEvent(event);

  if (result.error) {
    // Don't expose internal error to client. Log server-side, return generic.
    console.error('[api/meta-capi/track] CAPI failed', {
      eventName: body.eventName,
      error: result.error,
    });
    return NextResponse.json({ ok: false, error: 'capi_failed' }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    events_received: result.events_received,
    fbtrace_id: result.fbtrace_id,
  });
}
