"use server";

export async function getNetworkFee() {
  try {
    const res = await fetch(
      `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_KEY}`,
      { next: { revalidate: 10 } } // cache 10 seconds
    );

    const data = await res.json();

    const gasPriceGwei = Number(data?.result?.ProposeGasPrice);

    if (!gasPriceGwei) throw new Error("Gas price unavailable");

    return {
      success: true,
      gasPriceGwei,
      approxFeeEth: (gasPriceGwei * 21000) / 1e9, // 21k gas ETH transfer
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Failed to fetch network fee",
    };
  }
}
