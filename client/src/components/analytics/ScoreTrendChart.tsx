import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  data: any[];
}

const ScoreTrendChart = ({ data }: Props) => {
  const chartData = data.map(
    (item, index) => ({
      interview: index + 1,
      score: item.overallScore,
    }),
  );

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        Score Progress
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="interview" />

            <YAxis domain={[0, 10]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreTrendChart;