import { FileImage } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function EvidenceReviewPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Evidence Review"
        subtitle="Review photos, videos, and documents submitted across all locations."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={FileImage}
          title="Evidence Review Workspace"
          description="Review and approve all submitted evidence across every location in one unified workspace. AI automatically flags issues and surfaces items needing your attention."
          badge="Coming Soon"
          badgeColor="bg-amber-100 text-amber-700"
          features={[
            "Unified evidence inbox across all 18 locations",
            "AI confidence scoring and auto-flagging",
            "One-click approve, reject, or retake actions",
            "Evidence categorization: photos, videos, documents",
            "Bulk review mode for high-volume periods",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
