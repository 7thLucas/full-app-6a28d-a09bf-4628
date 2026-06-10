import { useEffect, useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "~/lib/cn";

const STEPS = [
  { label: "Validating submission", activeDescription: "Checking submission format, fields, and input type..." },
  { label: "Extracting audio or transcript", activeDescription: "Parsing transcript text and detecting speaker lines..." },
  { label: "Generating transcript", activeDescription: "Normalizing speaker turns and timestamp markers..." },
  { label: "Detecting class moments", activeDescription: "Identifying key teaching moments, transitions, and cues..." },
  { label: "Mapping evidence to rubric", activeDescription: "Aligning detected moments to BloomFit certification criteria..." },
  { label: "Scoring Class Opening", activeDescription: "Evaluating welcome, objective, warmup, and first-movement setup..." },
  { label: "Scoring Cueing Quality", activeDescription: "Analyzing alignment cues, tempo, transitions, and language specificity..." },
  { label: "Scoring Energy and Pacing", activeDescription: "Measuring format-appropriate energy, presence, and transition smoothness..." },
  { label: "Scoring Safety Cues", activeDescription: "Checking proactive safety language, modifications, and avoidance cues..." },
  { label: "Scoring Closing", activeDescription: "Evaluating cooldown, effort acknowledgment, and next-class communication..." },
  { label: "Calculating readiness status", activeDescription: "Comparing scores against 8.0 overall and 7.5 per-criterion thresholds..." },
  { label: "Generating coaching recommendations", activeDescription: "Writing criterion-level coaching plans and improvement suggestions..." },
  { label: "Updating instructor profile", activeDescription: "Saving certification result and readiness status..." },
];

const STEP_COMPLETE_NOTES = [
  "Submission format validated",
  "Transcript text extracted",
  "Transcript normalized",
  "Teaching moments detected",
  "Evidence mapped to all 5 criteria",
  "Class Opening scored",
  "Cueing Quality scored",
  "Energy and Pacing scored",
  "Safety Cues scored",
  "Closing scored",
  "Readiness status calculated",
  "Coaching plan generated",
  "Profile updated",
];

type StepStatus = "pending" | "active" | "complete" | "failed";

interface AIProcessingStepperProps {
  isProcessing: boolean;
  analysisBasis?: string;
  hasFailed?: boolean;
}

export function AIProcessingStepper({
  isProcessing,
  analysisBasis = "pasted transcript",
  hasFailed = false,
}: AIProcessingStepperProps) {
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    STEPS.map((_, i) => (i === 0 ? "active" : "pending"))
  );
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isProcessing) {
      if (hasFailed) {
        setStepStatuses((prev) => {
          const next = [...prev];
          next[currentStep] = "failed";
          return next;
        });
      } else {
        // Complete all remaining steps immediately
        setStepStatuses(STEPS.map(() => "complete" as StepStatus));
        setCurrentStep(STEPS.length - 1);
      }
      return;
    }

    // Simulate step progression while API is in flight
    let step = 0;
    setCurrentStep(0);
    setStepStatuses(STEPS.map((_, i) => (i === 0 ? "active" : "pending")));

    const advance = () => {
      if (step >= STEPS.length - 2) return; // stop before last step while processing
      setStepStatuses((prev) => {
        const next = [...prev];
        next[step] = "complete";
        next[step + 1] = "active";
        return next;
      });
      step += 1;
      setCurrentStep(step);
    };

    const intervals: ReturnType<typeof setTimeout>[] = [];
    let accumulated = 0;
    for (let i = 0; i < STEPS.length - 2; i++) {
      const delay = 400 + Math.random() * 300;
      accumulated += delay;
      const t = setTimeout(advance, accumulated);
      intervals.push(t);
    }

    return () => {
      intervals.forEach(clearTimeout);
    };
  }, [isProcessing]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-blue-50/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
              {isProcessing ? (
                <Loader2 className="h-5 w-5 text-white animate-spin" />
              ) : hasFailed ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Check className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {isProcessing
                  ? "CoachIQ AI Review in Progress"
                  : hasFailed
                  ? "Analysis Failed"
                  : "Analysis Complete"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isProcessing
                  ? "Analyzing instructor readiness against the BloomFit Instructor Certification Standard."
                  : hasFailed
                  ? "An error occurred during analysis. Please try again."
                  : "Review complete. Results are ready."}
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="px-6 py-5">
          <div className="space-y-3">
            {STEPS.map((step, i) => {
              const status = stepStatuses[i];
              return (
                <div key={step.label} className="flex items-start gap-3">
                  {/* Status icon */}
                  <div className="mt-0.5 shrink-0">
                    {status === "complete" && (
                      <div className="h-5 w-5 rounded-full bg-green-100 border border-green-200 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                    )}
                    {status === "active" && (
                      <div className="h-5 w-5 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                        <Loader2 className="h-3 w-3 text-blue-600 animate-spin" />
                      </div>
                    )}
                    {status === "failed" && (
                      <div className="h-5 w-5 rounded-full bg-red-100 border border-red-200 flex items-center justify-center">
                        <X className="h-3 w-3 text-red-600" />
                      </div>
                    )}
                    {status === "pending" && (
                      <div className="h-5 w-5 rounded-full bg-slate-100 border border-slate-200" />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          status === "complete" && "text-green-700",
                          status === "active" && "text-blue-700",
                          status === "failed" && "text-red-700",
                          status === "pending" && "text-slate-400"
                        )}
                      >
                        {step.label}
                      </span>
                      {status === "complete" && (
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {STEP_COMPLETE_NOTES[i]}
                        </span>
                      )}
                    </div>
                    {status === "active" && (
                      <p className="text-xs text-blue-500 mt-0.5">{step.activeDescription}</p>
                    )}
                    {status === "failed" && (
                      <p className="text-xs text-red-500 mt-0.5">
                        Analysis failed at this step. Please try again.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analysis basis */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Analysis based on:</span>
            <span className="text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
              {analysisBasis}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
