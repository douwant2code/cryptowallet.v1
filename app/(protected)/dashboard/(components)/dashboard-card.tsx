// app/dashboard/components/DashboardCards.tsx
"use client";
import { motion } from "framer-motion";
import { ArrowUpToLine, ArrowDownToLine, Wallet } from "lucide-react";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="p-6 rounded-2xl bg-linear-to-r from-purple-700/10 to-pink-600/10 border border-gray-800"
      >
        <div className="text-sm text-gray-300">Total Transfers</div>
        <div className="mt-2 text-2xl font-bold">15</div>
        <div className="mt-4 text-cyan-300">
          <ArrowUpToLine />
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.04 }}
        className="p-6 rounded-2xl bg-linear-to-r from-green-500/10 to-teal-400/10 border border-gray-800"
      >
        <div className="text-sm text-gray-300">Total Deposits</div>
        <div className="mt-2 text-2xl font-bold">8.56 ETH</div>
        <div className="mt-4 text-green-300">
          <ArrowDownToLine />
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.04 }}
        className="p-6 rounded-2xl bg-linear-to-r from-yellow-400/10 to-orange-400/10 border border-gray-800"
      >
        <div className="text-sm text-gray-300">Wallet Info</div>
        <div className="mt-2 text-2xl font-bold">0xA4C9...12eB</div>
        <div className="mt-1 text-gray-400">Balance: 2.34 ETH</div>
      </motion.div>
    </div>
  );
}
