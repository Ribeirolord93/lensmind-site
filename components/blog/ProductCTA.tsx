import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

/**
 * ProductCTA — bloco de CTA do produto pra usar inline em posts MDX.
 *
 * Uso no MDX:
 *   <ProductCTA variant="default" />
 *   <ProductCTA variant="compact" headline="Pruébalo 30 días sin riesgo" />
 */

interface ProductCTAProps {
  variant?: 'default' | 'compact';
  headline?: string;
  subhead?: string;
}

export default function ProductCTA({
  variant = 'default',
  headline = 'Lensmind™ Edition 01',
  subhead = 'Gafas inteligentes con IA, cámara 1080p y traductor 40 idiomas. Diseñadas para LATAM.',
}: ProductCTAProps) {
  if (variant === 'compact') {
    return (
      <aside className="not-prose my-10 rounded-2xl border border-ember/30 bg-gradient-to-br from-ember/10 to-ember/5 p-6 md:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1">
            <p className="text-bone font-semibold text-base md:text-lg mb-1">
              {headline}
            </p>
            <p className="text-bone-300 text-sm">
              $149.00 USD — precio de lanzamiento. Garantía 30 días.
            </p>
          </div>
          <Link
            href="/#producto"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-ember text-bone font-medium text-sm rounded-full hover:bg-ember-600 transition-colors whitespace-nowrap"
          >
            <span>Ver producto</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside className="not-prose my-12 rounded-3xl overflow-hidden border border-ink-700 bg-ink-900">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative aspect-[4/3] md:aspect-square bg-ink">
          <Image
            src="/products/lensmind-camera-led.jpg"
            alt="Lensmind™ Edition 01 con LED de grabación visible"
            fill
            quality={80}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <p className="eyebrow mb-4">Producto</p>
          <h3 className="display-heading text-2xl md:text-3xl text-bone tracking-tight mb-3">
            {headline}
          </h3>
          <p className="text-bone-300 text-sm md:text-base leading-relaxed mb-6">
            {subhead}
          </p>
          <div className="flex flex-wrap gap-3 mb-6 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-ink-800 border border-ink-700 text-bone-200">
              30 días devolución
            </span>
            <span className="px-2.5 py-1 rounded-full bg-ink-800 border border-ink-700 text-bone-200">
              1 año garantía
            </span>
            <span className="px-2.5 py-1 rounded-full bg-ink-800 border border-ink-700 text-bone-200">
              Envío LATAM
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#producto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bone text-ink font-medium text-sm rounded-full hover:bg-bone-300 transition-colors"
            >
              <span>Comprar — $149.00 USD</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/#tecnologia"
              className="text-sm text-smoke-400 hover:text-bone transition-colors"
            >
              Ver tecnología →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
