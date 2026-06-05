import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    if(!process.env.JWT_SECRET){
        throw new Error("JWT_SECRET is missing")
    }
    const token = jwt.sign(
      {id: user._id,},
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    })
  }
};

const loginUser = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message: "Invalid credentials"
            })
        }

        const isMatch = await (user as any).comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Incorrent password"
            })
        }

        if(!process.env.JWT_SECRET){
            throw new Error("JWT_SECRET is missing")
        }
        
        const token = jwt.sign(
            {id: (user as any)._id},
            process.env.JWT_SECRET as string,
            {expiresIn: "7d"}
        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                _id: (user as any)._id,
                name: (user as any).name,
                email: (user as any).email,
                role: (user as any).role
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export {registerUser, loginUser};
