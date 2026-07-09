import React from "react"
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

import { LazyExternalScript } from "@/components/deferred-loader";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getappointly.co"),
  title: "Appointly Solutions | Booked Estimates for Home Service Contractors",
  description:
    "We fill your calendar with booked estimates. Meta ads, instant speed-to-lead, and appointments set for you. Pay a retainer plus a per-appointment fee — you just show up and close.",
  keywords: [
    "booked estimates for contractors",
    "appointment setting for contractors",
    "floor coating leads",
    "epoxy floor contractor marketing",
    "home service contractor appointments",
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
    title: "Appointly Solutions | Booked Estimates for Home Service Contractors",
    description:
      "We fill your calendar with booked estimates. Meta ads, instant speed-to-lead, and appointments set for you. Pay a retainer plus a per-appointment fee — you just show up and close.",
    type: "website",
    url: "https://getappointly.co",
    siteName: "Appointly Solutions",
    images: [
      {
        url: "https://getappointly.co/images/appointly-og.png",
        width: 1200,
        height: 630,
        alt: "Appointly Solutions | Booked Estimates for Home Service Contractors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Appointly Solutions | Booked Estimates for Home Service Contractors",
    description:
      "We fill your calendar with booked estimates. Meta ads, instant speed-to-lead, and appointments set for you. Pay a retainer plus a per-appointment fee — you just show up and close.",
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
        {/* Warm up the Vidalytics origins so the deferred player and its poster
            thumbnail connect faster once the embed initializes. */}
        <link rel="preconnect" href="https://fast.vidalytics.com" />
        <link rel="preconnect" href="https://stats.vidalytics.com" />
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
                  url: "https://getappointly.co/images/appointly-logo-mark.png",
                },
                description:
                  "Appointly Solutions fills home service contractors' calendars with booked estimates. We run Meta ads, contact every lead instantly, and book the appointment for you. You pay a retainer plus a per-appointment fee for each booked estimate.",
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
                logo: "https://getappointly.co/images/appointly-logo-mark.png",
                description:
                  "Appointment generation for home service contractors. We run Meta ads, hit speed-to-lead, and book estimates straight onto your calendar. You pay a retainer plus a per-appointment fee for each booked estimate.",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Chicago",
                  addressRegion: "IL",
                  addressCountry: "US",
                },
                areaServed: ["US", "CA"],
                priceRange: "$$",
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
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MM0NQN3HP0');
          `}
        </Script>
        {/* Heavy gtag.js library is deferred to first interaction / short timeout
            to keep it off the initial load (TBT) window. Config above is queued in
            dataLayer and flushed once the library loads, so the page_view is kept. */}
        <LazyExternalScript
          id="ga-lib"
          src="https://www.googletagmanager.com/gtag/js?id=G-MM0NQN3HP0"
        />
      </head>
      <body
        className={`${jakarta.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
