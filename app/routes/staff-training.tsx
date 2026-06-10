import { GraduationCap } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function StaffTrainingPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Staff Training"
        subtitle="Monitor training completion rates and role readiness across all locations."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={GraduationCap}
          title="Staff Training Tracker"
          description="Track staff training completion by location, role, and individual team member. Identify gaps, flag overdue certifications, and ensure every person is ready before opening day."
          badge="Coming Soon"
          badgeColor="bg-purple-100 text-purple-700"
          features={[
            "Training completion by location and role",
            "Individual staff progress tracking",
            "Certification expiry and renewal alerts",
            "Training gap analysis with AI prioritization",
            "Integration with external training platforms",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
