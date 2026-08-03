import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HealCode | Heal First. Build Together.",
  description:
    "의료인과 공학도가 환자와 의료 현장을 먼저 이해하고, 서로의 언어를 배우며, 필요한 해결책을 함께 탐색하고 구현하는 커뮤니티입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
