import { Award } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { PlaceholderPage } from "~/components/ui/PlaceholderPage";

export default function CertificationPage() {
  return (
    <PageLayout>
      <TopHeader
        title="Certification"
        subtitle="Clear or block new instructors before they go live with members."
      />
      <PageContent className="flex">
        <PlaceholderPage
          icon={Award}
          title="Instructor Certification Gate"
          description="Manage the certification process for new instructors at every BloomFit location. Review certification class segment recordings, AI scores, and make final clearance decisions before instructors lead live classes."
          badge="Coming Soon"
          badgeColor="bg-slate-100 text-slate-600"
          features={[
            "New instructor certification submission intake",
            "AI scoring against BloomFit quality standard",
            "Clearance, hold, and remediation decision workflow",
            "Certification history and resubmission tracking",
            "Launch gate integration — blocks studio opening if uncertified",
          ]}
        />
      </PageContent>
    </PageLayout>
  );
}
