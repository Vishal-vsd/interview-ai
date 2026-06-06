import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { evaluateInterviewAnswers, generateInterviewQuestions, getInterviewById, interviewHistory, submitInterview } from "../controllers/interviewController";

const router = express.Router();

router.post("/generate", authMiddleware, generateInterviewQuestions)
router.post("/evaluate", authMiddleware, evaluateInterviewAnswers)
router.post("/submit", authMiddleware, submitInterview)
router.get("/history", authMiddleware, interviewHistory)
router.get("/:id", authMiddleware, getInterviewById)

export default router;