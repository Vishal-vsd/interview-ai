import { useState } from "react";
import InterviewForm from "../components/interview/InterviewForm";
import QuestionList from "../components/interview/QuestionList";
import { submitInterview } from "../services/interviewService";
import InterviewResult from "../components/interview/InterviewResult";
const InterviewPage = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [submitting, setSubmitting] = useState(false);  
  const [result, setResult] = useState<any>(null);

  const handleInterviewSubmit = async () => {
    try {
      setSubmitting(true)
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
        setResult(data.interview);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

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
              <h1 className="text-4xl font-bold">Start New Interview 🚀</h1>

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
