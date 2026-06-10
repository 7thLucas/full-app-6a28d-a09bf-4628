import { Router } from "express";
import { analyzeCertification } from "./certification.controller";

const router = Router();
router.post("/analyze", analyzeCertification);
export default router;
