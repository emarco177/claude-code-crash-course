import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LevelUp AI - Battle Your Way to AI Mastery",
  description:
    "Compete in real-time coding battles, master LLM engineering, and climb the leaderboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        {children}
      </body>
    </html>
  );
}
