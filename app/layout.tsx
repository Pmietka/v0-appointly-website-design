import React from "react"
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

import { LazyExternalScript } from "@/components/deferred-loader";
import { authors, personSchema } from "@/lib/authors";
import { GOOGLE_BUSINESS_PROFILE, ORGANIZATION_SAME_AS } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getappointly.co"),
  title: "Appointly Solutions | Booked Estimates for Floor Coating Contractors",
  description:
    "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors.",
  keywords: [
    "floor coating lead generation",
    "garage floor coating leads",
    "concrete coating contractor marketing",
    "pay per appointment agency",
    "booked estimates for contractors",
    "epoxy floor contractor marketing",
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
  openGraph: {
    title: "Appointly Solutions | Booked Estimates for Floor Coating Contractors",
    description:
      "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors.",
    type: "website",
    url: "https://getappointly.co",
    siteName: "Appointly Solutions",
    images: [
      {
        url: "https://getappointly.co/images/appointly-og.png",
        width: 1200,
        height: 630,
        alt: "Appointly Solutions | Booked Estimates for Floor Coating Contractors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Appointly Solutions | Booked Estimates for Floor Coating Contractors",
    description:
      "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors.",
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
                legalName: "Appointly Solutions LLC",
                url: "https://getappointly.co",
                logo: {
                  "@type": "ImageObject",
                  url: "https://getappointly.co/images/appointly-logo.png",
                  width: 1024,
                  height: 1024,
                },
                image: "https://getappointly.co/images/appointly-og.png",
                description:
                  "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors. Floor coating is the only trade we work in. We run the Meta campaigns, text and call every homeowner within one minute, qualify them on intent, and book the estimate onto the contractor's calendar. The contractor funds ad spend at cost with no markup and pays $125 to $175 per booked appointment, with no setup fee and one contractor per market. Contractors grade every appointment after the estimate, and an appointment graded C is not paid for.",
                foundingDate: "2025-11",
                founder: [personSchema(authors.patrick), personSchema(authors.jacob)],
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Chicago",
                  addressRegion: "IL",
                  addressCountry: "US",
                },
                email: "patrick@getappointly.co",
                sameAs: ORGANIZATION_SAME_AS,
                knowsAbout: [
                  "Floor coating lead generation",
                  "Epoxy and polyaspartic garage floor coating marketing",
                  "Meta ads for floor coating contractors",
                  "Appointment setting for contractors",
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
                  "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors. Floor coating is the only trade we work in. Every lead gets a text and a call within one minute, and estimates are booked straight onto the contractor's calendar. The contractor funds ad spend at cost and pays $125 to $175 per booked appointment.",
                parentOrganization: { "@id": "https://getappointly.co/#organization" },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Chicago",
                  addressRegion: "IL",
                  addressCountry: "US",
                },
                sameAs: [GOOGLE_BUSINESS_PROFILE],
                areaServed: ["US", "CA"],
                priceRange: "$125 to $175 per booked appointment, plus client funded ad spend at cost",
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
      </body>
    </html>
  );
}
