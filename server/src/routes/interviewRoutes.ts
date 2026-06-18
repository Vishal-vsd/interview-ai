import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { deleteInterview, evaluateCompleteInterview, evaluateInterviewAnswers, generateInterviewQuestions, getAnalytics, getInterviewById, getInterviewStats, interviewHistory, submitInterview } from "../controllers/interviewController";

const router = express.Router();

router.post("/generate", authMiddleware, generateInterviewQuestions)
router.post("/evaluate", authMiddleware, evaluateInterviewAnswers)
router.post("/evaluate-complete", authMiddleware, evaluateCompleteInterview)
router.post("/submit", authMiddleware, submitInterview)
router.get("/history", authMiddleware, interviewHistory)
router.get("/analytics", authMiddleware, getAnalytics)
router.get("/stats", authMiddleware, getInterviewStats)
router.get("/:id", authMiddleware, getInterviewById)
router.delete("/history/:id", authMiddleware, deleteInterview)

export default router;