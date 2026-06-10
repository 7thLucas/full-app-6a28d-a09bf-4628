import { Rocket, AlertTriangle, Users, CheckCircle, Clock } from "lucide-react";
import { denverLaunchGate } from "~/lib/coachiq-data";
import { cn } from "~/lib/cn";

interface LaunchReadinessPreviewProps {
  onOpenLaunchGate: () => void;
  onSendSummary: () => void;
}

export function LaunchReadinessPreview({ onOpenLaunchGate, onSendSummary }: LaunchReadinessPreviewProps) {
  const gate = denverLaunchGate;

  return (
    <div className="bg-white rounded-xl border border-purple-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-purple-50/60 border-b border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Studio Launch Readiness Gate</h2>
              <p className="text-xs text-slate-500">BloomFit Denver Launch</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-100 border border-red-200 px-2.5 py-1 rounded-full">
            <AlertTriangle className="h-3 w-3" />
            Not Approved
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2 ml-[44px]">
          BloomFit Denver Launch cannot be approved until every staff member has passed.
        </p>
      </div>

      <div className="px-6 py-5">
        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Launch Readiness</span>
            <span className="text-lg font-bold text-purple-700">{gate.readinessPercent}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${gate.readinessPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">Target: 100% before opening</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-3 mb-5">
          {[
            { label: "Total Staff", value: gate.totalStaff, icon: Users, color: "text-slate-600" },
            { label: "Submitted", value: gate.submitted, icon: CheckCircle, color: "text-blue-600" },
            { label: "Passed", value: gate.passed, icon: CheckCircle, color: "text-green-600" },
            { label: "Pending", value: gate.pending, icon: Clock, color: "text-amber-600" },
            { label: "Below Threshold", value: gate.belowThreshold, icon: AlertTriangle, color: "text-red-600" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Icon className={cn("h-4 w-4 mx-auto mb-1", stat.color)} />
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-[10px] text-slate-500 leading-tight">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Blockers */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2.5">
            Blockers — must pass before opening
          </h3>
          <div className="space-y-2">
            {gate.blockers.map((blocker) => (
              <div
                key={blocker.name}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2.5 border",
                  blocker.status === "Not Cleared"
                    ? "bg-red-50 border-red-200"
                    : "bg-amber-50 border-amber-200"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-6 w-6 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-slate-600">{blocker.initials}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{blocker.name}</p>
                    <p className="text-[10px] text-slate-500">{blocker.role}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    blocker.status === "Not Cleared"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  )}
                >
                  {blocker.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-slate-100">
          <button
            onClick={onOpenLaunchGate}
            className="flex-1 h-9 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Open Launch Gate
          </button>
          <button
            onClick={onSendSummary}
            className="flex-1 h-9 text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Send Daily Summary
          </button>
        </div>
      </div>
    </div>
  );
}
