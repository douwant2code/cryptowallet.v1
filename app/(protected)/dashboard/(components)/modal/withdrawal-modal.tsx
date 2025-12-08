"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { withdrawAction } from "@/action/withdraw/withrawal";

export const WithdrawalModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  // Step control
  const [step, setStep] = useState<"FORM" | "OTP">("FORM");

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [otp, setOtp] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [fee, setFee] = useState<number>(0.000005); // Example preview
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setStep("FORM");
    setAmount("");
    setAddress("");
    setOtp("");
    setError(null);
    setLoading(false);
  };

  const closeModal = () => {
    resetState();
    onClose();
  };

  // STEP 1 — Request OTP
  const handleRequestOtp = async () => {
    setError(null);

    if (!amount || Number(amount) <= 0) {
      return setError("Enter a valid amount");
    }
    if (!address || address.length < 10) {
      return setError("Enter a valid withdrawal address");
    }

    setLoading(true);

    const res = await withdrawAction({
      amount: Number(amount),
      address,
      step: "REQUEST_OTP",
    });

    setLoading(false);

    if (res?.error) return setError(res.error);

    if (res?.otpSent) {
      setStep("OTP");
    }
  };

  // STEP 2 — Verify OTP
  const handleVerifyOtp = async () => {
    setError(null);

    if (!otp || otp.length !== 6) {
      return setError("Enter the 6-digit OTP sent to your email");
    }

    setLoading(true);

    const res = await withdrawAction({
      amount: Number(amount),
      address,
      otp,
      step: "VERIFY",
    });

    setLoading(false);

    if (res?.error) return setError(res.error);

    if (res?.success) {
      closeModal();
    }
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl">
            {step === "FORM" ? "Withdraw Crypto" : "Enter OTP"}
            <p className="text-xs text-muted-foreground">
              {step === "FORM"
                ? "Fill in the details to withdraw your cryptocurrency."
                : "Please enter the OTP to confirm your withdrawal."}
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {error && <Alert variant="destructive">{error}</Alert>}

          {step === "FORM" && (
            <>
              <div>
                <label className="text-sm font-medium">Amount</label>
                <Input
                  placeholder="0.00123"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Destination Address
                </label>
                <Input
                  placeholder="bc1q..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={loading}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Estimated blockchain fee:{" "}
                <span className="font-semibold">{fee} BTC</span>
              </p>

              <Button
                className="w-full cursor-pointer"
                onClick={handleRequestOtp}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Request OTP"
                )}
              </Button>
            </>
          )}

          {step === "OTP" && (
            <>
              <p className="text-sm text-muted-foreground">
                We sent a 6-digit verification code to your email. Enter it
                below to complete your withdrawal.
              </p>

              <div>
                <label className="text-sm font-medium">OTP Code</label>
                <Input
                  placeholder="123456"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={loading}
                />
              </div>

              <Button
                className="w-full cursor-pointer"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Verify & Confirm Withdrawal"
                )}
              </Button>

              <button
                className="text-xs underline text-center w-full mt-2 opacity-70 hover:opacity-100"
                onClick={() => setStep("FORM")}
                disabled={loading}
              >
                Go Back
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
