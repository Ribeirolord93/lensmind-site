import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';
import Analytics from '@/components/Analytics';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://lensmind.lat'
  ),
  title: {
    default:
      'Lensmind™ — Gafas Inteligentes con IA | Cámara 1080p · Traductor en Tiempo Real',
    template: '%s | Lensmind',
  },
  description:
    'Gafas con IA, cámara Sony 1080p, traductor en 40 idiomas y audio manos libres. Diseñadas para Latinoamérica. $149.99 USD.',
  keywords: [
    'gafas inteligentes',
    'gafas con IA',
    'smart glasses',
    'gafas con cámara',
    'ray-ban meta alternativa',
    'gafas traductor',
    'lensmind',
  ],
  authors: [{ name: 'Lensmind' }],
  openGraph: {
    type: 'website',
    locale: 'es',
    url: '/',
    siteName: 'Lensmind',
    title: 'Lensmind™ — Gafas Inteligentes con IA',
    description:
      'Cámara 1080p, IA por voz y traductor en 40 idiomas. $149.99 USD.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lensmind™ — Gafas Inteligentes con IA',
    description: 'Cámara 1080p, IA por voz y traductor en tiempo real.',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        {/* Preconnect a domínios críticos — economiza ~150ms na primeira carga */}
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        {/* Facebook Domain Verification — substituir CONTENT_AQUI pelo valor que o Meta gerou */}
        <meta name="facebook-domain-verification" content="CONTENT_AQUI" />
        {/* Theme color pra mobile (top bar do navegador) — alinhado com paleta ink-900 */}
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body className="font-sans bg-ink text-bone antialiased">
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
