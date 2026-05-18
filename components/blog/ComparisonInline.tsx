/**
 * ComparisonInline — tabela comparativa pra usar em posts MDX.
 *
 * Suporta DUAS sintaxes (backward-compat com posts antigos):
 *
 * SINTAXE A — array de arrays (recomendada quando quer headers customizados):
 *   <ComparisonInline
 *     headers={['Característica', 'Lensmind', 'Ray-Ban Meta']}
 *     rows={[
 *       ['Precio', '$149.00 USD', '$329 USD'],
 *       ['Cámara', '1080p', '1080p'],
 *     ]}
 *     highlightColumn={1}
 *     caption="Fuente: ..."
 *   />
 *
 * SINTAXE B — array de objetos {label, values} (mais limpa, sem headers explícitos):
 *   <ComparisonInline
 *     title="Lensmind vs Ray-Ban Meta — números clave"
 *     highlightColumn={0}
 *     rows={[
 *       { label: "Precio", values: ["$149.00 USD", "$329 USD"] },
 *       { label: "Cámara", values: ["1080p", "1080p"] },
 *     ]}
 *   />
 *
 * Na sintaxe B:
 *   - `title` é tratado como caption (alias)
 *   - `highlightColumn` se refere ao índice dentro de `values` (não inclui label)
 *   - Internamente o label vira a primeira coluna; o highlight é ajustado +1 automaticamente
 */

type Cell = string | { value: string; check?: 'yes' | 'no' | 'partial' };

interface RowAsObject {
  label: string;
  values: Cell[];
}

type Row = Cell[] | RowAsObject;

interface ComparisonInlineProps {
  /** Headers das colunas. Se omitido, thead não é renderizado. */
  headers?: string[];
  /** Linhas: array de arrays (sintaxe A) OU array de {label, values} (sintaxe B). */
  rows: Row[];
  /**
   * Coluna a destacar (0-indexed).
   * - Sintaxe A: índice direto da coluna na tabela
   * - Sintaxe B: índice DENTRO de `values` (não conta o label)
   * Default: 1 (segunda coluna)
   */
  highlightColumn?: number;
  /** Texto de rodapé/fonte. */
  caption?: string;
  /** Alias de `caption` pra compat com MDX que usa "title". */
  title?: string;
}

function isRowObject(row: Row): row is RowAsObject {
  return (
    typeof row === 'object' &&
    row !== null &&
    !Array.isArray(row) &&
    'values' in row &&
    Array.isArray((row as RowAsObject).values)
  );
}

function normalizeRow(row: Row): Cell[] {
  if (isRowObject(row)) {
    return [row.label ?? '', ...(row.values ?? [])];
  }
  if (Array.isArray(row)) {
    return row;
  }
  return [];
}

export default function ComparisonInline({
  headers,
  rows,
  highlightColumn = 1,
  caption,
  title,
}: ComparisonInlineProps) {
  // Aceita `title` como alias de `caption` (MDX antigo usa title)
  const captionText = caption ?? title;

  // Defensive: rows pode vir undefined ou null
  const safeRows: Row[] = Array.isArray(rows) ? rows : [];

  // Detecta se está usando a sintaxe B (objetos com label/values)
  // Se sim, o highlightColumn se refere ao índice dentro de `values`,
  // então precisa ser ajustado +1 pra contar o label adicionado como coluna 0.
  const usesObjectSyntax = safeRows.length > 0 && isRowObject(safeRows[0]);
  const effectiveHighlight = usesObjectSyntax
    ? highlightColumn + 1
    : highlightColumn;

  const hasHeaders = Array.isArray(headers) && headers.length > 0;

  return (
    <div className="not-prose my-10 overflow-x-auto rounded-2xl border border-ink-700 bg-ink-900">
      <table className="w-full text-sm">
        {hasHeaders && (
          <thead>
            <tr className="border-b border-ink-700">
              {headers!.map((h, i) => (
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
        )}
        <tbody>
          {safeRows.map((row, ri) => {
            const cells = normalizeRow(row);
            return (
              <tr
                key={ri}
                className="border-b border-ink-800 last:border-b-0 hover:bg-ink-800/50 transition-colors"
              >
                {cells.map((cell, ci) => {
                  const isHighlight = ci === effectiveHighlight;
                  const cellValue =
                    typeof cell === 'string'
                      ? cell
                      : cell && typeof cell === 'object' && 'value' in cell
                      ? cell.value
                      : '';
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
            );
          })}
        </tbody>
      </table>
      {captionText && (
        <p className="px-4 md:px-5 py-3 text-xs text-smoke-500 border-t border-ink-800">
          {captionText}
        </p>
      )}
    </div>
  );
}
