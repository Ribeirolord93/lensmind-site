import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40 pb-24 bg-ink min-h-screen">
        <div className="container-padded">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Legal</p>
            <h1 className="display-heading text-display-md text-bone mb-6 text-balance">
              {title}
            </h1>
            <p className="text-smoke-400 text-sm mb-12 md:mb-16">
              Última actualización: {lastUpdated}
            </p>

            <div className="prose-legal">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
