'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const rows = [
  { feature: 'Cámara HD 1080p', lensmind: true, generic: false },
  { feature: 'Sensor Sony con HDR', lensmind: true, generic: false },
  { feature: 'IA por voz integrada', lensmind: true, generic: false },
  { feature: 'Traductor 40 idiomas', lensmind: true, generic: false },
  { feature: 'Audio direccional open-ear', lensmind: true, generic: false },
  { feature: '4 micrófonos con cancelación', lensmind: true, generic: false },
  { feature: 'Almacenamiento 32GB', lensmind: true, generic: false },
  { feature: 'Bluetooth 5.3 baja latencia', lensmind: true, generic: false },
  { feature: 'Soporte oficial LATAM', lensmind: true, generic: false },
  { feature: 'Garantía 1 año fábrica', lensmind: true, generic: false },
];

export default function ComparisonTable() {
  return (
    <section
      id="comparativa"
      className="py-24 md:py-40 bg-ink-900 border-t border-ink-700"
    >
      <div className="container-padded">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <p className="eyebrow mb-6">Comparativa</p>
          <h2 className="display-heading text-display-md text-bone text-balance">
            Misma forma. Otra liga.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 md:gap-12 pb-5 border-b border-ink-700 mb-2">
            <div className="text-[11px] tracking-[0.18em] uppercase text-smoke-500 font-medium">
              Característica
            </div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-bone font-semibold w-20 md:w-32 text-center">
              Lensmind™
            </div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-smoke-500 w-20 md:w-32 text-center">
              Genéricas
            </div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-[1fr_auto_auto] gap-4 md:gap-12 py-4 border-b border-ink-800 items-center"
            >
              <div className="text-sm md:text-base text-bone-200">
                {row.feature}
              </div>
              <div className="w-20 md:w-32 flex justify-center">
                {row.lensmind ? (
                  <Check size={18} className="text-ember" strokeWidth={2.5} />
                ) : (
                  <X size={18} className="text-smoke-600" strokeWidth={2} />
                )}
              </div>
              <div className="w-20 md:w-32 flex justify-center">
                {row.generic ? (
                  <Check size={18} className="text-smoke-500" strokeWidth={2.5} />
                ) : (
                  <X size={18} className="text-smoke-700" strokeWidth={2} />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
