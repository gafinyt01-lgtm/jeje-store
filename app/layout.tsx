import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JEJE STORE | Gaming Marketplace",
  description: "Top up Roblox dan marketplace akun Mobile Legends.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
