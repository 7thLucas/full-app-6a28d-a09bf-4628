import { MonitorPlay } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function FrontDeskPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Front Desk"
        subtitle="Review front-desk roleplay submissions, membership conversation quality, and compliance readiness."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={MonitorPlay}
          title="Front Desk Quality"
          description="Monitor front-desk team performance across all BloomFit locations. Review membership sales roleplays, welcome script compliance, and cancellation handling quality — with AI scoring and coaching notes per submission."
          badge="Coming Soon"
          badgeColor="bg-slate-100 text-slate-600"
          features={[
            "Membership sales roleplay review and AI scoring",
            "Welcome script and cancellation handling compliance",
            "Front-desk clearance and remediation workflows",
            "Script adherence tracking per location",
            "Trend analysis — front-desk quality mapped to membership revenue",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
