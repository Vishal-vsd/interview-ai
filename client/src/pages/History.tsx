import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getInterviewHistory } from "../services/authService";
import HistoryList from "../components/history/HIstoryList";

interface Interview {
  _id: string;
  role: string;
  difficulty: string;
  overallScore: number;
  createdAt: string;
}

const History = () => {
  const [interviewHistory, setInterviewHistory] = useState<
    Interview[]
  >([]);
  const [loading, setLoading] = useState(true);

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
          <h1 className="text-4xl font-bold">
            Interview History
          </h1>

          <p className="mt-2 text-zinc-400">
            View all your previous interviews and
            scores.
          </p>
        </div>

        {loading ? (
          <div className="text-zinc-400">
            Loading interviews...
          </div>
        ) : interviewHistory.length === 0 ? (
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
            <h2 className="text-2xl font-semibold">
              No Interviews Found
            </h2>

            <p className="mt-3 text-zinc-400">
              Start your first AI interview and it
              will appear here.
            </p>
          </div>
        ) : (
          <HistoryList interviews={interviewHistory}/>
        )}
      </div>
    </div>
  );
};

export default History;