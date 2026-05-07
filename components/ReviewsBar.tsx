'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ReviewsBarProps {
  /** Compact variant — fits inline above price/buy button */
  compact?: boolean;
}

// 🚨 PLACEHOLDER ESTRUTURAL — NÃO LANÇAR SEM SUBSTITUIR
//
// TODO antes do launch (Daiane):
//   - Decidir entre integrar Trustpilot real OU substituir por reviews verificados (beta testers)
//   - Se Trustpilot: criar conta business em https://business.trustpilot.com (free tier)
//   - Atualizar RATING + REVIEW_COUNT abaixo com números reais
//   - Adicionar TrustBox widget oficial: https://support.trustpilot.com/hc/en-us/articles/115011421468
//   - Se NÃO houver reviews reais antes do launch: REMOVER este componente do ProductShowcase
//
// ⚠️ Mostrar números falsos é fraude publicitária no MX (PROFECO Art. 32) e gera ban Stripe/Meta.
const RATING = 4.9;
const REVIEW_COUNT = 11293;
const SOURCE = 'Trustpilot';

export default function ReviewsBar({ compact = false }: ReviewsBarProps) {
  // Render 5 stars
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(RATING);
    const halfFilled =
      !filled && i === Math.floor(RATING) && RATING % 1 >= 0.5;
    return { filled, halfFilled, idx: i };
  });

  // JSON-LD aggregateRating — adiciona estrelinhas no Google search results
  // ⚠️ Comentar este bloco se reviews ainda não forem reais (Google penaliza fake)
  const aggregateRatingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: RATING,
    reviewCount: REVIEW_COUNT,
    bestRating: 5,
    worstRating: 1,
  };

  if (compact) {
    return (
      <>
        <div
          className="inline-flex items-center gap-2 flex-wrap"
          aria-label={`Calificación ${RATING} de 5, basada en ${REVIEW_COUNT.toLocaleString('es-MX')} reseñas en ${SOURCE}`}
        >
          <div className="flex items-center gap-0.5">
            {stars.map((s) => (
              <Star
                key={s.idx}
                size={14}
                className={
                  s.filled || s.halfFilled
                    ? 'text-ember fill-ember'
                    : 'text-smoke-700'
                }
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-bone-200 text-sm font-semibold">{RATING}</span>
          <span className="text-smoke-400 text-xs">
            ({REVIEW_COUNT.toLocaleString('es-MX')} reseñas en {SOURCE})
          </span>
        </div>
        {/* JSON-LD removido em compact — só renderiza no full mode pra evitar duplicação */}
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateRatingJsonLd),
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3 md:gap-4 flex-wrap"
      >
        <div className="flex items-center gap-1">
          {stars.map((s) => (
            <Star
              key={s.idx}
              size={18}
              className={
                s.filled || s.halfFilled
                  ? 'text-ember fill-ember'
                  : 'text-smoke-700'
              }
              strokeWidth={1.5}
            />
          ))}
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-bone text-lg md:text-xl font-semibold">
            {RATING}
          </span>
          <span className="text-bone-300 text-sm">
            de {REVIEW_COUNT.toLocaleString('es-MX')} reseñas en {SOURCE}
          </span>
        </div>
      </motion.div>
    </>
  );
}
