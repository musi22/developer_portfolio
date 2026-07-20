import type { Metadata, Viewport } from "next";
import "./globals.css";
import { personal } from "@/content/data/personal";

export const metadata: Metadata = {
  title: {
    default: `${personal.name} — AI Engineer & Full-Stack Developer`,
    template: `%s | ${personal.name}`,
  },
  description: personal.ogDescription,
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Backend Engineer",
    "Machine Learning",
    "React",
    "Next.js",
    "Python",
    "Portfolio",
    personal.name,
  ],
  authors: [{ name: personal.name, url: personal.website }],
  creator: personal.name,
  metadataBase: new URL(personal.website),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: personal.website,
    title: `${personal.name} — AI OS Portfolio`,
    description: personal.ogDescription,
    siteName: `${personal.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${personal.name} — AI OS Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — AI OS Portfolio`,
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
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#8b5cf6",
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
  return (
    <html lang="en" className="dark">
      <body className="mesh-bg antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
