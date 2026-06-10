import { ClipboardList } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function ChecklistsPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Checklists"
        subtitle="Build, assign, and track operational checklists for every location."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={ClipboardList}
          title="Checklist Management"
          description="Create and assign standardized checklists for every role and location. Track completion, enforce brand standards, and surface gaps before they become blockers."
          badge="Coming Soon"
          badgeColor="bg-blue-100 text-blue-700"
          features={[
            "Custom checklist builder with category templates",
            "Location-specific task assignment and ownership",
            "Automated deadline reminders and escalation",
            "AI-powered gap detection across all locations",
            "Checklist completion analytics and benchmarks",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
