import { Sparkles, ChevronRight } from "lucide-react";
import { cn } from "~/lib/cn";

interface AISituationBannerProps {
  onViewBreakdown?: () => void;
  onCreateActionPlan?: () => void;
}

const insightChips = [
  "Highest Risk: New York SoHo",
  "Most Improved: Austin Downtown",
  "Biggest Blocker: Missing Evidence",
  "Recommended Focus: Staff Training",
];

export function AISituationBanner({ onViewBreakdown, onCreateActionPlan }: AISituationBannerProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">AI Situation Brief</h3>
          </div>
        </div>
        <span className="text-xs text-slate-400 shrink-0 mt-0.5">Generated 12 minutes ago</span>
      </div>

      {/* Message */}
      <p className="text-sm text-slate-700 leading-relaxed mb-4">
        Two new openings are currently delayed, and five locations need manager attention.{" "}
        <span className="font-medium text-slate-900">New York SoHo</span> and{" "}
        <span className="font-medium text-slate-900">Chicago West Loop</span> are the
        highest-risk locations due to incomplete training, missing evidence, and unresolved
        opening blockers.
      </p>

      {/* Insight chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {insightChips.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-xs font-medium"
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onViewBreakdown}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors duration-150"
        >
          View AI Breakdown
          <ChevronRight className="h-3 w-3" />
        </button>
        <button
          onClick={onCreateActionPlan}
          className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors duration-150"
        >
          Create Action Plan
        </button>
      </div>
    </div>
  );
}
