import type { Metadata } from "next";
import { Nunito, Raleway } from "next/font/google";
import "./globals.css";

/*
 * The Assets page documents Raleway as the type system, and it carries every
 * heading and body string. The buttons are the one exception — they are set in
 * Nunito in the design (nodes 571:522, 571:527), so both families are loaded.
 * Weights are limited to the ones actually used: Light 300, Medium 500, Bold 700.
 */
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-raleway",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asrorjon Makhmudov — Front-End Software Engineer",
  description:
    "Front-End Software Engineer with six years building banking and fintech interfaces in React and TypeScript. Based in Tashkent, Uzbekistan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${raleway.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
