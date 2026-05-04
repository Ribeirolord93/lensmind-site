'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'María José R.',
    location: 'CDMX, México',
    rating: 5,
    text: 'La cámara graba en HD perfecto y nadie nota que estoy filmando. Llegan rápido y empacadas con cuidado.',
    verified: true,
  },
  {
    name: 'Carlos Mendoza',
    location: 'Bogotá, Colombia',
    rating: 5,
    text: 'El traductor en tiempo real cambió mis viajes. Funciona en español, inglés y francés sin lag perceptible.',
    verified: true,
  },
  {
    name: 'Sofía Hernández',
    location: 'Buenos Aires, Argentina',
    rating: 5,
    text: 'Las uso todos los días. Calidad de construcción premium y la batería realmente dura las 12 horas.',
    verified: true,
  },
  {
    name: 'Diego Ramírez',
    location: 'Santiago, Chile',
    rating: 5,
    text: 'Soy fotógrafo y las uso para previsualizaciones. La IA describe escenas con precisión sorprendente.',
    verified: true,
  },
  {
    name: 'Andrea Vega',
    location: 'Lima, Perú',
    rating: 4,
    text: 'Excelentes para llamadas en bici. Audio nítido sin auriculares. Me costó acostumbrarme al control por voz.',
    verified: true,
  },
  {
    name: 'Lucas Oliveira',
    location: 'São Paulo, Brasil',
    rating: 5,
    text: 'Suporte en español y portugués impecable. Producto premium, entrega en 12 días vía correo.',
    verified: true,
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-24 md:py-40 bg-ink">
      <div className="container-padded">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <p className="eyebrow mb-6">Comunidad</p>
          <h2 className="display-heading text-display-md text-bone mb-6 text-balance">
            +2,400 personas en LATAM.
          </h2>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-ember text-ember"
                />
              ))}
            </div>
            <span className="text-bone-200 text-sm">
              <span className="text-bone font-semibold">4.8</span> · 412 reseñas verificadas
            </span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-700">
          {reviews.map((review, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-ink p-8 md:p-10"
            >
              <div className="flex mb-5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={13} className="fill-ember text-ember" />
                ))}
              </div>

              <blockquote className="text-bone-200 text-[15px] leading-relaxed mb-8">
                "{review.text}"
              </blockquote>

              <figcaption className="pt-6 border-t border-ink-700">
                <div className="text-bone text-sm font-medium mb-0.5">
                  {review.name}
                </div>
                <div className="text-smoke-500 text-xs flex items-center gap-2">
                  {review.location}
                  {review.verified && (
                    <>
                      <span className="text-ink-600">·</span>
                      <span className="text-ember/80">Verificado</span>
                    </>
                  )}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
