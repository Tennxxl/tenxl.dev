"use client";

import { useEffect, useState } from "react";
import { css } from "@/lib/css";

const DISCORD_ID = "1081084405260496937";
const badges = ["🛡️", "💎", "🔥", "🎮", "🚀", "🏆"];

type Spotify = {
  song: string;
  artist: string;
  album_art_url: string;
  timestamps: { start: number; end: number };
};
type Lanyard = {
  listening_to_spotify: boolean;
  spotify: Spotify | null;
  discord_user?: { avatar?: string | null };
};

function fmt(ms: number) {
  if (!isFinite(ms) || ms < 0) ms = 0;
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export default function DiscordCard() {
  const [sp, setSp] = useState<Spotify | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const j = await r.json();
        if (alive && j.success) {
          const d = j.data as Lanyard;
          setSp(d.listening_to_spotify ? d.spotify : null);
          if (d.discord_user?.avatar) {
            setAvatar(
              `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${d.discord_user.avatar}.png?size=256`
            );
          }
        }
      } catch {
        /* ignore */
      }
    };
    load();
    const poll = setInterval(load, 12000);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      alive = false;
      clearInterval(poll);
      clearInterval(tick);
    };
  }, []);

  let prog = 0;
  if (sp) {
    const { start, end } = sp.timestamps;
    prog = Math.min(1, Math.max(0, (now - start) / (end - start)));
  }

  return (
    <section
      id="discord"
      data-screen-label="Discord"
      style={css("max-width:1180px; margin:0 auto; padding:120px 24px 0; scroll-margin-top:90px;")}
    >
      <div
        data-reveal="0"
        style={css(
          "text-align:center; margin-bottom:44px; opacity:0; transform:translateY(30px); transition:opacity .45s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1);"
        )}
      >
        <div style={css("font-family:'Inter',sans-serif; font-size:14px; letter-spacing:0.14em; color:var(--accent); margin-bottom:14px;")}>
          FIND ME ONLINE
        </div>
        <h2 style={css("margin:0; font-size:clamp(32px,4.6vw,50px); line-height:1.05; letter-spacing:-0.05em; font-weight:500; color:#000;")}>
          Catch me on{" "}
          <span style={css("font-family:'Instrument Serif',Georgia,serif; font-style:italic; font-weight:400; color:var(--accent);")}>
            Discord.
          </span>
        </h2>
      </div>

      <div
        data-reveal="1"
        style={css(
          "display:flex; justify-content:center; opacity:0; transform:translateY(30px); transition:opacity .5s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);"
        )}
      >
        <div
          style={css(
            "position:relative; width:340px; max-width:100%; background:#232428; border-radius:18px; overflow:hidden; box-shadow:0 40px 90px -34px rgba(20,30,70,.55), 0 0 0 1px rgba(255,255,255,.04); font-family:'Inter',sans-serif; transition:transform .3s cubic-bezier(.34,1.3,.5,1), box-shadow .3s;"
          )}
          data-hover="transform:translateY(-6px); box-shadow:0 54px 110px -36px rgba(20,30,70,.65), 0 0 0 1px rgba(255,255,255,.08)"
        >
          <div style={css("height:106px; overflow:hidden;")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Tenxlbanner.png" alt="" style={css("width:100%; height:100%; object-fit:cover; display:block;")} />
          </div>
          <div style={css("padding:0 16px;")}>
            <div style={css("display:flex; align-items:flex-end; justify-content:space-between; gap:12px; margin-top:-42px;")}>
              <div style={css("position:relative; width:84px; height:84px; flex:none;")}>
                <div style={css("width:84px; height:84px; border-radius:50%; border:6px solid #232428; overflow:hidden; background:#15161a;")}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatar ?? "/discord-avatar.png"} alt="Tenxl" style={css("width:100%; height:100%; object-fit:cover; display:block;")} />
                </div>
                <div
                  style={css(
                    "position:absolute; right:1px; bottom:1px; width:26px; height:26px; border-radius:50%; background:#232428; display:flex; align-items:center; justify-content:center;"
                  )}
                >
                  <span style={css("width:17px; height:17px; border-radius:50%; background:#f23f43; display:flex; align-items:center; justify-content:center;")}>
                    <span style={css("width:9px; height:3.5px; border-radius:3px; background:#232428;")} />
                  </span>
                </div>
              </div>
              <div
                style={css(
                  "display:inline-flex; align-items:center; gap:8px; background:#111214; color:#b5bac1; padding:8px 14px 8px 10px; border-radius:9px; font-size:14px; font-weight:500; margin-bottom:10px;"
                )}
              >
                <span style={css("width:20px; height:20px; border-radius:50%; background:#232428; display:flex; align-items:center; justify-content:center; font-size:16px; line-height:1; color:#b5bac1;")}>
                  +
                </span>{" "}
                Add Status
              </div>
            </div>

            <div style={css("padding:12px 0 18px;")}>
              <div
                style={css(
                  "margin:0; font-size:24px; font-weight:700; letter-spacing:-0.01em; line-height:1.1; background:linear-gradient(95deg,#6fd2ff,#5b8cff 55%,#7b6bff); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;"
                )}
              >
                Tenxl
              </div>
              <div style={css("margin-top:3px; font-size:13.5px; color:#b5bac1; font-weight:500;")}>
                tennxl &nbsp;•&nbsp; vfx &amp; gfx
              </div>

              {sp && (
                <div
                  style={css(
                    "margin-top:13px; padding:11px 12px 12px; background:rgba(30,215,96,.07); border:1px solid rgba(30,215,96,.16); border-radius:13px;"
                  )}
                >
                  <div style={css("display:flex; align-items:center; gap:7px; margin-bottom:9px;")}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://emojicdn.elk.sh/${encodeURIComponent("🎵")}?style=apple`} alt="" style={css("width:14px; height:14px; display:block;")} />
                    <span style={css("font-size:10.5px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; color:#1ed760;")}>
                      Listening to Spotify
                    </span>
                    <span style={css("margin-left:auto; display:flex; align-items:flex-end; gap:2px; height:11px;")}>
                      <span style={css("width:2.5px; height:100%; border-radius:2px; background:#1ed760; transform-origin:bottom; animation:eq .9s ease-in-out infinite -.15s;")} />
                      <span style={css("width:2.5px; height:100%; border-radius:2px; background:#1ed760; transform-origin:bottom; animation:eq .9s ease-in-out infinite -.5s;")} />
                      <span style={css("width:2.5px; height:100%; border-radius:2px; background:#1ed760; transform-origin:bottom; animation:eq .9s ease-in-out infinite -.3s;")} />
                    </span>
                  </div>
                  <div style={css("display:flex; gap:12px; align-items:center;")}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sp.album_art_url}
                      alt=""
                      style={css("width:54px; height:54px; border-radius:9px; object-fit:cover; flex:none; box-shadow:0 7px 18px rgba(0,0,0,.5);")}
                    />
                    <div style={css("min-width:0; flex:1;")}>
                      <div style={css("font-size:14.5px; font-weight:600; letter-spacing:-0.01em; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;")}>
                        {sp.song}
                      </div>
                      <div style={css("font-size:12.5px; color:#b5bac1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;")}>
                        {sp.artist}
                      </div>
                    </div>
                  </div>
                  <div style={css("margin-top:12px; display:flex; align-items:center; gap:9px;")}>
                    <span style={css("font-size:10.5px; color:#b5bac1; font-variant-numeric:tabular-nums; min-width:30px;")}>
                      {fmt(now - sp.timestamps.start)}
                    </span>
                    <div style={css("flex:1; height:4px; border-radius:4px; background:rgba(255,255,255,.14); overflow:hidden;")}>
                      <div style={css(`height:100%; width:${(prog * 100).toFixed(2)}%; border-radius:4px; background:#fff;`)} />
                    </div>
                    <span style={css("font-size:10.5px; color:#b5bac1; font-variant-numeric:tabular-nums; min-width:30px; text-align:right;")}>
                      {fmt(sp.timestamps.end - sp.timestamps.start)}
                    </span>
                  </div>
                </div>
              )}

              <div
                style={css(
                  "display:flex; align-items:center; gap:9px; margin-top:12px; padding:8px 11px; background:#111214; border-radius:9px; width:max-content; max-width:100%; flex-wrap:wrap;"
                )}
              >
                {badges.map((b) => (
                  <span key={b} style={css("display:flex; transition:transform .2s;")} data-hover="transform:scale(1.28) translateY(-1px)">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://emojicdn.elk.sh/${encodeURIComponent(b)}?style=apple`} alt="" style={css("width:20px; height:20px; display:block;")} />
                  </span>
                ))}
              </div>

              <div style={css("height:1px; background:rgba(255,255,255,.06); margin:15px 0;")} />

              <div style={css("font-size:12px; letter-spacing:.06em; font-weight:700; color:#b5bac1; text-transform:uppercase; margin-bottom:7px;")}>
                About Me
              </div>
              <p style={css("margin:0; font-size:14px; line-height:1.5; color:#dbdee1;")}>
                London today, Miami tomorrow — living like James Bond.
              </p>
              <a
                href="https://tenxl.dev/"
                target="_blank"
                rel="noopener noreferrer"
                style={css("display:inline-block; margin-top:8px; font-size:14px; color:#4aa3ff; transition:color .2s;")}
                data-hover="color:#7db9ff"
              >
                https://tenxl.dev/
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
