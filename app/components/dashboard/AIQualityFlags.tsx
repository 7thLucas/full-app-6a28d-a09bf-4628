import type { RefObject } from "react";
import { AlertTriangle, Bot } from "lucide-react";
import { aiFlags } from "~/lib/coachiq-data";
import { PriorityChip } from "~/components/ui/StatusChip";
import { cn } from "~/lib/cn";

interface AIQualityFlagsProps {
  onRequestResubmission: (name: string) => void;
  flagsSectionRef?: RefObject<HTMLDivElement>;
}

export function AIQualityFlags({ onRequestResubmission, flagsSectionRef }: AIQualityFlagsProps) {
  return (
    <div ref={flagsSectionRef} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">AI Quality Flags</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Issues detected by CoachIQ AI that require owner or manager action
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-red-100 text-red-700 px-2.5 py-1 rounded-full border border-red-200">
            {aiFlags.filter((f) => f.priority === "Urgent").length} Urgent
          </span>
          <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full border border-orange-200">
            {aiFlags.filter((f) => f.priority === "High").length} High
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {aiFlags.map((flag) => (
          <div
            key={flag.id}
            className={cn(
              "rounded-xl border p-4 flex flex-col gap-3",
              flag.priority === "Urgent"
                ? "border-red-200 bg-red-50/40"
                : flag.priority === "High"
                ? "border-orange-200 bg-orange-50/30"
                : "border-amber-200 bg-amber-50/20"
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-slate-600">{flag.staffInitials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 leading-tight">{flag.staffName}</p>
                  <p className="text-xs text-slate-500">{flag.role} · {flag.studio}</p>
                </div>
              </div>
              <PriorityChip priority={flag.priority} />
            </div>

            {/* Issue */}
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <AlertTriangle className={cn(
                  "h-3 w-3",
                  flag.priority === "Urgent" ? "text-red-600" : flag.priority === "High" ? "text-orange-600" : "text-amber-600"
                )} />
                <span className="text-xs font-semibold text-slate-800">{flag.issue}</span>
              </div>
              <p className="text-xs text-slate-600">{flag.detail}</p>
            </div>

            {/* AI Note */}
            <div className="flex items-start gap-2 bg-white/60 rounded-lg p-2.5 border border-white/80">
              <Bot className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-600 leading-relaxed italic">"{flag.aiNote}"</p>
            </div>

            {/* Action */}
            <button
              onClick={() => onRequestResubmission(flag.staffName)}
              className="mt-auto w-full h-7 text-xs font-medium text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg transition-colors"
            >
              Request Resubmission
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
