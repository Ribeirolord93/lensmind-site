import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';
import Analytics from '@/components/Analytics';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
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
    'Gafas con IA, cámara Sony 1080p, traductor en 40 idiomas y audio manos libres. Diseñadas para Latinoamérica. $199 USD.',
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
    locale: 'es_MX',
    url: '/',
    siteName: 'Lensmind',
    title: 'Lensmind™ — Gafas Inteligentes con IA',
    description:
      'Cámara 1080p, IA por voz y traductor en 40 idiomas. $199 USD.',
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
      <body className="font-sans bg-ink text-bone antialiased">
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
