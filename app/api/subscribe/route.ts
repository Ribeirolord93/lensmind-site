/**
 * /api/subscribe
 *
 * Captures email leads from EmailCapture.tsx (10% off coupon promise).
 *
 * v15: real persistence — chooses provider based on which env vars are set:
 *   1. Klaviyo (preferred) — set KLAVIYO_API_KEY + KLAVIYO_LIST_ID
 *   2. Google Sheets webhook (fallback) — set GOOGLE_SHEETS_WEBHOOK_URL
 *   3. Console-log only (last resort) — logs warning so we know in Netlify logs
 *
 * Setup guides:
 *   - Klaviyo: https://help.klaviyo.com/hc/en-us/articles/115005078647
 *   - Google Sheets: create Apps Script with doPost, deploy as Web App,
 *     paste the URL into GOOGLE_SHEETS_WEBHOOK_URL.
 *
 * v15 also adds rate limiting and origin check.
 */

import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp, isAllowedOrigin } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lensmind.lat';
const ALLOWED_ORIGINS = [
  SITE_URL,
  SITE_URL.replace('https://', 'https://www.'),
  'https://neon-sopapillas-10fc4d.netlify.app',
];

// Provider env vars
const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;
const SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

// ============================================================================
// VALIDATION
// ============================================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: unknown): email is string {
  return (
    typeof email === 'string' &&
    email.length >= 5 &&
    email.length <= 254 &&
    EMAIL_REGEX.test(email)
  );
}

// ============================================================================
// PROVIDERS
// ============================================================================

interface SubscribeContext {
  email: string;
  source: string;
  ip: string;
  userAgent?: string;
  timestamp: string;
}

/**
 * Klaviyo Profiles API (current 2024+ API).
 * Creates or updates a profile and adds it to the configured list.
 *
 * Docs: https://developers.klaviyo.com/en/reference/create_profile
 */
async function subscribeKlaviyo(ctx: SubscribeContext): Promise<{ ok: boolean; error?: string }> {
  if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
    return { ok: false, error: 'klaviyo_not_configured' };
  }

  try {
    // 1. Create/update profile
    const profileRes = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        revision: '2024-10-15',
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email: ctx.email,
            properties: {
              source: ctx.source,
              signup_ip: ctx.ip,
              signup_ua: ctx.userAgent,
              signup_at: ctx.timestamp,
            },
          },
        },
      }),
    });

    // Klaviyo returns 201 on create, 409 if email already exists (which is fine)
    if (!profileRes.ok && profileRes.status !== 409) {
      const text = await profileRes.text();
      console.error('[subscribe/klaviyo] Profile create failed', {
        status: profileRes.status,
        body: text,
      });
      return { ok: false, error: `klaviyo_${profileRes.status}` };
    }

    // 2. Get profile ID (if created or already exists)
    let profileId: string | undefined;
    if (profileRes.status === 201) {
      const data = await profileRes.json();
      profileId = data?.data?.id;
    } else {
      // 409 means exists — fetch by email
      const lookupRes = await fetch(
        `https://a.klaviyo.com/api/profiles/?filter=${encodeURIComponent(`equals(email,"${ctx.email}")`)}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
            revision: '2024-10-15',
          },
        }
      );
      if (lookupRes.ok) {
        const data = await lookupRes.json();
        profileId = data?.data?.[0]?.id;
      }
    }

    if (!profileId) {
      return { ok: false, error: 'klaviyo_no_profile_id' };
    }

    // 3. Subscribe profile to list (with consent)
    const subRes = await fetch(
      `https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          revision: '2024-10-15',
        },
        body: JSON.stringify({
          data: [{ type: 'profile', id: profileId }],
        }),
      }
    );

    if (!subRes.ok && subRes.status !== 409) {
      const text = await subRes.text();
      console.error('[subscribe/klaviyo] List add failed', {
        status: subRes.status,
        body: text,
      });
      return { ok: false, error: `klaviyo_list_${subRes.status}` };
    }

    return { ok: true };
  } catch (err) {
    console.error('[subscribe/klaviyo] Exception', err);
    return { ok: false, error: 'klaviyo_exception' };
  }
}

/**
 * Google Sheets via Apps Script webhook.
 * Expects an Apps Script with doPost(e) that appends a row to a sheet.
 *
 * Apps Script template:
 *   function doPost(e) {
 *     const sheet = SpreadsheetApp.getActiveSheet();
 *     const data = JSON.parse(e.postData.contents);
 *     sheet.appendRow([new Date(), data.email, data.source, data.ip, data.userAgent]);
 *     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 *
 * Deploy as: Web app, "Anyone" can access (URL is the secret).
 */
async function subscribeSheets(ctx: SubscribeContext): Promise<{ ok: boolean; error?: string }> {
  if (!SHEETS_WEBHOOK_URL) {
    return { ok: false, error: 'sheets_not_configured' };
  }

  try {
    const res = await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ctx),
    });

    if (!res.ok) {
      console.error('[subscribe/sheets] Webhook failed', { status: res.status });
      return { ok: false, error: `sheets_${res.status}` };
    }

    return { ok: true };
  } catch (err) {
    console.error('[subscribe/sheets] Exception', err);
    return { ok: false, error: 'sheets_exception' };
  }
}

// ============================================================================
// HANDLER
// ============================================================================

export async function POST(req: NextRequest) {
  // 1. Origin check
  if (!isAllowedOrigin(req, ALLOWED_ORIGINS)) {
    return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
  }

  // 2. Rate limit — strict for newsletter (10 req/min per IP — prevents email harvesting)
  const ip = getClientIp(req);
  const rl = rateLimit(`subscribe:${ip}`, { limit: 10, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'rate_limited' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      }
    );
  }

  try {
    const body = await req.json();
    const { email } = body;

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const ctx: SubscribeContext = {
      email: email.toLowerCase().trim(),
      source: 'lensmind-site-launch',
      ip,
      userAgent: req.headers.get('user-agent') ?? undefined,
      timestamp: new Date().toISOString(),
    };

    // Try providers in priority order. We return success to the user as long
    // as at least one provider stores the email — even if one fails.
    let stored = false;
    const errors: string[] = [];

    // Try Klaviyo first
    if (KLAVIYO_API_KEY && KLAVIYO_LIST_ID) {
      const r = await subscribeKlaviyo(ctx);
      if (r.ok) stored = true;
      else if (r.error) errors.push(r.error);
    }

    // Also fire Google Sheets if configured (parallel storage / backup)
    if (SHEETS_WEBHOOK_URL) {
      const r = await subscribeSheets(ctx);
      if (r.ok) stored = true;
      else if (r.error) errors.push(r.error);
    }

    if (!stored) {
      // Last resort: log to Netlify console. NOT acceptable long-term —
      // Netlify retains function logs only for ~24h.
      console.warn(
        '[subscribe] NO PROVIDER CONFIGURED — email logged only',
        { email: ctx.email, errors }
      );
      // Still return success to user (don't expose backend issue)
      // but log loudly so we notice in monitoring.
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[subscribe] Unexpected error', err);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
