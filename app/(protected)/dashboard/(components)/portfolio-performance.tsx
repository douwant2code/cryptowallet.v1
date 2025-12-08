"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#06b6d4", "#8b5cf6", "#f59e0b", "#10b981"];

const performanceData = [
  { name: "Mon", value: 12500 },
  { name: "Tue", value: 14200 },
  { name: "Wed", value: 15800 },
  { name: "Thu", value: 16700 },
  { name: "Fri", value: 16200 },
  { name: "Sat", value: 17400 },
  { name: "Sun", value: 18250 },
];

const portfolioData = [
  { name: "Bitcoin", value: 50 },
  { name: "Ethereum", value: 30 },
  { name: "Solana", value: 10 },
  { name: "USDT", value: 10 },
];

export default function PortfolioPerformance() {
  return (
    <section className="bg-linear-to-br from-gray-900 via-[#0a0d1a] to-gray-950 rounded-3xl shadow-2xl p-8 text-gray-100 border border-cyan-500/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Portfolio Performance
          </h2>
          <p className="text-gray-400 mt-1">
            Track your asset growth and allocation
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4 md:mt-0"
        >
          <button className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-5 py-2 rounded-full font-semibold shadow-lg transition-all">
            + Add Funds
          </button>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-900/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-800"
        >
          <h3 className="text-lg font-semibold mb-4 text-cyan-400">
            Weekly Growth
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #06b6d4",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ r: 4, fill: "#06b6d4" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Portfolio Allocation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-gray-900/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-800"
        >
          <h3 className="text-lg font-semibold mb-4 text-cyan-400">
            Asset Allocation
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={portfolioData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  label={(props) => {
                    const { name, value } = props as unknown as {
                      name: string;
                      value: number;
                    };
                    const total = portfolioData.reduce(
                      (sum, entry) => sum + entry.value,
                      0
                    );
                    const percent = value ? (value / total) * 100 : 0;
                    return `${name} ${percent.toFixed(0)}%`;
                  }}
                >
                  {portfolioData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #06b6d4",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3">
              {portfolioData.map((coin, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  <p className="text-gray-300 font-medium">{coin.name}</p>
                  <p className="ml-auto text-cyan-400 font-semibold">
                    {coin.value}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
