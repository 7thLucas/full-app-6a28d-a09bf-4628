import { MapPin, ArrowRight, AlertTriangle, Rocket } from "lucide-react";
import { studios, type Studio } from "~/lib/coachiq-data";
import { StatusChip } from "~/components/ui/StatusChip";
import { cn } from "~/lib/cn";

function getStatusColors(status: Studio["status"]) {
  switch (status) {
    case "Strong":
      return { border: "border-green-200", header: "bg-green-50", badge: "" };
    case "On Track":
      return { border: "border-teal-200", header: "bg-teal-50", badge: "" };
    case "Watchlist":
      return { border: "border-amber-200", header: "bg-amber-50", badge: "" };
    case "At Risk":
      return { border: "border-red-200", header: "bg-red-50", badge: "" };
    case "Launch Gate":
      return { border: "border-purple-200", header: "bg-purple-50", badge: "" };
    default:
      return { border: "border-slate-200", header: "bg-slate-50", badge: "" };
  }
}

function getScoreColor(score: number) {
  if (score >= 9.0) return "text-green-700 bg-green-50";
  if (score >= 8.0) return "text-teal-700 bg-teal-50";
  if (score >= 7.0) return "text-amber-700 bg-amber-50";
  return "text-red-700 bg-red-50";
}

function getRetentionColor(ret: number | null) {
  if (ret === null) return "text-slate-400";
  if (ret >= 88) return "text-green-700";
  if (ret >= 82) return "text-amber-700";
  return "text-red-700";
}

interface StudioCardProps {
  studio: Studio;
}

function StudioCard({ studio }: StudioCardProps) {
  const { border, header } = getStatusColors(studio.status);

  return (
    <div
      className={cn(
        "bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col",
        border
      )}
    >
      {/* Header */}
      <div className={cn("px-4 py-3 border-b", header, border)}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{studio.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3 text-slate-400" />
              <span className="text-xs text-slate-500">
                {studio.city}, {studio.state}
              </span>
            </div>
          </div>
          <StatusChip label={studio.status} />
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {studio.formats.map((f) => (
            <span key={f} className="text-[10px] font-medium bg-white/70 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="px-4 py-3 grid grid-cols-2 gap-3 flex-1">
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mb-0.5">
            Quality Score
          </p>
          <span
            className={cn(
              "inline-block px-2 py-0.5 rounded-lg text-sm font-bold tabular-nums",
              getScoreColor(studio.qualityScore)
            )}
          >
            {studio.qualityScore.toFixed(1)}/10
          </span>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mb-0.5">
            Retention
          </p>
          <span
            className={cn(
              "text-sm font-bold tabular-nums",
              getRetentionColor(studio.memberRetention)
            )}
          >
            {studio.memberRetention !== null ? `${studio.memberRetention}%` : "N/A"}
          </span>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mb-0.5">
            Submissions Due
          </p>
          <span className={cn("text-sm font-semibold", studio.submissionsDue > 3 ? "text-red-600" : "text-slate-700")}>
            {studio.submissionsDue}
          </span>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mb-0.5">
            Front Desk
          </p>
          <span className={cn("text-sm font-semibold", studio.frontDeskReadiness < 70 ? "text-red-600" : studio.frontDeskReadiness < 80 ? "text-amber-700" : "text-green-700")}>
            {studio.frontDeskReadiness}%
          </span>
        </div>
      </div>

      {/* Launch status */}
      {studio.status === "Launch Gate" && (
        <div className="px-4 py-2 bg-purple-50 border-t border-purple-100 flex items-center gap-1.5">
          <Rocket className="h-3 w-3 text-purple-600" />
          <span className="text-xs font-medium text-purple-700">
            {studio.launchApproved ? "Launch Approved" : "Not Approved — blockers pending"}
          </span>
        </div>
      )}

      {/* AI Insight */}
      <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50">
        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
          <span className="font-medium text-blue-600">AI: </span>
          {studio.aiInsight}
        </p>
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center">
            <span className="text-[9px] font-bold text-slate-600">{studio.directorInitials}</span>
          </div>
          <span className="text-xs text-slate-500">{studio.director}</span>
        </div>
        <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
          View Studio
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export function StudioQualityOverview() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Studio Quality Overview</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Quality scores, retention, and readiness across all BloomFit locations
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
          <span className="text-xs font-medium text-red-600">2 studios need attention</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {studios.map((studio) => (
          <StudioCard key={studio.id} studio={studio} />
        ))}
      </div>
    </div>
  );
}
