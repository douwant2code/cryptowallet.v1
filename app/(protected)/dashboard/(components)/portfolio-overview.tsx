"use client";

import { motion } from "framer-motion";

export default function PortfolioOverview() {
  const assets = [
    { name: "Bitcoin", symbol: "BTC", balance: 1.234, value: 88420 },
    { name: "Ethereum", symbol: "ETH", balance: 15.3, value: 53800 },
    { name: "Tether", symbol: "USDT", balance: 2200, value: 2200 },
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assets.map((a, i) => (
          <motion.div
            key={a.name}
            className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl shadow-lg hover:shadow-cyan-500/10"
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-cyan-400">{a.name}</h3>
              <span className="text-gray-400">{a.symbol}</span>
            </div>
            <p className="text-2xl font-bold mt-2">{a.balance}</p>
            <p className="text-gray-400">${a.value.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
