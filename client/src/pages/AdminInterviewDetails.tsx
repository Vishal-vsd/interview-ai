import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInterviewByIdAdmin } from "../services/adminService";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminInterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState<any>(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const data = await getInterviewByIdAdmin(id!);

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
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="
      flex
      items-center
      gap-2
      rounded-xl
      border
      border-zinc-800
      bg-zinc-900
      px-4
      py-2
      transition
      hover:bg-zinc-800
    "
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-4xl font-bold">{interview.role}</h1>

        <div className="mt-4 flex flex-wrap gap-3">
          <span className="rounded-full bg-zinc-800 px-4 py-2">
            {interview.difficulty}
          </span>

          <span className="rounded-full bg-white px-4 py-2 font-bold text-black">
            {interview.overallScore}/10
          </span>
        </div>
      </div>

      {/* Candidate Info */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-bold">Candidate Information</h2>

        <div className="space-y-2">
          <p>
            <span className="text-zinc-400">Name:</span> {interview.user?.name}
          </p>

          <p>
            <span className="text-zinc-400">Email:</span>{" "}
            {interview.user?.email}
          </p>
        </div>
      </div>

      {/* Questions */}
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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Question {index + 1}</h2>

            <span className="rounded-full bg-white px-4 py-1 text-black">
              {question.score}/10
            </span>
          </div>

          <p className="mb-5 text-zinc-300">{question.question}</p>

          <div className="mb-5 rounded-2xl bg-zinc-950 p-4">
            <h3 className="mb-2 font-medium">Candidate Answer</h3>

            <p className="text-zinc-400">{question.answer}</p>
          </div>

          <div className="rounded-2xl bg-zinc-950 p-4">
            <h3 className="mb-2 font-medium">AI Feedback</h3>

            <p className="text-zinc-400">{question.feedback}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminInterviewDetails;
