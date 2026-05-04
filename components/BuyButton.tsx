'use client';

import { useState } from 'react';
import { ShoppingBag, Loader2, ArrowRight, MessageCircle } from 'lucide-react';

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
  const [demoMode, setDemoMode] = useState(false);

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

      const json = await res.json();

      if (json.demoMode || json.error === 'CHECKOUT_NOT_AVAILABLE') {
        setDemoMode(true);
        setLoading(false);
        return;
      }

      if (!res.ok || !json.checkoutUrl) {
        throw new Error(json.error || 'No se pudo crear el carrito');
      }

      window.location.href = json.checkoutUrl;
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

  if (demoMode) {
    return (
      <div className="space-y-3 animate-fade-in">
        <div className="glass-strong p-5 rounded-sm border border-ember/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⏰</span>
            <div className="flex-1">
              <p className="text-[11px] tracking-[0.25em] uppercase text-ember mb-1.5 font-medium">
                Próximamente
              </p>
              <p className="text-sm text-bone-200 mb-2 leading-relaxed">
                Estamos finalizando los últimos detalles del checkout. Se
                lanzará oficialmente en las próximas horas.
              </p>
              <p className="text-xs text-smoke-400 mb-3">
                Mientras tanto, contáctanos para reservar tu Lensmind con
                acceso anticipado.
              </p>
              <a
                href="https://wa.me/5521967440808?text=Hola!%20Quiero%20reservar%20mi%20Lensmind%20con%20acceso%20anticipado"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-ember hover:text-ember-400 transition-colors font-medium"
              >
                <MessageCircle size={14} />
                <span>Reservar por WhatsApp</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setDemoMode(false);
            setError(null);
          }}
          className="text-xs text-smoke-500 hover:text-smoke-400 transition-colors w-full text-center"
        >
          ← Cerrar
        </button>
      </div>
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
