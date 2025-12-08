import { getCurrentUser } from "@/util/get-current-user";
import { CTA } from "../components/cta";

import { FAQ } from "../components/faq";
import { Features } from "../components/feature";

import { Hero } from "../components/hero/hero";

import { LiveTicker } from "../components/liveTicker";

import { SupportedCoins } from "../components/support-coin";
import { Testimonials } from "../components/testimonial";
import { TransactionsSection } from "../components/transactions-list";
import { WalletSteps } from "../components/wallet-steps";
import { redirect } from "next/navigation";

const WebsitePage = async () => {
  return (
    <div className="bg-linear-to-br from-gray-900 via-slate-900 to-black text-white min-h-screen flex flex-col">
      <Hero />
      <LiveTicker />
      <Features />

      <TransactionsSection />
      <WalletSteps />

      <SupportedCoins />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
};

export default WebsitePage;
