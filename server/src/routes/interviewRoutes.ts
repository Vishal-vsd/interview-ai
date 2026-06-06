import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { generateInterviewQuestions } from "../controllers/interviewController";

const router = express.Router();

router.post("/generate", authMiddleware, generateInterviewQuestions)

export default router;