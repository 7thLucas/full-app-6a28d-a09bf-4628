import { Building2 } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function StudiosPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Studios"
        subtitle="Manage studio-level quality, retention, staff readiness, and submission performance."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={Building2}
          title="Studio Management"
          description="View and manage all BloomFit studio locations. Track member retention trends, coach quality scores, front-desk readiness, and submission cadence studio by studio."
          badge="Coming Soon"
          badgeColor="bg-slate-100 text-slate-600"
          features={[
            "Per-studio quality score dashboards and retention trends",
            "Director and coach assignment management",
            "Submission cadence tracking and overdue alerts",
            "Side-by-side studio performance comparison",
            "AI-generated studio health summaries",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
