import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAnalytics } from "../services/interviewService";
import ScoreTrendChart from "../components/analytics/ScoreTrendChart";

const Analytics = () => {
  const [analytics, setAnalytics] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();

        if (data.success) {
          setAnalytics(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        Loading analytics...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-4xl font-bold">Analytics</h1>

        <p className="mt-2 text-zinc-400">
          Track your interview performance and progress.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-500">Total Interviews</p>

            <h2 className="mt-2 text-4xl font-bold">
              {analytics.stats.totalInterviews}
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-500">Average Score</p>

            <h2 className="mt-2 text-4xl font-bold">
              {analytics.stats.averageScore}
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-500">Best Score</p>

            <h2 className="mt-2 text-4xl font-bold">
              {analytics.stats.bestScore}
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-500">This Month</p>

            <h2 className="mt-2 text-4xl font-bold">
              {analytics?.interviewsThisMonth}
            </h2>
          </div>
        </div>
        {analytics?.scoreTrend?.length > 0 && (
          <div className="mt-10">
            <ScoreTrendChart data={analytics.scoreTrend} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
