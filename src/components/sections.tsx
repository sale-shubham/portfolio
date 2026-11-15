import Image from "next/image";
import { DEFAULT_WHATSAPP_TEXT, journey, processSteps, profile, services, skills, whatsappLink } from "@/data/profile";
import { ContactForm } from "./contact-form";
import { HeroPaths } from "./path-links";
import { ServiceButton } from "./service-button";

const pad = "px-6 md:px-12 lg:px-20";
const sectionBase = `${pad} py-24 md:py-32 lg:py-40 border-t border-line scroll-mt-16`;
const contactLink = "link-underline text-muted transition-colors hover:text-accent";

export function Hero({ photo }: { photo: string | null }) {
  return (
    <section id="top" tabIndex={-1} className={`relative flex min-h-svh flex-col justify-center overflow-hidden ${pad} pt-24 pb-16 md:py-32 lg:py-40`}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/[0.06] via-ink to-ink" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-site min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-16">
        <div className="order-2 min-w-0 lg:order-1 lg:col-span-8 xl:col-span-7">
          <h1 data-hero-animate style={{ "--i": 0 } as React.CSSProperties} className="label mb-6">
            {profile.name} - {profile.role}
          </h1>
          <p
            data-hero-animate
            style={{ "--i": 1 } as React.CSSProperties}
            className="text-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] break-words text-paper"
          >
            {profile.tagline}
          </p>
          <p data-hero-animate style={{ "--i": 2 } as React.CSSProperties} className="mt-8 max-w-prose text-lg leading-relaxed text-muted md:text-xl">
            {profile.intro}
          </p>
          <div data-hero-animate style={{ "--i": 3 } as React.CSSProperties} className="mt-12">
            <HeroPaths />
          </div>
          <p data-hero-animate style={{ "--i": 4 } as React.CSSProperties} className="text-mono mt-10 flex items-center gap-3 text-[11px] leading-relaxed tracking-wide text-muted">
            <span className="status-dot shrink-0" aria-hidden="true" />
            {profile.status} Based in Nashik, India.
          </p>
        </div>

        <div data-hero-animate style={{ "--i": 2 } as React.CSSProperties} className="order-1 flex justify-center lg:order-2 lg:col-span-4 xl:col-span-5 lg:justify-end">
          <div className="group relative">
            <div className="absolute -inset-3 rotate-2 rounded-2xl border border-accent/20 transition-transform duration-500 group-hover:rotate-0" aria-hidden="true" />
            <div className="relative aspect-[4/5] w-44 overflow-hidden rounded-2xl border border-line bg-surface sm:w-60 md:w-72 lg:w-60 xl:w-80">
              {photo ? (
                <Image
                  src={photo}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  sizes="(min-width: 1280px) 320px, (min-width: 1024px) 240px, (min-width: 768px) 288px, (min-width: 640px) 240px, 176px"
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

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex" aria-hidden="true">
        <span className="text-mono text-[10px] tracking-widest text-muted uppercase">Scroll</span>
        <span className="scroll-line block h-8 w-px bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  );
}

function AudienceTag({ children }: { children: string }) {
  return <span className="pill">{children}</span>;
}

export function Experience() {
  return (
    <section id="experience" tabIndex={-1} aria-labelledby="experience-title" className={sectionBase}>
      <div className="mx-auto max-w-site">
        <div data-reveal>
          <div className="flex flex-wrap items-center gap-3">
            <p className="label">02 - Experience</p>
            <AudienceTag>For hiring teams</AudienceTag>
          </div>
          <h2 id="experience-title" className="text-display mt-4 mb-16 max-w-xl text-4xl text-paper md:text-5xl">
            Experience
          </h2>
        </div>
        <ol className="flex flex-col border-t border-line">
          {journey.map((item) => (
            <li
              key={item.id}
              data-reveal
              className="group grid grid-cols-1 gap-4 border-b border-line py-10 lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-3">
                <p className="text-mono text-[10px] tracking-widest text-muted uppercase">{item.period}</p>
              </div>
              <div className="lg:col-span-4">
                <h3 className="text-display text-xl text-paper transition-colors group-hover:text-accent md:text-2xl">{item.title}</h3>
                <p className="text-mono mt-1 text-xs tracking-wider text-muted uppercase">{item.org}</p>
              </div>
              <div className="max-w-prose lg:col-span-5 lg:max-w-none">
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
        <div data-reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-outline">
            View resume
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-underline text-mono text-xs tracking-widest text-paper uppercase transition-colors hover:text-accent">
            LinkedIn
          </a>
        </div>

        <div className="mt-24 border-t border-line pt-16">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end" data-reveal>
            <h3 className="text-display text-3xl text-paper md:text-4xl">Technologies I work with</h3>
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

export function Services() {
  return (
    <section id="services" tabIndex={-1} aria-labelledby="services-title" className={sectionBase}>
      <div className="mx-auto max-w-site">
        <div data-reveal>
          <div className="flex flex-wrap items-center gap-3">
            <p className="label">03 - Services</p>
            <AudienceTag>For businesses</AudienceTag>
          </div>
          <h2 id="services-title" className="text-display mt-4 mb-16 max-w-xl text-4xl text-paper md:text-5xl">
            What I can build for you
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <li
              key={s.id}
              data-reveal
              style={{ "--d": `${(i % 3) * 90}ms` } as React.CSSProperties}
              className="flex flex-col rounded-lg border border-line bg-surface/50 p-6 transition-colors hover:bg-surface sm:p-8"
            >
              <span className="text-mono text-[10px] tracking-widest text-accent uppercase">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-display mt-4 text-2xl text-paper">{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{s.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`What you get with ${s.title}`}>
                {s.deliverables.map((item) => (
                  <li key={item} className="pill">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-muted">{s.examples}</p>
              <div className="mt-auto pt-8">
                <ServiceButton id={s.id} title={s.title} />
              </div>
            </li>
          ))}
        </ul>
        <div id="process" tabIndex={-1} aria-labelledby="process-title" role="group" className="mt-24 scroll-mt-20 border-t border-line pt-16">
          <p id="process-title" className="label mb-10" data-reveal>
            How a project runs
          </p>
          <ol className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                data-reveal
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                className="border-t border-line pt-6"
              >
                <p className="text-mono text-[10px] tracking-widest text-accent uppercase">Step {String(i + 1).padStart(2, "0")}</p>
                <h4 className="text-display mt-4 text-2xl text-paper">{step.title}</h4>
                <p className="mt-4 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" tabIndex={-1} aria-labelledby="about-title" className={sectionBase}>
      <div className="mx-auto max-w-site">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-20">
          <div className="lg:col-span-4" data-reveal>
            <p className="label">04 - About</p>
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
            Let&apos;s talk
          </h2>
          <p className="mt-6 max-w-prose leading-relaxed text-muted">
            Hiring for a role or need something built? Pick one and send a short note. I&apos;ll reply by email or WhatsApp.
          </p>
          <ul className="text-mono mt-12 flex flex-col gap-4 text-sm">
            <li>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_TEXT)}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-paper transition-colors hover:text-accent"
              >
                WhatsApp {profile.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="link-underline break-all text-paper transition-colors hover:text-accent">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={contactLink}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className={contactLink}>
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer" className={contactLink}>
                Resume
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
    <footer className={`${pad} border-t border-line pt-10 pb-24 md:pb-10`}>
      <div className="text-mono mx-auto flex max-w-site flex-col gap-4 text-[10px] tracking-[0.2em] text-muted uppercase lg:flex-row lg:items-center lg:justify-between">
        <p>{profile.name}, full stack developer, Nashik</p>
        <p className="hidden normal-case tracking-wide lg:block">
          Press <kbd className="kbd">Ctrl K</kbd> to search, or open the terminal and type help.
        </p>
        <a href="#top" className="link-underline w-fit transition-colors hover:text-accent">
          Back to top
        </a>
      </div>
    </footer>
  );
}
