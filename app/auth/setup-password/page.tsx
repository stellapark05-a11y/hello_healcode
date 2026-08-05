import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { SetupPasswordForm } from "./setup-password-form";

export const metadata: Metadata = {
  title: "계정 설정 | HealCode",
  description: "HealCode 초대 계정의 비밀번호를 설정합니다.",
};

export default function SetupPasswordPage() {
  return (
    <main className="min-h-screen bg-[#f3f6fa] text-[#111827]">
      <SiteHeader />
      <section className="section-shell py-20 sm:py-28">
        <div className="mx-auto max-w-xl">
          <SetupPasswordForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
