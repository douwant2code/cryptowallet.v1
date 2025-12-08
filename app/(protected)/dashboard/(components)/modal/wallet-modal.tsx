// src/components/WalletModal.tsx
"use client";

import { useEffect, useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

import { formatCryptoBalance } from "@/util/format-crypto-balance";
import { getLatestWalletBalance } from "@/action/wallet/wallet-data";
import { getWalletDataAction } from "@/action/wallet/wallet";

type Tx = {
  id: string;
  amount: string;
  type: string;
  status: string;
  txHash?: string | null;
  createdAt: string;
};

export default function WalletModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<Tx[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [pagination, setPagination] = useState<{
    totalPages: number;
    total: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

  const load = useCallback(
    async (p = page) => {
      try {
        setLoading(true);
        const res = await getWalletDataAction(p, pageSize);
        console.log("Wallet from res: " + res?.wallet);
        if (!res) {
          setWallet(null);
          setTransactions([]);
          setPagination(null);
          return;
        }
        setWallet(res.wallet);
        setTransactions(
          res.transactions.map((tx: any) => ({
            ...tx,
            amount: tx.amount.toString(),
          }))
        );
        setPagination(res.pagination);
      } finally {
        setLoading(false);
      }
    },
    [pageSize, page]
  );

  useEffect(() => {
    if (open) load(1);
  }, [open, load]);

  // Poll balance every 12s while modal is open
  useEffect(() => {
    if (!open) {
      setIsPolling(false);
      return;
    }
    let mounted = true;
    const tick = async () => {
      try {
        setIsPolling(true);
        const latest = await getLatestWalletBalance();
        if (!mounted) return;
        setWallet((prev: any) => (prev ? { ...prev, balance: latest } : prev));
      } finally {
        setIsPolling(false);
      }
    };
    tick();
    const id = setInterval(tick, 12_000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [open]);

  const onCopy = async () => {
    if (!wallet?.address) return;
    await navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const gotoPage = async (p: number) => {
    setPage(p);
    await load(p);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your Wallet</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-12 flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4 bg-muted p-4 rounded-md">
              <div>
                <div className="text-xs text-muted-foreground">Wallet</div>
                <div className="font-mono text-sm break-all">
                  {wallet?.address ?? "—"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Balance</div>
                <div className="font-semibold">
                  {formatCryptoBalance(wallet?.balance ?? "0", "BTC")}
                </div>
                <div className="text-xs text-muted-foreground">
                  {isPolling ? "live" : ""}
                </div>
              </div>
              <div>
                <Button size="icon" variant="ghost" onClick={onCopy}>
                  {copied ? "✔" : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <section className="mt-4">
              <h4 className="font-medium mb-2">Transactions</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {transactions.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    No transactions
                  </div>
                )}
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-lg border bg-muted/30 text-sm"
                  >
                    <div className="flex justify-between">
                      <div className="capitalize">{tx.type}</div>
                      <div className="text-xs text-muted-foreground">
                        {tx.status}
                      </div>
                    </div>
                    <div className="mt-1 font-mono text-xs break-all">
                      Hash: {tx.txHash ?? "—"}
                    </div>
                    <div className="mt-1 font-semibold">
                      {formatCryptoBalance(tx.amount ?? "0", "BTC")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(tx.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-3 flex items-center gap-2 justify-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={page <= 1}
                    onClick={() => gotoPage(page - 1)}
                  >
                    <ChevronLeft />
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Page {page} / {pagination.totalPages}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={page >= pagination.totalPages}
                    onClick={() => gotoPage(page + 1)}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              )}
            </section>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
