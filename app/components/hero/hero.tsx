"use client";

import { motion } from "framer-motion";
import { ArrowDownCircle, ArrowUpCircle, Wallet, Send } from "lucide-react";
import { useState } from "react";

export const Hero = () => {
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState("deposit");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Simulating ${action} of ${amount} ETH`);
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-gray-950 to-black text-gray-200 py-28">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_60%)]"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left: Text + form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Manage Your Crypto <br />
            <span className="text-cyan-400">Securely & Instantly</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-lg">
            Experience a powerful, self-custodial wallet that gives you total
            control of your digital assets. Deposit, withdraw, and track your
            portfolio in real time — all from one dashboard.
          </p>

          {/* Interactive Deposit/Withdraw Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl shadow-lg max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={() => setAction("deposit")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  action === "deposit"
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                <ArrowDownCircle size={18} />
                Deposit
              </button>
              <button
                type="button"
                onClick={() => setAction("withdraw")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  action === "withdraw"
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                <ArrowUpCircle size={18} />
                Withdraw
              </button>
            </div>

            <label className="block mb-3 text-sm text-gray-400">
              Amount (ETH)
            </label>
            <input
              type="number"
              step="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-5 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white py-2.5 rounded-lg font-semibold transition shadow-lg hover:shadow-cyan-500/30"
            >
              <Send size={18} />
              {action === "deposit" ? "Deposit Now" : "Withdraw Now"}
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Right: Animated illustration */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2 relative flex justify-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 w-80 h-80 rounded-full bg-linear-to-tr from-cyan-500/30 to-purple-600/20 blur-3xl"
          ></motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="relative bg-gray-900/40 p-8 rounded-3xl border border-gray-800 shadow-xl backdrop-blur-md"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-cyan-500/10 ring-2 ring-cyan-500/30">
                <Wallet className="w-10 h-10 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Your Wallet</h3>
              <p className="text-sm text-gray-400 text-center">
                0xA4...93fB connected
              </p>
              <div className="bg-gray-800/60 p-4 rounded-xl w-52 text-center">
                <p className="text-sm text-gray-400">Balance</p>
                <p className="text-2xl text-cyan-400 font-bold">2.654 ETH</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-cyan-500/10 to-transparent"></div>
    </section>
  );
};
