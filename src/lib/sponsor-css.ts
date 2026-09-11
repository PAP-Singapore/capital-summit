import type { CSSProperties } from "react";

// `customCss` is authored per sponsor in the CMS and arrives as either Tailwind
// classes ("h-8 md:h-10") or CSS declarations ("height: 40px; mix-blend-mode: multiply"),
// sometimes both. Declarations are applied as an inline style, because Tailwind only
// compiles the classes it can see in the source at build time; classes are merged over
// the tier default and have to be safelisted (see @source inline in index.css).
const isCssDeclaration = (property: string, value: string) => {
  if (property.startsWith("--")) return true;
  if (typeof CSS !== "undefined" && typeof CSS.supports === "function")
    return CSS.supports(property, value);
  // No CSS.supports to ask: a Tailwind variant ("md:h-10") never has a space or
  // parenthesis on the right of the colon, a declaration value usually does.
  return /[\s(]/.test(value);
};

const toCamelCase = (property: string) =>
  property.startsWith("--")
    ? property
    : property.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());

export function parseCustomCss(customCss?: string): {
  classes: string;
  style?: CSSProperties;
} {
  const trimmed = customCss?.trim();
  if (!trimmed) return { classes: "" };

  const classes: string[] = [];
  const style: Record<string, string> = {};

  for (const segment of trimmed.split(";")) {
    const chunk = segment.trim();
    if (!chunk) continue;

    const colon = chunk.indexOf(":");
    const property = colon === -1 ? "" : chunk.slice(0, colon).trim();
    // React strips !important from inline styles anyway, and nothing here needs it
    const value =
      colon === -1
        ? ""
        : chunk
            .slice(colon + 1)
            .replace(/!\s*important\s*$/i, "")
            .trim();

    if (property && value && isCssDeclaration(property, value)) {
      style[toCamelCase(property)] = value;
    } else {
      classes.push(chunk);
    }
  }

  return {
    classes: classes.join(" "),
    style: Object.keys(style).length ? (style as CSSProperties) : undefined,
  };
}

const SIZING_CLASS = /(^|\s)(sm:|md:|lg:|xl:)?(w|h|max-w|max-h|min-w|min-h|size)-/;
const SIZING_STYLE = [
  "width",
  "height",
  "maxWidth",
  "maxHeight",
  "minWidth",
  "minHeight",
] as const;

/**
 * Whether the CMS authored its own size. The tier defaults pin a width AND a
 * height ("w-[183px] h-[51px] …"), so merging a custom height over them leaves
 * the logo letterboxed inside the tier's fixed width instead of scaling with it
 * — and the tier's `sm:`/`md:` sizes survive a custom class at another
 * breakpoint. A sponsor that sizes itself drops the tier default entirely.
 */
export function hasCustomSize(
  classes: string,
  style?: CSSProperties,
): boolean {
  if (SIZING_CLASS.test(classes)) return true;
  return !!style && SIZING_STYLE.some((property) => style[property] != null);
}
