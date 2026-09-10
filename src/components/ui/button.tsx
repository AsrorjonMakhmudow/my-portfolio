import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Two variants exist in the design (nodes 571:521 and 571:526).
 * Both share: Nunito 16px, 40px horizontal / 12px vertical padding,
 * fully rounded. They differ only in fill and label colour.
 */
type Variant = "solid" | "ghost";

const base =
  "inline-flex items-center justify-center rounded-full font-ui text-[16px] leading-none " +
  "px-[40px] py-[12px] whitespace-nowrap transition-colors duration-200";

const variants: Record<Variant, string> = {
  solid: "bg-white font-bold text-ink-950 hover:bg-ink-200",
  ghost: "font-medium text-accent hover:text-white",
};

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "solid", className = "", ...props }: ButtonLinkProps) {
  return <Link {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "solid", className = "", ...props }: ButtonProps) {
  return <button {...props} className={`${base} ${variants[variant]} ${className}`} />;
}
