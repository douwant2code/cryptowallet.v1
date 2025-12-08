"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const Banner = () => {
  return (
    <section className="relative w-full max-h-[52px] h-[52px] bg-linear-to-r from-cyan-500 to-blue-500 text-white overflow-hidden flex items-center justify-center px-6">
      {/* Animated floating coins */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-4"
      >
        <Image
          src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png"
          alt="Bitcoin"
          width={40}
          height={40}
          unoptimized
        />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-4"
      >
        <Image
          src="https://coin-images.coingecko.com/coins/images/279/large/ethereum.png"
          alt="Ethereum"
          width={45}
          height={45}
          unoptimized
        />
      </motion.div>

      {/* Scrolling crypto message */}
      <motion.div
        className="whitespace-nowrap text-lg font-semibold"
        animate={{ x: [0, -300, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      >
        🚀 Deposit or withdraw crypto securely! Track your balances in
        real-time! 💰
      </motion.div>
    </section>
  );
};
