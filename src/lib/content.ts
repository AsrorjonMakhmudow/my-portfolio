/**
 * Structural, non-translatable data.
 *
 * All prose lives in `messages/{en,ru,uz}.json` and is reached through
 * next-intl. What stays here is the material that is the same in every
 * language — company names, URLs, ISO dates, icon names, technology names —
 * keyed by an id the message files use to attach their translations.
 *
 * Dates are ISO so they can be formatted per locale rather than translated:
 * "2026-05" becomes "May 2026" / "май 2026" / "2026-yil may".
 */

/* ------------------------------------------------------------------ *
 * Hero — node 609:29
 * ------------------------------------------------------------------ */

export const heroLinks = {
  cv: "/asrorjon-makhmudov-cv.pdf",
  experience: "/experience",
} as const;

/* ------------------------------------------------------------------ *
 * Word stack — node 571:54
 * ------------------------------------------------------------------ */

/** Technology names, so they read the same in every language. */
export const words = ["Javascript", "Typescript", "React"] as const;

/* ------------------------------------------------------------------ *
 * Tech carousel — node 571:459
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
 * ------------------------------------------------------------------ */

export type TechItem = { label: string; icon: string };
/** `id` keys into `tech.cards.*` in the message files. */
export type TechCard = { id: string; items: readonly TechItem[] };

export const techCards: readonly TechCard[] = [
  {
    id: "frontend",
    items: [
      { label: "React", icon: "logos:react" },
      { label: "Next.js", icon: "simple-icons:nextdotjs" },
      { label: "Vite", icon: "vscode-icons:file-type-vite" },
      { label: "Angular", icon: "logos:angular-icon" },
      { label: "Figma", icon: "logos:figma" },
    ],
  },
  {
    id: "languages",
    items: [
      { label: "JavaScript", icon: "logos:javascript" },
      { label: "TypeScript", icon: "logos:typescript-icon" },
    ],
  },
  {
    id: "state",
    items: [
      { label: "Zustand", icon: "mdi:teddy-bear" },
      { label: "Redux Toolkit", icon: "logos:redux" },
      { label: "Jest", icon: "logos:jest" },
      { label: "React Testing Library", icon: "logos:testing-library" },
    ],
  },
  {
    id: "ui",
    items: [
      { label: "Mantine", icon: "simple-icons:mantine" },
      { label: "Ant Design", icon: "simple-icons:antdesign" },
      { label: "Material UI", icon: "logos:material-ui" },
      { label: "TailwindCSS", icon: "logos:tailwindcss-icon" },
      { label: "Bootstrap", icon: "logos:bootstrap" },
    ],
  },
  {
    id: "fintech",
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
  /** Keys into `experience.roles.*` in the message files. */
  id: string;
  company: string;
  companyUrl?: string;
  type: "fullTime" | "contract";
  /** ISO year-month; `end: null` means the role is current. */
  start: string;
  end: string | null;
};

export const experience: readonly Role[] = [
  {
    id: "linear",
    company: "Linear Technology Solutions",
    companyUrl: "https://lineartechsol.com",
    type: "fullTime",
    start: "2026-05",
    end: null,
  },
  {
    id: "anorbank",
    company: "Anorbank",
    companyUrl: "https://anorbank.uz",
    type: "fullTime",
    start: "2022-02",
    end: "2026-05",
  },
  {
    id: "sectorsoft",
    company: "Sector Soft",
    type: "contract",
    start: "2021-01",
    end: "2022-02",
  },
  {
    id: "simplex",
    company: "Simplex ITC",
    companyUrl: "https://simplex.uz",
    type: "fullTime",
    start: "2019-02",
    end: "2020-01",
  },
] as const;

/* ------------------------------------------------------------------ *
 * Education — node 571:1030
 * ------------------------------------------------------------------ */

export type Study = {
  /** Keys into `education.studies.*` in the message files. */
  id: string;
  start: string;
  end: string;
  certificateUrl?: string;
};

export const education: readonly Study[] = [
  { id: "nuuz", start: "2017", end: "2021" },
] as const;

/** Keys into `education.languages.*`. Ordered by proficiency. */
export const languageIds = ["uz", "ru", "en"] as const;
