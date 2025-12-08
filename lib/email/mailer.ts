import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const response = await resend.emails.send({
      from: "Secure Wallet <no-reply@yourdomain.com>",
      to,
      subject,
      html,
    });

    return { success: true, response };
  } catch (error: any) {
    console.error("Email error:", error);
    return { success: false, error: error.message };
  }
}
