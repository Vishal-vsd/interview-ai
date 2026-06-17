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

    const recentInterviews = await Interview.find().sort({createdAt: -1}).limit(5).select("role difficulty overallScore createdAt")

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
        recentInterviews
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

export const deleteUser = async (req: Request, res: Response): Promise<void>=> {
  try {
    const {id} = req.params;
    const user = await User.findById(id);

    if(!user){
      res.status(404).json({
        success: false,
        message: "User not found"
      })
      return;
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}