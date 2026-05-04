'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: '¿Cuándo recibo mi pedido?',
    a: 'Entre 10 y 17 días hábiles desde la confirmación del pago. Envíos a México, Colombia, Chile, Perú, Argentina y Brasil. Recibirás tracking activo desde el día 3.',
  },
  {
    q: '¿Cuál es la garantía?',
    a: '30 días de devolución sin preguntas + 1 año de garantía de fábrica contra defectos de fabricación. Soporte técnico oficial en español y portugués.',
  },
  {
    q: '¿Necesito instalar una app?',
    a: 'Sí. Lensmind™ se sincroniza con la app oficial (iOS/Android) para gestionar fotos, videos, configuración y actualizaciones. La app es gratuita y compatible con iOS 14+ y Android 9+.',
  },
  {
    q: '¿Funcionan sin celular?',
    a: 'La cámara, audio y traductor offline (12 idiomas) funcionan de forma autónoma. Para funciones de IA avanzada y sincronización en la nube se requiere conexión Bluetooth con tu celular.',
  },
  {
    q: '¿Cuánto dura la batería?',
    a: '12 horas de uso normal · 6 horas de grabación continua · 200 horas en modo standby. El estuche de carga incluido proporciona 3 cargas adicionales completas.',
  },
  {
    q: '¿Son resistentes al agua?',
    a: 'Certificación IPX4 — resisten salpicaduras, sudor y lluvia ligera. No son aptas para sumergir ni para uso en piscina o ducha.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Visa, Mastercard, American Express, MercadoPago y PIX (Brasil). Pago en cuotas disponible según país y banco emisor.',
  },
  {
    q: '¿Tienen graduación o lentes intercambiables?',
    a: 'Sí. Compatibles con lentes graduados estándar (esférico hasta -6 / +4). Servicio de instalación en óptica de confianza. Las micas claras son intercambiables por las del color que prefieras.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-40 bg-ink">
      <div className="container-padded">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <p className="eyebrow mb-6">Preguntas frecuentes</p>
          <h2 className="display-heading text-display-md text-bone text-balance">
            Lo que quieres saber.
          </h2>
        </motion.div>

        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-b border-ink-700 first:border-t"
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
