/**
 * Simple in-memory rate limiter for API endpoints.
 *
 * Why in-memory and not Redis/Upstash:
 *  - Lensmind is small-scale (LATAM dropshipping launch)
 *  - One Netlify function instance handles bursts; cold starts reset counter
 *    which is acceptable for our threat model (basic abuse prevention)
 *  - Zero infra cost / zero setup
 *
 * If Lensmind scales to multi-region or high traffic, swap for @upstash/ratelimit.
 *
 * Usage:
 *   const result = rateLimit(ip, { limit: 60, windowMs: 60_000 });
 *   if (!result.ok) return new Response('rate_limited', { status: 429 });
 */

interface RateLimitOptions {
  limit: number;       // max requests per window
  windowMs: number;    // window size in ms (e.g. 60_000 = 1 min)
}

interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;     // unix ms when the bucket resets
}

interface Bucket {
  count: number;
  resetAt: number;
}

// Module-level Map. Persists across requests within the same function instance.
// Cold starts reset everything (acceptable trade-off for our use case).
const buckets = new Map<string, Bucket>();

// Periodic cleanup to avoid memory leak on long-running instances.
// Keys older than 10 min are stale.
let lastCleanup = Date.now();
function maybeCleanup(now: number) {
  if (now - lastCleanup < 5 * 60_000) return;
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
  lastCleanup = now;
}

/**
 * Check + increment rate limit for the given key.
 * Returns { ok: false } if limit exceeded.
 */
export function rateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  maybeCleanup(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    // New bucket
    const fresh: Bucket = { count: 1, resetAt: now + opts.windowMs };
    buckets.set(key, fresh);
    return { ok: true, remaining: opts.limit - 1, resetAt: fresh.resetAt };
  }

  if (bucket.count >= opts.limit) {
    return { ok: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { ok: true, remaining: opts.limit - bucket.count, resetAt: bucket.resetAt };
}

/**
 * Extracts the best client IP from the request.
 * Netlify forwards real IP in x-nf-client-connection-ip.
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  return (
    headers.get('x-nf-client-connection-ip') ||
    headers.get('cf-connecting-ip') ||
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

/**
 * Validates request Origin against an allowlist. Returns true if allowed,
 * also true if Origin is missing (same-origin requests don't always send it).
 */
export function isAllowedOrigin(req: Request, allowed: string[]): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // same-origin or non-browser requests
  return allowed.includes(origin);
}
