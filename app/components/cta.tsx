"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const CTA = () => {
  const router = useRouter();
  return (
    <section className="py-28 bg-linear-to-r from-cyan-500 to-blue-500 text-white text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Start Your Crypto Journey Today
        </h2>
        <p className="mb-10 text-gray-100">
          Sign up now and get your secure crypto wallet instantly. Deposit,
          withdraw, and trade with ease.
        </p>
        <motion.button
          onClick={() => {
            router.push("/auth/sign-in");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-white text-cyan-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Decorative floating circles */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-white/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl"
      />
    </section>
  );
};
