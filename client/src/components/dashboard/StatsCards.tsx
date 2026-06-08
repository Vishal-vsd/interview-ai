import StatCard from "./StatCard";

const StatsCards = () => {
  return (
    <section className="my-8">
      <div className="grid gap-6 md:grid-cols-3">

        <StatCard
          title="Total Interviews"
          value={12}
        />

        <StatCard
          title="Average Score"
          value={8.5}
        />

        <StatCard
          title="Best Score"
          value={10}
        />

      </div>
    </section>
  );
};

export default StatsCards;