import { useState } from "react";
import {
  MapPin,
  FileX,
  AlertTriangle,
  GraduationCap,
  CheckCircle,
  Activity,
  Loader2,
  Download,
  Calendar,
  Filter,
  Sparkles,
} from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { KPICard } from "~/components/ui/KPICard";
import { AISituationBanner } from "~/components/dashboard/AISituationBanner";
import { LocationHealthOverview } from "~/components/dashboard/LocationHealthOverview";
import { LocationReadinessTable } from "~/components/dashboard/LocationReadinessTable";
import { AIPriorityQueue } from "~/components/dashboard/AIPriorityQueue";
import { RiskBlockerIntelligence } from "~/components/dashboard/RiskBlockerIntelligence";
import { EvidenceTrainingSnapshot } from "~/components/dashboard/EvidenceTrainingSnapshot";
import { ActivityFeed } from "~/components/dashboard/ActivityFeed";
import { AIAssistantTeaser } from "~/components/dashboard/AIAssistantTeaser";
import { ToastProvider, useToast } from "~/components/ui/Toast";
import { useConfigurables } from "~/modules/configurables";

function DashboardContent() {
  const { config, loading } = useConfigurables();
  const { showToast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const title = !loading ? (config.dashboardTitle ?? "Operations Command Center") : "Operations Command Center";
  const subtitle = !loading
    ? (config.dashboardSubtitle ?? "AI-powered readiness tracking across 18 BloomFit Studios locations.")
    : "AI-powered readiness tracking across 18 BloomFit Studios locations.";
  const showAIBanner = !loading ? (config.showAISituationBanner !== false) : true;
  const showActivity = !loading ? (config.showActivityFeed !== false) : true;
  const showAssistant = !loading ? (config.showAIAssistantTeaser !== false) : true;

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsGenerating(false);
    showToast("AI summary generated successfully", "success");
  };

  const handleExportReport = () => {
    showToast("Weekly readiness report prepared", "info");
  };

  const handleCreateActionPlan = () => {
    showToast("AI action plan generated from current blockers", "success");
  };

  const handleViewBreakdown = () => {
    showToast("AI breakdown loaded", "info");
  };

  return (
    <PageLayout>
      <TopHeader
        title={title}
        subtitle={subtitle}
        statusLine="Last synced 12 minutes ago · 5 locations need attention"
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Calendar className="h-3.5 w-3.5" />
              This Week
            </button>
            <button className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="h-3.5 w-3.5" />
              All Regions
            </button>
            <button
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 h-9 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-70"
            >
              {isGenerating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              {isGenerating ? "Generating..." : "Generate AI Summary"}
            </button>
            <button
              onClick={handleExportReport}
              className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Export Report
            </button>
          </>
        }
      />

      <PageContent>
        <div className="flex flex-col gap-6">
          {/* AI Situation Banner */}
          {showAIBanner && (
            <AISituationBanner
              onViewBreakdown={handleViewBreakdown}
              onCreateActionPlan={handleCreateActionPlan}
            />
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-6 gap-4">
            <KPICard
              label="Overall Readiness"
              value={78}
              suffix="%"
              sub="Across 18 U.S. locations"
              delta="+6% from last week"
              icon={Activity}
              iconColor="text-blue-400"
              index={0}
            />
            <KPICard
              label="Locations At Risk"
              value={5}
              sub="Need manager attention"
              note="2 delayed openings"
              icon={MapPin}
              iconColor="text-red-400"
              index={1}
            />
            <KPICard
              label="Missing Evidence"
              value={52}
              sub="Photos, videos, documents pending"
              note="15 overdue"
              icon={FileX}
              iconColor="text-amber-400"
              index={2}
            />
            <KPICard
              label="Critical Blockers"
              value={14}
              sub="Blocking audit readiness"
              note="3 urgent this week"
              icon={AlertTriangle}
              iconColor="text-red-400"
              index={3}
            />
            <KPICard
              label="Training Completion"
              value={74}
              suffix="%"
              sub="Average staff readiness"
              note="Below 80% target"
              icon={GraduationCap}
              iconColor="text-amber-400"
              index={4}
            />
            <KPICard
              label="Ready for Review"
              value={6}
              sub="Awaiting manager approval"
              note="+2 today"
              delta="+2 today"
              icon={CheckCircle}
              iconColor="text-green-400"
              index={5}
            />
          </div>

          {/* Location Health + Priority Queue */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <LocationHealthOverview />
            </div>
            <div>
              <AIPriorityQueue />
            </div>
          </div>

          {/* Location Readiness Table */}
          <LocationReadinessTable />

          {/* Risk/Blocker + Evidence/Training */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <RiskBlockerIntelligence />
            </div>
            <div className="col-span-2">
              <EvidenceTrainingSnapshot />
            </div>
          </div>

          {/* Activity Feed + AI Teaser */}
          <div className="grid grid-cols-3 gap-4">
            {showActivity && (
              <div className="col-span-2">
                <ActivityFeed />
              </div>
            )}
            {showAssistant && (
              <div className={showActivity ? "" : "col-span-3"}>
                <AIAssistantTeaser />
              </div>
            )}
          </div>
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
