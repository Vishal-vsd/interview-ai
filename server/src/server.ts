import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes"
import interviewRoutes from "./routes/interviewRoutes"

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/interview", interviewRoutes)

app.get("/", (req, res) => {
  res.send("Interview AI API running");
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on ${PORT}`);
});
