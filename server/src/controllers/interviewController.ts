import { Request, Response } from "express";
import {
  evaluateAnswer,
  evaluateInterview,
  generateQuestions,
} from "../services/geminiService";
import Interview from "../models/Interview";

export const generateInterviewQuestions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { role, difficulty } = req.body;

    if (!role || !difficulty) {
      res.status(400).json({
        success: false,
        message: "Role and difficulty are required",
      });
      return;
    }

    const questions = await generateQuestions(role, difficulty);

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to generate questions",
    });
  }
};

export const evaluateInterviewAnswers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      res.status(400).json({
        success: false,
        message: "Question and answer are required",
      });
      return;
    }

    const result = await evaluateAnswer(question, answer);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to evaluate answer",
    });
  }
};

export const submitInterview = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { role, difficulty, questions } = req.body;
    if (
      !role ||
      !difficulty ||
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    const evaluation = await evaluateInterview(questions);

    const interview = await Interview.create({
      user: (req as any).user._id,
      role,
      difficulty,

      questions: evaluation.results,

      overallScore: evaluation.overallScore,
    });

    res.status(201).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const interviewHistory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {

    const user = (req as any).user;

    const interviews = await Interview.find({
      user: user._id,
    }).sort({ createdAt: -1 });

    if (interviews.length === 0) {
      res.status(404).json({
        success: false,

        message: "No interviews found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const getInterviewById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = (req as any).user;

    const { id } = req.params;

    if (!id) {
    }

    const interview = await Interview.findOne({
      _id: id,
      user: user._id,
    });

    if (!interview) {
      res.status(404).json({
        success: false,
        message: "Interview not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
