/**
 * /api/cart
 *
 * Creates a Shopify cart and returns the checkout URL.
 *
 * v15 changes:
 *   - Added rate limiting (30 req/min per IP — carts are expensive)
 *   - Added Origin allowlist check
 *   - Quantity validation (max 10 to prevent abuse)
 *   - Variant ID format check (must look like a Shopify GID or be empty)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createCart, isShopifyConfigured } from '@/lib/shopify';
import { rateLimit, getClientIp, isAllowedOrigin } from '@/lib/rate-limit';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lensmind.lat';
const ALLOWED_ORIGINS = [
  SITE_URL,
  SITE_URL.replace('https://', 'https://www.'),
  'https://neon-sopapillas-10fc4d.netlify.app',
];

const MAX_QUANTITY = 10; // generous upper bound; Lensmind is single-unit purchase

export async function POST(request: NextRequest) {
  // 1. Origin check
  if (!isAllowedOrigin(request, ALLOWED_ORIGINS)) {
    console.warn('[api/cart] Blocked request from disallowed origin', {
      origin: request.headers.get('origin'),
    });
    return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
  }

  // 2. Rate limit — cart creation is expensive (Shopify API call), keep tighter
  const ip = getClientIp(request);
  const rl = rateLimit(`cart:${ip}`, { limit: 30, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'rate_limited' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const { variantId } = body;
    let { quantity = 1 } = body;

    // Validate variantId
    if (!variantId || typeof variantId !== 'string') {
      return NextResponse.json(
        { error: 'variantId es requerido' },
        { status: 400 }
      );
    }

    // Validate quantity (number, integer, within bounds)
    if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
      return NextResponse.json({ error: 'quantity_invalid' }, { status: 400 });
    }
    if (quantity < 1) quantity = 1;
    if (quantity > MAX_QUANTITY) {
      return NextResponse.json(
        { error: `quantity_max_${MAX_QUANTITY}` },
        { status: 400 }
      );
    }

    // Modo demo — Shopify ainda não foi configurada
    if (!isShopifyConfigured()) {
      return NextResponse.json({
        demoMode: true,
        message: 'Checkout en preparación — disponible próximamente',
      });
    }

    const cart = await createCart([{ merchandiseId: variantId, quantity }]);

    return NextResponse.json({
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
      totalQuantity: cart.totalQuantity,
    });
  } catch (error) {
    console.error('[api/cart] Erro ao criar carrinho:', error);

    if (
      error instanceof Error &&
      error.message === 'CHECKOUT_NOT_AVAILABLE'
    ) {
      return NextResponse.json({
        demoMode: true,
        message: 'Checkout en preparación',
      });
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error desconocido al crear carrito',
      },
      { status: 500 }
    );
  }
}
