'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#producto', label: 'Producto' },
    { href: '#tecnologia', label: 'Tecnología' },
    { href: '#comparativa', label: 'Comparativa' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ink/85 backdrop-blur-xl border-b border-ink-700'
            : 'bg-transparent'
        }`}
      >
        <div className="container-padded">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-bone font-semibold tracking-tight text-lg"
            >
              Lensmind<sup className="text-[10px] tracking-normal ml-0.5">™</sup>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-smoke-400 hover:text-bone transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right CTA + mobile menu */}
            <div className="flex items-center gap-4">
              <Link
                href="#comprar"
                className="hidden md:inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-bone text-ink text-[13px] font-medium rounded-full hover:bg-bone-300 transition-all duration-300"
              >
                Comprar
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden text-bone p-2 -mr-2"
                aria-label="Abrir menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-ink animate-fade-in md:hidden">
          <div className="container-padded">
            <div className="h-16 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-bone font-semibold tracking-tight text-lg"
              >
                Lensmind<sup className="text-[10px] tracking-normal ml-0.5">™</sup>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-bone p-2 -mr-2"
                aria-label="Cerrar menu"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          <nav className="px-6 pt-12 flex flex-col gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-bone text-3xl font-semibold tracking-tight"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#comprar"
              onClick={() => setMenuOpen(false)}
              className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 bg-bone text-ink font-medium rounded-full"
            >
              Comprar — $199 USD
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
