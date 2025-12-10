"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Logo from "../logo/logo";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const links = [
    { name: "Home", href: "/" },
    { name: "Wallet", href: "/landing-wallet" },
    { name: "Deposit Crypto", href: "/landing-deposit" },
    { name: "Withdraw Crypto", href: "/landing-withdraw" },
    { name: "Transactions", href: "/landing-transaction" },
  ];

  return (
    <nav className="fixed top-4 mt-12 left-0 right-0 z-50 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-gray-900/80 backdrop-blur-xl rounded-full shadow-lg px-6 py-2">
        {/* Logo */}
        <Logo />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-3">
          {links.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full hover:bg-cyan-500/20 transition-colors text-white font-medium"
            >
              <Link href={link.href} key={link.href}>
                {link.name}
              </Link>
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
            onClick={() => {
              router.push("/auth/sign-in");
            }}
          >
            Sign In / Sign Up
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none p-2 rounded-full hover:bg-cyan-500/20 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-2 bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-lg py-4 flex flex-col items-center space-y-3"
          >
            {links.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-full hover:bg-cyan-500/20 transition-colors text-white font-medium w-3/4 text-center"
              >
                <Link href={link.href} key={link.href}>
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <motion.button
              onClick={() => {
                router.push("/auth/sign-in");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Get Started
            </motion.button>

            {/* Close menu on link click */}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
              onClick={() => {
                router.push("/auth/sign-in");
              }}
            >
              Sign In / Sign Up
            </motion.button>

            {/* Close menu on link click */}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
