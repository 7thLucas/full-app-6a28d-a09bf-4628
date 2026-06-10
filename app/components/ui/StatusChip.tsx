import { cn } from "~/lib/cn";

const variantMap: Record<string, string> = {
  // Studio quality status
  "Strong": "bg-green-100 text-green-700 border-green-200",
  "On Track": "bg-teal-100 text-teal-700 border-teal-200",
  "Watchlist": "bg-amber-100 text-amber-700 border-amber-200",
  "At Risk": "bg-red-100 text-red-700 border-red-200",
  "Launch Gate": "bg-purple-100 text-purple-700 border-purple-200",

  // Clearance / AI result
  "Cleared": "bg-green-100 text-green-700 border-green-200",
  "Needs Coaching": "bg-amber-100 text-amber-700 border-amber-200",
  "Not Cleared": "bg-red-100 text-red-700 border-red-200",
  "Needs Second Roleplay": "bg-orange-100 text-orange-700 border-orange-200",

  // Submission status
  "Uploaded": "bg-blue-100 text-blue-700 border-blue-200",
  "AI Processing": "bg-blue-100 text-blue-700 border-blue-200",
  "AI Reviewed": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Manager Review": "bg-amber-100 text-amber-700 border-amber-200",
  "Approved": "bg-green-100 text-green-700 border-green-200",
  "Needs Resubmission": "bg-red-100 text-red-700 border-red-200",

  // Trend
  "Improving": "bg-green-100 text-green-700 border-green-200",
  "Stable": "bg-slate-100 text-slate-600 border-slate-200",
  "Declining": "bg-red-100 text-red-700 border-red-200",
  "New": "bg-blue-100 text-blue-700 border-blue-200",

  // Step status
  "Complete": "bg-green-100 text-green-700 border-green-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  "Pending": "bg-slate-100 text-slate-500 border-slate-200",

  // Launch blocker
  "Not Approved": "bg-red-100 text-red-700 border-red-200",

  // Generic
  "High": "bg-red-100 text-red-700 border-red-200",
  "Medium": "bg-amber-100 text-amber-700 border-amber-200",
  "Low": "bg-slate-100 text-slate-500 border-slate-200",
};

interface StatusChipProps {
  label: string;
  className?: string;
  size?: "sm" | "xs";
}

export function StatusChip({ label, className, size = "xs" }: StatusChipProps) {
  const colors = variantMap[label] ?? "bg-slate-100 text-slate-500 border-slate-200";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium whitespace-nowrap",
        size === "xs" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        colors,
        className
      )}
    >
      {label}
    </span>
  );
}

interface TrendChipProps {
  trend: "Improving" | "Stable" | "Declining" | "New";
  className?: string;
}

export function TrendChip({ trend, className }: TrendChipProps) {
  const colorMap: Record<string, string> = {
    Improving: "bg-green-100 text-green-700 border-green-200",
    Stable: "bg-slate-100 text-slate-600 border-slate-200",
    Declining: "bg-red-100 text-red-700 border-red-200",
    New: "bg-blue-100 text-blue-700 border-blue-200",
  };
  const arrows: Record<string, string> = {
    Improving: "↑",
    Stable: "→",
    Declining: "↓",
    New: "★",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold whitespace-nowrap",
        colorMap[trend],
        className
      )}
    >
      <span>{arrows[trend]}</span>
      {trend}
    </span>
  );
}

interface ScoreBadgeProps {
  score: number;
  className?: string;
  size?: "sm" | "md";
}

export function ScoreBadge({ score, className, size = "sm" }: ScoreBadgeProps) {
  let colors = "bg-slate-100 text-slate-600";
  if (score >= 9.0) colors = "bg-green-100 text-green-700";
  else if (score >= 8.0) colors = "bg-teal-100 text-teal-700";
  else if (score >= 7.0) colors = "bg-amber-100 text-amber-700";
  else colors = "bg-red-100 text-red-700";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg font-bold tabular-nums",
        size === "sm" ? "px-2 py-0.5 text-sm" : "px-3 py-1 text-base",
        colors,
        className
      )}
    >
      {score.toFixed(1)}
    </span>
  );
}

interface PriorityChipProps {
  priority: "Urgent" | "High" | "Medium" | "Low";
  className?: string;
}

export function PriorityChip({ priority, className }: PriorityChipProps) {
  const colorMap: Record<string, string> = {
    Urgent: "bg-red-100 text-red-800 border-red-200",
    High: "bg-orange-100 text-orange-700 border-orange-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Low: "bg-slate-100 text-slate-500 border-slate-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold whitespace-nowrap",
        colorMap[priority],
        className
      )}
    >
      {priority}
    </span>
  );
}
