"use client";

import { motion } from "framer-motion";

export default function WithdrawPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-4xl font-bold text-orange-400 mb-4">
          Withdraw Crypto
        </h1>
        <p className="text-gray-300 mb-6">
          Securely withdraw your funds to an external wallet.
        </p>

        <form className="flex flex-col gap-4 bg-gray-800/70 p-6 rounded-3xl shadow-xl">
          <input
            type="text"
            placeholder="Wallet Address"
            className="p-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <input
            type="number"
            placeholder="Amount"
            className="p-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Withdraw
          </button>
        </form>
      </motion.div>
    </main>
  );
}
