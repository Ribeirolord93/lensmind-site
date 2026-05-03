'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: '¿Funcionan con mi celular?',
    a: 'Sí. Compatibles con iOS y Android. Solo descarga la app gratuita desde la App Store o Google Play y conecta vía Bluetooth.',
  },
  {
    q: '¿La traducción funciona sin internet?',
    a: 'La traducción en tiempo real y las funciones de IA requieren conexión. Para grabar fotos, videos y reproducir audio, funcionan completamente sin internet.',
  },
  {
    q: '¿Cuánto dura la batería?',
    a: 'Hasta 10 horas escuchando música y 120 horas en modo standby. Carga completa en 1.5 horas vía USB-C.',
  },
  {
    q: '¿Las lentes son graduadas?',
    a: 'No vienen graduadas, pero son intercambiables. Tu óptico de confianza puede colocar lentes con tu graduación sin problema.',
  },
  {
    q: '¿Cuánto tarda en llegar?',
    a: 'Entre 10 y 17 días con seguimiento incluido. Recibes el código de rastreo desde el día del envío para monitorear tu pedido en tiempo real.',
  },
  {
    q: '¿Y si no me gustan?',
    a: 'Tienes 30 días para devolverlas. Sin preguntas, sin trámites complicados. Reembolso total garantizado.',
  },
  {
    q: '¿Son resistentes al agua?',
    a: 'Tienen protección contra salpicaduras y sudor — ideales para uso diario y deporte. No son aptas para sumergir bajo el agua.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 md:py-40 bg-ink overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Left side */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[11px] tracking-[0.3em] uppercase text-ember mb-6 font-medium">
              · Preguntas Frecuentes ·
            </p>
            <h2 className="display-heading text-5xl md:text-6xl text-balance mb-6">
              Lo que <span className="text-ember">necesitas saber</span>.
            </h2>
            <p className="text-smoke-400 leading-relaxed">
              Respuestas claras a las dudas más comunes. ¿No encuentras lo que
              buscas?{' '}
              <a
                href="mailto:hola@lensmind.lat"
                className="text-bone underline underline-offset-4 hover:text-ember transition-colors"
              >
                Escríbenos.
              </a>
            </p>
          </div>

          {/* FAQ list */}
          <div className="divide-y divide-ink-700">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="py-2">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                  >
                    <span
                      className={`text-lg md:text-xl transition-colors duration-300 ${
                        isOpen ? 'text-ember' : 'text-bone group-hover:text-bone-100'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex-shrink-0 mt-1 ${
                        isOpen ? 'text-ember' : 'text-smoke-400'
                      }`}
                    >
                      <Plus size={20} strokeWidth={1.5} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-smoke-400 leading-relaxed pb-6 max-w-2xl">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
