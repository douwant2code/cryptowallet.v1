"use client";

import { motion } from "framer-motion";

export default function WalletsPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">
          Your Crypto Wallet
        </h1>
        <p className="text-gray-300 mb-8">
          View your balances and manage all your crypto assets in one place.
        </p>

        <div className="bg-gray-800/60 rounded-3xl p-6 shadow-lg backdrop-blur-md w-full">
          <p className="text-gray-400 text-sm">Wallet Address:</p>
          <p className="text-cyan-400 font-mono truncate mt-1">
            0x1234...5678ABCD
          </p>
        </div>
      </motion.div>
    </main>
  );
}
