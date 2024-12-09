import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ProgressData } from '@/lib/progress-data';

interface ProgressChartProps {
  data: ProgressData[];
}

export function ProgressChart({ data }: ProgressChartProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">30-Day Progress</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="weight"
              stroke="#3b82f6"
              name="Weight (kg)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="calories"
              stroke="#10b981"
              name="Calories Burned"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}