import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "마이링크 (MyLink)",
  description: "나만의 링크 모음 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
