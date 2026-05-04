'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    id: 'faq-envios',
    q: '¿Cuándo recibo mi pedido?',
    a: 'Entre 10 y 17 días hábiles desde la confirmación del pago. Envío internacional desde nuestro centro de distribución global hacia México, Colombia, Chile, Perú, Argentina y Brasil. El plazo incluye despacho aduanero. Recibirás tracking activo desde el día 3. Posibles aranceles de importación corren por cuenta del cliente según legislación local.',
  },
  {
    id: 'faq-garantia',
    q: '¿Cuál es la garantía?',
    a: '30 días de devolución sin preguntas + 1 año de garantía de fábrica contra defectos de fabricación. Soporte técnico oficial en español y portugués.',
  },
  {
    id: 'faq-devoluciones',
    q: '¿Cómo funcionan las devoluciones?',
    a: 'Si no estás satisfecho, escríbenos dentro de los primeros 30 días desde la recepción y coordinamos la devolución. El producto debe estar en su estado original con todos los accesorios. Reembolso en 5-10 días hábiles después de recibir el producto de vuelta.',
  },
  {
    id: 'faq-app',
    q: '¿Necesito instalar una app?',
    a: 'Sí. Lensmind™ se sincroniza con la app oficial (iOS/Android) para gestionar fotos, videos, configuración y actualizaciones. La app es gratuita y compatible con iOS 14+ y Android 9+.',
  },
  {
    id: 'faq-celular',
    q: '¿Funcionan sin celular?',
    a: 'La cámara, audio y traductor offline (12 idiomas) funcionan de forma autónoma. Para funciones de IA avanzada y sincronización en la nube se requiere conexión Bluetooth con tu celular.',
  },
  {
    id: 'faq-bateria',
    q: '¿Cuánto dura la batería?',
    a: '12 horas de uso normal · 6 horas de grabación continua · 200 horas en modo standby. El estuche de carga incluido proporciona 3 cargas adicionales completas.',
  },
  {
    id: 'faq-agua',
    q: '¿Son resistentes al agua?',
    a: 'Certificación IPX4 — resisten salpicaduras, sudor y lluvia ligera. No son aptas para sumergir ni para uso en piscina o ducha.',
  },
  {
    id: 'faq-pago',
    q: '¿Qué métodos de pago aceptan?',
    a: 'Visa, Mastercard, American Express, MercadoPago y PIX (Brasil). Pago en cuotas disponible según país y banco emisor.',
  },
  {
    id: 'faq-graduacion',
    q: '¿Tienen graduación o lentes intercambiables?',
    a: 'Sí. Compatibles con lentes graduados estándar (esférico hasta -6 / +4). Servicio de instalación en óptica de confianza. Las micas claras son intercambiables por las del color que prefieras.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  // Auto-open and scroll to FAQ item if URL hash matches an id
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const idx = faqs.findIndex((f) => f.id === hash);
    if (idx >= 0) {
      setOpen(idx);
      // Defer scroll until after expand animation
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, []);

  return (
    <section id="faq" className="py-16 md:py-28 bg-ink">
      {/* JSON-LD FAQPage — Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

      <div className="container-padded">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-10 md:mb-14"
        >
          <p className="eyebrow mb-6">Preguntas frecuentes</p>
          <h2 className="display-heading text-display-md text-bone text-balance">
            Lo que quieres saber.
          </h2>
        </motion.div>

        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              id={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-b border-ink-700 first:border-t scroll-mt-24"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full py-6 md:py-8 flex items-center justify-between gap-6 text-left group"
              >
                <span className="text-bone text-base md:text-lg font-medium pr-4 group-hover:text-bone-300 transition-colors">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-shrink-0 text-bone-300"
                >
                  <Plus size={22} strokeWidth={1.5} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 md:pb-8 text-bone-300 text-[15px] leading-relaxed max-w-2xl">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
