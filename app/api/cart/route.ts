import { NextRequest, NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const { variantId, quantity = 1 } = await request.json();

    if (!variantId) {
      return NextResponse.json(
        { error: 'variantId es requerido' },
        { status: 400 }
      );
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
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Erro desconhecido ao criar carrinho',
      },
      { status: 500 }
    );
  }
}
