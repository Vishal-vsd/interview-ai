import { Request, Response } from "express";
import { generateQuestions } from "../services/geminiService";

export const generateInterviewQuestions = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const { role, difficulty } = req.body;

        if(!role || !difficulty){
            res.status(400).json({
                success: false,
                message: "Role and difficulty are required"
            });
            return;
        }

        const questions = await generateQuestions(role, difficulty);

        res.status(200).json({
            success: true,
            questions
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to generate questions"
        })
    }
}