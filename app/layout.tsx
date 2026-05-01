import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Board MVP",
  description: "行きたい場所を集めるミニマルな旅行ボード"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
