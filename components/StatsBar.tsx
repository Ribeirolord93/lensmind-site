'use client';

import { motion } from 'framer-motion';

const stats = [
  {
    number: '2,400+',
    label: 'Clientes',
    detail: 'en LATAM',
  },
  {
    number: '4.8',
    label: 'Calificación',
    detail: '412 reseñas',
  },
  {
    number: '12h',
    label: 'Batería',
    detail: 'uso continuo',
  },
  {
    number: '40',
    label: 'Idiomas',
    detail: 'traducción IA',
  },
];

export default function StatsBar() {
  return (
    <section className="py-24 md:py-32 bg-ink-900 border-t border-b border-ink-700">
      <div className="container-padded">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
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
                {stat.number}
              </div>
              <div className="space-y-1">
                <div className="text-[11px] tracking-[0.18em] uppercase text-bone font-medium">
                  {stat.label}
                </div>
                <div className="text-xs text-smoke-500">
                  {stat.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
