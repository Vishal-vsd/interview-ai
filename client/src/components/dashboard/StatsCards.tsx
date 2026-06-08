import StatCard from "./StatCard";

interface StatsCardsProps {
    stats: {
        totalInterviews: number;
        averageScore: number;
        bestScore: number;
    }
}

const StatsCards = ({stats}: StatsCardsProps) => {
  return (
    <section className="my-8">
      <div className="grid gap-6 md:grid-cols-3">

        <StatCard
          title="Total Interviews"
          value={stats.totalInterviews}
        />

        <StatCard
          title="Average Score"
          value={stats.averageScore}
        />

        <StatCard
          title="Best Score"
          value={stats.bestScore}
        />

      </div>
    </section>
  );
};

export default StatsCards;