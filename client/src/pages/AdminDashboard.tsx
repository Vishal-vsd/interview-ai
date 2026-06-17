import { useEffect, useState } from "react";
import DashboardHeader from "../components/admin/DashboardHeader";
import StatsGrid from "../components/admin/StatsGrid";
import { getAdminStats } from "../services/adminService";
import RecentInterviews from "../components/admin/RecentInterviews";


interface AdminStats {
  totalUsers: number;
  totalInterviews: number;
  averagePlatformScore: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentInterviews, setRecentInterviews] = useState<any[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();

        if (data.success) {
          setStats(data.stats);
          setRecentInterviews(data.recentInterviews)
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading Dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Failed to load dashboard.
      </div>
    );
  }

return (
  <>
    <DashboardHeader />
    <StatsGrid stats={stats} />
    <RecentInterviews interviews={recentInterviews} />
  </>
);
};

export default AdminDashboard;
