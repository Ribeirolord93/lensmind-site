'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBER = '5521967440808';
const DEFAULT_MESSAGE = encodeURIComponent(
  '¡Hola Lensmind! Quiero saber más sobre las gafas inteligentes con IA 👓✨'
);

export default function WhatsAppFAB() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  useEffect(() => {
    if (tooltipDismissed) return;

    // Mostra tooltip após 8 segundos no site (engagement signal)
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 8000);

    // Auto-esconde depois de 6 segundos
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 14000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [tooltipDismissed]);

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-30">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full right-0 mb-3 w-64"
          >
            <div className="relative bg-bone text-ink p-4 rounded-lg shadow-2xl">
              <button
                onClick={() => {
                  setShowTooltip(false);
                  setTooltipDismissed(true);
                }}
                className="absolute top-2 right-2 text-ink/40 hover:text-ink transition-colors"
                aria-label="Cerrar"
              >
                <X size={14} />
              </button>
              <p className="text-sm font-medium pr-4">
                ¿Tienes dudas? 👋
              </p>
              <p className="text-xs text-ink/70 mt-1 leading-relaxed">
                Responde tu asesor humano por WhatsApp en menos de 5 minutos.
              </p>
              {/* Triangle pointer */}
              <div
                className="absolute -bottom-2 right-6 w-4 h-4 bg-bone rotate-45"
                style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Hablar por WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg shadow-[#25D366]/30 transition-colors"
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        {/* WhatsApp icon SVG (oficial) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 relative z-10"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </div>
  );
}
