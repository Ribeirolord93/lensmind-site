import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description:
    'Términos y condiciones de uso del sitio Lensmind™ y de la compra de productos.',
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <LegalLayout title="Términos y Condiciones" lastUpdated="Mayo 2026">
      <p>
        Bienvenido a Lensmind™. Al acceder y utilizar este sitio o realizar una
        compra, aceptas los siguientes Términos y Condiciones. Te recomendamos
        leerlos con atención.
      </p>

      <h2>1. Sobre Lensmind™</h2>
      <p>
        Lensmind™ es una marca dedicada a la comercialización de gafas
        inteligentes con tecnología de inteligencia artificial, audio integrado
        y traducción multilingüe, con foco en clientes de Latinoamérica.
      </p>

      <h2>2. Productos y precios</h2>
      <p>
        Los precios se muestran en dólares estadounidenses (USD) salvo
        indicación contraria. El precio mostrado al momento de finalizar la
        compra es el precio aplicable. Nos reservamos el derecho a modificar
        precios, especificaciones y disponibilidad sin previo aviso. Las
        imágenes son referenciales.
      </p>

      <h2>3. Proceso de compra y pago</h2>
      <p>
        El proceso de compra se realiza a través de la plataforma Shopify, con
        pasarelas de pago seguras (Visa, Mastercard, Apple Pay, Google Pay,
        Shop Pay y Mercado Pago). Al confirmar la compra, recibirás un correo
        de confirmación con el detalle del pedido.
      </p>

      <h2>4. Envíos y plazos</h2>
      <ul>
        <li>Plazo estimado: 10 a 17 días hábiles desde la confirmación del pago.</li>
        <li>
          Cobertura: México, Colombia, Chile, Perú, Argentina y Brasil. Otros
          países bajo consulta.
        </li>
        <li>
          Recibirás un código de seguimiento (tracking) por correo en un máximo
          de 3 días hábiles tras el despacho.
        </li>
        <li>
          Los plazos pueden variar por feriados, aduana o causas de fuerza
          mayor ajenas a Lensmind™.
        </li>
      </ul>

      <h2>5. Devoluciones y garantía</h2>
      <p>
        <strong>Devolución sin preguntas:</strong> dispones de 30 días desde la
        recepción del producto para solicitar la devolución, siempre que el
        producto se encuentre en su estado original con todos sus accesorios.
      </p>
      <p>
        <strong>Garantía oficial:</strong> 1 año contra defectos de fabricación.
        No cubre daños por mal uso, golpes, contacto prolongado con agua o
        manipulación no autorizada.
      </p>
      <p>
        Para iniciar un proceso de devolución o garantía, contáctanos a{' '}
        <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a> indicando
        número de pedido y descripción del problema.
      </p>

      <h2>6. Uso del producto</h2>
      <p>
        El usuario es responsable del uso adecuado de Lensmind™. Recomendamos
        no utilizar el producto durante actividades que requieran atención
        plena (manejar, operar maquinaria, etc.) salvo en modos compatibles con
        seguridad. La función de cámara debe usarse respetando las leyes
        locales de privacidad e imagen.
      </p>

      <h2>7. Propiedad intelectual</h2>
      <p>
        Todos los contenidos del sitio (textos, imágenes, marcas, logotipos,
        código) son propiedad de Lensmind™ o de sus respectivos titulares y
        están protegidos por las leyes de propiedad intelectual aplicables. No
        está permitida su reproducción sin autorización previa.
      </p>

      <h2>8. Limitación de responsabilidad</h2>
      <p>
        Lensmind™ no será responsable por daños indirectos, lucro cesante o
        pérdidas derivadas del uso del producto más allá de lo expresamente
        cubierto por la garantía. La responsabilidad máxima de Lensmind™ se
        limita al valor pagado por el producto adquirido.
      </p>

      <h2>9. Modificaciones</h2>
      <p>
        Estos Términos pueden actualizarse en cualquier momento. La versión
        vigente es la publicada en este sitio en la fecha de tu compra.
      </p>

      <h2>10. Contacto y jurisdicción</h2>
      <p>
        Para cualquier consulta o reclamación, escríbenos a{' '}
        <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a>. Cualquier
        controversia se intentará resolver primero por vía amistosa. En caso de
        no llegar a acuerdo, las partes se someterán a la jurisdicción
        ordinaria del país de residencia del comprador conforme a la
        legislación local de defensa del consumidor.
      </p>
    </LegalLayout>
  );
}
