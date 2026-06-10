import type { Request, Response } from "express";
import { runInstructorCertificationReview } from "~/services/certification.service";

export async function analyzeCertification(req: Request, res: Response) {
  try {
    const input = req.body;

    if (
      !input.transcriptText &&
      input.reviewMode === "real_ai" &&
      (input.inputType === "pasted_transcript" ||
        input.inputType === "uploaded_transcript")
    ) {
      return res.status(400).json({
        error: "Transcript text is required for analysis.",
      });
    }

    const result = await runInstructorCertificationReview(input);
    return res.json({ data: result });
  } catch (err) {
    console.error("Certification analysis error:", err);
    return res.status(500).json({ error: "Analysis failed. Please try again." });
  }
}
