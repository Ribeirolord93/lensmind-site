import type { Metadata } from 'next';
import Link from 'next/link';
import { Eye, Shield, Lock, Wifi, FileX, Bell } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacidad y Datos — Tus videos, tu control',
  description:
    'Lensmind™ pone la privacidad primero. LED visible, sin entrenamiento de IA con tus datos, sin cargas automáticas. Cumple con la Ley Federal de Protección de Datos.',
  alternates: { canonical: '/privacidad-datos' },
};

const principles = [
  {
    icon: Eye,
    title: 'LED visible siempre que graban',
    desc: 'Cada vez que la cámara está activa, el LED frontal se enciende. Las personas a tu alrededor saben cuándo estás grabando. Transparencia primero.',
  },
  {
    icon: FileX,
    title: 'Tus videos NO entrenan ninguna IA',
    desc: 'Lo que grabas no alimenta modelos de inteligencia artificial. No se comparte con terceros para entrenamiento. Punto.',
  },
  {
    icon: Wifi,
    title: 'Sin carga automática a la nube',
    desc: 'Los archivos quedan en las gafas hasta que TÚ decides transferirlos. Cero subidas silenciosas, cero sincronización en background sin tu permiso explícito.',
  },
  {
    icon: Lock,
    title: 'Encriptación punta a punta',
    desc: 'Toda transferencia entre las gafas y tu celular usa Bluetooth 5.3 con encriptación AES-128. Nadie en el medio puede leer lo que grabas.',
  },
  {
    icon: Shield,
    title: 'Cumple con la LFPDPPP de México',
    desc: 'Ley Federal de Protección de Datos Personales en Posesión de Particulares. Tus datos personales se tratan según la legislación mexicana.',
  },
  {
    icon: Bell,
    title: 'Indicador de audio activo',
    desc: 'Cuando los micrófonos están grabando audio, una señal sonora suave alerta al usuario. Sin grabaciones encubiertas.',
  },
];

export default function PrivacidadDatosPage() {
  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40 pb-16 md:pb-24 bg-ink min-h-screen">
        <div className="container-padded">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2 text-xs text-smoke-500"
          >
            <Link href="/" className="hover:text-bone transition-colors">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <span className="text-bone-300">Privacidad y datos</span>
          </nav>

          {/* Hero */}
          <div className="max-w-4xl mb-16 md:mb-20">
            <p className="eyebrow mb-6">Privacidad y datos</p>
            <h1 className="display-heading text-display-lg text-bone text-balance mb-6">
              Tus videos.
              <br />
              Tu control.
              <br />
              Sin excepciones.
            </h1>
            <p className="text-bone-300 text-base md:text-xl leading-relaxed max-w-2xl">
              La privacidad no es un extra premium. Es el estándar de Lensmind™.
              Diseñamos cada componente — desde el LED de grabación hasta la
              encriptación de transferencia — pensando primero en quien las usa
              y en quien aparece frente a ellas.
            </p>
          </div>

          {/* Six principles */}
          <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-16 md:mb-20">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-ink-900 border border-ink-700 rounded-2xl p-6 md:p-8 hover:border-ink-600 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-ember/10 border border-ember/20 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-ember" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-bone font-semibold text-lg md:text-xl tracking-tight mb-3">
                    {p.title}
                  </h3>
                  <p className="text-bone-300 text-[15px] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Comparativo honesto */}
          <div className="bg-ink-900 border border-ink-700 rounded-3xl p-8 md:p-12 mb-16 md:mb-20">
            <p className="eyebrow mb-5">Comparativa de privacidad</p>
            <h2 className="display-heading text-2xl md:text-3xl lg:text-4xl text-bone tracking-tight mb-8 text-balance">
              Cómo se comparan las prácticas de privacidad.
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="border-b border-ink-700">
                    <th className="text-left py-4 pr-6 text-[11px] tracking-[0.18em] uppercase text-smoke-500 font-medium">
                      Práctica
                    </th>
                    <th className="text-center py-4 px-4 text-[11px] tracking-[0.18em] uppercase text-bone font-semibold">
                      Lensmind™
                    </th>
                    <th className="text-center py-4 pl-4 text-[11px] tracking-[0.18em] uppercase text-smoke-500">
                      Otras gafas IA
                    </th>
                  </tr>
                </thead>
                <tbody className="text-bone-200">
                  <tr className="border-b border-ink-800">
                    <td className="py-4 pr-6">LED visible al grabar</td>
                    <td className="text-center py-4 px-4 text-ember font-semibold">
                      Sí, siempre
                    </td>
                    <td className="text-center py-4 pl-4 text-smoke-400">
                      Variable
                    </td>
                  </tr>
                  <tr className="border-b border-ink-800">
                    <td className="py-4 pr-6">Carga automática a la nube</td>
                    <td className="text-center py-4 px-4 text-ember font-semibold">
                      Nunca
                    </td>
                    <td className="text-center py-4 pl-4 text-smoke-400">
                      Por defecto activa
                    </td>
                  </tr>
                  <tr className="border-b border-ink-800">
                    <td className="py-4 pr-6">Datos usados para entrenar IA</td>
                    <td className="text-center py-4 px-4 text-ember font-semibold">
                      No
                    </td>
                    <td className="text-center py-4 pl-4 text-smoke-400">
                      Opcional / opt-out
                    </td>
                  </tr>
                  <tr className="border-b border-ink-800">
                    <td className="py-4 pr-6">Revisión humana de contenido</td>
                    <td className="text-center py-4 px-4 text-ember font-semibold">
                      No
                    </td>
                    <td className="text-center py-4 pl-4 text-smoke-400">
                      Reportada en prensa
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6">Compatibilidad LFPDPPP México</td>
                    <td className="text-center py-4 px-4 text-ember font-semibold">
                      Sí
                    </td>
                    <td className="text-center py-4 pl-4 text-smoke-400">
                      Marco internacional
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-xs text-smoke-500 max-w-2xl">
              Comparativa basada en políticas públicas de privacidad y reportes
              de prensa al cierre de esta página. Las prácticas de cada
              fabricante pueden cambiar. Consulta siempre la política oficial
              vigente.
            </p>
          </div>

          {/* Tus derechos */}
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-5">Tus derechos</p>
            <h2 className="display-heading text-2xl md:text-3xl lg:text-4xl text-bone tracking-tight mb-6 text-balance">
              Acceso, rectificación, cancelación, oposición.
            </h2>
            <p className="text-bone-300 text-[15px] md:text-base leading-relaxed mb-4">
              Como usuario en México, tienes derechos ARCO sobre tus datos
              personales. Puedes solicitar acceso a la información que tenemos
              sobre ti, pedir rectificación de datos incorrectos, cancelar el
              tratamiento o oponerte al uso para finalidades específicas.
            </p>
            <p className="text-bone-300 text-[15px] md:text-base leading-relaxed mb-6">
              Para ejercer cualquiera de estos derechos, escríbenos a{' '}
              <a
                href="mailto:hola@lensmind.lat"
                className="text-ember hover:text-ember-400 underline underline-offset-2"
              >
                hola@lensmind.lat
              </a>{' '}
              con asunto &ldquo;Derechos ARCO&rdquo; y responderemos en un plazo
              máximo de 20 días hábiles.
            </p>

            <Link
              href="/privacidad"
              className="inline-flex items-center gap-2 text-sm text-bone hover:text-ember transition-colors"
            >
              <span>Leer la política de privacidad completa</span>
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* CTA volver al producto */}
          <div className="max-w-3xl pt-12 border-t border-ink-700">
            <p className="text-bone-300 text-[15px] md:text-base leading-relaxed mb-6">
              ¿Listo para conocer las gafas que respetan tu privacidad y la de
              quienes te rodean?
            </p>
            <Link
              href="/#producto"
              className="btn-ember"
            >
              <span>Ver Lensmind™ Edition 01</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
