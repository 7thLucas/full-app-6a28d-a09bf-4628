import { cn } from "~/lib/cn";
import type { LocationStatus, AuditRisk, TaskStatus, EvidenceStatus, BlockerSeverity } from "~/data/mock-data";

type ChipVariant =
  | LocationStatus
  | AuditRisk
  | TaskStatus
  | EvidenceStatus
  | BlockerSeverity
  | "Needs Review"
  | "New Opening"
  | "Existing"
  | string;

const variantMap: Record<string, string> = {
  // Location status
  "On Track": "bg-green-100 text-green-700 border-green-200",
  "At Risk": "bg-amber-100 text-amber-700 border-amber-200",
  "Delayed": "bg-red-100 text-red-700 border-red-200",
  "Ready for Review": "bg-blue-100 text-blue-700 border-blue-200",

  // Audit risk
  "Low": "bg-green-100 text-green-700 border-green-200",
  "Medium": "bg-amber-100 text-amber-700 border-amber-200",
  "High": "bg-red-100 text-red-700 border-red-200",

  // Task status
  "Not Started": "bg-slate-100 text-slate-500 border-slate-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  "Submitted": "bg-blue-100 text-blue-700 border-blue-200",
  "Approved": "bg-green-100 text-green-700 border-green-200",
  "Rejected": "bg-red-100 text-red-700 border-red-200",
  "Overdue": "bg-red-100 text-red-700 border-red-200",
  "Blocked": "bg-red-200 text-red-800 border-red-300",

  // Evidence status
  "Not Submitted": "bg-slate-100 text-slate-500 border-slate-200",
  "Uploaded": "bg-blue-100 text-blue-700 border-blue-200",
  "Needs Review": "bg-amber-100 text-amber-700 border-amber-200",
  "AI Reviewing": "bg-blue-100 text-blue-700 border-blue-200",
  "Needs Manager Review": "bg-amber-100 text-amber-700 border-amber-200",
  "Needs Retake": "bg-red-100 text-red-700 border-red-200",

  // Blocker severity
  "Critical": "bg-red-200 text-red-800 border-red-300",

  // Location type
  "New Opening": "bg-blue-100 text-blue-700 border-blue-200",
  "Existing": "bg-slate-100 text-slate-600 border-slate-200",

  // AI review
  "Passed": "bg-green-100 text-green-700 border-green-200",
  "Flagged": "bg-red-100 text-red-700 border-red-200",
  "Pending": "bg-amber-100 text-amber-700 border-amber-200",
  "N/A": "bg-slate-100 text-slate-400 border-slate-200",

  // Team member status
  "Behind": "bg-red-100 text-red-700 border-red-200",
};

interface StatusChipProps {
  label: ChipVariant;
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
