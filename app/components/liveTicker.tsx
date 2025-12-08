"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  image: string;
  change: number;
  sparkline: number[];
}

export const LiveTicker = () => {
  const [coins, setCoins] = useState<Coin[]>([
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: 0,
      image:
        "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      change: 0,
      sparkline: [],
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: 0,
      image:
        "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      change: 0,
      sparkline: [],
    },
    {
      id: "tether",
      name: "Tether",
      symbol: "USDT",
      price: 0,
      image:
        "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
      change: 0,
      sparkline: [],
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      price: 0,
      image:
        "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1696504756",
      change: 0,
      sparkline: [],
    },
    {
      id: "bnb",
      name: "BNB",
      symbol: "BNB",
      price: 0,
      image:
        "https://coin-images.coingecko.com/coins/images/825/large/binance-coin-logo.png?1696501962",
      change: 0,
      sparkline: [],
    },
  ]);

  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // Fetch live prices + sparkline
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = coins.map((c) => c.id).join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&sparkline=true`
        );
        const data = await res.json();
        setCoins((prev) =>
          prev.map((coin) => {
            const match = data.find((d: any) => d.id === coin.id);
            return match
              ? {
                  ...coin,
                  price: match.current_price,
                  change: match.price_change_percentage_24h,
                  sparkline: match.sparkline_in_7d.price,
                }
              : coin;
          })
        );
      } catch (err) {
        console.error("Error fetching prices:", err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  // Pause/resume animation
  useEffect(() => {
    if (isHovered) {
      controls.stop();
    } else {
      controls.start({
        x: ["0%", "-50%"],
        transition: { ease: "linear", duration: 25, repeat: Infinity },
      });
    }
  }, [isHovered, controls]);

  return (
    <div
      className="relative w-full bg-linear-to-r from-cyan-600/10 via-blue-800/10 to-cyan-600/10 border-y border-cyan-900 backdrop-blur-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex items-center gap-10 py-3" animate={controls}>
        {[...coins, ...coins].map((coin, idx) => (
          <motion.div
            key={idx}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-900/60 border border-gray-800 hover:border-cyan-500/40 shadow-md cursor-pointer transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={coin.image}
              alt={coin.name}
              width={22}
              height={22}
              className="rounded-full"
            />
            <span className="text-sm font-semibold text-white">
              {coin.symbol}
            </span>
            <span className="text-sm text-cyan-400">
              ${coin.price ? coin.price.toLocaleString() : "—"}
            </span>
            <span
              className={`text-sm font-medium ${
                coin.change > 0
                  ? "text-green-400"
                  : coin.change < 0
                  ? "text-red-400"
                  : "text-gray-400"
              }`}
            >
              {coin.change ? coin.change.toFixed(2) : "0.00"}%
            </span>
            {coin.sparkline.length > 0 && (
              <div className="w-20 h-6">
                <Sparklines data={coin.sparkline.slice(-20)}>
                  <SparklinesLine
                    color={coin.change >= 0 ? "#22d3ee" : "#ef4444"}
                    style={{ fill: "none" }}
                  />
                </Sparklines>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Gradient fade edges */}
      <div className="absolute top-0 left-0 h-full w-24 bg-linear-to-r from-black via-black/60 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-24 bg-linear-to-l from-black via-black/60 to-transparent pointer-events-none" />
    </div>
  );
};
