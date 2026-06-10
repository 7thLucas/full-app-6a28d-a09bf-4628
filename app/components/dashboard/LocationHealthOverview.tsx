import { cn } from "~/lib/cn";
import { locations } from "~/data/mock-data";

const regionalSummary = [
  { region: "West", total: 3, atRisk: 1, delayed: 0 },
  { region: "South", total: 5, atRisk: 2, delayed: 0 },
  { region: "Midwest", total: 3, atRisk: 0, delayed: 1 },
  { region: "Northeast", total: 4, atRisk: 0, delayed: 1 },
];

export function LocationHealthOverview() {
  const onTrack = locations.filter((l) => l.status === "On Track").length;
  const atRisk = locations.filter((l) => l.status === "At Risk").length;
  const delayed = locations.filter((l) => l.status === "Delayed").length;
  const readyForReview = locations.filter((l) => l.status === "Ready for Review").length;
  const total = locations.length;

  const segments = [
    { label: "On Track", count: onTrack, color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-100" },
    { label: "At Risk", count: atRisk, color: "bg-amber-500", textColor: "text-amber-700", bgColor: "bg-amber-100" },
    { label: "Delayed", count: delayed, color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-100" },
    { label: "Ready for Review", count: readyForReview + 3, color: "bg-blue-500", textColor: "text-blue-700", bgColor: "bg-blue-100" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Location Health Overview</h3>

      {/* Status distribution bar */}
      <div className="flex rounded-full overflow-hidden h-3 mb-3 gap-px">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className={cn("h-full transition-all", seg.color)}
            style={{ width: `${(seg.count / (total + 3)) * 100}%` }}
            title={`${seg.label}: ${seg.count}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <div className={cn("h-2 w-2 rounded-full", seg.color)} />
            <span className="text-xs text-slate-600">
              {seg.label}{" "}
              <span className={cn("font-semibold", seg.textColor)}>{seg.count}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Regional summary */}
      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Regional Summary</p>
        <div className="grid grid-cols-4 gap-3">
          {regionalSummary.map((r) => (
            <div key={r.region} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">{r.region}</span>
                <span className="text-xs text-slate-400">{r.total}</span>
              </div>
              <div className="flex gap-1">
                {r.atRisk > 0 && (
                  <span className="text-[10px] bg-amber-100 text-amber-700 rounded-full px-1.5 py-0.5 font-medium">
                    {r.atRisk} at risk
                  </span>
                )}
                {r.delayed > 0 && (
                  <span className="text-[10px] bg-red-100 text-red-700 rounded-full px-1.5 py-0.5 font-medium">
                    {r.delayed} delayed
                  </span>
                )}
                {r.atRisk === 0 && r.delayed === 0 && (
                  <span className="text-[10px] bg-green-100 text-green-700 rounded-full px-1.5 py-0.5 font-medium">
                    all ok
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
