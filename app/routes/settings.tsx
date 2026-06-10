import { Settings } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function SettingsPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Settings"
        subtitle="Manage your OpsPilot AI workspace, users, and integrations."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={Settings}
          title="Workspace Settings"
          description="Configure your OpsPilot AI workspace — manage team members, set notification preferences, connect integrations, and customize readiness thresholds for your franchise."
          badge="Coming Soon"
          badgeColor="bg-slate-100 text-slate-600"
          features={[
            "Team member management and role permissions",
            "Notification and alert preferences",
            "Readiness threshold customization by location type",
            "Integration with POS, training, and HR systems",
            "API access and webhook configuration",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
