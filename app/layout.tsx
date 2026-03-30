import React from "react"
import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Appointly Solutions | Pay-Per-Lead for Insulation Contractors",
  description:
    "Get exclusive, qualified insulation leads. Startup fee, then pay only when we deliver. GMB optimization, Facebook ads, and NFC review system included. No monthly retainer.",
  keywords: [
    "insulation contractor leads",
    "pay per lead insulation",
    "insulation lead generation",
    "exclusive insulation leads",
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
    title: "Appointly Solutions | Pay-Per-Lead for Insulation Contractors",
    description:
      "Get exclusive, qualified insulation leads. Startup fee, then pay only when we deliver. GMB optimization, Facebook ads, and NFC review system included. No monthly retainer.",
    type: "website",
    url: "https://getappointly.co",
    siteName: "Appointly Solutions",
    images: [
      {
        url: "https://getappointly.co/images/appointly-og.png",
        width: 1024,
        height: 350,
        alt: "Appointly Solutions | Pay-Per-Lead for Insulation Contractors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Appointly Solutions | Pay-Per-Lead for Insulation Contractors",
    description:
      "Get exclusive, qualified insulation leads. Startup fee, then pay only when we deliver. GMB optimization, Facebook ads, and NFC review system included. No monthly retainer.",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MM0NQN3HP0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MM0NQN3HP0');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
