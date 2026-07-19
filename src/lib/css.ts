import type { CSSProperties } from "react";

/**
 * Parse a CSS declaration string into a React style object. Custom
 * properties (e.g. --accent) are preserved as-is; everything else is
 * camelCased (`background-image` -> `backgroundImage`, `-webkit-mask-image`
 * -> `WebkitMaskImage`).
 *
 * Declarations are split on `;` and key/value on the first `:` — safe here
 * because none of the design's values contain those characters.
 */
export function css(text: string): CSSProperties {
  const style: Record<string, string> = {};
  for (const decl of text.split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith("--")
      ? prop
      : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    style[key] = value;
  }
  return style as unknown as CSSProperties;
}
