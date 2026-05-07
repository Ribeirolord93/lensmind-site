'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Headphones, FileCheck, ScrollText } from 'lucide-react';

// Diferenciado dos trust badges do ProductShowcase pra evitar redundância:
// PDP badges = 30 días / Envío reverso / 1 año / SSL (ação imediata)
// TrustGuarantee = garantia detalhada / suporte / certificações / política privacidade (longo prazo)
const guarantees = [
  {
    icon: ShieldCheck,
    title: '1 año de garantía de fábrica',
    desc: 'Cubre defectos electrónicos en cámara, micrófonos, audio y batería. Reposición o reembolso completo, tu eliges.',
  },
  {
    icon: Headphones,
    title: 'Soporte 24h en tu idioma',
    desc: 'Equipo real en LATAM hablando español y portugués. WhatsApp, email o chat. Respuesta en menos de 5 minutos en horario laboral.',
  },
  {
    icon: FileCheck,
    title: 'Certificaciones internacionales',
    desc: 'Componentes con certificación CE (Europa) y FCC (EE.UU.). Conformidad regulatoria en cada lote producido.',
  },
  {
    icon: ScrollText,
    title: 'Política de privacidad clara',
    desc: 'Sin letra chica. Tus videos no entrenan IA, no se comparten, no salen del dispositivo sin tu permiso explícito.',
  },
];

export default function TrustGuarantee() {
  return (
    <section className="py-16 md:py-24 bg-ink-950 border-t border-ink-700">
      <div className="container-padded">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-10 md:mb-14"
        >
          <p className="eyebrow mb-6">Compromiso de marca</p>
          <h2 className="display-heading text-display-md text-bone mb-4 text-balance">
            Confías tu inversión a una marca nueva.
            <br />
            Nosotros respondemos con todo.
          </h2>
          <p className="text-bone-300 text-base md:text-lg leading-relaxed max-w-2xl">
            Lensmind™ es nueva en LATAM. Eso nos exige más, no menos. Cada
            promesa que hacemos abajo es una obligación operativa, no un
            disclaimer en letra chica.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {guarantees.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-ink-900 border border-ink-700 rounded-2xl p-6 md:p-7 hover:border-ink-600 transition-colors duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-ember/10 border border-ember/20 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-ember" strokeWidth={1.75} />
                </div>
                <h3 className="text-bone font-semibold text-base md:text-lg tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-bone-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Microtexto legal honesto */}
        <p className="mt-8 text-xs text-smoke-500 max-w-3xl">
          La garantía de fábrica de 1 año cubre defectos de fabricación bajo uso
          normal y aplica desde la fecha de recepción del producto. Las
          certificaciones CE y FCC corresponden a los componentes electrónicos
          principales del dispositivo. Consulta la política completa en la página
          de privacidad y términos.
        </p>
      </div>
    </section>
  );
}
