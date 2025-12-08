"use client";

import { motion } from "framer-motion";
import { Wallet, ArrowDownCircle, BarChart2, Send } from "lucide-react";

const steps = [
  {
    icon: <Wallet className="w-10 h-10 text-cyan-400" />,
    title: "Create Your Wallet",
    desc: "Sign up in seconds and get your unique crypto wallet address instantly — secured with advanced encryption.",
  },
  {
    icon: <ArrowDownCircle className="w-10 h-10 text-green-400" />,
    title: "Deposit Crypto Instantly",
    desc: "Easily transfer your coins from any external wallet. Your balance updates automatically using Alchemy’s on-chain watcher.",
  },
  {
    icon: <BarChart2 className="w-10 h-10 text-yellow-400" />,
    title: "Track & Manage Assets",
    desc: "View real-time balances, token performance, and full transaction history on your personal dashboard.",
  },
  {
    icon: <Send className="w-10 h-10 text-pink-400" />,
    title: "Send & Grow Your Portfolio",
    desc: "Transfer crypto securely, or buy and stake directly from your wallet — all with one click.",
  },
];

export const WalletSteps = () => {
  return (
    <section className="relative bg-linear-to-b from-gray-900 to-black py-24 text-gray-300 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_60%)]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            How It <span className="text-cyan-400">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get started with your secure crypto wallet in just a few easy steps.
            No complexity — just simplicity, power, and performance.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-gray-800/60 border border-gray-700 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="flex justify-center mb-5">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="p-4 bg-gray-900 rounded-full ring-2 ring-cyan-500/20 group-hover:ring-cyan-400/60 transition">
                    {step.icon}
                  </div>
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/signup"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-cyan-500/30 shadow-lg"
          >
            Get Started Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};
