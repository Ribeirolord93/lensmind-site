import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lensmind.lat'),
  title: {
    default: 'Lensmind™ — Gafas Inteligentes con IA | Cámara 1080p · Traductor en Tiempo Real',
    template: '%s | Lensmind',
  },
  description:
    'Gafas con IA, cámara Sony 1080p, traductor en 40 idiomas y audio manos libres. Todo lo del Ray-Ban Meta por $199 USD. Envío gratis a México, Chile y Colombia.',
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
      'La nueva generación de gafas inteligentes. Cámara, IA y traductor en tiempo real por $199 USD.',
    // OG image gerada automaticamente via app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lensmind™ — Gafas Inteligentes con IA',
    description: 'La nueva generación de gafas inteligentes por $199 USD.',
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
    <html lang="es" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-sans bg-ink text-bone antialiased">
        {children}
      </body>
    </html>
  );
}
