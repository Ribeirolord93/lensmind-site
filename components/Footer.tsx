import Link from 'next/link';
import { MessageCircle, Mail, Clock } from 'lucide-react';

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hola@lensmind.lat';

// WhatsApp por país — env vars permitem trocar sem deploy.
// Quando os números MX e CO estiverem disponíveis, configurar:
//   NEXT_PUBLIC_WHATSAPP_MX = 521xxxxxxxxxx (México)
//   NEXT_PUBLIC_WHATSAPP_CO = 57xxxxxxxxxx  (Colombia)
// Enquanto não configurado, mostra apenas o número default (BR/MX migration).
const WHATSAPP_DEFAULT =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '555491683659';
const WHATSAPP_MX = process.env.NEXT_PUBLIC_WHATSAPP_MX || '';
const WHATSAPP_CO = process.env.NEXT_PUBLIC_WHATSAPP_CO || '';

// Formata número WhatsApp pra display (+52 1 xxx xxx xxxx, +57 xxx xxx xxxx)
function formatWhatsApp(num: string): string {
  if (!num) return '';
  if (num.startsWith('521')) {
    // México mobile (52 + 1 + 10 dígitos)
    return `+52 1 ${num.slice(3, 6)} ${num.slice(6, 9)} ${num.slice(9)}`;
  }
  if (num.startsWith('52')) {
    return `+52 ${num.slice(2, 5)} ${num.slice(5, 8)} ${num.slice(8)}`;
  }
  if (num.startsWith('57')) {
    // Colombia (57 + 10 dígitos)
    return `+57 ${num.slice(2, 5)} ${num.slice(5, 8)} ${num.slice(8)}`;
  }
  if (num.startsWith('55')) {
    // Brasil — fallback enquanto migra
    return `+55 ${num.slice(2, 4)} ${num.slice(4, 9)}-${num.slice(9)}`;
  }
  return `+${num}`;
}

const cols = [
  {
    title: 'Producto',
    links: [
      { label: 'Lensmind™ Edition 01', href: '/#producto' },
      { label: 'Tecnología', href: '/#tecnologia' },
      { label: 'Comparativa', href: '/#comparativa' },
      { label: 'Especificaciones', href: '/#specs' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Envíos', href: '/#faq-envios' },
      { label: 'Garantía', href: '/#faq-garantia' },
      { label: 'Devoluciones', href: '/reembolsos' },
      { label: 'FAQ completo', href: '/#faq' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Quiénes somos', href: '/quienes-somos' },
      { label: 'Blog', href: '/blog' },
      { label: 'Cómo protegemos tu privacidad', href: '/privacidad-datos' },
      { label: 'Términos', href: '/terminos' },
      { label: 'Política de privacidad', href: '/privacidad' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
];

// Lista de canais de contato — mostrada na coluna "Contacto" do footer.
// Cada canal aparece SOMENTE se o env var correspondente estiver configurado.
function getContactChannels() {
  const channels: Array<{
    icon: typeof MessageCircle;
    label: string;
    sublabel: string;
    href: string;
    external?: boolean;
  }> = [];

  if (WHATSAPP_MX) {
    channels.push({
      icon: MessageCircle,
      label: 'WhatsApp México',
      sublabel: formatWhatsApp(WHATSAPP_MX),
      href: `https://wa.me/${WHATSAPP_MX}`,
      external: true,
    });
  }

  if (WHATSAPP_CO) {
    channels.push({
      icon: MessageCircle,
      label: 'WhatsApp Colombia',
      sublabel: formatWhatsApp(WHATSAPP_CO),
      href: `https://wa.me/${WHATSAPP_CO}`,
      external: true,
    });
  }

  // Fallback se nenhum dos canais regionais estiver configurado
  if (!WHATSAPP_MX && !WHATSAPP_CO) {
    channels.push({
      icon: MessageCircle,
      label: 'WhatsApp',
      sublabel: formatWhatsApp(WHATSAPP_DEFAULT),
      href: `https://wa.me/${WHATSAPP_DEFAULT}`,
      external: true,
    });
  }

  channels.push({
    icon: Mail,
    label: 'Email',
    sublabel: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  });

  return channels;
}

export default function Footer() {
  const contactChannels = getContactChannels();

  return (
    <footer className="bg-ink-950 border-t border-ink-700 py-16 md:py-24">
      <div className="container-padded">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 mb-12 md:mb-16">
          {/* Brand + Contact block */}
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-flex items-baseline text-bone font-semibold tracking-tight text-2xl"
            >
              Lensmind
              <sup className="text-[11px] tracking-normal ml-0.5">™</sup>
            </Link>
            <p className="text-smoke-400 text-sm leading-relaxed max-w-md">
              Tecnología visual con IA, diseñada para Latinoamérica.
              Soporte oficial en español y portugués. Envíos a México y Colombia.
            </p>

            {/* Contact channels — visíveis e clicáveis */}
            <div className="space-y-2.5 pt-2">
              {contactChannels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <a
                    key={channel.label + channel.sublabel}
                    href={channel.href}
                    {...(channel.external && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-ink-900 border border-ink-700 flex items-center justify-center flex-shrink-0 group-hover:border-ember/40 transition-colors">
                      <Icon
                        size={15}
                        className="text-ember"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="leading-tight">
                      <p className="text-bone-200 text-[13px] font-medium group-hover:text-bone transition-colors">
                        {channel.label}
                      </p>
                      <p className="text-smoke-500 text-xs">
                        {channel.sublabel}
                      </p>
                    </div>
                  </a>
                );
              })}

              {/* Horário de atendimento */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-lg bg-ink-900 border border-ink-700 flex items-center justify-center flex-shrink-0">
                  <Clock
                    size={15}
                    className="text-smoke-400"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="leading-tight">
                  <p className="text-bone-200 text-[13px] font-medium">
                    Lun–Vie · 9h–19h
                  </p>
                  <p className="text-smoke-500 text-xs">
                    Hora local MX/CO
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] tracking-[0.18em] uppercase text-bone font-semibold mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-smoke-400 hover:text-bone transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ink-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-smoke-500">
            © {new Date().getFullYear()} Lensmind™. Todos los derechos reservados.
          </p>
          <p className="text-xs text-smoke-600">
            Diseñado para Latinoamérica · México · Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
