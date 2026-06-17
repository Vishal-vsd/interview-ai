import { useEffect, useState } from "react";
import DashboardHeader from "../components/admin/DashboardHeader";
import StatsGrid from "../components/admin/StatsGrid";
import { getAdminStats } from "../services/adminService";

interface AdminStats {
  totalUsers: number;
  totalInterviews: number;
  averagePlatformScore: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();

        if (data.success) {
          setStats(data.stats);
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
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <DashboardHeader />

        <StatsGrid stats={stats} />
      </div>
    </div>
  );
};

export default AdminDashboard;