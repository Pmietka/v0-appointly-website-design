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
  title: "Appointly Solutions | Exclusive Leads for Insulation Contractors",
  description:
    "Appointly Solutions delivers exclusive, pre-qualified leads to home insulation contractors on a cost per lead basis. No retainers, no ad spend on your end, no risk. Just booked appointments.",
  keywords: [
    "insulation contractor leads",
    "home insulation leads",
    "insulation lead generation",
    "cost per lead insulation",
    "insulation marketing",
    "Appointly Solutions",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://getappointly.co",
  },
  openGraph: {
    title: "Appointly Solutions | Exclusive Leads for Insulation Contractors",
    description:
      "Appointly Solutions delivers exclusive, pre-qualified leads to home insulation contractors on a cost per lead basis. No retainers, no ad spend on your end, no risk. Just booked appointments.",
    type: "website",
    url: "https://getappointly.co",
    siteName: "Appointly Solutions",
    images: [
      {
        url: "https://getappointly.co/images/appointly-og.png",
        width: 1200,
        height: 630,
        alt: "Appointly Solutions | Exclusive Leads for Insulation Contractors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Appointly Solutions | Exclusive Leads for Insulation Contractors",
    description:
      "Appointly Solutions delivers exclusive, pre-qualified leads to home insulation contractors on a cost per lead basis. No retainers, no ad spend on your end, no risk. Just booked appointments.",
    images: ["https://getappointly.co/images/appointly-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Appointly Solutions",
              url: "https://getappointly.co",
              logo: "https://getappointly.co/images/appointly-logo.png",
              description:
                "Appointly Solutions generates exclusive, pre-qualified leads for home insulation contractors on a cost per lead basis. We handle targeting, follow-up, and appointment booking so contractors only pay for real results.",
              areaServed: "US",
              serviceType: "Lead Generation for Insulation Contractors",
              priceRange: "Pay Per Lead",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
