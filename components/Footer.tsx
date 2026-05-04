import Link from 'next/link';

const cols = [
  {
    title: 'Producto',
    links: [
      { label: 'Lensmind™ Edition 01', href: '#producto' },
      { label: 'Tecnología', href: '#tecnologia' },
      { label: 'Comparativa', href: '#comparativa' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Envíos', href: '#faq' },
      { label: 'Garantía', href: '#faq' },
      { label: 'Devoluciones', href: '#faq' },
      { label: 'Contacto', href: 'mailto:hola@lensmind.lat' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos', href: '/terminos' },
      { label: 'Privacidad', href: '/privacidad' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-ink-700 py-16 md:py-24">
      <div className="container-padded">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-flex items-baseline text-bone font-semibold tracking-tight text-2xl"
            >
              Lensmind
              <sup className="text-[11px] tracking-normal ml-0.5">™</sup>
            </Link>
            <p className="text-smoke-400 text-sm leading-relaxed max-w-md">
              Tecnología visual con IA, diseñada para Latinoamérica.
              Soporte oficial en español y portugués.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] tracking-[0.18em] uppercase text-bone font-semibold mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-smoke-400 hover:text-bone transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ink-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-smoke-500">
            © {new Date().getFullYear()} Lensmind™. Todos los derechos reservados.
          </p>
          <p className="text-xs text-smoke-600">
            Hecho en Latinoamérica
          </p>
        </div>
      </div>
    </footer>
  );
}
