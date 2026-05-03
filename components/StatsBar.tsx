'use client';

import { motion } from 'framer-motion';

const stats = [
  {
    value: '5x',
    label: 'Crecimiento del mercado de gafas con IA en 2026',
    source: 'Análisis Mercado Tech',
  },
  {
    value: '17.7%',
    label: 'México lidera el e-commerce LATAM superando a EE.UU.',
    source: 'LATAM Digital 2026',
  },
  {
    value: '60%',
    label: 'Más accesible que el Ray-Ban Meta — sin sacrificar tecnología',
    source: 'Comparativa Lensmind',
  },
];

export default function StatsBar() {
  return (
    <section className="relative py-24 md:py-32 bg-ink-900 overflow-hidden border-y border-ink-700/30">
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-ember mb-4 font-medium">
            · La Revolución ·
          </p>
          <h2 className="display-heading text-4xl md:text-5xl text-balance">
            La nueva era de las{' '}
            <span className="text-ember">gafas inteligentes</span> ya empezó.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-700/30">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="bg-ink-900 p-10 md:p-12 text-center"
            >
              <p className="display-heading text-7xl md:text-8xl text-ember mb-4 leading-none">
                {stat.value}
              </p>
              <p className="text-bone-200 mb-3 text-balance leading-relaxed">
                {stat.label}
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-smoke-500">
                — {stat.source}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
