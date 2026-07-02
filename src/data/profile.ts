// Single source of truth for everything shown on the page.
// Edit here, redeploy, done.

export const site = {
  // Update this after the first deploy — it feeds canonical URLs, the sitemap and Open Graph tags.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sumit-ks.vercel.app",
  name: "Sumit Kumar Singh",
  role: "Software Engineer",
  title: "Sumit Kumar Singh — Software Engineer",
  description:
    "Final-year CS undergrad at VIT Bhopal. I build Spring Boot backends and Next.js frontends — most recently the backend of a production LMS at STAQO. Open to SDE roles.",
};

export const contact = {
  email: "sumit127624@gmail.com",
  phone: "+91 83405 61787",
  phoneRaw: "+918340561787",
  github: "https://github.com/Sumit-Ks1",
  githubHandle: "Sumit-Ks1",
  linkedin: "https://www.linkedin.com/in/sumit-kumar-singh-8b1768292/",
};

export const sections = [
  { id: "experience", label: "Experience", index: "01" },
  { id: "projects", label: "Projects", index: "02" },
  { id: "skills", label: "Skills", index: "03" },
  { id: "achievements", label: "Achievements", index: "04" },
  { id: "education", label: "Education", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;

export const hero = {
  status: "Open to SDE roles · Class of 2027",
  headline: ["Sumit Kumar", "Singh"],
  lede: "I build products end to end — Spring Boot backends, Next.js frontends, and everything that keeps them fast.",
  sub: "Final-year Computer Science undergrad at VIT Bhopal University. Lately: engineering the backend of a production LMS at STAQO (a Sheela Foam company). Before that: ran tech at Geostrata, a geopolitics think tank, for close to a year.",
  ticker: "Java / Spring Boot · TypeScript / Next.js · 3× national hackathon finalist",
};

export const tldr = {
  label: "For recruiters — the 30-second version",
  cells: [
    {
      k: "Now",
      v: "Final-year B.Tech CSE at VIT Bhopal, graduating 2027. Open to SDE / backend / full-stack roles and internships.",
    },
    {
      k: "Latest",
      v: "Backend intern at STAQO (Sheela Foam) — built Spring Boot services and the MySQL schema for a production LMS on AWS.",
    },
    {
      k: "Track record",
      v: "Tech lead at Geostrata for ~11 months. 3× national hackathon finalist — SIH 2024, MIT mujX HackX, SPIT.",
    },
    {
      k: "Core stack",
      v: "Java · Spring Boot · TypeScript · Next.js · MySQL / PostgreSQL · AWS · Docker",
    },
  ],
};

export const experience = [
  {
    role: "Software Engineer Intern — Backend",
    org: "STAQO",
    orgNote: "subsidiary of Sheela Foam Ltd.",
    url: "https://www.staqo.com",
    period: "May 2026 — Jul 2026",
    summary: "Production LMS · real users · shipped inside the company's ERM platform",
    points: [
      "Built the Spring Boot backend for a production Learning Management System used by real employees, embedded into the company's existing ERM platform.",
      "Designed and created the MySQL schema behind the platform's core entities and flows.",
      "Integrated AWS S3 for storing and serving course assets and media.",
      "Worked in a polyglot services team — Next.js frontend, backend services in multiple languages — collaborating on API contracts and shipping to production throughout the internship.",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "AWS S3", "REST APIs", "Next.js"],
  },
  {
    role: "Tech Lead — Contract",
    org: "Geostrata",
    orgNote: "think tank · geopolitics & global affairs",
    url: null,
    period: "Oct 2024 — Aug 2025",
    summary: "Owned the platform end to end for ~11 months",
    points: [
      "Led end-to-end technical operations — high availability, performance optimization and smooth feature rollouts across staging and production via a streamlined CI/CD pipeline.",
      "Spearheaded technical SEO — structured data, page-speed optimization and continuous monitoring — improving site indexing, Core Web Vitals and organic reach.",
      "Bridged product vision and engineering execution, translating business requirements into scalable, maintainable solutions while mentoring contributors.",
    ],
    stack: ["Next.js", "CI/CD", "Technical SEO", "Core Web Vitals", "Mentoring"],
  },
];

export const projects = [
  {
    index: "01",
    name: "Serverless P2P File Transfer",
    oneLiner: "Files move browser-to-browser — encrypted end to end, stored nowhere.",
    points: [
      "Engineered a serverless, browser-to-browser file-sharing platform on WebRTC data channels with WebSocket signaling — files and ZIP archives travel peer-to-peer with no server storage and no database.",
      "True end-to-end encryption with ephemeral ECDH key exchange over the Web Crypto API (SHA-256 integrity): the signaling server relays public keys but can decrypt nothing.",
      "Designed the ICE/STUN connection-negotiation layer for low-latency direct peer connections — zero server bandwidth cost and none of the file-size ceilings of cloud sharing services.",
    ],
    stack: ["WebRTC", "WebSockets", "TypeScript", "Next.js", "Node.js"],
    facts: ["0 bytes stored server-side", "Ephemeral ECDH · E2E", "No file-size limit"],
    // Point this at the exact repo once it's public.
    link: { label: "GitHub", href: "https://github.com/Sumit-Ks1/PeerDrop" },
  },
  {
    index: "02",
    name: "Automated Email Warm-Up Platform",
    oneLiner: "Warm-up automation that gets cold inboxes into the primary tab.",
    points: [
      "Built a fully Dockerized platform that automates inbox warm-up for newly purchased custom-domain mailboxes, progressively scaling send volume over 1–2 months to establish sender reputation.",
      "Automated scheduled sends and engagement simulation through background cron jobs — reducing spam-folder placement and improving deliverability for agencies and startups.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Node.js", "Docker"],
    facts: ["Fully Dockerized", "1-2 month auto ramp-up", "Cron-driven engagement"],
    link: { label: "GitHub", href: "https://github.com/Sumit-Ks1/email-warmup/tree/main/email-warmup" },
  },
  {
    index: "03",
    name: "Derplexity AI",
    oneLiner: "A Perplexity-style answer engine that also reads the room.",
    points: [
      "Built an AI-powered search and emotion-analysis platform inspired by Perplexity — intelligent web search fused with emotion detection for more complete answers to user queries.",
      "Voice-first querying through the Web Speech API, background job orchestration with Inngest, and Supabase for auth and persistence.",
    ],
    stack: ["Next.js", "Supabase", "Inngest", "Web Speech API"],
    facts: ["Voice input", "Emotion-aware answers", "Background jobs"],
    link: { label: "GitHub", href: "https://github.com/Sumit-Ks1/derplexity-ai" },
  },
];

export const skillGroups = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "SQL"],
    featured: ["TypeScript", "Java"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "Redux", "Tailwind CSS", "Material UI"],
    featured: ["Next.js"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "Spring Boot", "REST APIs", "gRPC", "WebRTC", "WebSockets"],
    featured: ["Spring Boot", "Node.js"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "Redis", "MySQL"],
    featured: ["PostgreSQL"],
  },
  {
    label: "Tools & Platforms",
    items: ["Git", "GitHub", "Docker", "AWS", "CI/CD", "Postman", "Vercel"],
    featured: ["Docker", "AWS"],
  },
  {
    label: "Concepts",
    items: ["System Design", "Microservices", "RESTful Architecture", "Distributed Systems", "Agile/Scrum"],
    featured: [],
  },
];

export const skillsFootnote =
  "● = daily drivers. Beyond the stack: leading teams, communicating clearly, and shipping through ambiguity.";

export const achievements = [
  {
    rank: "Top 20",
    context: "of 260 teams · 60 universities",
    event: "MIT mujX HackX",
    desc: "Led technical development of a data-driven system to minimize Amazon product returns through user-behavior analysis and intelligent decision-making.",
  },
  {
    rank: "Top 5",
    context: "finals · 600+ teams across India",
    event: "SPIT Hackathon",
    desc: "Selected into the top 150 of 600+ teams nationwide, then into the final five — drove system design and performance for a real-time collaborative code editor.",
  },
  {
    rank: "Finalist",
    context: "Smart India Hackathon 2024",
    event: "SIH 2024",
    desc: "Cleared every internal evaluation round against thousands of student innovators nationwide to reach the national finals.",
  },
];

export const education = {
  school: "VIT Bhopal University",
  degree: "B.Tech, Computer Science & Engineering",
  period: "2023 — 2027 (expected)",
  note: "Currently in final year.",
};

export const outro = {
  heading: ["Let's", "talk", "."],
  blurb:
    "Have a role, a project, or just want to nerd out about systems? My inbox is open — I usually reply within a day.",
};
