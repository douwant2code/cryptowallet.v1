"use client";

import { Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import ModalWallet from "./modal/modal-wallet";
import DepositModal from "./modal/deposit-modal";
import { WithdrawalModal } from "./modal/withdrawal-modal";
import MetricCard from "./metric-card";
import DashboardCards from "./dashboard-card";
import PortfolioChart from "./portfolio-chart";
import TransactionsTable from "./transaction-table";
import PortfolioPerformance from "./portfolio-performance";
import RecentTransactions from "./recent-transaction";

export const DashboardView = () => {
  const [open, setOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const [wallet, setWallet] = useState<any>(null);

  // Fetch wallet once for dashboard metric card + modal
  useEffect(() => {
    async function loadWallet() {
      try {
        const res = await fetch("/api/wallet");
        const data = await res.json();

        if (data.address) {
          setWallet(data);
        }
      } catch (err) {
        console.error("Wallet fetch failed:", err);
      }
    }

    loadWallet();
  }, []);

  return (
    <section className="space-y-6">
      {/* ALL MODALS */}
      <WithdrawalModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
      />

      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />

      {/* Wallet modal */}
      <ModalWallet
        open={open}
        onClose={() => setOpen(false)}
        walletAddress={wallet?.address ?? "-"}
      />

      {/* HEADER BUTTONS */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-x-2 flex items-center">
          <button
            onClick={() => setDepositOpen(true)}
            className="px-6 py-2 rounded-r-full bg-cyan-700 text-white cursor-pointer"
          >
            Verify Deposit
          </button>

          <button
            onClick={() => setWithdrawOpen(true)}
            className="px-6 py-2 rounded-l-full bg-orange-500 text-white cursor-pointer"
          >
            Withdraw Crypto
          </button>
        </div>

        {/* MY WALLET BUTTON */}
        <div>
          <span
            onClick={() => setOpen(true)}
            className="text-sm p-1.5 flex items-center justify-center rounded-full 
            bg-gray-100 text-gray-950 cursor-pointer hover:bg-gray-200 w-[150px]"
          >
            My Wallet
          </span>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Wallet Balance"
          value={wallet ? wallet.balance + " ETH" : "0.00 ETH"}
          icon={<Wallet />}
          accent="from-cyan-500 to-blue-400"
        />

        <MetricCard
          title="Total Deposits"
          value="8.56 ETH"
          accent="from-green-400 to-teal-300"
        />

        <MetricCard
          title="Total Withdrawals"
          value="0.72 ETH"
          accent="from-red-400 to-orange-400"
        />
      </div>

      <DashboardCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioChart />
        <TransactionsTable />
      </div>

      <PortfolioPerformance />
      <RecentTransactions />
    </section>
  );
};
