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
  title: {
    default: "AlgoryCode — Yazılım ve Dijital Çözümler",
    template: "%s — AlgoryCode",
  },
  description:
    "E-ticaret, mobil uygulama, yapay zeka ve web geliştirme. AlgoryCode ile dijital ürünlerinizi büyütün.",
  metadataBase: new URL("https://algorycode.com"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "AlgoryCode",
    title: "AlgoryCode — Yazılım ve Dijital Çözümler",
    description:
      "E-ticaret, mobil uygulama, yapay zeka ve web geliştirme.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
