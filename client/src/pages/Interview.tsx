import { useState } from "react";
import InterviewForm from "../components/interview/InterviewForm";
import QuestionList from "../components/interview/QuestionList";

const InterviewPage = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});


  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">Start New Interview 🚀</h1>

          <p className="mt-3 text-zinc-400">
            Generate AI-powered interview questions and practice like a real
            interview.
          </p>
        </div>

        {questions.length === 0 ? (
          <InterviewForm setQuestions={setQuestions} />
        ) : (
          <QuestionList
            questions={questions}
            answers={answers}
            setAnswers={setAnswers}
          />
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
