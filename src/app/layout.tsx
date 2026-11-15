import type { Metadata, Viewport } from "next";
import { DM_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description =
  "Shubham Sale, full stack developer in Nashik, India. 3+ years building ERPs, SaaS and dashboards in React, Next.js, Node.js, NestJS. Open to jobs and freelance.";
const title = "Shubham Sale | Full Stack Developer in Nashik, India";
const siteUrl = "https://shubsale.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Shubham Sale",
  authors: [{ name: "Shubham Sale", url: siteUrl }],
  creator: "Shubham Sale",
  category: "technology",
  keywords: [
    "Shubham Sale",
    "full stack developer Nashik",
    "hire full stack developer",
    "freelance web developer India",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "NestJS",
    "ERP development",
    "TypeScript",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Shubham Sale",
    locale: "en_IN",
    title,
    description,
    firstName: "Shubham",
    lastName: "Sale",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1c",
};

// Runs before first paint: marks JS as available, clears any colour theme saved by an
// older version of the site, and skips the intro card on repeat visits this session.
const bootScript = `(function(){var d=document.documentElement;d.setAttribute("data-js","");try{localStorage.removeItem("palette")}catch(e){}try{if(sessionStorage.getItem("intro-seen"))d.setAttribute("data-intro","done")}catch(e){d.setAttribute("data-intro","done")}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
