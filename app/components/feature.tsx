"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, BarChart, Coins, Lock } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-cyan-400" />,
    title: "Bank-Grade Security",
    desc: "Your assets are protected with AES-256 encryption and multi-signature wallet security for maximum safety.",
  },
  {
    icon: <Zap className="w-10 h-10 text-yellow-400" />,
    title: "Instant Transactions",
    desc: "Experience lightning-fast deposits and transfers powered by Alchemy’s real-time blockchain infrastructure.",
  },
  {
    icon: <Globe className="w-10 h-10 text-green-400" />,
    title: "Multi-Chain Support",
    desc: "Manage all your assets in one place — from Ethereum and Polygon to BSC and beyond.",
  },
  {
    icon: <BarChart className="w-10 h-10 text-purple-400" />,
    title: "Smart Portfolio Analytics",
    desc: "Track performance, visualize trends, and make informed decisions with built-in analytics.",
  },
  {
    icon: <Coins className="w-10 h-10 text-pink-400" />,
    title: "Token & NFT Support",
    desc: "Seamlessly store, view, and manage your ERC-20 and NFT assets directly from your wallet.",
  },
  {
    icon: <Lock className="w-10 h-10 text-blue-400" />,
    title: "Privacy First",
    desc: "We never store private keys. Only you control your assets — no intermediaries, no compromises.",
  },
];

export const Features = () => {
  return (
    <section className="relative bg-black text-gray-300 py-24 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.1),transparent_60%)]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Powerful <span className="text-cyan-400">Features</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Built for crypto users who demand performance, privacy, and
            security. Every feature designed for real-world use.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl border border-gray-800 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]"
            >
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-4 rounded-full bg-gray-800/70 ring-2 ring-cyan-400/20 group-hover:ring-cyan-400/50"
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h3 className="text-lg font-semibold text-white text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm text-center">
                {feature.desc}
              </p>
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
            Explore the Platform
          </a>
        </motion.div>
      </div>
    </section>
  );
};
