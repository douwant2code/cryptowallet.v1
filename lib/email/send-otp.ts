import { prisma } from "@/lib/prisma";
import { sendEmail } from "./mailer";

export async function sendWithdrawalOTP(userId: string, email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.withdrawalOTP.create({
    data: {
      userId,
      code,
      type: "withdrawal",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    },
  });

  await sendEmail({
    to: email,
    subject: "Your Withdrawal Security Code",
    html: `<p>Your OTP code is <strong>${code}</strong>. It expires in 5 minutes.</p>`,
  });
}
