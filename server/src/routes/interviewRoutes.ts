import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { evaluateInterviewAnswers, generateInterviewQuestions } from "../controllers/interviewController";

const router = express.Router();

router.post("/generate", authMiddleware, generateInterviewQuestions)
router.post("/evaluate", authMiddleware, evaluateInterviewAnswers)

export default router;