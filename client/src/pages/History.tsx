import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getInterviewHistory } from "../services/authService";
import HistoryList from "../components/history/HIstoryList";
import { useNavigate } from "react-router-dom";

interface Interview {
  _id: string;
  role: string;
  difficulty: string;
  overallScore: number;
  createdAt: string;
}

const History = () => {
  const [interviewHistory, setInterviewHistory] = useState<Interview[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const [sortBy, setSortBy] = useState("latest");

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviewHistory = async () => {
      try {
        const data = await getInterviewHistory();

        if (data.success) {
          setInterviewHistory(data.interviews);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewHistory();
  }, []);

  const filteredInterviews = interviewHistory
    .filter((interview) => {
      const matchesSearch = interview.role
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesDifficulty =
        difficultyFilter === "All" || interview.difficulty === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "highest":
          return b.overallScore - a.overallScore;

        case "lowest":
          return a.overallScore - b.overallScore
        case "latest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Interview History</h1>

          <p className="mt-2 text-zinc-400">
            Showing {filteredInterviews.length} interviews
          </p>
          <div className="mt-6 flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Search by role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
      flex-1
      rounded-2xl
      border
      border-zinc-800
      bg-zinc-900
      px-4
      py-3
      outline-none
      transition
      focus:border-zinc-600
    "
            />

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="
      rounded-2xl
      border
      border-zinc-800
      bg-zinc-900
      px-4
      py-3
      outline-none
      focus:border-zinc-600
    "
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
    rounded-2xl
    border
    border-zinc-800
    bg-zinc-900
    px-4
    py-3
    outline-none
    focus:border-zinc-600
  "
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Score</option>
              <option value="lowest">Lowest Score</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-zinc-400">Loading interviews...</div>
        ) : interviewHistory.length === 0 ? (
          <div
            className="
    flex
    min-h-[50vh]
    flex-col
    items-center
    justify-center
    rounded-3xl
    border
    border-zinc-800
    bg-zinc-900
    p-10
    text-center
  "
          >
            <div
              className="
      mb-6
      flex
      h-20
      w-20
      items-center
      justify-center
      rounded-full
      bg-zinc-800
      text-3xl
    "
            >
              📋
            </div>

            <h2 className="text-3xl font-bold">No Interviews Yet</h2>

            <p className="mt-3 max-w-md text-zinc-400">
              Start practicing with AI-powered interviews and track your
              performance over time.
            </p>

            <button
              onClick={() => navigate("/interview")}
              className="
      mt-8
      rounded-2xl
      bg-white
      px-6
      py-3
      font-medium
      text-black
      transition
      hover:opacity-90
    "
            >
              Start Interview 🚀
            </button>
          </div>
        ) : (
          <HistoryList interviews={filteredInterviews} />
        )}
      </div>
    </div>
  );
};

export default History;
