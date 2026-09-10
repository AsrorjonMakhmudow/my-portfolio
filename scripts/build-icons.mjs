import { getIconData } from "@iconify/utils";
import fs from "node:fs";

const used = {
  logos: [
    "react", "typescript-icon", "figma", "angular-icon", "javascript",
    "redux", "jest", "testing-library", "material-ui", "tailwindcss-icon", "bootstrap",
  ],
  mdi: [
    "file-sign", "face-recognition", "api", "shield-account",
    "github", "linkedin", "telegram", "email-outline", "teddy-bear",
    // carousel controls
    "chevron-left", "chevron-right",
  ],
  "simple-icons": ["nextdotjs", "mantine", "antdesign"],
  "vscode-icons": ["file-type-vite"],
};

const out = {};
let n = 0;
for (const [prefix, names] of Object.entries(used)) {
  const col = JSON.parse(
    fs.readFileSync(`node_modules/@iconify-json/${prefix}/icons.json`, "utf8"),
  );
  for (const name of names) {
    const d = getIconData(col, name);
    if (!d) {
      console.error("MISSING", prefix + ":" + name);
      process.exit(1);
    }
    out[`${prefix}:${name}`] = {
      body: d.body,
      width: d.width ?? col.width ?? 24,
      height: d.height ?? col.height ?? 24,
    };
    n++;
  }
}

const header = `/**
 * Bundled Iconify icon data — generated, do not edit by hand.
 *
 * Only the icons this site actually uses, inlined so the page makes no runtime
 * request to Iconify's CDN. Names match the icon layer names in the Figma file.
 * Regenerate with scripts/build-icons.mjs after adding an icon.
 */
import type { IconifyIcon } from "@iconify/react";

export const icons: Record<string, IconifyIcon> = `;

fs.writeFileSync("/tmp/claude-0/icon-data.ts", header + JSON.stringify(out, null, 2) + ";\n");
console.log("icons:", n, "bytes:", fs.statSync("/tmp/claude-0/icon-data.ts").size);
