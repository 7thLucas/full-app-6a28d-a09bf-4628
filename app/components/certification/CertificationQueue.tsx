import { Play, Eye, Upload, RefreshCw, Loader2 } from "lucide-react";
import { cn } from "~/lib/cn";
import { StatusChip } from "~/components/ui/StatusChip";
import type { CertificationResult } from "~/services/certification.service";
import { demoJennaWhitePublic, demoMayaStonePublic, demoSamanthaReedPublic } from "~/components/certification/demo-data";

type AIStatus =
  | "AI Reviewed"
  | "Awaiting AI Review"
  | "AI Processing"
  | "Pending Submission";

type CertStatus =
  | "Cleared"
  | "Needs Resubmission"
  | "Not Cleared"
  | "Pending"
  | "Manager Review"
  | "In Review";

type SchedulingStatus = "Unlocked" | "Blocked";

interface QueueRow {
  id: string;
  name: string;
  studio: string;
  classFormat: string;
  inputType: string;
  submission: string;
  aiStatus: AIStatus;
  score: string;
  certStatus: CertStatus;
  scheduling: SchedulingStatus;
  demoData?: CertificationResult;
}

const rows: QueueRow[] = [
  {
    id: "1",
    name: "Jenna White",
    studio: "Denver Launch",
    classFormat: "Pilates",
    inputType: "Video",
    submission: "Cert segment",
    aiStatus: "AI Reviewed",
    score: "5.9/10",
    certStatus: "Not Cleared",
    scheduling: "Blocked",
    demoData: demoJennaWhitePublic,
  },
  {
    id: "2",
    name: "Maya Stone",
    studio: "Denver Launch",
    classFormat: "HIIT",
    inputType: "Video",
    submission: "Role-play video",
    aiStatus: "AI Reviewed",
    score: "7.4/10",
    certStatus: "Needs Resubmission",
    scheduling: "Blocked",
    demoData: demoMayaStonePublic,
  },
  {
    id: "3",
    name: "Leo Grant",
    studio: "Denver Launch",
    classFormat: "Strength",
    inputType: "Pending",
    submission: "Not submitted",
    aiStatus: "Pending Submission",
    score: "N/A",
    certStatus: "Pending",
    scheduling: "Blocked",
  },
  {
    id: "4",
    name: "Brooke Evans",
    studio: "Denver Launch",
    classFormat: "Yoga",
    inputType: "Video",
    submission: "Cert segment",
    aiStatus: "Awaiting AI Review",
    score: "Pending",
    certStatus: "Manager Review",
    scheduling: "Blocked",
  },
  {
    id: "5",
    name: "Taylor Brooks",
    studio: "Austin",
    classFormat: "HIIT",
    inputType: "Transcript",
    submission: "Transcript review",
    aiStatus: "AI Reviewed",
    score: "8.3/10",
    certStatus: "Cleared",
    scheduling: "Unlocked",
  },
  {
    id: "6",
    name: "Samantha Reed",
    studio: "Miami",
    classFormat: "Pilates",
    inputType: "Video",
    submission: "Cert segment",
    aiStatus: "AI Reviewed",
    score: "8.7/10",
    certStatus: "Cleared",
    scheduling: "Unlocked",
    demoData: demoSamanthaReedPublic,
  },
  {
    id: "7",
    name: "Nora Blake",
    studio: "SoHo",
    classFormat: "Yoga",
    inputType: "Audio",
    submission: "Audio sample",
    aiStatus: "AI Processing",
    score: "Analyzing",
    certStatus: "In Review",
    scheduling: "Blocked",
  },
  {
    id: "8",
    name: "Miles Carter",
    studio: "West Loop",
    classFormat: "Recovery",
    inputType: "Transcript",
    submission: "Transcript review",
    aiStatus: "AI Reviewed",
    score: "8.1/10",
    certStatus: "Cleared",
    scheduling: "Unlocked",
  },
];

function ScoreCell({ score, certStatus }: { score: string; certStatus: CertStatus }) {
  if (score === "N/A" || score === "Pending") {
    return <span className="text-slate-400 text-sm">{score}</span>;
  }
  if (score === "Analyzing") {
    return (
      <span className="inline-flex items-center gap-1 text-blue-600 text-sm">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Analyzing
      </span>
    );
  }
  const numScore = parseFloat(score);
  const colorClass =
    certStatus === "Cleared"
      ? "text-green-700 font-semibold"
      : certStatus === "Needs Resubmission"
      ? "text-amber-700 font-semibold"
      : "text-red-700 font-semibold";
  return <span className={cn("text-sm tabular-nums", colorClass)}>{score}</span>;
}

function CertStatusCell({ status }: { status: CertStatus }) {
  const colorMap: Record<CertStatus, string> = {
    Cleared: "bg-green-100 text-green-700 border-green-200",
    "Needs Resubmission": "bg-amber-100 text-amber-700 border-amber-200",
    "Not Cleared": "bg-red-100 text-red-700 border-red-200",
    Pending: "bg-slate-100 text-slate-500 border-slate-200",
    "Manager Review": "bg-blue-100 text-blue-700 border-blue-200",
    "In Review": "bg-blue-100 text-blue-700 border-blue-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        colorMap[status]
      )}
    >
      {status}
    </span>
  );
}

function AIStatusCell({ status }: { status: AIStatus }) {
  if (status === "AI Processing") {
    return (
      <span className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-medium">
        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        AI Processing
      </span>
    );
  }
  const colorMap: Record<AIStatus, string> = {
    "AI Reviewed": "text-indigo-700",
    "Awaiting AI Review": "text-amber-600",
    "AI Processing": "text-blue-600",
    "Pending Submission": "text-slate-400",
  };
  return <span className={cn("text-xs font-medium", colorMap[status])}>{status}</span>;
}

function SchedulingCell({ status }: { status: SchedulingStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        status === "Unlocked"
          ? "bg-green-100 text-green-700 border-green-200"
          : "bg-red-100 text-red-700 border-red-200"
      )}
    >
      {status}
    </span>
  );
}

interface ActionButtonProps {
  row: QueueRow;
  onStartReview: () => void;
  onViewResult: (data: CertificationResult) => void;
}

function ActionButton({ row, onStartReview, onViewResult }: ActionButtonProps) {
  if (row.aiStatus === "Pending Submission") {
    return (
      <button
        onClick={onStartReview}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-colors"
      >
        <Upload className="h-3 w-3" />
        Request Upload
      </button>
    );
  }
  if (row.aiStatus === "Awaiting AI Review") {
    return (
      <button
        onClick={onStartReview}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-colors"
      >
        <Play className="h-3 w-3" />
        Start AI Review
      </button>
    );
  }
  if (row.aiStatus === "AI Processing") {
    return (
      <button
        disabled
        className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-500 border border-blue-100 bg-blue-50/50 px-2.5 py-1.5 rounded-lg opacity-70 cursor-not-allowed"
      >
        <Loader2 className="h-3 w-3 animate-spin" />
        Watch AI Review
      </button>
    );
  }
  if (row.certStatus === "Cleared") {
    return (
      <button
        onClick={() => row.demoData && onViewResult(row.demoData)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 border border-green-200 bg-green-50 hover:bg-green-100 px-2.5 py-1.5 rounded-lg transition-colors"
      >
        <Award className="h-3 w-3" />
        View Badge
      </button>
    );
  }
  return (
    <button
      onClick={() => row.demoData && onViewResult(row.demoData)}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-colors"
    >
      <Eye className="h-3 w-3" />
      Review Result
    </button>
  );
}

function Award({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

interface CertificationQueueProps {
  onStartReview: () => void;
  onViewResult: (data: CertificationResult) => void;
}

export function CertificationQueue({ onStartReview, onViewResult }: CertificationQueueProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Instructor Certification Queue</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            8 new instructors across all BloomFit locations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Denver Launch: 4 instructors pending</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Instructor</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Studio</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Format</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Input</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Submission</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">AI Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Score</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Certification</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Scheduling</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  "hover:bg-slate-50/50 transition-colors",
                  row.certStatus === "Not Cleared" && "bg-red-50/20",
                  row.certStatus === "Needs Resubmission" && "bg-amber-50/20"
                )}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-slate-600">
                        {row.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <span className="font-medium text-slate-900 text-sm">{row.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 text-sm">{row.studio}</td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                    {row.classFormat}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{row.inputType}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{row.submission}</td>
                <td className="px-4 py-3">
                  <AIStatusCell status={row.aiStatus} />
                </td>
                <td className="px-4 py-3">
                  <ScoreCell score={row.score} certStatus={row.certStatus} />
                </td>
                <td className="px-4 py-3">
                  <CertStatusCell status={row.certStatus} />
                </td>
                <td className="px-4 py-3">
                  <SchedulingCell status={row.scheduling} />
                </td>
                <td className="px-4 py-3">
                  <ActionButton
                    row={row}
                    onStartReview={onStartReview}
                    onViewResult={onViewResult}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
