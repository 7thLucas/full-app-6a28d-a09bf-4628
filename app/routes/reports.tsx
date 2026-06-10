import { BarChart3 } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function ReportsPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Reports"
        subtitle="Generate and export quality reports for owners, directors, and franchise stakeholders."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={BarChart3}
          title="Quality Reports"
          description="Generate comprehensive quality and retention reports for every BloomFit location. Share owner summaries, coach performance reports, and network benchmarks with directors, investors, and franchise stakeholders."
          badge="Coming Soon"
          badgeColor="bg-slate-100 text-slate-600"
          features={[
            "Owner summary report — network quality, retention, and flags",
            "Per-studio coach performance and trend reports",
            "Monthly quality benchmark comparison across all locations",
            "Front-desk compliance and membership conversion reports",
            "Export to PDF for investor and franchisee presentations",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
