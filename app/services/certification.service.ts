// ─── CoachIQ Certification Service ────────────────────────────────────────────
// Handles instructor certification AI review logic for BloomFit Studios.

export interface CertificationInput {
  instructorName: string;
  studioName: string;
  classFormat: string;
  instructorRole: string;
  submissionType: string;
  inputType: "pasted_transcript" | "uploaded_transcript" | "video" | "audio";
  transcriptText?: string;
  reviewMode: "real_ai" | "demo_sample";
  rubricName?: string;
  readinessThreshold?: number;
  minimumCriterionThreshold?: number;
}

export interface SubcheckScore {
  subcheck: string;
  score: number;
  maxScore: 2;
  evidence: string;
  explanation: string;
}

export interface CriterionScore {
  criterionName: string;
  score: number;
  status: "Excellent" | "Meets Standard" | "Needs Coaching" | "Below Standard";
  subcheckScores: SubcheckScore[];
  whatAIDetected: string;
  explanation: string;
  timestampEvidence: string[];
  transcriptEvidence: string[];
  coachingRecommendation: string;
}

export interface DetectedMoment {
  momentType: string;
  timestampOrLine: string;
  summary: string;
}

export interface CoachingPlanItem {
  title: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  reason: string;
  suggestedDrill: string;
}

export interface CertificationBadge {
  issued: boolean;
  title: "Certified to Teach" | "Not Issued";
  validThrough: string | null;
}

export interface CertificationResult {
  reviewMode: "real_ai" | "demo_sample";
  inputType: string;
  instructorName: string;
  studioName: string;
  classFormat: string;
  submissionType: string;
  rubricName: string;
  overallScore: number;
  readinessStatus: "Cleared" | "Needs Resubmission" | "Not Cleared" | "Insufficient Evidence";
  schedulingStatus: "Unlocked" | "Blocked" | "No Decision";
  readinessThreshold: number;
  minimumCriterionThreshold: number;
  confidenceScore: number;
  confidenceLabel: "Very High" | "High" | "Medium" | "Low";
  analysisBasis: string;
  transcriptSummary: string;
  detectedMoments: DetectedMoment[];
  criterionScores: CriterionScore[];
  strengths: string[];
  improvements: string[];
  specificCueToTry: string;
  managerSummary: string;
  instructorFeedback: string;
  resubmissionRequired: boolean;
  resubmissionInstructions: string;
  recommendedCoachingPlan: CoachingPlanItem[];
  certificationBadge: CertificationBadge;
  error?: string;
}

// ─── Demo Data ────────────────────────────────────────────────────────────────

const demoJennaWhite: CertificationResult = {
  reviewMode: "demo_sample",
  inputType: "video_transcript",
  instructorName: "Jenna White",
  studioName: "BloomFit Denver Launch",
  classFormat: "Pilates",
  submissionType: "Certification class segment",
  rubricName: "BloomFit Instructor Certification Standard",
  overallScore: 5.9,
  readinessStatus: "Not Cleared",
  schedulingStatus: "Blocked",
  readinessThreshold: 8.0,
  minimumCriterionThreshold: 7.5,
  confidenceScore: 91,
  confidenceLabel: "Very High",
  analysisBasis: "video_transcript",
  transcriptSummary:
    "Jenna's Pilates certification segment shows natural energy and member rapport but lacks the core structural requirements for a BloomFit class. No formal class opening was observed — movement started without context or objective-setting. Safety cues were largely absent during high-load transitions, and the session ended abruptly without a cooldown or closing acknowledgment.",
  detectedMoments: [
    { momentType: "Movement Start (No Opening)", timestampOrLine: "00:00", summary: "Class began directly with instruction — no welcome, objective, or warmup context given." },
    { momentType: "Transition Cue (Incomplete)", timestampOrLine: "03:15", summary: "Moved from mat work to standing without explaining the next movement or posture setup." },
    { momentType: "High-Intensity Segment", timestampOrLine: "06:40", summary: "Entered planks and core holds without safety cues, modifications, or lower back reminders." },
    { momentType: "Abrupt Session End", timestampOrLine: "11:55", summary: "Class ended without cooldown — no breath work, stretch, or closing acknowledgment." },
  ],
  criterionScores: [
    {
      criterionName: "Class Opening",
      score: 5.8,
      status: "Below Standard",
      subcheckScores: [
        { subcheck: "Warm welcome or confident start", score: 1, maxScore: 2, evidence: "No greeting observed in transcript.", explanation: "Instructor started with movement instructions immediately. No welcome, name introduction, or confident opener was detected." },
        { subcheck: "Explains class format or session objective", score: 0, maxScore: 2, evidence: "Not observed in transcript.", explanation: "No mention of Pilates format, session goals, or what members would be working on today." },
        { subcheck: "Explains warmup purpose", score: 1, maxScore: 2, evidence: "Partial: 'We'll start with some gentle movement to warm up.'", explanation: "Brief warmup mention present but purpose (e.g. activating core, preparing joints) was not communicated." },
        { subcheck: "Sets expectations for intensity/pacing/focus", score: 0, maxScore: 2, evidence: "Not observed in transcript.", explanation: "No intensity guidance, focus area, or pacing expectations were given before the class started." },
        { subcheck: "Gives clear first movement setup", score: 1, maxScore: 2, evidence: "'Come to your mat and start in tabletop position.'", explanation: "First position was named but no alignment cues, breath cues, or body position details were offered." },
      ],
      whatAIDetected: "Movement began at 00:00 without any class opening. No welcome, format explanation, or first movement setup with alignment cues detected.",
      explanation: "Jenna did not deliver a class opening that meets BloomFit standards. Starting movement without context leaves members unsupported and reflects a significant structural gap.",
      timestampEvidence: ["00:00 — Immediate movement start with no welcome or context."],
      transcriptEvidence: ["'Come to your mat and start in tabletop position.' (Line 1 — no prior opening observed)"],
      coachingRecommendation: "Practice a 60-second class opening script: welcome members by name, state the session objective (e.g., 'Today we're focusing on deep core and hip mobility'), explain the warmup, and set intensity expectations before the first cue.",
    },
    {
      criterionName: "Cueing Quality",
      score: 6.1,
      status: "Needs Coaching",
      subcheckScores: [
        { subcheck: "Movement setup clear", score: 1, maxScore: 2, evidence: "'Come to tabletop, hands under shoulders.'", explanation: "Basic position given but landmark precision (neutral spine, hip-width knees) missing." },
        { subcheck: "Body position/alignment cues", score: 1, maxScore: 2, evidence: "'Keep your back flat' mentioned once.", explanation: "Generic alignment cue offered but not specific to Pilates standards or repeated at key moments." },
        { subcheck: "Tempo/direction/ROM", score: 2, maxScore: 2, evidence: "'Slow it down, 4 counts down, 4 counts up.'", explanation: "Excellent tempo cueing observed — specific count and direction clearly communicated." },
        { subcheck: "Transitions cued before movement", score: 1, maxScore: 2, evidence: "Partial: some movements announced but without setup.", explanation: "Transitions were named but not set up in advance. Members had to react rather than prepare." },
        { subcheck: "Specific concise language", score: 1, maxScore: 2, evidence: "Mix of clear and vague language throughout.", explanation: "Some cues were direct; others (e.g., 'engage your core') lacked specificity about which muscles or how much." },
      ],
      whatAIDetected: "Tempo cueing was a clear strength. Alignment and transition setup cues were present but lacked the specificity and proactivity required by BloomFit standards.",
      explanation: "Jenna has a foundation in cueing but needs to elevate alignment language and pre-movement transition setup to meet the BloomFit certification threshold.",
      timestampEvidence: ["04:10 — '4 counts down, 4 counts up' — strong tempo cue.", "06:20 — Transition to plank with no setup cues."],
      transcriptEvidence: ["'Slow it down, 4 counts down, 4 counts up.'", "'Now let's go into plank.' (No prior setup)"],
      coachingRecommendation: "Work on 'anticipation cueing' — give the next movement's setup cue 2-3 reps before transitioning. Also, replace generic cues like 'engage your core' with specific ones like 'draw your navel toward your spine without holding your breath.'",
    },
    {
      criterionName: "Energy and Pacing",
      score: 6.4,
      status: "Needs Coaching",
      subcheckScores: [
        { subcheck: "Energy matches format", score: 1, maxScore: 2, evidence: "Upbeat tone early, inconsistent through mid-class.", explanation: "Pilates requires controlled, calm-but-present energy. Jenna's energy was higher than the format calls for in places and dropped unexpectedly mid-class." },
        { subcheck: "Consistent pacing", score: 2, maxScore: 2, evidence: "Pacing across the transcript was generally steady.", explanation: "Good pacing — no rushed segments or awkward pauses detected." },
        { subcheck: "Smooth transitions", score: 1, maxScore: 2, evidence: "Two abrupt exercise changes with no transition language.", explanation: "Some transitions were smooth but key ones (mat to standing, core to closing) were jarring." },
        { subcheck: "Maintained presence", score: 1, maxScore: 2, evidence: "Silence observed at 07:30 for ~20 seconds.", explanation: "An unaddressed gap in instruction was detected mid-class. Members were left without guidance." },
        { subcheck: "Clear intensity changes", score: 1, maxScore: 2, evidence: "Intensity increased without announcement at 06:40.", explanation: "The shift to higher-intensity planks was not communicated or prepared for." },
      ],
      whatAIDetected: "Pacing was consistent but energy match to Pilates format was inconsistent, and two notable instruction gaps were observed mid-class.",
      explanation: "Energy and pacing shows promise. The consistent pacing is a genuine strength. Focus should be on format-appropriate energy calibration and eliminating silent instruction gaps.",
      timestampEvidence: ["07:30 — ~20-second silence gap with no instruction.", "06:40 — Intensity increase without announcement."],
      transcriptEvidence: ["(No instruction detected between 07:30-07:50)", "'Now let's do plank holds.' (sudden intensity shift)"],
      coachingRecommendation: "Prepare 'bridge language' for transitions and intensity shifts. Examples: 'We're about to challenge your core more — here's what to expect' or 'Take a breath here — in a moment we're moving into something tougher.'",
    },
    {
      criterionName: "Safety Cues",
      score: 5.6,
      status: "Below Standard",
      subcheckScores: [
        { subcheck: "Proactive safety cues", score: 0, maxScore: 2, evidence: "Not observed in transcript.", explanation: "No proactive safety setup was detected before any high-load movement." },
        { subcheck: "Modifications/regressions offered", score: 1, maxScore: 2, evidence: "'If this feels too much, take a rest.' (once, at 08:20)", explanation: "One regression offer detected but it was reactive and vague. No specific modification cues were given." },
        { subcheck: "Specific alignment reminders", score: 1, maxScore: 2, evidence: "'Keep your back flat' observed once.", explanation: "One generic alignment reminder was present. No lower back, neck, or wrist safety cues for Pilates-specific risk areas." },
        { subcheck: "What to avoid", score: 0, maxScore: 2, evidence: "Not observed in transcript.", explanation: "No 'avoid' language detected — members were not told what not to do during high-risk movements." },
        { subcheck: "Breath/control/posture cues", score: 2, maxScore: 2, evidence: "'Exhale on effort' mentioned at 04:45 and 05:30.", explanation: "Good breath cueing was observed consistently during the core segment." },
      ],
      whatAIDetected: "Breath cueing was a notable strength. However, proactive safety cues, specific modifications, and avoidance guidance were largely absent — particularly during plank holds and core transitions.",
      explanation: "Safety cueing is the most critical gap in Jenna's submission. BloomFit requires proactive safety language before every high-load movement. This is a non-negotiable certification standard.",
      timestampEvidence: ["06:40 — High-intensity plank entry with zero safety cues.", "08:20 — First and only modification offered."],
      transcriptEvidence: ["'Exhale on effort, inhale to reset.' (positive example)", "'Now let's do plank holds.' (no safety setup before high load)"],
      coachingRecommendation: "Before every high-load movement, deliver: (1) what to watch for in your body, (2) the modification available, and (3) what to avoid. Example: 'Before we go into plank — if you feel compression in your lower back, drop your knees. Avoid letting your hips sag.'",
    },
    {
      criterionName: "Closing",
      score: 6.0,
      status: "Needs Coaching",
      subcheckScores: [
        { subcheck: "Cooldown delivered", score: 0, maxScore: 2, evidence: "Not observed in transcript.", explanation: "No cooldown was detected. The class ended after the final core exercise." },
        { subcheck: "Intentional non-abrupt close", score: 1, maxScore: 2, evidence: "'OK great work everyone.' (final line)", explanation: "A brief closing line was present but the session ended immediately after — no wind-down was created." },
        { subcheck: "Acknowledges effort", score: 1, maxScore: 2, evidence: "'Great work everyone' at 11:55.", explanation: "Effort acknowledgment present but brief. No specific call-out or personalized recognition." },
        { subcheck: "Recovery/next step guidance", score: 1, maxScore: 2, evidence: "'Drink some water and stretch when you get home.'", explanation: "Basic recovery guidance given but no in-class cooldown or structured wind-down was delivered." },
        { subcheck: "Mentions next class or ongoing support", score: 0, maxScore: 2, evidence: "Not observed in transcript.", explanation: "No mention of next class, booking, or ongoing availability for questions." },
      ],
      whatAIDetected: "The session ended abruptly at 11:55 with a single closing line. No cooldown, structured wind-down, or next-steps communication was observed.",
      explanation: "Jenna's closing does not meet BloomFit certification standards. A proper cooldown and intentional close are required. This leaves members without a complete class experience.",
      timestampEvidence: ["11:55 — 'OK great work everyone.' (final line — class ends)"],
      transcriptEvidence: ["'OK great work everyone. Drink some water and stretch when you get home.'"],
      coachingRecommendation: "Build a 90-second closing routine: 2-3 minutes of cooldown stretches, specific effort acknowledgment ('You really pushed through that core work today'), and a forward-looking close: 'Book your next class and reach out if you have any questions.'",
    },
  ],
  strengths: [
    "Natural energy and evident passion for Pilates teaching",
    "Strong breath cueing — 'exhale on effort' used consistently and correctly",
    "Consistent pacing — no rushed or awkward pauses detected across the class",
    "Members appeared engaged during warmup and core segments",
  ],
  improvements: [
    "No class opening — started movement without welcome, objective, or format context",
    "Critical safety cues absent before plank holds and high-intensity transitions",
    "Abrupt class ending — no cooldown, wind-down, or next-class mention delivered",
    "Modifications were reactive and vague ('take a rest') rather than proactive and specific",
    "Transition setup cues missing — members had to react to movements rather than prepare",
  ],
  specificCueToTry:
    "Before your next high-intensity move, say: 'Before we go into plank — if you feel any compression in your lower back, drop your knees to a modified position. We're going to hold for 30 seconds, focus on one breath per hold, and avoid letting your hips sag.'",
  managerSummary:
    "Jenna shows genuine potential — she has natural energy, good pacing, and solid breath cueing. However, she is not yet ready to teach live BloomFit members. Three critical certification gaps were identified: (1) no class opening was delivered, (2) safety cues were largely absent before high-load movements, and (3) the session ended without a cooldown or intentional close. Resubmission is required. A structured coaching session on class architecture (opening, transitions, safety, closing) is strongly recommended before resubmission.",
  instructorFeedback:
    "Hi Jenna — thank you for submitting your certification class segment. You clearly have energy and a genuine connection with your class, which is a real strength. Your breath cueing was excellent.\n\nFor your resubmission, we need to see three things: (1) a proper class opening — welcome your members, tell them what they'll be working on, and set expectations before the first movement; (2) proactive safety cues before any high-intensity or high-load movement — tell members what to watch for and what modification is available; and (3) a structured cooldown and close — give members 2-3 minutes to wind down and acknowledge their effort before ending the session.\n\nWe're excited to support you. You're close.",
  resubmissionRequired: true,
  resubmissionInstructions:
    "Please resubmit a new 12-15 minute certification class segment (Pilates) that demonstrates: (1) a complete class opening with welcome, objective, and warmup explanation; (2) proactive safety cues before all high-load transitions; and (3) a structured 2-3 minute cooldown with intentional close. Submit as a video recording or timestamped transcript.",
  recommendedCoachingPlan: [
    {
      title: "Class Architecture Workshop",
      priority: "Urgent",
      reason: "No class opening or closing was delivered — these are structural requirements for every BloomFit class.",
      suggestedDrill: "Teach a mock 15-minute class to a coach or colleague and record it. Explicitly script and rehearse your opening (60 seconds) and closing (90 seconds) until they feel natural.",
    },
    {
      title: "Proactive Safety Cueing Drill",
      priority: "Urgent",
      reason: "Safety cues were absent before high-load Pilates movements — a non-negotiable certification requirement.",
      suggestedDrill: "For each of your top 5 Pilates exercises, write out: (1) the proactive safety cue, (2) the modification option, and (3) what to avoid. Practice delivering all three before each movement in your next training session.",
    },
    {
      title: "Transition Language Practice",
      priority: "High",
      reason: "Multiple transitions were abrupt — members were not prepared for the next movement.",
      suggestedDrill: "Record yourself teaching only transitions (no full exercises). Practice giving the next movement's setup cue 2-3 reps before actually transitioning.",
    },
  ],
  certificationBadge: { issued: false, title: "Not Issued", validThrough: null },
};

const demaMayaStone: CertificationResult = {
  reviewMode: "demo_sample",
  inputType: "video_transcript",
  instructorName: "Maya Stone",
  studioName: "BloomFit Denver Launch",
  classFormat: "HIIT",
  submissionType: "Role-play teaching video",
  rubricName: "BloomFit Instructor Certification Standard",
  overallScore: 7.4,
  readinessStatus: "Needs Resubmission",
  schedulingStatus: "Blocked",
  readinessThreshold: 8.0,
  minimumCriterionThreshold: 7.5,
  confidenceScore: 88,
  confidenceLabel: "Very High",
  analysisBasis: "video_transcript",
  transcriptSummary:
    "Maya's HIIT certification role-play demonstrates a solid coaching foundation and strong energy delivery. The class opening, cueing, and pacing were above threshold. However, two criteria fell below the 7.5 minimum: Safety Cues (6.9) — modifications were offered but not proactively set up before high-impact movements — and Closing (6.7) — the cooldown was rushed and lacked intentional close or next-step communication. Overall score of 7.4 places Maya in Needs Resubmission territory.",
  detectedMoments: [
    { momentType: "Strong Class Opening", timestampOrLine: "00:00–01:10", summary: "Clear welcome, HIIT format explanation, and warmup purpose delivered." },
    { momentType: "Safety Gap", timestampOrLine: "05:30", summary: "Burpee entry without low-impact modification or joint safety cue." },
    { momentType: "Strong Energy Peak", timestampOrLine: "07:45", summary: "Excellent energy ramp-up cue before final AMRAP block." },
    { momentType: "Rushed Closing", timestampOrLine: "11:20", summary: "Cooldown lasted under 60 seconds and ended without acknowledgment or next-class mention." },
  ],
  criterionScores: [
    {
      criterionName: "Class Opening",
      score: 7.8,
      status: "Meets Standard",
      subcheckScores: [
        { subcheck: "Warm welcome or confident start", score: 2, maxScore: 2, evidence: "'Welcome everyone to HIIT with BloomFit — let's make this one count.'", explanation: "Confident, welcoming opener that set a strong tone." },
        { subcheck: "Explains class format or session objective", score: 2, maxScore: 2, evidence: "'Today we're doing 4 rounds of work-rest intervals — 40 seconds on, 20 off.'", explanation: "Format explained clearly and specifically." },
        { subcheck: "Explains warmup purpose", score: 2, maxScore: 2, evidence: "'This warmup is getting your heart rate up and your joints primed before we push hard.'", explanation: "Purpose clearly communicated." },
        { subcheck: "Sets expectations for intensity/pacing/focus", score: 1, maxScore: 2, evidence: "'It's going to be tough' — vague.", explanation: "General intensity warning given but no guidance on perceived exertion targets or rest permission." },
        { subcheck: "Gives clear first movement setup", score: 1, maxScore: 2, evidence: "'Start with alternating knee drives.'", explanation: "Movement named but no alignment or tempo cues given at the start." },
      ],
      whatAIDetected: "Strong welcome and format explanation detected. Warmup purpose clearly communicated. Setup cues for first movement were partial.",
      explanation: "Maya's opening meets the threshold. Minor improvements in intensity-setting language and first-movement setup would push this toward Excellent.",
      timestampEvidence: ["00:00 — 'Welcome everyone to HIIT with BloomFit — let's make this one count.'", "00:45 — 'Today we're doing 4 rounds of 40/20 intervals.'"],
      transcriptEvidence: ["'Welcome everyone to HIIT with BloomFit.'", "'This warmup is getting your heart rate up and your joints primed.'"],
      coachingRecommendation: "Add a perceived exertion anchor: 'We're aiming for a 7-8 out of 10 during work sets. If you need to step instead of jump, that's the smart choice — not the easy choice.'",
    },
    {
      criterionName: "Cueing Quality",
      score: 7.6,
      status: "Meets Standard",
      subcheckScores: [
        { subcheck: "Movement setup clear", score: 2, maxScore: 2, evidence: "'Feet hip-width, soft bend in the knees, chest up before we start.'", explanation: "Excellent setup cue for squat jumps." },
        { subcheck: "Body position/alignment cues", score: 2, maxScore: 2, evidence: "Consistent spine and knee alignment cues throughout.", explanation: "Alignment language was strong and specific across multiple movements." },
        { subcheck: "Tempo/direction/ROM", score: 2, maxScore: 2, evidence: "'Explode up, land soft — full extension at the top.'", explanation: "ROM and direction clearly communicated." },
        { subcheck: "Transitions cued before movement", score: 1, maxScore: 2, evidence: "Most transitions cued but two were unannounced.", explanation: "Generally good anticipation cueing with two exceptions." },
        { subcheck: "Specific concise language", score: 1, maxScore: 2, evidence: "A few vague cues like 'push harder' without context.", explanation: "Majority of language was specific but some generic encouragement wasn't action-anchored." },
      ],
      whatAIDetected: "Strong alignment and setup cueing throughout. Movement entries were generally well-prepared. Two unannounced transitions and occasional generic encouragement were the main gaps.",
      explanation: "Cueing quality meets the standard. The foundation is solid — precision in encouragement language would elevate this score significantly.",
      timestampEvidence: ["03:15 — 'Feet hip-width, soft bend in the knees, chest up.'", "09:00 — Transition to burpees without setup cue."],
      transcriptEvidence: ["'Explode up, land soft — full extension at the top.'", "'Push harder.' (unanchored encouragement)"],
      coachingRecommendation: "Replace generic encouragement with action-anchored cues: instead of 'push harder,' say 'get your hips fully extended at the top of every jump — that's where your power comes from.'",
    },
    {
      criterionName: "Energy and Pacing",
      score: 8.2,
      status: "Meets Standard",
      subcheckScores: [
        { subcheck: "Energy matches format", score: 2, maxScore: 2, evidence: "Energy levels tracked the work-rest structure well throughout.", explanation: "HIIT-appropriate energy — high during work sets, calm and controlled during rest. Well-executed." },
        { subcheck: "Consistent pacing", score: 2, maxScore: 2, evidence: "No timing issues detected.", explanation: "Work and rest intervals were consistent throughout the session." },
        { subcheck: "Smooth transitions", score: 2, maxScore: 2, evidence: "Transitions were mostly well-signaled.", explanation: "Good transition language with only minor exceptions." },
        { subcheck: "Maintained presence", score: 1, maxScore: 2, evidence: "Brief silence at 08:30 during a rest interval.", explanation: "Short gap in presence during a rest period — minor but noted." },
        { subcheck: "Clear intensity changes", score: 1, maxScore: 2, evidence: "'Final round — let's go!' but no specific setup for increase.", explanation: "Intensity change announced but not specifically set up or contextualized." },
      ],
      whatAIDetected: "Energy and pacing was the strongest criterion. HIIT format-appropriate energy was consistent across work and rest. Minor gaps in rest-period presence and intensity-change communication.",
      explanation: "Energy and pacing is Maya's clear strength. This score reflects genuine skill in format-appropriate coaching energy.",
      timestampEvidence: ["07:45 — 'Final round — let's go!'", "08:30 — Brief silence during rest interval."],
      transcriptEvidence: ["'Final round — let's go — this is what you came for!'"],
      coachingRecommendation: "Use rest intervals intentionally — brief coaching check-ins ('How's your heart rate? We want it coming down before round 4') keep presence up without disrupting recovery.",
    },
    {
      criterionName: "Safety Cues",
      score: 6.9,
      status: "Needs Coaching",
      subcheckScores: [
        { subcheck: "Proactive safety cues", score: 1, maxScore: 2, evidence: "Partial: safety mentioned after burpees started.", explanation: "Safety guidance was reactive rather than proactive — delivered after the movement began." },
        { subcheck: "Modifications/regressions offered", score: 2, maxScore: 2, evidence: "'If jumping isn't your thing today, step it out.'", explanation: "Modification offered for jump movements — good." },
        { subcheck: "Specific alignment reminders", score: 1, maxScore: 2, evidence: "'Keep your knees tracking' — vague for HIIT context.", explanation: "Knee cue present but lacked specificity about direction of tracking or the risk of inward collapse." },
        { subcheck: "What to avoid", score: 0, maxScore: 2, evidence: "Not observed in transcript.", explanation: "No 'avoid' language detected for any movement across the session." },
        { subcheck: "Breath/control/posture cues", score: 2, maxScore: 2, evidence: "'Breath out on the effort — don't hold your breath through jumps.'", explanation: "Strong breath cue, used consistently." },
      ],
      whatAIDetected: "Modifications were offered for jump movements. Breath cueing was strong. However, proactive safety language before high-impact movements was largely absent, and no avoidance cues were given across the session.",
      explanation: "Safety cueing is the primary gap for Maya's certification. This score falls below the 7.5 criterion threshold. Proactive safety setup before high-impact transitions is required for BloomFit certification.",
      timestampEvidence: ["05:30 — Burpee entry without prior safety cue.", "09:00 — Box jump entry without landing mechanics cue."],
      transcriptEvidence: ["'Step it out if jumping isn't your thing today.' (modification — good)", "'Alright, let's do burpees!' (no prior safety cue)"],
      coachingRecommendation: "Before every high-impact movement, deliver a 10-second safety setup: what to watch for, the available modification, and what to avoid. Example: 'Before burpees — if you have any knee sensitivity, step back instead of jumping. Land toe-heel, soft knees. Avoid collapsing your chest on the way down.'",
    },
    {
      criterionName: "Closing",
      score: 6.7,
      status: "Needs Coaching",
      subcheckScores: [
        { subcheck: "Cooldown delivered", score: 1, maxScore: 2, evidence: "45-second stretch observed at 11:20.", explanation: "A brief stretch was included but 45 seconds is insufficient for a proper HIIT cooldown." },
        { subcheck: "Intentional non-abrupt close", score: 1, maxScore: 2, evidence: "Brief close observed but rushed.", explanation: "A close was attempted but it followed immediately after the cooldown with no wind-down transition." },
        { subcheck: "Acknowledges effort", score: 2, maxScore: 2, evidence: "'You all killed it today — every single rep.'", explanation: "Strong effort acknowledgment — specific and genuine." },
        { subcheck: "Recovery/next step guidance", score: 1, maxScore: 2, evidence: "'Get some water and rest up.'", explanation: "Basic recovery guidance given but no structured guidance (e.g., nutrition window, active recovery recommendation)." },
        { subcheck: "Mentions next class or ongoing support", score: 0, maxScore: 2, evidence: "Not observed in transcript.", explanation: "No mention of next class, booking, or ongoing support." },
      ],
      whatAIDetected: "Effort acknowledgment was a genuine strength. The cooldown was rushed (45 seconds) and no next-class or ongoing support mention was detected.",
      explanation: "The closing falls below threshold. A proper HIIT cooldown requires 3-5 minutes of structured recovery. The effort acknowledgment was excellent but the structural closing requirements were not met.",
      timestampEvidence: ["11:20 — Brief 45-second stretch begins.", "11:55 — Session ends without next-class mention."],
      transcriptEvidence: ["'You all killed it today — every single rep.'", "(Session ends at 11:55 — no booking or support mention)"],
      coachingRecommendation: "Extend your cooldown to 3-4 minutes with 2-3 specific stretch cues. End with: 'That's a wrap — you earned it. Book your next class and drop any questions in the app. I'll see you soon.'",
    },
  ],
  strengths: [
    "Excellent energy calibration — energy tracked the work-rest structure precisely throughout",
    "Strong class opening with clear format explanation and warmup purpose",
    "Solid cueing quality — alignment and setup language were detailed and consistent",
    "Effort acknowledgment was specific, genuine, and well-delivered",
    "Modification for jump movements offered proactively during work sets",
  ],
  improvements: [
    "Safety cues before high-impact movements (burpees, box jumps) need to be proactive, not reactive",
    "Cooldown was too short (45 seconds) — HIIT requires 3-4 minutes of structured recovery",
    "No next-class mention or ongoing support communication at close",
    "Some encouragement language was generic ('push harder') — replace with action-anchored cues",
  ],
  specificCueToTry:
    "Before burpees, say: 'Quick setup — if you have any knee or wrist sensitivity, step back instead of jumping, and walk your hands out instead of jumping them forward. Land with soft knees, toe-heel. We're going to avoid letting the chest collapse on the way down. Ready? Let's go.'",
  managerSummary:
    "Maya is close — genuinely close — to certification. Energy, cueing, and opening are all above threshold. Two specific gaps are holding her back: (1) safety cueing needs to become proactive before every high-impact movement, and (2) the closing requires a full 3-4 minute cooldown and a next-class communication. A targeted one-session coaching drill on safety setup language and closing structure should be sufficient for a successful resubmission.",
  instructorFeedback:
    "Hi Maya — your submission was impressive in a lot of ways. Your energy was exactly right for HIIT, your cueing was detailed, and your class opening was clear and welcoming. You're genuinely close to certification.\n\nTwo things are standing between you and your badge: (1) Safety cues need to happen before high-impact movements, not after. Before burpees, box jumps, or any high-intensity entry, give your members a 10-second setup: what to watch for, the modification, what to avoid. (2) Your cooldown needs to be 3-4 minutes — 45 seconds isn't enough recovery time after a HIIT session. End with a specific closing line and mention the next class.\n\nSubmit a new segment and you'll clear this. We're rooting for you.",
  resubmissionRequired: true,
  resubmissionInstructions:
    "Please resubmit a new 12-15 minute HIIT class segment demonstrating: (1) proactive safety cues (before high-impact movements, not after); and (2) a full 3-4 minute cooldown with intentional close and next-class mention. Everything else meets the standard — focus your resubmission on these two areas.",
  recommendedCoachingPlan: [
    {
      title: "Proactive Safety Setup Drill",
      priority: "High",
      reason: "Safety cueing score (6.9) fell below the 7.5 minimum criterion threshold.",
      suggestedDrill: "Write a 10-second safety script for each of your top 5 HIIT movements. Practice delivering the script before the movement in your next two practice sessions until it becomes automatic.",
    },
    {
      title: "Closing Structure Rehearsal",
      priority: "High",
      reason: "Cooldown was 45 seconds — below the required 3-4 minutes for HIIT.",
      suggestedDrill: "Record a standalone 4-minute closing sequence: full cooldown stretches, effort acknowledgment, recovery guidance, and next-class close. Rehearse until it flows naturally within any HIIT class.",
    },
  ],
  certificationBadge: { issued: false, title: "Not Issued", validThrough: null },
};

const demoSamanthaReed: CertificationResult = {
  reviewMode: "demo_sample",
  inputType: "video_transcript",
  instructorName: "Samantha Reed",
  studioName: "BloomFit Miami",
  classFormat: "Pilates",
  submissionType: "Certification class segment",
  rubricName: "BloomFit Instructor Certification Standard",
  overallScore: 8.7,
  readinessStatus: "Cleared",
  schedulingStatus: "Unlocked",
  readinessThreshold: 8.0,
  minimumCriterionThreshold: 7.5,
  confidenceScore: 94,
  confidenceLabel: "Very High",
  analysisBasis: "video_transcript",
  transcriptSummary:
    "Samantha's Pilates certification segment demonstrates a highly proficient class delivery that meets or exceeds all BloomFit certification criteria. A complete class opening with warmup context and session objective was delivered, cueing was specific and precise, safety cues were proactive before all high-load movements, and the class closed with a structured cooldown, genuine acknowledgment, and a next-class invitation. All five criteria scored above the 7.5 minimum threshold, and the overall score of 8.7 clears the 8.0 readiness threshold.",
  detectedMoments: [
    { momentType: "Complete Class Opening", timestampOrLine: "00:00–01:30", summary: "Welcome, session objective, warmup purpose, and intensity expectations all delivered in opening 90 seconds." },
    { momentType: "Proactive Safety Cue", timestampOrLine: "05:10", summary: "Full safety setup before plank series — modification, avoidance cue, and alignment reminder all present." },
    { momentType: "Precision Cueing Moment", timestampOrLine: "07:20", summary: "'Draw navel toward spine without holding breath — that's the Pilates breath' — excellent specificity." },
    { momentType: "Strong Closing", timestampOrLine: "11:30–13:00", summary: "Full 90-second cooldown with intentional close, effort acknowledgment, and next-class invitation." },
    { momentType: "Member Engagement Response", timestampOrLine: "09:45", summary: "Responded to visible member fatigue with a modification offer and encouragement — shows real-time awareness." },
  ],
  criterionScores: [
    {
      criterionName: "Class Opening",
      score: 8.8,
      status: "Excellent",
      subcheckScores: [
        { subcheck: "Warm welcome or confident start", score: 2, maxScore: 2, evidence: "'Good morning and welcome to Pilates at BloomFit Miami. I'm Samantha and today we're going to feel every bit of that core work.'", explanation: "Confident, personalized welcome that immediately established presence and warmth." },
        { subcheck: "Explains class format or session objective", score: 2, maxScore: 2, evidence: "'Today's focus is deep core activation and hip mobility — you're going to feel your transverse abdominis by the end of this.'", explanation: "Specific session objective clearly communicated." },
        { subcheck: "Explains warmup purpose", score: 2, maxScore: 2, evidence: "'We're starting with spinal articulation to warm up the vertebrae before we load the spine. Never skip this.'", explanation: "Warmup purpose was specific, anatomical, and reinforced the value of the warmup." },
        { subcheck: "Sets expectations for intensity/pacing/focus", score: 2, maxScore: 2, evidence: "'This is controlled effort — 7 out of 10 throughout. If anything spikes to a 9, modify.'", explanation: "Excellent perceived exertion anchor with a clear modification trigger." },
        { subcheck: "Gives clear first movement setup", score: 2, maxScore: 2, evidence: "'Come to your back, knees bent, feet flat, hip-width apart. We're starting in constructive rest — let your spine fully connect to the mat before we move.'", explanation: "Complete and precise first-movement setup with alignment and intention." },
      ],
      whatAIDetected: "All five opening subchecks were fully delivered in the first 90 seconds. Warmup purpose was particularly strong with anatomical specificity.",
      explanation: "Samantha's opening is exceptional. Every required element was present and the language was specific, professional, and member-centered.",
      timestampEvidence: ["00:00 — Welcome and name given.", "00:30 — Session objective stated.", "01:00 — Warmup purpose explained with anatomical language."],
      transcriptEvidence: ["'Today's focus is deep core activation and hip mobility — you're going to feel your transverse abdominis.'", "'This is controlled effort — 7 out of 10 throughout.'"],
      coachingRecommendation: "Opening is above threshold — maintain this standard. Consider adding a brief 'what to bring' safety anchor at the top: 'If anything doesn't feel right today, let me know and we'll find your version.'",
    },
    {
      criterionName: "Cueing Quality",
      score: 8.6,
      status: "Excellent",
      subcheckScores: [
        { subcheck: "Movement setup clear", score: 2, maxScore: 2, evidence: "Consistently detailed setups throughout — 'flat spine, shoulder blades wide, chin slightly tucked.'", explanation: "Every movement had a complete setup cue before beginning." },
        { subcheck: "Body position/alignment cues", score: 2, maxScore: 2, evidence: "'Draw your lower ribs toward your hip bones — that's your neutral spine in Pilates.'", explanation: "Highly specific Pilates alignment language used throughout." },
        { subcheck: "Tempo/direction/ROM", score: 2, maxScore: 2, evidence: "'Three-count lower, pause at the bottom, two-count lift.'", explanation: "Tempo consistently communicated with counts and pause instructions." },
        { subcheck: "Transitions cued before movement", score: 2, maxScore: 2, evidence: "All major transitions were cued 2-3 reps in advance.", explanation: "Excellent anticipation cueing — members were always prepared before movement changed." },
        { subcheck: "Specific concise language", score: 2, maxScore: 2, evidence: "Every cue was action-specific and direct.", explanation: "No generic language detected — all encouragement and instruction was anchored to specific actions." },
      ],
      whatAIDetected: "Cueing quality was a top-performing criterion. Pilates-specific alignment language, tempo cues with counts, and anticipation cueing all exceeded standards.",
      explanation: "Samantha's cueing quality is a genuine differentiator. The level of specificity — including anatomical references and consistent anticipation cueing — reflects advanced instructional skill.",
      timestampEvidence: ["04:30 — 'Three-count lower, pause, two-count lift.'", "07:20 — 'Draw navel toward spine without holding breath — that's the Pilates breath.'"],
      transcriptEvidence: ["'Draw your lower ribs toward your hip bones — that's your neutral spine in Pilates.'", "'Three-count lower, pause at the bottom, two-count lift.'"],
      coachingRecommendation: "Cueing is above threshold across all subchecks. Consider adding occasional 'what you should feel' cues — e.g., 'You should feel this in your lower abs, not your hip flexors' — to deepen the member learning experience.",
    },
    {
      criterionName: "Energy and Pacing",
      score: 8.5,
      status: "Excellent",
      subcheckScores: [
        { subcheck: "Energy matches format", score: 2, maxScore: 2, evidence: "Calm, focused, and controlled energy throughout — appropriate for Pilates.", explanation: "Energy was consistent with the Pilates format — present and engaged without being high-intensity." },
        { subcheck: "Consistent pacing", score: 2, maxScore: 2, evidence: "No timing issues or awkward pauses detected.", explanation: "Session flowed consistently from opening through closing." },
        { subcheck: "Smooth transitions", score: 2, maxScore: 2, evidence: "All transitions well-signaled with anticipation language.", explanation: "Transitions were the smoothest in the session — members were never caught off guard." },
        { subcheck: "Maintained presence", score: 2, maxScore: 2, evidence: "No instruction gaps detected across the full session.", explanation: "Continuous coaching presence throughout — no silence gaps or lost moments." },
        { subcheck: "Clear intensity changes", score: 1, maxScore: 2, evidence: "Intensity shifts communicated but not always quantified.", explanation: "Good communication of intensity changes but occasional vagueness in the degree of increase." },
      ],
      whatAIDetected: "Energy and pacing was uniformly strong. Format-appropriate energy, smooth transitions, and continuous presence detected throughout. Minor note on intensity-change quantification.",
      explanation: "Energy and pacing meets the Excellent standard. Continuous presence and smooth transitions are particularly strong.",
      timestampEvidence: ["00:00–13:00 — No instruction gaps detected.", "09:45 — Real-time modification offer in response to member fatigue."],
      transcriptEvidence: ["'We're moving into the hundred in two reps — start building your breath pattern now.'", "(No instruction gaps detected)"],
      coachingRecommendation: "Energy and pacing is above threshold. Consider adding explicit intensity quantification during transitions: 'We're stepping up to an 8 out of 10 here — if you're at a 9, take a breath and drop to mod.'",
    },
    {
      criterionName: "Safety Cues",
      score: 8.7,
      status: "Excellent",
      subcheckScores: [
        { subcheck: "Proactive safety cues", score: 2, maxScore: 2, evidence: "Safety cues delivered before every high-load movement observed.", explanation: "Every high-load movement was preceded by a proactive safety setup — no exceptions detected." },
        { subcheck: "Modifications/regressions offered", score: 2, maxScore: 2, evidence: "Modification offered for every exercise with a high-risk variant.", explanation: "Comprehensive modification language — never conditional ('if you need it') but normalizing ('here's your Pilates version')." },
        { subcheck: "Specific alignment reminders", score: 2, maxScore: 2, evidence: "'Lower back against the mat before you lift — not at the top.'", explanation: "Highly specific alignment reminders delivered at key moments." },
        { subcheck: "What to avoid", score: 2, maxScore: 2, evidence: "'Avoid arching your lower back — if you feel it, you've gone too far in your range.'", explanation: "Explicit avoidance language detected for high-risk movements." },
        { subcheck: "Breath/control/posture cues", score: 2, maxScore: 2, evidence: "Breath cueing used consistently throughout with Pilates-specific language.", explanation: "Breath cues were frequent, specific, and tied to effort patterns." },
      ],
      whatAIDetected: "Safety cueing was the strongest single subcheck area. All five subchecks were fully met. Proactive setup, normalizing modification language, and explicit avoidance cues all exceeded the standard.",
      explanation: "Safety cueing is exemplary. The normalizing approach to modifications — 'here's your Pilates version' rather than 'if you need it' — is exactly the BloomFit standard. This should be referenced as a training example.",
      timestampEvidence: ["05:10 — Full safety setup before plank series.", "08:30 — 'Avoid arching your lower back — if you feel it, you've gone too far.'"],
      transcriptEvidence: ["'Avoid arching your lower back — if you feel it, you've gone too far in your range.'", "'Here's your Pilates version — knees bent instead of legs extended.'"],
      coachingRecommendation: "Safety cueing is above threshold across all subchecks. This approach to modifications is a model for other BloomFit instructors. No coaching required.",
    },
    {
      criterionName: "Closing",
      score: 8.9,
      status: "Excellent",
      subcheckScores: [
        { subcheck: "Cooldown delivered", score: 2, maxScore: 2, evidence: "Full 2-minute cooldown sequence with three specific stretches.", explanation: "Complete cooldown with structured sequencing and cueing." },
        { subcheck: "Intentional non-abrupt close", score: 2, maxScore: 2, evidence: "Smooth transition from cooldown to close with pacing language.", explanation: "Wind-down was intentional — clear signal given before close." },
        { subcheck: "Acknowledges effort", score: 2, maxScore: 2, evidence: "'You gave everything to that core series — I saw it, and I want you to feel proud of what you just did.'", explanation: "Specific, genuine effort acknowledgment." },
        { subcheck: "Recovery/next step guidance", score: 2, maxScore: 2, evidence: "Hydration, nutrition timing window, and sleep/recovery notes given.", explanation: "Comprehensive recovery guidance — above standard." },
        { subcheck: "Mentions next class or ongoing support", score: 2, maxScore: 2, evidence: "'My next Pilates class is Thursday — and my DMs are open if you have questions.'", explanation: "Next class mentioned and personal availability offered." },
      ],
      whatAIDetected: "Closing was the highest-scoring criterion. All five subchecks fully met. Effort acknowledgment was specific and genuine. Recovery guidance exceeded the standard.",
      explanation: "Samantha's closing is exceptional — possibly the best single criterion performance in this batch. Every structural element was present, and the human acknowledgment was specific and sincere.",
      timestampEvidence: ["11:30 — Cooldown begins.", "12:50 — 'You gave everything to that core series — I saw it.'", "13:00 — 'My next Pilates class is Thursday.'"],
      transcriptEvidence: ["'You gave everything to that core series — I saw it, and I want you to feel proud of what you just did.'", "'My next Pilates class is Thursday — and my DMs are open if you have questions.'"],
      coachingRecommendation: "Closing is above threshold across all subchecks. This closing sequence is a BloomFit model example. No coaching required.",
    },
  ],
  strengths: [
    "Exceptional class opening — all five subchecks fully delivered with anatomical specificity",
    "Safety cueing was a standout — proactive, normalizing, and specific to Pilates risk areas",
    "Cueing quality was advanced — Pilates-specific alignment language, tempo counts, and anticipation cueing",
    "Closing was the highest-performing criterion — genuine effort acknowledgment and full recovery guidance",
    "Real-time member awareness — responded to visible member fatigue with an immediate modification offer",
  ],
  improvements: [
    "Intensity changes could be more explicitly quantified during transitions",
    "Consider adding 'what you should feel' cues to deepen the member learning experience",
    "Occasional encouragement could include a brief 'why' anchor to reinforce the biomechanical purpose",
  ],
  specificCueToTry:
    "After your next high-effort set, add a brief 'feel check' cue: 'Pause — where do you feel that? If it's in your lower abs and inner thighs, perfect. If it's in your hip flexors or lower back, let's adjust.' This turns a correction into a teaching moment.",
  managerSummary:
    "Samantha Reed is certified to teach live BloomFit members. Her Pilates segment exceeded all five certification criteria. Safety cueing and closing were exceptional and should be referenced as training examples for incoming instructors in the Miami studio. She is cleared for immediate scheduling and recommended for the advanced track mentorship program.",
  instructorFeedback:
    "Hi Samantha — congratulations. You've passed your BloomFit instructor certification. Your Pilates segment was outstanding across every criterion.\n\nYour safety cueing approach — normalizing modifications rather than offering them conditionally — is exactly the BloomFit standard, and your closing was one of the best we've reviewed. We'll be sharing elements of your class as a training reference for other instructors.\n\nYou are cleared to teach live BloomFit members. Welcome to the team.",
  resubmissionRequired: false,
  resubmissionInstructions: "",
  recommendedCoachingPlan: [
    {
      title: "Advanced Track Mentorship Consideration",
      priority: "Low",
      reason: "Samantha cleared all criteria with high confidence. She is a candidate for the lead instructor mentorship track.",
      suggestedDrill: "Shadow a BloomFit lead coach for one session and debrief on advanced class design principles. Focus on building progressive class architecture across a 6-week block.",
    },
  ],
  certificationBadge: { issued: true, title: "Certified to Teach", validThrough: "2027-06-10" },
};

// ─── Main Service Function ─────────────────────────────────────────────────────

export async function runInstructorCertificationReview(
  input: CertificationInput
): Promise<CertificationResult> {
  // Demo mode — return static data
  if (input.reviewMode === "demo_sample") {
    const name = input.instructorName?.toLowerCase() ?? "";
    if (name.includes("samantha") || name.includes("reed")) return demoSamanthaReed;
    if (name.includes("maya") || name.includes("stone")) return demaMayaStone;
    return demoJennaWhite;
  }

  // Video/audio without transcript
  if (
    (input.inputType === "video" || input.inputType === "audio") &&
    (!input.transcriptText || input.transcriptText.trim().length === 0)
  ) {
    return {
      reviewMode: "real_ai",
      inputType: input.inputType,
      instructorName: input.instructorName ?? "",
      studioName: input.studioName ?? "",
      classFormat: input.classFormat ?? "",
      submissionType: input.submissionType ?? "",
      rubricName: "BloomFit Instructor Certification Standard",
      overallScore: 0,
      readinessStatus: "Insufficient Evidence",
      schedulingStatus: "No Decision",
      readinessThreshold: input.readinessThreshold ?? 8.0,
      minimumCriterionThreshold: input.minimumCriterionThreshold ?? 7.5,
      confidenceScore: 0,
      confidenceLabel: "Low",
      analysisBasis: input.inputType,
      transcriptSummary: "",
      detectedMoments: [],
      criterionScores: [],
      strengths: [],
      improvements: [],
      specificCueToTry: "",
      managerSummary: "",
      instructorFeedback: "",
      resubmissionRequired: false,
      resubmissionInstructions: "",
      recommendedCoachingPlan: [],
      certificationBadge: { issued: false, title: "Not Issued", validThrough: null },
      error:
        "Audio extraction is not connected yet. Please paste the transcript manually or upload a transcript file.",
    };
  }

  // No transcript text
  if (!input.transcriptText || input.transcriptText.trim().length === 0) {
    return {
      reviewMode: "real_ai",
      inputType: input.inputType,
      instructorName: input.instructorName ?? "",
      studioName: input.studioName ?? "",
      classFormat: input.classFormat ?? "",
      submissionType: input.submissionType ?? "",
      rubricName: "BloomFit Instructor Certification Standard",
      overallScore: 0,
      readinessStatus: "Insufficient Evidence",
      schedulingStatus: "No Decision",
      readinessThreshold: input.readinessThreshold ?? 8.0,
      minimumCriterionThreshold: input.minimumCriterionThreshold ?? 7.5,
      confidenceScore: 0,
      confidenceLabel: "Low",
      analysisBasis: input.inputType,
      transcriptSummary: "",
      detectedMoments: [],
      criterionScores: [],
      strengths: [],
      improvements: [],
      specificCueToTry: "",
      managerSummary: "",
      instructorFeedback: "",
      resubmissionRequired: false,
      resubmissionInstructions: "",
      recommendedCoachingPlan: [],
      certificationBadge: { issued: false, title: "Not Issued", validThrough: null },
      error:
        "No transcript provided. Please paste a transcript or upload a transcript file.",
    };
  }

  // Word count check
  const wordCount = input.transcriptText.trim().split(/\s+/).length;
  if (wordCount < 150) {
    return {
      reviewMode: "real_ai",
      inputType: input.inputType,
      instructorName: input.instructorName ?? "",
      studioName: input.studioName ?? "",
      classFormat: input.classFormat ?? "",
      submissionType: input.submissionType ?? "",
      rubricName: "BloomFit Instructor Certification Standard",
      overallScore: 0,
      readinessStatus: "Insufficient Evidence",
      schedulingStatus: "No Decision",
      readinessThreshold: input.readinessThreshold ?? 8.0,
      minimumCriterionThreshold: input.minimumCriterionThreshold ?? 7.5,
      confidenceScore: 0,
      confidenceLabel: "Low",
      analysisBasis: input.inputType,
      transcriptSummary: "",
      detectedMoments: [],
      criterionScores: [],
      strengths: [],
      improvements: [],
      specificCueToTry: "",
      managerSummary: "",
      instructorFeedback: "",
      resubmissionRequired: false,
      resubmissionInstructions: "",
      recommendedCoachingPlan: [],
      certificationBadge: { issued: false, title: "Not Issued", validThrough: null },
      error:
        "This transcript is too short for a confident certification score. Please provide a longer class segment or recording (at least 150 words).",
    };
  }

  // No API key
  if (!process.env.OPENAI_API_KEY) {
    return {
      reviewMode: "real_ai",
      inputType: input.inputType,
      instructorName: input.instructorName ?? "",
      studioName: input.studioName ?? "",
      classFormat: input.classFormat ?? "",
      submissionType: input.submissionType ?? "",
      rubricName: "BloomFit Instructor Certification Standard",
      overallScore: 0,
      readinessStatus: "Insufficient Evidence",
      schedulingStatus: "No Decision",
      readinessThreshold: input.readinessThreshold ?? 8.0,
      minimumCriterionThreshold: input.minimumCriterionThreshold ?? 7.5,
      confidenceScore: 0,
      confidenceLabel: "Low",
      analysisBasis: input.inputType,
      transcriptSummary: "",
      detectedMoments: [],
      criterionScores: [],
      strengths: [],
      improvements: [],
      specificCueToTry: "",
      managerSummary: "",
      instructorFeedback: "",
      resubmissionRequired: false,
      resubmissionInstructions: "",
      recommendedCoachingPlan: [],
      certificationBadge: { issued: false, title: "Not Issued", validThrough: null },
      error:
        "Real CoachIQ AI scoring is not connected yet. Connect the QuantumByte AI agent to analyze uploaded recordings and transcripts.",
    };
  }

  // Real AI call
  const systemPrompt = `You are CoachIQ AI, a senior fitness instructor certification reviewer for BloomFit Studios.
Your job is to evaluate whether a new instructor is ready to teach live members.
Analyze the submitted transcript against the BloomFit Instructor Certification Standard.

Score the instructor from 0 to 10 on each of these 5 criteria:
1. Class Opening (subchecks: warm welcome 0-2pts, explains format/objective 0-2pts, explains warmup purpose 0-2pts, sets expectations 0-2pts, clear first movement setup 0-2pts)
2. Cueing Quality (subchecks: movement setup clear 0-2pts, body position/alignment 0-2pts, tempo/direction/ROM 0-2pts, transitions cued before movement 0-2pts, specific concise language 0-2pts)
3. Energy and Pacing (subchecks: energy matches format 0-2pts, consistent pacing 0-2pts, smooth transitions 0-2pts, maintained presence 0-2pts, clear intensity changes 0-2pts)
4. Safety Cues (subchecks: proactive safety cues 0-2pts, modifications/regressions offered 0-2pts, specific alignment reminders 0-2pts, what to avoid 0-2pts, breath/control/posture cues 0-2pts)
5. Closing (subchecks: cooldown delivered 0-2pts, intentional non-abrupt close 0-2pts, acknowledges effort 0-2pts, recovery/next step guidance 0-2pts, mentions next class/support 0-2pts)

Overall score = weighted average (each criterion 20%).
Readiness threshold: 8.0 overall, minimum 7.5 per criterion.
- Cleared: overall >= 8.0 AND all criteria >= 7.5
- Needs Resubmission: overall 7.0-7.9 OR any criterion < 7.5
- Not Cleared: overall < 7.0
- Insufficient Evidence: transcript too short or unclear

IMPORTANT RULES:
- Every score MUST cite specific evidence from the transcript
- If evidence is missing for a subcheck, score 0 and say "Not observed in transcript"
- Do not give generic feedback — be specific to the transcript
- If transcript is too short or unclear, return Insufficient Evidence status

Return ONLY a valid JSON object. No markdown fences, no preamble. The JSON must match this schema exactly:
{
  "reviewMode": "real_ai",
  "inputType": "<from input>",
  "instructorName": "<from input>",
  "studioName": "<from input>",
  "classFormat": "<from input>",
  "submissionType": "<from input>",
  "rubricName": "BloomFit Instructor Certification Standard",
  "overallScore": <number>,
  "readinessStatus": "<Cleared|Needs Resubmission|Not Cleared|Insufficient Evidence>",
  "schedulingStatus": "<Unlocked|Blocked|No Decision>",
  "readinessThreshold": 8.0,
  "minimumCriterionThreshold": 7.5,
  "confidenceScore": <0-100>,
  "confidenceLabel": "<Very High|High|Medium|Low>",
  "analysisBasis": "pasted_transcript",
  "transcriptSummary": "<2-3 sentence summary>",
  "detectedMoments": [{"momentType": "...", "timestampOrLine": "...", "summary": "..."}],
  "criterionScores": [
    {
      "criterionName": "Class Opening",
      "score": <number>,
      "status": "<Excellent|Meets Standard|Needs Coaching|Below Standard>",
      "subcheckScores": [
        {"subcheck": "Warm welcome or confident start", "score": <0-2>, "maxScore": 2, "evidence": "...", "explanation": "..."},
        {"subcheck": "Explains class format or session objective", "score": <0-2>, "maxScore": 2, "evidence": "...", "explanation": "..."},
        {"subcheck": "Explains warmup purpose", "score": <0-2>, "maxScore": 2, "evidence": "...", "explanation": "..."},
        {"subcheck": "Sets expectations for intensity/pacing/focus", "score": <0-2>, "maxScore": 2, "evidence": "...", "explanation": "..."},
        {"subcheck": "Gives clear first movement setup", "score": <0-2>, "maxScore": 2, "evidence": "...", "explanation": "..."}
      ],
      "whatAIDetected": "...",
      "explanation": "...",
      "timestampEvidence": ["..."],
      "transcriptEvidence": ["..."],
      "coachingRecommendation": "..."
    }
  ],
  "strengths": ["...", "..."],
  "improvements": ["...", "..."],
  "specificCueToTry": "...",
  "managerSummary": "...",
  "instructorFeedback": "...",
  "resubmissionRequired": <boolean>,
  "resubmissionInstructions": "...",
  "recommendedCoachingPlan": [
    {"title": "...", "priority": "...", "reason": "...", "suggestedDrill": "..."}
  ],
  "certificationBadge": {
    "issued": <boolean>,
    "title": "<Certified to Teach|Not Issued>",
    "validThrough": "<date string or null>"
  }
}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Instructor: ${input.instructorName}\nStudio: ${input.studioName}\nClass Format: ${input.classFormat}\nInput Type: ${input.inputType}\n\nTRANSCRIPT:\n${input.transcriptText}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", response.status, errText);
      return {
        reviewMode: "real_ai",
        inputType: input.inputType,
        instructorName: input.instructorName ?? "",
        studioName: input.studioName ?? "",
        classFormat: input.classFormat ?? "",
        submissionType: input.submissionType ?? "",
        rubricName: "BloomFit Instructor Certification Standard",
        overallScore: 0,
        readinessStatus: "Insufficient Evidence",
        schedulingStatus: "No Decision",
        readinessThreshold: input.readinessThreshold ?? 8.0,
        minimumCriterionThreshold: input.minimumCriterionThreshold ?? 7.5,
        confidenceScore: 0,
        confidenceLabel: "Low",
        analysisBasis: input.inputType,
        transcriptSummary: "",
        detectedMoments: [],
        criterionScores: [],
        strengths: [],
        improvements: [],
        specificCueToTry: "",
        managerSummary: "",
        instructorFeedback: "",
        resubmissionRequired: false,
        resubmissionInstructions: "",
        recommendedCoachingPlan: [],
        certificationBadge: { issued: false, title: "Not Issued", validThrough: null },
        error: `OpenAI API returned an error (${response.status}). Please try again.`,
      };
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content) as CertificationResult;
    return result;
  } catch (err) {
    console.error("OpenAI call failed:", err);
    return {
      reviewMode: "real_ai",
      inputType: input.inputType,
      instructorName: input.instructorName ?? "",
      studioName: input.studioName ?? "",
      classFormat: input.classFormat ?? "",
      submissionType: input.submissionType ?? "",
      rubricName: "BloomFit Instructor Certification Standard",
      overallScore: 0,
      readinessStatus: "Insufficient Evidence",
      schedulingStatus: "No Decision",
      readinessThreshold: input.readinessThreshold ?? 8.0,
      minimumCriterionThreshold: input.minimumCriterionThreshold ?? 7.5,
      confidenceScore: 0,
      confidenceLabel: "Low",
      analysisBasis: input.inputType,
      transcriptSummary: "",
      detectedMoments: [],
      criterionScores: [],
      strengths: [],
      improvements: [],
      specificCueToTry: "",
      managerSummary: "",
      instructorFeedback: "",
      resubmissionRequired: false,
      resubmissionInstructions: "",
      recommendedCoachingPlan: [],
      certificationBadge: { issued: false, title: "Not Issued", validThrough: null },
      error: "AI analysis failed. Please try again.",
    };
  }
}
