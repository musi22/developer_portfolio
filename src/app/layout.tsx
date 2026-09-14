import type { Metadata, Viewport } from "next";
import "./globals.css";
import { personal } from "@/content/data/personal";

export const metadata: Metadata = {
  title: {
    default: `${personal.name} — AI Systems & Backend Engineer`,
    template: `%s | ${personal.name}`,
  },
  description: personal.ogDescription,
  keywords: [
    "Rashmi Shaw",
    "AI Systems Engineer",
    "Backend Engineer",
    "Agent Systems Engineer",
    "Applied AI Engineer",
    "LangGraph",
    "FastAPI",
    "Apache Kafka",
    "Distributed Systems",
    "AI Safety",
    "NIT Kurukshetra",
    "Software Engineer",
  ],
  authors: [{ name: personal.name, url: personal.website }],
  creator: personal.name,
  metadataBase: new URL(personal.website),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: personal.website,
    title: personal.ogTitle,
    description: personal.ogDescription,
    siteName: `${personal.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${personal.name} — AI Systems & Backend Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: personal.ogTitle,
    description: personal.ogDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#050607",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Person schema for search engine rich results
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    url: personal.website,
    sameAs: [
      personal.github,
      personal.linkedin,
      personal.leetcode,
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: personal.education.institution,
    },
    knowsAbout: [
      "AI Agent Orchestration",
      "LangGraph",
      "Distributed Systems",
      "FastAPI",
      "Apache Kafka",
      "Redis",
      "PostgreSQL",
      "Event-Driven Architecture",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressCountry: "India",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#050607] text-[#F4F4F5] selection:bg-[#61F4DE]/25 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
