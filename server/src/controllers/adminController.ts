import { Request, Response } from "express";
import User from "../models/User";
import Interview from "../models/Interview";


export const getAdminStats = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();
    const totalInterviews = await Interview.countDocuments();

    const scoreStats = await Interview.aggregate([
      {
        $group: {
          _id: null,
          averagePlatformScore: {
            $avg: "$overallScore",
          },
        },
      },
    ]);

    const averagePlatformScore = scoreStats[0]?.averagePlatformScore || 0;

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalInterviews,
        averagePlatformScore: Number(averagePlatformScore.toFixed(1)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllUsers = async(req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().select("-password").sort({createdAt: -1})

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getAllInterviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const interviews = await Interview.find().populate("user", "name email role")
        res.status(200).json({
            success: true,
            count: interviews.length,
            interviews
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}