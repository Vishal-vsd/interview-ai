interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
}

const StatsCard = ({
  title,
  value,
  description,
}: StatsCardProps) => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        transition
        hover:border-zinc-700
      "
    >
      <p className="text-zinc-400">
        {title}
      </p>

      <h2 className="mt-3 text-5xl font-bold">
        {value}
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        {description}
      </p>
    </div>
  );
};

export default StatsCard;