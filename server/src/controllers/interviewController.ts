import { Request, Response } from "express";
import { evaluateAnswer, generateQuestions } from "../services/geminiService";

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

export const evaluateInterviewAnswers = async(req: Request, res: Response): Promise<void> => {
    try {
        const {question, answer} = req.body;

        if(!question || !answer){
            res.status(400).json({
                success: false,
                message: "Question and answer are required"
            })
        }

        const result = await evaluateAnswer(question, answer);

        res.status(200).json({
            success: true,
            result,
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to evaluate answer",
        })
    }
}