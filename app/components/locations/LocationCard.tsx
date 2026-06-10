import { Link } from "react-router";
import { MapPin, AlertTriangle, FileX, GraduationCap, ChevronRight, User } from "lucide-react";
import { cn } from "~/lib/cn";
import { StatusChip } from "~/components/ui/StatusChip";
import { ProgressBar } from "~/components/ui/ProgressBar";
import type { Location } from "~/data/mock-data";

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location: loc }: LocationCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 leading-snug">
            {loc.name.replace("BloomFit ", "")}
          </h3>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <MapPin className="h-3 w-3 shrink-0" />
            <span>{loc.city}, {loc.state}</span>
          </div>
        </div>
        <StatusChip label={loc.type} />
      </div>

      {/* Readiness Score */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Readiness</span>
          <span className="text-sm font-bold text-slate-900">{loc.readinessScore}%</span>
        </div>
        <ProgressBar value={loc.readinessScore} height="h-2" />
      </div>

      {/* Status chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <StatusChip label={loc.status} />
        <StatusChip label={loc.auditRisk} />
        {loc.openingDate && (
          <span className="text-[10px] bg-slate-100 text-slate-500 border border-slate-200 rounded-full px-2 py-0.5 font-medium">
            Opens {loc.openingDate}
          </span>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-50">
        <div className="flex flex-col gap-0.5 items-center">
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-red-400" />
            <span className={cn("text-sm font-bold", loc.openBlockers > 7 ? "text-red-700" : loc.openBlockers > 3 ? "text-amber-600" : "text-slate-700")}>
              {loc.openBlockers}
            </span>
          </div>
          <span className="text-[10px] text-slate-400">Blockers</span>
        </div>
        <div className="flex flex-col gap-0.5 items-center">
          <div className="flex items-center gap-1">
            <FileX className="h-3 w-3 text-amber-400" />
            <span className={cn("text-sm font-bold", loc.missingEvidence > 10 ? "text-red-700" : loc.missingEvidence > 4 ? "text-amber-600" : "text-slate-700")}>
              {loc.missingEvidence}
            </span>
          </div>
          <span className="text-[10px] text-slate-400">Missing</span>
        </div>
        <div className="flex flex-col gap-0.5 items-center">
          <div className="flex items-center gap-1">
            <GraduationCap className="h-3 w-3 text-blue-400" />
            <span className={cn("text-sm font-bold", loc.staffTraining < 60 ? "text-red-700" : loc.staffTraining < 75 ? "text-amber-600" : "text-slate-700")}>
              {loc.staffTraining}%
            </span>
          </div>
          <span className="text-[10px] text-slate-400">Training</span>
        </div>
      </div>

      {/* Manager & Top Blocker */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <User className="h-3 w-3 shrink-0" />
          <span className="truncate">{loc.managerName}</span>
          <span className="text-slate-300 mx-0.5">·</span>
          <span className="text-slate-400 shrink-0">{loc.lastUpdate}</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2 italic">
          "{loc.topBlocker}"
        </p>
      </div>

      {/* Action */}
      <Link
        to={`/locations/${loc.id}`}
        className="inline-flex items-center justify-center gap-1.5 h-8 w-full text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-lg transition-colors"
      >
        View Location
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
