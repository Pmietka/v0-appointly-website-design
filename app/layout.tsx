import React from "react"
import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Appointly | Fill Your Calendar With Qualified Estimates",
  description:
    "We help insulation businesses fill their calendar with qualified estimates without wasting time on tire-kickers using our perfect homeowner capture & convert system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
