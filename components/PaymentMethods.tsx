/**
 * PaymentMethods — badges de métodos de pagamento aceitos
 *
 * Server component (não usa JS no cliente — economiza bundle size).
 *
 * Stack confirmado pra MX (USD):
 *   Visa, Mastercard, Apple Pay, Google Pay, Shop Pay, Mercado Pago
 *
 * AMEX removido: Shopify Payments MX só aceita AMEX em MXN (Lensmind cobra USD).
 * PIX removido: não existe no México (só Brasil).
 *
 * SVGs oficiais em /public/payment-logos/:
 * - visa.svg, mastercard.svg: flat coloridos (payment-icons npm, formato cartão 750x471)
 * - apple-pay.svg: lockup Apple Pay oficial (simple-icons, 24x24)
 * - google-pay.svg: G multicolor + "Pay" (manual, baseado no design oficial)
 * - mercado-pago.svg: handshake azul sobre amarelo oficial (manual)
 * - shop-pay.svg: roxo Shopify oficial #5A31F4 com wordmark (manual)
 *
 * Cada logo mantém suas proporções naturais — visualmente mais profissional
 * que normalizar em badges brancos uniformes (estilo Amazon/Booking/Shopify).
 */

interface PaymentMethodsProps {
  /** Tamanho do badge — sm = inline no PDP (h-6), md = standalone (h-8) */
  size?: 'sm' | 'md';
  /** Variante visual — mantida pra compat. Atualmente não muda render
   *  porque cada logo já tem seu fundo oficial. */
  variant?: 'dark' | 'light';
}

const LOGOS = [
  { src: '/payment-logos/visa.svg', alt: 'Visa' },
  { src: '/payment-logos/mastercard.svg', alt: 'Mastercard' },
  { src: '/payment-logos/apple-pay.svg', alt: 'Apple Pay' },
  { src: '/payment-logos/google-pay.svg', alt: 'Google Pay' },
  { src: '/payment-logos/shop-pay.svg', alt: 'Shop Pay' },
  { src: '/payment-logos/mercado-pago.svg', alt: 'Mercado Pago' },
] as const;

export default function PaymentMethods({
  size = 'sm',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variant = 'dark',
}: PaymentMethodsProps) {
  const heightClass = size === 'sm' ? 'h-6 md:h-7' : 'h-8 md:h-9';

  return (
    <div
      className="flex flex-wrap items-center gap-2 md:gap-2.5"
      role="list"
      aria-label="Métodos de pago aceptados"
    >
      {LOGOS.map((logo) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          role="listitem"
          loading="lazy"
          decoding="async"
          className={`${heightClass} w-auto shrink-0 select-none`}
          draggable={false}
        />
      ))}
    </div>
  );
}
