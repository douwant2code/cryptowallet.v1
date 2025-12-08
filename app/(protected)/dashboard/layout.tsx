import type { ReactNode } from "react";

import DashboardFooter from "./(components)/dashboard-footer";

import DashboardSidebar from "./(components)/sidebar";
import { DashboardNavbar } from "./(components)/navbar";
import { getUserDashboardData } from "@/util/get-user-dashboard-data";
import { formatWallet } from "@/util/format-wallet";

import { formatCryptoBalance } from "@/util/format-crypto-balance";

export const runtime = "nodejs";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Placeholder for session data

  //const session = await getCurrentUser();

  //if (!session?.id) redirect("/auth/sign-in");

  const userData = await getUserDashboardData();
  const shortWallet = formatWallet(userData?.wallet?.address ?? "");
  const formattedBalance = formatCryptoBalance(
    Number(userData?.wallet.balance ?? 0),
    "ETH"
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 via-black/80 to-gray-900 shadow-xl text-gray-200">
      <DashboardNavbar
        username={userData?.name ?? "Guest"}
        walletAddress={shortWallet}
        balance={formattedBalance}
      />
      <div className="flex min-h-[calc(100vh-88px)]">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
      <DashboardFooter />
    </div>
  );
}
