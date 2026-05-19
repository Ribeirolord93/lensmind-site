import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description:
    'Información sobre el uso de cookies y tecnologías similares en Lensmind™.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/cookies' },
  openGraph: {
    title: 'Política de Cookies | Lensmind',
    description: 'Información sobre el uso de cookies y tecnologías similares en Lensmind™.',
    url: '/cookies',
    type: 'website',
  },
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Política de Cookies" lastUpdated="Mayo 2026">
      <p>
        Esta política explica cómo Lensmind™ utiliza cookies y tecnologías
        similares en este sitio web.
      </p>

      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en tu
        dispositivo cuando visitas un sitio web. Permiten reconocerte en
        visitas futuras, recordar preferencias y analizar el uso del sitio.
      </p>

      <h2>2. Tipos de cookies que utilizamos</h2>

      <h3>Cookies estrictamente necesarias</h3>
      <p>
        Imprescindibles para el funcionamiento del sitio (carrito de compras,
        sesión de usuario, preferencias de idioma). No requieren consentimiento.
      </p>

      <h3>Cookies de rendimiento y analítica</h3>
      <p>
        Recopilan información agregada y anónima sobre cómo se utiliza el
        sitio. Nos ayudan a mejorar la experiencia. Ejemplo: Google Analytics.
      </p>

      <h3>Cookies de marketing</h3>
      <p>
        Utilizadas para mostrar anuncios relevantes en otros sitios (Meta
        Pixel, Google Ads). Solo se activan si aceptas el banner de cookies.
      </p>

      <h2>3. Cookies de terceros</h2>
      <ul>
        <li>
          <strong>Shopify</strong> — sesión de compra y carrito.
        </li>
        <li>
          <strong>Google Analytics</strong> (si activado) — análisis de uso.
        </li>
        <li>
          <strong>Meta Pixel / Facebook</strong> (si activado) — retargeting
          publicitario.
        </li>
      </ul>

      <h2>4. Cómo gestionar las cookies</h2>
      <p>
        Puedes gestionar o eliminar las cookies desde la configuración de tu
        navegador. Ten en cuenta que desactivar cookies estrictamente
        necesarias puede afectar el funcionamiento del sitio (por ejemplo, no
        podrás finalizar una compra).
      </p>
      <p>
        Enlaces útiles para configurar cookies en navegadores comunes:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
      </ul>

      <h2>5. Actualización de esta política</h2>
      <p>
        Esta política puede actualizarse periódicamente para reflejar cambios
        en nuestras prácticas o por requisitos legales.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Para preguntas sobre nuestro uso de cookies, escríbenos a{' '}
        <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a>.
      </p>
    </LegalLayout>
  );
}
