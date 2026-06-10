import { FileVideo, Mic } from "lucide-react";
import { submissions } from "~/lib/coachiq-data";
import { StatusChip, ScoreBadge } from "~/components/ui/StatusChip";
import { cn } from "~/lib/cn";

interface SubmissionQueueProps {
  onRequestResubmission: (name: string) => void;
}

function getAIResultColors(result: string) {
  switch (result) {
    case "Strong":
      return "text-green-700 bg-green-50";
    case "Watchlist":
      return "text-amber-700 bg-amber-50";
    case "Needs Coaching":
      return "text-orange-700 bg-orange-50";
    case "Not Cleared":
      return "text-red-700 bg-red-50";
    default:
      return "text-slate-600 bg-slate-50";
  }
}

export function SubmissionQueue({ onRequestResubmission }: SubmissionQueueProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Submission Queue</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Recent staff recordings and roleplays awaiting review or action
            </p>
          </div>
          <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200">
            8 overdue
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Staff</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Studio</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Format</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Score</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">AI Result</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, i) => (
              <tr
                key={sub.id}
                className={cn(
                  "border-b border-slate-50 hover:bg-slate-50/60 transition-colors",
                  i % 2 === 1 ? "bg-slate-50/30" : ""
                )}
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-slate-600">{sub.staffInitials}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{sub.staffName}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-sm text-slate-600">{sub.studio}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-sm text-slate-600">{sub.role}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-xs text-slate-600">{sub.submissionType}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    {sub.format === "Video" ? (
                      <FileVideo className="h-3.5 w-3.5 text-blue-500" />
                    ) : (
                      <Mic className="h-3.5 w-3.5 text-indigo-500" />
                    )}
                    <span className="text-xs text-slate-600">{sub.format}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <StatusChip label={sub.status} />
                </td>
                <td className="px-4 py-3.5 text-center">
                  <ScoreBadge score={sub.score} />
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-semibold",
                      getAIResultColors(sub.aiResult)
                    )}
                  >
                    {sub.aiResult}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right">
                  <button
                    onClick={() => onRequestResubmission(sub.staffName)}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {sub.status === "Approved" ? "View" : "Review"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
