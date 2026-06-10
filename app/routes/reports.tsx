import { BarChart3 } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function ReportsPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Reports"
        subtitle="Generate weekly readiness reports, audit summaries, and action plans."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={BarChart3}
          title="Reports & Analytics"
          description="Generate detailed weekly readiness reports, audit summaries, and trend analysis across all BloomFit Studios locations. Schedule automated delivery to stakeholders."
          badge="Coming Soon"
          badgeColor="bg-green-100 text-green-700"
          features={[
            "Weekly readiness report with location-by-location breakdown",
            "Audit summary with pass/fail prediction for each location",
            "AI-generated action plans ranked by impact",
            "Trend charts: readiness over time, blockers over time",
            "Scheduled email delivery to franchise owners and managers",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
