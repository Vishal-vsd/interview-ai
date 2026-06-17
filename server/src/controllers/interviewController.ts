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

export const evaluateCompleteInterview = async(req: Request, res:Response): Promise<void> => {
  try {
    const {questions} = req.body;

    if(!questions || !Array.isArray(questions)){
      res.status(400).json({
        success: false,
        message: "Questions array is required"
      })
      return
    }

    const result = await evaluateInterview(questions);

    res.status(200).json({
      success: true,
      result,
    })
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to evaluate interview"
    })
  }
}

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

    const hasEmptyAnswers = questions.some((q) => !q.answer?.trim())

    if(hasEmptyAnswers){
      res.status(400).json({
        success: false,
        message: "All questions must be answered"
      })

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

export const getInterviewStats = async(req: Request, res: Response): Promise<void> => {
    try {
        const user = (req as any).user
        const stats = await Interview.aggregate([
            {
                $match: {
                    user: user._id
                }
            },
            {
                $group: {
                    _id: null,
                    totalInterviews: {
                        $sum: 1
                    },
                    averageScore: {
                        $avg: "$overallScore"
                    },
                    bestScore: {
                        $max: "$overallScore"
                    }
                }
            }
        ])
        
        const recentInterviews = await Interview.find({
          user: user._id
        }).sort({createdAt: -1}).limit(5).select("role difficulty overallScore createdAt")

        const result = stats[0]
        ? {
            totalInterviews: stats[0].totalInterviews,
            averageScore: Number(stats[0].averageScore.toFixed(1)),
            bestScore: stats[0].bestScore
        }
        : {
            totalInterviews: 0,
            averageScore: 0,
            bestScore: 0,
        }
        res.status(200).json({
            success: true,
            stats: result,
            recentInterviews
        })
        } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteInterview = async(req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const {id} = req.params;

    const interview = await Interview.findOne({
      _id: id,
      user: user._id
    });

    if(!interview){
      res.status(404).json({
        success: false,
        message: "Interview not found"
      })
      return
    }

    await Interview.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Interview deleted successfully"
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

