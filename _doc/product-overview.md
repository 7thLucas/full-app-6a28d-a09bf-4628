# CoachIQ — Product Overview

## What It Is

CoachIQ is an AI-powered staff quality monitoring and readiness platform for boutique fitness franchise operators. It helps franchise owners measure, monitor, and improve coach and front-desk quality through AI-reviewed recordings — preventing member churn caused by inconsistent staff delivery before it shows up in retention numbers.

The product is not a scheduling tool, a compliance audit tool, or a generic operations platform. It is a staff quality command center built specifically for multi-studio fitness operators.

## Core Positioning

> "CoachIQ helps studio owners measure staff quality before it shows up as member churn."

> "Your LMS says they completed training. CoachIQ checks if they can actually deliver the standard."

## Product Category

AI-Powered Fitness Staff Quality Platform

---

## Target Users

1. **Franchise Owner / Founder** — needs consistent coach and front-desk quality across every studio without being on-site every day
2. **Studio Manager** — monitors their studio's coach scores, flags, submission queue, and launch readiness in one view
3. **Head Coach / Lead Trainer** — reviews AI coaching notes for their team, tracks score trends, and surfaces improvement priorities
4. **Front Desk Lead** — manages front-desk staff readiness scores, scenario results, and AI flag alerts

---

## Four Core Modules

### Module 1 — Instructor Certification Readiness

New instructors must submit a 10–15 minute recorded class segment, role-play video, audio file, or pasted/uploaded transcript before being cleared to teach live members. CoachIQ AI analyzes the submitted content against the BloomFit Instructor Certification Standard. This is a **real AI processing pipeline** — not mock scoring.

**Submission Input Types (4 methods)**
1. **Upload Video** — MP4, MOV, WebM · Up to 1 GB · AI extracts audio, generates transcript, optionally analyzes visual teaching behavior if supported
2. **Upload Audio** — MP3, WAV, M4A · AI generates transcript, detects instructor cues, classifies rubric moments
3. **Paste Transcript** — Class segment transcript pasted directly · Timestamps recommended but optional
4. **Upload Transcript File** — TXT, DOCX, or PDF · AI extracts and parses content

**Review Modes**
- **Real AI Review** — Analyzes actual uploaded or pasted content; never uses hardcoded scoring; if AI pipeline is unavailable shows honest error: "Real CoachIQ AI scoring is not connected yet."
- **Demo Sample Review** — Uses preloaded static examples (Jenna White, Maya Stone, Samantha Reed); results always labeled "Demo Sample"

**AI Processing Pipeline (13 steps)**
1. Validating submission
2. Extracting audio or transcript
3. Generating transcript
4. Detecting class moments (opening · warmup · cueing · transition · safety cue · modification · cooldown · closing)
5. Mapping evidence to rubric
6. Scoring Class Opening
7. Scoring Cueing Quality
8. Scoring Energy and Pacing
9. Scoring Safety Cues
10. Scoring Closing
11. Calculating readiness status
12. Generating coaching recommendations
13. Updating instructor profile

**AI Scoring Criteria — BloomFit Instructor Certification Standard**
Each criterion scored 0–10 using 5 subchecks worth 0–2 points each. Default weighting: 20% per criterion.

1. **Class Opening** — warm welcome or confident start · explains class format or session objective · explains warmup purpose · sets intensity/pacing/focus expectations · gives clear first movement setup
2. **Cueing Quality** — movement setup is clear · includes body position and alignment · tempo/direction/range of motion explained · transitions cued before movement begins · language specific, concise, and easy to follow
3. **Energy and Pacing** — energy matches class format · pacing is consistent and appropriate · transitions are smooth · instructor maintains presence through the segment · intensity changes are clear
4. **Safety Cues** — proactive safety cues before risky movements · offers modifications and regressions · specific alignment and form reminders · mentions what to avoid or how to reduce risk · cues breath, control, posture, or range appropriately
5. **Closing** — cooldown or downshift is delivered · closing feels intentional and not abrupt · instructor acknowledges effort or thanks members · gives recovery/next-step/post-class guidance · mentions next class, follow-up, or member support

**Readiness Decision Rules**

| Status | Condition | Scheduling |
|---|---|---|
| Cleared | Overall ≥ 8.0 AND every criterion ≥ 7.5 | Unlocked |
| Needs Resubmission | Overall 7.0–7.9 OR any criterion < 7.5 | Blocked |
| Not Cleared | Overall < 7.0 | Blocked |
| Insufficient Evidence | Content too short, unclear, or unanalyzable | No Decision |

**Certification Badge** — Issued on Cleared status. Title: "Certified to Teach". Displayed on instructor profile with valid-through date.

**Confidence System** — Every AI result includes a numeric confidence score (0–100%) and label: Very High · High · Medium · Low.

**Analysis Basis Labels** — The app always discloses exactly how the result was derived:
- "Analysis based on transcript."
- "Analysis based on AI-generated transcript from audio."
- "Analysis based on transcript extracted from video audio."
- "Analysis based on transcript and visual video review."
- If visual AI unavailable: "Visual movement analysis is not connected yet."
- If transcription failed: "Transcript could not be generated. Paste transcript manually."
- If transcript too short: "Insufficient evidence for certification scoring."
- If no AI connected: "Real CoachIQ AI scoring is not connected yet."

**Outcomes:** Cleared · Needs Resubmission · Not Cleared · Insufficient Evidence · Manager Review

**Certification Page Metrics (5 KPI cards)**

| KPI | Value | Subtitle |
|---|---|---|
| Certification Readiness | 63% | 3 of 8 cleared |
| Awaiting AI Review | 2 | Submitted videos waiting for scoring |
| Not Cleared | 3 | Cannot be scheduled yet |
| Average Readiness Score | 7.2 / 10 | Below 8.0 threshold |
| Certification Threshold | 8.0 / 10 | No criterion below 7.5 |

**Certification Queue (8 instructors)**

| Instructor | Studio | Format | Input Type | AI Status | Score | Cert Status | Scheduling |
|---|---|---|---|---|---|---|---|
| Jenna White | Denver Launch | Pilates | Video | AI Reviewed | 5.9 / 10 | Not Cleared | Blocked |
| Maya Stone | Denver Launch | HIIT | Video | AI Reviewed | 7.4 / 10 | Needs Resubmission | Blocked |
| Leo Grant | Denver Launch | Strength | Pending | Pending Submission | N/A | Pending | Blocked |
| Brooke Evans | Denver Launch | Yoga | Video | Awaiting AI Review | Pending | Manager Review | Blocked |
| Taylor Brooks | Austin | HIIT | Transcript | AI Reviewed | 8.3 / 10 | Cleared | Unlocked |
| Samantha Reed | Miami | Pilates | Video | AI Reviewed | 8.7 / 10 | Cleared | Unlocked |
| Nora Blake | SoHo | Yoga | Audio | AI Processing | Analyzing | In Review | Blocked |
| Miles Carter | West Loop | Recovery | Transcript | AI Reviewed | 8.1 / 10 | Cleared | Unlocked |

**Demo Sample Mode** — Three preloaded demos available for presentation/screen recording (all labeled "Demo Sample"):
- **Failed Demo**: Jenna White · 5.9 / 10 · Not Cleared — Opening: 5.8, Cueing: 6.1, Energy: 6.4, Safety: 5.6, Closing: 6.0
- **Resubmission Demo**: Maya Stone · 7.4 / 10 · Needs Resubmission — Opening: 7.8, Cueing: 7.6, Energy: 8.2, Safety: 6.9, Closing: 6.7
- **Passed Demo**: Samantha Reed · 8.7 / 10 · Cleared — Opening: 8.8, Cueing: 8.6, Energy: 8.5, Safety: 8.7, Closing: 8.9

---

### Module 2 — Ongoing Quality Monitoring
All coaches submit one recorded class segment every two weeks. AI scores each submission against the same 5-criteria coaching rubric and tracks trends across the last 8 submissions. An alert fires if a score drops more than 1.5 points in the last 4 weeks.

**Per-submission AI output:** current score · score trend · improving / stable / declining · coaching note (one strength, one improvement, one specific cue to try)

---

### Module 3 — Front-Desk Compliance Tracker
Front-desk staff submit voice or video role-plays for service quality review.

**Scenario types:** Welcome Script · Membership Sales Conversation · Cancellation Handling

**AI Service Rubric:**
1. Guest greeted within 30 seconds
2. Name used at least twice
3. Studio tour offered
4. Membership options explained clearly
5. Objection handled without discounting immediately
6. Next step confirmed before guest leaves

**Outcomes:** Ready · Needs Second Roleplay · Not Cleared · Pending Scenario · Manager Review
Staff below 8.0 threshold are flagged for a second role-play before handling real walk-ins.

---

### Module 4 — Studio Launch Readiness Gate
Before a new studio opens, every staff member must submit and pass the required role-play or class segment. A studio cannot be marked **Launch Approved** until 100% of required staff have passed.

**Tracked:** total staff · submitted · passed · pending · below threshold · launch readiness % · blocking staff · daily owner summary email

---

## Demo Company

**BloomFit Studios**
- Business type: Boutique fitness franchise
- Market: United States
- Studios managed: 5 studios
- Staff: 30 coaches, 12 front-desk staff (42 total)
- Class formats: Pilates, Yoga, HIIT, Strength, Recovery
- Primary business metric: Member retention
- Brand personality: Premium, energetic, clean, modern, member-focused, quality-obsessed, coaching-driven, polished, warm, consistent

## Main Demo User

**Sarah Mitchell**
- Role: Founder & Owner
- Company: BloomFit Studios
- Avatar: Initials "SM" (circular, no photo)
- Main concern: Inconsistent coach and front-desk quality across studios

---

## App Name & Branding

- **App name**: CoachIQ
- **Subtitle**: Staff quality monitoring and readiness platform for multi-studio fitness operators
- **Badge**: AI Staff Quality Platform
- **Style**: Premium fitness SaaS — inspired by Whoop, Linear, Mindbody Pro
- **Background**: Clean white (#FFFFFF / slate-50)
- **Primary accent**: Deep indigo (#4F46E5 / indigo-600) — sidebar, buttons, AI elements, selected states
- **Text**: Dark slate (slate-900 / slate-800)
- **Cards**: Rounded corners, soft borders (slate-200), subtle shadows
- **Status colors**: green (strong / cleared), amber (watchlist / needs coaching), red (not cleared / urgent / critical), purple (launch gate), indigo (primary brand / AI)
- **Tone of voice**: Confident, coach-forward, data-driven, improvement-oriented

### Avoid
- Harsh gradients, neon or cyberpunk colors
- Generic enterprise admin templates
- Restaurant, retail, warehouse, or hospitality aesthetics
- Fake-looking placeholder design

---

## Scoring System

All staff quality is scored on a **10-point scale**.

| Score Range | Status |
|---|---|
| 9.0–10.0 | Excellent |
| 8.0–8.9 | Cleared / Strong |
| 7.0–7.9 | Watchlist / Needs Coaching |
| Below 7.0 | Not Cleared / Resubmission Required |

**Readiness threshold: 8.0 / 10** — applies to certification, ongoing quality, front-desk, and launch gate.

---

## Status Chip System

**Staff Certification:** Cleared · Not Cleared · Needs Resubmission · Insufficient Evidence · Pending Submission · Manager Review

**Scheduling Status:** Unlocked · Blocked · No Decision

**Quality Monitoring:** Strong · On Track · Watchlist · Needs Coaching · Declining · Critical

**Front Desk:** Ready · Needs Second Roleplay · Not Cleared · Pending Scenario · Manager Review

**Launch Gate:** Launch Approved · Not Approved · Blocked · Pending Staff · 100% Passed

**AI Review:** Uploaded · AI Processing · AI Reviewed · Manager Review · Coaching Note Generated · Resubmission Required

**Trend:** Improving · Stable · Declining · New

---

## Demo Studios (5 studios)

| Studio | City, State | Formats | Member Retention | Staff Quality Score | Front-Desk Readiness | Quality Status | Launch Status |
|---|---|---|---|---|---|---|---|
| BloomFit West Loop | Chicago, IL | Pilates + HIIT | 91% | 8.8 / 10 | 94% | Strong | Live |
| BloomFit SoHo | New York, NY | Pilates + Yoga | 78% | 7.1 / 10 | 72% | At Risk | Live |
| BloomFit Austin | Austin, TX | HIIT + Strength | 84% | 7.9 / 10 | 81% | Watchlist | Live |
| BloomFit Miami | Miami, FL | Pilates + Recovery | 89% | 8.4 / 10 | 88% | On Track | Live |
| BloomFit Denver Launch | Denver, CO | Pilates + HIIT | N/A | 6.8 / 10 | 61% | Launch Gate | Not Approved |

**Studio Directors:** Avery Brooks (West Loop) · Maya Collins (SoHo) · Jordan Lee (Austin) · Sofia Ramirez (Miami) · Ethan Reed (Denver Launch)

**AI Studio Insights:**
- West Loop: High retention is supported by strong coach consistency and front-desk compliance.
- SoHo: Retention has dropped alongside declining coach scores and weak front-desk follow-up.
- Austin: Coach energy is strong, but safety cueing scores are inconsistent.
- Miami: Strong member experience, but front-desk objection handling needs improvement.
- Denver Launch: Studio launch is blocked because not all coaches and front-desk staff have passed readiness submissions.

---

## Demo Staff (16 named profiles)

### Coaches

| Name | Studio | Role | Format | Score | Trend | Cert Status | Alert |
|---|---|---|---|---|---|---|---|
| Olivia Hayes | West Loop | Lead Coach | Pilates | 9.2 / 10 | Stable | Cleared | None |
| Marcus Lee | West Loop | Coach | HIIT | 8.6 / 10 | Improving | Cleared | None |
| Miles Carter | West Loop | Coach | Recovery | 8.1 / 10 | New | Cleared | None |
| Claire Bennett | SoHo | Coach | Yoga | 6.9 / 10 | Declining | Cleared | Score dropped 1.7 pts in 4 weeks |
| Daniel Carter | SoHo | Coach | Pilates | 6.5 / 10 | Declining | Needs Coaching | Cueing quality below threshold |
| Nora Blake | SoHo | Coach | Yoga | — | New | In Review | Certification AI processing |
| Emma Brooks | Austin | Coach | HIIT | 7.8 / 10 | Stable | Cleared | Safety cues inconsistent |
| Hannah Reed | Austin | Coach | Strength | 8.1 / 10 | Improving | Cleared | None |
| Taylor Brooks | Austin | Coach | HIIT | 8.3 / 10 | New | Cleared | None |
| Ava Morgan | Miami | Lead Coach | Pilates | 8.7 / 10 | Stable | Cleared | None |
| Ryan Foster | Miami | Coach | Recovery | 8.0 / 10 | Stable | Cleared | None |
| Samantha Reed | Miami | Coach | Pilates | 8.7 / 10 | New | Cleared | None |
| Jenna White | Denver Launch | New Instructor | Pilates | 5.9 / 10 | New | Not Cleared | Certification readiness failed |
| Maya Stone | Denver Launch | New Instructor | HIIT | 6.4 / 10 | New | Needs Resubmission | Certification score 7.4 — needs resubmission |
| Leo Grant | Denver Launch | New Instructor | Strength | — | New | Pending Submission | Launch gate blocker |
| Brooke Evans | Denver Launch | Coach Candidate | Yoga | — | New | Awaiting AI Review | Launch gate blocker |

### Front-Desk Staff

| Name | Studio | Role | Service Score | Trend | Readiness Status | Alert |
|---|---|---|---|---|---|---|
| Rachel Kim | SoHo | Front Desk | 6.7 / 10 | Declining | Needs Second Roleplay | Membership options not explained clearly |
| Noah Parker | Denver Launch | Front Desk | 5.8 / 10 | New | Not Cleared | Launch gate blocker |

---

## Dashboard KPI Cards (6 cards)

| KPI | Value | Subtitle | Trend | State |
|---|---|---|---|---|
| Network Quality Score | 7.8 / 10 | Average across coaches and front desk | -0.4 from last month | Warning |
| Member Retention | 84% | Average across live studios | SoHo down 6% | Warning |
| Coaches Below Threshold | 6 | Need coaching or resubmission | 2 declining quickly | Critical |
| Submissions Due | 19 | Fortnightly recordings pending | 8 overdue | Warning |
| Front-Desk Readiness | 78% | Average service compliance | Cancellation handling weakest | Warning |
| Launch Gate Status | Not Approved | Denver Launch blocked by 5 staff | 61% readiness | Critical |

---

## AI Owner Summary (Dashboard)

> "BloomFit SoHo is currently the biggest quality risk. Member retention is down to 78%, coach scores are declining, and front-desk membership conversations are below standard. Claire Bennett and Daniel Carter both need coaching review this week. BloomFit Denver Launch is not ready to open because 5 staff members have not passed their readiness gate."

**Insight chips:** Highest quality studio: West Loop · Biggest retention risk: SoHo · Fastest declining coach: Claire Bennett · Launch blocker: Denver Launch · Most common coaching gap: Safety cues

---

## AI Quality Flags (6 dashboard flags)

| Staff | Role | Studio | Issue | Priority |
|---|---|---|---|---|
| Claire Bennett | Coach | SoHo | Coach Quality Decline — score dropped 1.7 pts in 4 weeks | Urgent |
| Daniel Carter | Coach | SoHo | Cueing Below Threshold — current score 6.5 / 10 | High |
| Rachel Kim | Front Desk | SoHo | Front-Desk Compliance Gap — membership options not explained clearly | High |
| Jenna White | New Instructor | Denver Launch | Not Cleared for Launch — certification readiness failed | Urgent |
| Noah Parker | Front Desk | Denver Launch | Launch Gate Blocker — front-desk readiness score 5.8 / 10 | Urgent |
| Emma Brooks | Coach | Austin | Safety Cue Watchlist — safety cues inconsistent | Medium |

---

## Submission Queue (Dashboard Preview — 6 rows)

| Staff | Studio | Submission Type | Format | Status | Score | AI Result |
|---|---|---|---|---|---|---|
| Jenna White | Denver Launch | Certification class segment | Video | AI Reviewed | 5.9 / 10 | Not Cleared |
| Claire Bennett | SoHo | Fortnightly class segment | Video | AI Reviewed | 6.9 / 10 | Needs Coaching |
| Rachel Kim | SoHo | Membership sales roleplay | Voice | Manager Review | 6.7 / 10 | Needs Second Roleplay |
| Olivia Hayes | West Loop | Fortnightly class segment | Video | Approved | 9.2 / 10 | Strong |
| Noah Parker | Denver Launch | Welcome script roleplay | Video | AI Reviewed | 5.8 / 10 | Not Cleared |
| Emma Brooks | Austin | Fortnightly class segment | Video | AI Reviewed | 7.8 / 10 | Watchlist |

---

## Launch Readiness Preview (Denver Launch)

- Launch readiness: 61%
- Total staff: 13 · Submitted: 10 · Passed: 8 · Pending: 3 · Below threshold: 2
- Blocking staff: Jenna White (Not Cleared) · Maya Stone (Needs Resubmission) · Noah Parker (Not Cleared) · Leo Grant (Pending Submission) · Brooke Evans (Awaiting AI Review)

---

## Coach Quality Trends (Dashboard — 5 coaches, last 8 submissions)

| Coach | Studio | Trend | Scores |
|---|---|---|---|
| Olivia Hayes | West Loop | Stable | 9.1, 9.3, 9.2, 9.2, 9.1, 9.3, 9.2, 9.2 |
| Claire Bennett | SoHo | Declining ⚠ | 8.6, 8.4, 8.1, 7.8, 7.5, 7.2, 7.0, 6.9 |
| Daniel Carter | SoHo | Declining | 7.5, 7.3, 7.2, 7.0, 6.8, 6.7, 6.6, 6.5 |
| Emma Brooks | Austin | Stable | 7.9, 7.7, 7.8, 7.9, 7.8, 7.7, 7.8, 7.8 |
| Marcus Lee | West Loop | Improving | 7.4, 7.6, 7.8, 8.0, 8.2, 8.4, 8.5, 8.6 |

Alert fires when score drops more than 1.5 points in last 4 weeks.

---

## Live AI Review Preview (Dashboard)

Sample submission: Jenna White · New Instructor · Denver Launch · Certification class segment

**AI Processing Stages (13 steps):**
1. Upload received
2. Extracting transcript and key moments
3. Identifying submission type
4. Matching submission to rubric
5. Checking Class Opening → 5.8 / 10
6. Checking Cueing Quality → 6.1 / 10
7. Checking Energy and Pacing → 6.4 / 10
8. Checking Safety Cues → In Progress
9. Checking Closing → Pending
10. Generating criterion scores → Pending
11. Generating written explanations → Pending
12. Creating coaching note → Pending
13. Updating staff readiness status → Pending

---

## AI Review Output Structure

```json
{
  "reviewMode": "real_ai | demo_sample",
  "inputType": "video | audio | pasted_transcript | uploaded_transcript",
  "instructorName": "",
  "studioName": "",
  "classFormat": "",
  "submissionType": "",
  "rubricName": "",
  "overallScore": 0,
  "readinessStatus": "Cleared | Needs Resubmission | Not Cleared | Insufficient Evidence",
  "schedulingStatus": "Unlocked | Blocked | No Decision",
  "readinessThreshold": 8.0,
  "minimumCriterionThreshold": 7.5,
  "confidenceScore": 0,
  "confidenceLabel": "Very High | High | Medium | Low",
  "analysisBasis": "video_transcript | audio_transcript | pasted_transcript | transcript_plus_visual",
  "transcriptSummary": "",
  "detectedMoments": [
    {
      "momentType": "opening | warmup | cueing | transition | safety_cue | modification | cooldown | closing",
      "timestampOrLine": "",
      "summary": ""
    }
  ],
  "criterionScores": [
    {
      "criterionName": "",
      "score": 0,
      "status": "Excellent | Meets Standard | Needs Coaching | Below Standard",
      "subcheckScores": [
        {
          "subcheck": "",
          "score": 0,
          "maxScore": 2,
          "evidence": "",
          "explanation": ""
        }
      ],
      "whatAIDetected": "",
      "explanation": "",
      "timestampEvidence": [],
      "transcriptEvidence": [],
      "coachingRecommendation": ""
    }
  ],
  "strengths": [],
  "improvements": [],
  "specificCueToTry": "",
  "managerSummary": "",
  "instructorFeedback": "",
  "resubmissionRequired": false,
  "resubmissionInstructions": "",
  "recommendedCoachingPlan": [
    {
      "title": "",
      "priority": "Urgent | High | Medium | Low",
      "reason": "",
      "suggestedDrill": ""
    }
  ],
  "certificationBadge": {
    "issued": false,
    "title": "Certified to Teach | Not Issued",
    "validThrough": null
  }
}
```

---

## Sidebar Navigation (11 items)

1. Dashboard (active by default)
2. Studios
3. Staff
4. Submissions
5. Certification
6. Quality Monitoring
7. Front Desk
8. Launch Readiness
9. AI Review Center
10. Reports
11. Settings

Sidebar bottom — user profile: SM avatar · Sarah Mitchell · Founder & Owner · BloomFit Studios

---

## Dashboard Sections (8 sections)

1. **Staff Quality Command Center header** — title, subtitle, status line, date filter, studio filter, action buttons
2. **6 KPI Cards** — Network Quality Score, Member Retention, Coaches Below Threshold, Submissions Due, Front-Desk Readiness, Launch Gate Status
3. **AI Owner Summary** — AI-generated narrative, 5 insight chips, 4 action buttons
4. **Studio Quality Overview** — 5 studio cards with retention, quality score, submissions due, front-desk readiness, status, director, AI insight
5. **AI Quality Flags** — 6 flag cards with staff, role, studio, issue, AI note, priority chip, action button
6. **Submission Queue** — table with 6 rows (staff, studio, role, type, format, status, score, AI result, action)
7. **Launch Readiness Preview** — Denver Launch gate card with blocking staff list
8. **Coach Quality Trends** — last 8 submissions with trend chips and decline alerts
9. **Live AI Review Preview** — animated vertical stepper showing AI processing in progress

---

## Data Model (Mock Objects)

**Studio**: id, name, city, state, formats, memberRetention, qualityStatus, staffQualityScore, coachSubmissionsDue, frontDeskReadiness, launchStatus, studioDirector, aiInsight

**Staff**: id, name, studioId, studioName, role, staffType, format, currentScore, trend, certificationStatus, frontDeskReadinessStatus, lastSubmission, alert, scoreHistory[]

**Submission**: id, staffId, staffName, studioName, role, submissionType, format, status, score, aiResult, actionLabel, submittedAt

**AIFlag**: id, staffName, role, studioName, issue, detail, aiNote, priority, actionLabel

**LaunchGate**: studioId, studioName, launchReadinessPercentage, totalStaff, submitted, passed, pending, belowThreshold, blockingStaff[]

**Rubric**: id, name, type, criteria[], threshold

**AIReviewStep**: id, stepName, status, result, explanation

**CertificationReview**: id, instructorName, studioName, classFormat, submissionType, inputType, reviewMode, analysisBasis, overallScore, readinessStatus, schedulingStatus, confidenceScore, confidenceLabel, criterionScores[], subcheckScores[], detectedMoments[], strengths[], improvements[], specificCueToTry, managerSummary, instructorFeedback, resubmissionRequired, resubmissionInstructions, recommendedCoachingPlan[], certificationBadge, reviewedAt

**CoachTrend**: coachId, coachName, studioName, trend, scores[] (last 8), alertMessage

---

## Tech Stack

- Remix (Vite plugin) + Express (Custom Server)
- TypeScript
- Tailwind CSS + shadcn/ui
- Mock data (no real backend, no real AI API, no real authentication)
- Desktop-first dashboard (optimized for 1440px), responsive for tablet and mobile
- Mobile-optimized submission flow foundations (coach upload from studio floor)
