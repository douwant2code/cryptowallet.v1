"use client";

import { motion } from "framer-motion";
import {
  FaTwitter,
  FaTelegramPlane,
  FaDiscord,
  FaGithub,
} from "react-icons/fa";
import Logo from "../logo/logo";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6 relative overflow-hidden rounded-t-3xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <Logo />
          <p className="text-gray-400">
            Securely manage, deposit, and withdraw your cryptocurrencies.
            Real-time tracking for all major coins.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/wallet"
                className="hover:text-cyan-400 transition-colors"
              >
                Wallet
              </Link>
            </li>
            <li>
              <Link
                href="/deposit"
                className="hover:text-cyan-400 transition-colors"
              >
                Deposit Crypto
              </Link>
            </li>
            <li>
              <Link
                href="/withdraw"
                className="hover:text-cyan-400 transition-colors"
              >
                Withdraw Crypto
              </Link>
            </li>
            <li>
              <Link
                href="/transactions"
                className="hover:text-cyan-400 transition-colors"
              >
                Transactions
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#blog" className="hover:text-cyan-400 transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#docs" className="hover:text-cyan-400 transition-colors">
                Docs
              </a>
            </li>
            <li>
              <a
                href="#support"
                className="hover:text-cyan-400 transition-colors"
              >
                Support
              </a>
            </li>
            <li>
              <a href="#api" className="hover:text-cyan-400 transition-colors">
                API
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-white mb-4">Subscribe</h3>
          <p className="text-gray-400 mb-4">
            Get the latest updates and crypto news.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 bg-cyan-500 rounded-full font-semibold shadow-md hover:shadow-lg text-white transition-all"
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CryptoWalletz. All rights reserved.
        </p>

        <div className="flex gap-4">
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://twitter.com"
            target="_blank"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <FaTwitter size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://t.me"
            target="_blank"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <FaTelegramPlane size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://discord.com"
            target="_blank"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <FaDiscord size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://github.com"
            target="_blank"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <FaGithub size={20} />
          </motion.a>
        </div>
      </div>

      {/* Optional decorative gradient circle */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl"></div>
    </footer>
  );
};
