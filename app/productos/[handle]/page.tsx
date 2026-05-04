import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductShowcase from '@/components/ProductShowcase';
import { getProductByHandle } from '@/lib/shopify';

// ISR: revalida a cada 60s
export const revalidate = 60;

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

  return (
    <>
      <Header />
      <main className="pt-20">
        <ProductShowcase product={product} />
      </main>
      <Footer />
    </>
  );
}
