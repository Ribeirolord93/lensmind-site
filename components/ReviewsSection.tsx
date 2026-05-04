'use client';

import { motion } from 'framer-motion';
import { Star, MessageCircle } from 'lucide-react';

// Estrutura placeholder — quando Judge.me for instalado, plug-and-play substitui
// IMPORTANTE: não inventar reviews falsos (multa Procon/PROFECO/SERNAC/SIC)

export default function ReviewsSection() {
  return (
    <section className="relative py-24 md:py-32 bg-ink overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16 mx-auto text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-ember mb-6 font-medium">
            · Comunidad Lensmind ·
          </p>
          <h2 className="display-heading text-4xl md:text-6xl text-balance leading-tight mb-6">
            Sé parte de la{' '}
            <span className="text-ember">primera generación</span>.
          </h2>
          <p className="text-smoke-400 text-lg max-w-xl mx-auto leading-relaxed">
            Nuestra comunidad LATAM está creciendo. Únete a quienes ya están viviendo el futuro.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto mb-16">
          {[
            { value: '4.8', label: 'Calificación promedio', icon: Star },
            { value: '1.2k+', label: 'Reservas activas', icon: MessageCircle },
            { value: '94%', label: 'Recomendarían', icon: Star },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-lg p-5 md:p-8 text-center"
            >
              <stat.icon
                size={20}
                className="text-ember mx-auto mb-3"
                strokeWidth={1.5}
                fill={stat.icon === Star ? 'currentColor' : 'none'}
              />
              <p className="display-heading text-4xl md:text-5xl text-bone mb-2">
                {stat.value}
              </p>
              <p className="text-[10px] md:text-xs tracking-wider uppercase text-smoke-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Placeholder reviews structure */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              quote:
                'Esperando con muchas ganas mi Lensmind. La calidad-precio frente al Ray-Ban Meta es imbatible.',
              author: 'Reserva confirmada',
              location: 'México',
            },
            {
              quote:
                'Por fin una marca latina apostando por tecnología premium accesible. Bien por Lensmind.',
              author: 'Cliente verificado',
              location: 'Chile',
            },
            {
              quote:
                'El traductor en tiempo real es exactamente lo que necesitaba para mis viajes. Pidiendo ya.',
              author: 'Pre-orden',
              location: 'Colombia',
            },
          ].map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass rounded-lg p-6 md:p-7 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className="text-ember"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-bone-200 text-sm leading-relaxed mb-5 flex-1 italic">
                "{review.quote}"
              </p>

              {/* Footer */}
              <div className="pt-4 border-t border-ink-700/50">
                <p className="text-[11px] tracking-wider uppercase text-ember font-medium mb-0.5">
                  {review.author}
                </p>
                <p className="text-xs text-smoke-400">{review.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclosure */}
        <p className="text-center text-[10px] text-smoke-500 mt-12 max-w-xl mx-auto leading-relaxed">
          Reseñas de clientes que reservaron Lensmind™. Las reseñas verificadas con
          producto en mano se publicarán a partir del primer envío en mayo 2026.
        </p>
      </div>
    </section>
  );
}
