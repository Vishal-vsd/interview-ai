import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInterviewById } from "../services/interviewService";

const InterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState<any>(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const data = await getInterviewById(id!);

        if (data.success) {
          setInterview(data.interview);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInterview();
  }, [id]);

  if (!interview) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-400";
    if (score >= 5) return "text-yellow-400";

    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <button
          onClick={() => navigate("/history")}
          className="
    mb-6
    rounded-xl
    border
    border-zinc-800
    px-4
    py-2
    transition
    hover:border-zinc-600
  "
        >
          ← Back to History
        </button>
        <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm uppercase tracking-wider text-zinc-500">
                Interview Details
              </p>

              <h1 className="text-4xl font-bold">{interview.role}</h1>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-zinc-800 px-4 py-2 text-sm">
                  {interview.difficulty}
                </span>

                <span className="rounded-full bg-zinc-800 px-4 py-2 text-sm">
                  {new Date(interview.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-zinc-500">Overall Score</p>

              <h2 className="mt-2 text-6xl font-bold text-green-400">
                {interview.overallScore}/10
              </h2>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {interview.questions.map((question: any, index: number) => (
            <div
              key={index}
              className="
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900
                p-6
              "
            >
              <h2 className="mb-3 text-lg font-semibold text-zinc-500">
                Question {index + 1}
              </h2>

              <p className="mb-5 text-zinc-300">{question.question}</p>

              <div className="mb-5 rounded-2xl bg-zinc-950 p-4">
                <h3 className="mb-2 font-medium">Your Answer</h3>

                <p className="text-zinc-400">{question.answer}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Evaluation</span>

                <span className={`font-bold ${getScoreColor(question.score)}`}>
                  {question.score}/10
                </span>
              </div>

              <div className="mt-4 rounded-2xl bg-zinc-950 p-4">
                <h3 className="mb-2 font-medium">Feedback</h3>

                <p className="text-zinc-400">{question.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;
