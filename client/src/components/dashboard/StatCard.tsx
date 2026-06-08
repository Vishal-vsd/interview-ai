interface StatCardProps {
  title: string;
  value: number | string;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:-translate-y-1 hover:border-zinc-700 ">
      <p className="text-sm text-zinc-400">{title}</p>
      <h2 className="mt-3 text-3xl font-bold">{value}</h2>
    </div>
  );
};

export default StatCard;
