import { existsSync } from "node:fs";
import path from "node:path";
import { Intro } from "@/components/intro";
import { Nav } from "@/components/nav";
import { RevealOnScroll } from "@/components/reveal";
import { About, Contact, Experience, Footer, Hero, Services } from "@/components/sections";
import { UIProvider } from "@/components/ui-provider";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Work } from "@/components/work";
import { profile, skills } from "@/data/profile";

/** Drop a portrait into /public with one of these names (first match wins; the large photo_shubham.png is only a fallback). */
const PHOTO_NAMES = ["profile.webp", "profile.jpg", "profile.jpeg", "profile.png", "photo_shubham.png"];

function findPhoto(): string | null {
  const name = PHOTO_NAMES.find((file) => existsSync(path.join(process.cwd(), "public", file)));
  return name ? `/${name}` : null;
}

const SITE = "https://shubsale.in";
const pageTitle = "Shubham Sale | Full Stack Developer in Nashik, India";

const person = {
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: profile.name,
  url: SITE,
  image: `${SITE}/profile.webp`,
  jobTitle: "Full Stack Developer",
  description:
    "Full stack developer in Nashik, India, building ERPs, SaaS products and dashboards with React, Next.js, Node.js and NestJS.",
  email: `mailto:${profile.email}`,
  telephone: `+${profile.whatsapp}`,
  address: { "@type": "PostalAddress", addressLocality: "Nashik", addressRegion: "Maharashtra", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "AI Alpha Tech Pvt. Ltd." },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: skills.flatMap((s) => s.items).slice(0, 20),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Shubham Sale",
      inLanguage: "en-IN",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#profilepage`,
      url: SITE,
      name: pageTitle,
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#person` },
      mainEntity: { "@id": `${SITE}/#person` },
    },
    person,
  ],
};

export default function Home() {
  const photo = findPhoto();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <UIProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Intro photo={photo} />
        <Nav />
        <main id="main" tabIndex={-1}>
          <Hero photo={photo} />
          <Work />
          <Experience />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
        <div className="grain" aria-hidden="true" />
        <RevealOnScroll />
      </UIProvider>
    </>
  );
}
