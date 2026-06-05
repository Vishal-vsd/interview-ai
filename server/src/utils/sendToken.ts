import { Response } from "express";
import jwt from "jsonwebtoken";

const sendToken = (
    userId: string,
    res: Response,
    statusCode: number,
    message: string,
    user: any
) => {
    const token = jwt.sign(
        {id: userId},
        process.env.JWT_SECRET as string,
        {expiresIn: "7d"}
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(statusCode).json({
        success: true,
        message,
        user
    })
}

export default sendToken