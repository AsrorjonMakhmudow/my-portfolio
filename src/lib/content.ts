/**
 * All page copy lives here.
 *
 * Sourced from Asrorjon Makhmudov's CV (hh.uz export, updated 9 Sep 2026).
 * The Figma file ships Lorem Ipsum in the experience and education frames
 * (571:531, 571:1030), so those cards are driven by this typed data and
 * rendered once, rather than the three hardcoded copies the design shows.
 */

/* ------------------------------------------------------------------ *
 * Hero — node 609:29
 * ------------------------------------------------------------------ */

export const hero = {
  /** 570:550. Design uses first name only. */
  heading: "Hi, I’m Asrorjon",
  /** 570:551. Bolded fragments are emphasised white against ink-500 body. */
  intro: {
    lead: "Six years",
    role: "Front-End Software Engineer",
    body:
      "most of them in banking and fintech. My work goes beyond writing components — " +
      "turning dense financial workflows into clear, step-by-step interfaces and " +
      "defining features alongside product, design and back-end teams.",
  },
  ctaPrimary: { label: "Download CV", href: "/asrorjon-makhmudov-cv.pdf" },
  ctaSecondary: { label: "See experiences", href: "/experience" },
} as const;

/* ------------------------------------------------------------------ *
 * Stats band — nodes 571:4, 571:5, 571:6
 * ------------------------------------------------------------------ */

export const stats = {
  years: "6 years of",
  badge: "XP",
  caption: "building banking and fintech interfaces with the modern React ecosystem",
} as const;

/* ------------------------------------------------------------------ *
 * Tech carousel — node 571:459
 *
 * Figma draws four cards. This carries the five from the "Front-end
 * Engineering" card in the grid below, plus TypeScript — so nothing in that
 * card is missing here.
 * ------------------------------------------------------------------ */

export const carousel = [
  { label: "React", icon: "logos:react" },
  { label: "Next.js", icon: "simple-icons:nextdotjs" },
  { label: "TypeScript", icon: "logos:typescript-icon" },
  { label: "Vite", icon: "vscode-icons:file-type-vite" },
  { label: "Angular", icon: "logos:angular-icon" },
  { label: "Figma", icon: "logos:figma" },
] as const;

/* ------------------------------------------------------------------ *
 * Tech stack grid — node 571:530
 *
 * The design's original cards (React Native + app-store publications,
 * a Node/Prisma back-end card, a Docker/Nginx/GitHub Actions DevOps card)
 * describe tech that is not on the CV. Replaced with the real stack.
 * ------------------------------------------------------------------ */

export type TechItem = { label: string; icon: string };
export type TechCard = { title: string; items: readonly TechItem[] };

export const techHeading = "These are the technologies I’ve been using";

export const techCards: readonly TechCard[] = [
  {
    title: "Front-end Engineering",
    items: [
      { label: "React", icon: "logos:react" },
      { label: "Next.js", icon: "simple-icons:nextdotjs" },
      { label: "Vite", icon: "vscode-icons:file-type-vite" },
      { label: "Angular", icon: "logos:angular-icon" },
      { label: "Figma", icon: "logos:figma" },
    ],
  },
  {
    title: "Languages",
    items: [
      { label: "JavaScript", icon: "logos:javascript" },
      { label: "TypeScript", icon: "logos:typescript-icon" },
    ],
  },
  {
    title: "State & Testing",
    items: [
      { label: "Zustand", icon: "mdi:teddy-bear" },
      { label: "Redux Toolkit", icon: "logos:redux" },
      { label: "Jest", icon: "logos:jest" },
      { label: "React Testing Library", icon: "logos:testing-library" },
    ],
  },
  {
    title: "UI Libraries",
    items: [
      { label: "Mantine", icon: "simple-icons:mantine" },
      { label: "Ant Design", icon: "simple-icons:antdesign" },
      { label: "Material UI", icon: "logos:material-ui" },
      { label: "TailwindCSS", icon: "logos:tailwindcss-icon" },
      { label: "Bootstrap", icon: "logos:bootstrap" },
    ],
  },
  {
    title: "Fintech & Security",
    items: [
      { label: "E-IMZO", icon: "mdi:file-sign" },
      { label: "MyID", icon: "mdi:face-recognition" },
      { label: "REST API", icon: "mdi:api" },
      { label: "Role-based access", icon: "mdi:shield-account" },
    ],
  },
] as const;

/* ------------------------------------------------------------------ *
 * Experience — node 571:531
 * ------------------------------------------------------------------ */

export type Role = {
  company: string;
  companyUrl?: string;
  title: string;
  type: "Full-time" | "Contract";
  start: string;
  end: string;
  location: string;
  body: readonly string[];
};

export const experienceIntro =
  "< Here you can get to know me a little more and see my full experience as a Front-End Software Engineer. />";

export const experience: readonly Role[] = [
  {
    company: "Linear Technology Solutions",
    companyUrl: "https://lineartechsol.com",
    title: "Software Engineer",
    type: "Full-time",
    start: "May 2026",
    end: "Present",
    location: "Tashkent, Uzbekistan",
    body: [
      "Building the front end of a lending platform — multi-step application forms that tie together client and company data, guarantors, collateral, terms and product configuration, turning dense financial workflows into interfaces people can actually move through.",
      "Implemented secure authentication and identity verification with E-IMZO digital signatures and MyID biometrics to meet financial-sector compliance standards. Built the application shell — collapsible sidebar, role-based navigation, responsive layout — plus data-heavy monitoring dashboards and tables designed around readability and numeric alignment.",
    ],
  },
  {
    company: "Anorbank",
    companyUrl: "https://anorbank.uz",
    title: "Front-End Developer",
    type: "Full-time",
    start: "Feb 2022",
    end: "May 2026",
    location: "Tashkent, Uzbekistan",
    body: [
      "Developed and maintained internal web applications and admin panels used daily by bank staff, working primarily in React and TypeScript with Vite, and in Angular where the project called for it.",
      "Integrated REST APIs, built complex reusable UI components and covered them with unit tests in Jest. Moved state management from Redux Toolkit to Zustand, and worked across Mantine, Ant Design and Material UI. Took part in code review, refactoring and architecture decisions, with a standing focus on authorization and security in banking applications.",
    ],
  },
  {
    company: "Sector Soft",
    title: "Front-End Developer",
    type: "Contract",
    start: "Jan 2021",
    end: "Feb 2022",
    location: "Tashkent, Uzbekistan — remote and on-site",
    body: [
      "Contract work spanning the full software development lifecycle: shaping the solution concept for each assigned task, then building, debugging and troubleshooting the result.",
      "Tested existing components for functionality and fault tolerance, corrected software based on test and debug analysis, and handled ongoing maintenance and updates to keep delivery running against agreed performance targets.",
    ],
  },
  {
    company: "Simplex ITC",
    companyUrl: "https://simplex.uz",
    title: "Front-End Developer",
    type: "Full-time",
    start: "Feb 2019",
    end: "Jan 2020",
    location: "Tashkent, Uzbekistan",
    body: [
      "Built responsive layouts for websites, admin panels and applications across e-commerce, finance, healthcare and corporate projects, optimised for a wide range of devices.",
      "Developed reusable UI components with Ant Design, Bootstrap and TailwindCSS to standardise design elements across projects, worked from Figma, Adobe XD and Sketch files, and collaborated closely with back-end developers on API and data-model integration.",
    ],
  },
] as const;

/* ------------------------------------------------------------------ *
 * Education — node 571:1030
 * ------------------------------------------------------------------ */

export type Study = {
  institution: string;
  qualification: string;
  start: string;
  end: string;
  certificateUrl?: string;
};

export const education: readonly Study[] = [
  {
    institution: "National University of Uzbekistan",
    qualification: "Bachelor — Information Technology, Cyber Security",
    start: "2017",
    end: "2021",
  },
] as const;

/* ------------------------------------------------------------------ *
 * Languages — not a design slot, but real CV data worth surfacing
 * ------------------------------------------------------------------ */

export const languages = [
  { name: "Uzbek", level: "Native" },
  { name: "Russian", level: "B2 — Upper Intermediate" },
  { name: "English", level: "B1 — Intermediate" },
] as const;
