export const site = {
  name: "asrormakhmudov",
  /** The full name overflows the 325px mobile navbar (Figma 595:1491). */
  shortName: "asror",
  role: "Front-End Software Engineer",
  location: "Tashkent, Uzbekistan",
  copyright: "asrormakhmudov © 2026",
  email: "makhmudovasrorjon@gmail.com",
} as const;

export const navLinks = [
  { label: "education", href: "/education" },
  { label: "experience", href: "/experience" },
] as const;

/**
 * Order follows the desktop navbar in Figma (node 570:466).
 * The mobile navbar (595:1491) shows only the `compact` entries.
 *
 * Icons are Iconify names, matching how the icon layers are named in the
 * Figma file — no export step, no expiring URLs.
 *
 * TODO: replace the two placeholder profile URLs below.
 */
export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/AsrorjonMakhmudow",
    icon: "mdi:github",
    compact: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/asrorjon-makhmudov-0a017a230",
    icon: "mdi:linkedin",
    compact: true,
  },
  {
    label: "Telegram",
    href: "https://t.me/makhmudovsLife",
    icon: "mdi:telegram",
    compact: false,
  },
  {
    label: "Email",
    href: "mailto:makhmudovasrorjon@gmail.com",
    icon: "mdi:email-outline",
    compact: true,
  },
] as const;
