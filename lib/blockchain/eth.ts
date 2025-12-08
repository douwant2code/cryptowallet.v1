// lib/blockchain/eth.ts
import { ethers } from "ethers";
import { getProvider } from "../provider";

export async function fetchWalletBalanceOnChain(address: string) {
  try {
    const provider = getProvider();

    const balanceWei = await provider.getBalance(address);

    return ethers.utils.formatEther(balanceWei); // correct for v5
  } catch (err) {
    console.error("fetchWalletBalanceOnChain error:", err);
    throw err;
  }
}
