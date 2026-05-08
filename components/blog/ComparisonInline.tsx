/**
 * ComparisonInline — tabela comparativa pra usar em posts MDX.
 *
 * Uso no MDX:
 *   <ComparisonInline
 *     headers={['Característica', 'Lensmind', 'Ray-Ban Meta']}
 *     rows={[
 *       ['Precio', '$149.99 USD', '$329 USD'],
 *       ['Cámara', '1080p', '1080p'],
 *       ['Disponible LATAM', 'Sí', 'Solo México'],
 *     ]}
 *     highlightColumn={1}
 *   />
 */

interface ComparisonInlineProps {
  headers: string[];
  rows: (string | { value: string; check?: 'yes' | 'no' | 'partial' })[][];
  /** Coluna a destacar (0-indexed). Default: 1 (segunda coluna = produto principal) */
  highlightColumn?: number;
  caption?: string;
}

export default function ComparisonInline({
  headers,
  rows,
  highlightColumn = 1,
  caption,
}: ComparisonInlineProps) {
  return (
    <div className="not-prose my-10 overflow-x-auto rounded-2xl border border-ink-700 bg-ink-900">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-700">
            {(headers ?? []).map((h, i) => (
              <th
                key={i}
                className={`text-left p-4 md:p-5 text-[11px] tracking-[0.18em] uppercase font-semibold ${
                  i === highlightColumn
                    ? 'text-bone bg-ember/5'
                    : 'text-smoke-400'
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(rows ?? []).map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-ink-800 last:border-b-0 hover:bg-ink-800/50 transition-colors"
            >
              {(row ?? []).map((cell, ci) => {
                const isHighlight = ci === highlightColumn;
                const cellValue =
                  typeof cell === 'string' ? cell : cell.value;
                return (
                  <td
                    key={ci}
                    className={`p-4 md:p-5 ${
                      ci === 0
                        ? 'text-bone-200 font-medium'
                        : isHighlight
                        ? 'text-bone font-semibold bg-ember/5'
                        : 'text-smoke-400'
                    }`}
                  >
                    {cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <p className="px-4 md:px-5 py-3 text-xs text-smoke-500 border-t border-ink-800">
          {caption}
        </p>
      )}
    </div>
  );
}
