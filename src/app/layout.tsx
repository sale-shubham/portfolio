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
  "Full stack developer in Nashik, India, with 3+ years building ERPs, SaaS products and dashboards in React, Next.js, Node.js and NestJS. Open to full-time roles and freelance projects.";
const title = "Shubham Sale | Full Stack Developer";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Shubham Sale" }],
  keywords: [
    "Shubham Sale",
    "freelance developer",
    "full stack developer",
    "full stack developer jobs",
    "hire full stack developer",
    "full stack developer Nashik",
    "ERP development",
    "React",
    "Next.js",
    "NestJS",
    "Node.js",
    "TypeScript",
    "Nashik",
  ],
  openGraph: {
    title,
    description,
    type: "profile",
  },
  twitter: {
    card: "summary",
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
