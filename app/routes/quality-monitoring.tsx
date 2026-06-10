import { Activity } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function QualityMonitoringPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Quality Monitoring"
        subtitle="Track ongoing coach quality trends, detect declining performance, and drive network-wide improvement."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={Activity}
          title="Quality Monitoring Center"
          description="Monitor coach quality trends across the entire BloomFit network. Detect score declines before they affect member retention, identify coaching gaps by category, and benchmark performance against the BloomFit quality standard."
          badge="Coming Soon"
          badgeColor="bg-slate-100 text-slate-600"
          features={[
            "Network-wide quality score dashboard with trend charts",
            "Automated decline detection and alert thresholds",
            "Category-level breakdown: cueing, energy, safety, closing",
            "Retention correlation — quality scores mapped to member retention",
            "AI-generated intervention recommendations per coach",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
