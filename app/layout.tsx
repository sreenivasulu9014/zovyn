import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zovyn.in"),
  title: {
    default: "zovyn.in: India's Smartest Job Alert Portal — AI-Matched to Your Profile",
    template: "%s | zovyn.in Job Alert",
  },
  description:
    "Discover latest Central & State Govt jobs (SSC, UPSC, Railway RRB, Bank, Police, Defence) and IT/Software off-campus openings in India. AI-powered profile matching and instant notifications.",
  keywords: [
    "Sarkari Result",
    "Govt Jobs Alert",
    "India Job Portal",
    "SSC CGL 2026",
    "Railway RRB NTPC",
    "Bank PO Jobs",
    "IT Software Jobs India",
    "Fresher Off Campus Drive",
    "AI Job Matcher",
    "zovyn",
    "State Govt Jobs",
    "10th Pass Jobs",
    "12th Pass Jobs",
    "Engineering Jobs"
  ],
  authors: [{ name: "zovyn.in Editorial Team" }],
  creator: "zovyn.in",
  publisher: "zovyn.in",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://zovyn.in",
    siteName: "zovyn.in",
    title: "zovyn.in: India's Smartest Job Alert Portal — AI-Matched to Your Profile",
    description:
      "Find latest Govt, Railway, Banking, Police & IT job notifications with AI profile matching.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "zovyn.in - India's Smartest Job Alert Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "zovyn.in: India's Smartest Job Alert Portal",
    description:
      "India's Smartest Job Alert Portal — AI-Matched to Your Profile.",
    creator: "@zovyn_in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
