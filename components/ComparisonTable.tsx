'use client';

import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';

const rows = [
  // Empates honestos primero — credibilidad
  { feature: 'Cámara HD integrada', lensmind: 'check', rival: 'check' },
  { feature: 'Asistente IA por voz', lensmind: 'check', rival: 'check' },
  { feature: 'Audio open-ear manos libres', lensmind: 'check', rival: 'check' },
  { feature: 'Bluetooth 5.3', lensmind: 'check', rival: 'check' },
  { feature: 'Almacenamiento integrado', lensmind: 'check', rival: 'check' },
  // Diferenças onde Lensmind ganha
  { feature: 'Traductor 40 idiomas (12 offline)', lensmind: 'check', rival: 'partial' },
  { feature: 'Disponibilidad oficial en LATAM', lensmind: 'check', rival: 'none' },
  { feature: 'Soporte en español/portugués', lensmind: 'check', rival: 'none' },
  { feature: 'Pago en moneda local + cuotas', lensmind: 'check', rival: 'none' },
  { feature: 'Garantía con reposición LATAM', lensmind: 'check', rival: 'none' },
];

const Cell = ({ state }: { state: string }) => {
  if (state === 'check') {
    return <Check size={18} className="text-ember mx-auto" strokeWidth={2.5} />;
  }
  if (state === 'partial') {
    return (
      <span className="text-smoke-400 text-xs tracking-wide font-medium">
        Limitado
      </span>
    );
  }
  return <Minus size={18} className="text-smoke-700 mx-auto" strokeWidth={2} />;
};

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
          <h2 className="display-heading text-display-md text-bone mb-6 text-balance">
            Misma tecnología.
            <br />
            Pensada para LATAM.
          </h2>
          <p className="text-bone-300 text-base leading-relaxed max-w-2xl">
            Comparativa honesta con Ray-Ban Meta — la referencia de la
            categoría. Mismo nivel técnico, ventajas reales en disponibilidad y
            soporte regional.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {/* Header */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-3 md:gap-12 pb-5 border-b border-ink-700 mb-2">
            <div className="text-[11px] tracking-[0.18em] uppercase text-smoke-500 font-medium">
              Característica
            </div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-bone font-semibold w-24 md:w-32 text-center">
              Lensmind™
            </div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-smoke-500 w-24 md:w-32 text-center">
              Ray-Ban Meta
            </div>
          </div>

          {/* Rows */}
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
              className="grid grid-cols-[1fr_auto_auto] gap-3 md:gap-12 py-4 border-b border-ink-800 items-center"
            >
              <div className="text-sm md:text-base text-bone-200">
                {row.feature}
              </div>
              <div className="w-24 md:w-32 flex justify-center">
                <Cell state={row.lensmind} />
              </div>
              <div className="w-24 md:w-32 flex justify-center">
                <Cell state={row.rival} />
              </div>
            </motion.div>
          ))}

          {/* Price row - special highlight */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: rows.length * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid grid-cols-[1fr_auto_auto] gap-3 md:gap-12 py-6 items-center"
          >
            <div className="text-sm md:text-base text-bone font-semibold">
              Precio
            </div>
            <div className="w-24 md:w-32 text-center">
              <div className="text-bone font-semibold text-lg md:text-xl">
                $199
              </div>
              <div className="text-[10px] uppercase tracking-wider text-ember">
                USD
              </div>
            </div>
            <div className="w-24 md:w-32 text-center">
              <div className="text-smoke-500 text-lg md:text-xl">
                $379
              </div>
              <div className="text-[10px] uppercase tracking-wider text-smoke-600">
                USD
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-xs text-smoke-500 max-w-2xl"
        >
          Fuente: comparativa con datos públicos de Ray-Ban Meta (Wayfarer
          standard, USD oficial en EE.UU.) a la fecha de publicación. Lensmind™
          y Ray-Ban Meta son marcas independientes, sin afiliación.
        </motion.p>
      </div>
    </section>
  );
}
