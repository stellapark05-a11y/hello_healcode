import { database, allowAuth } from "@/lib/db";
import { digest, derivePassword, token } from "@/lib/credentials";
export async function POST(request: Request) {
  if (!await allowAuth(request)) return new Response(null,{status:429});
  const body = await request.json().catch(()=>null);
  if (!body || typeof body.token !== "string" || !/^[a-f0-9]{64}$/.test(body.token) ||
      typeof body.password !== "string" || body.password.length < 12 || body.password.length > 256)
    return new Response(null,{status:400});
  const db = await database();
  const hash = digest(body.token);
  const eligible = "SELECT member_id FROM accounts WHERE invite_hash=? AND invite_until>unixepoch() AND password_hash IS NULL";
  if (!await db.prepare(eligible).bind(hash).first()) return new Response(null,{status:403});
  const salt = token();
  const passwordHash = await derivePassword(body.password,salt);
  const result = await db.batch([
    db.prepare(`UPDATE profiles SET status='active' WHERE status='invited' AND id IN (${eligible})`).bind(hash),
    db.prepare(`UPDATE membership_applications SET status='approved' WHERE status='invited' AND id IN
      (SELECT application_id FROM accounts JOIN profiles ON profiles.id=accounts.member_id WHERE invite_hash=? AND invite_until>unixepoch() AND profiles.status='active')`).bind(hash),
    db.prepare(`UPDATE accounts SET password_hash=?,salt=?,invite_hash=NULL,invite_until=NULL
      WHERE invite_hash=? AND invite_until>unixepoch() AND password_hash IS NULL AND member_id IN (SELECT id FROM profiles WHERE status='active')`)
      .bind(passwordHash,salt,hash),
  ]);
  return new Response(null,{status:result[2].meta.changes ? 204 : 403});
}
