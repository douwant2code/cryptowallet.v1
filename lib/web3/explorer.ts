export function getChainExplorer(chain: string) {
  switch (chain) {
    case "ETH":
    case "USDT":
      return ethExplorer;

    case "BTC":
      return btcExplorer;

    default:
      throw new Error("Unsupported chain");
  }
}

// ------------ ETH / ERC20 ------------
const ethExplorer = {
  async isTransactionConfirmed(txHash: string) {
    return true; // Replace with Etherscan or Alchemy
  },
};

// ------------ BITCOIN ------------
const btcExplorer = {
  async isTransactionConfirmed(txHash: string) {
    return true; // Replace with Blockstream API
  },
};
