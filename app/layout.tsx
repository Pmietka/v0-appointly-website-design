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
  title: "Appointly Solutions | Appointment Booking for Home Service Contractors",
  description:
    "We run Meta ads, qualify prospects, and book appointments straight onto your calendar. Pay for performance — only when we deliver booked estimates. Featured niche: floor coatings.",
  keywords: [
    "floor coating contractor appointments",
    "epoxy floor coating marketing",
    "appointment booking for contractors",
    "home service contractor appointments",
    "pay for performance contractor marketing",
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
    title: "Appointly Solutions | Appointment Booking for Home Service Contractors",
    description:
      "We run Meta ads, qualify prospects, and book appointments straight onto your calendar. Pay for performance — only when we deliver booked estimates.",
    type: "website",
    url: "https://getappointly.co",
    siteName: "Appointly Solutions",
    images: [
      {
        url: "https://getappointly.co/images/appointly-og.png",
        width: 1024,
        height: 350,
        alt: "Appointly Solutions | Appointment Booking for Home Service Contractors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Appointly Solutions | Appointment Booking for Home Service Contractors",
    description:
      "We run Meta ads, qualify prospects, and book appointments straight onto your calendar. Pay for performance — only when we deliver booked estimates.",
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
                  "Appointly Solutions runs Meta ads, qualifies prospects, and books appointments straight onto home service contractors' calendars on a pay-for-performance basis. We serve floor coating contractors, insulation contractors, and other home service trades.",
                sameAs: [
                  "https://www.instagram.com/appointlychicago",
                  "https://www.facebook.com/profile.php?id=61587335026673",
                  "https://www.linkedin.com/company/appointlysolutions",
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
                  "Appointly Solutions is a performance-based appointment booking agency for home service contractors. We handle Meta ads, prospect qualification, and calendar booking — you only pay when we deliver booked estimate appointments.",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Chicago",
                  addressRegion: "IL",
                  addressCountry: "US",
                },
                areaServed: ["US", "CA"],
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
