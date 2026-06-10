import { CheckCircle2, Loader2, Circle, Bot } from "lucide-react";
import { jennaWhiteReviewSteps } from "~/lib/coachiq-data";
import { cn } from "~/lib/cn";

function getScoreColor(score: number) {
  if (score >= 9.0) return "text-green-700 bg-green-100";
  if (score >= 8.0) return "text-teal-700 bg-teal-100";
  if (score >= 7.0) return "text-amber-700 bg-amber-100";
  return "text-red-700 bg-red-100";
}

export function LiveAIReviewPreview() {
  return (
    <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-700">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Live AI Review Preview</h2>
            <p className="text-xs text-blue-200">
              Watch CoachIQ AI score a submitted recording against the BloomFit standard.
            </p>
          </div>
        </div>

        {/* Staff info */}
        <div className="mt-3 flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2.5">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-xs font-bold text-white">JW</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Jenna White</p>
            <p className="text-xs text-blue-200">New Instructor · Denver Launch · Certification class segment</p>
          </div>
          <div className="ml-auto">
            <span className="text-xs font-semibold bg-red-500/80 text-white px-2.5 py-1 rounded-full">
              AI Reviewing...
            </span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="px-6 py-5">
        <div className="relative">
          {jennaWhiteReviewSteps.map((step, i) => {
            const isLast = i === jennaWhiteReviewSteps.length - 1;
            const isComplete = step.status === "Complete";
            const isInProgress = step.status === "In Progress";
            const isPending = step.status === "Pending";

            return (
              <div key={step.step} className="flex gap-4">
                {/* Step indicator + line */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center shrink-0 z-10",
                      isComplete
                        ? "bg-green-100 border-2 border-green-500"
                        : isInProgress
                        ? "bg-blue-100 border-2 border-blue-500"
                        : "bg-slate-100 border-2 border-slate-200"
                    )}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : isInProgress ? (
                      <Loader2 className="h-3.5 w-3.5 text-blue-600 animate-spin" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-slate-300" />
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className={cn(
                        "w-0.5 flex-1 my-1",
                        isComplete ? "bg-green-200" : "bg-slate-100"
                      )}
                      style={{ minHeight: "20px" }}
                    />
                  )}
                </div>

                {/* Step content */}
                <div className={cn("flex-1 pb-4", isLast ? "" : "")}>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isComplete
                          ? "text-slate-900"
                          : isInProgress
                          ? "text-blue-700 font-semibold"
                          : "text-slate-400"
                      )}
                    >
                      Step {step.step}: {step.label}
                    </span>
                    {step.score !== undefined && isComplete && (
                      <span
                        className={cn(
                          "text-xs font-bold px-2 py-0.5 rounded-lg",
                          getScoreColor(step.score)
                        )}
                      >
                        {step.score.toFixed(1)}/10
                      </span>
                    )}
                    {isInProgress && (
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        In Progress
                      </span>
                    )}
                    {isPending && (
                      <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">
                        Pending
                      </span>
                    )}
                  </div>
                  {step.detail && (
                    <p
                      className={cn(
                        "text-xs leading-relaxed",
                        isInProgress ? "text-blue-600 italic" : isPending ? "text-slate-300" : "text-slate-500"
                      )}
                    >
                      {step.detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-2 pt-4 border-t border-slate-100 bg-blue-50/50 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <Bot className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-blue-700">CoachIQ AI</span> reviews recordings like a senior trainer: criterion by criterion, with written evidence and coaching notes. Every decision is explainable and tied to the BloomFit quality standard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
