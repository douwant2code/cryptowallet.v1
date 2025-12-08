"use client";

import { motion } from "framer-motion";

const mockTransactions = [
  { id: 1, type: "Deposit", amount: "0.5 BTC", status: "Completed" },
  { id: 2, type: "Withdraw", amount: "1.2 ETH", status: "Pending" },
  { id: 3, type: "Deposit", amount: "1000 USDT", status: "Completed" },
];

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <h1 className="text-4xl font-bold text-purple-400 mb-8 text-center">
          Transaction History
        </h1>
        <div className="bg-gray-800/70 p-6 rounded-3xl shadow-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-700">
                <th className="py-2">Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-800">
                  <td className="py-3 font-semibold text-white">{tx.type}</td>
                  <td>{tx.amount}</td>
                  <td className="text-gray-400">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </main>
  );
}
