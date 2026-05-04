'use client';

import { useEffect, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check } from 'lucide-react';

const STORAGE_KEY = 'lensmind_exit_intent_shown';

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Verifica se já foi mostrado nesta sessão
    if (typeof window === 'undefined') return;

    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);
    if (alreadyShown) return;

    let triggered = false;

    // Desktop: detecta mouse saindo pelo topo
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered) {
        triggered = true;
        setOpen(true);
        sessionStorage.setItem(STORAGE_KEY, '1');
      }
    };

    // Mobile: dispara após 45s no site (proxy de "considerou e quase saiu")
    const mobileTimer = setTimeout(() => {
      if (!triggered) {
        triggered = true;
        setOpen(true);
        sessionStorage.setItem(STORAGE_KEY, '1');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    // Aqui você integra com Mailchimp / Klaviyo / Shopify Email
    // Por enquanto, só mostramos confirmação
    console.log('[Lensmind] Email capturado:', email);
    setSubmitted(true);

    // Auto-fecha após 4s
    setTimeout(() => setOpen(false), 4000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md"
          >
            <div className="relative bg-ink-900 border border-ember/20 rounded-lg p-8 shadow-2xl">
              {/* Background glow */}
              <div className="absolute inset-0 bg-ember/[0.04] rounded-lg pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-smoke-400 hover:text-bone transition-colors z-10"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>

              <div className="relative">
                {!submitted ? (
                  <>
                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                      <div className="w-14 h-14 rounded-full bg-ember/15 border border-ember/30 flex items-center justify-center">
                        <Sparkles
                          size={24}
                          className="text-ember"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Eyebrow */}
                    <p className="text-[11px] tracking-[0.3em] uppercase text-ember text-center mb-3 font-medium">
                      · Espera, no te vayas ·
                    </p>

                    {/* Headline */}
                    <h3 className="display-heading text-3xl md:text-4xl text-center text-balance mb-4 leading-tight">
                      Llévate <span className="text-ember">10% off</span> en tu primer Lensmind.
                    </h3>

                    {/* Description */}
                    <p className="text-smoke-400 text-sm text-center mb-6 leading-relaxed">
                      Suscríbete y recibe el código exclusivo. Sin spam, solo
                      ofertas que valen la pena.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        required
                        className="w-full bg-ink-800 border border-ink-700 px-4 py-3.5 text-bone placeholder:text-smoke-500 focus:outline-none focus:border-ember rounded-sm transition-colors"
                      />
                      <button
                        type="submit"
                        className="btn-ember w-full"
                      >
                        <span>Quiero mi 10% off</span>
                      </button>
                    </form>

                    <p className="text-[10px] text-smoke-500 text-center mt-4 tracking-wider">
                      Al suscribirte aceptas recibir emails de Lensmind. Puedes
                      darte de baja en cualquier momento.
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="flex justify-center mb-5">
                      <div className="w-16 h-16 rounded-full bg-ember/15 border-2 border-ember flex items-center justify-center">
                        <Check
                          size={28}
                          className="text-ember"
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                    <h3 className="display-heading text-3xl mb-3">
                      ¡Bienvenido a la familia!
                    </h3>
                    <p className="text-smoke-400 text-sm">
                      Revisa tu correo en los próximos minutos. Tu código de{' '}
                      <span className="text-ember font-medium">10% off</span>{' '}
                      llegará pronto.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
