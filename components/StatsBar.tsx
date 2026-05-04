'use client';

import { motion } from 'framer-motion';

const specs = [
  {
    number: '12h',
    label: 'Batería',
    detail: 'uso continuo',
  },
  {
    number: '40',
    label: 'Idiomas',
    detail: '12 offline',
  },
  {
    number: '32',
    label: 'GB internos',
    detail: 'sin app extra',
  },
  {
    number: 'IPX4',
    label: 'Resistencia',
    detail: 'salpicaduras',
  },
];

export default function SpecsBar() {
  return (
    <section
      id="specs"
      className="py-24 md:py-32 bg-ink-900 border-t border-b border-ink-700"
    >
      <div className="container-padded">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <p className="eyebrow mb-3">Especificaciones</p>
          <h2 className="display-heading text-display-sm text-bone text-balance max-w-2xl">
            Ingeniería que no se ve, prestaciones que sí.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-3"
            >
              <div className="display-heading text-5xl md:text-7xl text-bone tracking-tighter leading-none">
                {spec.number}
              </div>
              <div className="space-y-1">
                <div className="text-[11px] tracking-[0.18em] uppercase text-bone font-medium">
                  {spec.label}
                </div>
                <div className="text-xs text-smoke-500">{spec.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
