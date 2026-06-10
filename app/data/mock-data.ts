// ─── Types ───────────────────────────────────────────────────────────────────

export type LocationStatus = "On Track" | "At Risk" | "Delayed" | "Ready for Review";
export type AuditRisk = "Low" | "Medium" | "High";
export type LocationType = "New Opening" | "Existing";
export type TaskStatus =
  | "Not Started"
  | "In Progress"
  | "Submitted"
  | "Approved"
  | "Rejected"
  | "Overdue"
  | "Blocked";
export type TaskPriority = "Urgent" | "High" | "Medium" | "Low";
export type EvidenceStatus =
  | "Not Submitted"
  | "Uploaded"
  | "Needs Review"
  | "Approved"
  | "Rejected"
  | "AI Reviewing"
  | "Needs Manager Review"
  | "Needs Retake";
export type BlockerSeverity = "Critical" | "High" | "Medium" | "Low";
export type ActivityType =
  | "ai_flag"
  | "evidence_upload"
  | "approval"
  | "training"
  | "submission"
  | "missed_deadline"
  | "review";

// ─── Location ────────────────────────────────────────────────────────────────

export interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  type: LocationType;
  readinessScore: number;
  status: LocationStatus;
  auditRisk: AuditRisk;
  openBlockers: number;
  missingEvidence: number;
  staffTraining: number;
  managerName: string;
  managerInitials: string;
  region: string;
  openingDate?: string;
  topBlocker: string;
  lastUpdate: string;
  completedTasks: number;
  totalTasks: number;
}

export const locations: Location[] = [
  {
    id: "austin-downtown",
    name: "BloomFit Austin Downtown",
    city: "Austin",
    state: "TX",
    type: "New Opening",
    readinessScore: 82,
    status: "At Risk",
    auditRisk: "Medium",
    openBlockers: 4,
    missingEvidence: 5,
    staffTraining: 76,
    managerName: "Emma Brooks",
    managerInitials: "EB",
    region: "South",
    openingDate: "July 18",
    topBlocker: "Final front desk script validation is incomplete",
    lastUpdate: "2 hours ago",
    completedTasks: 41,
    totalTasks: 50,
  },
  {
    id: "miami-brickell",
    name: "BloomFit Miami Brickell",
    city: "Miami",
    state: "FL",
    type: "Existing",
    readinessScore: 94,
    status: "On Track",
    auditRisk: "Low",
    openBlockers: 1,
    missingEvidence: 1,
    staffTraining: 91,
    managerName: "Daniel Carter",
    managerInitials: "DC",
    region: "South",
    topBlocker: "Annual safety certification renewal pending",
    lastUpdate: "35 min ago",
    completedTasks: 47,
    totalTasks: 50,
  },
  {
    id: "chicago-west-loop",
    name: "BloomFit Chicago West Loop",
    city: "Chicago",
    state: "IL",
    type: "New Opening",
    readinessScore: 61,
    status: "Delayed",
    auditRisk: "High",
    openBlockers: 9,
    missingEvidence: 12,
    staffTraining: 54,
    managerName: "Olivia Hayes",
    managerInitials: "OH",
    region: "Midwest",
    openingDate: "July 12",
    topBlocker: "Staff training and equipment setup are both behind schedule",
    lastUpdate: "Yesterday",
    completedTasks: 30,
    totalTasks: 50,
  },
  {
    id: "los-angeles-silver-lake",
    name: "BloomFit Los Angeles Silver Lake",
    city: "Los Angeles",
    state: "CA",
    type: "Existing",
    readinessScore: 88,
    status: "On Track",
    auditRisk: "Low",
    openBlockers: 2,
    missingEvidence: 3,
    staffTraining: 84,
    managerName: "Marcus Lee",
    managerInitials: "ML",
    region: "West",
    topBlocker: "Two minor brand standard updates need documentation",
    lastUpdate: "1 hour ago",
    completedTasks: 44,
    totalTasks: 50,
  },
  {
    id: "denver-rino",
    name: "BloomFit Denver RiNo",
    city: "Denver",
    state: "CO",
    type: "New Opening",
    readinessScore: 73,
    status: "At Risk",
    auditRisk: "Medium",
    openBlockers: 6,
    missingEvidence: 8,
    staffTraining: 69,
    managerName: "Hannah Reed",
    managerInitials: "HR",
    region: "West",
    openingDate: "July 20",
    topBlocker: "Opening day checklist has unresolved facility setup items",
    lastUpdate: "4 hours ago",
    completedTasks: 36,
    totalTasks: 50,
  },
  {
    id: "nashville-gulch",
    name: "BloomFit Nashville Gulch",
    city: "Nashville",
    state: "TN",
    type: "Existing",
    readinessScore: 91,
    status: "On Track",
    auditRisk: "Low",
    openBlockers: 1,
    missingEvidence: 2,
    staffTraining: 89,
    managerName: "Ava Morgan",
    managerInitials: "AM",
    region: "South",
    topBlocker: "Minor retail display update required per new brand guide",
    lastUpdate: "1 hour ago",
    completedTasks: 46,
    totalTasks: 50,
  },
  {
    id: "seattle-capitol-hill",
    name: "BloomFit Seattle Capitol Hill",
    city: "Seattle",
    state: "WA",
    type: "Existing",
    readinessScore: 79,
    status: "At Risk",
    auditRisk: "Medium",
    openBlockers: 5,
    missingEvidence: 6,
    staffTraining: 72,
    managerName: "Ethan Brooks",
    managerInitials: "EB2",
    region: "West",
    topBlocker: "Front desk greeting compliance verification pending",
    lastUpdate: "3 hours ago",
    completedTasks: 39,
    totalTasks: 50,
  },
  {
    id: "new-york-soho",
    name: "BloomFit New York SoHo",
    city: "New York",
    state: "NY",
    type: "New Opening",
    readinessScore: 57,
    status: "Delayed",
    auditRisk: "High",
    openBlockers: 11,
    missingEvidence: 15,
    staffTraining: 49,
    managerName: "Claire Bennett",
    managerInitials: "CB",
    region: "Northeast",
    openingDate: "July 10",
    topBlocker:
      "Opening readiness is blocked by missing evidence, incomplete training, and unresolved audit issues",
    lastUpdate: "2 days ago",
    completedTasks: 28,
    totalTasks: 50,
  },
];

// ─── Tasks (NY SoHo) ─────────────────────────────────────────────────────────

export interface Task {
  id: string;
  locationId: string;
  title: string;
  category: string;
  ownerName: string;
  ownerInitials: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  evidenceRequired: boolean;
  evidenceStatus?: EvidenceStatus;
  aiReviewStatus?: "Passed" | "Flagged" | "Pending" | "N/A";
}

export const nySohoTasks: Task[] = [
  {
    id: "t1",
    locationId: "new-york-soho",
    title: "Front Desk Staff Certification",
    category: "Staff Training",
    ownerName: "Maya Collins",
    ownerInitials: "MC",
    dueDate: "Jul 8",
    priority: "Urgent",
    status: "Overdue",
    evidenceRequired: true,
    evidenceStatus: "Not Submitted",
    aiReviewStatus: "Flagged",
  },
  {
    id: "t2",
    locationId: "new-york-soho",
    title: "Equipment Placement & Safety Check",
    category: "Equipment Setup",
    ownerName: "Ryan Foster",
    ownerInitials: "RF",
    dueDate: "Jul 9",
    priority: "High",
    status: "Submitted",
    evidenceRequired: true,
    evidenceStatus: "Approved",
    aiReviewStatus: "Passed",
  },
  {
    id: "t3",
    locationId: "new-york-soho",
    title: "Storage Room Organization",
    category: "Facility Setup",
    ownerName: "Jenna White",
    ownerInitials: "JW",
    dueDate: "Jul 7",
    priority: "High",
    status: "Rejected",
    evidenceRequired: true,
    evidenceStatus: "Rejected",
    aiReviewStatus: "Flagged",
  },
  {
    id: "t4",
    locationId: "new-york-soho",
    title: "Manager Final Sign-Off",
    category: "Final Audit Prep",
    ownerName: "Claire Bennett",
    ownerInitials: "CB",
    dueDate: "Jul 10",
    priority: "Urgent",
    status: "Blocked",
    evidenceRequired: false,
    aiReviewStatus: "N/A",
  },
  {
    id: "t5",
    locationId: "new-york-soho",
    title: "Brand Standards Compliance Check",
    category: "Brand Standards",
    ownerName: "Ava Stone",
    ownerInitials: "AS",
    dueDate: "Jul 9",
    priority: "High",
    status: "In Progress",
    evidenceRequired: true,
    evidenceStatus: "Uploaded",
    aiReviewStatus: "Pending",
  },
  {
    id: "t6",
    locationId: "new-york-soho",
    title: "Cleanliness & Sanitation Audit",
    category: "Cleanliness & Safety",
    ownerName: "Jenna White",
    ownerInitials: "JW",
    dueDate: "Jul 8",
    priority: "Medium",
    status: "Submitted",
    evidenceRequired: true,
    evidenceStatus: "Needs Manager Review",
    aiReviewStatus: "Passed",
  },
  {
    id: "t7",
    locationId: "new-york-soho",
    title: "Marketing Signage Installation",
    category: "Marketing Setup",
    ownerName: "Ava Stone",
    ownerInitials: "AS",
    dueDate: "Jul 9",
    priority: "Medium",
    status: "In Progress",
    evidenceRequired: true,
    evidenceStatus: "Not Submitted",
    aiReviewStatus: "N/A",
  },
  {
    id: "t8",
    locationId: "new-york-soho",
    title: "Coach Team Training Certification",
    category: "Staff Training",
    ownerName: "Maya Collins",
    ownerInitials: "MC",
    dueDate: "Jul 7",
    priority: "Urgent",
    status: "Overdue",
    evidenceRequired: true,
    evidenceStatus: "Not Submitted",
    aiReviewStatus: "Flagged",
  },
  {
    id: "t9",
    locationId: "new-york-soho",
    title: "Retail Display Setup",
    category: "Marketing Setup",
    ownerName: "Ava Stone",
    ownerInitials: "AS",
    dueDate: "Jul 10",
    priority: "Medium",
    status: "In Progress",
    evidenceRequired: true,
    evidenceStatus: "Uploaded",
    aiReviewStatus: "Pending",
  },
  {
    id: "t10",
    locationId: "new-york-soho",
    title: "Emergency Exit & Safety Signage",
    category: "Cleanliness & Safety",
    ownerName: "Ryan Foster",
    ownerInitials: "RF",
    dueDate: "Jul 8",
    priority: "High",
    status: "Approved",
    evidenceRequired: true,
    evidenceStatus: "Approved",
    aiReviewStatus: "Passed",
  },
  {
    id: "t11",
    locationId: "new-york-soho",
    title: "Opening Day Checklist Review",
    category: "Final Audit Prep",
    ownerName: "Claire Bennett",
    ownerInitials: "CB",
    dueDate: "Jul 10",
    priority: "Urgent",
    status: "Blocked",
    evidenceRequired: false,
    aiReviewStatus: "N/A",
  },
  {
    id: "t12",
    locationId: "new-york-soho",
    title: "Membership Sales Desk Setup",
    category: "Front Desk Readiness",
    ownerName: "Claire Bennett",
    ownerInitials: "CB",
    dueDate: "Jul 9",
    priority: "High",
    status: "In Progress",
    evidenceRequired: true,
    evidenceStatus: "Not Submitted",
    aiReviewStatus: "N/A",
  },
  {
    id: "t13",
    locationId: "new-york-soho",
    title: "Audio System & Music Licensing",
    category: "Facility Setup",
    ownerName: "Ryan Foster",
    ownerInitials: "RF",
    dueDate: "Jul 9",
    priority: "Medium",
    status: "In Progress",
    evidenceRequired: true,
    evidenceStatus: "Needs Review",
    aiReviewStatus: "Pending",
  },
  {
    id: "t14",
    locationId: "new-york-soho",
    title: "Franchise Compliance Documentation",
    category: "Final Audit Prep",
    ownerName: "Claire Bennett",
    ownerInitials: "CB",
    dueDate: "Jul 7",
    priority: "Urgent",
    status: "Overdue",
    evidenceRequired: true,
    evidenceStatus: "Not Submitted",
    aiReviewStatus: "Flagged",
  },
  {
    id: "t15",
    locationId: "new-york-soho",
    title: "Front Desk Greeting Script Sign-Off",
    category: "Front Desk Readiness",
    ownerName: "Maya Collins",
    ownerInitials: "MC",
    dueDate: "Jul 8",
    priority: "High",
    status: "In Progress",
    evidenceRequired: false,
    aiReviewStatus: "N/A",
  },
  {
    id: "t16",
    locationId: "new-york-soho",
    title: "Locker Room Inspection",
    category: "Facility Setup",
    ownerName: "Jenna White",
    ownerInitials: "JW",
    dueDate: "Jul 8",
    priority: "Medium",
    status: "In Progress",
    evidenceRequired: true,
    evidenceStatus: "Not Submitted",
    aiReviewStatus: "N/A",
  },
  {
    id: "t17",
    locationId: "new-york-soho",
    title: "POS System & Payment Setup",
    category: "Front Desk Readiness",
    ownerName: "Claire Bennett",
    ownerInitials: "CB",
    dueDate: "Jul 9",
    priority: "High",
    status: "In Progress",
    evidenceRequired: true,
    evidenceStatus: "Uploaded",
    aiReviewStatus: "Pending",
  },
  {
    id: "t18",
    locationId: "new-york-soho",
    title: "Cleaning Staff Onboarding",
    category: "Staff Training",
    ownerName: "Maya Collins",
    ownerInitials: "MC",
    dueDate: "Jul 10",
    priority: "Medium",
    status: "Not Started",
    evidenceRequired: false,
    aiReviewStatus: "N/A",
  },
];

// ─── Evidence ────────────────────────────────────────────────────────────────

export interface Evidence {
  id: string;
  locationId: string;
  taskId: string;
  taskTitle: string;
  type: "Photo" | "Video" | "Document" | "Training Proof";
  status: EvidenceStatus;
  submittedBy: string;
  submittedAt: string;
  aiConfidence?: number;
  aiNote: string;
}

export const nySohoEvidence: Evidence[] = [
  {
    id: "e1",
    locationId: "new-york-soho",
    taskId: "t3",
    taskTitle: "Storage Room Organization",
    type: "Photo",
    status: "Needs Retake",
    submittedBy: "Jenna White",
    submittedAt: "2 days ago",
    aiConfidence: 38,
    aiNote:
      "Image is blurry and doesn't show the full storage area. A retake from the entrance angle is needed.",
  },
  {
    id: "e2",
    locationId: "new-york-soho",
    taskId: "t2",
    taskTitle: "Equipment Placement & Safety Check",
    type: "Photo",
    status: "Approved",
    submittedBy: "Ryan Foster",
    submittedAt: "1 day ago",
    aiConfidence: 96,
    aiNote: "All equipment is correctly placed and safety markings are clearly visible.",
  },
  {
    id: "e3",
    locationId: "new-york-soho",
    taskId: "t5",
    taskTitle: "Brand Standards Compliance Check",
    type: "Document",
    status: "AI Reviewing",
    submittedBy: "Ava Stone",
    submittedAt: "3 hours ago",
    aiConfidence: 71,
    aiNote: "AI is currently analyzing the document for brand compliance gaps.",
  },
  {
    id: "e4",
    locationId: "new-york-soho",
    taskId: "t6",
    taskTitle: "Cleanliness & Sanitation Audit",
    type: "Photo",
    status: "Needs Manager Review",
    submittedBy: "Jenna White",
    submittedAt: "5 hours ago",
    aiConfidence: 84,
    aiNote: "Photos meet cleanliness standards. Ready for manager final approval.",
  },
  {
    id: "e5",
    locationId: "new-york-soho",
    taskId: "t13",
    taskTitle: "Audio System & Music Licensing",
    type: "Document",
    status: "Needs Review",
    submittedBy: "Ryan Foster",
    submittedAt: "6 hours ago",
    aiConfidence: 62,
    aiNote:
      "Licensing document appears incomplete — the third-party music service agreement is missing a signature.",
  },
  {
    id: "e6",
    locationId: "new-york-soho",
    taskId: "t17",
    taskTitle: "POS System & Payment Setup",
    type: "Photo",
    status: "Needs Manager Review",
    submittedBy: "Claire Bennett",
    submittedAt: "4 hours ago",
    aiConfidence: 88,
    aiNote: "POS setup looks complete. Payment terminal placement matches brand guide.",
  },
];

// ─── Blockers ─────────────────────────────────────────────────────────────────

export interface Blocker {
  id: string;
  locationId: string;
  title: string;
  detail: string;
  severity: BlockerSeverity;
  recommendedAction: string;
  daysOpen: number;
}

export const nySohoBlockers: Blocker[] = [
  {
    id: "b1",
    locationId: "new-york-soho",
    title: "Staff Training Below 50%",
    detail:
      "Only 49% of staff have completed required certification modules. Opening requires 80%+ completion.",
    severity: "Critical",
    recommendedAction: "Schedule emergency training sessions for the next 3 days.",
    daysOpen: 5,
  },
  {
    id: "b2",
    locationId: "new-york-soho",
    title: "15 Missing Evidence Items",
    detail:
      "Photos, documents, and training proofs for 15 required tasks have not been submitted.",
    severity: "Critical",
    recommendedAction: "Assign evidence uploads to team leads with a 24-hour deadline.",
    daysOpen: 4,
  },
  {
    id: "b3",
    locationId: "new-york-soho",
    title: "Final Audit Prep at 42%",
    detail:
      "Franchise compliance documentation and opening day checklist are overdue or blocked.",
    severity: "High",
    recommendedAction: "Claire Bennett to prioritize sign-off on all audit prep tasks.",
    daysOpen: 3,
  },
  {
    id: "b4",
    locationId: "new-york-soho",
    title: "Storage Room Evidence Rejected",
    detail:
      "AI flagged the storage room photo as insufficient — a new photo submission is required.",
    severity: "High",
    recommendedAction: "Jenna White to retake and resubmit storage room evidence today.",
    daysOpen: 2,
  },
  {
    id: "b5",
    locationId: "new-york-soho",
    title: "Manager Sign-Off Blocked",
    detail:
      "The manager final sign-off task is blocked pending resolution of 3 upstream tasks.",
    severity: "High",
    recommendedAction:
      "Resolve front desk certification and audit documentation before requesting sign-off.",
    daysOpen: 2,
  },
  {
    id: "b6",
    locationId: "new-york-soho",
    title: "Opening Date Risk",
    detail:
      "At current pace, this location cannot reach 80% readiness before the July 10 opening date.",
    severity: "Critical",
    recommendedAction:
      "Escalate to Sarah Mitchell and consider a short opening date postponement.",
    daysOpen: 1,
  },
];

// ─── Activity Feed ─────────────────────────────────────────────────────────────

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  timestamp: string;
  locationName: string;
  user?: string;
}

export const recentActivities: Activity[] = [
  {
    id: "a1",
    type: "ai_flag",
    title: "AI flagged New York SoHo as delayed",
    timestamp: "2 days ago",
    locationName: "BloomFit New York SoHo",
    user: "OpsPilot AI",
  },
  {
    id: "a2",
    type: "evidence_upload",
    title: "Miami Brickell uploaded cleaning checklist evidence",
    timestamp: "35 min ago",
    locationName: "BloomFit Miami Brickell",
    user: "Daniel Carter",
  },
  {
    id: "a3",
    type: "approval",
    title: "Sarah Mitchell approved Nashville Gulch front desk readiness",
    timestamp: "1 hr ago",
    locationName: "BloomFit Nashville Gulch",
    user: "Sarah Mitchell",
  },
  {
    id: "a4",
    type: "training",
    title: "Austin Downtown completed 4 staff training modules",
    timestamp: "2 hrs ago",
    locationName: "BloomFit Austin Downtown",
    user: "Emma Brooks",
  },
  {
    id: "a5",
    type: "evidence_upload",
    title: "Denver RiNo submitted facility setup photos",
    timestamp: "4 hrs ago",
    locationName: "BloomFit Denver RiNo",
    user: "Hannah Reed",
  },
  {
    id: "a6",
    type: "missed_deadline",
    title: "Chicago West Loop missed staff certification deadline",
    timestamp: "Yesterday",
    locationName: "BloomFit Chicago West Loop",
    user: "Olivia Hayes",
  },
  {
    id: "a7",
    type: "submission",
    title: "Seattle Capitol Hill submitted front desk greeting checklist",
    timestamp: "3 hrs ago",
    locationName: "BloomFit Seattle Capitol Hill",
    user: "Ethan Brooks",
  },
  {
    id: "a8",
    type: "evidence_upload",
    title: "Los Angeles Silver Lake submitted retail display evidence",
    timestamp: "1 hr ago",
    locationName: "BloomFit Los Angeles Silver Lake",
    user: "Marcus Lee",
  },
];

// ─── Readiness Categories (NY SoHo) ──────────────────────────────────────────

export interface ReadinessCategory {
  name: string;
  score: number;
  status: LocationStatus | "Needs Review";
  issues: number;
}

export const nySohoReadinessCategories: ReadinessCategory[] = [
  { name: "Staff Training", score: 49, status: "Delayed", issues: 6 },
  { name: "Front Desk Readiness", score: 58, status: "At Risk", issues: 4 },
  { name: "Facility Setup", score: 64, status: "At Risk", issues: 5 },
  { name: "Equipment Setup", score: 72, status: "Needs Review", issues: 3 },
  { name: "Brand Standards", score: 61, status: "At Risk", issues: 4 },
  { name: "Cleanliness & Safety", score: 83, status: "On Track", issues: 2 },
  { name: "Marketing Setup", score: 76, status: "Needs Review", issues: 2 },
  { name: "Final Audit Prep", score: 42, status: "Delayed", issues: 7 },
];

// ─── Manager Notes ────────────────────────────────────────────────────────────

export interface ManagerNote {
  id: string;
  author: string;
  authorInitials: string;
  role: string;
  timestamp: string;
  content: string;
  isAI?: boolean;
}

export const nySohoNotes: ManagerNote[] = [
  {
    id: "n1",
    author: "Sarah Mitchell",
    authorInitials: "SM",
    role: "VP of Operations",
    timestamp: "2 days ago",
    content:
      "This location needs immediate attention. Staff training is critically behind — please escalate to Maya and ensure all certification modules are completed before July 9.",
  },
  {
    id: "n2",
    author: "Claire Bennett",
    authorInitials: "CB",
    role: "Store Manager",
    timestamp: "1 day ago",
    content:
      "Acknowledged. We've scheduled back-to-back training sessions for July 8–9. Evidence uploads are being coordinated with Ryan and Jenna this afternoon.",
  },
  {
    id: "n3",
    author: "OpsPilot AI",
    authorInitials: "AI",
    role: "AI Assistant",
    timestamp: "12 hours ago",
    content:
      "Based on current completion rate, training will reach 68% by July 9 — still below the 80% threshold. I recommend requesting a 48-hour opening extension and focusing exclusively on front desk certification and audit documentation today.",
    isAI: true,
  },
  {
    id: "n4",
    author: "Sarah Mitchell",
    authorInitials: "SM",
    role: "VP of Operations",
    timestamp: "10 hours ago",
    content:
      "Opening date extension approved to July 12. All hands on training and evidence gaps. I'll check back tomorrow morning.",
  },
];

// ─── Team Members (NY SoHo) ───────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  completedTasks: number;
  totalTasks: number;
  status: "On Track" | "At Risk" | "Behind";
}

export const nySohoTeam: TeamMember[] = [
  {
    id: "tm1",
    name: "Claire Bennett",
    initials: "CB",
    role: "Store Manager",
    completedTasks: 8,
    totalTasks: 14,
    status: "Behind",
  },
  {
    id: "tm2",
    name: "Maya Collins",
    initials: "MC",
    role: "Training Lead",
    completedTasks: 5,
    totalTasks: 10,
    status: "Behind",
  },
  {
    id: "tm3",
    name: "Ryan Foster",
    initials: "RF",
    role: "Facilities Lead",
    completedTasks: 9,
    totalTasks: 12,
    status: "At Risk",
  },
  {
    id: "tm4",
    name: "Jenna White",
    initials: "JW",
    role: "Operations Associate",
    completedTasks: 4,
    totalTasks: 8,
    status: "Behind",
  },
  {
    id: "tm5",
    name: "Ava Stone",
    initials: "AS",
    role: "Marketing Coordinator",
    completedTasks: 2,
    totalTasks: 6,
    status: "At Risk",
  },
];

// ─── KPI Data ─────────────────────────────────────────────────────────────────

export const kpiData = {
  overallReadiness: { value: 78, label: "Overall Readiness", sub: "Across 18 U.S. locations", delta: "+6% from last week" },
  locationsAtRisk: { value: 5, label: "Locations At Risk", sub: "Need manager attention", note: "2 delayed openings" },
  missingEvidence: { value: 52, label: "Missing Evidence", sub: "Photos, videos, and documents pending", note: "15 overdue" },
  criticalBlockers: { value: 14, label: "Critical Blockers", sub: "Blocking audit readiness", note: "3 urgent this week" },
  trainingCompletion: { value: 74, label: "Training Completion", sub: "Average staff readiness", note: "Below 80% target" },
  readyForReview: { value: 6, label: "Ready for Review", sub: "Locations awaiting manager approval", note: "+2 today" },
};

// ─── AI Priority Queue ────────────────────────────────────────────────────────

export interface PriorityItem {
  id: string;
  rank: number;
  priority: TaskPriority;
  title: string;
  detail: string;
  action: string;
  locationId?: string;
}

export const aiPriorityQueue: PriorityItem[] = [
  {
    id: "p1",
    rank: 1,
    priority: "Urgent",
    title: "Review New York SoHo opening readiness",
    detail: "11 blockers · 15 missing evidence · training <50%",
    action: "View Location",
    locationId: "new-york-soho",
  },
  {
    id: "p2",
    rank: 2,
    priority: "High",
    title: "Resolve Chicago West Loop training gap",
    detail: "54% training — below 80% target",
    action: "Review Training",
    locationId: "chicago-west-loop",
  },
  {
    id: "p3",
    rank: 3,
    priority: "High",
    title: "Approve Austin Downtown front desk script",
    detail: "Approval pending since July 8",
    action: "Review Task",
    locationId: "austin-downtown",
  },
  {
    id: "p4",
    rank: 4,
    priority: "Medium",
    title: "Request Denver RiNo facility evidence",
    detail: "8 missing items · opening July 20",
    action: "Request Evidence",
    locationId: "denver-rino",
  },
  {
    id: "p5",
    rank: 5,
    priority: "Medium",
    title: "Validate Seattle Capitol Hill greeting compliance",
    detail: "Checklist submitted — needs review",
    action: "View Checklist",
    locationId: "seattle-capitol-hill",
  },
];

// ─── Suggested AI Questions ───────────────────────────────────────────────────

export const aiSuggestedQuestions = [
  "Which location is falling behind?",
  "What should we fix first?",
  "Are we ready for audit?",
  "What changed today?",
];
