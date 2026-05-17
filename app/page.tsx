import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import TrustGuarantee from '@/components/TrustGuarantee';
import BenefitsGrid from '@/components/BenefitsGrid';
import VideoShowcase from '@/components/VideoShowcase';
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
import ClientGallery from '@/components/ClientGallery';

import { getFirstProduct } from '@/lib/shopify';
import { MOCK_PRODUCT } from '@/lib/mock-product';
import ProductPageTracker from '@/components/ProductPageTracker';

// ISR: revalida a cada 60s
export const revalidate = 60;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://lensmind.lat';

// Geos com shipping ATIVO (Shopify configurado + ad campaigns ON).
// Adicionar nova geo aqui APÓS configurar shipping rate no Shopify.
const ACTIVE_SHIPPING_COUNTRIES = ['MX', 'CO'] as const;

// Hreflang preparado pra futuras geos (PT-BR, etc.)
// Atualmente todas as geos LATAM usam mesmo locale es-MX.
export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
    languages: {
      'es-MX': SITE_URL,
      'es-CO': SITE_URL,
      'es': SITE_URL,
      'x-default': SITE_URL,
    },
  },
};

export default async function HomePage() {
  const product = (await getFirstProduct()) || MOCK_PRODUCT;

  const variant = product.variants.edges[0]?.node;
  const price = variant?.price.amount || product.priceRange.minVariantPrice.amount;
  const compareAtPrice =
    variant?.compareAtPrice?.amount ||
    product.compareAtPriceRange?.minVariantPrice?.amount;
  const currency =
    variant?.price.currencyCode ||
    product.priceRange.minVariantPrice.currencyCode ||
    'USD';

  // JSON-LD Product schema (Google Shopping, rich results)
  // shippingDestination: apenas geos com shipping rate configurado no Shopify.
  // Adicionar país aqui SOMENTE depois de criar shipping zone correspondente.
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Lensmind™ Edition 01',
    alternateName: product.title,
    description:
      'Gafas inteligentes con IA, cámara Sony 1080p, traductor en 40 idiomas y audio open-ear manos libres. Diseñadas para Latinoamérica. Disponibles en México y Colombia.',
    brand: { '@type': 'Brand', name: 'Lensmind' },
    sku: variant?.id || 'lensmind-edition-01',
    mpn: 'LM-EDITION-01',
    category: 'Electronics > Wearable Technology > Smart Glasses',
    image: [`${SITE_URL}/opengraph-image`],
    weight: {
      '@type': 'QuantitativeValue',
      value: 50,
      unitCode: 'GRM',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: currency,
      price: parseFloat(price).toFixed(2),
      ...(compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price)
        ? {
            // Mostra "preço de lançamento" como desconto no Google Shopping
            // priceSpecification permite ancoragem visual de desconto
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: parseFloat(price).toFixed(2),
              priceCurrency: currency,
              valueAddedTaxIncluded: false,
              referencePrice: {
                '@type': 'PriceSpecification',
                price: parseFloat(compareAtPrice).toFixed(2),
                priceCurrency: currency,
              },
            },
          }
        : {}),
      availability: variant?.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: SITE_URL,
      // priceValidUntil: válido até fim do trimestre de lançamento.
      // Atualizar trimestralmente conforme estratégia de pricing.
      priceValidUntil: '2026-09-30',
      shippingDetails: ACTIVE_SHIPPING_COUNTRIES.map((country) => ({
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: country,
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 10,
            maxValue: 17,
            unitCode: 'DAY',
          },
        },
      })),
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: ACTIVE_SHIPPING_COUNTRIES,
        returnPolicyCategory:
          'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
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
    areaServed: ACTIVE_SHIPPING_COUNTRIES.map((country) => ({
      '@type': 'Country',
      name: country === 'MX' ? 'Mexico' : 'Colombia',
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['Spanish', 'Portuguese'],
      areaServed: ACTIVE_SHIPPING_COUNTRIES,
    },
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
        <Hero />
        <TrustBar />
        <BenefitsGrid />

        {/* Audio Spotlight (substitui VideoShowcase) */}
        <FeatureSpotlight
          eyebrow="Audio espacial"
          headline="Escucha sin oídos tapados."
          subhead="Cuatro micrófonos direccionales. Altavoces ocultos en las patillas. Música, llamadas, traducciones — solo tú las escuchas. Tus oídos siguen libres para el mundo que te rodea."
          microCopy="Sin Bluetooth de auriculares. Sin cables. Sin esfuerzo."
          image="/products/lensmind-audio-spatial.jpg"
          imageAlt="Detalle del lateral de las gafas Lensmind con ondas de audio espacial visibles, mostrando los altavoces direccionales integrados en las patillas"
          imagePosition="left"
        />

        <ProductShowcase product={product} />
        <WhatsAppCTABlock />
        <ComparisonTable />

        {/* Camera + LED Spotlight */}
        <FeatureSpotlight
          eyebrow="Cámara 1080p · LED de privacidad"
          headline="Captura el momento. Respeta a quien está en él."
          subhead="Cada vez que grabas, un LED rojo se enciende automáticamente. Visible para todos. Sin opción de desactivar."
          microCopy="Porque tu privacidad no es negociable — la de los demás tampoco."
          image="/products/lensmind-camera-privacy.jpg"
          imageAlt="Primer plano de la cámara 1080p integrada en las gafas Lensmind con el LED rojo de grabación encendido, demostrando la transparencia visual hacia las personas alrededor"
          imagePosition="right"
        />

        <TrustGuarantee />
        <StatsBar />

        {/* Galería de clientes reales (fotos enviadas por compradores) */}
        <ClientGallery
          title="Nuestros clientes"
          subtitle="Fotos reales enviadas por compradores en Latinoamérica"
        />

        <LaunchSection />
        <EmailCapture />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
