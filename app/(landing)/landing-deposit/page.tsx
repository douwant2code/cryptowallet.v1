"use client";

import { motion } from "framer-motion";

export default function DepositPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-4xl font-bold text-green-400 mb-4">
          Deposit Crypto
        </h1>
        <p className="text-gray-300 mb-6">
          Safely deposit your favorite crypto assets using our secure wallet
          system.
        </p>

        <form className="flex flex-col gap-4 bg-gray-800/70 p-6 rounded-3xl shadow-xl">
          <input
            type="text"
            placeholder="Enter amount"
            className="p-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:ring-2 focus:ring-green-400 outline-none"
          />
          <select className="p-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:ring-2 focus:ring-green-400 outline-none">
            <option>Bitcoin (BTC)</option>
            <option>Ethereum (ETH)</option>
            <option>USDT (Tether)</option>
          </select>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Deposit Now
          </button>
        </form>
      </motion.div>
    </main>
  );
}
