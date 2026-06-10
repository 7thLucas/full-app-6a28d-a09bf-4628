import { useState, useRef } from "react";
import { Upload, Mic, FileText, Video, ArrowLeft, Beaker } from "lucide-react";
import { cn } from "~/lib/cn";
import { TranscriptPanel } from "~/components/certification/TranscriptPanel";
import { demoJennaWhitePublic, demoMayaStonePublic, demoSamanthaReedPublic } from "~/components/certification/demo-data";
import type { CertificationResult } from "~/services/certification.service";

type InputMethod = "video" | "audio" | "transcript" | "transcript_file" | null;

interface FormData {
  instructorName: string;
  studioName: string;
  classFormat: string;
  instructorRole: string;
  submissionType: string;
  reviewMode: "real_ai" | "demo_sample";
}

interface NewCertificationReviewProps {
  onSubmit: (formData: FormData & { inputType: string }, transcriptText: string) => void;
  onCancel: () => void;
  onLoadDemo?: (data: CertificationResult) => void;
}

const SELECT_CLASSES =
  "w-full h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 appearance-none";

const INPUT_CLASSES =
  "w-full h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300";

const LABEL_CLASSES = "block text-xs font-medium text-slate-600 mb-1.5";

export function NewCertificationReview({ onSubmit, onCancel, onLoadDemo }: NewCertificationReviewProps) {
  const [form, setForm] = useState<FormData>({
    instructorName: "Jenna White",
    studioName: "BloomFit Denver Launch",
    classFormat: "Pilates",
    instructorRole: "New Instructor",
    submissionType: "Certification class segment",
    reviewMode: "real_ai",
  });

  const [activeInput, setActiveInput] = useState<InputMethod>(null);
  const [transcriptText, setTranscriptText] = useState("");
  const [fileUploadNote, setFileUploadNote] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const transcriptFileRef = useRef<HTMLInputElement>(null);

  const updateForm = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const inputTypeMap: Record<NonNullable<InputMethod>, string> = {
    video: "video",
    audio: "audio",
    transcript: "pasted_transcript",
    transcript_file: "uploaded_transcript",
  };

  const handleSubmit = () => {
    const inputType = activeInput ? inputTypeMap[activeInput] : "pasted_transcript";
    onSubmit({ ...form, inputType }, transcriptText);
  };

  const handleTranscriptFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setTranscriptText(text ?? "");
      setFileUploadNote(`Loaded: ${file.name} (${Math.round(file.size / 1024)} KB)`);
    };
    reader.readAsText(file);
  };

  const isDemoMode = form.reviewMode === "demo_sample";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to overview
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">New Instructor Certification Review</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit a new instructor for AI-reviewed certification scoring against the BloomFit standard.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Submission form */}
          <div className="grid grid-cols-2 gap-4">
            {/* Instructor Name */}
            <div>
              <label className={LABEL_CLASSES}>Instructor Name</label>
              <input
                type="text"
                value={form.instructorName}
                onChange={(e) => updateForm("instructorName", e.target.value)}
                className={INPUT_CLASSES}
                placeholder="Full name"
              />
            </div>

            {/* Studio */}
            <div>
              <label className={LABEL_CLASSES}>Studio</label>
              <div className="relative">
                <select
                  value={form.studioName}
                  onChange={(e) => updateForm("studioName", e.target.value)}
                  className={SELECT_CLASSES}
                >
                  <option>BloomFit West Loop</option>
                  <option>BloomFit SoHo</option>
                  <option>BloomFit Austin</option>
                  <option>BloomFit Miami</option>
                  <option>BloomFit Denver Launch</option>
                </select>
              </div>
            </div>

            {/* Class Format */}
            <div>
              <label className={LABEL_CLASSES}>Class Format</label>
              <div className="relative">
                <select
                  value={form.classFormat}
                  onChange={(e) => updateForm("classFormat", e.target.value)}
                  className={SELECT_CLASSES}
                >
                  <option>Pilates</option>
                  <option>Yoga</option>
                  <option>HIIT</option>
                  <option>Strength</option>
                  <option>Recovery</option>
                </select>
              </div>
            </div>

            {/* Instructor Role */}
            <div>
              <label className={LABEL_CLASSES}>Instructor Role</label>
              <div className="relative">
                <select
                  value={form.instructorRole}
                  onChange={(e) => updateForm("instructorRole", e.target.value)}
                  className={SELECT_CLASSES}
                >
                  <option>New Instructor</option>
                  <option>Assistant Coach</option>
                  <option>Coach Candidate</option>
                  <option>Returning Instructor</option>
                </select>
              </div>
            </div>

            {/* Submission Type */}
            <div>
              <label className={LABEL_CLASSES}>Submission Type</label>
              <div className="relative">
                <select
                  value={form.submissionType}
                  onChange={(e) => updateForm("submissionType", e.target.value)}
                  className={SELECT_CLASSES}
                >
                  <option>Certification class segment</option>
                  <option>Role-play teaching video</option>
                  <option>Audio teaching sample</option>
                  <option>Transcript-only review</option>
                </select>
              </div>
            </div>

            {/* Review Mode */}
            <div>
              <label className={LABEL_CLASSES}>Review Mode</label>
              <div className="relative">
                <select
                  value={form.reviewMode}
                  onChange={(e) => updateForm("reviewMode", e.target.value as "real_ai" | "demo_sample")}
                  className={SELECT_CLASSES}
                >
                  <option value="real_ai">Real AI Review</option>
                  <option value="demo_sample">Demo Sample Review</option>
                </select>
              </div>
            </div>

            {/* Read-only fields */}
            <div>
              <label className={LABEL_CLASSES}>Certification Rubric</label>
              <div className="h-9 rounded-lg border border-slate-100 bg-slate-50 px-3 flex items-center text-sm text-slate-500">
                BloomFit Instructor Certification Standard
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLASSES}>Readiness Threshold</label>
                <div className="h-9 rounded-lg border border-slate-100 bg-slate-50 px-3 flex items-center text-sm text-slate-500">
                  8.0 / 10
                </div>
              </div>
              <div>
                <label className={LABEL_CLASSES}>Min Criterion</label>
                <div className="h-9 rounded-lg border border-slate-100 bg-slate-50 px-3 flex items-center text-sm text-slate-500">
                  7.5 / 10
                </div>
              </div>
            </div>
          </div>

          {/* Demo mode buttons */}
          {isDemoMode && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Beaker className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-800">Demo Sample Mode</span>
                <span className="text-xs text-amber-600 ml-1">
                  Load a pre-built demo result to explore the full results UI without needing an API key.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onLoadDemo?.(demoJennaWhitePublic)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 border border-red-200 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Load Failed Demo — Jenna White (5.9)
                </button>
                <button
                  onClick={() => onLoadDemo?.(demoMayaStonePublic)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-200 transition-colors"
                >
                  Load Resubmission Demo — Maya Stone (7.4)
                </button>
                <button
                  onClick={() => onLoadDemo?.(demoSamanthaReedPublic)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-100 text-green-700 border border-green-200 rounded-lg hover:bg-green-200 transition-colors"
                >
                  Load Passed Demo — Samantha Reed (8.7)
                </button>
              </div>
            </div>
          )}

          {/* Input method cards */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Select Input Method</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Upload Video */}
              <button
                onClick={() => {
                  setActiveInput("video");
                  setFileUploadNote("Audio extraction from video is not connected yet. Please paste or upload a transcript instead.");
                }}
                className={cn(
                  "flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all",
                  activeInput === "video"
                    ? "border-blue-300 bg-blue-50 ring-1 ring-blue-300"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Video className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Upload Video</p>
                  <p className="text-xs text-slate-500">MP4/MOV/WebM · max 1GB</p>
                </div>
              </button>

              {/* Upload Audio */}
              <button
                onClick={() => {
                  setActiveInput("audio");
                  setFileUploadNote("Audio extraction is not connected yet. Please paste or upload a transcript instead.");
                }}
                className={cn(
                  "flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all",
                  activeInput === "audio"
                    ? "border-blue-300 bg-blue-50 ring-1 ring-blue-300"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Mic className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Upload Audio</p>
                  <p className="text-xs text-slate-500">MP3/WAV/M4A</p>
                </div>
              </button>

              {/* Paste Transcript */}
              <button
                onClick={() => setActiveInput("transcript")}
                className={cn(
                  "flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all",
                  activeInput === "transcript"
                    ? "border-blue-300 bg-blue-50 ring-1 ring-blue-300"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Paste Transcript</p>
                  <p className="text-xs text-slate-500">Primary method — full AI analysis</p>
                </div>
              </button>

              {/* Upload Transcript File */}
              <button
                onClick={() => {
                  setActiveInput("transcript_file");
                  transcriptFileRef.current?.click();
                }}
                className={cn(
                  "flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all",
                  activeInput === "transcript_file"
                    ? "border-blue-300 bg-blue-50 ring-1 ring-blue-300"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Upload className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Upload Transcript File</p>
                  <p className="text-xs text-slate-500">TXT/DOCX/PDF</p>
                </div>
              </button>
            </div>

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
            />
            <input
              ref={transcriptFileRef}
              type="file"
              accept=".txt,.doc,.docx,.pdf"
              className="hidden"
              onChange={handleTranscriptFileUpload}
            />

            {/* Notes for non-transcript methods */}
            {(activeInput === "video" || activeInput === "audio") && fileUploadNote && (
              <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-sm text-amber-800">{fileUploadNote}</p>
                <p className="text-xs text-amber-600 mt-1">
                  Select "Paste Transcript" or "Upload Transcript File" to proceed with AI analysis.
                </p>
              </div>
            )}

            {activeInput === "transcript_file" && fileUploadNote && (
              <div className="mt-3 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5">
                <p className="text-xs text-green-700 font-medium">{fileUploadNote}</p>
              </div>
            )}
          </div>

          {/* Transcript panel */}
          {(activeInput === "transcript" || (activeInput === "transcript_file" && transcriptText)) && (
            <TranscriptPanel
              value={transcriptText}
              onChange={setTranscriptText}
              onAnalyze={handleSubmit}
            />
          )}

          {/* Submit button */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSubmit}
              disabled={
                !isDemoMode &&
                (activeInput === "video" || activeInput === "audio") &&
                !transcriptText
              }
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors",
                "bg-blue-600 text-white hover:bg-blue-700",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
              )}
            >
              Start CoachIQ AI Review
            </button>
            <button
              onClick={onCancel}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
