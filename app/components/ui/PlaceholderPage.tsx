import type { LucideIcon } from "lucide-react";
import { cn } from "~/lib/cn";

interface PlaceholderPageProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  features?: string[];
}

export function PlaceholderPage({
  icon: Icon,
  title,
  description,
  badge,
  badgeColor = "bg-blue-100 text-blue-700",
  features = [],
}: PlaceholderPageProps) {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 max-w-lg w-full flex flex-col items-center text-center gap-6">
        {/* Icon */}
        <div className="h-16 w-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
          <Icon className="h-8 w-8 text-slate-300" />
        </div>

        {/* Badge */}
        {badge && (
          <span className={cn("text-xs font-semibold px-3 py-1 rounded-full", badgeColor)}>
            {badge}
          </span>
        )}

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        </div>

        {/* Features list */}
        {features.length > 0 && (
          <ul className="w-full space-y-2 text-left">
            {features.map((feat) => (
              <li key={feat} className="flex items-center gap-2 text-sm text-slate-600">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                {feat}
              </li>
            ))}
          </ul>
        )}

        <button className="inline-flex items-center gap-1.5 h-9 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          Coming Soon
        </button>
      </div>
    </div>
  );
}
