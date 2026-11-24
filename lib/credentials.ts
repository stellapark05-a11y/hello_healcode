import "server-only";
import { randomBytes, createHash, pbkdf2, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const derive = promisify(pbkdf2);
export const token = () => randomBytes(32).toString("hex");
export const digest = (value: string) => createHash("sha256").update(value).digest("hex");
export const derivePassword = async (password: string, salt: string) =>
  (await derive(password, Buffer.from(salt, "hex"), 100000, 32, "sha256")).toString("hex");
export async function matches(password: string, salt: string, hash: string) {
  const actual = Buffer.from(await derivePassword(password, salt), "hex");
  const expected = Buffer.from(hash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
