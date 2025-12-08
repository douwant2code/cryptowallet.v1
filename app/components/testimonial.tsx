"use client";

import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  message: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alice Johnson",
    role: "Crypto Trader",
    avatar: "/assets/pexels-olly-712513.jpg",
    message:
      "This platform made managing my crypto portfolio seamless and secure!",
  },
  {
    name: "Mark Thompson",
    role: "Investor",
    avatar: "/assets/pexels-olly-925786.jpg",
    message:
      "I love the real-time balance tracking and fast deposits. Highly recommended!",
  },
  {
    name: "Sophie Lee",
    role: "Blockchain Enthusiast",
    avatar: "/assets/pexels-olly-842811.jpg",
    message:
      "Beautiful UI and smooth animations make crypto trading fun and intuitive.",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-28 bg-gray-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          What Our <span className="text-cyan-400">Users Say</span>
        </motion.h2>
        <p className="text-gray-400 mb-16">
          Trusted by thousands of crypto enthusiasts worldwide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <p className="mb-6 text-gray-200">"{t.message}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
                />
                <div className="text-left">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-gray-400 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
