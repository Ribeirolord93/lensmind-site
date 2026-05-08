import { Info, AlertTriangle, Lightbulb, AlertOctagon } from 'lucide-react';

/**
 * Callout — bloco de destaque inline (info, warning, tip, danger).
 *
 * Uso no MDX:
 *   <Callout type="tip">
 *     Si compras durante el lanzamiento, ahorras $50 USD respecto al precio regular.
 *   </Callout>
 */

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger';
  title?: string;
  children: React.ReactNode;
}

const config = {
  info: {
    icon: Info,
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/5',
    iconColor: 'text-blue-400',
    label: 'Nota',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/5',
    iconColor: 'text-yellow-400',
    label: 'Atención',
  },
  tip: {
    icon: Lightbulb,
    border: 'border-ember/30',
    bg: 'bg-ember/5',
    iconColor: 'text-ember',
    label: 'Tip',
  },
  danger: {
    icon: AlertOctagon,
    border: 'border-red-500/30',
    bg: 'bg-red-500/5',
    iconColor: 'text-red-400',
    label: 'Importante',
  },
};

export default function Callout({
  type = 'info',
  title,
  children,
}: CalloutProps) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <aside
      className={`not-prose my-6 rounded-xl border ${c.border} ${c.bg} p-5 md:p-6`}
    >
      <div className="flex items-start gap-3">
        <Icon
          size={20}
          className={`${c.iconColor} flex-shrink-0 mt-0.5`}
          strokeWidth={2}
        />
        <div className="flex-1 min-w-0">
          {title && (
            <p
              className={`text-sm font-semibold ${c.iconColor} mb-2 uppercase tracking-wide`}
            >
              {title || c.label}
            </p>
          )}
          <div className="text-bone-200 text-[15px] leading-relaxed [&_a]:text-ember [&_a]:underline [&_a]:underline-offset-2 [&_p]:m-0 [&_p+p]:mt-3">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
