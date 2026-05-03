'use client';

import { motion } from 'framer-motion';
import { Camera, Sparkles, Headphones, Languages } from 'lucide-react';

const features = [
  {
    icon: Camera,
    label: 'Captura',
    title: 'Cámara Sony 1080p',
    description:
      'Graba videos y fotos con un toque. Sensor de 8 megapíxeles con estabilización integrada para capturar momentos sin sacar el celular.',
    spec: '30fps · Anti-Shake',
  },
  {
    icon: Sparkles,
    label: 'Inteligencia',
    title: 'Asistente de IA',
    description:
      'Pregunta lo que sea por voz. Traducciones, resúmenes, datos al instante. Tu copiloto personal — siempre disponible, nunca en el camino.',
    spec: 'Voice-First · 24/7',
  },
  {
    icon: Headphones,
    label: 'Sonido',
    title: 'Audio Direccional',
    description:
      'Bocinas abiertas de alta fidelidad y 4 micrófonos con cancelación de ruido. Música, llamadas, podcasts — sin auriculares, sin estorbos.',
    spec: 'Bluetooth 5.3 · 4 Mics',
  },
  {
    icon: Languages,
    label: 'Traducción',
    title: 'Traductor en Tiempo Real',
    description:
      'Conversaciones en 40 idiomas, traducidas al instante en tu oído. Perfecto para viajes, negocios o conectar con cualquier persona, en cualquier lugar.',
    spec: '40 Idiomas · En Vivo',
  },
];

export default function BenefitsGrid() {
  return (
    <section
      id="tecnologia"
      className="relative py-32 md:py-40 bg-ink overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <p className="text-[11px] tracking-[0.3em] uppercase text-ember mb-6 font-medium">
            · 04 Capacidades ·
          </p>
          <h2 className="display-heading text-5xl md:text-7xl text-balance mb-6">
            Tecnología que{' '}
            <span className="text-ember">desaparece</span>.{' '}
            Funciones que <span className="not-italic text-bone">aparecen</span>.
          </h2>
          <p className="text-smoke-400 text-lg max-w-xl leading-relaxed">
            Cada detalle pensado para que la tecnología trabaje por ti — no al
            revés. Sin interfaces complicadas. Sin botones. Solo tu voz y el
            mundo.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-700/30">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-ink p-10 md:p-14 group relative overflow-hidden hover:bg-ink-900 transition-colors duration-700"
            >
              {/* Number watermark */}
              <span className="absolute top-6 right-6 text-display italic text-7xl md:text-8xl font-light text-ink-700 leading-none select-none">
                0{i + 1}
              </span>

              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full border border-ember/30 flex items-center justify-center group-hover:border-ember group-hover:bg-ember/10 transition-all duration-500">
                    <feature.icon
                      size={20}
                      className="text-ember"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-[11px] tracking-[0.3em] uppercase text-smoke-500">
                    {feature.label}
                  </span>
                </div>

                <h3 className="display-heading text-3xl md:text-4xl mb-5 text-bone">
                  {feature.title}
                </h3>

                <p className="text-smoke-400 leading-relaxed mb-8 max-w-md">
                  {feature.description}
                </p>

                <div className="flex items-center gap-3 pt-6 border-t border-ink-700/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                  <span className="text-xs tracking-widest uppercase text-bone-400 font-mono">
                    {feature.spec}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
