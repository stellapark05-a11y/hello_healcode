import { database } from "./db";

export type PointTransaction = {
  id: string;
  delta: number;
  balance_after: number;
  reason: string;
  created_at: string;
};

const tiers = [
  { name: "Diamond", minimum: 320 },
  { name: "Platinum", minimum: 200 },
  { name: "Gold", minimum: 120 },
  { name: "Silver", minimum: 60 },
  { name: "Bronze", minimum: 20 },
];

export function getPointTier(points: number) {
  return tiers.find((tier) => points >= tier.minimum)?.name ?? "Starter";
}

export async function getMyPointTransactions(memberId: string) {
  const db = await database();
  return (await db.prepare("SELECT id, delta, balance_after, reason, created_at FROM point_transactions WHERE member_id=? ORDER BY created_at DESC LIMIT 20")
    .bind(memberId).all<PointTransaction>()).results;
}
