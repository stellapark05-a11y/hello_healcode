import { getSessionToken } from "./auth";

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
  const token = await getSessionToken();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!token || !supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/point_transactions?member_id=eq.${memberId}&select=id,delta,balance_after,reason,created_at&order=created_at.desc&limit=20`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as PointTransaction[];
}
