import { FileVideo } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function SubmissionsPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Submissions"
        subtitle="Review all coach and front-desk recording submissions awaiting AI review or manager action."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={FileVideo}
          title="Submission Management"
          description="Centralize all video and voice recordings submitted by coaches and front-desk staff for quality review. Track submission status, AI scores, and pending approvals across every BloomFit location."
          badge="Coming Soon"
          badgeColor="bg-slate-100 text-slate-600"
          features={[
            "Upload and manage class segment and roleplay recordings",
            "Real-time AI review status tracking per submission",
            "Manager approval and resubmission workflows",
            "Overdue submission alerts and reminder automation",
            "Submission history and score progression per staff member",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
