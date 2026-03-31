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
  metadataBase: new URL("https://getappointly.co"),
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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://getappointly.co/#organization",
                name: "Appointly Solutions",
                url: "https://getappointly.co",
                logo: {
                  "@type": "ImageObject",
                  url: "https://getappointly.co/images/appointly-logo.png",
                },
                description:
                  "Appointly Solutions delivers exclusive, pre-qualified leads to insulation contractors on a pay-per-lead basis. We handle GMB optimization, Facebook ads, and lead qualification — you only pay when we deliver.",
                sameAs: [
                  "https://www.facebook.com/appointlysolutions",
                  "https://www.instagram.com/appointlysolutions",
                  "https://www.linkedin.com/company/appointly-solutions",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://getappointly.co/#localbusiness",
                name: "Appointly Solutions",
                url: "https://getappointly.co",
                logo: "https://getappointly.co/images/appointly-logo.png",
                description:
                  "Pay-per-lead insulation contractor marketing. GMB optimization, Facebook ads, and NFC review cards. You only pay when we deliver a qualified lead.",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Chicago",
                  addressRegion: "IL",
                  addressCountry: "US",
                },
                areaServed: ["US", "CA"],
                priceRange: "Pay Per Lead",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://getappointly.co/#website",
                url: "https://getappointly.co",
                name: "Appointly Solutions",
                inLanguage: "en-US",
                publisher: {
                  "@id": "https://getappointly.co/#organization",
                },
              },
            ]),
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
