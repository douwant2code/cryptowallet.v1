// app/dashboard/components/DashboardNavbar.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { User2Icon } from "lucide-react";
import Logo from "@/app/components/logo/logo";

import { useRouter } from "next/navigation";
import { logout } from "@/action/sign-out";

interface DashboardNavbarProps {
  username: string;
  walletAddress: string;
  balance: string;
}

export const DashboardNavbar = ({
  username,
  walletAddress,
  balance,
}: DashboardNavbarProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 p-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 bg-linear-to-r from-black/90 via-gray-800 to-gray-700 backdrop-blur rounded-2xl p-3 border border-gray-800">
        <div className="flex items-center gap-4">
          <Logo />
          <nav className="hidden md:flex gap-4">
            <Link
              href="/dashboard/wallet"
              className="text-gray-100 hover:text-white"
            >
              Wallet
            </Link>
            <Link
              href="/dashboard/deposit"
              className="text-gray-100 hover:text-white"
            >
              Deposit
            </Link>
            <Link
              href="/dashboard/withdraw"
              className="text-gray-100 hover:text-white"
            >
              Withdraw
            </Link>
            <Link
              href="/dashboard/transactions"
              className="text-gray-100 hover:text-white"
            >
              Transactions
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs text-gray-300 font-semibold">Wallet</span>
            <span className="font-mono text-sm text-cyan-300">
              {walletAddress}
            </span>
            <span className="text-xs text-gray-300">
              Balance:{" "}
              <span className="text-white font-semibold">{balance}</span>
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full"
            >
              <span className="p-1 flex items-center justify-center bg-linear-to-tr from-white/80 to-gray-50 rounded-full ring-2 ring-white shadow-lg">
                <User2Icon className="w-5 h-5 text-gray-900" />
              </span>
              <span className="hidden sm:block text-white">{username}</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-gray-900/90 border border-gray-700 rounded-lg shadow-lg">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-800">
                  Settings
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-800 text-red-400 cursor-pointer"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};
