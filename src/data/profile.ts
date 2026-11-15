// Single source of truth for everything the site says about Shubham.
// The page, the command menu and the terminal all read from here.

export const profile = {
  name: "Shubham Sale",
  initials: "SS",
  role: "Full stack developer",
  location: "Nashik, Maharashtra",
  email: "saleshubham2121@gmail.com",
  github: "https://github.com/sale-shubham",
  githubHandle: "sale-shubham",
  linkedin: "https://www.linkedin.com/in/shubham-sale28",
  linkedinHandle: "shubham-sale28",
  resume: "https://drive.google.com/file/d/1xzY3gnylgyLoDIxgKuh4FAiowR0YPhHY/view?usp=sharing",
  whatsapp: "917709295725",
  whatsappDisplay: "+91 77092 95725",
  tagline: "I build the software businesses run on.",
  intro:
    "3+ years shipping ERPs, SaaS products and clinic software with React, Next.js, Node.js and NestJS, from database design to deployment on AWS.",
  status: "Open to full-time roles and freelance projects.",
  about: [
    "I'm Shubham, a full stack developer in Nashik. For over three years at AI Alpha Tech I've built production systems: ERPs for manufacturers, a housing-society SaaS on the App Store, clinic software, and plant operations tools that talk to weighbridge hardware.",
    "I'm open to full-time roles where I can own features end to end, and I take on freelance projects for businesses that need custom software. Either way, you get one person who can plan the system, design the database, build the web app and APIs, and run it on AWS.",
  ],
  aboutHeading: "One developer, from database to deployment.",
} as const;

export const DEFAULT_WHATSAPP_TEXT = "Hi Shubham, I'd like to discuss a project.";

/** Link to a WhatsApp chat with Shubham, optionally with a prefilled message. */
export function whatsappLink(text?: string): string {
  const base = `https://wa.me/${profile.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export type Service = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  examples: string;
};

export const services: Service[] = [
  {
    id: "business-software",
    title: "Custom business software and ERP",
    description:
      "Replace spreadsheets and paper with a system built around how your business actually works: inventory, purchases, sales, production, ledgers and approvals.",
    deliverables: ["Inventory and stock ledgers", "Purchase and sales flows", "Production and BOM", "Roles and approvals", "Audit trail"],
    examples: "Like Unikorn Coatings ERP and the Taparia Tools systems",
  },
  {
    id: "saas",
    title: "Web apps and SaaS products",
    description:
      "Multi-user platforms with sign-up, subscriptions, role-based access and admin panels, ready to grow from your first customers to many.",
    deliverables: ["User accounts and roles", "Subscriptions and payments", "Admin panel", "Multi-tenant data"],
    examples: "Like Chairman Saheb, Rise Vitalis and P2X",
  },
  {
    id: "dashboards",
    title: "Dashboards and internal tools",
    description:
      "Clear dashboards and reports for the numbers you check every day, with exports to Excel, PDF and Tally.",
    deliverables: ["Charts and KPIs", "Excel and PDF exports", "Tally-ready exports", "Search and filters"],
    examples: "Like the production and carton dashboards for Taparia Tools",
  },
  {
    id: "integrations",
    title: "APIs, integrations and automation",
    description:
      "Connect your software to the tools you already use: payment gateways, WhatsApp, email, Google Sheets, AI and even hardware on the shop floor.",
    deliverables: ["REST APIs", "Razorpay payments", "WhatsApp and email alerts", "Hardware and OCR"],
    examples: "Like the HCON weighbridge integration",
  },
  {
    id: "websites",
    title: "Business websites",
    description: "Fast, search-friendly websites with a clear message, contact forms and pages you can update.",
    deliverables: ["Responsive design", "SEO setup", "Contact and enquiry forms", "Content pages"],
    examples: "Like the Unikorn Coatings and Rise Vitalis websites",
  },
  {
    id: "cloud",
    title: "Cloud deployment and support",
    description:
      "Your app set up properly on AWS with automatic deploys, backups and monitoring, plus fixes and new features after launch.",
    deliverables: ["AWS Lambda and Amplify", "CI/CD pipelines", "Custom domains and SSL", "Ongoing maintenance"],
    examples: "Every project above runs on AWS",
  },
];

export const processSteps: { title: string; description: string }[] = [
  {
    title: "Discovery call",
    description:
      "We talk through your business, the problem and what a good result looks like. You get an honest view of what to build first.",
  },
  {
    title: "Scope and proposal",
    description:
      "A written scope with features, timeline and cost, so you know exactly what you're getting before work starts.",
  },
  {
    title: "Build in short cycles",
    description: "Regular demos on a live staging link, so you see progress and can change direction early.",
  },
  {
    title: "Launch and support",
    description:
      "I deploy to AWS, hand over access and documentation, and can stay on for fixes and new features.",
  },
];

export type FlowNode = { title: string; detail: string };

export type Project = {
  slug: string;
  name: string;
  client: string;
  tagline: string;
  summary: string;
  points: string[];
  stack: string[];
  credit: string;
  role: string;
  /** Each inner array is one stage of the flow, left to right. Titles and details must be 18 characters or fewer. */
  flow: FlowNode[][];
  flowLabel: string;
};

const CREDIT = "Built at AI Alpha Tech";
const ROLE = "Full stack developer";

export const projects: Project[] = [
  {
    slug: "chairman-saheb",
    name: "Chairman Saheb",
    client: "Housing society SaaS",
    tagline: "Society management for chairmen, residents and watchmen, on web and mobile.",
    summary:
      "A subscription SaaS for Indian housing societies. Chairmen run maintenance billing, finances, notices and meetings; residents pay dues and book amenities; watchmen manage visitor entry. It runs as a Flutter mobile app and a Next.js web panel on one API.",
    points: [
      "Role-based access for chairmen, committee members, residents, family members, watchmen and platform admins, scoped to each society.",
      "Maintenance billing, payment requests, receipts and monthly statements, with PDF and Excel exports.",
      "Paid subscription plans through Razorpay, and a leads CRM synced to Google Sheets.",
      "Visitor entry, amenity booking, polls, meetings, complaints, SOS and push notifications.",
      "About 38 Playwright end-to-end specs run in GitHub Actions on every pull request and nightly.",
    ],
    stack: ["Next.js", "Flutter", "Node.js", "Express", "MongoDB", "Razorpay", "AWS Lambda", "Playwright"],
    credit: CREDIT,
    role: ROLE,
    flowLabel: "How a society's data moves through the platform",
    flow: [
      [{ title: "Society members", detail: "Flutter, Next.js" }],
      [{ title: "Secure API", detail: "Express, JWT RBAC" }],
      [{ title: "Data & payments", detail: "MongoDB, Razorpay" }],
      [{ title: "Cloud & QA", detail: "Lambda, Playwright" }],
    ],
  },
  {
    slug: "unikorn",
    name: "Unikorn Coatings ERP",
    client: "Powder coatings manufacturer",
    tagline: "Inventory, production, sales and ledgers for a powder-coatings maker, plus its public website.",
    summary:
      "A custom ERP for a powder-coatings manufacturer in Nashik with several plants and warehouses: purchases, production from formulas, sales, stock and party ledgers. The company's public website was rebuilt too, with a full RAL colour catalogue.",
    points: [
      "Stock across plants and warehouses, with transfers and a ledger entry for every movement.",
      "Bills of materials and production runs that consume raw material automatically.",
      "Purchases with landed charges, invoiced and non-invoiced sales, returns and GST handling.",
      "Party ledgers, payments and expenses, with Tally-ready Excel exports.",
      "Custom roles with a permission grid, a full audit trail and real-time notifications.",
      "A public website with the 216-shade RAL Classic catalogue and an enquiry form.",
    ],
    stack: ["Next.js", "React", "Node.js", "Express", "PostgreSQL", "Prisma", "AWS Lambda", "AWS Amplify"],
    credit: CREDIT,
    role: ROLE,
    flowLabel: "How the ERP turns daily work into ledgers",
    flow: [
      [{ title: "Staff ERP app", detail: "Next.js, React" }],
      [{ title: "Secure API", detail: "Express on Lambda" }],
      [{ title: "Ledger database", detail: "Postgres, Prisma" }],
      [{ title: "Alerts & website", detail: "WebSocket, S3" }],
    ],
  },
  {
    slug: "hcon",
    name: "HCON weighbridge system",
    client: "Ready-mix concrete plants",
    tagline: "Truck weights go straight from the weighbridge into the plant's operations app.",
    summary:
      "Plant operations for a ready-mix concrete business with two plants: inward raw material, outward concrete challans and live stock. A small Windows agent reads the weighbridge so staff capture exact truck weights with one click.",
    points: [
      "A Python agent reads the weighbridge indicator over RS232 and serves stable, fresh weights to the app.",
      "A step-by-step inward workflow from gross weight through unloading, tare and confirmation.",
      "Outward challans by concrete grade and delivery mode, exported as PDF and image.",
      "A photo fallback that reads weighbridge displays and number plates with OpenAI Vision.",
      "Offline-tolerant submissions, live stock ledgers and a role builder with fine-grained permissions.",
    ],
    stack: ["React", "TypeScript", "Python", "Node.js", "Express", "PostgreSQL", "Prisma", "AWS Lambda"],
    credit: CREDIT,
    role: ROLE,
    flowLabel: "How a truck's weight becomes a challan",
    flow: [
      [{ title: "Capture weight", detail: "RS232, Python" }],
      [{ title: "Record weighment", detail: "React PWA" }],
      [{ title: "Process & store", detail: "Lambda, Postgres" }],
      [{ title: "Challans & reports", detail: "PDF, Excel, S3" }],
    ],
  },
  {
    slug: "rise-vitalis",
    name: "Rise Vitalis",
    client: "Rehabilitation clinics",
    tagline: "Practice management for rehab doctors, built with India's DPDP data protection law in mind.",
    summary:
      "A multi-tenant platform where rehabilitation doctors manage patients, specialty follow-ups, appointments and finances, while an admin team approves doctors and manages site content.",
    points: [
      "Doctor self-registration with an approval pipeline, and per-device sessions with JWT and OTP.",
      "Patient records with documents, a same-day queue and specialty follow-ups such as paediatric OT, MSK, neuro and oncology.",
      "Recurring appointments on a calendar, session and package billing, and PDF summaries.",
      "WhatsApp appointment reminders through Meta's Cloud API, with consent and opt-out tracking.",
      "DPDP work: recorded consent, audit logs on clinical changes, a breach register and full patient data erasure.",
    ],
    stack: ["Next.js", "React", "Material UI", "Node.js", "Express", "MongoDB", "AWS Lambda", "WhatsApp API"],
    credit: CREDIT,
    role: ROLE,
    flowLabel: "How a clinic's day flows through the system",
    flow: [
      [{ title: "Public site", detail: "Next.js" }],
      [{ title: "Doctor onboarding", detail: "Approval, JWT" }],
      [{ title: "Clinical workflow", detail: "Follow-ups, visits" }],
      [{ title: "Billing & alerts", detail: "PDF, WhatsApp" }],
    ],
  },
  {
    slug: "pms",
    name: "Production management system",
    client: "Taparia Tools, manufacturing",
    tagline: "Factory output to incentive pay, without the manual payroll work.",
    summary:
      "Tracks daily production and workforce activity on the factory floor, and works out incentive pay for temporary and permanent staff from configurable factory rules.",
    points: [
      "Automated incentive calculations from configurable business rules, replacing manual payroll work.",
      "Added idle-time tracking and shift validation so payroll matches what happened on the floor.",
      "Built dashboards and reports for workforce productivity, machine utilization and output.",
      "Tuned REST APIs and MSSQL queries to handle large volumes of production records.",
    ],
    stack: ["NestJS", "TypeScript", "TypeORM", "MSSQL", "Next.js", "Material UI", "React Hook Form", "Zod"],
    credit: CREDIT,
    role: ROLE,
    flowLabel: "How a production entry becomes incentive pay",
    flow: [
      [{ title: "Production entry", detail: "Next.js, Zod" }],
      [{ title: "Shift validation", detail: "NestJS, RBAC" }],
      [{ title: "Incentive engine", detail: "factory rules" }],
      [{ title: "Payroll reports", detail: "MSSQL, TypeORM" }],
    ],
  },
  {
    slug: "cms",
    name: "Carton management system",
    client: "Taparia Tools, packaging",
    tagline: "Carton planning for mixed shipments, worked out by the system.",
    summary:
      "Decides which cartons to use for standard and assorted product shipments, replacing carton planning that used to be done by hand.",
    points: [
      "Designed the optimization logic that picks carton combinations from product dimensions and packaging constraints.",
      "Automated carton allocation to raise carton utilization and cut packaging waste.",
      "Built configurable modules for carton specifications, product mappings and packaging rules.",
      "Built dashboards for carton utilization and packaging efficiency.",
    ],
    stack: ["NestJS", "TypeScript", "TypeORM", "MSSQL", "Next.js", "Material UI", "React Hook Form", "Zod"],
    credit: CREDIT,
    role: ROLE,
    flowLabel: "How an order becomes a carton plan",
    flow: [
      [{ title: "Order items", detail: "Next.js, MUI" }],
      [{ title: "Packing rules", detail: "NestJS, mappings" }],
      [{ title: "Carton optimizer", detail: "dimension fit" }],
      [{ title: "Carton plan", detail: "MSSQL, reports" }],
    ],
  },
  {
    slug: "p2x",
    name: "P2X B2B marketplace",
    client: "Buyer–supplier platform",
    tagline: "Verified suppliers, with premium details behind subscription plans.",
    summary:
      "Connects buyers with verified suppliers. Suppliers list their business on subscription plans that decide who can see premium details such as contact information.",
    points: [
      "Built role-based authentication with JWT for buyers, suppliers and platform admins.",
      "Implemented feature-based subscription plans that control access to premium supplier information.",
      "Built search, filtering and inquiry workflows that make it quicker for buyers to find the right supplier.",
      "Built admin dashboards for subscriptions, listing moderation and platform analytics.",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Material UI", "JWT"],
    credit: CREDIT,
    role: ROLE,
    flowLabel: "How each role reaches supplier data",
    flow: [
      [
        { title: "Buyer", detail: "searches" },
        { title: "Supplier", detail: "lists" },
        { title: "Admin", detail: "moderates" },
      ],
      [{ title: "Auth and roles", detail: "JWT, RBAC" }],
      [{ title: "Plan check", detail: "subscriptions" }],
      [{ title: "Supplier listings", detail: "PostgreSQL, Mongo" }],
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: ["TypeScript", "JavaScript (ES6+)", "React", "Next.js", "Material UI", "Tailwind CSS", "React Hook Form", "Zod", "Zustand", "Axios", "HTML", "CSS"],
  },
  {
    group: "Backend",
    items: ["Node.js", "NestJS", "Express", "REST APIs", "JWT auth", "RBAC", "Joi", "Serverless"],
  },
  {
    group: "Databases",
    items: ["SQL Server", "PostgreSQL", "MongoDB", "TypeORM", "Prisma"],
  },
  {
    group: "Cloud and DevOps",
    items: ["AWS Lambda", "AWS S3", "AWS Amplify", "Docker", "GitHub Actions"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "Postman", "DBeaver", "MongoDB Compass", "VS Code", "Figma"],
  },
  {
    group: "AI tools",
    items: ["Claude", "ChatGPT", "Cursor"],
  },
];

export type JourneyItem = {
  id: string;
  period: string;
  title: string;
  org: string;
  summary: string;
  points?: string[];
};

export const journey: JourneyItem[] = [
  {
    id: "ai-alpha",
    period: "Aug 2023 – Present",
    title: "Full Stack Developer",
    org: "AI Alpha Tech Pvt. Ltd., Nashik",
    summary:
      "Building full stack web applications for healthcare, manufacturing and B2B clients with React, Next.js, Node.js, NestJS and TypeScript.",
    points: [
      "Design secure REST APIs with JWT authentication, role-based access control and request validation.",
      "Build responsive dashboards with Material UI, React Hook Form and shared components.",
      "Optimize SQL queries and backend services for high-volume transactional systems.",
      "Deploy with AWS Lambda, S3 and Amplify, and ship through Docker and GitHub Actions in an Agile team.",
    ],
  },
  {
    id: "mcs",
    period: "2021 – 2023",
    title: "Master of Computer Science",
    org: "Samarth College of Computer Science, Belhe (SPPU)",
    summary: "Graduated with a CGPA of 8.68.",
  },
  {
    id: "bcs",
    period: "2018 – 2021",
    title: "Bachelor of Computer Science",
    org: "Hon. B. J. College, Ale (SPPU)",
    summary: "Graduated with 84.1%.",
  },
];

export const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
