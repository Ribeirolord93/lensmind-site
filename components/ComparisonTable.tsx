'use client';

import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';

// Mix de specs técnicas reais + diferenciadores LATAM
// Cada linha pode ser texto comparativo (specs) ou check/cross/partial
type RowState = 'check' | 'partial' | 'none' | 'text';

interface Row {
  feature: string;
  lensmind: string;
  rival: string;
  state: RowState;
}

const techSpecs: Row[] = [
  // Especificações técnicas — paridade
  {
    feature: 'Resolución de cámara',
    lensmind: '1080p HD',
    rival: '1080p HD',
    state: 'text',
  },
  {
    feature: 'Conectividad',
    lensmind: 'Bluetooth 5.3',
    rival: 'Bluetooth 5.3',
    state: 'text',
  },
  {
    feature: 'Asistente de IA por voz',
    lensmind: 'Sí',
    rival: 'Sí',
    state: 'text',
  },
  {
    feature: 'Audio open-ear manos libres',
    lensmind: '4 micrófonos',
    rival: '5 micrófonos',
    state: 'text',
  },
  {
    feature: 'Resistencia al agua',
    lensmind: 'IPX4',
    rival: 'IPX4',
    state: 'text',
  },
];

const advantages: Row[] = [
  // Diferenças onde Lensmind ganha
  {
    feature: 'Traductor en tiempo real',
    lensmind: '40 idiomas (12 offline)',
    rival: 'Limitado',
    state: 'text',
  },
  {
    feature: 'Disponibilidad oficial en LATAM',
    lensmind: 'Sí',
    rival: 'No',
    state: 'check',
  },
  {
    feature: 'Soporte en español y portugués',
    lensmind: 'Sí',
    rival: 'No',
    state: 'check',
  },
  {
    feature: 'Pago en moneda local + cuotas',
    lensmind: 'Sí',
    rival: 'No',
    state: 'check',
  },
  {
    feature: 'Garantía con reposición LATAM',
    lensmind: '30 días + 1 año',
    rival: 'Importación',
    state: 'check',
  },
  {
    feature: 'LED visible al grabar',
    lensmind: 'Siempre',
    rival: 'Variable',
    state: 'check',
  },
];

const TextCell = ({ value, highlight }: { value: string; highlight?: boolean }) => (
  <span
    className={`text-xs md:text-sm tracking-tight ${
      highlight ? 'text-bone font-semibold' : 'text-smoke-400'
    }`}
  >
    {value}
  </span>
);

const Cell = ({ row, isLensmind }: { row: Row; isLensmind: boolean }) => {
  const value = isLensmind ? row.lensmind : row.rival;

  if (row.state === 'text') {
    return <TextCell value={value} highlight={isLensmind} />;
  }
  if (row.state === 'check' && isLensmind) {
    return <Check size={18} className="text-ember mx-auto" strokeWidth={2.5} />;
  }
  if (row.state === 'partial') {
    return (
      <span className="text-smoke-400 text-xs tracking-wide font-medium">
        Limitado
      </span>
    );
  }
  if (!isLensmind && (row.state === 'check' || row.state === 'none')) {
    return value === 'No' ? (
      <Minus size={18} className="text-smoke-700 mx-auto" strokeWidth={2} />
    ) : (
      <TextCell value={value} />
    );
  }
  return <TextCell value={value} highlight={isLensmind} />;
};

export default function ComparisonTable() {
  const renderRow = (row: Row, i: number) => (
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
      <div className="text-sm md:text-base text-bone-200">{row.feature}</div>
      <div className="w-28 md:w-36 flex justify-center text-center">
        <Cell row={row} isLensmind={true} />
      </div>
      <div className="w-28 md:w-36 flex justify-center text-center">
        <Cell row={row} isLensmind={false} />
      </div>
    </motion.div>
  );

  return (
    <section
      id="comparativa"
      className="py-16 md:py-28 bg-ink-900 border-t border-ink-700"
    >
      <div className="container-padded">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <p className="eyebrow mb-6">Comparativa técnica</p>
          <h2 className="display-heading text-display-md text-bone mb-6 text-balance">
            Misma tecnología.
            <br />
            Pensada para LATAM.
          </h2>
          <p className="text-bone-300 text-base leading-relaxed max-w-2xl">
            Comparativa honesta con Ray-Ban Meta — la referencia de la categoría.
            Mismo nivel técnico, ventajas reales en disponibilidad y soporte
            regional.
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
            <div className="text-[11px] tracking-[0.18em] uppercase text-bone font-semibold w-28 md:w-36 text-center">
              Lensmind™
            </div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-smoke-500 w-28 md:w-36 text-center">
              Ray-Ban Meta
            </div>
          </div>

          {/* Sub-section: especificaciones técnicas */}
          <div className="pt-4 pb-2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-ember/80 font-semibold">
              Especificaciones técnicas
            </p>
          </div>
          {techSpecs.map((row, i) => renderRow(row, i))}

          {/* Sub-section: ventajas LATAM */}
          <div className="pt-8 pb-2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-ember/80 font-semibold">
              Ventajas regionales
            </p>
          </div>
          {advantages.map((row, i) => renderRow(row, i + techSpecs.length))}

          {/* Price row - special highlight */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: (techSpecs.length + advantages.length) * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid grid-cols-[1fr_auto_auto] gap-3 md:gap-12 py-6 mt-4 border-t border-ink-700 items-center"
          >
            <div className="text-base md:text-lg text-bone font-semibold">
              Precio
            </div>
            <div className="w-28 md:w-36 text-center">
              <div className="text-bone font-semibold text-xl md:text-2xl">
                $149.00
              </div>
              <div className="text-[10px] uppercase tracking-wider text-ember">
                USD
              </div>
            </div>
            <div className="w-28 md:w-36 text-center">
              <div className="text-smoke-500 text-xl md:text-2xl">
                $379
              </div>
              <div className="text-[10px] uppercase tracking-wider text-smoke-600">
                USD
              </div>
            </div>
          </motion.div>

          {/* Highlight de economia */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-[1fr_auto_auto] gap-3 md:gap-12 py-3 items-center bg-ember/5 border-l-2 border-ember rounded-r-lg pl-3"
          >
            <div className="text-sm text-ember font-medium">
              Ahorro
            </div>
            <div className="w-28 md:w-36 text-center text-ember font-semibold text-base">
              −$229.01 USD
            </div>
            <div className="w-28 md:w-36" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-xs text-smoke-500 max-w-2xl"
        >
          Fuente: comparativa con datos públicos de Ray-Ban Meta (modelo
          Headliner standard, USD oficial en EE.UU.) a la fecha de publicación.
          Lensmind™ y Ray-Ban Meta son marcas independientes, sin afiliación.
        </motion.p>
      </div>
    </section>
  );
}
