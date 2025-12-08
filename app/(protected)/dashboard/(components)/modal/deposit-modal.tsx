// src/components/DepositModal.tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { recordDepositByHashAction } from "@/action/wallet/wallet";

export default function DepositModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit() {
    setMessage(null);
    try {
      setLoading(true);
      const res = await recordDepositByHashAction({ txHash: txHash.trim() });
      setMessage(
        "Deposit recorded. If pending, it will become confirmed after chain confirmations."
      );
      setTxHash("");
    } catch (err: any) {
      setMessage(err?.message ?? "Failed to record deposit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Deposit</DialogTitle>
          <p className="text-xs text-muted-foreground">
            Enter your transaction hash to verify your incoming transaction.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <label className="text-sm text-muted-foreground">
              Transaction Hash
            </label>

            <Input
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="0x..."
            />
          </div>

          {message && (
            <div className="text-sm text-muted-foreground">{message}</div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={submit} disabled={loading || !txHash.trim()}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  Processing...
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
