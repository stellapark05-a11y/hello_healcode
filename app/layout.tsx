import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "healcode | 건강의 문제를 코드로 풀어내는 실험 그룹",
  description:
    "healcode는 일상 속 건강 문제를 데이터와 소프트웨어로 작게 검증하고 실제 도구로 만드는 팀입니다.",
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
