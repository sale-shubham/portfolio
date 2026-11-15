// Single source of truth for everything the site says about Shubham.
// The page, the command menu and the terminal all read from here.

export const profile = {
  name: "Shubham Sale",
  initials: "SS",
  role: "Full stack developer",
  location: "Nashik, Maharashtra",
  email: "saleshubham2121@gmail.com",
  github: "https://github.com/Shubham-sale",
  githubHandle: "Shubham-sale",
  linkedin: "https://www.linkedin.com/in/shubham-sale28",
  linkedinHandle: "shubham-sale28",
  resume: "/Shubham-Sale-Resume.pdf",
  tagline: "I build enterprise web apps, from the database to the dashboard.",
  intro:
    "Full stack developer with 3+ years shipping React, Next.js, NestJS and Node.js systems for manufacturing, healthcare and B2B teams.",
  status: "Open to full stack developer roles.",
  about: [
    "I'm a full stack developer at AI Alpha Tech in Nashik. For over three years I've built enterprise web applications for manufacturing, healthcare and B2B clients, from the database schema to the screens people use every day.",
    "Most of my work sits where business rules meet data: incentive pay on a factory floor, carton planning for mixed shipments, subscription access in a supplier marketplace. I like taking a process people run by hand and turning it into a system they can trust.",
  ],
  aboutHeading: "Typed APIs, careful data, dashboards that answer real questions.",
} as const;

export type FlowNode = { title: string; detail: string };

export type Project = {
  slug: string;
  name: string;
  client: string;
  tagline: string;
  summary: string;
  points: string[];
  stack: string[];
  /** Each inner array is one stage of the flow, left to right. */
  flow: FlowNode[][];
  flowLabel: string;
};

export const projects: Project[] = [
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

export const capabilities: { title: string; description: string; items: string[] }[] = [
  {
    title: "Interfaces people use all day",
    description:
      "Responsive dashboards and data-heavy forms in React and Next.js, built from reusable components with typed validation.",
    items: ["React", "Next.js", "Material UI", "Tailwind CSS", "React Hook Form", "Zod"],
  },
  {
    title: "APIs with the rules built in",
    description:
      "REST APIs in NestJS and Express with JWT auth, role-based access and validation, shaped around real business workflows.",
    items: ["NestJS", "Node.js", "Express", "JWT", "RBAC", "Joi"],
  },
  {
    title: "Fast queries, steady deploys",
    description:
      "Schema design and query tuning for high-volume SQL Server and PostgreSQL, shipped with Docker, GitHub Actions and AWS.",
    items: ["MSSQL", "PostgreSQL", "MongoDB", "TypeORM", "Docker", "AWS"],
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
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
