import Link from 'next/link';
import { Instagram, Music2, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-ink-950 text-bone overflow-hidden">
      {/* Borda decorativa */}
      <div className="editorial-rule" />

      {/* Newsletter section */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-ember font-medium mb-6">
              · Únete al Movimiento ·
            </p>
            <h2 className="display-heading text-5xl md:text-7xl mb-6 text-balance">
              Sé el primero en{' '}
              <span className="text-ember">ver el futuro</span>
            </h2>
            <p className="text-smoke-400 mb-10 max-w-xl mx-auto text-lg">
              10% de descuento en tu primer pedido + acceso anticipado a nuevos
              modelos.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@correo.com"
                className="flex-1 bg-ink-800 border border-ink-700 rounded-none px-5 py-4 text-bone placeholder:text-smoke-500 focus:outline-none focus:border-ember transition-colors"
                required
              />
              <button type="submit" className="btn-ember">
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="editorial-rule" />

      {/* Footer columns */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="col-span-2">
              <Link
                href="/"
                className="text-display italic text-3xl tracking-tightest font-light text-bone"
              >
                Lensmind
                <sup className="text-xs not-italic font-sans tracking-normal ml-0.5 text-smoke-400">
                  ™
                </sup>
              </Link>
              <p className="mt-4 text-smoke-400 max-w-sm leading-relaxed">
                Gafas inteligentes con IA, cámara y traductor en tiempo real.
                Diseñadas para Latinoamérica.
              </p>

              <div className="flex items-center gap-5 mt-8">
                <a
                  href="https://instagram.com/lensmind.lat"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-smoke-400 hover:text-ember transition-colors duration-300"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://tiktok.com/@lensmind"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-smoke-400 hover:text-ember transition-colors duration-300"
                >
                  <Music2 size={20} />
                </a>
                <a
                  href="mailto:hola@lensmind.lat"
                  aria-label="Email"
                  className="text-smoke-400 hover:text-ember transition-colors duration-300"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Tienda */}
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-bone-300 mb-5 font-medium">
                Tienda
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#producto"
                    className="text-smoke-400 hover:text-bone transition-colors"
                  >
                    Smart Glasses
                  </Link>
                </li>
                <li>
                  <Link
                    href="#tecnologia"
                    className="text-smoke-400 hover:text-bone transition-colors"
                  >
                    Tecnología
                  </Link>
                </li>
                <li>
                  <Link
                    href="#comparativa"
                    className="text-smoke-400 hover:text-bone transition-colors"
                  >
                    Comparativa
                  </Link>
                </li>
              </ul>
            </div>

            {/* Soporte */}
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-bone-300 mb-5 font-medium">
                Soporte
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#faq"
                    className="text-smoke-400 hover:text-bone transition-colors"
                  >
                    Preguntas frecuentes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/envios"
                    className="text-smoke-400 hover:text-bone transition-colors"
                  >
                    Envíos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/devoluciones"
                    className="text-smoke-400 hover:text-bone transition-colors"
                  >
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-smoke-400 hover:text-bone transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="border-t border-ink-700">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-smoke-500">
            © {new Date().getFullYear()} Lensmind. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <Link
              href="/privacidad"
              className="text-smoke-500 hover:text-bone transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-smoke-500 hover:text-bone transition-colors"
            >
              Términos
            </Link>
            <span className="text-smoke-600">·</span>
            <span className="text-smoke-500">🇲🇽 🇨🇱 🇨🇴 LATAM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
