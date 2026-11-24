const source = "33167a4f-b659-4996-b46b-ce37ecfbdadb";

export function seoulDate(date: Date) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(date);
}

type ActivityRow = {
  properties: {
    활동일: { date: { start: string } | null };
    "증감 포인트": { number: number | null };
  };
};

export async function readActivity(start: string, end: string) {
  const token = process.env.NOTION_ACTIVITY_TOKEN;
  if (!token) return null;
  const totals: Record<string, number> = {};
  let cursor: string | null = null;
  try {
    do {
      const response = await fetch(`https://api.notion.com/v1/data_sources/${source}/query`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Notion-Version": "2025-09-03", "Content-Type": "application/json" },
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(4000),
        body: JSON.stringify({ start_cursor: cursor ?? undefined, filter: { and: [
          { property: "활동일", date: { on_or_after: start } },
          { property: "처리 상태", select: { equals: "반영 완료" } },
          { property: "증감 포인트", number: { greater_than: 0 } },
        ] } }),
      });
      if (!response.ok) return null;
      const page = await response.json() as { results: ActivityRow[]; next_cursor: string | null };
      for (const { properties } of page.results) {
        const raw = properties.활동일.date?.start;
        if (!raw) continue;
        const day = raw.length === 10 ? raw : seoulDate(new Date(raw));
        if (day >= start && day <= end) totals[day] = (totals[day] ?? 0) + (properties["증감 포인트"].number ?? 0);
      }
      cursor = page.next_cursor;
    } while (cursor);
    return totals;
  } catch {
    return null;
  }
}
