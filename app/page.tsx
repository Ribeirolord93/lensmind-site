import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Marquee from '@/components/Marquee';
import BenefitsGrid from '@/components/BenefitsGrid';
import VideoShowcase from '@/components/VideoShowcase';
import ProductShowcase from '@/components/ProductShowcase';
import ComparisonTable from '@/components/ComparisonTable';
import ReviewsSection from '@/components/ReviewsSection';
import StatsBar from '@/components/StatsBar';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

// Floating conversion components
import StickyMobileCTA from '@/components/StickyMobileCTA';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import ProofToast from '@/components/ProofToast';
import ExitIntentPopup from '@/components/ExitIntentPopup';

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
        {/* 1. ATRAIR - Hero impactante com produto visível */}
        <Hero />

        {/* 2. CONFIAR - Trust bar imediata */}
        <TrustBar />

        {/* 3. INFORMAR - Features rotativas */}
        <Marquee />

        {/* 4. EDUCAR - 4 capacidades-chave */}
        <BenefitsGrid />

        {/* 5. EMOCIONAR - Lifestyle/vídeo cinematográfico */}
        <VideoShowcase />

        {/* 6. DECIDIR - Produto + buy box */}
        <ProductShowcase product={product} />

        {/* 7. CONVENCER - Comparativo com Ray-Ban */}
        <ComparisonTable />

        {/* 8. SOCIAL PROOF - Comunidade + reservas */}
        <ReviewsSection />

        {/* 9. CONTEXTO - Stats de mercado */}
        <StatsBar />

        {/* 10. RESOLVER - FAQ derruba objeções */}
        <FAQ />

        {/* 11. CONVERTER - CTA final dramático */}
        <FinalCTA />
      </main>
      <Footer />

      {/* Floating conversion elements */}
      <StickyMobileCTA />
      <WhatsAppFAB />
      <ProofToast />
      <ExitIntentPopup />
    </>
  );
}
