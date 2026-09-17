import React from "react"
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

import { LazyExternalScript } from "@/components/deferred-loader";
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
                url: "https://getappointly.co",
                logo: {
                  "@type": "ImageObject",
                  url: "https://getappointly.co/images/appointly-logo-mark.png",
                },
                description:
                  "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors. We specialize in floor coating companies. We run the Meta campaigns from our own ad account, contact every homeowner within minutes, qualify them, and book the estimate onto the contractor's calendar. One flat fee per booked estimate, one contractor per market.",
                sameAs: [
                  "https://www.instagram.com/appointlychicago",
                  "https://www.facebook.com/profile.php?id=61587335026673",
                  "https://www.linkedin.com/company/appointlysolutions",
                ],
                founder: [
                  { "@id": "https://getappointly.co/about#patrick-mietka" },
                  { "@id": "https://getappointly.co/about#jacob-mietka" },
                ],
                knowsAbout: [
                  "Floor coating lead generation",
                  "Epoxy and polyaspartic garage floor coating marketing",
                  "Meta ads for home service contractors",
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
                  "Appointly Solutions is a pay per appointment Meta ads agency that books estimates for garage floor coating and concrete coating contractors. We specialize in floor coating companies, hit speed to lead within minutes, and book estimates straight onto your calendar for one flat fee per booked estimate.",
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
      </body>
    </html>
  );
}
