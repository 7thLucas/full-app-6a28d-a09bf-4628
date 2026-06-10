# OpsPilot AI — Product Overview

## What It Is

OpsPilot AI is an AI-powered operations readiness command center for franchise and multi-location businesses. It gives operations leaders a single place to know whether every location is actually ready — compliant, staffed, trained, and executing the brand standard correctly.

The product is not a checklist app. It is a smart operational control room.

## Core Positioning

> "Know which locations are ready, which ones are falling behind, and what needs to be fixed before it becomes a problem."

## Product Category

AI Operations Readiness Platform

---

## Target Users

1. **Franchise Owners** — want every branch executing properly without manually chasing managers
2. **VP of Operations** — command center for all locations, blockers, audit risk, and readiness progress
3. **Area Managers** — know which branches need attention today
4. **Store Managers** — complete checklists, upload evidence, resolve issues
5. **Opening Teams** — prepare new locations before launch day
6. **Brand Auditors** — verify locations are following brand standards
7. **Staff Members** — assigned tasks and evidence requirements

---

## Key Capabilities

- **Operations Readiness Dashboard** — real-time readiness scores, KPIs, and risk signals across all locations in one view
- **Location Readiness Tracking** — per-location readiness score, audit risk, open blockers, missing evidence, staff training %, and last update
- **AI Operational Summary** — AI-generated summaries flagging highest-risk locations, most improved, and what needs review
- **Risk & Blocker Intelligence** — surfaced risk cards showing the most critical blockers, training gaps, evidence delays, and compliance issues
- **Checklist Management** — build, assign, and track operational checklists for every location and role
- **Evidence Review** — upload and review photos, videos, and documents before locations are marked audit-ready
- **Staff Training Tracking** — monitor training completion, role readiness, and team-level compliance
- **AI Assistant** — natural-language Q&A about progress, blockers, risk, and prioritized next actions
- **Reports** — weekly readiness reports, audit summaries, and prioritized action plans
- **Activity Feed** — real-time log of what changed, who approved, what was flagged, and what was submitted

## What Managers Can Instantly See

- Which locations are ready
- Which locations are falling behind
- Which locations are at risk
- Which tasks are overdue
- Which evidence is missing
- Which staff training items are incomplete
- Which blockers could delay opening
- Which locations are likely to fail an audit
- What to fix first

---

## Demo Company

**BloomFit Studios**
- Business type: Premium boutique fitness studio franchise
- Market: United States
- Locations managed: 18 locations across the United States
- 5 new locations currently in preparation for opening
- Brand personality: Premium, clean, modern, operationally strict, service-focused, wellness-oriented

## Main Demo User

**Sarah Mitchell**
- Role: VP of Operations
- Company: BloomFit Studios
- Avatar: Initials "SM" (circular)
- Responsibilities: operational readiness, opening preparation, checklist completion, training compliance, brand audit readiness, and issue resolution across all BloomFit Studios locations

---

## App Name & Branding

- **App name**: OpsPilot AI
- **Tagline**: AI Ops Platform
- **Style**: Premium modern SaaS — inspired by Linear, Stripe Dashboard, Vercel, Notion, Attio
- **Background**: Soft white / very light gray (#F8FAFC)
- **Primary accent**: Modern blue (#2563EB / blue-600) — used for buttons, AI elements, selected states, progress highlights
- **Text**: Dark navy or charcoal (slate-900 / slate-800)
- **Cards**: Rounded corners, soft borders (slate-200), subtle shadows, clean spacing
- **Typography**: Clean sans-serif, strong hierarchy, large numbers for KPI metrics, smaller muted labels for supporting text
- **Tone of voice**: Operational, confident, helpful, direct — premium without being corporate

### Avoid
- Harsh gradients, neon / cyberpunk colors
- Generic enterprise admin templates
- Cluttered cards or too many colors
- Fake-looking placeholder design

---

## Key Dashboard Metrics (Demo Data)

| Metric | Value | Context |
|---|---|---|
| Overall Readiness | 78% | Across 18 U.S. locations |
| Locations at Risk | 5 | Need manager attention |
| Missing Evidence | 52 items | 15 overdue |
| Critical Blockers | 14 | 3 urgent this week |

## Demo Locations (8 active in dashboard)

| Location | City, State | Type | Readiness | Status | Audit Risk | Blockers | Missing Evidence | Staff Training |
|---|---|---|---|---|---|---|---|---|
| BloomFit Austin Downtown | Austin, TX | New Opening | 82% | At Risk | Medium | 4 | 5 | 76% |
| BloomFit Miami Brickell | Miami, FL | Existing | 94% | On Track | Low | 1 | 1 | 91% |
| BloomFit Chicago West Loop | Chicago, IL | New Opening | 61% | Delayed | High | 9 | 12 | 54% |
| BloomFit Los Angeles Silver Lake | Los Angeles, CA | Existing | 88% | On Track | Low | 2 | 3 | 84% |
| BloomFit Denver RiNo | Denver, CO | New Opening | 73% | At Risk | Medium | 6 | 8 | 69% |
| BloomFit Nashville Gulch | Nashville, TN | Existing | 91% | On Track | Low | 1 | 2 | 89% |
| BloomFit Seattle Capitol Hill | Seattle, WA | Existing | 79% | At Risk | Medium | 5 | 6 | 72% |
| BloomFit New York SoHo | New York, NY | New Opening | 57% | Delayed | High | 11 | 15 | 49% |

### AI Summary Highlights (Demo)
- **Highest risk**: BloomFit Chicago West Loop & BloomFit New York SoHo
- **Most improved**: BloomFit Austin Downtown
- **Needs review**: BloomFit New York SoHo

---

## Data Model (Mock Objects)

**Location**: id, name, city, state, type, readinessScore, status, auditRisk, openBlockers, completedTasks, totalTasks, missingEvidence, staffTraining, lastUpdate, topBlocker

**Task**: id, locationId, title, category, owner, dueDate, status, priority, evidenceRequired

**Evidence**: id, locationId, taskId, type, status, submittedBy, submittedAt, aiNote

**User**: id, name, role, location, initials

**Activity**: id, type, title, timestamp, locationName

---

## Build Roadmap (5-Prompt Plan)

| Prompt | Scope |
|---|---|
| 1 (current) | Full app shell, dashboard, navigation, visual identity, demo data, reusable components |
| 2 | Locations page — full detail view per location |
| 3 | Checklists + Evidence Review workflows |
| 4 | Full AI Assistant chatbot |
| 5 | Reports + advanced AI features |

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Mock data (no real backend)
- Desktop-first (optimized for 1440px), responsive for tablet/mobile

---

## Reusable Components

AppSidebar, TopHeader, KPICard, StatusChip, RiskChip, ProgressBar, LocationReadinessTable, LocationRow, AIInsightCard, RiskBlockerCard, ActivityFeed, ActivityItem, AssistantTeaser, PlaceholderPage, EmptyStateCard, PageContainer
