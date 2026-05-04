'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '1080p', label: 'Sony HDR' },
  { value: '40', label: 'Idiomas' },
  { value: '12h', label: 'Batería' },
  { value: '30d', label: 'Garantía' },
];

export default function TrustBar() {
  return (
    <section className="border-t border-b border-ink-700 bg-ink-900">
      <div className="container-padded">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink-700">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="py-8 px-4 md:py-10 md:px-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-semibold text-bone tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-smoke-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
