import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppProviders } from "@/components/AppProviders";
import "./globals.css";

const geistSans = localFont({
  src: "../../public/fonts/GeistVariableVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVariableVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stack — The platform for developer teams",
  description:
    "Ship faster with a modern developer platform. Built for teams that move fast and break nothing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-[#ededed] font-sans`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
