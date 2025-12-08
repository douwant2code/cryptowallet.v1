"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, X, Check } from "lucide-react";
import { useEffect, useState } from "react";

interface ModalWalletProps {
  open: boolean;
  onClose: () => void;
  walletAddress: string;
}

export default function ModalWallet({
  open,
  onClose,
  walletAddress,
}: ModalWalletProps) {
  const [balance, setBalance] = useState("0.0000");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  // Load wallet data when modal is opened
  useEffect(() => {
    if (!open) return;

    async function loadWallet() {
      try {
        // Fetch balance
        const balRes = await fetch("/api/wallet/balance");
        const balData = await balRes.json();

        if (balData && typeof balData.balance === "number") {
          setBalance(balData.balance.toFixed(4));
        } else {
          console.error("Unexpected balance format:", balData);
          setBalance("0.0000");
        }

        // Fetch transactions
        const txRes = await fetch("/api/wallet/transactions");
        const txData = await txRes.json();

        if (Array.isArray(txData)) {
          setTransactions(txData);
        } else {
          console.error("Unexpected transaction format:", txData);
          setTransactions([]);
        }
      } catch (err) {
        console.error("Wallet modal error:", err);
      }
    }

    loadWallet();
  }, [open]);

  // Copy wallet address
  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* MODAL */}
          <motion.div
            className="fixed z-50 top-1/2 left-1/2 w-[95%] max-w-lg 
                       -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl 
                       shadow-2xl p-6 border border-gray-200"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-900">My Wallet</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 transition"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* BALANCE */}
            <div className="p-4 rounded-xl bg-linear-to-r from-cyan-600 to-emerald-600 text-white shadow-md mb-5">
              <p className="text-sm opacity-90">Wallet Balance</p>
              <p className="text-3xl font-bold mt-1">{balance} ETH</p>
            </div>

            {/* WALLET ADDRESS */}
            <div className="mb-5">
              <p className="text-sm text-gray-700 mb-1">Wallet Address</p>

              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-xl border border-gray-200">
                <span className="truncate font-mono text-gray-900 text-sm">
                  {walletAddress}
                </span>

                <button
                  onClick={copyAddress}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium 
                             rounded-lg bg-blue-600 text-white hover:bg-blue-700 
                             active:scale-95 transition"
                >
                  {copied ? (
                    <>
                      <Check size={14} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* TRANSACTIONS */}
            <p className="text-sm text-gray-600 mb-2 font-semibold">
              Recent Transactions
            </p>

            <div className="max-h-48 overflow-y-auto space-y-3 pr-1">
              {transactions.length === 0 ? (
                <p className="text-gray-500 text-sm">No transactions yet.</p>
              ) : (
                transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 bg-gray-100 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <p className="font-medium text-gray-900 capitalize">
                      {tx.type}
                    </p>
                    <p className="text-gray-800">{tx.amount} ETH</p>
                    <p className="text-xs text-gray-500">
                      {tx.createdAt
                        ? new Date(tx.createdAt).toLocaleString()
                        : "Unknown date"}
                    </p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
