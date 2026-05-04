'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';

// Notificações realistas — nomes e cidades LATAM
// Quando tiver vendas reais, substituir por feed do Shopify
const PROOF_DATA = [
  { name: 'Carlos M.', city: 'Ciudad de México', time: '12 min' },
  { name: 'Sofía R.', city: 'Guadalajara', time: '34 min' },
  { name: 'Diego L.', city: 'Santiago', time: '1 h' },
  { name: 'Andrea P.', city: 'Bogotá', time: '2 h' },
  { name: 'Mateo V.', city: 'Monterrey', time: '3 h' },
  { name: 'Camila S.', city: 'Medellín', time: '4 h' },
  { name: 'Javier T.', city: 'Valparaíso', time: '5 h' },
  { name: 'Paula G.', city: 'Cali', time: '6 h' },
  { name: 'Ricardo F.', city: 'Puebla', time: '8 h' },
  { name: 'Valentina H.', city: 'Cartagena', time: '11 h' },
];

export default function ProofToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Espera 15 segundos antes de mostrar primeira notificação
    const initialDelay = setTimeout(() => {
      setVisible(true);
    }, 15000);

    return () => clearTimeout(initialDelay);
  }, [dismissed]);

  useEffect(() => {
    if (!visible || dismissed) return;

    // Cada notificação aparece por 5s, depois fica oculto por 12s, depois próxima
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % PROOF_DATA.length);
        setVisible(true);
      }, 1000);
    }, 17000);

    return () => clearInterval(cycle);
  }, [visible, dismissed]);

  if (dismissed) return null;

  const current = PROOF_DATA[currentIndex];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 z-30 max-w-[280px] hidden sm:block"
        >
          <div className="glass-strong rounded-lg p-4 pr-9 shadow-2xl border border-ember/20">
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2 right-2 text-smoke-500 hover:text-smoke-300 transition-colors"
              aria-label="Cerrar"
            >
              <X size={14} />
            </button>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-ember/15 border border-ember/30 flex items-center justify-center">
                <ShoppingBag
                  size={15}
                  className="text-ember"
                  strokeWidth={1.5}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-bone leading-tight">
                  <span className="font-medium">{current.name}</span>
                  <span className="text-smoke-400">
                    {' '}
                    de {current.city}
                  </span>
                </p>
                <p className="text-xs text-smoke-400 mt-0.5">
                  Compró Lensmind™ hace {current.time}
                </p>
                <p className="text-[10px] text-ember mt-1.5 tracking-wider uppercase font-medium">
                  ✓ Pago verificado
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
