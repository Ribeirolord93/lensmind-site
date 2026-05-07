import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import TrustGuarantee from '@/components/TrustGuarantee';
import BenefitsGrid from '@/components/BenefitsGrid';
import VideoShowcase from '@/components/VideoShowcase';
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

        {/* Lifestyle cinema video */}
        <VideoShowcase />

        {/* Product showcase + buy box (com ReviewsBar inline) */}
        <ProductShowcase product={product} />

        {/* v16: WhatsApp CTA block — entre product e comparativa, momento de dúvida */}
        <WhatsAppCTABlock />

        {/* Comparativa vs Ray-Ban Meta */}
        <ComparisonTable />

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
