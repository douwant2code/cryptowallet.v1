export function formatCryptoBalance(
  amount: number | string,
  symbol: string = "BTC"
) {
  const value = typeof amount === "string" ? parseFloat(amount) : amount ?? 0;

  if (isNaN(value)) return `0.00000000 ${symbol}`;

  return `${value.toFixed(8)} ${symbol}`;
}
