"use client";

import { motion } from "framer-motion";

export default function MarketTable() {
  const markets = [
    { coin: "Bitcoin", symbol: "BTC", price: 88420, change: 2.3 },
    { coin: "Ethereum", symbol: "ETH", price: 3480, change: -1.2 },
    { coin: "Solana", symbol: "SOL", price: 162, change: 4.8 },
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
      <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/40">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="p-4 text-left">Coin</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Change (24h)</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((m, i) => (
              <motion.tr
                key={i}
                whileHover={{ backgroundColor: "rgba(34,211,238,0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <td className="p-4 font-medium">{m.coin}</td>
                <td className="p-4">${m.price.toLocaleString()}</td>
                <td
                  className={`p-4 font-semibold ${
                    m.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {m.change}%
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
