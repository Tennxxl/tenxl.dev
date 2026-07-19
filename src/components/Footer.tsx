import { css } from "@/lib/css";

const socials = ["YouTube", "Discord", "Instagram", "X"];

export default function Footer() {
  return (
    <footer
      style={css(
        "max-width:1180px; margin:60px auto 0; padding:40px 24px; border-top:1px solid #e6e6e6; display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap;"
      )}
    >
      <div
        style={css(
          "display:flex; align-items:center; gap:9px; font-size:18px; font-weight:600; letter-spacing:-0.02em;"
        )}
      >
        <span style={css("color:var(--accent);")}>✦</span> Tenxl
      </div>
      <div
        style={css(
          "display:flex; gap:26px; font-family:'Inter',sans-serif; font-size:14px; color:#6e6e6e;"
        )}
      >
        {socials.map((s) => (
          <a key={s} href="#work" style={css("transition:color .2s;")} data-hover="color:var(--accent)">
            {s}
          </a>
        ))}
      </div>
      <div style={css("font-family:'Inter',sans-serif; font-size:14px; color:#6e6e6e;")}>
        © 2026 — Built by Tenxl <span style={css("color:var(--accent);")}>✦</span>
      </div>
    </footer>
  );
}
