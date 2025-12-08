// src/queues/depositQueue.ts
import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(
  process.env.REDIS_URL || "redis://127.0.0.1:6379"
);

export const depositQueue = new Queue("depositQueue", {
  connection,
  defaultJobOptions: {
    attempts: 5,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

// Add a blockchain tx hash to queue
export async function enqueueDepositCheck(txHash: string) {
  await depositQueue.add("check-deposit", { txHash });
}
