import { css } from "@/lib/css";

const services = ["VFX & GFX Design", "Discord Bots", "Web Development", "Travel Films"];

export default function About() {
  return (
    <section
      id="about"
      data-screen-label="About"
      style={css(
        "position:relative; overflow:hidden; max-width:1180px; margin:0 auto; padding:110px 24px 0; scroll-margin-top:90px;"
      )}
    >
      <div
        data-motion
        aria-hidden="true"
        style={css(
          "position:absolute; inset:0; z-index:0; background-image:linear-gradient(rgba(71,142,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(71,142,255,.05) 1px, transparent 1px); background-size:44px 44px; animation:gridDrift 15s linear infinite; -webkit-mask-image:linear-gradient(to bottom, transparent, #000 12%, #000 86%, transparent); mask-image:linear-gradient(to bottom, transparent, #000 12%, #000 86%, transparent); pointer-events:none;"
        )}
      />
      <div style={css("position:relative; z-index:1;")}>
        <div
          data-reveal="0"
          style={css(
            "font-family:'Inter',sans-serif; font-size:14px; letter-spacing:0.14em; color:var(--accent); margin-bottom:30px; opacity:0; transform:translateY(20px); transition:opacity .45s cubic-bezier(.22,1,.36,1), transform .45s cubic-bezier(.22,1,.36,1);"
          )}
        >
          ABOUT A LITTLE SHOWCASE
        </div>
        <div style={css("display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:56px; align-items:start;")}>
          <div
            data-reveal="1"
            style={css(
              "position:relative; opacity:0; transform:translateY(30px); transition:opacity .45s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1);"
            )}
          >
            <div style={css("position:relative; z-index:1; width:100%; aspect-ratio:4/5; border-radius:36px; overflow:hidden; background:#141414;")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about-photo-nyc.jpg"
                alt="Tenxl above Manhattan at night"
                loading="lazy"
                style={css("position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;")}
              />
              <div
                style={css(
                  "position:absolute; left:18px; bottom:16px; display:inline-flex; align-items:center; gap:8px; padding:7px 13px 7px 10px; border-radius:50px; background:rgba(20,20,20,.42); -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,.14); font-family:'Inter',sans-serif; font-size:12.5px; font-weight:500; color:#fff;"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://emojicdn.elk.sh/${encodeURIComponent("🗽")}?style=apple`} alt="" style={css("width:16px; height:16px; display:block;")} />{" "}
                NYC, Manhattan
              </div>
              <div style={css("position:absolute; right:20px; bottom:18px; width:10px; height:10px; border-radius:50%; background:var(--accent);")} />
            </div>
          </div>
          <div
            data-reveal="2"
            style={css(
              "opacity:0; transform:translateY(30px); transition:opacity .45s cubic-bezier(.22,1,.36,1) .08s, transform .5s cubic-bezier(.22,1,.36,1) .08s;"
            )}
          >
            <p style={css("margin:0; font-size:clamp(24px,3.2vw,34px); line-height:1.22; letter-spacing:-0.03em; font-weight:500; color:#1c1c1c;")}>
              Six years turning ideas into{" "}
              <span style={css("font-family:'Instrument Serif',Georgia,serif; font-style:italic; font-weight:400; color:var(--accent);")}>
                things that ship.
              </span>{" "}
              I build for communities and founders, designing the look and writing the code behind it.
            </p>
            <p style={css("margin:24px 0 0; font-size:18px; line-height:1.5; letter-spacing:-0.01em; color:#6b6b6b;")}>
              When I&apos;m not at the keyboard I&apos;m usually somewhere else entirely. I travel a lot, chase good snow, and bring those new angles back into the work.
            </p>

            <div style={css("display:flex; gap:14px; flex-wrap:wrap; margin-top:34px;")}>
              <div style={css("flex:1; min-width:120px; padding:22px 22px; border-radius:24px; background:#fff; border:1px solid #ececec; box-shadow:0 14px 36px -28px rgba(0,0,0,.3);")}>
                <div style={css("font-family:'Open Runde','SF Pro Rounded',-apple-system,sans-serif; font-size:clamp(30px,4vw,42px); font-weight:500; letter-spacing:-0.03em; color:#1c1c1c;")}>
                  <span data-count="6" data-suffix="+">
                    6+
                  </span>
                </div>
                <div style={css("font-family:'Inter',sans-serif; font-size:13.5px; color:#6e6e6e; margin-top:6px;")}>
                  Years in programming
                </div>
              </div>
              <div style={css("flex:1; min-width:120px; padding:22px 22px; border-radius:24px; background:#fff; border:1px solid #ececec; box-shadow:0 14px 36px -28px rgba(0,0,0,.3);")}>
                <div style={css("font-family:'Open Runde','SF Pro Rounded',-apple-system,sans-serif; font-size:clamp(30px,4vw,42px); font-weight:500; letter-spacing:-0.03em; color:#1c1c1c;")}>
                  <span data-count="60" data-suffix="+">
                    60+
                  </span>
                </div>
                <div style={css("font-family:'Inter',sans-serif; font-size:13.5px; color:#6e6e6e; margin-top:6px;")}>
                  Projects shipped
                </div>
              </div>
              <div style={css("flex:1; min-width:120px; padding:22px 22px; border-radius:24px; background:#fff; border:1px solid #ececec; box-shadow:0 14px 36px -28px rgba(0,0,0,.3);")}>
                <div style={css("font-family:'Open Runde','SF Pro Rounded',-apple-system,sans-serif; font-size:clamp(30px,4vw,42px); font-weight:500; letter-spacing:-0.03em; color:var(--accent);")}>
                  <span data-count="12" data-suffix="+">
                    12+
                  </span>
                </div>
                <div style={css("font-family:'Inter',sans-serif; font-size:13.5px; color:#6e6e6e; margin-top:6px;")}>
                  Countries visited
                </div>
              </div>
            </div>

            <div style={css("margin-top:34px;")}>
              {services.map((s, i) => (
                <a
                  key={s}
                  href="#contact"
                  style={css(
                    `display:flex; align-items:center; justify-content:space-between; padding:20px 4px; border-top:1px solid #e6e6e6;${
                      i === services.length - 1 ? " border-bottom:1px solid #e6e6e6;" : ""
                    } transition:padding .25s, color .25s;`
                  )}
                  data-hover="padding-left:14px; color:var(--accent)"
                >
                  <span style={css("font-family:'Open Runde','SF Pro Rounded',-apple-system,sans-serif; font-size:clamp(20px,2.4vw,26px); font-weight:500; letter-spacing:-0.02em;")}>
                    {s}
                  </span>
                  <span style={css("font-size:18px;")}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
