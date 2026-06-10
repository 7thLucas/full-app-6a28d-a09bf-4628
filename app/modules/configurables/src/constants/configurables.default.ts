/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TUserProfile = {
  name: string;
  role: string;
  initials: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  appTagline?: string;
  logoUrl: string;
  brandColor: TBrandColor;
  companyName?: string;
  totalLocations?: number;
  dashboardTitle?: string;
  dashboardSubtitle?: string;
  userProfile?: TUserProfile;
  showAISituationBanner?: boolean;
  showAIAssistantTeaser?: boolean;
  showActivityFeed?: boolean;
  locationsPageTitle?: string;
  locationsPageSubtitle?: string;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "OpsPilot AI",
  appTagline: "AI Ops Platform",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#2563EB",
    secondary: "#1E40AF",
    accent: "#3B82F6",
  },
  companyName: "BloomFit Studios",
  totalLocations: 18,
  dashboardTitle: "Operations Command Center",
  dashboardSubtitle: "AI-powered readiness tracking across 18 BloomFit Studios locations.",
  userProfile: {
    name: "Sarah Mitchell",
    role: "VP of Operations",
    initials: "SM",
  },
  showAISituationBanner: true,
  showAIAssistantTeaser: true,
  showActivityFeed: true,
  locationsPageTitle: "Locations",
  locationsPageSubtitle: "Monitor readiness across all BloomFit Studios locations.",
};
