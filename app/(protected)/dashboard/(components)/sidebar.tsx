// app/dashboard/components/DashboardSidebar.tsx
"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Wallet,
  ArrowDownToLine,
  ArrowUpToLine,
  List,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/action/sign-out";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  const items = [
    { name: "Overview", href: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Wallet", href: "/dashboard/wallet", icon: <Wallet /> },
    { name: "Deposit", href: "/dashboard/deposit", icon: <ArrowDownToLine /> },
    { name: "Withdraw", href: "/dashboard/withdraw", icon: <ArrowUpToLine /> },
    { name: "Transactions", href: "/dashboard/transactions", icon: <List /> },
  ];

  return (
    <aside
      className={`bg-linear-to-b from-gray-900/60 to-black p-4 ${
        collapsed ? "w-20" : "w-64"
      } transition-all`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="font-bold text-cyan-300">
          {collapsed ? "CW" : "CryptoWallet"}
        </div>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="text-sm text-gray-300"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="space-y-2">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link key={it.href} href={it.href}>
              <div
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  active ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <div className="text-cyan-300">{it.icon}</div>
                {!collapsed && <div className="text-sm">{it.name}</div>}
              </div>
            </Link>
          );
        })}
      </nav>

      {collapsed ? null : (
        <div>
          <button
            onClick={() => logout()}
            className="mt-6 w-full flex items-center justify-center gap-2 p-2 bg-linear-to-r from-gray-700 to-gray-800 hover:bg-gray-900 rounded-full text-white shadow-md cursor-pointer mb-6"
          >
            Logout
          </button>
        </div>
      )}

      <div className="mt-auto text-xs text-gray-400">v1.0 • Secure</div>
    </aside>
  );
}
