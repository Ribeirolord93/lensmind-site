import FeatureBlock from './FeatureBlock';

export default function BenefitsGrid() {
  return (
    <div id="tecnologia">
      {/* 01 - Cámara */}
      <FeatureBlock
        eyebrow="01 · Captura"
        title="Cámara Sony 1080p. Sin sacar el celular."
        description="Sensor Sony de 8MP con estabilización óptica integrada. Captura fotos y videos con un toque, mantén el momento sin interrumpirlo."
        bullets={[
          'Video Full HD 1080p a 30fps',
          'Sensor Sony con HDR y autoenfoque',
          'Almacenamiento integrado de 32GB',
          'Sincronización automática con tu celular',
        ]}
        mediaLabel="ESPACIO PARA VIDEO"
        mediaSpec="demo cámara · 16:9 · MP4"
        aspectRatio="video"
      />

      {/* 02 - IA */}
      <FeatureBlock
        eyebrow="02 · Inteligencia"
        title="Asistente de IA. Siempre presente."
        description="Pregunta lo que sea por voz. Traducciones, resúmenes, identificación de objetos. Tu copiloto personal — sin pantalla, sin teclado, sin distracción."
        bullets={[
          'Voz natural en español, portugués e inglés',
          'Reconocimiento de objetos y texto en tiempo real',
          'Resúmenes y respuestas contextuales',
          'Funciona 24/7 con conexión a tu celular',
        ]}
        mediaLabel="ESPACIO PARA VIDEO"
        mediaSpec="demo IA por voz · 16:9 · MP4"
        aspectRatio="video"
        reverse
      />

      {/* 03 - Audio */}
      <FeatureBlock
        eyebrow="03 · Audio"
        title="Bocinas direccionales. Privacidad pública."
        description="Sistema de audio open-ear con bocinas direccionales y 4 micrófonos con cancelación de ruido. Música, llamadas y podcasts sin auriculares ni cables."
        bullets={[
          '4 micrófonos con cancelación activa',
          'Bocinas open-ear de alta fidelidad',
          'Bluetooth 5.3 con baja latencia',
          'Audio espacial direccional',
        ]}
        mediaLabel="ESPACIO PARA IMAGEN"
        mediaSpec="detalle audio · 1:1 · WebP"
        aspectRatio="square"
      />

      {/* 04 - Traductor */}
      <FeatureBlock
        eyebrow="04 · Traductor"
        title="40 idiomas. En tiempo real. En tu oído."
        description="Conversaciones fluidas entre idiomas distintos. La IA escucha, traduce y te dice la respuesta al oído — sin apps, sin esperar, sin sacar el celular."
        bullets={[
          'Traducción simultánea en 40 idiomas',
          'Latencia menor a 500ms',
          'Modo conversación bidireccional',
          'Funciona sin internet en 12 idiomas principales',
        ]}
        mediaLabel="ESPACIO PARA VIDEO"
        mediaSpec="demo traductor · 16:9 · MP4"
        aspectRatio="video"
        reverse
      />
    </div>
  );
}
