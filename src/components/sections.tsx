import Image from "next/image";
import { capabilities, journey, profile, skills } from "@/data/profile";
import { ContactForm } from "./contact-form";

const pad = "px-6 md:px-12 lg:px-20";
const sectionBase = `${pad} py-24 md:py-32 lg:py-40 border-t border-line scroll-mt-16`;

export function Hero({ photo }: { photo: string | null }) {
  return (
    <section id="top" tabIndex={-1} className={`relative flex min-h-svh flex-col justify-center overflow-hidden ${pad} py-28 md:py-32 lg:py-40`}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/[0.06] via-ink to-ink" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-site min-w-0 grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 min-w-0 lg:order-1 lg:col-span-7">
          <p data-hero-animate style={{ "--i": 0 } as React.CSSProperties} className="label mb-6">
            {profile.name} - {profile.role}
          </p>
          <h1
            data-hero-animate
            style={{ "--i": 1 } as React.CSSProperties}
            className="text-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] break-words text-paper"
          >
            {profile.tagline}
          </h1>
          <p data-hero-animate style={{ "--i": 2 } as React.CSSProperties} className="mt-8 max-w-prose text-lg leading-relaxed text-muted md:text-xl">
            {profile.intro}
          </p>
          <div data-hero-animate style={{ "--i": 3 } as React.CSSProperties} className="mt-12 flex flex-wrap gap-4">
            <a href="#work" className="btn-accent">
              View work
            </a>
            <a href="#contact" className="btn-outline">
              Get in touch
            </a>
          </div>
          <p data-hero-animate style={{ "--i": 4 } as React.CSSProperties} className="text-mono mt-10 flex items-center gap-3 text-[11px] tracking-wide text-muted">
            <span className="status-dot" aria-hidden="true" />
            {profile.status} Based in {profile.location}.
          </p>
        </div>

        <div data-hero-animate style={{ "--i": 2 } as React.CSSProperties} className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <div className="group relative">
            <div className="absolute -inset-3 rotate-2 rounded-2xl border border-accent/20 transition-transform duration-500 group-hover:rotate-0" aria-hidden="true" />
            <div className="relative aspect-[4/5] w-56 overflow-hidden rounded-2xl border border-line bg-surface sm:w-72 md:w-80">
              {photo ? (
                <Image
                  src={photo}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  sizes="(min-width: 768px) 320px, (min-width: 640px) 288px, 224px"
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  priority
                />
              ) : (
                <div className="card-grid flex h-full items-center justify-center" role="img" aria-label={profile.name}>
                  <span className="text-display text-[7rem] leading-none text-paper/90">{profile.initials}</span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" aria-hidden="true">
        <span className="text-mono text-[10px] tracking-widest text-muted uppercase">Scroll</span>
        <span className="scroll-line block h-8 w-px bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" tabIndex={-1} aria-labelledby="about-title" className={sectionBase}>
      <div className="mx-auto grid max-w-site grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4" data-reveal>
          <p className="label">01 - About</p>
          <p className="text-display mt-6 text-3xl leading-tight text-paper md:text-4xl">{profile.name}</p>
          <p className="text-mono mt-2 text-xs tracking-widest text-muted uppercase">{profile.role}</p>
          <h2 id="about-title" className="text-display mt-10 text-2xl leading-tight text-muted md:text-3xl">
            {profile.aboutHeading}
          </h2>
        </div>
        <div className="space-y-8 lg:col-span-8" data-reveal>
          {profile.about.map((p) => (
            <p key={p} className="text-xl leading-relaxed text-paper md:text-2xl">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Capabilities() {
  return (
    <section id="skills" tabIndex={-1} aria-labelledby="skills-title" className={sectionBase}>
      <div className="mx-auto max-w-site">
        <div data-reveal>
          <p className="label">03 - Capabilities</p>
          <h2 id="skills-title" className="text-display mt-4 mb-16 max-w-xl text-4xl text-paper md:text-5xl">
            What I bring to a team
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {capabilities.map((c, i) => (
            <li
              key={c.title}
              data-reveal
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              className="rounded-lg border border-line bg-surface/50 p-8 transition-colors hover:bg-surface"
            >
              <span className="text-mono text-[10px] tracking-widest text-accent uppercase">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-display mt-4 text-2xl text-paper">{c.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{c.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Tools for ${c.title}`}>
                {c.items.map((item) => (
                  <li key={item} className="pill">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-24 border-t border-line pt-16">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end" data-reveal>
            <div>
              <p className="label">Full toolkit</p>
              <h3 className="text-display mt-3 text-2xl text-paper md:text-3xl">Technologies I work with</h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Grouped by area. Most of these are in daily use on production client work.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.group} data-reveal>
                <h4 className="text-mono mb-4 text-[10px] tracking-[0.25em] text-accent uppercase">{group.group}</h4>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="pill pill-tool">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section id="journey" tabIndex={-1} aria-labelledby="journey-title" className={sectionBase}>
      <div className="mx-auto max-w-site">
        <div data-reveal>
          <p className="label">04 - Journey</p>
          <h2 id="journey-title" className="text-display mt-4 mb-16 text-4xl text-paper md:text-5xl">
            Where I&apos;ve worked and studied
          </h2>
        </div>
        <ol className="flex flex-col border-t border-line">
          {journey.map((item) => (
            <li
              key={item.id}
              data-reveal
              className="group grid grid-cols-1 gap-4 border-b border-line py-10 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-3">
                <p className="text-mono text-[10px] tracking-widest text-muted uppercase">{item.period}</p>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-display text-xl text-paper transition-colors group-hover:text-accent md:text-2xl">{item.title}</h3>
                <p className="text-mono mt-1 text-xs tracking-wider text-muted uppercase">{item.org}</p>
              </div>
              <div className="md:col-span-5">
                <p className="leading-relaxed text-muted">{item.summary}</p>
                {item.points && (
                  <ul className="dash-list mt-5">
                    {item.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className={`${sectionBase} flex min-h-[80vh] flex-col justify-center`}
    >
      <div className="mx-auto grid w-full max-w-site grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div data-reveal>
          <p className="label">05 - Contact</p>
          <h2 id="contact-title" className="text-display mt-4 text-4xl leading-tight text-paper md:text-6xl">
            Let&apos;s talk about your team
          </h2>
          <p className="mt-6 max-w-prose leading-relaxed text-muted">
            I&apos;m open to full-time full stack roles. Tell me what you&apos;re building and where I&apos;d fit, and I&apos;ll get back to you.
          </p>
          <ul className="text-mono mt-12 flex flex-col gap-4 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="link-underline break-all text-paper transition-colors hover:text-accent">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-underline text-muted transition-colors hover:text-accent">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="link-underline text-muted transition-colors hover:text-accent">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="link-underline text-muted transition-colors hover:text-accent">
                Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
        <div data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={`${pad} border-t border-line py-10`}>
      <div className="text-mono mx-auto flex max-w-site flex-col gap-4 text-[10px] tracking-[0.2em] text-muted uppercase md:flex-row md:items-center md:justify-between">
        <p>{profile.name}, {profile.location}</p>
        <p className="normal-case tracking-wide">
          Press <kbd className="kbd">Ctrl K</kbd> to search, or open the terminal and type help.
        </p>
        <a href="#top" className="link-underline w-fit transition-colors hover:text-accent">
          Back to top
        </a>
      </div>
    </footer>
  );
}
