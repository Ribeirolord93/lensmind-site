import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import BenefitsGrid from '@/components/BenefitsGrid';
import VideoShowcase from '@/components/VideoShowcase';
import ProductShowcase from '@/components/ProductShowcase';
import ComparisonTable from '@/components/ComparisonTable';
import ReviewsSection from '@/components/ReviewsSection';
import StatsBar from '@/components/StatsBar';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

import { getFirstProduct } from '@/lib/shopify';
import { MOCK_PRODUCT } from '@/lib/mock-product';

// ISR: revalida a cada 60s
export const revalidate = 60;

export default async function HomePage() {
  // getFirstProduct retorna mock automaticamente se Shopify não configurada
  const product = (await getFirstProduct()) || MOCK_PRODUCT;

  return (
    <>
      <Header />
      <main>
        {/* Hero — fullscreen video placeholder + headline */}
        <Hero />

        {/* Trust bar — quick stats inline */}
        <TrustBar />

        {/* Tech features — 4 alternating Meta-style blocks */}
        <BenefitsGrid />

        {/* Lifestyle cinema video */}
        <VideoShowcase />

        {/* Product showcase + buy box */}
        <ProductShowcase product={product} />

        {/* Comparativa */}
        <ComparisonTable />

        {/* Stats */}
        <StatsBar />

        {/* Reviews */}
        <ReviewsSection />

        {/* FAQ */}
        <FAQ />

        {/* Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
