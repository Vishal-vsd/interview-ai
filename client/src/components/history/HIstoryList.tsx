import HistoryCard from "./HistoryCard";
interface Interview {
  _id: string;
  role: string;
  difficulty: string;
  overallScore: number;
  createdAt: string;
}

interface HistoryListProps {
  interviews: Interview[];
}

const HistoryList = ({
  interviews,
}: HistoryListProps) => {

  if (interviews.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          p-10
          text-center
        "
      >
        <h3 className="text-xl font-semibold">
          No Interviews Found
        </h3>

        <p className="mt-2 text-zinc-400">
          Start your first AI interview to see your
          history here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {interviews.map((interview) => (
        <HistoryCard
          key={interview._id}
          _id={interview._id}
          role={interview.role}
          difficulty={interview.difficulty}
          overallScore={interview.overallScore}
          createdAt={interview.createdAt}
        />
      ))}
    </div>
  );
};

export default HistoryList;