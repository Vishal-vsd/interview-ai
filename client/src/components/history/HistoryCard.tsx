interface HistoryCardProps {
  _id: string;
  role: string;
  difficulty: string;
  overallScore: number;
  createdAt: string;
}

import { useNavigate } from "react-router-dom";

const HistoryCard = ({
  _id,
  role,
  difficulty,
  overallScore,
  createdAt,
}: HistoryCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/history/${_id}`)}
      className="

    cursor-pointer

    rounded-2xl

    border

    border-zinc-800

    bg-zinc-900

    p-5

    transition-all

    hover:-translate-y-1

    hover:border-zinc-700

  "
    >
      {" "}
      <h3 className="text-xl font-semibold">{role}</h3>
      <p className="mt-1 text-zinc-400">{difficulty}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-bold">Score: {overallScore}/10</span>

        <span className="text-sm text-zinc-500">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default HistoryCard;
