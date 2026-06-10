import { useState } from "react";
import {
  ArrowLeft,
  Check,
  AlertTriangle,
  XCircle,
  Copy,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Shield,
  Award,
  Zap,
  BookOpen,
  TrendingUp,
  MessageSquare,
  RotateCcw,
  UserPlus,
} from "lucide-react";
import { cn } from "~/lib/cn";
import { PriorityChip } from "~/components/ui/StatusChip";
import type { CertificationResult as CertResultType } from "~/services/certification.service";

function getStatusColors(status: string) {
  switch (status) {
    case "Cleared":
      return { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", badge: "bg-green-100 text-green-700 border-green-200", score: "text-green-700" };
    case "Needs Resubmission":
      return { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", badge: "bg-amber-100 text-amber-700 border-amber-200", score: "text-amber-700" };
    case "Not Cleared":
      return { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", badge: "bg-red-100 text-red-700 border-red-200", score: "text-red-700" };
    default:
      return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700", badge: "bg-slate-100 text-slate-600 border-slate-200", score: "text-slate-700" };
  }
}

function getCriterionStatusColor(status: string) {
  switch (status) {
    case "Excellent": return "bg-green-100 text-green-700 border-green-200";
    case "Meets Standard": return "bg-teal-100 text-teal-700 border-teal-200";
    case "Needs Coaching": return "bg-amber-100 text-amber-700 border-amber-200";
    case "Below Standard": return "bg-red-100 text-red-700 border-red-200";
    default: return "bg-slate-100 text-slate-500 border-slate-200";
  }
}

function getScoreColor(score: number) {
  if (score >= 8.5) return "text-green-700";
  if (score >= 8.0) return "text-teal-700";
  if (score >= 7.5) return "text-amber-600";
  return "text-red-600";
}

interface CriterionCardProps {
  criterion: CertResultType["criterionScores"][0];
  threshold: number;
}

function CriterionCard({ criterion, threshold }: CriterionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isBelowThreshold = criterion.score < threshold;

  return (
    <div className={cn(
      "rounded-xl border overflow-hidden",
      isBelowThreshold ? "border-amber-200" : "border-slate-200"
    )}>
      {/* Card header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "w-full px-4 py-3 flex items-center justify-between text-left transition-colors",
          isBelowThreshold ? "bg-amber-50/50 hover:bg-amber-50" : "bg-white hover:bg-slate-50"
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-900">{criterion.criterionName}</span>
          <span className={cn(
            "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
            getCriterionStatusColor(criterion.status)
          )}>
            {criterion.status}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn("text-lg font-bold tabular-nums", getScoreColor(criterion.score))}>
            {criterion.score.toFixed(1)}/10
          </span>
          {isBelowThreshold && (
            <span className="text-[10px] text-amber-600 font-medium bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded">
              Below 7.5
            </span>
          )}
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 divide-y divide-slate-100">
          {/* Subcheck scores */}
          <div className="p-4 space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Subcheck Breakdown</h4>
            {criterion.subcheckScores.map((sub, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-700">{sub.subcheck}</span>
                  <span className={cn(
                    "text-xs font-bold tabular-nums",
                    sub.score === 2 ? "text-green-700" : sub.score === 1 ? "text-amber-600" : "text-red-600"
                  )}>
                    {sub.score}/{sub.maxScore}
                  </span>
                </div>
                {sub.evidence && sub.evidence !== "Not observed in transcript." && (
                  <p className="text-[11px] text-slate-500 italic pl-3 border-l-2 border-slate-200">
                    "{sub.evidence}"
                  </p>
                )}
                {sub.evidence === "Not observed in transcript." && (
                  <p className="text-[11px] text-red-400 pl-3">Not observed in transcript.</p>
                )}
                <p className="text-[11px] text-slate-500 leading-relaxed">{sub.explanation}</p>
              </div>
            ))}
          </div>

          {/* What AI Detected */}
          <div className="p-4">
            <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
              What CoachIQ Detected
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">{criterion.whatAIDetected}</p>

            {criterion.transcriptEvidence?.length > 0 && (
              <div className="mt-3 space-y-1">
                {criterion.transcriptEvidence.map((quote, i) => (
                  <p key={i} className="text-[11px] italic text-slate-500 pl-3 border-l-2 border-blue-200">
                    {quote}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Coaching recommendation */}
          {criterion.coachingRecommendation && (
            <div className="p-4 bg-amber-50/30">
              <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1.5">
                Coaching Recommendation
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">{criterion.coachingRecommendation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface CertificationResultProps {
  result: CertResultType | null;
  onBack: () => void;
  onNewReview: () => void;
}

export function CertificationResult({ result, onBack, onNewReview }: CertificationResultProps) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopyFeedback = () => {
    if (result.instructorFeedback) {
      navigator.clipboard.writeText(result.instructorFeedback).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Error state
  if (result.error && result.overallScore === 0 && result.readinessStatus !== "Insufficient Evidence") {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to overview
        </button>
        <div className="bg-white rounded-xl border border-red-200 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-red-800">Analysis Could Not Be Completed</h3>
              <p className="text-sm text-red-700 mt-2 leading-relaxed">{result.error}</p>
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={onNewReview}
                  className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={onBack}
                  className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Back to Overview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Insufficient evidence state
  if (result.readinessStatus === "Insufficient Evidence") {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to overview
        </button>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 text-slate-500" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-800">Insufficient Evidence for Scoring</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {result.error || "The submission did not contain enough material for a confident certification score."}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Please provide a longer class segment or transcript — at least 150 words of instruction content are required.
              </p>
              <button
                onClick={onNewReview}
                className="mt-4 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit New Review
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statusColors = getStatusColors(result.readinessStatus);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to overview
        </button>
        <button
          onClick={onNewReview}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          New Review
        </button>
      </div>

      {/* Result header banner */}
      <div className={cn("rounded-xl border p-6 shadow-sm", statusColors.bg, statusColors.border)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Demo label */}
            {result.reviewMode === "demo_sample" && (
              <span className="shrink-0 inline-flex items-center rounded-full border border-amber-300 bg-amber-100 text-amber-800 px-2.5 py-0.5 text-xs font-bold">
                DEMO SAMPLE
              </span>
            )}
          </div>
        </div>

        <div className="flex items-start gap-6 mt-2">
          {/* Score */}
          <div className="text-center">
            <div className={cn("text-5xl font-black tabular-nums leading-none", statusColors.score)}>
              {result.overallScore.toFixed(1)}
            </div>
            <div className="text-xs text-slate-500 mt-1">Overall Score</div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-xl font-bold text-slate-900">{result.instructorName}</h2>
              <span className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-1 text-sm font-semibold",
                statusColors.badge
              )}>
                {result.readinessStatus === "Cleared" && <Check className="h-3.5 w-3.5 mr-1" />}
                {result.readinessStatus === "Not Cleared" && <XCircle className="h-3.5 w-3.5 mr-1" />}
                {result.readinessStatus === "Needs Resubmission" && <AlertTriangle className="h-3.5 w-3.5 mr-1" />}
                {result.readinessStatus}
              </span>
              <span className={cn(
                "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                result.schedulingStatus === "Unlocked"
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-red-100 text-red-700 border-red-200"
              )}>
                Scheduling: {result.schedulingStatus}
              </span>
            </div>
            <p className="text-sm text-slate-600">
              {result.studioName} · {result.classFormat} · {result.submissionType}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Rubric: {result.rubricName} · Threshold: {result.readinessThreshold}/10 overall · {result.minimumCriterionThreshold}/10 per criterion
            </p>
          </div>
        </div>

        {/* Confidence row */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-current/10">
          <span className="text-xs text-slate-500">
            Confidence: <span className="font-semibold text-slate-700">{result.confidenceLabel}</span>
          </span>
          <div className="h-1.5 w-24 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${result.confidenceScore}%` }}
            />
          </div>
          <span className="text-xs font-medium text-slate-600">{result.confidenceScore}%</span>
          <span className="text-xs text-slate-400">· Analysis: {result.analysisBasis?.replace(/_/g, " ")}</span>
        </div>
      </div>

      {/* AI Summary */}
      {result.transcriptSummary && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-slate-800">CoachIQ AI Summary</h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{result.transcriptSummary}</p>
        </div>
      )}

      {/* Criterion Breakdown */}
      {result.criterionScores?.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-500" />
            Criterion Breakdown
          </h3>
          <div className="space-y-2">
            {result.criterionScores.map((criterion) => (
              <CriterionCard
                key={criterion.criterionName}
                criterion={criterion}
                threshold={result.minimumCriterionThreshold}
              />
            ))}
          </div>
        </div>
      )}

      {/* Detected Moments */}
      {result.detectedMoments?.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Detected Moments</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {result.detectedMoments.map((moment, i) => (
              <div
                key={i}
                className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 min-w-[200px] max-w-[260px]"
              >
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                  {moment.momentType}
                </span>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">{moment.timestampOrLine}</p>
                <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">{moment.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths + Improvements */}
      {(result.strengths?.length > 0 || result.improvements?.length > 0) && (
        <div className="grid grid-cols-2 gap-4">
          {result.strengths?.length > 0 && (
            <div className="bg-white rounded-xl border border-green-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <h3 className="text-sm font-semibold text-slate-800">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.improvements?.length > 0 && (
            <div className="bg-white rounded-xl border border-amber-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <h3 className="text-sm font-semibold text-slate-800">Areas to Improve</h3>
              </div>
              <ul className="space-y-2">
                {result.improvements.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 shrink-0 text-xs mt-0.5">→</span>
                    <span className="text-xs text-slate-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Specific Cue to Try */}
      {result.specificCueToTry && (
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-blue-800">Specific Cue to Try</h3>
          </div>
          <p className="text-sm text-blue-900 leading-relaxed italic">"{result.specificCueToTry}"</p>
        </div>
      )}

      {/* Manager Summary */}
      {result.managerSummary && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-2">Manager Summary</h3>
          <p className="text-sm text-slate-700 leading-relaxed">{result.managerSummary}</p>
        </div>
      )}

      {/* Instructor Feedback */}
      {result.instructorFeedback && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-800">Instructor Feedback</h3>
            <button
              onClick={handleCopyFeedback}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 border border-slate-200 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="bg-slate-50 rounded-lg border border-slate-100 p-4">
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {result.instructorFeedback}
            </p>
          </div>
        </div>
      )}

      {/* Coaching Plan */}
      {result.recommendedCoachingPlan?.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Recommended Coaching Plan</h3>
          <div className="space-y-3">
            {result.recommendedCoachingPlan.map((plan, i) => (
              <div key={i} className="rounded-xl border border-slate-100 p-4 bg-slate-50/50">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-slate-800">{plan.title}</h4>
                  <PriorityChip priority={plan.priority} />
                </div>
                <p className="text-xs text-slate-600 mb-2">{plan.reason}</p>
                <div className="bg-white rounded-lg border border-slate-100 p-3">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    Suggested Drill
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">{plan.suggestedDrill}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certification Badge */}
      {result.certificationBadge?.issued && (
        <div className="bg-green-50 rounded-xl border-2 border-green-300 p-6 shadow-sm text-center">
          <div className="flex justify-center mb-3">
            <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-black text-green-800">{result.certificationBadge.title}</h3>
          <p className="text-sm text-green-700 mt-1">{result.instructorName}</p>
          <p className="text-sm font-medium text-green-700">{result.studioName} · {result.classFormat}</p>
          <p className="text-xs text-green-600 mt-2">
            Valid through: {result.certificationBadge.validThrough ?? "—"}
          </p>
          <p className="text-xs text-green-500 mt-1">BloomFit Instructor Certification Standard</p>
        </div>
      )}

      {/* Resubmission block */}
      {result.resubmissionRequired && result.resubmissionInstructions && (
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <RotateCcw className="h-4 w-4 text-amber-600" />
            <h3 className="text-sm font-semibold text-amber-800">Resubmission Required</h3>
          </div>
          <p className="text-sm text-amber-800 leading-relaxed">{result.resubmissionInstructions}</p>
        </div>
      )}

      {/* Manager Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Manager Actions</h3>
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save to Profile
          </button>
          {result.resubmissionRequired && (
            <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200 rounded-lg hover:bg-amber-200 transition-colors">
              <RotateCcw className="h-3.5 w-3.5" />
              Request Resubmission
            </button>
          )}
          <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors">
            <UserPlus className="h-3.5 w-3.5" />
            Assign Coaching
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors">
            <MessageSquare className="h-3.5 w-3.5" />
            Send Feedback
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 rounded-lg hover:bg-slate-50 transition-colors">
            Manager Override
          </button>
        </div>
      </div>
    </div>
  );
}
