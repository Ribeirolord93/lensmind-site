'use client';

const items = [
  { text: 'Cámara Sony 1080p', emoji: '📸' },
  { text: 'IA por Voz', emoji: '🤖' },
  { text: 'Traductor 40 Idiomas', emoji: '🌍' },
  { text: 'Audio Manos Libres', emoji: '🎵' },
  { text: 'Bluetooth 5.3', emoji: '📡' },
  { text: '32GB Almacenamiento', emoji: '💾' },
  { text: '10h de Batería', emoji: '🔋' },
  { text: 'Lentes Intercambiables', emoji: '👓' },
];

export default function Marquee() {
  return (
    <section className="relative bg-bone text-ink py-10 overflow-hidden border-y border-ink-700/10">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-12 whitespace-nowrap"
          >
            <span className="text-xl">{item.emoji}</span>
            <span className="text-display italic text-2xl md:text-3xl font-light tracking-tight">
              {item.text}
            </span>
            <span className="text-ember text-2xl">·</span>
          </div>
        ))}
      </div>
    </section>
  );
}
