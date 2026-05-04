'use client';

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, RotateCcw, CreditCard } from 'lucide-react';

const trustItems = [
  {
    icon: Truck,
    title: 'Envío Gratis',
    description: 'A todo LATAM en 10-17 días',
  },
  {
    icon: ShieldCheck,
    title: '30 Días Garantía',
    description: 'Devolución sin preguntas',
  },
  {
    icon: RotateCcw,
    title: 'Cambios Fáciles',
    description: 'Primera devolución gratis',
  },
  {
    icon: CreditCard,
    title: 'Pago Seguro',
    description: 'Mercado Pago · PayPal · Visa',
  },
];

export default function TrustBar() {
  return (
    <section className="relative bg-ink-950 py-10 md:py-14 border-y border-ink-700/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-ember/30 flex items-center justify-center mb-4 group-hover:border-ember group-hover:bg-ember/10 transition-all duration-500">
                <item.icon
                  size={20}
                  className="text-ember"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm md:text-base text-bone font-medium mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-smoke-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
