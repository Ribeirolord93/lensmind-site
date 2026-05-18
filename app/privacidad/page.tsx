import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad y tratamiento de datos personales de Lensmind™. Cumple con LFPDPPP México y Ley 1581 de Habeas Data Colombia.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacidad' },
};

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Política de Privacidad" lastUpdated="Mayo 2026">
      <p>
        En Lensmind™ valoramos tu privacidad. Esta política explica qué datos
        recolectamos, cómo los usamos y los derechos que tienes sobre ellos,
        conforme a la legislación de protección de datos vigente en los países
        donde operamos: <strong>México</strong> (Ley Federal de Protección de
        Datos Personales en Posesión de Particulares — LFPDPPP) y{' '}
        <strong>Colombia</strong> (Ley 1581 de 2012 y Decreto 1377 de 2013 —
        régimen general de Habeas Data).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        Lensmind™ es responsable del tratamiento de los datos personales que
        recolecta a través de su sitio web <a href="https://lensmind.lat">lensmind.lat</a>{' '}
        y canales asociados. Para cualquier consulta o solicitud, escríbenos a{' '}
        <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a>.
      </p>

      <h2>2. Datos que recolectamos</h2>
      <ul>
        <li>
          <strong>Datos de contacto:</strong> nombre, email, teléfono y
          dirección de envío proporcionados al realizar una compra.
        </li>
        <li>
          <strong>Datos de pago:</strong> procesados directamente por nuestras
          pasarelas (Shopify Payments, Stripe, Mercado Pago). No almacenamos
          números de tarjeta en nuestros servidores.
        </li>
        <li>
          <strong>Datos de navegación:</strong> dirección IP, tipo de
          dispositivo, navegador, páginas visitadas y tiempo en el sitio,
          recolectados mediante cookies y herramientas de analítica.
        </li>
        <li>
          <strong>Datos de marketing (opt-in):</strong> email proporcionado
          voluntariamente para recibir comunicaciones promocionales — solo si
          has dado consentimiento explícito.
        </li>
      </ul>

      <h2>3. Finalidad del tratamiento</h2>
      <ul>
        <li>Procesar y enviar tus pedidos a México y Colombia.</li>
        <li>Brindar soporte técnico y atención post-venta en español y portugués.</li>
        <li>Enviar comunicaciones transaccionales (confirmación de pedido, despacho, tracking, soporte).</li>
        <li>Cumplir obligaciones legales y fiscales (SAT México, DIAN Colombia).</li>
        <li>
          Mejorar la experiencia del sitio mediante análisis agregado y
          anónimo.
        </li>
        <li>
          Marketing solo si has dado consentimiento expreso (opt-in). Puedes
          retirarlo en cualquier momento.
        </li>
      </ul>

      <h2>4. Compartición de datos con terceros</h2>
      <p>
        Compartimos datos únicamente con terceros estrictamente necesarios para
        operar el servicio:
      </p>
      <ul>
        <li>
          <strong>Shopify Inc.</strong> (Canadá/EE.UU.) — plataforma de
          e-commerce y procesamiento de pagos.
        </li>
        <li>
          <strong>Stripe Inc.</strong> (EE.UU.) — pasarela de pagos con
          tarjeta. Cumple PCI-DSS.
        </li>
        <li>
          <strong>Mercado Pago</strong> (Argentina/Colombia/México) — pasarela
          local incluyendo PSE en Colombia.
        </li>
        <li>
          <strong>Empresas de logística y courier</strong> — para envío y
          entrega de pedidos en México y Colombia.
        </li>
        <li>
          <strong>Google Analytics / Meta Pixel</strong> (si activado por el
          usuario en el banner de cookies) — para análisis agregado de uso del
          sitio. Configurado con anonimización de IP.
        </li>
        <li>
          <strong>Klaviyo</strong> (EE.UU.) — gestión de email marketing solo
          para usuarios que dieron consentimiento opt-in.
        </li>
      </ul>
      <p>
        <strong>No vendemos ni cedemos tus datos</strong> a terceros para fines
        comerciales no relacionados con tu compra. Todas las transferencias
        internacionales de datos cumplen con cláusulas contractuales tipo
        equivalentes al estándar europeo y los requisitos de los países donde
        operamos.
      </p>

      <h2>5. Tus derechos — México (LFPDPPP)</h2>
      <p>
        Como titular de datos personales en México, tienes los derechos ARCO:
      </p>
      <ul>
        <li>
          <strong>Acceso:</strong> conocer qué datos personales tenemos sobre ti.
        </li>
        <li>
          <strong>Rectificación:</strong> corregir datos inexactos o incompletos.
        </li>
        <li>
          <strong>Cancelación:</strong> solicitar la supresión de tus datos cuando proceda.
        </li>
        <li>
          <strong>Oposición:</strong> oponerte al uso de tus datos para finalidades específicas (marketing, perfilamiento, etc.).
        </li>
      </ul>
      <p>
        Plazo de respuesta: 20 días hábiles. Autoridad de protección: Instituto
        Nacional de Transparencia, Acceso a la Información y Protección de
        Datos Personales (INAI).
      </p>

      <h2>6. Tus derechos — Colombia (Ley 1581 / Habeas Data)</h2>
      <p>
        Como titular de datos personales en Colombia, tienes los siguientes
        derechos bajo la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013:
      </p>
      <ul>
        <li>
          <strong>Conocer, actualizar y rectificar</strong> tus datos en cualquier momento.
        </li>
        <li>
          <strong>Solicitar prueba</strong> de la autorización otorgada al responsable del tratamiento.
        </li>
        <li>
          <strong>Ser informado</strong> sobre el uso de tus datos personales.
        </li>
        <li>
          <strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.
        </li>
        <li>
          <strong>Revocar la autorización</strong> y solicitar la supresión del dato cuando proceda.
        </li>
        <li>
          <strong>Acceder gratuitamente</strong> a tus datos personales objeto de tratamiento.
        </li>
      </ul>
      <p>
        Plazo de respuesta: 15 días hábiles. Autoridad de protección:
        Superintendencia de Industria y Comercio (SIC) — Delegatura para la
        Protección de Datos Personales (www.sic.gov.co).
      </p>

      <h2>7. Cómo ejercer tus derechos</h2>
      <p>
        Para ejercer cualquier derecho ARCO (México) o de Habeas Data
        (Colombia), escríbenos a{' '}
        <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a> indicando:
      </p>
      <ul>
        <li>Nombre completo y país de residencia.</li>
        <li>Documento de identidad (para verificar tu identidad).</li>
        <li>Descripción clara del derecho que deseas ejercer.</li>
        <li>Email o medio de contacto para recibir nuestra respuesta.</li>
      </ul>

      <h2>8. Conservación de datos</h2>
      <p>
        Conservamos tus datos por el tiempo necesario para cumplir con la
        finalidad para la que fueron recolectados y con las obligaciones
        legales y fiscales locales: 5 años en México (CFF Art. 67) y 5 años en
        Colombia (Estatuto Tributario Art. 632). Datos de marketing se
        conservan hasta que retires tu consentimiento.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Implementamos medidas técnicas, administrativas y físicas razonables
        para proteger tus datos contra acceso no autorizado, pérdida, alteración
        o destrucción. Toda transmisión sensible se realiza vía HTTPS/SSL. Las
        pasarelas de pago cumplen con los estándares PCI-DSS. Realizamos
        auditorías periódicas de seguridad.
      </p>

      <h2>10. Cookies y tecnologías similares</h2>
      <p>
        Usamos cookies estrictamente necesarias para el funcionamiento del
        sitio, cookies analíticas y cookies de marketing. Solo se activan las
        opcionales con tu consentimiento explícito vía nuestro banner de
        cookies. Consulta nuestra <a href="/cookies">política de cookies</a>{' '}
        para más detalles.
      </p>

      <h2>11. Menores de edad</h2>
      <p>
        Lensmind™ no comercializa productos ni recolecta datos de personas
        menores de 18 años. Si detectamos datos de un menor, los eliminaremos
        de inmediato. Padres o tutores pueden contactarnos a{' '}
        <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a> para reportar
        cualquier caso.
      </p>

      <h2>12. Cambios en esta política</h2>
      <p>
        Esta política puede actualizarse para reflejar cambios legales,
        tecnológicos u operativos. Cualquier cambio significativo será
        notificado mediante banner en el sitio o correo electrónico a usuarios
        registrados. La fecha de última actualización aparece al inicio de este
        documento.
      </p>

      <h2>13. Contacto</h2>
      <p>
        Para cualquier consulta sobre privacidad, datos personales, ejercicio
        de derechos o reclamaciones, escribe a{' '}
        <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a>. Si no recibes
        respuesta satisfactoria dentro de los plazos legales, puedes acudir a
        la autoridad de protección de datos de tu país (INAI en México, SIC en
        Colombia).
      </p>
    </LegalLayout>
  );
}
