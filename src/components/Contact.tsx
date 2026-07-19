import { css } from "@/lib/css";

export default function Contact() {
  return (
    <section
      id="contact"
      data-screen-label="Contact"
      style={css(
        "position:relative; max-width:1180px; margin:0 auto; padding:110px 24px 0; scroll-margin-top:90px;"
      )}
    >
      <div
        data-reveal="0"
        style={css(
          "position:relative; z-index:1; background:#1c1c1c; border-radius:36px; padding:clamp(48px,7vw,96px) 24px; text-align:center; opacity:0; transform:translateY(30px); transition:opacity .5s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);"
        )}
      >
        <h2
          style={css(
            "margin:0 auto; max-width:760px; font-size:clamp(34px,5.4vw,58px); line-height:1.04; letter-spacing:-0.045em; font-weight:500; color:#fff;"
          )}
        >
          Got something that needs to{" "}
          <span
            style={css(
              "font-family:'Instrument Serif',Georgia,serif; font-style:italic; font-weight:400; color:var(--accent);"
            )}
          >
            move?
          </span>
        </h2>
        <p
          style={css(
            "margin:22px auto 0; max-width:480px; font-size:18px; line-height:1.5; letter-spacing:-0.01em; color:rgba(255,255,255,.6);"
          )}
        >
          Booking select projects for Q3 2026. Tell me what you’re building and let’s
          make it unforgettable.
        </p>
        <div
          style={css(
            "display:flex; align-items:center; justify-content:center; gap:18px; flex-wrap:wrap; margin-top:36px;"
          )}
        >
          <a
            href="mailto:tenxl@pm.me"
            style={css(
              "display:inline-flex; align-items:center; gap:10px; background:var(--accent); color:#fff; padding:16px 30px; border-radius:50px; font-size:16px; font-weight:500; letter-spacing:0.03em; box-shadow:0 12px 30px rgba(71,142,255,.36); transition:transform .25s, box-shadow .25s, background .25s;"
            )}
            data-hover="transform:translateY(-2px); box-shadow:0 18px 40px rgba(71,142,255,.5); background:#2f7be8"
          >
            Start a project ↗
          </a>
          <a
            href="mailto:tenxl@pm.me"
            style={css(
              "font-size:17px; font-weight:500; color:#fff; border-bottom:1px solid rgba(255,255,255,.3); padding-bottom:3px; transition:border-color .2s;"
            )}
            data-hover="border-color:var(--accent)"
          >
            tenxl@pm.me
          </a>
        </div>
      </div>
    </section>
  );
}
