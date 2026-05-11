'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Clock, Globe2 } from 'lucide-react';

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5554991683659';

export default function WhatsAppCTABlock() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hola! Estoy mirando Lensmind™ Edition 01 y tengo algunas dudas antes de comprar.'
  )}`;

  return (
    <section className="py-16 md:py-24 bg-ink border-t border-ink-700">
      <div className="container-padded">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-br from-ink-900 to-ink-800 border border-ink-700 rounded-3xl p-8 md:p-12 lg:p-14 relative overflow-hidden">
            {/* Background subtle accent */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-ember/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 bg-ember/10 border border-ember/20 rounded-full">
                  <span className="relative flex w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
                  </span>
                  <span className="text-[11px] tracking-[0.18em] uppercase text-ember font-semibold">
                    Asesores en línea
                  </span>
                </div>

                <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl text-bone tracking-tight mb-4 text-balance">
                  ¿Dudas antes de comprar?
                  <br />
                  Habla con un asesor real.
                </h2>

                <p className="text-bone-300 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                  Resolvemos cualquier duda en minutos por WhatsApp. Compatibilidad,
                  envío, pago en cuotas, devoluciones — todo lo que necesites
                  saber antes de invertir.
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-bone-200 mb-2">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-ember flex-shrink-0" />
                    <span>Respuesta en menos de 5 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe2 size={16} className="text-ember flex-shrink-0" />
                    <span>Español y portugués</span>
                  </div>
                </div>
              </div>

              {/* CTA verde estilo WhatsApp */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-7 py-5 bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold rounded-2xl transition-all duration-300 active:scale-[0.98] shadow-lg shadow-whatsapp/20 hover:shadow-whatsapp/40 whitespace-nowrap"
              >
                <MessageCircle size={22} strokeWidth={2} />
                <span className="text-base md:text-lg">
                  Hablar por WhatsApp
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
