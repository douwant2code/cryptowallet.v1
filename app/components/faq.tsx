"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I create a crypto wallet?",
    answer:
      "Simply sign up on our platform and a secure wallet will be automatically generated for you.",
  },
  {
    question: "Can I deposit from an external wallet?",
    answer:
      "Yes! You can deposit crypto from any external wallet directly into your platform wallet.",
  },
  {
    question: "Is my crypto safe here?",
    answer:
      "Absolutely. We use top-notch security practices including encrypted storage and 2FA to protect your assets.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-28 bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Frequently Asked <span className="text-cyan-400">Questions</span>
        </h2>
        <p className="text-gray-400">
          Everything you need to know about managing your crypto securely.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-gray-900/50 rounded-xl p-6 cursor-pointer shadow-md hover:shadow-lg transition-shadow"
          >
            <div
              onClick={() => toggle(i)}
              className="flex justify-between items-center"
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <span className="text-cyan-400 text-2xl">
                {openIndex === i ? "−" : "+"}
              </span>
            </div>
            <AnimatePresence>
              {openIndex === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-gray-300"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
