import { AlertTriangle, FileX, GraduationCap, ShieldAlert, Sparkles } from "lucide-react";
import { cn } from "~/lib/cn";

const riskCategories = [
  {
    icon: AlertTriangle,
    label: "Opening Delay Risk",
    value: "2 locations",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    icon: FileX,
    label: "Evidence Risk",
    value: "52 items",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: GraduationCap,
    label: "Training Risk",
    value: "4 locations",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: ShieldAlert,
    label: "Audit Risk",
    value: "2 high-risk",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
  },
];

export function RiskBlockerIntelligence() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Risk & Blocker Intelligence</h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {riskCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.label}
              className={cn(
                "flex flex-col gap-1.5 p-3 rounded-lg border",
                cat.bg,
                cat.border
              )}
            >
              <Icon className={cn("h-4 w-4", cat.color)} />
              <span className="text-xs font-medium text-slate-700">{cat.label}</span>
              <span className={cn("text-sm font-bold", cat.color)}>{cat.value}</span>
            </div>
          );
        })}
      </div>

      {/* AI note */}
      <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg p-3">
        <Sparkles className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          AI recommends resolving evidence gaps before training gaps because missing evidence
          affects 6 active locations.
        </p>
      </div>
    </div>
  );
}
