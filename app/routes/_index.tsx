import { useRef } from "react";
import {
  Activity,
  Users,
  FileVideo,
  MonitorPlay,
  Rocket,
  Calendar,
  Filter,
  AlertTriangle,
  Sparkles,
  Send,
  TrendingDown,
} from "lucide-react";
import { useNavigate } from "react-router";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { ToastProvider, useToast } from "~/components/ui/Toast";
import { KPICard } from "~/components/ui/KPICard";
import { AIOwnerSummary } from "~/components/dashboard/AIOwnerSummary";
import { StudioQualityOverview } from "~/components/dashboard/StudioQualityOverview";
import { AIQualityFlags } from "~/components/dashboard/AIQualityFlags";
import { SubmissionQueue } from "~/components/dashboard/SubmissionQueue";
import { LaunchReadinessPreview } from "~/components/dashboard/LaunchReadinessPreview";
import { CoachQualityTrends } from "~/components/dashboard/CoachQualityTrends";
import { LiveAIReviewPreview } from "~/components/dashboard/LiveAIReviewPreview";

function DashboardContent() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const flagsSectionRef = useRef<HTMLDivElement>(null);

  const handleReviewFlags = () => {
    showToast("AI quality flags loaded.", "info");
    setTimeout(() => {
      flagsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const handleRequestSubmissions = () => {
    showToast("Submission reminders prepared for coaches and front-desk staff.", "success");
  };

  const handleGenerateOwnerSummary = () => {
    showToast("Owner summary generated from latest quality data.", "success");
  };

  const handleOpenLaunchGate = () => {
    navigate("/launch-readiness");
  };

  const handleSendDailySummary = () => {
    showToast("Daily launch readiness summary prepared for Sarah Mitchell.", "success");
  };

  const handleCreateCoachingPlan = () => {
    showToast("Coaching plan generated from current AI quality flags.", "success");
  };

  const handleAskAI = () => {
    showToast("CoachIQ AI is ready. Ask me anything about your studios.", "info");
  };

  const handleRequestResubmission = (name: string) => {
    showToast(`Resubmission request prepared for ${name}.`, "info");
  };

  return (
    <PageLayout>
      <TopHeader
        title="Staff Quality Command Center"
        subtitle="Monitor coach performance, front-desk compliance, and launch readiness across all BloomFit Studios locations."
        statusLine="5 studios · 30 coaches · 12 front-desk staff · Member retention is the primary metric"
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Calendar className="h-3.5 w-3.5" />
              Last 30 days
            </button>
            <button className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="h-3.5 w-3.5" />
              All Studios
            </button>
            <button
              onClick={handleReviewFlags}
              className="inline-flex items-center gap-1.5 h-9 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              Review AI Flags
            </button>
            <button
              onClick={handleRequestSubmissions}
              className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              Request Submissions
            </button>
            <button
              onClick={handleGenerateOwnerSummary}
              className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Generate Owner Summary
            </button>
          </>
        }
      />

      <PageContent>
        <div className="flex flex-col gap-7">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <KPICard
              label="Network Quality Score"
              value={78}
              suffix=""
              sub="7.8/10 average across all studios"
              delta="-0.4 from last month"
              icon={Activity}
              iconColor="text-amber-500"
              index={0}
              displayOverride="7.8"
            />
            <KPICard
              label="Member Retention"
              value={84}
              suffix="%"
              sub="Network average"
              delta="SoHo down 6%"
              icon={Users}
              iconColor="text-amber-500"
              index={1}
            />
            <KPICard
              label="Coaches Below Threshold"
              value={6}
              sub="Below 8.0 quality score"
              note="2 declining quickly"
              icon={TrendingDown}
              iconColor="text-red-500"
              index={2}
            />
            <KPICard
              label="Submissions Due"
              value={19}
              sub="Across all studios"
              note="8 overdue"
              icon={FileVideo}
              iconColor="text-amber-500"
              index={3}
            />
            <KPICard
              label="Front-Desk Readiness"
              value={78}
              suffix="%"
              sub="Network average"
              note="Cancellation handling weakest"
              icon={MonitorPlay}
              iconColor="text-amber-500"
              index={4}
            />
            <KPICard
              label="Launch Gate"
              value={61}
              suffix="% ready"
              sub="Denver blocked by 5 staff"
              note="Not Approved"
              icon={Rocket}
              iconColor="text-purple-500"
              index={5}
            />
          </div>

          {/* AI Owner Summary */}
          <AIOwnerSummary
            onViewFlags={handleReviewFlags}
            onCreateCoachingPlan={handleCreateCoachingPlan}
            onOpenLaunchGate={handleOpenLaunchGate}
            onAskAI={handleAskAI}
          />

          {/* Studio Quality Overview */}
          <StudioQualityOverview />

          {/* AI Quality Flags */}
          <AIQualityFlags
            onRequestResubmission={handleRequestResubmission}
            flagsSectionRef={flagsSectionRef}
          />

          {/* Submission Queue */}
          <SubmissionQueue onRequestResubmission={handleRequestResubmission} />

          {/* Launch Readiness Preview */}
          <LaunchReadinessPreview
            onOpenLaunchGate={handleOpenLaunchGate}
            onSendSummary={handleSendDailySummary}
          />

          {/* Coach Quality Trends */}
          <CoachQualityTrends />

          {/* Live AI Review Preview */}
          <LiveAIReviewPreview />
        </div>
      </PageContent>
    </PageLayout>
  );
}

export default function DashboardPage() {
  return (
    <ToastProvider>
      <DashboardContent />
    </ToastProvider>
  );
}
