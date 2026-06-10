import { X, Image, Sparkles, CheckCircle, XCircle, RefreshCw, MessageSquare } from "lucide-react";
import { StatusChip, PriorityChip } from "~/components/ui/StatusChip";
import type { Task } from "~/data/mock-data";

interface TaskDetailDrawerProps {
  task: Task | null;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onRequestRetake: () => void;
  onAddComment: () => void;
}

export function TaskDetailDrawer({
  task,
  onClose,
  onApprove,
  onReject,
  onRequestRetake,
  onAddComment,
}: TaskDetailDrawerProps) {
  if (!task) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[420px] bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 p-5 border-b border-slate-100">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-semibold text-slate-900 leading-snug">{task.title}</h2>
            <p className="text-xs text-slate-400">{task.category}</p>
          </div>
          <button
            onClick={onClose}
            className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Meta */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">Status</span>
              <StatusChip label={task.status} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">Priority</span>
              <PriorityChip priority={task.priority} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">Owner</span>
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-blue-700">{task.ownerInitials}</span>
                </div>
                <span className="text-xs text-slate-700">{task.ownerName}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">Due Date</span>
              <span className="text-xs text-slate-700">{task.dueDate}</span>
            </div>
          </div>

          {/* Evidence Preview */}
          {task.evidenceRequired && (
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">Evidence</span>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center gap-2 h-32">
                <Image className="h-8 w-8 text-slate-300" />
                <div className="text-center">
                  <p className="text-xs text-slate-500 font-medium">
                    {task.evidenceStatus === "Not Submitted" ? "No evidence submitted" : "Evidence submitted"}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {task.evidenceStatus ?? "—"}
                  </p>
                </div>
              </div>
              {task.evidenceStatus && task.evidenceStatus !== "Not Submitted" && (
                <StatusChip label={task.evidenceStatus} />
              )}
            </div>
          )}

          {/* AI Note */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-2">
            <Sparkles className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-blue-700 mb-1">AI Review</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {task.aiReviewStatus === "Passed"
                  ? "This task meets all compliance standards. Evidence quality is satisfactory."
                  : task.aiReviewStatus === "Flagged"
                  ? "AI has flagged this task. Evidence is missing or incomplete — manager review required before approval."
                  : task.aiReviewStatus === "Pending"
                  ? "AI is currently reviewing submitted evidence. Results will be available shortly."
                  : "No AI review required for this task."}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-5 border-t border-slate-100 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onApprove}
              className="inline-flex items-center justify-center gap-1.5 h-9 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              Approve
            </button>
            <button
              onClick={onReject}
              className="inline-flex items-center justify-center gap-1.5 h-9 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <XCircle className="h-3.5 w-3.5" />
              Reject
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onRequestRetake}
              className="inline-flex items-center justify-center gap-1.5 h-9 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Request Retake
            </button>
            <button
              onClick={onAddComment}
              className="inline-flex items-center justify-center gap-1.5 h-9 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
