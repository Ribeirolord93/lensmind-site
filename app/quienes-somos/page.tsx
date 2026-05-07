import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Quiénes somos',
  description:
    'Lensmind™ — tecnología visual con IA pensada y soportada para Latinoamérica.',
};

export default function QuienesSomosPage() {
  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40 pb-24 bg-ink min-h-screen">
        <div className="container-padded">
          {/* Hero */}
          <div className="max-w-3xl mb-16 md:mb-24">
            <p className="eyebrow mb-6">Lensmind™</p>
            <h1 className="display-heading text-display-md md:text-display-lg text-bone mb-8 text-balance">
              Tecnología visual,
              <br />
              pensada para LATAM.
            </h1>
            <p className="text-bone-300 text-lg md:text-xl leading-relaxed">
              Construimos Lensmind™ porque vimos un patrón claro: las gafas
              inteligentes globales no llegan a Latinoamérica con soporte real,
              precio justo ni soporte en nuestro idioma.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid md:grid-cols-3 gap-px bg-ink-700 mb-20 md:mb-32 max-w-5xl">
            {[
              {
                n: '01',
                title: 'Diseñado para Latinoamérica',
                detail:
                  'Configuración optimizada para español y portugués, traductor offline para los idiomas más usados en la región, soporte oficial sin barreras culturales ni de horario.',
              },
              {
                n: '02',
                title: 'Precio honesto',
                detail:
                  'Mismo nivel técnico que las marcas de referencia internacional, sin la prima de marca premium. $149.99 USD vs $379 USD del competidor más cercano.',
              },
              {
                n: '03',
                title: 'Soporte real',
                detail:
                  'Equipo de atención por WhatsApp y email en horario LATAM. Devolución en 30 días sin preguntas. Garantía de 1 año con reposición regional.',
              },
            ].map((p) => (
              <div
                key={p.n}
                className="bg-ink p-8 md:p-10 space-y-4"
              >
                <div className="text-[10px] tracking-[0.18em] uppercase text-ember font-semibold">
                  {p.n}
                </div>
                <h3 className="text-bone text-lg md:text-xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="text-bone-300 text-sm leading-relaxed">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Manifesto */}
          <div className="max-w-3xl mb-20 md:mb-24">
            <p className="eyebrow mb-6">Filosofía</p>
            <h2 className="display-heading text-display-sm md:text-display-md text-bone mb-8 text-balance">
              La mejor tecnología no se ve.
            </h2>
            <div className="space-y-6 text-bone-300 text-base md:text-lg leading-relaxed">
              <p>
                Lensmind™ no es un dispositivo más en tu bolsillo. Son gafas que
                ya usarías de todas formas — solo que ahora capturan momentos,
                traducen idiomas y conversan contigo cuando lo necesitas.
              </p>
              <p>
                Nuestro objetivo es construir herramientas que se integren
                naturalmente en tu día a día. Sin fricción. Sin pantallas
                adicionales. Sin la necesidad constante de sacar el celular.
              </p>
              <p>
                Edition 01 es nuestra primera serie de lanzamiento. Diseñada,
                probada y pensada con foco en cómo se usa la tecnología en
                Latinoamérica.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="border-t border-ink-700 pt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-w-5xl">
            <div>
              <p className="text-[11px] tracking-[0.18em] uppercase text-ember mb-2 font-medium">
                Edition 01
              </p>
              <p className="text-bone text-xl md:text-2xl font-medium">
                Asegura tu unidad de la primera serie.
              </p>
            </div>
            <Link href="/#comprar" className="btn-primary group flex-shrink-0">
              Comprar — $149.99 USD
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
