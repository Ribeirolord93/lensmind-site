import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description:
    'Términos y condiciones de uso del sitio Lensmind™ y de la compra de productos en México y Colombia.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/terminos' },
  openGraph: {
    title: 'Términos y Condiciones | Lensmind',
    description: 'Términos y condiciones de uso del sitio Lensmind™ y de la compra de productos en México y Colombia.',
    url: '/terminos',
    type: 'website',
  },
};

export default function TerminosPage() {
  return (
    <LegalLayout title="Términos y Condiciones" lastUpdated="Mayo 2026">
      <p>
        Bienvenido a Lensmind™. Al acceder y utilizar este sitio o realizar una
        compra, aceptas los siguientes Términos y Condiciones. Te recomendamos
        leerlos con atención. Estos términos se rigen por la legislación de
        defensa del consumidor del país de residencia del comprador (México o
        Colombia).
      </p>

      <h2>1. Sobre Lensmind™</h2>
      <p>
        Lensmind™ es una marca dedicada a la comercialización de gafas
        inteligentes con tecnología de inteligencia artificial, audio integrado
        y traducción multilingüe, con foco en clientes de México y Colombia
        (Fase 1 de lanzamiento en Latinoamérica).
      </p>

      <h2>2. Productos y precios</h2>
      <p>
        Los precios se muestran en dólares estadounidenses (USD) salvo
        indicación contraria. El precio mostrado al momento de finalizar la
        compra es el precio aplicable. La conversión a peso mexicano (MXN) o
        peso colombiano (COP) se realiza automáticamente por la pasarela de
        pago según la tasa del banco emisor de tu tarjeta. Nos reservamos el
        derecho a modificar precios, especificaciones y disponibilidad sin
        previo aviso. Las imágenes son referenciales y pueden variar
        ligeramente del producto recibido.
      </p>

      <h2>3. Proceso de compra y pago</h2>
      <p>
        El proceso de compra se realiza a través de la plataforma Shopify, con
        pasarelas de pago seguras (Visa, Mastercard, Apple Pay, Google Pay,
        PayPal, Shop Pay y Mercado Pago — incluyendo PSE en Colombia). Al
        confirmar la compra, recibirás un correo de confirmación con el detalle
        del pedido en menos de 5 minutos.
      </p>

      <h2>4. Envíos y plazos</h2>
      <ul>
        <li>
          <strong>Cobertura activa:</strong> México y Colombia. Otros países
          LATAM bajo consulta vía WhatsApp o email.
        </li>
        <li>
          <strong>Despacho:</strong> en 24 horas hábiles desde la confirmación
          del pago, desde nuestro centro de distribución global.
        </li>
        <li>
          <strong>Plazo de entrega estimado:</strong> 10 a 17 días hábiles. El
          plazo incluye despacho aduanero. Las entregas en zonas rurales pueden
          sumar 2-4 días adicionales.
        </li>
        <li>
          <strong>Tracking:</strong> recibirás un código de seguimiento por
          correo dentro de los 3 días hábiles posteriores al despacho. Soporte
          activo durante todo el trayecto vía WhatsApp.
        </li>
        <li>
          Los plazos pueden variar por feriados nacionales, retrasos aduaneros,
          eventos climáticos o causas de fuerza mayor ajenas a Lensmind™.
        </li>
      </ul>

      <h2>5. Aranceles e impuestos</h2>
      <p>
        El precio mostrado en el sitio NO incluye posibles aranceles o
        impuestos de importación que puedan aplicar al recibir el paquete según
        la legislación de tu país:
      </p>
      <ul>
        <li>
          <strong>México (SAT):</strong> envíos con valor declarado bajo USD 50
          generalmente no generan cargos aduaneros. Sobre ese umbral pueden
          aplicar impuestos al recibir el paquete.
        </li>
        <li>
          <strong>Colombia (DIAN):</strong> envíos con valor declarado igual o
          inferior a USD 200 están exonerados de IVA y aranceles bajo la
          Resolución 46 de 2019 y el Decreto 410 de 2020. Lensmind™ Edition 01
          ($149.00 USD) queda dentro de esa franja.
        </li>
      </ul>
      <p>
        Te recomendamos consultar la legislación vigente del SAT (México) o de
        la DIAN (Colombia) antes de comprar. Lensmind™ no se responsabiliza
        por cargos aduaneros aplicados por las autoridades locales.
      </p>

      <h2>6. Devoluciones y garantía</h2>
      <p>
        <strong>Devolución sin preguntas:</strong> dispones de 30 días desde la
        recepción del producto para solicitar la devolución, siempre que el
        producto se encuentre en su estado original con todos sus accesorios.
        Lensmind™ paga el envío de regreso (guía prepagada). Reembolso total
        en 5-10 días hábiles después de recibir el producto en nuestro centro.
      </p>
      <p>
        <strong>Garantía oficial:</strong> 1 año contra defectos de fabricación
        bajo uso normal. No cubre daños por mal uso, golpes, contacto
        prolongado con agua, exposición a temperaturas extremas o manipulación
        no autorizada. Cubre reposición o reembolso completo, a elección del
        cliente.
      </p>
      <p>
        Para iniciar un proceso de devolución o garantía, contáctanos a{' '}
        <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a> indicando
        número de pedido y descripción del problema con fotos o videos cuando
        aplique.
      </p>

      <h2>7. Uso del producto</h2>
      <p>
        El usuario es responsable del uso adecuado de Lensmind™. Recomendamos
        no utilizar el producto durante actividades que requieran atención
        plena (manejar, operar maquinaria, etc.) salvo en modos compatibles con
        seguridad. La función de cámara debe usarse respetando las leyes
        locales de privacidad e imagen — el usuario es responsable de obtener
        consentimiento de terceros cuando aplique según la legislación de su
        país.
      </p>

      <h2>8. Privacidad y datos personales</h2>
      <p>
        El tratamiento de datos personales se rige por nuestra{' '}
        <a href="/privacidad">Política de Privacidad</a>, conforme a la LFPDPPP
        de México y la Ley 1581 de 2012 (Habeas Data) de Colombia. Para más
        información sobre cómo protegemos tus datos, visita{' '}
        <a href="/privacidad-datos">Cómo protegemos tu privacidad</a>.
      </p>

      <h2>9. Propiedad intelectual</h2>
      <p>
        Todos los contenidos del sitio (textos, imágenes, marcas, logotipos,
        código) son propiedad de Lensmind™ o de sus respectivos titulares y
        están protegidos por las leyes de propiedad intelectual aplicables. No
        está permitida su reproducción sin autorización previa. Las marcas
        Ray-Ban Meta, Sony, Apple, Google y otras mencionadas en el sitio son
        propiedad de sus respectivos titulares y se citan únicamente con fines
        comparativos o informativos.
      </p>

      <h2>10. Limitación de responsabilidad</h2>
      <p>
        Lensmind™ no será responsable por daños indirectos, lucro cesante o
        pérdidas derivadas del uso del producto más allá de lo expresamente
        cubierto por la garantía. La responsabilidad máxima de Lensmind™ se
        limita al valor pagado por el producto adquirido.
      </p>

      <h2>11. Modificaciones</h2>
      <p>
        Estos Términos pueden actualizarse en cualquier momento. La versión
        vigente es la publicada en este sitio en la fecha de tu compra.
        Cambios significativos serán comunicados por email a clientes con
        pedidos en curso.
      </p>

      <h2>12. Defensa del consumidor</h2>
      <p>
        Tu compra está protegida por la legislación local de defensa del
        consumidor:
      </p>
      <ul>
        <li>
          <strong>México:</strong> Ley Federal de Protección al Consumidor —
          PROFECO (www.gob.mx/profeco). Plazo de garantía mínimo de 60 días
          para reclamaciones de calidad.
        </li>
        <li>
          <strong>Colombia:</strong> Estatuto del Consumidor (Ley 1480 de 2011)
          — Superintendencia de Industria y Comercio (SIC). Derecho de retracto
          de 5 días hábiles para compras electrónicas.
        </li>
      </ul>

      <h2>13. Contacto y jurisdicción</h2>
      <p>
        Para cualquier consulta o reclamación, escríbenos a{' '}
        <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a>. Cualquier
        controversia se intentará resolver primero por vía amistosa dentro de
        los 30 días posteriores a la reclamación. En caso de no llegar a
        acuerdo, las partes se someterán a la jurisdicción ordinaria del país
        de residencia del comprador (México o Colombia) conforme a la
        legislación local de defensa del consumidor.
      </p>
    </LegalLayout>
  );
}
