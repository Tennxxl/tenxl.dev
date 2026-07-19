import { css } from "@/lib/css";

export default function Work() {
  return (
    <section
      id="work"
      data-screen-label="Selected work"
      style={css("max-width:1180px; margin:0 auto; padding:64px 24px 0; scroll-margin-top:90px;")}
    >
      <div
        data-reveal="0"
        style={css(
          "display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap; margin-bottom:40px; opacity:0; transform:translateY(30px); transition:opacity .45s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1);"
        )}
      >
        <div>
          <div
            style={css(
              "font-family:'Inter',sans-serif; font-size:14px; letter-spacing:0.14em; color:var(--accent); margin-bottom:14px;"
            )}
          >
            SELECTED WORK · SCROLL TO STACK
          </div>
          <h2
            style={css(
              "margin:0; font-size:clamp(34px,5vw,52px); line-height:1.04; letter-spacing:-0.05em; font-weight:500; color:#000;"
            )}
          >
            Recent projects, in{" "}
            <span
              style={css(
                "font-family:'Instrument Serif',Georgia,serif; font-style:italic; font-weight:400; color:var(--accent); text-shadow:0 0 28px rgba(71,142,255,.6), 0 0 10px rgba(71,142,255,.5), 0 0 60px rgba(71,142,255,.35);"
              )}
            >
              motion.
            </span>
          </h2>
        </div>
        <a
          href="https://discord.com/users/1081084405260496937"
          target="_blank"
          rel="noopener noreferrer"
          style={css(
            "font-size:17px; font-weight:500; color:#6b6b6b; border-bottom:1px solid #e6e6e6; padding-bottom:3px; transition:color .2s, border-color .2s;"
          )}
          data-hover="color:var(--accent); border-color:var(--accent)"
        >
          Start a project ↗
        </a>
      </div>

      <div style={css("display:flex; flex-direction:column; gap:26px;")}>
        {/* 01 — VoidGuard */}
        <article
          data-reveal="1"
          style={css(
            "position:sticky; top:88px; min-height:clamp(420px,58vh,540px); background:#fff; border:1px solid #ececec; border-radius:36px; box-shadow:0 34px 70px -32px rgba(0,0,0,.34); overflow:hidden; display:grid; grid-template-columns:1.05fr 1fr; opacity:0; transition:opacity .45s cubic-bezier(.22,1,.36,1);"
          )}
        >
          <div style={css("padding:clamp(28px,4vw,52px); display:flex; flex-direction:column; justify-content:space-between; gap:24px;")}>
            <div>
              <div style={css("font-family:'Inter',sans-serif; font-size:13px; letter-spacing:0.14em; color:var(--accent); margin-bottom:16px;")}>
                01 / DISCORD BOT
              </div>
              <h3 style={css("margin:0; font-family:'Open Runde','SF Pro Rounded',-apple-system,sans-serif; font-size:clamp(30px,4vw,48px); font-weight:500; letter-spacing:-0.03em; color:#1c1c1c;")}>
                VoidGuard
              </h3>
              <p style={css("margin:14px 0 0; max-width:34ch; font-size:17px; line-height:1.5; color:#6b6b6b; letter-spacing:-0.01em;")}>
                An all-in-one Discord bot, with moderation, security and utility wrapped in one fast, reliable package.
              </p>
            </div>
            <div style={css("display:flex; align-items:center; gap:12px; flex-wrap:wrap;")}>
              <span style={css("display:inline-flex; padding:7px 14px; border-radius:50px; background:rgba(0,0,0,0.05); font-family:'Inter',sans-serif; font-size:13px;")}>
                Discord Bot
              </span>
              <span style={css("display:inline-flex; padding:7px 14px; border-radius:50px; background:rgba(0,0,0,0.05); font-family:'Inter',sans-serif; font-size:13px;")}>
                2025
              </span>
              <a
                href="https://builtbybit.com/resources/voidguard-all-in-one-discord-bot.103928/"
                target="_blank"
                rel="noopener noreferrer"
                style={css(
                  "margin-left:auto; display:inline-flex; align-items:center; gap:7px; padding:11px 20px; border-radius:50px; border:1px solid #d8d8d8; font-size:15px; font-weight:500; color:#1c1c1c; transition:transform .2s, border-color .2s, background .2s;"
                )}
                data-hover="transform:translateY(-2px); border-color:#1c1c1c; background:#fafafa"
              >
                View on BuiltByBit ↗
              </a>
            </div>
          </div>
          <div style={css("position:relative; background:#141414; overflow:hidden;")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/voidguard-card-bg.png"
              alt="VoidGuard"
              style={css("position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;")}
            />
            <div style={css("position:absolute; top:18px; left:20px; font-family:'Inter',sans-serif; font-size:13px; letter-spacing:0.12em; color:rgba(255,255,255,.55);")}>
              01
            </div>
            <div style={css("position:absolute; right:20px; bottom:18px; width:10px; height:10px; border-radius:50%; background:var(--accent);")} />
          </div>
        </article>

        {/* 02 — Design Lap */}
        <article
          data-reveal="2"
          style={css(
            "position:sticky; top:104px; min-height:clamp(420px,58vh,540px); background:#fff; border:1px solid #ececec; border-radius:36px; box-shadow:0 34px 70px -32px rgba(0,0,0,.34); overflow:hidden; display:grid; grid-template-columns:1.05fr 1fr; opacity:0; transition:opacity .45s cubic-bezier(.22,1,.36,1);"
          )}
        >
          <div style={css("padding:clamp(28px,4vw,52px); display:flex; flex-direction:column; justify-content:space-between; gap:24px;")}>
            <div>
              <div style={css("font-family:'Inter',sans-serif; font-size:13px; letter-spacing:0.14em; color:var(--accent); margin-bottom:16px;")}>
                02 / SHOWCASE VIDEO
              </div>
              <h3 style={css("margin:0; font-family:'Open Runde','SF Pro Rounded',-apple-system,sans-serif; font-size:clamp(30px,4vw,48px); font-weight:500; letter-spacing:-0.03em; color:#1c1c1c;")}>
                Design Lap
              </h3>
              <p style={css("margin:14px 0 0; max-width:34ch; font-size:17px; line-height:1.5; color:#6b6b6b; letter-spacing:-0.01em;")}>
                A Discord community for creators — buy and sell premium animations and graphics, share work, and get custom design on demand.
              </p>
            </div>
            <div style={css("display:flex; align-items:center; gap:12px; flex-wrap:wrap;")}>
              <span style={css("display:inline-flex; padding:7px 14px; border-radius:50px; background:rgba(0,0,0,0.05); font-family:'Inter',sans-serif; font-size:13px;")}>
                Discord
              </span>
              <span style={css("display:inline-flex; padding:7px 14px; border-radius:50px; background:rgba(0,0,0,0.05); font-family:'Inter',sans-serif; font-size:13px;")}>
                Community
              </span>
              <a
                href="https://discord.gg/aUjRguhKTJ"
                target="_blank"
                rel="noopener noreferrer"
                style={css(
                  "margin-left:auto; display:inline-flex; align-items:center; gap:8px; padding:11px 22px; border-radius:50px; background:var(--accent); border:1px solid var(--accent); font-size:15px; font-weight:500; color:#fff; box-shadow:0 8px 20px rgba(71,142,255,.32); transition:transform .2s, box-shadow .2s, background .2s;"
                )}
                data-hover="transform:translateY(-2px); box-shadow:0 12px 26px rgba(71,142,255,.45); background:#2f7be8"
              >
                Join ↗
              </a>
            </div>
          </div>
          <div style={css("position:relative; background:#141414; overflow:hidden;")}>
            <video
              src="/designlap-reel.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={css("position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;")}
            />
            <div style={css("position:absolute; top:18px; left:20px; font-family:'Inter',sans-serif; font-size:13px; letter-spacing:0.12em; color:rgba(255,255,255,.55);")}>
              02
            </div>
            <div style={css("position:absolute; right:20px; bottom:18px; width:10px; height:10px; border-radius:50%; background:var(--accent);")} />
          </div>
        </article>

        {/* 03 — AquaticDev */}
        <article
          data-reveal="3"
          style={css(
            "position:sticky; top:120px; min-height:clamp(420px,58vh,540px); background:#fff; border:1px solid #ececec; border-radius:36px; box-shadow:0 34px 70px -32px rgba(0,0,0,.34); overflow:hidden; display:grid; grid-template-columns:1.05fr 1fr; opacity:0; transition:opacity .45s cubic-bezier(.22,1,.36,1);"
          )}
        >
          <div style={css("padding:clamp(28px,4vw,52px); display:flex; flex-direction:column; justify-content:space-between; gap:24px;")}>
            <div>
              <div style={css("font-family:'Inter',sans-serif; font-size:13px; letter-spacing:0.14em; color:var(--accent); margin-bottom:16px;")}>
                03 / WEB DEVELOPMENT
              </div>
              <h3 style={css("margin:0; font-family:'Open Runde','SF Pro Rounded',-apple-system,sans-serif; font-size:clamp(30px,4vw,48px); font-weight:500; letter-spacing:-0.03em; color:#1c1c1c;")}>
                AquaticDev Website
              </h3>
              <p style={css("margin:14px 0 0; max-width:34ch; font-size:17px; line-height:1.5; color:#6b6b6b; letter-spacing:-0.01em;")}>
                A fully self-built website running on Stripe payments and Discord OAuth authentication.
              </p>
            </div>
            <div style={css("display:flex; align-items:center; gap:12px; flex-wrap:wrap;")}>
              <span style={css("display:inline-flex; padding:7px 14px; border-radius:50px; background:rgba(0,0,0,0.05); font-family:'Inter',sans-serif; font-size:13px;")}>
                Stripe
              </span>
              <span style={css("display:inline-flex; padding:7px 14px; border-radius:50px; background:rgba(0,0,0,0.05); font-family:'Inter',sans-serif; font-size:13px;")}>
                Discord Auth
              </span>
              <a
                href="https://aquaticdev.eu"
                target="_blank"
                rel="noopener noreferrer"
                style={css(
                  "margin-left:auto; display:inline-flex; align-items:center; gap:7px; padding:11px 20px; border-radius:50px; border:1px solid #d8d8d8; font-size:15px; font-weight:500; color:#1c1c1c; transition:transform .2s, border-color .2s, background .2s;"
                )}
                data-hover="transform:translateY(-2px); border-color:#1c1c1c; background:#fafafa"
              >
                View ↗
              </a>
            </div>
          </div>
          <div style={css("position:relative; background:#000; overflow:hidden; display:flex; align-items:center; justify-content:center;")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/aquaticdev-icon.png"
              alt="AquaticDev"
              style={css("width:55%; max-width:220px; height:auto; display:block; border-radius:22px;")}
            />
            <div style={css("position:absolute; top:18px; left:20px; font-family:'Inter',sans-serif; font-size:13px; letter-spacing:0.12em; color:rgba(255,255,255,.55);")}>
              03
            </div>
            <div style={css("position:absolute; right:20px; bottom:18px; width:10px; height:10px; border-radius:50%; background:var(--accent);")} />
          </div>
        </article>
      </div>
    </section>
  );
}
