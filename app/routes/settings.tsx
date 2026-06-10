import { Settings } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function SettingsPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Settings"
        subtitle="Configure your CoachIQ workspace, quality thresholds, and notification preferences."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={Settings}
          title="Workspace Settings"
          description="Configure your CoachIQ workspace for BloomFit Studios — set quality score thresholds, manage team roles and permissions, customize AI review criteria, and connect integrations with your studio management systems."
          badge="Coming Soon"
          badgeColor="bg-slate-100 text-slate-600"
          features={[
            "Quality score threshold customization per studio type",
            "Team member management and role-based access control",
            "Notification and alert preferences for owners and directors",
            "AI review criteria configuration per class format",
            "Integration with scheduling, CRM, and HR platforms",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
