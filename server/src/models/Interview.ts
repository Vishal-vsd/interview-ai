import mongoose, { Document, Types } from "mongoose";

interface IQuestion {
  question: string;
  answer: string;
  score: number;
  feedback: string;
}

export interface IInterview extends Document {
  user: Types.ObjectId;
  role: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";

  questions: IQuestion[];

  overallScore: number;

  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      default: "",
      trim: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    feedback: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const interviewSchema = new mongoose.Schema<IInterview>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    questions: {
      type: [questionSchema],
      default: [],
    },
    overallScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Interview = mongoose.model<IInterview>("Interview", interviewSchema);

export default Interview;