interface QuestionCardProps {
  question: string;
  index: number;
  answer: string;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}

const QuestionCard = ({
  question,
  index,
  answer,
  setAnswers,
}: QuestionCardProps) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <h3 className="mb-2 font-semibold text-zinc-400">Question {index + 1}</h3>

      <p className="mb-4 text-lg">{question}</p>

      <textarea
        value={answer}
        onChange={(e) =>
          setAnswers((prev) => ({
            ...prev,
            [index]: e.target.value,
          }))
        }
        placeholder="Write your answer..."
        className="
          min-h-32
          w-full
          rounded-xl
          border
          border-zinc-700
          bg-zinc-950
          p-4
          outline-none
          focus:border-zinc-500
        "
      />
    </div>
  );
};

export default QuestionCard;
