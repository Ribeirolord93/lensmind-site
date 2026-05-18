'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

// FAQ otimizado para CONVERSÃO (não SEO bruto).
// 8 perguntas que decidem compra — não 17 que diluem atenção.
// Cortadas: vs-rayban (já tem ComparisonTable visual), bateria (já TrustBar),
// agua/graduacion (nicho), app/celular/soporte (técnico não-crítico),
// ia-entrena (sub-item já coberto em "privacidad"), faq-pago genérico
// (consolidado em faq-pago-co que cobre MX+CO+PSE+Mercado Pago).
const faqs = [
  // === LOGÍSTICA — top dúvidas (sempre mais perguntadas) ===
  {
    id: 'faq-envios',
    q: '¿Cuándo recibo mi pedido?',
    a: 'Entre 10 y 17 días hábiles desde la confirmación del pago. Despachamos en 24h desde el centro de distribución global hacia México y Colombia. El plazo incluye despacho aduanero. Recibirás tracking activo desde el día 3 con actualizaciones diarias hasta la entrega en tu domicilio.',
  },
  {
    id: 'faq-envios-co',
    q: '¿Hacen envíos a Colombia? ¿Cuánto tarda?',
    a: 'Sí, enviamos a toda Colombia: Bogotá, Medellín, Cali, Barranquilla, Cartagena y demás ciudades. El plazo es de 10 a 17 días hábiles desde la confirmación del pago, igual que en México. Despacho en 24 horas desde el centro logístico, con código de seguimiento activo desde el día 3. Las entregas en zonas rurales pueden sumar 2-4 días adicionales.',
  },
  // === IMPUESTOS — bloqueio frequente de compra ===
  {
    id: 'faq-aranceles',
    q: '¿Tengo que pagar impuestos en aduana en México?',
    a: 'En la mayoría de los envíos a México con valor declarado bajo USD 50 no aplican aranceles. Para envíos con valor superior, pueden generarse impuestos al recibir el paquete según legislación SAT. El precio del producto NO incluye estos posibles cargos aduaneros. Te recomendamos consultar la legislación vigente del SAT antes de comprar.',
  },
  {
    id: 'faq-aranceles-co',
    q: '¿Cobran impuestos de aduana en Colombia? ¿Qué dice la DIAN?',
    a: 'En Colombia, la DIAN exonera de IVA y aranceles los envíos internacionales con valor declarado igual o inferior a USD 200 (Resolución 46 de 2019, Decreto 410 de 2020). Lensmind™ Edition 01 a $149.00 USD queda dentro de esa franja en la mayoría de los casos, por lo que no debería generar cargos aduaneros adicionales. Si la valoración aduanera supera el umbral, pueden aplicar IVA del 19%. Consulta la normativa vigente de la DIAN antes de comprar.',
  },
  // === PAGAMENTO — consolidado (MX + CO + PSE + Mercado Pago) ===
  {
    id: 'faq-pago',
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos Visa, Mastercard, Apple Pay, Google Pay, PayPal, Shop Pay y Mercado Pago. En Colombia, Mercado Pago incluye PSE para pagos directos desde tu cuenta bancaria nacional. El pago se procesa en USD con conversión automática a peso mexicano o colombiano según la tasa de cambio de tu banco. Pago en cuotas disponible según tu emisor de tarjeta. Toda la información se procesa con encriptación SSL a través de Stripe — Lensmind nunca ve ni almacena tu número de tarjeta.',
  },
  // === GARANTIA + DEVOLUÇÃO — quebra objeção de "marca nova" ===
  {
    id: 'faq-garantia',
    q: '¿Cuál es la garantía?',
    a: '30 días de devolución sin preguntas + 1 año de garantía de fábrica contra defectos de fabricación. Si dentro de los 30 días no estás satisfecho por cualquier motivo, te devolvemos el 100% del dinero y pagamos el envío de regreso. Soporte técnico oficial en español y portugués durante todo el período de garantía.',
  },
  {
    id: 'faq-devoluciones',
    q: '¿Cómo funcionan las devoluciones?',
    a: 'Si no estás satisfecho, escríbenos dentro de los primeros 30 días desde la recepción y coordinamos la devolución con guía prepagada (tú no pagas el envío de regreso). El producto debe estar en su estado original con todos los accesorios. Reembolso en 5-10 días hábiles después de recibir el producto de vuelta en nuestro centro logístico.',
  },
  // === PRIVACIDADE — pivot competitivo do produto ===
  {
    id: 'faq-privacidad',
    q: '¿Qué pasa con la privacidad de mis videos?',
    a: 'Tus videos quedan en las gafas hasta que TÚ decides transferirlos. No hay carga automática a la nube, no se usan para entrenar inteligencia artificial, y no son revisados por personas. El LED frontal se enciende cada vez que la cámara graba — transparencia total para ti y para quienes te rodean. Cumplimos con la LFPDPPP de México y la Ley 1581 de Habeas Data de Colombia.',
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
