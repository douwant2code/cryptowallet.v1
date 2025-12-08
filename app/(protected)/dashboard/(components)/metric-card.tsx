// app/dashboard/components/MetricCard.tsx
"use client";
import { motion } from "framer-motion";

export default function MetricCard({
  title,
  value,
  icon,
  accent = "from-cyan-500 to-blue-400",
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
  accent?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gray-900/70 border border-gray-800 rounded-2xl p-5 flex justify-between items-center shadow-lg"
    >
      <div>
        <div className="text-sm text-gray-400">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
      <div className={`p-3 rounded-full bg-linear-to-tr ${accent} text-white`}>
        {icon}
      </div>
    </motion.div>
  );
}
