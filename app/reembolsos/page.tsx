import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Política de Reembolsos y Devoluciones',
  description:
    'Política completa de reembolsos, devoluciones y garantía de Lensmind™.',
  alternates: { canonical: '/reembolsos' },
};

export default function ReembolsosPage() {
  return (
    <LegalLayout
      title="Reembolsos y Devoluciones"
      lastUpdated="Mayo 2026"
    >
      <p>
        En Lensmind™ queremos que estés 100% satisfecho con tu compra. Si por
        cualquier razón no lo estás, esta política te explica el proceso paso a
        paso.
      </p>

      <h2>Plazo de devolución sin preguntas</h2>
      <p>
        Tienes <strong>30 días naturales</strong> desde la fecha de recepción
        del producto para solicitar la devolución, sin necesidad de justificar
        la decisión.
      </p>

      <h2>Condiciones</h2>
      <ul>
        <li>El producto debe estar en su <strong>estado original</strong>: empaque, accesorios, manual, cable de carga y estuche.</li>
        <li>Sin signos de uso prolongado, daño físico o manipulación no autorizada.</li>
        <li>Conservar la factura o número de pedido.</li>
        <li>El cliente cubre el costo del envío de devolución (excepto en casos de defecto de fábrica).</li>
      </ul>

      <h2>Cómo iniciar una devolución</h2>
      <ol className="list-decimal pl-5 space-y-2 text-bone-300 text-[15px]">
        <li>Escríbenos a <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a> con tu número de pedido y motivo de devolución.</li>
        <li>Recibirás respuesta en máximo 24 horas hábiles con instrucciones de envío.</li>
        <li>Empaca el producto en su empaque original.</li>
        <li>Envía a la dirección que te indicaremos por correo.</li>
        <li>Una vez recibido y verificado, procesamos el reembolso.</li>
      </ol>

      <h2>Plazos de reembolso</h2>
      <ul>
        <li><strong>Tarjeta de crédito/débito:</strong> 5-10 días hábiles después de recibir el producto de vuelta (depende del banco emisor).</li>
        <li><strong>Apple Pay / Google Pay / Shop Pay:</strong> 5-10 días hábiles (vuelve al método de pago original).</li>
        <li><strong>Mercado Pago:</strong> 3-5 días hábiles.</li>
      </ul>

      <h2>Garantía de fábrica</h2>
      <p>
        Independientemente del plazo de devolución de 30 días, Lensmind™ ofrece{' '}
        <strong>1 año de garantía oficial</strong> contra defectos de
        fabricación, contado desde la fecha de entrega.
      </p>

      <h3>Qué cubre la garantía</h3>
      <ul>
        <li>Defectos en componentes electrónicos (cámara, micrófonos, bocinas, batería).</li>
        <li>Fallas de software no resueltas con actualizaciones.</li>
        <li>Defectos de ensamblaje en el frame, charnelas o lentes.</li>
      </ul>

      <h3>Qué NO cubre la garantía</h3>
      <ul>
        <li>Daños por golpes, caídas o uso indebido.</li>
        <li>Contacto con agua más allá del rango certificado IPX4.</li>
        <li>Modificaciones o reparaciones no autorizadas.</li>
        <li>Desgaste estético normal por uso cotidiano.</li>
      </ul>

      <h2>Casos especiales</h2>

      <h3>Producto recibido dañado</h3>
      <p>
        Si recibes el producto dañado, repórtalo en{' '}
        <strong>las primeras 48 horas</strong> con fotos del empaque y
        producto. Cubrimos el envío de reposición sin costo adicional.
      </p>

      <h3>Pedido extraviado</h3>
      <p>
        Si el tracking muestra entrega pero no recibiste el paquete, abrimos
        una investigación con la transportadora. En máximo 15 días hábiles
        resolvemos: reposición o reembolso completo.
      </p>

      <h3>Cancelación antes del envío</h3>
      <p>
        Si quieres cancelar antes de que el pedido sea despachado, escríbenos
        en máximo 24 horas tras la compra. Reembolso completo sin costo.
      </p>

      <h2>Aranceles e impuestos de importación</h2>
      <p>
        Los envíos de Lensmind™ son internacionales. Algunos países pueden
        cobrar aranceles o impuestos de importación al momento de la entrega.
        Estos costos corren por cuenta del cliente y no son reembolsables por
        Lensmind™.
      </p>

      <h2>Contacto</h2>
      <p>
        Para cualquier solicitud de devolución, garantía o duda relacionada:
      </p>
      <ul>
        <li>Email: <a href="mailto:hola@lensmind.lat">hola@lensmind.lat</a></li>
        <li>Respuesta en máximo 24 horas hábiles.</li>
      </ul>
    </LegalLayout>
  );
}
