import { useState } from "react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { CertificationMetrics } from "~/components/certification/CertificationMetrics";
import { CertificationQueue } from "~/components/certification/CertificationQueue";
import { NewCertificationReview } from "~/components/certification/NewCertificationReview";
import { AIProcessingStepper } from "~/components/certification/AIProcessingStepper";
import { CertificationResult } from "~/components/certification/CertificationResult";
import type { CertificationResult as CertResultType } from "~/services/certification.service";

type PageView = "overview" | "new-review" | "processing" | "result";

export default function CertificationPage() {
  const [view, setView] = useState<PageView>("overview");
  const [result, setResult] = useState<CertResultType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisBasis, setAnalysisBasis] = useState("pasted transcript");

  const handleStartReview = async (
    formData: Record<string, string> & { inputType: string },
    transcriptText: string
  ) => {
    const inputBasis =
      formData.inputType === "pasted_transcript"
        ? "pasted transcript"
        : formData.inputType === "uploaded_transcript"
        ? "uploaded transcript file"
        : formData.inputType === "video"
        ? "video upload"
        : formData.inputType === "audio"
        ? "audio upload"
        : "transcript";
    setAnalysisBasis(inputBasis);
    setView("processing");
    setIsProcessing(true);

    try {
      const res = await fetch("/api/certification/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, transcriptText }),
      });
      const data = await res.json();
      // Handle both { data: result } and bare result shapes
      const certResult = data.data ?? data;
      setResult(certResult);
      setIsProcessing(false);
      setView("result");
    } catch {
      setResult({
        reviewMode: "real_ai",
        inputType: formData.inputType,
        instructorName: formData.instructorName ?? "",
        studioName: formData.studioName ?? "",
        classFormat: formData.classFormat ?? "",
        submissionType: formData.submissionType ?? "",
        rubricName: "BloomFit Instructor Certification Standard",
        overallScore: 0,
        readinessStatus: "Insufficient Evidence",
        schedulingStatus: "No Decision",
        readinessThreshold: 8.0,
        minimumCriterionThreshold: 7.5,
        confidenceScore: 0,
        confidenceLabel: "Low",
        analysisBasis: formData.inputType,
        transcriptSummary: "",
        detectedMoments: [],
        criterionScores: [],
        strengths: [],
        improvements: [],
        specificCueToTry: "",
        managerSummary: "",
        instructorFeedback: "",
        resubmissionRequired: false,
        resubmissionInstructions: "",
        recommendedCoachingPlan: [],
        certificationBadge: { issued: false, title: "Not Issued", validThrough: null },
        error: "Connection failed. Please try again.",
      });
      setIsProcessing(false);
      setView("result");
    }
  };

  const handleLoadDemo = (demoData: CertResultType) => {
    setResult(demoData);
    setView("result");
  };

  return (
    <PageLayout>
      <TopHeader
        title="Instructor Certification Readiness"
        subtitle="New instructors must pass an AI-reviewed class segment before teaching live members."
        statusLine="8 new instructors in certification · 3 cleared · 3 not cleared · 2 awaiting review"
        actions={
          <>
            <button
              onClick={() => setView("new-review")}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Certification Review
            </button>
            <button
              onClick={() => setView("new-review")}
              className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors"
            >
              Paste Transcript
            </button>
            <button className="px-3 py-2 text-sm font-medium text-slate-500 rounded-lg hover:bg-slate-50 transition-colors">
              Review Pending
            </button>
            <button className="px-3 py-2 text-sm font-medium text-slate-500 rounded-lg hover:bg-slate-50 transition-colors">
              Certification Settings
            </button>
          </>
        }
      />
      <PageContent>
        {view === "overview" && (
          <>
            <CertificationMetrics />
            <CertificationQueue
              onStartReview={() => setView("new-review")}
              onViewResult={(demoData) => {
                setResult(demoData);
                setView("result");
              }}
            />
          </>
        )}
        {view === "new-review" && (
          <NewCertificationReview
            onSubmit={handleStartReview}
            onCancel={() => setView("overview")}
            onLoadDemo={handleLoadDemo}
          />
        )}
        {view === "processing" && (
          <AIProcessingStepper
            isProcessing={isProcessing}
            analysisBasis={analysisBasis}
          />
        )}
        {view === "result" && (
          <CertificationResult
            result={result}
            onBack={() => setView("overview")}
            onNewReview={() => setView("new-review")}
          />
        )}
      </PageContent>
    </PageLayout>
  );
}
