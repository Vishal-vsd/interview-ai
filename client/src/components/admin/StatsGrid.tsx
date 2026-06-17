import StatsCard from "./StatsCard";

interface StatsGridProps {
  stats: {
    totalUsers: number;
    totalInterviews: number;
    averagePlatformScore: number;
  };
}

const StatsGrid = ({
  stats,
}: StatsGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatsCard
        title="Total Users"
        value={stats.totalUsers}
        description="Registered users"
      />

      <StatsCard
        title="Total Interviews"
        value={stats.totalInterviews}
        description="Completed interviews"
      />

      <StatsCard
        title="Average Score"
        value={stats.averagePlatformScore}
        description="Platform performance"
      />
    </div>
  );
};

export default StatsGrid;