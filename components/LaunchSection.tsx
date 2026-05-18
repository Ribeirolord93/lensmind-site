'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const benefits = [
  {
    n: '01',
    title: 'Precio de lanzamiento',
    detail:
      '$149.00 USD durante el lanzamiento — el precio sube a $199 USD una vez agotada esta serie.',
  },
  {
    n: '02',
    title: 'Envío prioritario',
    detail:
      'Las primeras 100 unidades se envían en 7-10 días con tracking activo desde día 1.',
  },
  {
    n: '03',
    title: 'Soporte directo',
    detail:
      'Acceso WhatsApp directo con el equipo Lensmind para configuración inicial y dudas técnicas.',
  },
  {
    n: '04',
    title: 'Garantía extendida',
    detail:
      '30 días de devolución sin preguntas + 1 año de garantía oficial. Cobertura ampliada para early adopters.',
  },
];

export default function LaunchSection() {
  return (
    <section className="py-16 md:py-28 bg-ink">
      <div className="container-padded">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <p className="eyebrow mb-6">Lanzamiento</p>
          <h2 className="display-heading text-display-md text-bone mb-6 text-balance">
            Sé de los primeros
            <br />
            en LATAM.
          </h2>
          <p className="text-bone-300 text-lg leading-relaxed max-w-2xl">
            Lensmind™ Edition 01 es una serie de lanzamiento limitada para early
            adopters en Latinoamérica. Acceso anticipado, precio especial y
            soporte directo del equipo.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 gap-px bg-ink-700 mb-12 md:mb-16">
          {benefits.map((b, i) => (
            <motion.div
              key={b.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-ink p-8 md:p-10 space-y-4"
            >
              <div className="text-[10px] tracking-[0.18em] uppercase text-ember font-semibold">
                {b.n}
              </div>
              <h3 className="text-bone text-xl md:text-2xl font-semibold tracking-tight">
                {b.title}
              </h3>
              <p className="text-bone-300 text-sm leading-relaxed">
                {b.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Honest CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-ink-700 pt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="max-w-xl">
            <p className="text-[11px] tracking-[0.18em] uppercase text-ember mb-3 font-medium">
              Serie de lanzamiento · Edition 01
            </p>
            <p className="text-bone-200 text-base md:text-lg leading-relaxed">
              Esta primera serie tiene asignación limitada por país en LATAM.
              Asegura tu unidad antes de que pase al precio regular.
            </p>
          </div>
          <Link href="#comprar" className="btn-primary group flex-shrink-0">
            Comprar — $149.00 USD
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
