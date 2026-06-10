import { Bot } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function AIReviewCenterPage() {
  return (
    <PageLayout>
      <TopHeader
        title="AI Review Center"
        subtitle="Watch CoachIQ AI score submissions in real time, criterion by criterion."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={Bot}
          title="AI Review Center"
          description="The CoachIQ AI Review Center processes coach and front-desk recordings like a senior trainer. Every submission is scored across multiple quality criteria — class opening, cueing, energy, safety cues, and closing — with written explanations for every decision."
          badge="Coming Soon"
          badgeColor="bg-blue-100 text-blue-700"
          features={[
            "Real-time AI scoring with step-by-step review walkthrough",
            "Per-criterion scores with written evidence and coaching notes",
            "Comparison against BloomFit quality standard benchmarks",
            "Coach-facing feedback report generation",
            "AI confidence levels and escalation flags for manager review",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
