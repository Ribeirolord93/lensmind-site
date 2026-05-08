/**
 * PaymentMethods — badges de métodos de pagamento aceitos
 *
 * Server component (não usa JS no cliente — economiza bundle size).
 *
 * Stack confirmado pra MX (USD):
 *   Visa, Mastercard, Apple Pay, Google Pay, PayPal, Shop Pay, Mercado Pago
 *
 * AMEX removido: Shopify Payments MX só aceita AMEX em MXN (Lensmind cobra USD).
 * PIX removido: não existe no México (só Brasil).
 *
 * SVGs oficiais em /public/payment-logos/ (todos 80x50 viewBox, ratio cartão):
 * - visa.svg, mastercard.svg, paypal.svg: payment-icons npm (oficial)
 * - apple-pay.svg: lockup manual (Apple symbol + Pay text)
 * - google-pay.svg: G multicolor + Pay text
 * - shop-pay.svg: roxo Shopify oficial #5A31F4
 * - mercado-pago.svg: amarelo #FFE600 + handshake azul
 */

interface PaymentMethodsProps {
  size?: 'sm' | 'md';
  variant?: 'dark' | 'light';
}

const LOGOS = [
  { src: '/payment-logos/visa.svg', alt: 'Visa' },
  { src: '/payment-logos/mastercard.svg', alt: 'Mastercard' },
  { src: '/payment-logos/apple-pay.svg', alt: 'Apple Pay' },
  { src: '/payment-logos/google-pay.svg', alt: 'Google Pay' },
  { src: '/payment-logos/paypal.svg', alt: 'PayPal' },
  { src: '/payment-logos/shop-pay.svg', alt: 'Shop Pay' },
  { src: '/payment-logos/mercado-pago.svg', alt: 'Mercado Pago' },
] as const;

export default function PaymentMethods({
  size = 'sm',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variant = 'dark',
}: PaymentMethodsProps) {
  const heightClass = size === 'sm' ? 'h-7 md:h-8' : 'h-8 md:h-10';

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
