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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Interview History</h1>

          <p className="mt-2 text-zinc-400">
            View all your previous interviews and scores.
          </p>
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
          <HistoryList interviews={interviewHistory} />
        )}
      </div>
    </div>
  );
};

export default History;
