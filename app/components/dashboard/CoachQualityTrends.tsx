import { AlertTriangle } from "lucide-react";
import { coachTrends } from "~/lib/coachiq-data";
import { TrendChip, ScoreBadge } from "~/components/ui/StatusChip";
import { cn } from "~/lib/cn";

function Sparkline({ scores, trend }: { scores: number[]; trend: string }) {
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const range = max - min || 1;
  const height = 28;
  const width = 96;
  const points = scores
    .map((s, i) => {
      const x = (i / (scores.length - 1)) * width;
      const y = height - ((s - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const strokeColor =
    trend === "Improving"
      ? "#16a34a"
      : trend === "Declining"
      ? "#dc2626"
      : "#94a3b8";

  return (
    <svg width={width} height={height + 4} viewBox={`0 0 ${width} ${height + 4}`} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {scores.map((s, i) => {
        const x = (i / (scores.length - 1)) * width;
        const y = height - ((s - min) / range) * height;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === scores.length - 1 ? 3 : 2}
            fill={strokeColor}
            opacity={i === scores.length - 1 ? 1 : 0.5}
          />
        );
      })}
    </svg>
  );
}

export function CoachQualityTrends() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-base font-semibold text-slate-900">Coach Quality Trends</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          8-submission score history for tracked coaches — threshold: 8.0
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Coach</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Studio</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Trend</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Latest</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Spark</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Score History</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Alert</th>
            </tr>
          </thead>
          <tbody>
            {coachTrends.map((coach, i) => {
              const isAlert = !!coach.alert;
              const isDeclining = coach.trend === "Declining";

              return (
                <tr
                  key={coach.id}
                  className={cn(
                    "border-b border-slate-50 hover:bg-slate-50/60 transition-colors",
                    isDeclining ? "bg-red-50/20" : i % 2 === 1 ? "bg-slate-50/30" : ""
                  )}
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center shrink-0",
                        isDeclining ? "bg-red-100" : "bg-slate-100"
                      )}>
                        <span className={cn(
                          "text-[10px] font-bold",
                          isDeclining ? "text-red-700" : "text-slate-600"
                        )}>{coach.initials}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-900">{coach.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm text-slate-600">{coach.studio}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <TrendChip trend={coach.trend} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <ScoreBadge score={coach.scores[coach.scores.length - 1]} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <Sparkline scores={coach.scores} trend={coach.trend} />
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <div className="flex items-center gap-1 flex-wrap">
                      {coach.scores.map((s, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            "text-[11px] font-mono px-1 py-0.5 rounded",
                            idx === coach.scores.length - 1
                              ? s < 8.0
                                ? "bg-red-100 text-red-700 font-bold"
                                : "bg-green-100 text-green-700 font-bold"
                              : "text-slate-400"
                          )}
                        >
                          {s.toFixed(1)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    {isAlert ? (
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className={cn("h-3.5 w-3.5 shrink-0", isDeclining ? "text-red-500" : "text-amber-500")} />
                        <span className={cn("text-xs font-medium", isDeclining ? "text-red-700" : "text-amber-700")}>
                          {coach.alert}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
