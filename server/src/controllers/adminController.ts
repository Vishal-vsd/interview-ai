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

    const recentInterviews = await Interview.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("role difficulty overallScore createdAt");

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
        recentInterviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllInterviews = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const interviews = await Interview.find().populate(
      "user",
      "name email role",
    );
    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getInterviewByIdAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id).populate(
      "user",
      "name email",
    );

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

export const getUserDetails = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });

      return;
    }

    const interviews = await Interview.find({
      user: id,
    }).sort({ createdAt: -1 });

    const totalInterviews = interviews.length;

    const averageScore =
      totalInterviews > 0
        ? interviews.reduce(
            (sum, interview) => sum + interview.overallScore,
            0,
          ) / totalInterviews
        : 0;

    const highestScore =
      totalInterviews > 0
        ? Math.max(...interviews.map((i) => i.overallScore))
        : 0;

    res.status(200).json({
      success: true,
      user,
      stats: {
        totalInterviews,
        averageScore: Number(averageScore.toFixed(1)),
        highestScore,
      },
      recentInterviews: interviews.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
