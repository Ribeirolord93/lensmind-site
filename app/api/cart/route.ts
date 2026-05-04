import { NextRequest, NextResponse } from 'next/server';
import { createCart, isShopifyConfigured } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const { variantId, quantity = 1 } = await request.json();

    if (!variantId) {
      return NextResponse.json(
        { error: 'variantId es requerido' },
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

    const cart = await createCart([
      { merchandiseId: variantId, quantity },
    ]);

    return NextResponse.json({
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
      totalQuantity: cart.totalQuantity,
    });
  } catch (error) {
    console.error('Erro ao criar carrinho:', error);

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
