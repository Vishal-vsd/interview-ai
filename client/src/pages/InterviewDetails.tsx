import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInterviewById } from "../services/interviewService";

const InterviewDetails = () => {
  const { id } = useParams();

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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <h1 className="text-4xl font-bold">{interview.role}</h1>

          <div className="mt-4 flex items-center gap-4">
            <span className="rounded-full bg-zinc-800 px-4 py-2">
              {interview.difficulty}
            </span>

            <span className="rounded-full bg-white px-4 py-2 font-bold text-black">
              {interview.overallScore}/10
            </span>
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
              <h2 className="mb-3 text-xl font-semibold">
                Question {index + 1}
              </h2>

              <p className="mb-5 text-zinc-300">{question.question}</p>

              <div className="mb-5 rounded-2xl bg-zinc-950 p-4">
                <h3 className="mb-2 font-medium">Your Answer</h3>

                <p className="text-zinc-400">{question.answer}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold">Score: {question.score}/10</span>
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
