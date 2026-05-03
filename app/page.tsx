import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import BenefitsGrid from '@/components/BenefitsGrid';
import ProductShowcase from '@/components/ProductShowcase';
import ComparisonTable from '@/components/ComparisonTable';
import StatsBar from '@/components/StatsBar';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import { getFirstProduct } from '@/lib/shopify';

// ISR: revalida a cada 60s
export const revalidate = 60;

export default async function HomePage() {
  let product = null;
  let error: string | null = null;

  try {
    product = await getFirstProduct();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Error al cargar producto';
    console.error('Erro ao buscar produto Shopify:', err);
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <BenefitsGrid />

        {product ? (
          <ProductShowcase product={product} />
        ) : (
          <section className="py-32 bg-ink text-center">
            <div className="container mx-auto px-6">
              <p className="display-heading text-3xl text-bone mb-4">
                Producto en preparación
              </p>
              <p className="text-smoke-400">
                {error
                  ? `Configura las variables de entorno: ${error}`
                  : 'Conectando con Shopify...'}
              </p>
            </div>
          </section>
        )}

        <ComparisonTable />
        <StatsBar />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
