export function formatWallet(address: string, visible: number = 6) {
  if (!address) return "***";
  const clean = address.trim();

  if (clean.length <= visible) return clean;

  const start = clean.slice(0, visible);
  const end = clean.slice(-visible);

  return `***${start}...${end}***`;
}
