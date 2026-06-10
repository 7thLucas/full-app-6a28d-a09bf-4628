import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  MapPin,
  User,
  Calendar,
  AlertTriangle,
  FileX,
  GraduationCap,
  Sparkles,
  Search,
  Download,
  MessageSquare,
  Send,
  CheckCircle,
  XCircle,
  RefreshCw,
  Image,
  FileText,
  ChevronRight,
  X,
} from "lucide-react";
import { PageLayout, PageContent } from "~/components/layout/PageLayout";
import { StatusChip, PriorityChip } from "~/components/ui/StatusChip";
import { ProgressBar } from "~/components/ui/ProgressBar";
import { TaskDetailDrawer } from "~/components/locations/TaskDetailDrawer";
import { ToastProvider, useToast } from "~/components/ui/Toast";
import {
  locations,
  nySohoTasks,
  nySohoEvidence,
  nySohoBlockers,
  nySohoNotes,
  nySohoTeam,
  nySohoReadinessCategories,
  type Task,
  type Evidence,
} from "~/data/mock-data";
import { cn } from "~/lib/cn";

function LocationDetailContent() {
  const { id } = useParams();
  const { showToast } = useToast();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskSearch, setTaskSearch] = useState("");
  const [noteText, setNoteText] = useState("");

  // Find location — default to NY SoHo for richest demo
  const location = locations.find((l) => l.id === id) ?? locations.find((l) => l.id === "new-york-soho")!;
  const isNYSoho = location.id === "new-york-soho";

  // Use NY SoHo data for the detail, generic placeholders for others
  const tasks = isNYSoho ? nySohoTasks : nySohoTasks.map((t) => ({ ...t, locationId: location.id }));
  const evidence = isNYSoho ? nySohoEvidence : [];
  const blockers = isNYSoho ? nySohoBlockers : nySohoBlockers.slice(0, Math.min(location.openBlockers, 4));
  const notes = isNYSoho ? nySohoNotes : [];
  const team = isNYSoho ? nySohoTeam : [];
  const readinessCategories = isNYSoho ? nySohoReadinessCategories : [];

  const filteredTasks = tasks.filter(
    (t) =>
      !taskSearch ||
      t.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
      t.category.toLowerCase().includes(taskSearch.toLowerCase())
  );

  const daysToOpening = location.openingDate
    ? `${location.openingDate} opening`
    : null;

  const handleTaskAction = (action: "approve" | "reject" | "retake" | "comment") => {
    const messages = {
      approve: "Task approved successfully",
      reject: "Task rejected — owner notified",
      retake: "Retake requested — owner notified",
      comment: "Comment added to task",
    };
    showToast(messages[action], action === "approve" ? "success" : action === "reject" ? "error" : "info");
    setSelectedTask(null);
  };

  const handlePostNote = () => {
    if (!noteText.trim()) return;
    showToast("Note posted successfully", "success");
    setNoteText("");
  };

  const readinessStatusStyle = (status: string) => {
    if (status === "Delayed") return "bg-red-100 text-red-700";
    if (status === "At Risk") return "bg-amber-100 text-amber-700";
    if (status === "On Track") return "bg-green-100 text-green-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <PageLayout>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0">
            <Link
              to="/locations"
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shrink-0 mt-0.5"
            >
              <ArrowLeft className="h-4 w-4 text-slate-600" />
            </Link>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-semibold text-slate-900">{location.name}</h1>
                <StatusChip label={location.status} />
                <StatusChip label={location.auditRisk} />
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />{location.city}, {location.state}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />{location.managerName}
                </span>
                <span className="text-slate-300">·</span>
                <span>{location.region} Region</span>
                {location.openingDate && (
                  <>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />Opens {location.openingDate}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => showToast("AI review generated", "success")}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Generate AI Review
            </button>
            <button
              onClick={() => showToast("Update request sent to manager", "info")}
              className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Request Update
            </button>
            <button
              onClick={() => showToast("Location report prepared", "info")}
              className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          </div>
        </div>
      </header>

      <PageContent>
        <div className="flex flex-col gap-6">
          {/* Hero Section */}
          <div className="grid grid-cols-3 gap-4">
            {/* Left: Identity + Warning */}
            <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <StatusChip label={location.type} />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{location.name}</h2>
                <p className="text-sm text-slate-500">{location.city}, {location.state} · {location.region} Region</p>
              </div>
              {(location.status === "Delayed" || location.auditRisk === "High") && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700 leading-relaxed">
                    AI predicts this location is unlikely to pass opening review unless training
                    and evidence gaps are resolved this week.
                  </p>
                </div>
              )}
              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-50">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-slate-400">Open Blockers</span>
                  <span className="text-xl font-bold text-red-700">{location.openBlockers}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-slate-400">Missing Evidence</span>
                  <span className="text-xl font-bold text-amber-700">{location.missingEvidence}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-slate-400">Staff Training</span>
                  <span className={cn("text-xl font-bold", location.staffTraining < 60 ? "text-red-700" : location.staffTraining < 75 ? "text-amber-700" : "text-green-700")}>
                    {location.staffTraining}%
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Readiness Score */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col items-center gap-4">
              <div className="relative flex items-center justify-center w-28 h-28">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={location.readinessScore >= 85 ? "#22c55e" : location.readinessScore >= 65 ? "#3b82f6" : location.readinessScore >= 50 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - location.readinessScore / 100)}`}
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold text-slate-900">{location.readinessScore}%</span>
                  <span className="text-[10px] text-slate-400">Readiness</span>
                </div>
              </div>
              <StatusChip label={location.status} />
              {daysToOpening && (
                <span className="text-xs text-slate-400 text-center">{daysToOpening}</span>
              )}
              <div className="w-full space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{location.completedTasks} completed</span>
                  <span className="text-slate-400">of {location.totalTasks}</span>
                </div>
                <ProgressBar value={(location.completedTasks / location.totalTasks) * 100} height="h-2" />
              </div>
            </div>
          </div>

          {/* AI Location Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">AI Location Summary</h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              {location.name} is currently {location.status.toLowerCase()} because staff training is
              below {location.staffTraining >= 80 ? "target" : `${location.staffTraining}%`},{" "}
              {location.missingEvidence} required evidence items are missing, and {location.openBlockers} blockers
              remain open. The highest-impact fixes are completing front desk certification, uploading
              facility setup evidence, and resolving final audit preparation tasks.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Complete staff training", "Missing evidence", `${location.auditRisk} risk`, "Manager review today"].map((chip) => (
                <span key={chip} className="text-[10px] bg-blue-100 text-blue-700 border border-blue-200 rounded-full px-2.5 py-1 font-medium">
                  {chip}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast("AI action plan created", "success")}
                className="inline-flex items-center gap-1.5 h-8 px-3.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Create Action Plan
              </button>
              <button
                onClick={() => showToast("Message sent to manager", "info")}
                className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-blue-700 bg-white hover:bg-slate-50 border border-blue-200 rounded-lg transition-colors"
              >
                Message Manager
              </button>
              <button
                onClick={() => showToast("Evidence review opened", "info")}
                className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-blue-700 bg-white hover:bg-slate-50 border border-blue-200 rounded-lg transition-colors"
              >
                Review Evidence
              </button>
            </div>
          </div>

          {/* Readiness Breakdown */}
          {readinessCategories.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Readiness Breakdown</h3>
              <div className="grid grid-cols-4 gap-3">
                {readinessCategories.map((cat, i) => (
                  <div key={cat.name} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-800 leading-snug">{cat.name}</span>
                      <span
                        className={cn(
                          "text-[10px] font-medium rounded-full px-2 py-0.5 whitespace-nowrap",
                          readinessStatusStyle(cat.status)
                        )}
                      >
                        {cat.status}
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-slate-500">Completion</span>
                        <span className="text-xs font-bold text-slate-700">{cat.score}%</span>
                      </div>
                      <ProgressBar value={cat.score} height="h-1.5" delay={i * 50} />
                    </div>
                    <span className="text-[10px] text-slate-400">{cat.issues} {cat.issues === 1 ? "issue" : "issues"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Opening Readiness Checklist */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 pt-5 pb-0">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-sm font-semibold text-slate-800">Opening Readiness Checklist</h3>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={taskSearch}
                    onChange={(e) => setTaskSearch(e.target.value)}
                    className="pl-8 pr-3 h-8 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-100">
                    <th className="text-left px-5 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wide">Task</th>
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wide">Category</th>
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wide">Owner</th>
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wide">Due</th>
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wide">Priority</th>
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wide">Status</th>
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wide">Evidence</th>
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wide">AI</th>
                    <th className="px-3 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task, i) => (
                    <tr
                      key={task.id}
                      className="border-b border-slate-50 hover:bg-slate-50 transition-colors group"
                      style={{ animationDelay: `${i * 25}ms` }}
                    >
                      <td className="px-5 py-2.5">
                        <span className="text-xs font-medium text-slate-800">{task.title}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-[10px] text-slate-500">{task.category}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <span className="text-[8px] font-bold text-blue-700">{task.ownerInitials}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap">{task.ownerName.split(" ")[0]}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-[10px] text-slate-500 whitespace-nowrap">{task.dueDate}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <PriorityChip priority={task.priority} />
                      </td>
                      <td className="px-3 py-2.5">
                        <StatusChip label={task.status} />
                      </td>
                      <td className="px-3 py-2.5">
                        {task.evidenceRequired && task.evidenceStatus ? (
                          <StatusChip label={task.evidenceStatus} />
                        ) : (
                          <span className="text-[10px] text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5">
                        {task.aiReviewStatus && task.aiReviewStatus !== "N/A" ? (
                          <StatusChip label={task.aiReviewStatus} />
                        ) : (
                          <span className="text-[10px] text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5">
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="text-[10px] font-medium text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap inline-flex items-center gap-0.5"
                        >
                          Review <ChevronRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Evidence Review */}
          {evidence.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Evidence Review</h3>
              <div className="grid grid-cols-3 gap-4">
                {evidence.map((ev) => (
                  <EvidenceCard
                    key={ev.id}
                    evidence={ev}
                    onAction={(action) => {
                      const msg: Record<string, string> = {
                        approve: "Evidence approved",
                        reject: "Evidence rejected",
                        retake: "Retake requested",
                      };
                      showToast(msg[action] ?? "Action taken", action === "approve" ? "success" : "error");
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Open Blockers */}
          {blockers.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Open Blockers</h3>
              <div className="grid grid-cols-2 gap-3">
                {blockers.map((blocker) => (
                  <div key={blocker.id} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-slate-900 leading-snug">{blocker.title}</h4>
                      <StatusChip label={blocker.severity} />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{blocker.detail}</p>
                    <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                      <p className="text-[10px] text-amber-700 font-medium">Recommended: {blocker.recommendedAction}</p>
                    </div>
                    <span className="text-[10px] text-slate-400">Open for {blocker.daysOpen} day{blocker.daysOpen !== 1 ? "s" : ""}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manager Notes */}
          {notes.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Manager Notes</h3>
              <div className="space-y-4 mb-5">
                {notes.map((note) => (
                  <div key={note.id} className="flex items-start gap-3">
                    <div className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center shrink-0",
                      note.isAI ? "bg-blue-600" : "bg-slate-200"
                    )}>
                      <span className={cn("text-[9px] font-bold", note.isAI ? "text-white" : "text-slate-600")}>
                        {note.authorInitials}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-900">{note.author}</span>
                        <span className="text-[10px] text-slate-400">{note.role}</span>
                        <span className="text-[10px] text-slate-300">·</span>
                        <span className="text-[10px] text-slate-400">{note.timestamp}</span>
                      </div>
                      <p className={cn(
                        "text-xs leading-relaxed",
                        note.isAI ? "text-blue-700 bg-blue-50 border border-blue-100 rounded-lg p-2.5" : "text-slate-600"
                      )}>
                        {note.isAI && <Sparkles className="h-3 w-3 inline mr-1" />}
                        {note.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-white">SM</span>
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => { if (e.key === "Enter") handlePostNote(); }}
                  />
                  <button
                    onClick={handlePostNote}
                    className="h-9 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 text-xs font-medium transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Post Note
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Team Ownership */}
          {team.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Team Ownership</h3>
              <div className="grid grid-cols-5 gap-3">
                {team.map((member) => (
                  <div key={member.id} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col items-center gap-2.5 text-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-700">{member.initials}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{member.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{member.role}</p>
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-400">{member.completedTasks}/{member.totalTasks}</span>
                        <StatusChip label={member.status} />
                      </div>
                      <ProgressBar value={(member.completedTasks / member.totalTasks) * 100} height="h-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PageContent>

      {/* Task Detail Drawer */}
      <TaskDetailDrawer
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onApprove={() => handleTaskAction("approve")}
        onReject={() => handleTaskAction("reject")}
        onRequestRetake={() => handleTaskAction("retake")}
        onAddComment={() => handleTaskAction("comment")}
      />
    </PageLayout>
  );
}

// ─── Evidence Card ─────────────────────────────────────────────────────────────

function EvidenceCard({
  evidence: ev,
  onAction,
}: {
  evidence: Evidence;
  onAction: (action: string) => void;
}) {
  const typeIcon = ev.type === "Photo" ? Image : ev.type === "Video" ? Image : FileText;
  const TypeIcon = typeIcon;

  const confidenceColor =
    (ev.aiConfidence ?? 0) >= 80
      ? "text-green-700"
      : (ev.aiConfidence ?? 0) >= 60
      ? "text-amber-700"
      : "text-red-700";

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3">
      {/* File type + thumbnail placeholder */}
      <div className="bg-slate-50 border border-slate-100 rounded-lg h-24 flex flex-col items-center justify-center gap-1.5">
        <TypeIcon className="h-8 w-8 text-slate-300" />
        <span className="text-[10px] text-slate-400">{ev.type}</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2">{ev.taskTitle}</p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-400">{ev.submittedBy}</span>
          <span className="text-[10px] text-slate-400">{ev.submittedAt}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <StatusChip label={ev.status} />
          {ev.aiConfidence !== undefined && (
            <span className={cn("text-[10px] font-bold", confidenceColor)}>
              AI: {ev.aiConfidence}%
            </span>
          )}
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">{ev.aiNote}</p>
      </div>

      {/* Action */}
      {ev.status === "Needs Manager Review" && (
        <div className="flex gap-1.5">
          <button
            onClick={() => onAction("approve")}
            className="flex-1 h-7 text-[10px] font-semibold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors inline-flex items-center justify-center gap-1"
          >
            <CheckCircle className="h-3 w-3" /> Approve
          </button>
          <button
            onClick={() => onAction("reject")}
            className="flex-1 h-7 text-[10px] font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors inline-flex items-center justify-center gap-1"
          >
            <XCircle className="h-3 w-3" /> Reject
          </button>
        </div>
      )}
      {(ev.status === "Needs Retake" || ev.status === "Needs Review") && (
        <button
          onClick={() => onAction("retake")}
          className="h-7 text-[10px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors inline-flex items-center justify-center gap-1"
        >
          <RefreshCw className="h-3 w-3" /> Request Retake
        </button>
      )}
      {ev.status === "AI Reviewing" && (
        <button
          className="h-7 text-[10px] font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg inline-flex items-center justify-center gap-1 cursor-default"
          disabled
        >
          <Sparkles className="h-3 w-3" /> AI Reviewing...
        </button>
      )}
    </div>
  );
}

export default function LocationDetailPage() {
  return (
    <ToastProvider>
      <LocationDetailContent />
    </ToastProvider>
  );
}
