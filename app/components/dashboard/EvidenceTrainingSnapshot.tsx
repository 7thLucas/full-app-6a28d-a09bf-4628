import { ProgressBar } from "~/components/ui/ProgressBar";

const evidenceBreakdown = [
  { label: "Photos", value: 68 },
  { label: "Videos", value: 42 },
  { label: "Documents", value: 81 },
  { label: "Training Proof", value: 59 },
];

const trainingBreakdown = [
  { label: "Front Desk", value: 71 },
  { label: "Coaches", value: 78 },
  { label: "Studio Managers", value: 86 },
  { label: "Cleaning Team", value: 64 },
];

export function EvidenceTrainingSnapshot() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Evidence */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Evidence Snapshot</h3>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: "Missing", value: 52, color: "text-red-700" },
            { label: "Uploaded Today", value: 31, color: "text-green-700" },
            { label: "Awaiting Review", value: 18, color: "text-amber-700" },
            { label: "Rejected", value: 7, color: "text-red-600" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-[10px] text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2.5">
          {evidenceBreakdown.map((item, i) => (
            <div key={item.label} className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-xs text-slate-600">{item.label}</span>
                <span className="text-xs font-semibold text-slate-700">{item.value}%</span>
              </div>
              <ProgressBar value={item.value} height="h-1.5" delay={i * 80} />
            </div>
          ))}
        </div>
      </div>

      {/* Training */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Training Snapshot</h3>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: "Avg Completion", value: "74%", color: "text-amber-700" },
            { label: "Below Target", value: 5, color: "text-red-700" },
            { label: "Staff Incomplete", value: 28, color: "text-amber-600" },
            { label: "Overdue Certs", value: 9, color: "text-red-600" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-[10px] text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2.5">
          {trainingBreakdown.map((item, i) => (
            <div key={item.label} className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-xs text-slate-600">{item.label}</span>
                <span className="text-xs font-semibold text-slate-700">{item.value}%</span>
              </div>
              <ProgressBar value={item.value} height="h-1.5" delay={i * 80} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
