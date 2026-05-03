'use client';

import { useState } from 'react';
import { ShoppingBag, Loader2, ArrowRight } from 'lucide-react';

interface BuyButtonProps {
  variantId: string;
  available: boolean;
  className?: string;
}

export default function BuyButton({
  variantId,
  available,
  className = '',
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    if (!available) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantId,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error('No se pudo crear el carrito');
      }

      const { checkoutUrl } = await res.json();
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setLoading(false);
    }
  }

  if (!available) {
    return (
      <button
        disabled
        className={`btn-ghost cursor-not-allowed opacity-60 ${className}`}
      >
        Agotado temporalmente
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleBuy}
        disabled={loading}
        className={`btn-ember w-full group ${className}`}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Procesando...</span>
          </>
        ) : (
          <>
            <ShoppingBag size={18} />
            <span>Comprar ahora — $199 USD</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-red-400 text-center">
          {error}. Intenta de nuevo.
        </p>
      )}
    </div>
  );
}
