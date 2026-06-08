import QuestionCard from "./QuestionCard";

interface QuestionListProps {
  questions: string[];
  answers: Record<number, string>;
  setAnswers: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >;
}
const QuestionList = ({
  questions,
  answers,
  setAnswers
}: QuestionListProps) => {
  return (
    <div className="mt-8 space-y-4">
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          question={question}
          index={index}
          answer={answers[index] || "" }
          setAnswers={setAnswers}
        />
      ))}
    </div>
  );
};

export default QuestionList;