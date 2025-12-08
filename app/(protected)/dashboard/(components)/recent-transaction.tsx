"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, RefreshCcw } from "lucide-react";

interface Transaction {
  id: string;
  type: "Deposit" | "Withdrawal" | "Transfer";
  amount: number;
  asset: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TXN001",
      type: "Deposit",
      amount: 0.75,
      asset: "BTC",
      date: "2025-11-07 10:24 AM",
      status: "Completed",
    },
    {
      id: "TXN002",
      type: "Withdrawal",
      amount: 1.2,
      asset: "ETH",
      date: "2025-11-06 4:12 PM",
      status: "Pending",
    },
    {
      id: "TXN003",
      type: "Transfer",
      amount: 450,
      asset: "USDT",
      date: "2025-11-05 6:40 PM",
      status: "Completed",
    },
    {
      id: "TXN004",
      type: "Deposit",
      amount: 2.3,
      asset: "SOL",
      date: "2025-11-04 11:02 AM",
      status: "Completed",
    },
  ]);

  const refreshTransactions = () => {
    // Simulate refreshing or fetching from API
    setTransactions([...transactions]);
  };

  return (
    <section className="bg-linear-to-br from-gray-900 via-[#0a0d1a] to-gray-950 rounded-3xl shadow-2xl p-8 border border-cyan-500/10 text-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Recent Transactions
          </h2>
          <p className="text-gray-400 mt-1">
            View your most recent crypto activity.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={refreshTransactions}
          className="flex items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all mt-4 md:mt-0"
        >
          <RefreshCcw className="w-4 h-4" />
          Refresh
        </motion.button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-gray-400 text-sm uppercase tracking-wider">
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Asset</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 hover:border-cyan-400/30 transition-all cursor-pointer"
              >
                <td className="px-4 py-3 flex items-center gap-3 font-medium text-gray-100">
                  {tx.type === "Deposit" && (
                    <ArrowDownCircle className="w-5 h-5 text-green-400" />
                  )}
                  {tx.type === "Withdrawal" && (
                    <ArrowUpCircle className="w-5 h-5 text-red-400" />
                  )}
                  {tx.type === "Transfer" && (
                    <ArrowDownCircle className="w-5 h-5 text-cyan-400 rotate-90" />
                  )}
                  {tx.type}
                </td>

                <td className="px-4 py-3 font-semibold text-cyan-400">
                  {tx.amount} {tx.asset}
                </td>

                <td className="px-4 py-3">{tx.asset}</td>

                <td className="px-4 py-3 text-gray-400">{tx.date}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tx.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : tx.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
