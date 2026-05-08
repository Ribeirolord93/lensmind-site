import { Sparkles } from 'lucide-react';

/**
 * KeyTakeaways — bloco de resumo executivo no início dos posts.
 *
 * Uso no MDX:
 *   <KeyTakeaways items={[
 *     "Las gafas con IA combinan cámara, audio y asistente de voz",
 *     "Ray-Ban Meta domina el mercado pero solo está en MX en LATAM",
 *     "Alternativas como Lensmind ofrecen 60% menos precio con specs similares"
 *   ]} />
 */

interface KeyTakeawaysProps {
  items: string[];
  title?: string;
}

export default function KeyTakeaways({
  items,
  title = 'En este artículo',
}: KeyTakeawaysProps) {
  return (
    <aside className="not-prose my-8 rounded-2xl border border-ink-700 bg-ink-900 p-6 md:p-7">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={16} className="text-ember" strokeWidth={2} />
        <p className="eyebrow text-ember">{title}</p>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-bone-200 text-[15px] leading-relaxed"
          >
            <span className="text-ember mt-1.5 flex-shrink-0 text-xs">●</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
