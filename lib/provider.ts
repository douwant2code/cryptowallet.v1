// lib/provider.ts
import { ethers } from "ethers";

export function getProvider() {
  const rpc = process.env.ETH_RPC_URL;

  if (!rpc) {
    throw new Error("❌ Missing ETH_RPC_URL in .env");
  }

  // Ethers v5 provider
  return new ethers.providers.JsonRpcProvider(rpc);
}
