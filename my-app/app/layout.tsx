import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "My Budget App - YNAB Style",
  description: "A simple budget tracking app inspired by YNAB principles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navigation />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
