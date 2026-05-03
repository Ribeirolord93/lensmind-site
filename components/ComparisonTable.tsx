'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const rows = [
  { feature: 'Precio', rayban: '$450 USD', lensmind: '$199 USD', highlight: true },
  { feature: 'Cámara HD 1080p', rayban: true, lensmind: true },
  { feature: 'Asistente de IA por voz', rayban: true, lensmind: true },
  { feature: 'Audio manos libres', rayban: true, lensmind: true },
  { feature: 'Traductor 40 idiomas', rayban: 'Limitado', lensmind: true },
  { feature: 'Lentes intercambiables', rayban: false, lensmind: true },
  { feature: 'Almacenamiento integrado', rayban: '32 GB', lensmind: '32 GB' },
  { feature: 'Bluetooth 5.3', rayban: true, lensmind: true },
  { feature: 'Envío gratis a LATAM', rayban: false, lensmind: true },
  { feature: 'Garantía', rayban: '14 días', lensmind: '30 días' },
];

function Cell({ value, accent = false }: { value: any; accent?: boolean }) {
  if (value === true) {
    return (
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${accent ? 'bg-ember text-ink' : 'bg-ink/10 text-ink'}`}>
        <Check size={14} strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-ink/5 text-ink/30">
        <X size={14} strokeWidth={2} />
      </span>
    );
  }
  return (
    <span
      className={`text-sm md:text-base ${
        accent ? 'text-ember font-medium' : 'text-ink/70'
      }`}
    >
      {value}
    </span>
  );
}

export default function ComparisonTable() {
  return (
    <section
      id="comparativa"
      className="relative invert-section py-32 md:py-40 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-[11px] tracking-[0.3em] uppercase text-ember mb-6 font-medium">
            · La Comparación ·
          </p>
          <h2 className="display-heading text-5xl md:text-7xl text-balance text-ink mb-6">
            ¿Por qué pagar el{' '}
            <span className="text-ember not-italic">triple</span> por la marca?
          </h2>
          <p className="text-ink/60 text-lg max-w-xl leading-relaxed">
            La tecnología es prácticamente la misma. La diferencia está en el
            logo. Y en lo que ahorras al elegir lo inteligente.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-x-auto -mx-6 md:mx-0"
        >
          <table className="w-full min-w-[680px] md:min-w-0">
            <thead>
              <tr className="border-b border-ink/20">
                <th className="text-left py-6 px-6 text-[11px] tracking-[0.25em] uppercase font-medium text-ink/50">
                  Característica
                </th>
                <th className="text-center py-6 px-6 text-sm md:text-base font-display italic font-light text-ink/70">
                  Ray-Ban Meta
                </th>
                <th className="text-center py-6 px-6 bg-ink text-bone -mx-2 rounded-t-md">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-display italic text-xl md:text-2xl font-light text-ember">
                      Lensmind™
                    </span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-bone-300">
                      Tu elección
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-ink/10 ${
                    row.highlight ? 'bg-ember/5' : ''
                  }`}
                >
                  <td className="py-5 px-6 text-ink font-medium text-sm md:text-base">
                    {row.feature}
                  </td>
                  <td className="py-5 px-6 text-center">
                    <Cell value={row.rayban} />
                  </td>
                  <td className="py-5 px-6 text-center bg-ink/[0.02] -mx-2">
                    <Cell value={row.lensmind} accent={row.highlight} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 max-w-2xl"
        >
          <p className="text-ink/60 leading-relaxed border-l-2 border-ember pl-6 italic">
            Resultado: las mismas funciones esenciales por menos de la mitad
            del precio. Sin pagar la marca — pagando solo la tecnología que
            importa.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
