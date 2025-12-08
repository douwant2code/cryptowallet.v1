// app/dashboard/components/PortfolioChart.tsx
"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const sample = Array.from({ length: 20 }).map((_, i) => ({
  time: `${i}h`,
  value: 2000 + Math.sin(i / 2) * 300 + i * 10,
}));

export default function PortfolioChart() {
  return (
    <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-800 shadow-lg">
      <h3 className="text-white font-semibold mb-4">Portfolio Performance</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={sample}>
          <CartesianGrid stroke="#1f2937" />
          <XAxis dataKey="time" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
