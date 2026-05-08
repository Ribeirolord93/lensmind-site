/**
 * PaymentMethods — badges de métodos de pagamento aceitos
 *
 * Server component (não usa JS no cliente — economiza bundle size).
 *
 * Stack confirmado pra MX (USD):
 *   Visa, Mastercard, Apple Pay, Google Pay, Shop Pay, Mercado Pago
 *
 * AMEX removido: Shopify Payments MX só aceita AMEX em MXN, e Lensmind cobra em USD.
 * PIX removido: não existe no México (só Brasil).
 *
 * SVGs inline com cores oficiais — convenção da indústria pra payment badges.
 */

interface PaymentMethodsProps {
  /** Tamanho do badge — sm = inline no PDP, md = standalone */
  size?: 'sm' | 'md';
  /** Variante visual — dark = bg escuro (default), light = bg claro */
  variant?: 'dark' | 'light';
}

export default function PaymentMethods({
  size = 'sm',
  variant = 'dark',
}: PaymentMethodsProps) {
  const heightClass = size === 'sm' ? 'h-7' : 'h-9';
  const badgeBg =
    variant === 'dark'
      ? 'bg-white border-ink-700'
      : 'bg-white border-ink-300';

  // Container padrão do badge: bg branco (logos pedem fundo claro pra contraste oficial)
  const badgeClass = `inline-flex items-center justify-center px-2 ${heightClass} ${badgeBg} border rounded-md`;

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="list"
      aria-label="Métodos de pago aceptados"
    >
      {/* Visa */}
      <div className={badgeClass} role="listitem" aria-label="Visa">
        <svg viewBox="0 0 48 16" className="h-3 md:h-3.5" aria-hidden="true">
          <path
            d="M22.5 1.2L19.6 14.8h-3.5l2.9-13.6h3.5zm14.8 8.8l1.8-5 1.1 5h-2.9zM41.4 14.8h3.2l-2.8-13.6h-3c-.7 0-1.3.4-1.5 1l-5.2 12.6h3.7l.7-2h4.5l.4 2zM32.2 10.4c0-3.6-5-3.8-5-5.4 0-.5.5-1 1.5-1.1.5-.1 2-.1 3.6.7l.6-2.9c-.9-.3-2-.6-3.4-.6-3.5 0-6 1.9-6 4.6 0 2 1.8 3.1 3.1 3.8 1.4.7 1.9 1.1 1.9 1.7 0 .9-1.1 1.3-2.1 1.3-1.8 0-2.8-.5-3.6-.9l-.6 3c.8.4 2.4.7 4 .7 3.7 0 6.1-1.8 6.1-4.7M17.6 1.2L11.9 14.8H8.2L5.4 4c-.2-.7-.3-.9-.8-1.2-.9-.5-2.3-.9-3.5-1.2L1.2 1.2h6c.8 0 1.5.5 1.6 1.4l1.5 7.9 3.7-9.3h3.6z"
            fill="#1A1F71"
          />
        </svg>
      </div>

      {/* Mastercard */}
      <div className={badgeClass} role="listitem" aria-label="Mastercard">
        <svg viewBox="0 0 48 32" className="h-4 md:h-5" aria-hidden="true">
          <circle cx="18" cy="16" r="11" fill="#EB001B" />
          <circle cx="30" cy="16" r="11" fill="#F79E1B" />
          <path
            d="M24 8.3c2.4 1.9 4 4.8 4 8s-1.5 6.1-4 8c-2.4-1.9-4-4.8-4-8s1.6-6.1 4-8z"
            fill="#FF5F00"
          />
        </svg>
      </div>

      {/* Apple Pay — letra preta com símbolo Apple */}
      <div className={badgeClass} role="listitem" aria-label="Apple Pay">
        <svg viewBox="0 0 50 20" className="h-3.5 md:h-4" aria-hidden="true">
          <g fill="#000">
            {/* Apple symbol */}
            <path d="M9.2 4.4c-.5.6-1.4 1.1-2.2 1-.1-.9.3-1.8.8-2.4.6-.7 1.5-1.1 2.3-1.1.1.9-.3 1.8-.9 2.5zm.8 1.3c-1.2-.1-2.3.7-2.8.7-.6 0-1.5-.7-2.5-.7-1.3 0-2.5.8-3.1 1.9-1.3 2.3-.4 5.7.9 7.6.6.9 1.4 2 2.4 1.9.9 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6 1 0 1.7-.9 2.3-1.9.7-1.1 1-2.1 1-2.2 0 0-2-.8-2-3.1 0-1.9 1.6-2.8 1.7-2.9-.9-1.4-2.4-1.5-2.7-1.5z" />
            {/* "Pay" wordmark */}
            <path d="M17.2 7.5h2.5c1.5 0 2.5 1 2.5 2.4 0 1.4-1 2.4-2.5 2.4h-1.4v2.5h-1.1V7.5zm1.1 1v2.9h1.2c.9 0 1.5-.5 1.5-1.4 0-.9-.6-1.4-1.5-1.4h-1.2zM23.5 13c0-1 .8-1.7 2.2-1.7h1.4v-.4c0-.6-.4-1-1.2-1-.7 0-1.1.3-1.2.8h-1c.1-1 1-1.7 2.3-1.7 1.4 0 2.2.7 2.2 1.9v3.9h-1.1v-.9c-.3.6-.9 1-1.7 1-1.1 0-1.9-.7-1.9-1.9zm3.6-.5v-.4h-1.3c-.7 0-1.2.3-1.2.9 0 .6.4.9 1.1.9.8 0 1.4-.5 1.4-1.4zM33.1 14.8l1.6-5.5h1.2l-2.4 7.4c-.4 1.2-.9 1.6-1.9 1.6-.2 0-.6 0-.7-.1v-.9c.1 0 .4.1.6.1.6 0 .9-.2 1.1-.8l.1-.4-2.2-6.9h1.3l1.3 5.5z" />
          </g>
        </svg>
      </div>

      {/* Google Pay — cores Google originais */}
      <div className={badgeClass} role="listitem" aria-label="Google Pay">
        <svg viewBox="0 0 60 20" className="h-3.5 md:h-4" aria-hidden="true">
          {/* G colorido */}
          <path d="M14 9c0-.4 0-.8-.1-1.1H9.3v2.1H12c-.1.6-.5 1.1-1 1.5v1.2h1.7C13.5 11.8 14 10.5 14 9z" fill="#4285F4" />
          <path d="M9.3 13.7c1.4 0 2.5-.5 3.4-1.2L11 11.3c-.5.3-1.1.5-1.7.5-1.3 0-2.4-.9-2.8-2.1H4.7v1.3c.8 1.6 2.6 2.7 4.6 2.7z" fill="#34A853" />
          <path d="M6.5 9.7c-.1-.3-.2-.7-.2-1s.1-.7.2-1V6.4H4.7c-.4.7-.6 1.5-.6 2.3 0 .8.2 1.6.6 2.3l1.8-1.3z" fill="#FBBC05" />
          <path d="M9.3 5.6c.7 0 1.4.3 1.9.7l1.4-1.4c-.9-.8-2-1.3-3.3-1.3-2 0-3.7 1.1-4.6 2.8l1.8 1.3c.5-1.2 1.5-2.1 2.8-2.1z" fill="#EA4335" />
          {/* "Pay" wordmark */}
          <g fill="#5F6368">
            <path d="M19.5 13.7v-3.5h1.8c.7 0 1.4-.2 1.8-.7.5-.5.7-1 .7-1.7s-.2-1.2-.7-1.7c-.5-.5-1.1-.7-1.8-.7h-3v8.3h1.2zm0-4.7V6.5h1.9c.4 0 .7.1 1 .4.3.2.4.5.4.9 0 .4-.1.7-.4.9-.3.3-.6.4-1 .4h-1.9zM27.7 13.9c.4 0 .9-.1 1.2-.3.4-.2.7-.5.8-.8h.1v.9h1.1V9.9c0-.7-.2-1.3-.7-1.7-.5-.4-1.1-.6-1.8-.6-.6 0-1.1.1-1.6.4-.5.3-.9.7-1.1 1.2l1 .4c.2-.4.6-.7 1-.8.4-.1.8-.1 1.1.1.4.2.5.4.5.9v.3c-.4-.2-.9-.3-1.5-.3-.7 0-1.3.2-1.8.5-.5.3-.7.8-.7 1.4 0 .6.2 1.1.7 1.4.5.3 1 .5 1.7.5zm.2-1c-.3 0-.6-.1-.8-.2-.2-.2-.3-.4-.3-.7 0-.3.1-.5.4-.7.3-.2.7-.3 1.1-.3.6 0 1 .1 1.4.3-.1.4-.3.7-.6.9-.3.4-.7.7-1.2.7zM34.5 16.4l3.5-8.6h-1.3l-1.6 4.2-1.7-4.2h-1.3l2.3 5.5-1.4 3.1h1.5z" />
          </g>
        </svg>
      </div>

      {/* Shop Pay — roxo Shopify oficial */}
      <div className={badgeClass} role="listitem" aria-label="Shop Pay">
        <svg viewBox="0 0 60 18" className="h-3.5 md:h-4" aria-hidden="true">
          <rect width="60" height="18" rx="3" fill="#5A31F4" />
          <text
            x="30"
            y="13"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="11"
            fontWeight="700"
            fill="#fff"
            textAnchor="middle"
          >
            shop Pay
          </text>
        </svg>
      </div>

      {/* Mercado Pago — azul + amarelo oficiais */}
      <div className={badgeClass} role="listitem" aria-label="Mercado Pago">
        <svg viewBox="0 0 70 18" className="h-3.5 md:h-4" aria-hidden="true">
          <ellipse cx="13" cy="9" rx="12" ry="6" fill="#00B1EA" />
          <path
            d="M8 8c0-.3.1-.5.3-.7.4-.4 1-.4 1.4 0 .2.2.3.4.3.7v.8c0 .2-.2.4-.4.4s-.4-.2-.4-.4V8c0-.1-.1-.1-.1-.1s-.1 0-.1.1v.8c0 .2-.2.4-.4.4s-.4-.2-.4-.4V8zm9-.4c.5 0 .8.3.8.8s-.3.8-.8.8c-.4 0-.8-.3-.8-.8 0-.4.3-.8.8-.8z"
            fill="#FFE600"
          />
          <text
            x="29"
            y="8"
            fontFamily="system-ui, sans-serif"
            fontSize="5.5"
            fontWeight="700"
            fill="#1A1F71"
          >
            mercado
          </text>
          <text
            x="29"
            y="14"
            fontFamily="system-ui, sans-serif"
            fontSize="5.5"
            fontWeight="700"
            fill="#1A1F71"
          >
            pago
          </text>
        </svg>
      </div>
    </div>
  );
}
