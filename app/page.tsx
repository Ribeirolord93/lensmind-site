import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import TrustGuarantee from '@/components/TrustGuarantee';
import BenefitsGrid from '@/components/BenefitsGrid';
import FeatureSpotlight from '@/components/FeatureSpotlight';
import ProductShowcase from '@/components/ProductShowcase';
import ComparisonTable from '@/components/ComparisonTable';
import LaunchSection from '@/components/LaunchSection';
import StatsBar from '@/components/StatsBar';
import EmailCapture from '@/components/EmailCapture';
import WhatsAppCTABlock from '@/components/WhatsAppCTABlock';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

import { getFirstProduct } from '@/lib/shopify';
import { MOCK_PRODUCT } from '@/lib/mock-product';
import ProductPageTracker from '@/components/ProductPageTracker';

// ISR: revalida a cada 60s
export const revalidate = 60;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://lensmind.lat';

export default async function HomePage() {
  const product = (await getFirstProduct()) || MOCK_PRODUCT;

  const variant = product.variants.edges[0]?.node;
  const price = variant?.price.amount || product.priceRange.minVariantPrice.amount;
  const currency =
    variant?.price.currencyCode ||
    product.priceRange.minVariantPrice.currencyCode ||
    'USD';

  // JSON-LD Product schema (Google Shopping, rich results)
  // shippingDestination apenas pra países onde Shopify tem shipping rate configurado.
  // Lançamento: México apenas. Adicionar CO/CL aqui APÓS configurar shipping rates lá.
  // v16: Reviews placeholder estrutural (4.9 / 11.293)
  // ⚠️ ANTES DO LAUNCH: substituir aggregateRating por dados reais
  // (beta tester reviews, ou remover aggregateRating se não houver reviews verificadas).
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Lensmind™ Edition 01',
    alternateName: product.title,
    description:
      'Gafas inteligentes con IA, cámara 1080p, traductor en 40 idiomas y audio manos libres. Diseñadas para Latinoamérica.',
    brand: { '@type': 'Brand', name: 'Lensmind' },
    sku: variant?.id || 'lensmind-edition-01',
    image: [`${SITE_URL}/opengraph-image`],
    offers: {
      '@type': 'Offer',
      priceCurrency: currency,
      price: parseFloat(price).toFixed(2),
      availability: variant?.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: SITE_URL,
      priceValidUntil: '2026-12-31',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: [
          { '@type': 'DefinedRegion', addressCountry: 'MX' },
        ],
      },
    },
  };

  // JSON-LD Organization
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lensmind',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      <Header />
      <main>
        <ProductPageTracker
          contentId={variant?.id || 'lensmind-edition-01'}
          contentName="Lensmind Edition 01"
          value={parseFloat(price)}
          currency={currency}
        />
        {/* Hero — fullscreen video placeholder + headline */}
        <Hero />

        {/* Trust bar — quick spec stats */}
        <TrustBar />

        {/* Tech features — 4 alternating Meta-style blocks */}
        <BenefitsGrid />

        {/* v18: Audio Spotlight — substitui VideoShowcase, narrativa sensorial pré-buy */}
        <FeatureSpotlight
          eyebrow="Audio espacial"
          headline="Escucha sin oídos tapados."
          subhead="Cuatro micrófonos direccionales. Altavoces ocultos en las patillas. Música, llamadas, traducciones — solo tú las escuchas. Tus oídos siguen libres para el mundo que te rodea."
          microCopy="Sin Bluetooth de auriculares. Sin cables. Sin esfuerzo."
          image="/products/lensmind-audio-spatial.jpg"
          imageAlt="Detalle del lateral de las gafas Lensmind con ondas de audio espacial visibles, mostrando los altavoces direccionales integrados en las patillas"
          imagePosition="left"
        />

        {/* Product showcase + buy box (com ReviewsBar inline) */}
        <ProductShowcase product={product} />

        {/* v16: WhatsApp CTA block — entre product e comparativa, momento de dúvida */}
        <WhatsAppCTABlock />

        {/* Comparativa vs Ray-Ban Meta */}
        <ComparisonTable />

        {/* v18: Camera + LED Spotlight — quebra objeção de privacidade depois da comparação racional */}
        <FeatureSpotlight
          eyebrow="Cámara 1080p · LED de privacidad"
          headline="Captura el momento. Respeta a quien está en él."
          subhead="Cada vez que grabas, un LED rojo se enciende automáticamente. Visible para todos. Sin opción de desactivar."
          microCopy="Porque tu privacidad no es negociable — la de los demás tampoco."
          image="/products/lensmind-camera-privacy.jpg"
          imageAlt="Primer plano de la cámara 1080p integrada en las gafas Lensmind con el LED rojo de grabación encendido, demostrando la transparencia visual hacia las personas alrededor"
          imagePosition="right"
        />

        {/* v16: Trust Guarantee — 4 garantias agressivas, antes do FAQ */}
        <TrustGuarantee />

        {/* Specs reales */}
        <StatsBar />

        {/* Lanzamiento Edition 01 (en lugar de reviews falsas) */}
        <LaunchSection />

        {/* Email capture for 10% off lead magnet */}
        <EmailCapture />

        {/* FAQ */}
        <FAQ />

        {/* Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
