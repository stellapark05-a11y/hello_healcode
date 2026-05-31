import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "healcode",
  description:
    "healcode 공식 소개문구는 Discord 원문을 기준으로 반영합니다.",
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
