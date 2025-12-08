"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaTimes } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

interface Transaction {
  id: string;
  type: "Deposit" | "Withdrawal";
  coin: string;
  amount: number;
  date: string;
  status: "Completed" | "Pending" | "Failed";
  hash: string;
  from: string;
  to: string;
}

export const TransactionsSection = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selected, setSelected] = useState<Transaction | null>(null);

  useEffect(() => {
    const fakeData: Transaction[] = [
      {
        id: "1",
        type: "Deposit",
        coin: "BTC",
        amount: 0.325,
        date: "2025-11-06",
        status: "Completed",
        hash: "0xabcde1234567890abcdef",
        from: "1A2b3C4d5E6fBTCaddress",
        to: "0xCryptoHubBTCWallet",
      },
      {
        id: "2",
        type: "Withdrawal",
        coin: "ETH",
        amount: 1.45,
        date: "2025-11-05",
        status: "Pending",
        hash: "0x7890abcdef12345",
        from: "0xCryptoHubETHWallet",
        to: "0xUserWalletETH12345",
      },
      {
        id: "3",
        type: "Deposit",
        coin: "USDT",
        amount: 300,
        date: "2025-11-04",
        status: "Completed",
        hash: "0xUSDTtx12345",
        from: "0xExternalUSDTWallet",
        to: "0xCryptoHubUSDTWallet",
      },
      {
        id: "4",
        type: "Withdrawal",
        coin: "SOL",
        amount: 12.6,
        date: "2025-11-03",
        status: "Failed",
        hash: "0xSOLFailedTx12345",
        from: "0xCryptoHubSOLWallet",
        to: "0xUserWalletSOL",
      },
      {
        id: "5",
        type: "Deposit",
        coin: "BTC",
        amount: 0.007,
        date: "2025-10-06",
        status: "Completed",
        hash: "0xSOLCmdwptTx18432",
        from: "0xXczqetwpuBtcWallet",
        to: "0xUserXcbvrxcwq2",
      },
      {
        id: "6",
        type: "Withdrawal",
        coin: "SOL",
        amount: 12.6,
        date: "2025-11-08",
        status: "Pending",
        hash: "0xSOLpexmzyTx8ef38",
        from: "0xCryptoHubSOLCvx00e",
        to: "0xCvxzqrbcseF06",
      },
    ];
    setTransactions(fakeData);
  }, []);

  return (
    <section className="relative py-28 bg-black text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-linear-to-br from-gray-900 via-black to-gray-950"
        style={{
          clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0 95%)",
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Recent <span className="text-cyan-400">Transactions</span>
        </motion.h2>

        <div className="overflow-hidden rounded-3xl border border-gray-800 shadow-xl backdrop-blur-xl bg-gray-900/60">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-900/70">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Coin
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {transactions.map((tx, index) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setSelected(tx)}
                  className="hover:bg-cyan-500/5 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-6 flex items-center gap-3">
                    {tx.type === "Deposit" ? (
                      <FaArrowDown className="text-green-400" />
                    ) : (
                      <FaArrowUp className="text-red-400" />
                    )}
                    <span
                      className={`font-medium ${
                        tx.type === "Deposit"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-300 font-semibold">
                    {tx.coin}
                  </td>
                  <td className="py-4 px-6 text-cyan-400 font-semibold">
                    {tx.amount} {tx.coin}
                  </td>
                  <td className="py-4 px-6 text-gray-400">{tx.date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
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
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-900/90 border border-gray-700 rounded-3xl p-8 w-full max-w-lg shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <FaTimes size={20} />
              </button>

              <h3 className="text-2xl font-bold mb-6">
                Transaction Details –{" "}
                <span className="text-cyan-400">{selected.coin}</span>
              </h3>

              <div className="space-y-3 text-gray-300">
                <p>
                  <strong>Type:</strong> {selected.type}
                </p>
                <p>
                  <strong>Amount:</strong> {selected.amount} {selected.coin}
                </p>
                <p>
                  <strong>Date:</strong> {selected.date}
                </p>
                <p>
                  <strong>Status:</strong> {selected.status}
                </p>
                <p>
                  <strong>From:</strong> {selected.from}
                </p>
                <p>
                  <strong>To:</strong> {selected.to}
                </p>
                <p className="truncate">
                  <strong>Hash:</strong> {selected.hash}
                </p>
              </div>

              {/* Mocked chart */}
              <div className="mt-6 bg-gray-800 rounded-2xl p-3">
                <Line
                  data={{
                    labels: ["1h", "3h", "6h", "12h", "24h"],
                    datasets: [
                      {
                        label: "Value trend (mock)",
                        data: [
                          selected.amount * 0.9,
                          selected.amount,
                          selected.amount * 1.05,
                          selected.amount * 0.95,
                          selected.amount,
                        ],
                        borderColor: "#22d3ee",
                        tension: 0.4,
                        pointRadius: 0,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      x: { display: false },
                      y: { display: false },
                    },
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
