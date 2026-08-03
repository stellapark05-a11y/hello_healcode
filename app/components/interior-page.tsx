import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type InteriorPageProps = {
  children: ReactNode;
  eyebrow: string;
  intro: string;
  title: string;
};

export function InteriorPage({
  children,
  eyebrow,
  intro,
  title,
}: InteriorPageProps) {
  return (
    <main className="min-h-screen bg-[#f2f5f9] text-[#111827]">
      <div className="border-b hairline bg-white">
        <SiteHeader />
      </div>

      <section className="border-b hairline bg-[#07080d] py-20 text-white sm:py-28">
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <p className="space-eyebrow">{eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
              {intro}
            </p>
          </div>
        </div>
      </section>

      <div className="section-shell py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">{children}</div>
      </div>

      <SiteFooter />
    </main>
  );
}
