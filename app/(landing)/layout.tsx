import { ReactNode } from "react";
import { Banner } from "../components/banner/banner";
import { Navbar } from "../components/navbar/navbar";
import { Footer } from "../components/footer/footer";
import { getCurrentUser } from "@/util/get-current-user";
import { redirect } from "next/navigation";

const WebsiteLayout = async ({ children }: { children: ReactNode }) => {
  // Example of fetching session data
  return (
    <div className="bg-linear-to-br from-gray-900 via-slate-900 to-black text-white min-h-screen flex flex-col">
      <Banner />
      <Navbar />

      {children}
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
