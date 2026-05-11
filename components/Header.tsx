'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

// Default WhatsApp number — usado quando user não escolheu país.
// Idealmente env var `NEXT_PUBLIC_WHATSAPP_NUMBER` aponta pro número MX (mercado primário).
// Quando user já navegou pra contexto CO específico, podemos ajustar via geo-detection no futuro.
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5554991683659';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Todos os anchors normalizados como `/#xxx` pra funcionar de qualquer página
  // (blog, /privacidad, etc.) e não apenas da home.
  const links = [
    { href: '/#producto', label: 'Producto' },
    { href: '/#tecnologia', label: 'Tecnología' },
    { href: '/#comparativa', label: 'Comparativa' },
    { href: '/blog', label: 'Blog' },
    { href: '/#faq', label: 'FAQ' },
  ];

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hola! Tengo dudas sobre Lensmind™ Edition 01.'
  )}`;

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

            {/* Right CTA + WhatsApp + mobile menu */}
            <div className="flex items-center gap-3">
              {/* WhatsApp visible on desktop — trust signal */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-[12px] text-bone-200 hover:text-bone border border-ink-700 hover:border-ink-600 rounded-full transition-all duration-300 group"
                aria-label="Contactar por WhatsApp"
              >
                <MessageCircle
                  size={14}
                  className="text-ember group-hover:scale-110 transition-transform"
                />
                <span className="font-medium">Asesor</span>
              </a>

              {/* Botão Comprar — leva pro produto inteiro (gallery + buy box visíveis) */}
              <Link
                href="/#producto"
                className="hidden md:inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-bone text-ink text-[13px] font-medium rounded-full hover:bg-bone-300 transition-all duration-300"
              >
                Comprar
              </Link>

              {/* Mobile WhatsApp icon-only */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden text-ember p-2"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>

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

            {/* WhatsApp dentro do menu mobile */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-4 border border-ink-700 text-bone-200 font-medium rounded-full"
            >
              <MessageCircle size={18} className="text-ember" />
              <span>Habla con un asesor</span>
            </a>

            <Link
              href="/#producto"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-bone text-ink font-medium rounded-full"
            >
              Comprar — $149.99 USD
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
