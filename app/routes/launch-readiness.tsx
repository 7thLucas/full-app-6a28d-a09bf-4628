import { Rocket } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function LaunchReadinessPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Launch Readiness"
        subtitle="Manage the staff readiness gate for new BloomFit studio openings."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={Rocket}
          title="Studio Launch Gate"
          description="Every new BloomFit location must pass the launch readiness gate before opening to members. Track certification status, submission completions, and AI review results for every staff member. A studio cannot open until all blockers are resolved."
          badge="1 Studio Blocked"
          badgeColor="bg-purple-100 text-purple-700"
          features={[
            "Per-studio launch readiness dashboard with live completion tracking",
            "Individual staff clearance status — coach and front desk",
            "Hard blocker management with escalation to franchise owner",
            "Daily readiness summary emails for studio directors",
            "Approval and sign-off workflow for studio opening authorization",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
