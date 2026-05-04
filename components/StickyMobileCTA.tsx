'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Aparece após scroll de 600px (passou do hero)
      const scrolled = window.scrollY > 600;
      // Esconde quando estiver no footer ou na seção de produto principal
      const productSection = document.getElementById('producto');
      const footerSection = document.querySelector('footer');

      let nearProduct = false;
      let nearFooter = false;

      if (productSection) {
        const rect = productSection.getBoundingClientRect();
        nearProduct = rect.top < 800 && rect.bottom > 0;
      }

      if (footerSection) {
        const rect = footerSection.getBoundingClientRect();
        nearFooter = rect.top < window.innerHeight + 200;
      }

      setVisible(scrolled && !nearProduct && !nearFooter);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        >
          <div className="bg-ink-950/95 backdrop-blur-lg border-t border-ink-700 px-4 py-3 safe-area-padding">
            <Link
              href="#producto"
              className="flex items-center justify-between gap-3 bg-ember hover:bg-ember-600 text-ink rounded-sm px-5 py-3.5 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={2} />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] tracking-[0.15em] uppercase opacity-70">
                    Lensmind™
                  </span>
                  <span className="text-sm font-medium">
                    Comprar · $199 USD
                  </span>
                </div>
              </div>
              <ArrowRight
                size={18}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
