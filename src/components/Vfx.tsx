import { css } from "@/lib/css";

const reels = [
  { reveal: 1, src: "/vfx-particles.mp4", label: "VFX · PARTICLES" },
  { reveal: 2, src: "/voidguard-showcase.mp4", label: "VFX · SIMULATION" },
];

export default function Vfx() {
  return (
    <section
      id="vfx"
      data-screen-label="VFX"
      style={css(
        "position:relative; overflow:hidden; max-width:1180px; margin:0 auto; padding:110px 24px 44px; scroll-margin-top:90px;"
      )}
    >
      <div
        data-motion
        aria-hidden="true"
        style={css(
          "position:absolute; inset:0; z-index:0; background-image:linear-gradient(rgba(71,142,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(71,142,255,.07) 1px, transparent 1px); background-size:40px 40px; animation:gridDrift 13s linear infinite; -webkit-mask-image:linear-gradient(to bottom, transparent, #000 14%, #000 80%, transparent); mask-image:linear-gradient(to bottom, transparent, #000 14%, #000 80%, transparent); pointer-events:none;"
        )}
      />
      <div style={css("position:relative; z-index:1;")}>
        <div
          data-reveal="0"
          style={css(
            "margin-bottom:36px; opacity:0; transform:translateY(30px); transition:opacity .45s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1);"
          )}
        >
          <div style={css("font-family:'Inter',sans-serif; font-size:14px; letter-spacing:0.14em; color:var(--accent); margin-bottom:14px;")}>
            MOTION &amp; VFX
          </div>
          <h2 style={css("margin:0; max-width:760px; font-size:clamp(32px,4.6vw,50px); line-height:1.05; letter-spacing:-0.05em; font-weight:500; color:#000;")}>
            Frames that{" "}
            <span style={css("font-family:'Instrument Serif',Georgia,serif; font-style:italic; font-weight:400; color:var(--accent);")}>
              move you.
            </span>
          </h2>
          <p style={css("margin:16px 0 0; max-width:520px; font-size:17px; line-height:1.5; color:#6b6b6b;")}>
            Particle, simulation and compositing experiments — product reels and motion graphics designed and animated in After Effects.
          </p>
        </div>
        <div style={css("display:grid; grid-template-columns:repeat(2,1fr); gap:18px;")}>
          {reels.map((r) => (
            <div
              key={r.reveal}
              data-reveal={r.reveal}
              style={css(
                "position:relative; aspect-ratio:16/9; border-radius:24px; overflow:hidden; background:#fff; opacity:0; transform:translateY(30px); transition:opacity .45s cubic-bezier(.22,1,.36,1), transform .45s cubic-bezier(.22,1,.36,1), box-shadow .3s; box-shadow:0 16px 40px -24px rgba(0,0,0,.5);"
              )}
              data-hover="transform:translateY(-6px); box-shadow:0 30px 60px -28px rgba(0,0,0,.6)"
            >
              <video
                src={r.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={css("position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;")}
              />
              <div
                style={css(
                  "position:absolute; bottom:14px; left:14px; font-family:'Inter',sans-serif; font-size:11px; letter-spacing:0.1em; color:#fff; background:rgba(0,0,0,.42); -webkit-backdrop-filter:blur(4px); backdrop-filter:blur(4px); padding:5px 10px; border-radius:50px;"
                )}
              >
                {r.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
