// app/dashboard/components/TransactionsTable.tsx
"use client";
import { motion } from "framer-motion";

const dummy = [
  {
    id: 1,
    type: "Deposit",
    coin: "ETH",
    amount: "1.2",
    status: "Completed",
    date: "Nov 7, 2025",
  },
  {
    id: 2,
    type: "Withdraw",
    coin: "BTC",
    amount: "0.05",
    status: "Pending",
    date: "Nov 6, 2025",
  },
  {
    id: 3,
    type: "Deposit",
    coin: "SOL",
    amount: "8.0",
    status: "Completed",
    date: "Nov 5, 2025",
  },
];

export default function TransactionsTable() {
  return (
    <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-800 shadow-lg">
      <h3 className="text-white font-semibold mb-4">Recent Transactions</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-gray-300 text-sm">
          <thead className="text-xs text-gray-400">
            <tr>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3">Coin</th>
              <th className="py-2 px-3">Amount</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {dummy.map((tx) => (
              <motion.tr
                key={tx.id}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <td className="py-2 px-3">{tx.type}</td>
                <td className="py-2 px-3">{tx.coin}</td>
                <td className="py-2 px-3">{tx.amount}</td>
                <td className="py-2 px-3">{tx.status}</td>
                <td className="py-2 px-3">{tx.date}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
