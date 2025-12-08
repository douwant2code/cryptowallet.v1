import { randomBytes, createCipheriv, createDecipheriv } from "crypto";
import { ethers } from "ethers";
import { prisma } from "@/lib/prisma";

const ENC_SECRET_HEX = process.env.APP_ENC_SECRET;
if (!ENC_SECRET_HEX) throw new Error("APP_ENC_SECRET missing");

const KEY = Buffer.from(ENC_SECRET_HEX, "hex");
if (KEY.length !== 32) {
  throw new Error("APP_ENC_SECRET must be 32 bytes (64 hex chars)");
}

// -----------------------------------------------------
// AES-256-GCM ENCRYPTION HELPERS
// -----------------------------------------------------
export function encryptAesGcm(plaintext: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return {
    encryptedHex: encrypted.toString("hex"),
    ivHex: iv.toString("hex"),
    tagHex: tag.toString("hex"),
  };
}

export function decryptAesGcm(
  encryptedHex: string,
  ivHex: string,
  tagHex: string
) {
  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");
  const decipher = createDecipheriv("aes-256-gcm", KEY, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}

// -----------------------------------------------------
// CREATE ETH WALLET + STORE ENCRYPTED PRIVATE KEY
// -----------------------------------------------------
export async function generateEncryptedWalletForUser(userId: string) {
  const wallet = ethers.Wallet.createRandom();

  const { encryptedHex, ivHex, tagHex } = encryptAesGcm(wallet.privateKey);

  const created = await prisma.wallet.create({
    data: {
      userId,
      address: wallet.address,
      encryptedPrivateKey: encryptedHex,
      iv: ivHex,
      tag: tagHex,
      balance: 0,
    },
  });

  return { address: wallet.address, walletId: created.id };
}

// -----------------------------------------------------
// DECRYPT PRIVATE KEY FOR A WALLET ID
// -----------------------------------------------------
export async function getDecryptedPrivateKeyByWalletId(walletId: string) {
  const w = await prisma.wallet.findUnique({ where: { id: walletId } });
  if (!w) throw new Error("Wallet not found");

  return decryptAesGcm(w.encryptedPrivateKey, w.iv, w.tag);
}

// -----------------------------------------------------
// SEND WITHDRAWAL (ETH transaction)
// -----------------------------------------------------
export async function sendWithdrawal(
  walletId: string,
  to: string,
  amountWei: string,
  rpcUrl = process.env.ETH_RPC_URL!
) {
  const privateKey = await getDecryptedPrivateKeyByWalletId(walletId);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);

  const tx = await signer.sendTransaction({
    to,
    value: ethers.BigNumber.from(amountWei),
  });

  return tx.hash;
}
