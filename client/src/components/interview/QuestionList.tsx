import QuestionCard from "./QuestionCard";

interface QuestionListProps {
  questions: string[];
  answers: Record<number, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  onSubmit: () => void;
  submitting: boolean;
}
const QuestionList = ({
  questions,
  answers,
  setAnswers,
  onSubmit,
  submitting,
}: QuestionListProps) => {
  return (
    <div className="mt-8 space-y-4">
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          question={question}
          index={index}
          answer={answers[index] || ""}
          setAnswers={setAnswers}
        />
      ))}
      <button
        onClick={onSubmit}
        disabled={submitting}
        className="
    mt-6
    w-full
    rounded-xl
    bg-white
    py-3
    font-semibold
    text-black
    transition
    hover:opacity-90
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
      >
        {submitting ? "Analyzing responses..." : "Submit Interview"}
      </button>
    </div>
  );
};

export default QuestionList;
