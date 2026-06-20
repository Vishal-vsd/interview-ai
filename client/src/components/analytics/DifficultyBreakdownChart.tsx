import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  data: any[];
}

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

const DifficultyBreakdownChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">Difficulty Breakdown 🎯</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              nameKey="name"
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "12px",
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DifficultyBreakdownChart;
