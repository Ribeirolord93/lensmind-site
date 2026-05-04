'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';

type Consent = {
  necessary: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: number;
};

const CONSENT_KEY = 'lensmind-cookie-consent';
const CONSENT_VERSION = 1;

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    // Check stored consent on mount
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        setShow(true);
        return;
      }
      const parsed: Consent = JSON.parse(stored);
      // If consent version changed, re-ask
      if (parsed.version !== CONSENT_VERSION) {
        setShow(true);
      } else {
        // Apply stored consent
        applyConsent(parsed);
      }
    } catch {
      setShow(true);
    }
  }, []);

  function applyConsent(consent: Consent) {
    if (typeof window === 'undefined') return;
    // Expose consent globally for analytics/pixel scripts to check
    (window as any).__lensmindConsent = consent;
    // Notify any listeners (e.g. analytics loader)
    window.dispatchEvent(
      new CustomEvent('lensmind:consent', { detail: consent })
    );
  }

  function save(consent: Omit<Consent, 'timestamp' | 'version'>) {
    const full: Consent = {
      ...consent,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(full));
    } catch {
      // Silent fail (private mode etc) — still apply for current session
    }
    applyConsent(full);
    setShow(false);
    setShowCustomize(false);
  }

  function acceptAll() {
    save({ necessary: true, analytics: true, marketing: true });
  }

  function rejectAll() {
    save({ necessary: true, analytics: false, marketing: false });
  }

  function saveCustom() {
    save({ necessary: true, analytics, marketing });
  }

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop when customize panel is open */}
          {showCustomize && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-[100]"
              onClick={() => setShowCustomize(false)}
              aria-hidden="true"
            />
          )}

          {/* Banner — fixed bottom */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Aviso de cookies"
            className="fixed bottom-0 inset-x-0 z-[101] safe-area-padding"
          >
            {showCustomize ? (
              <div className="bg-ink-900 border-t border-ink-700 px-6 py-8 md:py-10">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <p className="eyebrow mb-2">Personalizar cookies</p>
                      <h3 className="text-bone text-xl md:text-2xl font-semibold tracking-tight">
                        Preferencias de privacidad
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowCustomize(false)}
                      className="text-smoke-400 hover:text-bone p-2 -mr-2"
                      aria-label="Cerrar"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4 mb-8">
                    {/* Necessary - always on */}
                    <div className="flex items-start gap-4 p-4 bg-ink rounded-xl border border-ink-700">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-bone font-medium text-sm">
                            Necesarias
                          </h4>
                          <span className="text-[10px] tracking-wider uppercase text-smoke-500">
                            Siempre activas
                          </span>
                        </div>
                        <p className="text-smoke-400 text-xs leading-relaxed">
                          Esenciales para el funcionamiento del sitio: carrito,
                          sesión, preferencias de idioma. No pueden desactivarse.
                        </p>
                      </div>
                      <div className="w-10 h-6 bg-ember/40 rounded-full relative flex-shrink-0">
                        <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-ember rounded-full" />
                      </div>
                    </div>

                    {/* Analytics */}
                    <label className="flex items-start gap-4 p-4 bg-ink rounded-xl border border-ink-700 cursor-pointer hover:border-ink-600 transition-colors">
                      <div className="flex-1">
                        <h4 className="text-bone font-medium text-sm mb-1">
                          Analítica
                        </h4>
                        <p className="text-smoke-400 text-xs leading-relaxed">
                          Google Analytics y similares. Nos ayudan a mejorar el
                          sitio entendiendo cómo se usa, de forma agregada y
                          anónima.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={analytics}
                        onChange={(e) => setAnalytics(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-6 rounded-full relative flex-shrink-0 transition-colors ${
                          analytics ? 'bg-ember/40' : 'bg-ink-700'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${
                            analytics
                              ? 'right-0.5 bg-ember'
                              : 'left-0.5 bg-smoke-600'
                          }`}
                        />
                      </div>
                    </label>

                    {/* Marketing */}
                    <label className="flex items-start gap-4 p-4 bg-ink rounded-xl border border-ink-700 cursor-pointer hover:border-ink-600 transition-colors">
                      <div className="flex-1">
                        <h4 className="text-bone font-medium text-sm mb-1">
                          Marketing
                        </h4>
                        <p className="text-smoke-400 text-xs leading-relaxed">
                          Meta Pixel, Google Ads y similares. Utilizadas para
                          mostrarte anuncios relevantes en otros sitios.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={marketing}
                        onChange={(e) => setMarketing(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-6 rounded-full relative flex-shrink-0 transition-colors ${
                          marketing ? 'bg-ember/40' : 'bg-ink-700'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${
                            marketing
                              ? 'right-0.5 bg-ember'
                              : 'left-0.5 bg-smoke-600'
                          }`}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={saveCustom} className="btn-primary flex-1">
                      Guardar preferencias
                    </button>
                    <button onClick={acceptAll} className="btn-secondary flex-1">
                      Aceptar todas
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-ink-900/95 backdrop-blur-xl border-t border-ink-700 px-6 py-5 md:py-6">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                  <div className="flex-1">
                    <p className="text-bone-200 text-sm leading-relaxed">
                      Usamos cookies para mejorar tu experiencia, analizar el
                      uso del sitio y mostrar publicidad relevante. Puedes
                      aceptar todas, rechazarlas o personalizar.{' '}
                      <Link
                        href="/cookies"
                        className="underline hover:text-bone"
                      >
                        Más información
                      </Link>
                      .
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setShowCustomize(true)}
                      className="px-5 py-2.5 text-xs font-medium tracking-tight text-bone-200 hover:text-bone transition-colors"
                    >
                      Personalizar
                    </button>
                    <button
                      onClick={rejectAll}
                      className="px-5 py-2.5 text-xs font-medium tracking-tight bg-transparent text-bone border border-ink-600 hover:border-bone rounded-full transition-all"
                    >
                      Rechazar
                    </button>
                    <button
                      onClick={acceptAll}
                      className="px-5 py-2.5 text-xs font-medium tracking-tight bg-bone text-ink rounded-full hover:bg-bone-300 transition-all"
                    >
                      Aceptar todas
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
