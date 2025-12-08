"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  image: string;
  change: number;
}

export const SupportedCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,solana"
        );
        const data = await res.json();
        setCoins(
          data.map((coin: any) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            image: coin.image, // ✅ Real logo from CoinGecko
            change: coin.price_change_percentage_24h,
          }))
        );
      } catch (err) {
        console.error("Error fetching coin data:", err);
      }
    };

    fetchCoins();
    const interval = setInterval(fetchCoins, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-28 bg-linear-to-b from-black via-gray-950 to-black text-gray-100 overflow-hidden">
      {/* glowing background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent_70%)]"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Supported <span className="text-cyan-400">Coins</span>
        </motion.h2>

        <p className="text-gray-400 text-lg mb-14">
          Track, deposit, and withdraw major cryptocurrencies — live and
          on-chain.
        </p>

        {/* Coins grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {coins.map((coin, i) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-cyan-500/40 transition-all p-6 shadow-xl relative overflow-hidden group"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-6 flex justify-center"
              >
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />
              </motion.div>

              <h3 className="text-xl font-semibold text-white mb-1">
                {coin.name}
              </h3>
              <p className="text-gray-500 mb-3">{coin.symbol}</p>

              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-cyan-400 mb-1">
                  ${coin.price ? coin.price.toLocaleString() : "—"}
                </p>
                <p
                  className={`text-sm font-medium ${
                    coin.change > 0
                      ? "text-green-400"
                      : coin.change < 0
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                >
                  {coin.change ? coin.change.toFixed(2) : "0.00"}%
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-linear-to-t from-cyan-500/10 to-transparent rounded-2xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
