'use client';

import { useState } from 'react';
import { ShoppingBag, Loader2, ArrowRight, MessageCircle } from 'lucide-react';
import { fireMetaEvent } from '@/lib/fbq-helpers';

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5554991683659';

interface BuyButtonProps {
  variantId: string;
  available: boolean;
  className?: string;
  /** Used for AddToCart/InitiateCheckout Meta events */
  contentId?: string;
  contentName?: string;
  value?: number;
  currency?: string;
}

export default function BuyButton({
  variantId,
  available,
  className = '',
  contentId,
  contentName = 'Lensmind Edition 01',
  value = 149.99,
  currency = 'USD',
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

      const ids = contentId ? [contentId] : [variantId];

      // Fire AddToCart (browser pixel + CAPI server-side, shared event_id)
      // fireMetaEvent respects consent automatically (optOut=true if no marketing consent)
      fireMetaEvent({
        eventName: 'AddToCart',
        customData: {
          contentIds: ids,
          contentName,
          contentType: 'product',
          value,
          currency,
        },
      });

      // Fire InitiateCheckout right before redirect
      fireMetaEvent({
        eventName: 'InitiateCheckout',
        customData: {
          contentIds: ids,
          contentName,
          contentType: 'product',
          value,
          currency,
          numItems: 1,
        },
      });

      // Small delay to give beacons time to fire before navigating away
      await new Promise((r) => setTimeout(r, 200));

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
        className={`btn-secondary w-full cursor-not-allowed opacity-50 ${className}`}
      >
        Agotado temporalmente
      </button>
    );
  }

  if (demoMode) {
    return (
      <div className="space-y-3 animate-fade-in">
        <div className="bg-ink-900 p-5 rounded-2xl border border-ember/30">
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
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Quiero reservar mi Lensmind con acceso anticipado')}`}
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
            <span>Comprar ahora — $149.99 USD</span>
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
