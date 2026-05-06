'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { fireMetaEvent } from '@/lib/fbq-helpers';

const LEAD_VALUE = 19.9; // 10% off $199 — estimated lead value

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Por favor ingresa un email válido.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Subscribe failed');

      setStatus('success');
      setMessage('¡Listo! Revisa tu correo para tu cupón de 10%.');
      setEmail('');

      // GA4 sign_up event (only if gtag loaded — Analytics.tsx loads conditionally)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'sign_up', { method: 'email_capture' });
      }

      // Meta Lead event with proper dedup (browser pixel + CAPI server-side)
      // Email is sent to CAPI for hashing — never to browser pixel.
      // fireMetaEvent respects consent automatically (optOut=true if no marketing consent).
      fireMetaEvent({
        eventName: 'Lead',
        customData: {
          contentName: 'Lead - 10% off lançamento',
          contentCategory: 'newsletter_signup',
          value: LEAD_VALUE,
          currency: 'USD',
        },
        userData: {
          email,
        },
      });
    } catch (err) {
      setStatus('error');
      setMessage('Algo salió mal. Intenta de nuevo en un momento.');
    }
  }

  return (
    <section className="py-16 md:py-24 bg-ink-900 border-t border-ink-700">
      <div className="container-padded">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="eyebrow mb-5">Lista de lanzamiento</p>
          <h2 className="display-heading text-display-sm md:text-display-md text-bone mb-5 text-balance">
            10% off en tu primera compra.
          </h2>
          <p className="text-bone-300 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Suscríbete y recibe un cupón de descuento + acceso anticipado a nuevas colecciones.
          </p>

          {status === 'success' ? (
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-ember/10 border border-ember/30 rounded-full text-ember">
              <Check size={18} strokeWidth={2.5} />
              <span className="text-sm">{message}</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                disabled={status === 'loading'}
                aria-label="Email para recibir descuento"
                className="flex-1 px-5 py-3.5 bg-ink border border-ink-600 rounded-full text-bone placeholder:text-smoke-500 text-sm focus:outline-none focus:border-bone transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary group disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? 'Enviando…' : 'Recibir 10%'}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-4 text-xs text-red-400">{message}</p>
          )}

          <p className="mt-6 text-[11px] tracking-[0.05em] text-smoke-500 max-w-md mx-auto">
            Al suscribirte aceptas nuestra{' '}
            <a href="/privacidad" className="underline hover:text-bone">
              política de privacidad
            </a>
            . Sin spam. Puedes darte de baja en cualquier momento.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
