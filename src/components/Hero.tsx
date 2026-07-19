import { css } from "@/lib/css";

const orbs = [
  { emoji: "🎬", top: 120, side: "right" as const, offset: "6%", size: 84, icon: 46, rot: -8, delay: 0 },
  { emoji: "✨", top: 300, side: "right" as const, offset: "18%", size: 64, icon: 34, rot: 10, delay: 0.8 },
  { emoji: "🎨", top: 60, side: "left" as const, offset: "2%", size: 58, icon: 32, rot: 7, delay: 0.3 },
];

const trustLogos = ["/logo-hd.png", "/logo-christmas.png", "/logo-personal.png"];

export default function Hero() {
  return (
    <section
      id="top"
      data-screen-label="Hero"
      style={css(
        "position:relative; overflow:hidden; max-width:1180px; margin:0 auto; padding:150px 24px 34px; scroll-margin-top:90px;"
      )}
    >
      <div
        data-motion
        aria-hidden="true"
        style={css(
          "position:absolute; inset:0; z-index:0; background-image:linear-gradient(rgba(71,142,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(71,142,255,.05) 1px, transparent 1px); background-size:46px 46px; animation:gridDrift 16s linear infinite; -webkit-mask-image:radial-gradient(135% 100% at 18% 18%, #000 0%, transparent 70%); mask-image:radial-gradient(135% 100% at 18% 18%, #000 0%, transparent 70%); pointer-events:none;"
        )}
      />

      {orbs.map((o) => (
        <div
          key={o.emoji}
          data-motion
          aria-hidden="true"
          style={css(
            `position:absolute; top:${o.top}px; ${o.side}:${o.offset}; z-index:0; width:${o.size}px; height:${o.size}px; border-radius:26px; background:rgba(255,255,255,.7); -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px); border:1px solid rgba(0,0,0,.05); box-shadow:0 22px 44px -22px rgba(0,0,0,.3); display:flex; align-items:center; justify-content:center; transform:rotate(${o.rot}deg); animation:floatY ${6 + o.delay}s ease-in-out infinite ${o.delay}s;`
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://emojicdn.elk.sh/${encodeURIComponent(o.emoji)}?style=apple`}
            alt=""
            style={css(`width:${o.icon}px; height:${o.icon}px; display:block;`)}
          />
        </div>
      ))}

      <div id="hero-inner" style={css("position:relative; z-index:1; will-change:transform; max-width:980px;")}>
        <div
          data-reveal="1"
          style={css(
            "display:inline-flex; align-items:center; gap:10px; background:#fff; color:#1c1c1c; padding:8px 8px 8px 16px; border-radius:50px; font-size:14.5px; font-weight:500; letter-spacing:-0.01em; border:1px solid #ececec; box-shadow:0 10px 30px -18px rgba(0,0,0,.4); opacity:0; transform:translateY(26px); transition:opacity .5s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);"
          )}
        >
          <span style={css("position:relative; display:inline-flex; align-items:center; justify-content:center; width:16px; height:16px;")}>
            <span
              data-motion
              style={css(
                "position:absolute; inset:1px; border-radius:50%; background:#22c55e; animation:pulsering 2.2s ease-out infinite;"
              )}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://emojicdn.elk.sh/${encodeURIComponent("🟢")}?style=apple`}
              alt=""
              style={css("position:relative; width:15px; height:15px; display:block;")}
            />
          </span>
          Available for Q3 2026
          <span
            style={css(
              "display:inline-flex; align-items:center; gap:6px; background:#f4f4f4; color:#6b6b6b; padding:5px 12px; border-radius:50px; font-size:13px;"
            )}
          >
            Brooklyn, NY{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://emojicdn.elk.sh/${encodeURIComponent("🗽")}?style=apple`}
              alt=""
              style={css("width:15px; height:15px; display:inline-block; vertical-align:-2px;")}
            />
          </span>
        </div>

        <div
          data-reveal="2"
          style={css(
            "position:relative; display:block; width:clamp(300px,54vw,660px); margin:18px 0 0; opacity:0; transform:translateY(26px); transition:opacity .5s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/tenxl-wordmark.png" alt="Tenxl" style={css("display:block; width:100%; height:auto;")} />
          <div
            data-motion
            aria-hidden="true"
            style={css(
              "position:absolute; inset:0; pointer-events:none; background:linear-gradient(115deg, transparent 40%, rgba(255,255,255,.9) 50%, transparent 60%); background-size:280% 100%; background-repeat:no-repeat; -webkit-mask:url('/tenxl-wordmark.png') left top/100% 100% no-repeat; mask:url('/tenxl-wordmark.png') left top/100% 100% no-repeat; animation:shine 4s ease-in-out infinite;"
            )}
          />
        </div>

        <div
          data-reveal="2"
          style={css(
            "margin:22px 0 0; max-width:18ch; font-size:clamp(24px,3.4vw,40px); line-height:1.06; letter-spacing:-0.035em; font-weight:500; color:#1c1c1c; opacity:0; transform:translateY(26px); transition:opacity .5s cubic-bezier(.22,1,.36,1) .06s, transform .55s cubic-bezier(.22,1,.36,1) .06s;"
          )}
        >
          Motion that&apos;s{" "}
          <span
            style={css(
              "font-family:'Instrument Serif',Georgia,serif; font-style:italic; font-weight:400; color:var(--accent); letter-spacing:-0.01em;"
            )}
          >
            impossible
          </span>{" "}
          to ignore.
        </div>

        <div
          style={css(
            "display:flex; align-items:flex-end; justify-content:space-between; gap:40px; flex-wrap:wrap; margin-top:40px;"
          )}
        >
          <div style={css("max-width:480px;")}>
            <a
              href="#work"
              data-reveal="4"
              style={css(
                "display:inline-flex; align-items:center; gap:16px; opacity:0; transform:translateY(26px); transition:opacity .5s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);"
              )}
            >
              <span
                style={css(
                  "position:relative; width:30px; height:48px; border:2px solid #d2d2d2; border-radius:16px; flex:none; transition:border-color .25s;"
                )}
                data-hover="border-color:var(--accent)"
              >
                <span
                  data-motion
                  aria-hidden="true"
                  style={css(
                    "position:absolute; left:50%; top:9px; width:5px; height:5px; margin-left:-2.5px; border-radius:50%; background:var(--accent); animation:scrollDot 1.8s cubic-bezier(.4,0,.2,1) infinite;"
                  )}
                />
              </span>
              <span style={css("display:flex; flex-direction:column; line-height:1.25;")}>
                <span style={css("font-size:16px; font-weight:500; color:#1c1c1c; letter-spacing:-0.01em;")}>
                  Scroll to explore
                </span>
                <span style={css("font-family:'Inter',sans-serif; font-size:13px; color:#9a9a9a;")}>
                  Selected work below
                </span>
              </span>
              <span
                data-motion
                aria-hidden="true"
                style={css("font-size:18px; color:var(--accent); animation:chevDrop 1.8s ease-in-out infinite;")}
              >
                ↓
              </span>
            </a>
          </div>
          <div
            data-reveal="5"
            style={css(
              "display:flex; align-items:center; gap:22px; opacity:0; transform:translateY(26px); transition:opacity .5s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);"
            )}
          >
            <div style={css("display:flex; align-items:center;")}>
              {trustLogos.map((src, i) => (
                <span
                  key={src}
                  style={css(
                    `width:38px; height:38px; border-radius:50%; overflow:hidden; background:#1c1c1c; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,.12); position:relative; z-index:1; transition:transform .28s cubic-bezier(.34,1.45,.5,1), box-shadow .28s, z-index 0s;${i > 0 ? " margin-left:-12px;" : ""}`
                  )}
                  data-hover="transform:translateY(-7px) scale(1.12); z-index:5; box-shadow:0 12px 22px -8px rgba(0,0,0,.4)"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" style={css("width:100%; height:100%; object-fit:cover; display:block;")} />
                </span>
              ))}
              <span
                style={css(
                  "width:38px; height:38px; border-radius:50%; background:var(--accent); color:#fff; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,.12); margin-left:-12px; position:relative; z-index:1; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:600; transition:transform .28s cubic-bezier(.34,1.45,.5,1), box-shadow .28s, z-index 0s;"
                )}
                data-hover="transform:translateY(-7px) scale(1.12); z-index:5; box-shadow:0 12px 22px -8px rgba(71,142,255,.5)"
              >
                60+
              </span>
            </div>
            <div style={css("line-height:1.3;")}>
              <div style={css("font-size:15px; font-weight:600; color:#1c1c1c; letter-spacing:-0.01em;")}>
                Trusted by communities
              </div>
              <div style={css("font-family:'Inter',sans-serif; font-size:13px; color:#9a9a9a;")}>
                &amp; creators worldwide
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
