import { useState } from "react";
import { FileText, Trash2, Beaker } from "lucide-react";
import { cn } from "~/lib/cn";

const DEMO_TRANSCRIPT = `[00:00] Instructor: Welcome everyone. Today we're starting with a warmup focused on core activation and breath.
[00:20] Instructor: Set your feet hip-width apart and soften your knees.
[00:40] Instructor: We're going to spend about 5 minutes warming up before we get into the main work. The goal today is deep core and hip mobility.
[01:10] Instructor: Inhale to prepare, exhale and draw your navel in. Feel your lower back connecting to the mat.
[01:45] Instructor: We'll move into plank next. Keep your shoulders stacked over your wrists.
[02:30] Instructor: If you feel any pressure in your lower back, lower your knees and shorten the range — that's your version of this exercise.
[03:15] Instructor: Good. Now let's slow it down — 4 counts down into your squat, pause at the bottom, 2 counts back up.
[04:00] Instructor: Remember to avoid rounding your upper back — keep your chest open and your gaze slightly forward.
[05:10] Instructor: Before we go into our plank series — if you have any wrist sensitivity, come down to your forearms. We want your core doing the work here, not your neck or shoulders.
[06:20] Instructor: Hold for 20 seconds. Breathe. Exhale on effort.
[07:00] Instructor: Nice. Let's transition — feet hip-width, we're going into alternating side planks in 2 reps.
[07:45] Instructor: Keep that hip lifted — avoid letting it sag. If it drops, bring your bottom knee down.
[08:30] Instructor: Great work. Let's slow the breath down and move into our cooldown.
[09:00] Instructor: Child's pose — let your spine decompress. Breathe into your lower back.
[10:00] Instructor: Figure four stretch — cross your ankle over your knee and gently press.
[11:00] Instructor: Wonderful work today. You gave everything to that core series. Book your next class and let me know if you need modifications next time.
[11:45] Instructor: I'll see you Thursday. My DMs are open if you have questions. Have a great rest of your day.`;

interface TranscriptPanelProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isProcessing?: boolean;
}

export function TranscriptPanel({
  value,
  onChange,
  onAnalyze,
  isProcessing = false,
}: TranscriptPanelProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  const handleLoadDemo = () => {
    onChange(DEMO_TRANSCRIPT);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Paste Certification Transcript</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Paste the instructor's actual class segment transcript. Timestamps are recommended but not required.
            </p>
          </div>
        </div>
        <div className={cn(
          "text-xs font-medium px-2 py-0.5 rounded-full border",
          wordCount === 0
            ? "bg-slate-50 text-slate-400 border-slate-200"
            : wordCount < 150
            ? "bg-amber-50 text-amber-700 border-amber-200"
            : "bg-green-50 text-green-700 border-green-200"
        )}>
          {wordCount} words
          {wordCount > 0 && wordCount < 150 && " (min 150)"}
        </div>
      </div>

      <div className="p-5">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isProcessing}
          rows={10}
          className={cn(
            "w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800",
            "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300",
            "font-mono leading-relaxed transition-colors",
            isProcessing && "opacity-50 cursor-not-allowed"
          )}
          placeholder={`[00:00] Instructor: Welcome everyone. Today we're starting with a warmup focused on core activation and breath.
[00:20] Instructor: Set your feet hip-width apart and soften your knees.
[01:10] Instructor: We'll move into plank next. Keep your shoulders stacked over your wrists.
[02:45] Instructor: If you feel pressure in your lower back, lower your knees and shorten the range.
[08:30] Instructor: Let's slow the breath down and finish with a short cooldown.
[11:45] Instructor: Great work today. Book your next class and let me know if you need modifications.`}
        />

        <p className="mt-2 text-xs text-slate-400">
          Use timestamps if available. CoachIQ can still analyze non-timestamped transcripts, but timestamped transcripts produce better evidence mapping.
        </p>

        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={onAnalyze}
            disabled={isProcessing || wordCount === 0}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              "bg-blue-600 text-white hover:bg-blue-700",
              (isProcessing || wordCount === 0) && "opacity-50 cursor-not-allowed hover:bg-blue-600"
            )}
          >
            Analyze Transcript
          </button>
          <button
            onClick={handleClear}
            disabled={isProcessing}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
          <button
            onClick={handleLoadDemo}
            disabled={isProcessing}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Beaker className="h-3.5 w-3.5" />
            Load Demo Transcript
          </button>
        </div>
      </div>
    </div>
  );
}
