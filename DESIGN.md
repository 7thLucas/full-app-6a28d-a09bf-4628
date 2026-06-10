# OpsPilot AI — Design Guidelines

## Visual Identity

**Inspiration**: Linear, Stripe Dashboard, Vercel, Attio — premium modern SaaS

**Avoid**: Harsh gradients, neon/cyberpunk colors, generic enterprise admin templates, cluttered cards, fake-looking placeholders

---

## Color System

| Role | Token | Hex |
|---|---|---|
| Background | slate-50 | #F8FAFC |
| Card surface | white | #FFFFFF |
| Border | slate-200 | #E2E8F0 |
| Primary accent | blue-600 | #2563EB |
| Primary hover | blue-700 | #1D4ED8 |
| Text primary | slate-900 | #0F172A |
| Text secondary | slate-600 | #475569 |
| Text muted | slate-400 | #94A3B8 |

### Status Color Mapping

| Status | Color | Tailwind |
|---|---|---|
| On Track / Approved / Passed | Green | green-500 / green-100 bg |
| At Risk / Medium / Needs Review | Amber | amber-500 / amber-100 bg |
| Delayed / Overdue / Rejected / High | Red | red-500 / red-100 bg |
| Urgent / Critical | Dark red | red-700 / red-200 bg |
| In Progress / Uploaded / Needs Manager Review | Blue | blue-500 / blue-100 bg |
| Not Started / Not Required | Gray | slate-400 / slate-100 bg |

---

## Typography

- **Font**: System sans-serif stack (Inter-like)
- **Page titles**: text-2xl font-semibold slate-900
- **Section headers**: text-lg font-semibold slate-800
- **KPI numbers**: text-3xl font-bold slate-900
- **KPI labels**: text-sm font-medium slate-600
- **Table headers**: text-xs font-medium uppercase tracking-wide slate-500
- **Body**: text-sm slate-700
- **Muted**: text-xs slate-400

---

## Layout

- **Sidebar width**: 240px fixed
- **Page padding**: px-6 py-6 (desktop)
- **Card padding**: p-5 or p-6
- **Grid gaps**: gap-4 or gap-6
- **Border radius**: rounded-xl for cards, rounded-lg for buttons, rounded-full for chips/badges

---

## Components

### AppSidebar
- Fixed left, 240px wide
- Background: white, right border slate-200
- Wordmark: "OpsPilot AI" bold + "AI Ops Platform" badge (blue-100, blue-700 text)
- Nav item: flex row, icon (20px), label, 40px height, rounded-lg hover:bg-slate-50
- Active state: bg-blue-50, text-blue-700, icon blue-600
- Bottom: user card with SM avatar (blue-600 bg, white text), name, role, company
- Smooth transitions on hover

### TopHeader
- Sticky top, full width after sidebar
- Left: page title (2xl semibold), subtitle (sm slate-500), status line (xs slate-400)
- Right: action buttons (primary blue, secondary outlined)
- Border-bottom slate-200, bg-white, px-6 py-4

### KPICard
- White card, rounded-xl, border slate-200, p-5
- Top row: label (sm slate-600) + icon (right)
- Main number: 3xl bold slate-900
- Supporting line: sm slate-500
- Delta badge: xs, green for positive, red for negative
- Animated count-up on mount

### StatusChip
- Inline pill, rounded-full, px-2.5 py-0.5, text-xs font-medium
- Colors follow status color mapping above

### RiskChip
- Same as StatusChip but for audit risk (Low/Medium/High)

### PriorityChip
- Urgent: red-700 bg-red-100, High: red-500 bg-red-50, Medium: amber-500 bg-amber-50, Low: slate-400 bg-slate-100

### ProgressBar
- Full-width, h-1.5 or h-2, rounded-full
- Background: slate-100, fill: blue-500
- Animated width on mount
- Color variants: green-500 (>85%), blue-500 (65–84%), amber-500 (50–64%), red-500 (<50%)

### LocationCard (Locations page)
- White card, rounded-xl, border, p-5
- Hover: shadow-md, -translate-y-0.5, transition-all 200ms
- Shows: name, city/state, type chip, readiness %, progress bar, status chip, audit risk chip, blockers, missing evidence, training %, manager, last update, top blocker, View button

### AISituationBanner
- Blue-tinted card (blue-50 bg, blue-200 border)
- Sparkle icon + "AI Situation Brief" bold title
- Timestamp label muted
- Message body
- 4 insight chips (rounded-full, blue-100 bg, blue-700 text, xs)
- Two action buttons

### AIInsightCard (AI Priority Queue)
- White card with left accent border (blue-500)
- Rank number, priority chip, title, suggested action
- Hover: bg-slate-50

### ActivityFeed
- Vertical list, each item: icon circle + title + timestamp
- Icon color varies by activity type

### TaskDetailDrawer
- Right-side slide-in panel, 420px wide
- Overlay backdrop
- Task title, category, owner, due date, priority, status
- Evidence preview placeholder
- AI note (blue-tinted)
- Action buttons: Approve (green), Reject (red), Request Retake (amber), Add Comment (outline)

### ToastNotification
- Bottom-right, slide-in animation
- Green for success, blue for info, red for error
- Auto-dismiss 3–4 seconds

---

## Interactions & Animations

- **Page transition**: fade + translateY(-8px → 0), 250–350ms ease-out
- **KPI count-up**: 0 → final value, 800ms, ease-out
- **Progress bars**: width 0 → final, 600ms, ease-out, staggered by index
- **Table rows**: staggered fade-in + translateY, 30ms delay per row
- **Card hover**: shadow-md + -translate-y-0.5, 200ms transition-all
- **Button hover**: darken background, 150ms
- **Drawer open**: translateX(100% → 0), 300ms ease-out
- **Toast**: slide in from right, auto-dismiss with fade-out

---

## Page Layout Shell

```
[Sidebar 240px] | [Main content area, flex-1]
                     [TopHeader sticky]
                     [Page content, overflow-y-auto]
```

Main content background: bg-slate-50
Cards: bg-white
Consistent horizontal padding: px-6
Vertical rhythm: gap-6 between sections