import { useEffect, useState } from "react";
import InterviewForm from "../components/interview/InterviewForm";
import QuestionList from "../components/interview/QuestionList";
import {
  generateInterview,
  getInterviewById,
  submitInterview,
} from "../services/interviewService";
import InterviewResult from "../components/interview/InterviewResult";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
const InterviewPage = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [retakeLoading, setRetakeLoading] = useState(false);

  const { id } = useParams();
  const isRetake = Boolean(id);

  const handleInterviewSubmit = async () => {
    const hasEmptyAnswers = questions.some(
      (_, index) => !answers[index]?.trim(),
    );

    if (hasEmptyAnswers) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = questions.map((question, index) => ({
        question,
        answer: answers[index] || "",
      }));

      const data = await submitInterview({
        role,
        difficulty,
        questions: payload,
      });

      if (data.success) {
        toast.success("Interview submitted successfully!");

        setResult(data.interview);
      }
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to submit interview",
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    const loadRetakeInterview = async () => {
      try {
        setRetakeLoading(true);

        const interviewData = await getInterviewById(id);
        if (!interviewData.success) return;

        const role = interviewData.interview.role;
        const difficulty = interviewData.interview.difficulty;

        setRole(role);
        setDifficulty(difficulty);

        const generated = await generateInterview(role, difficulty);

        if (generated.success) {
          setQuestions(generated.questions);
        }
      } catch (error) {
        console.error(error);

        toast.error("Failed to load interview.");
      } finally {
        setRetakeLoading(false);
      }
    };
    loadRetakeInterview();
  }, [id]);

  if (retakeLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Preparing your interview...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10 text-center">
          {result ? (
            <>
              <h1 className="text-4xl font-bold">Interview Results 🎉</h1>

              <p className="mt-3 text-zinc-400">
                Review your performance and AI feedback.
              </p>
            </>
          ) : questions.length === 0 ? (
            <>
              <h1 className="text-4xl font-bold">
                {isRetake ? "Retake Interview 🔄" : "Start New Interview 🚀"} 🚀
              </h1>

              <p className="mt-3 text-zinc-400">
                Generate AI-powered interview questions and practice like a real
                interview.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold">Answer the Questions 📝</h1>

              <p className="mt-3 text-zinc-400">
                Take your time and answer each question as if you're in a real
                interview.
              </p>
            </>
          )}
        </div>

        {result ? (
          <InterviewResult result={result} />
        ) : questions.length === 0 ? (
          <InterviewForm
            role={role}
            setRole={setRole}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            setQuestions={setQuestions}
          />
        ) : (
          <QuestionList
            questions={questions}
            answers={answers}
            setAnswers={setAnswers}
            onSubmit={handleInterviewSubmit}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
