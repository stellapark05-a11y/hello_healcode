"use client";

import { FormEvent, useEffect, useState } from "react";

type InviteSession = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export function SetupPasswordForm() {
  const [session, setSession] = useState<InviteSession | null>(null);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("초대 링크를 확인하고 있습니다.");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const errorDescription = params.get("error_description");

      if (errorDescription) {
        setMessage(decodeURIComponent(errorDescription.replaceAll("+", " ")));
        return;
      }

      if (!accessToken || !refreshToken) {
        setMessage("초대 링크가 만료되었거나 올바르지 않습니다. 매니저에게 새 초대를 요청해 주세요.");
        return;
      }

      setSession({
        accessToken,
        refreshToken,
        expiresIn: Number(params.get("expires_in")) || 3600,
      });
      setMessage("사용할 비밀번호를 직접 설정해 주세요.");
      window.history.replaceState(null, "", window.location.pathname);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!session || submitting) return;
    if (password.length < 8) {
      setMessage("비밀번호는 8자 이상으로 입력해 주세요.");
      return;
    }
    if (password !== confirmation) {
      setMessage("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    setSubmitting(true);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !anonKey) {
      setMessage("인증 설정을 확인할 수 없습니다.");
      setSubmitting(false);
      return;
    }

    const passwordResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: "PUT",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!passwordResponse.ok) {
      setMessage("비밀번호를 설정하지 못했습니다. 초대 링크를 다시 확인해 주세요.");
      setSubmitting(false);
      return;
    }

    const completeResponse = await fetch("/api/auth/complete-invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        expiresIn: session.expiresIn,
      }),
    });

    if (!completeResponse.ok) {
      setMessage("계정 활성화를 완료하지 못했습니다. 매니저에게 문의해 주세요.");
      setSubmitting(false);
      return;
    }

    window.location.replace("/dashboard");
  }

  return (
    <section className="rounded-3xl border hairline bg-white p-7 shadow-sm shadow-slate-950/5">
      <p className="eyebrow">INVITATION</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight">비밀번호 설정</h1>
      <p className="mt-4 text-sm leading-7 text-[#64748b]">{message}</p>

      {session ? (
        <form className="mt-7 grid gap-5" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-sm text-[#64748b]">새 비밀번호</span>
            <input
              autoComplete="new-password"
              className="rounded-2xl border hairline bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#111827]"
              minLength={8}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-[#64748b]">비밀번호 확인</span>
            <input
              autoComplete="new-password"
              className="rounded-2xl border hairline bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#111827]"
              minLength={8}
              onChange={(event) => setConfirmation(event.target.value)}
              required
              type="password"
              value={confirmation}
            />
          </label>
          <button
            className="rounded-full bg-[#111827] px-6 py-3 font-semibold text-white transition hover:bg-[#020617] disabled:opacity-50"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "계정을 활성화하는 중..." : "비밀번호 설정하고 시작하기"}
          </button>
        </form>
      ) : null}
    </section>
  );
}
