// /lib/blockchain/fee.ts
export async function getBlockchainFee() {
  try {
    const res = await fetch("https://mempool.space/api/v1/fees/recommended", {
      cache: "no-store",
    });

    const data = await res.json();

    // Convert sat/vB → BTC assuming average tx of 180 vBytes
    const sats = data.fastestFee * 180;
    const btc = sats / 100_000_000;

    return parseFloat(btc.toFixed(8));
  } catch (e) {
    // Fallback fee if API fails
    return 0.000003;
  }
}
