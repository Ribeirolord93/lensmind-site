'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Promo bar — escassez sutil */}
      <div className="bg-ember text-ink text-[11px] tracking-[0.25em] uppercase font-medium">
        <div className="container mx-auto px-6 py-2.5 flex items-center justify-center gap-2">
          <span className="hidden sm:inline">⚡</span>
          <span>Lanzamiento LATAM · Envío gratis · 30 días de garantía</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong border-b border-ink-700/50'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-display italic text-2xl tracking-tightest font-light text-bone hover:text-ember transition-colors duration-300"
            >
              Lensmind
              <sup className="text-[10px] not-italic font-sans tracking-normal ml-0.5 text-smoke-400">
                ™
              </sup>
            </Link>

            {/* Nav desktop */}
            <ul className="hidden md:flex items-center gap-10 text-[13px] tracking-[0.2em] uppercase">
              <li>
                <Link
                  href="#producto"
                  className="text-smoke-400 hover:text-bone transition-colors duration-300"
                >
                  Producto
                </Link>
              </li>
              <li>
                <Link
                  href="#tecnologia"
                  className="text-smoke-400 hover:text-bone transition-colors duration-300"
                >
                  Tecnología
                </Link>
              </li>
              <li>
                <Link
                  href="#comparativa"
                  className="text-smoke-400 hover:text-bone transition-colors duration-300"
                >
                  vs Ray-Ban Meta
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-smoke-400 hover:text-bone transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
            </ul>

            {/* Cart icon */}
            <div className="flex items-center gap-4">
              <Link
                href="#producto"
                className="hidden md:inline-flex btn-ember !py-2.5 !px-6 !text-[11px]"
              >
                Comprar
              </Link>

              <button
                aria-label="Menu"
                className="md:hidden text-bone p-2"
                onClick={() => setOpen(!open)}
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden pb-6 animate-fade-in">
              <ul className="flex flex-col gap-4 text-sm tracking-wider uppercase pt-4 border-t border-ink-700">
                <li>
                  <Link
                    href="#producto"
                    onClick={() => setOpen(false)}
                    className="text-smoke-400 hover:text-bone transition-colors py-2 block"
                  >
                    Producto
                  </Link>
                </li>
                <li>
                  <Link
                    href="#tecnologia"
                    onClick={() => setOpen(false)}
                    className="text-smoke-400 hover:text-bone transition-colors py-2 block"
                  >
                    Tecnología
                  </Link>
                </li>
                <li>
                  <Link
                    href="#comparativa"
                    onClick={() => setOpen(false)}
                    className="text-smoke-400 hover:text-bone transition-colors py-2 block"
                  >
                    vs Ray-Ban Meta
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    onClick={() => setOpen(false)}
                    className="text-smoke-400 hover:text-bone transition-colors py-2 block"
                  >
                    FAQ
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    href="#producto"
                    onClick={() => setOpen(false)}
                    className="btn-ember w-full"
                  >
                    Comprar ahora
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
