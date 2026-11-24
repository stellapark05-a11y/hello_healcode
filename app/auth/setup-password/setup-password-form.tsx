"use client";
import { useState } from "react";
export function SetupPasswordForm() {
  const [error,setError] = useState("");
  const [busy,setBusy] = useState(false);
  return <form className="grid gap-4" onSubmit={async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password"));
    if (password !== data.get("confirm")) { setError("비밀번호가 일치하지 않습니다."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/auth/complete-invite",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({token:window.location.hash.slice(1),password})});
      if (response.ok) { window.location.replace("/login"); return; }
      setError("링크가 만료되었거나 사용할 수 없습니다. 운영진에게 새 링크를 요청하세요.");
    } catch { setError("연결을 확인하고 다시 시도하세요."); }
    setBusy(false);
  }}>
    <h1 className="text-3xl">멤버 비밀번호 설정</h1>
    <label>비밀번호 (12자 이상)<input className="block w-full border p-3" type="password" name="password" autoComplete="new-password" minLength={12} maxLength={256} required /></label>
    <label>비밀번호 확인<input className="block w-full border p-3" type="password" name="confirm" autoComplete="new-password" required /></label>
    {error && <p role="alert">{error}</p>}
    <button disabled={busy} className="rounded-full bg-black p-3 text-white">비밀번호 설정</button>
  </form>;
}
