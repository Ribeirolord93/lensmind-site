import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductShowcase from '@/components/ProductShowcase';
import ProductPageTracker from '@/components/ProductPageTracker';
import { getProductByHandle } from '@/lib/shopify';

// ISR: revalida a cada 60s
export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lensmind.lat';

interface PageProps {
  params: { handle: string };
}

// SEO dinâmico — usa SEO do produto se existir, senão usa título + descrição
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  const image = product.featuredImage?.url;

  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.description,
    openGraph: {
      title: product.seo?.title || product.title,
      description: product.seo?.description || product.description,
      images: image ? [{ url: image, width: 1200, height: 1500 }] : [],
      type: 'website',
    },
    alternates: {
      canonical: `/productos/${product.handle}`,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const variant = product.variants.edges[0]?.node;
  const price = variant?.price.amount || product.priceRange.minVariantPrice.amount;
  const currency =
    variant?.price.currencyCode ||
    product.priceRange.minVariantPrice.currencyCode ||
    'USD';

  // JSON-LD Product schema (Google Shopping, rich results)
  // Mantido em sync com a home (app/page.tsx) — shippingDestination apenas MX no lançamento.
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description:
      product.seo?.description || product.description,
    brand: { '@type': 'Brand', name: 'Lensmind' },
    sku: variant?.id || product.id,
    image: product.featuredImage?.url
      ? [product.featuredImage.url]
      : [`${SITE_URL}/opengraph-image`],
    offers: {
      '@type': 'Offer',
      priceCurrency: currency,
      price: parseFloat(price).toFixed(2),
      availability: variant?.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/productos/${product.handle}`,
      priceValidUntil: '2026-12-31',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: [
          { '@type': 'DefinedRegion', addressCountry: 'MX' },
        ],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <Header />
      <main className="pt-20">
        {/* Fires ViewContent once consent is granted (only once) */}
        <ProductPageTracker
          contentId={variant?.id || product.id}
          contentName={product.title}
          value={parseFloat(price)}
          currency={currency}
        />

        <ProductShowcase product={product} />
      </main>
      <Footer />
    </>
  );
}
