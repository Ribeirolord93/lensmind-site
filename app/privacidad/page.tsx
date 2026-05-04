import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad y tratamiento de datos personales de Lensmind™.',
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Política de Privacidad" lastUpdated="Mayo 2026">
      <p>
        En Lensmind™ valoramos tu privacidad. Esta política explica qué datos
        recolectamos, cómo los usamos y los derechos que tienes sobre ellos,
        conforme a la legislación de protección de datos vigente en
        Latinoamérica (LGPD Brasil, Ley 25.326 Argentina, Ley 1581 Colombia,
        LFPDPPP México, entre otras).
      </p>

      <h2>1. Datos que recolectamos</h2>
      <ul>
        <li>
          <strong>Datos de contacto:</strong> nombre, email, teléfono y
          dirección de envío proporcionados al realizar una compra.
        </li>
        <li>
          <strong>Datos de pago:</strong> procesados directamente por nuestras
          pasarelas (Shopify Payments, MercadoPago). No almacenamos números de
          tarjeta en nuestros servidores.
        </li>
        <li>
          <strong>Datos de navegación:</strong> dirección IP, tipo de
          dispositivo, navegador, páginas visitadas y tiempo en el sitio,
          recolectados mediante cookies y herramientas de analítica.
        </li>
      </ul>

      <h2>2. Finalidad del tratamiento</h2>
      <ul>
        <li>Procesar y enviar tus pedidos.</li>
        <li>Brindar soporte técnico y atención post-venta.</li>
        <li>Enviar comunicaciones sobre tu pedido (confirmación, envío, tracking).</li>
        <li>Cumplir obligaciones legales y fiscales.</li>
        <li>
          Mejorar la experiencia del sitio mediante análisis agregado y
          anónimo.
        </li>
        <li>
          Marketing solo si has dado consentimiento expreso (opt-in).
        </li>
      </ul>

      <h2>3. Compartición de datos</h2>
      <p>
        Compartimos datos únicamente con terceros estrictamente necesarios para
        operar el servicio:
      </p>
      <ul>
        <li>
          <strong>Shopify Inc.</strong> — plataforma de e-commerce y
          procesamiento de pagos.
        </li>
        <li>
          <strong>Empresas de logística</strong> — para envío y entrega de
          pedidos.
        </li>
        <li>
          <strong>Google Analytics / Meta Pixel</strong> (si activado) — para
          análisis agregado de uso del sitio.
        </li>
      </ul>
      <p>
        No vendemos ni cedemos tus datos a terceros para fines comerciales no
        relacionados con tu compra.
      </p>

      <h2>4. Tus derechos</h2>
      <p>Tienes derecho a:</p>
      <ul>
        <li>Acceder a los datos personales que tenemos sobre ti.</li>
        <li>Solicitar rectificación de datos incorrectos.</li>
        <li>Solicitar eliminación de tus datos (salvo obligación legal de conservación).</li>
        <li>Retirar tu consentimiento en cualquier momento.</li>
        <li>Solicitar la portabilidad de tus datos.</li>
        <li>Presentar reclamación ante la autoridad de protección de datos de tu país.</li>
      </ul>
      <p>
        Para ejercer cualquier derecho, escríbenos a{' '}
        <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a>. Responderemos
        en un máximo de 15 días hábiles.
      </p>

      <h2>5. Conservación de datos</h2>
      <p>
        Conservamos tus datos por el tiempo necesario para cumplir con la
        finalidad para la que fueron recolectados y con las obligaciones
        legales (5 años para datos fiscales en la mayoría de países de LATAM).
      </p>

      <h2>6. Seguridad</h2>
      <p>
        Implementamos medidas técnicas y organizativas razonables para proteger
        tus datos. Toda transmisión sensible se realiza vía HTTPS/SSL. Las
        pasarelas de pago cumplen con los estándares PCI-DSS.
      </p>

      <h2>7. Menores de edad</h2>
      <p>
        Lensmind™ no comercializa productos ni recolecta datos de personas
        menores de 18 años. Si detectamos datos de un menor, los eliminaremos
        de inmediato.
      </p>

      <h2>8. Cambios en esta política</h2>
      <p>
        Esta política puede actualizarse. Cualquier cambio significativo será
        notificado mediante banner en el sitio o correo electrónico a usuarios
        registrados.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para cualquier consulta sobre privacidad, datos personales o ejercicio
        de derechos, escribe a{' '}
        <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a>.
      </p>
    </LegalLayout>
  );
}
