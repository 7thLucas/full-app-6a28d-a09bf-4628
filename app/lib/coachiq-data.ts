// ─── CoachIQ Data — BloomFit Studios ─────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

export type StudioStatus = "Strong" | "On Track" | "Watchlist" | "At Risk" | "Launch Gate";
export type StaffTrend = "Stable" | "Improving" | "Declining" | "New";
export type ClearanceStatus = "Cleared" | "Needs Coaching" | "Not Cleared";
export type SubmissionStatus =
  | "Uploaded"
  | "AI Processing"
  | "AI Reviewed"
  | "Manager Review"
  | "Approved"
  | "Needs Resubmission"
  | "Not Cleared"
  | "Needs Second Roleplay";
export type AIResult = "Strong" | "Watchlist" | "Needs Coaching" | "Not Cleared";
export type Priority = "Urgent" | "High" | "Medium" | "Low";
export type StepStatus = "Complete" | "In Progress" | "Pending";

// ─── Studios ──────────────────────────────────────────────────────────────────

export interface Studio {
  id: string;
  name: string;
  city: string;
  state: string;
  formats: string[];
  memberRetention: number | null;
  qualityScore: number;
  submissionsDue: number;
  frontDeskReadiness: number;
  status: StudioStatus;
  launchApproved: boolean;
  director: string;
  directorInitials: string;
  aiInsight: string;
}

export const studios: Studio[] = [
  {
    id: "west-loop",
    name: "West Loop",
    city: "Chicago",
    state: "IL",
    formats: ["Pilates", "HIIT"],
    memberRetention: 91,
    qualityScore: 8.8,
    submissionsDue: 2,
    frontDeskReadiness: 92,
    status: "Strong",
    launchApproved: true,
    director: "Avery Brooks",
    directorInitials: "AB",
    aiInsight: "Lead coach Olivia Hayes is the strongest performer in the network. Submission cadence is on track.",
  },
  {
    id: "soho",
    name: "SoHo",
    city: "New York",
    state: "NY",
    formats: ["Pilates", "Yoga"],
    memberRetention: 78,
    qualityScore: 7.1,
    submissionsDue: 6,
    frontDeskReadiness: 67,
    status: "At Risk",
    launchApproved: true,
    director: "Maya Collins",
    directorInitials: "MC",
    aiInsight: "Two coaches are declining rapidly. Front-desk membership conversations are below standard. Retention is at risk.",
  },
  {
    id: "austin",
    name: "Austin",
    city: "Austin",
    state: "TX",
    formats: ["HIIT", "Strength"],
    memberRetention: 84,
    qualityScore: 7.9,
    submissionsDue: 3,
    frontDeskReadiness: 81,
    status: "Watchlist",
    launchApproved: true,
    director: "Jordan Lee",
    directorInitials: "JL",
    aiInsight: "Emma Brooks has inconsistent safety cues. Retention is holding but needs monitoring.",
  },
  {
    id: "miami",
    name: "Miami",
    city: "Miami",
    state: "FL",
    formats: ["Pilates", "Recovery"],
    memberRetention: 89,
    qualityScore: 8.4,
    submissionsDue: 2,
    frontDeskReadiness: 88,
    status: "On Track",
    launchApproved: true,
    director: "Sofia Ramirez",
    directorInitials: "SR",
    aiInsight: "Lead coach Ava Morgan is performing well. Recovery programming is a standout offering.",
  },
  {
    id: "denver-launch",
    name: "Denver Launch",
    city: "Denver",
    state: "CO",
    formats: ["Pilates", "HIIT"],
    memberRetention: null,
    qualityScore: 6.8,
    submissionsDue: 5,
    frontDeskReadiness: 58,
    status: "Launch Gate",
    launchApproved: false,
    director: "Ethan Reed",
    directorInitials: "ER",
    aiInsight: "5 staff have not passed the launch readiness gate. Studio cannot open until all blockers are resolved.",
  },
];

// ─── Staff ────────────────────────────────────────────────────────────────────

export interface StaffMember {
  id: string;
  name: string;
  initials: string;
  studio: string;
  studioId: string;
  role: string;
  speciality: string;
  qualityScore: number;
  serviceScore?: number;
  trend: StaffTrend;
  clearance: ClearanceStatus;
  alert?: string;
  isCoach: boolean;
}

export const staffMembers: StaffMember[] = [
  // Coaches
  {
    id: "olivia-hayes",
    name: "Olivia Hayes",
    initials: "OH",
    studio: "West Loop",
    studioId: "west-loop",
    role: "Lead Coach",
    speciality: "Pilates",
    qualityScore: 9.2,
    trend: "Stable",
    clearance: "Cleared",
    isCoach: true,
  },
  {
    id: "marcus-lee",
    name: "Marcus Lee",
    initials: "ML",
    studio: "West Loop",
    studioId: "west-loop",
    role: "Coach",
    speciality: "HIIT",
    qualityScore: 8.6,
    trend: "Improving",
    clearance: "Cleared",
    isCoach: true,
  },
  {
    id: "claire-bennett",
    name: "Claire Bennett",
    initials: "CB",
    studio: "SoHo",
    studioId: "soho",
    role: "Coach",
    speciality: "Yoga",
    qualityScore: 6.9,
    trend: "Declining",
    clearance: "Cleared",
    alert: "Score dropped 1.7pts in 4 weeks",
    isCoach: true,
  },
  {
    id: "daniel-carter",
    name: "Daniel Carter",
    initials: "DC",
    studio: "SoHo",
    studioId: "soho",
    role: "Coach",
    speciality: "Pilates",
    qualityScore: 6.5,
    trend: "Declining",
    clearance: "Needs Coaching",
    alert: "Cueing quality below threshold",
    isCoach: true,
  },
  {
    id: "emma-brooks",
    name: "Emma Brooks",
    initials: "EB",
    studio: "Austin",
    studioId: "austin",
    role: "Coach",
    speciality: "HIIT",
    qualityScore: 7.8,
    trend: "Stable",
    clearance: "Cleared",
    alert: "Safety cues inconsistent",
    isCoach: true,
  },
  {
    id: "hannah-reed",
    name: "Hannah Reed",
    initials: "HR",
    studio: "Austin",
    studioId: "austin",
    role: "Coach",
    speciality: "Strength",
    qualityScore: 8.1,
    trend: "Improving",
    clearance: "Cleared",
    isCoach: true,
  },
  {
    id: "ava-morgan",
    name: "Ava Morgan",
    initials: "AM",
    studio: "Miami",
    studioId: "miami",
    role: "Lead Coach",
    speciality: "Pilates",
    qualityScore: 8.7,
    trend: "Stable",
    clearance: "Cleared",
    isCoach: true,
  },
  {
    id: "ryan-foster",
    name: "Ryan Foster",
    initials: "RF",
    studio: "Miami",
    studioId: "miami",
    role: "Coach",
    speciality: "Recovery",
    qualityScore: 8.0,
    trend: "Stable",
    clearance: "Cleared",
    isCoach: true,
  },
  {
    id: "jenna-white",
    name: "Jenna White",
    initials: "JW",
    studio: "Denver Launch",
    studioId: "denver-launch",
    role: "New Instructor",
    speciality: "Pilates",
    qualityScore: 5.9,
    trend: "New",
    clearance: "Not Cleared",
    alert: "Certification failed",
    isCoach: true,
  },
  {
    id: "maya-stone",
    name: "Maya Stone",
    initials: "MS",
    studio: "Denver Launch",
    studioId: "denver-launch",
    role: "New Instructor",
    speciality: "HIIT",
    qualityScore: 6.4,
    trend: "New",
    clearance: "Not Cleared",
    alert: "Energy and pacing below threshold",
    isCoach: true,
  },
  // Front Desk
  {
    id: "rachel-kim",
    name: "Rachel Kim",
    initials: "RK",
    studio: "SoHo",
    studioId: "soho",
    role: "Front Desk",
    speciality: "Front Desk",
    qualityScore: 6.7,
    serviceScore: 6.7,
    trend: "Declining",
    clearance: "Needs Coaching",
    alert: "Needs second membership roleplay",
    isCoach: false,
  },
  {
    id: "noah-parker",
    name: "Noah Parker",
    initials: "NP",
    studio: "Denver Launch",
    studioId: "denver-launch",
    role: "Front Desk",
    speciality: "Front Desk",
    qualityScore: 5.8,
    serviceScore: 5.8,
    trend: "New",
    clearance: "Not Cleared",
    alert: "Launch gate blocker",
    isCoach: false,
  },
];

// ─── AI Flags ─────────────────────────────────────────────────────────────────

export interface AIFlag {
  id: string;
  staffName: string;
  staffInitials: string;
  studio: string;
  studioId: string;
  role: string;
  issue: string;
  detail: string;
  aiNote: string;
  priority: Priority;
}

export const aiFlags: AIFlag[] = [
  {
    id: "f1",
    staffName: "Claire Bennett",
    staffInitials: "CB",
    studio: "SoHo",
    studioId: "soho",
    role: "Coach",
    issue: "Coach Quality Decline",
    detail: "Score dropped 1.7 points in 4 weeks — from 8.6 to 6.9.",
    aiNote: "Consistent downward trend detected across 4 fortnightly submissions. Cueing quality and class energy have declined most significantly.",
    priority: "Urgent",
  },
  {
    id: "f2",
    staffName: "Daniel Carter",
    staffInitials: "DC",
    studio: "SoHo",
    studioId: "soho",
    role: "Coach",
    issue: "Cueing Below Threshold",
    detail: "Quality score 6.5/10 — below the 7.0 coaching threshold.",
    aiNote: "Movement instructions lack specificity during transitions. Verbal corrections are reactive rather than proactive.",
    priority: "High",
  },
  {
    id: "f3",
    staffName: "Rachel Kim",
    staffInitials: "RK",
    studio: "SoHo",
    studioId: "soho",
    role: "Front Desk",
    issue: "Front-Desk Compliance Gap",
    detail: "Membership options not clearly explained during sales roleplay.",
    aiNote: "Rachel's roleplay recording shows hesitation when asked about membership tiers. A second coached roleplay is recommended before clearance.",
    priority: "High",
  },
  {
    id: "f4",
    staffName: "Jenna White",
    staffInitials: "JW",
    studio: "Denver Launch",
    studioId: "denver-launch",
    role: "New Instructor",
    issue: "Not Cleared for Launch",
    detail: "Certification class segment scored 5.9/10 — below the 8.0 clearance threshold.",
    aiNote: "Class opening and cueing quality are the primary gaps. Jenna needs targeted coaching before resubmission.",
    priority: "Urgent",
  },
  {
    id: "f5",
    staffName: "Noah Parker",
    staffInitials: "NP",
    studio: "Denver Launch",
    studioId: "denver-launch",
    role: "Front Desk",
    issue: "Launch Gate Blocker",
    detail: "Front desk readiness score 5.8/10 — studio cannot open.",
    aiNote: "Welcome script delivery is unclear and membership options were not presented confidently. This is a hard launch blocker.",
    priority: "Urgent",
  },
  {
    id: "f6",
    staffName: "Emma Brooks",
    staffInitials: "EB",
    studio: "Austin",
    studioId: "austin",
    role: "Coach",
    issue: "Safety Cue Watchlist",
    detail: "Proactive safety corrections inconsistent across submissions.",
    aiNote: "Emma's class energy is strong but safety cues are given reactively after form issues appear. Needs coaching focus on proactive correction.",
    priority: "Medium",
  },
];

// ─── Submission Queue ─────────────────────────────────────────────────────────

export interface Submission {
  id: string;
  staffName: string;
  staffInitials: string;
  studio: string;
  studioId: string;
  role: string;
  submissionType: string;
  format: "Video" | "Voice";
  status: SubmissionStatus;
  score: number;
  aiResult: AIResult;
}

export const submissions: Submission[] = [
  {
    id: "s1",
    staffName: "Jenna White",
    staffInitials: "JW",
    studio: "Denver Launch",
    studioId: "denver-launch",
    role: "New Instructor",
    submissionType: "Certification class segment",
    format: "Video",
    status: "AI Reviewed",
    score: 5.9,
    aiResult: "Not Cleared",
  },
  {
    id: "s2",
    staffName: "Claire Bennett",
    staffInitials: "CB",
    studio: "SoHo",
    studioId: "soho",
    role: "Coach",
    submissionType: "Fortnightly class segment",
    format: "Video",
    status: "AI Reviewed",
    score: 6.9,
    aiResult: "Needs Coaching",
  },
  {
    id: "s3",
    staffName: "Rachel Kim",
    staffInitials: "RK",
    studio: "SoHo",
    studioId: "soho",
    role: "Front Desk",
    submissionType: "Membership sales roleplay",
    format: "Voice",
    status: "Needs Second Roleplay",
    score: 6.7,
    aiResult: "Needs Coaching",
  },
  {
    id: "s4",
    staffName: "Olivia Hayes",
    staffInitials: "OH",
    studio: "West Loop",
    studioId: "west-loop",
    role: "Lead Coach",
    submissionType: "Fortnightly class segment",
    format: "Video",
    status: "Approved",
    score: 9.2,
    aiResult: "Strong",
  },
  {
    id: "s5",
    staffName: "Noah Parker",
    staffInitials: "NP",
    studio: "Denver Launch",
    studioId: "denver-launch",
    role: "Front Desk",
    submissionType: "Welcome script roleplay",
    format: "Video",
    status: "AI Reviewed",
    score: 5.8,
    aiResult: "Not Cleared",
  },
  {
    id: "s6",
    staffName: "Emma Brooks",
    staffInitials: "EB",
    studio: "Austin",
    studioId: "austin",
    role: "Coach",
    submissionType: "Fortnightly class segment",
    format: "Video",
    status: "AI Reviewed",
    score: 7.8,
    aiResult: "Watchlist",
  },
];

// ─── Launch Gate ──────────────────────────────────────────────────────────────

export interface LaunchBlocker {
  name: string;
  initials: string;
  role: string;
  status: "Not Cleared" | "Pending";
}

export interface LaunchGate {
  studioId: string;
  studioName: string;
  readinessPercent: number;
  totalStaff: number;
  submitted: number;
  passed: number;
  pending: number;
  belowThreshold: number;
  blockers: LaunchBlocker[];
}

export const denverLaunchGate: LaunchGate = {
  studioId: "denver-launch",
  studioName: "Denver Launch",
  readinessPercent: 61,
  totalStaff: 13,
  submitted: 10,
  passed: 8,
  pending: 3,
  belowThreshold: 2,
  blockers: [
    { name: "Jenna White", initials: "JW", role: "New Instructor", status: "Not Cleared" },
    { name: "Maya Stone", initials: "MS", role: "New Instructor", status: "Not Cleared" },
    { name: "Noah Parker", initials: "NP", role: "Front Desk", status: "Not Cleared" },
    { name: "Leo Grant", initials: "LG", role: "New Instructor", status: "Pending" },
    { name: "Brooke Evans", initials: "BE", role: "Front Desk", status: "Pending" },
  ],
};

// ─── Coach Quality Trends ──────────────────────────────────────────────────────

export interface CoachTrend {
  id: string;
  name: string;
  initials: string;
  studio: string;
  studioId: string;
  trend: StaffTrend;
  scores: number[];
  alert?: string;
}

export const coachTrends: CoachTrend[] = [
  {
    id: "olivia-hayes",
    name: "Olivia Hayes",
    initials: "OH",
    studio: "West Loop",
    studioId: "west-loop",
    trend: "Stable",
    scores: [9.1, 9.3, 9.2, 9.2, 9.1, 9.3, 9.2, 9.2],
  },
  {
    id: "claire-bennett",
    name: "Claire Bennett",
    initials: "CB",
    studio: "SoHo",
    studioId: "soho",
    trend: "Declining",
    scores: [8.6, 8.4, 8.1, 7.8, 7.5, 7.2, 7.0, 6.9],
    alert: "Dropped 1.7 pts in 4 weeks",
  },
  {
    id: "daniel-carter",
    name: "Daniel Carter",
    initials: "DC",
    studio: "SoHo",
    studioId: "soho",
    trend: "Declining",
    scores: [7.5, 7.3, 7.2, 7.0, 6.8, 6.7, 6.6, 6.5],
    alert: "Below threshold for 2 consecutive submissions",
  },
  {
    id: "emma-brooks",
    name: "Emma Brooks",
    initials: "EB",
    studio: "Austin",
    studioId: "austin",
    trend: "Stable",
    scores: [7.9, 7.7, 7.8, 7.9, 7.8, 7.7, 7.8, 7.8],
    alert: "Safety cues watchlist",
  },
  {
    id: "marcus-lee",
    name: "Marcus Lee",
    initials: "ML",
    studio: "West Loop",
    studioId: "west-loop",
    trend: "Improving",
    scores: [7.4, 7.6, 7.8, 8.0, 8.2, 8.4, 8.5, 8.6],
  },
];

// ─── AI Review Stepper ────────────────────────────────────────────────────────

export interface ReviewStep {
  step: number;
  label: string;
  status: StepStatus;
  score?: number;
  detail?: string;
}

export const jennaWhiteReviewSteps: ReviewStep[] = [
  {
    step: 1,
    label: "Recording uploaded",
    status: "Complete",
    detail: "10-minute certification segment received.",
  },
  {
    step: 2,
    label: "Extracting transcript and class moments",
    status: "Complete",
    detail: "Warmup, movement cues, corrections, and closing moments identified.",
  },
  {
    step: 3,
    label: "Checking Class Opening",
    status: "Complete",
    score: 5.8,
    detail: "Warmup was started, but the instructor did not clearly explain class structure or member expectations.",
  },
  {
    step: 4,
    label: "Checking Cueing Quality",
    status: "Complete",
    score: 6.1,
    detail: "Movement instructions were understandable but inconsistent during transitions.",
  },
  {
    step: 5,
    label: "Checking Energy and Pacing",
    status: "Complete",
    score: 6.4,
    detail: "Energy was present, but pacing dropped during the middle section.",
  },
  {
    step: 6,
    label: "Checking Safety Cues",
    status: "In Progress",
    detail: "CoachIQ AI is checking whether corrections were proactive or only given after form issues appeared.",
  },
  {
    step: 7,
    label: "Checking Closing",
    status: "Pending",
  },
  {
    step: 8,
    label: "Generating readiness decision",
    status: "Pending",
  },
];

// ─── KPI Data ─────────────────────────────────────────────────────────────────

export const kpiData = {
  networkQualityScore: {
    value: 7.8,
    label: "Network Quality Score",
    sub: "Average across all studios",
    trend: "-0.4 from last month",
    state: "warning" as const,
  },
  memberRetention: {
    value: 84,
    label: "Member Retention",
    sub: "Network average",
    trend: "SoHo down 6%",
    state: "warning" as const,
  },
  coachesBelowThreshold: {
    value: 6,
    label: "Coaches Below Threshold",
    sub: "Below 8.0 quality score",
    trend: "2 declining quickly",
    state: "critical" as const,
  },
  submissionsDue: {
    value: 19,
    label: "Submissions Due",
    sub: "Across all studios",
    trend: "8 overdue",
    state: "warning" as const,
  },
  frontDeskReadiness: {
    value: 78,
    label: "Front-Desk Readiness",
    sub: "Network average",
    trend: "Cancellation handling weakest",
    state: "warning" as const,
  },
  launchGateStatus: {
    label: "Launch Gate Status",
    sub: "Denver blocked by 5 staff",
    trend: "61% readiness",
    state: "critical" as const,
  },
};
