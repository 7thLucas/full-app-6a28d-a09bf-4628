import { Users } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function StaffPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Staff"
        subtitle="View coach and front-desk profiles, certification badges, quality scores, and coaching history."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={Users}
          title="Staff Profiles"
          description="Manage every coach and front-desk team member across all BloomFit locations. Review quality trends, certification status, AI-generated coaching recommendations, and submission histories."
          badge="Coming Soon"
          badgeColor="bg-slate-100 text-slate-600"
          features={[
            "Individual quality score history and trend analysis",
            "Certification and clearance status badges",
            "AI-generated coaching notes per submission",
            "Declining score alerts and intervention tracking",
            "Cross-studio staff performance benchmarking",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
