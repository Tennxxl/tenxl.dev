"use client";

import { useEffect, useRef, useState } from "react";
import { css } from "@/lib/css";

type Item = { src: string; title: string; tag: string };

const items: Item[] = [
  { src: "/Tenxlbanner.png", title: "Tenxl Profile Banner", tag: "Discord banner · 2025" },
  { src: "/banner-promo.png", title: "Discord Promo Banner", tag: "Promo graphic · 2025" },
  { src: "/banner-aerogfx.png", title: "Aerogfx Founder Banner", tag: "Brand banner · 2024" },
  { src: "/poster-catchme.png", title: "Catch Me Race Poster", tag: "Poster · 2024" },
  { src: "/graffiti-abstract.png", title: "Abstract Graffiti Type", tag: "Type treatment · 2024" },
  { src: "/logo-nerp-winter.png", title: "NERP Winter Edition", tag: "Seasonal logo · 2025" },
];

export default function Gfx() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setActive((i) => (i + 1) % items.length), 3000);
    return () => clearInterval(t);
  }, [auto]);

  const pokeIdle = () => {
    setAuto(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setAuto(true), 6000);
  };

  const show = (i: number) => {
    setActive(((i % items.length) + items.length) % items.length);
    pokeIdle();
  };

  const current = items[active];

  return (
    <section
      id="gfx"
      data-screen-label="GFX"
      style={css(
        "position:relative; overflow:hidden; max-width:1180px; margin:0 auto; padding:110px 24px 0; scroll-margin-top:90px;"
      )}
    >
      <div
        data-motion
        aria-hidden="true"
        style={css(
          "position:absolute; inset:0; z-index:0; background-image:linear-gradient(rgba(71,142,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(71,142,255,.05) 1px, transparent 1px); background-size:44px 44px; animation:gridDrift 15s linear infinite; -webkit-mask-image:linear-gradient(to bottom, transparent, #000 16%, #000 82%, transparent); mask-image:linear-gradient(to bottom, transparent, #000 16%, #000 82%, transparent); pointer-events:none;"
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
            GRAPHICS &amp; GFX
          </div>
          <h2 style={css("margin:0; max-width:760px; font-size:clamp(32px,4.6vw,50px); line-height:1.05; letter-spacing:-0.05em; font-weight:500; color:#000;")}>
            Stills, type &amp;{" "}
            <span style={css("font-family:'Instrument Serif',Georgia,serif; font-style:italic; font-weight:400; color:var(--accent);")}>
              systems.
            </span>
          </h2>
          <p style={css("margin:16px 0 0; max-width:520px; font-size:17px; line-height:1.5; color:#6b6b6b;")}>
            Posters, banners and type treatments — a selection of recent graphics work.
          </p>
        </div>

        <div
          data-reveal="1"
          style={css(
            "margin-top:60px; opacity:0; transform:translateY(30px); transition:opacity .5s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);"
          )}
        >
          <div style={css("display:flex; align-items:flex-end; justify-content:space-between; gap:20px; flex-wrap:wrap; margin-bottom:22px;")}>
            <div>
              <div style={css("font-family:'Inter',sans-serif; font-size:13px; letter-spacing:0.14em; color:var(--accent); margin-bottom:11px;")}>
                TRY IT LIVE
              </div>
              <h3 style={css("margin:0; font-family:'Open Runde','SF Pro Rounded',-apple-system,sans-serif; font-size:clamp(24px,3.2vw,36px); font-weight:500; letter-spacing:-0.03em; color:#1c1c1c;")}>
                See every design, up close.
              </h3>
            </div>
            <span
              style={css(
                `display:inline-flex; align-items:center; gap:7px; padding:7px 14px; border-radius:50px; background:${auto ? "#eef7f0" : "#f4f4f4"}; font-family:'Inter',sans-serif; font-size:12.5px; font-weight:500; color:${auto ? "#2f9e57" : "#9a9a9a"}; transition:background .25s, color .25s;`
              )}
            >
              <span
                style={css(
                  `width:7px; height:7px; border-radius:50%; background:${auto ? "#22c55e" : "#c2c2c2"}; ${auto ? "animation:autopulse 1.8s ease-in-out infinite;" : ""}`
                )}
              />
              {auto ? "Auto-cycling" : "Paused"}
            </span>
          </div>

          <div
            style={css(
              "position:relative; border-radius:28px; overflow:hidden; background:#101113; box-shadow:0 40px 90px -40px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04);"
            )}
          >
            <div
              aria-hidden="true"
              style={css(
                "position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size:40px 40px;"
              )}
            />
            <div style={css("position:relative; height:clamp(320px,46vw,460px); display:flex; align-items:center; justify-content:center; padding:34px;")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.src}
                src={current.src}
                alt={current.title}
                style={css(
                  "position:absolute; max-width:calc(100% - 56px); max-height:calc(100% - 56px); width:auto; height:auto; object-fit:contain; display:block; border-radius:12px; box-shadow:0 30px 70px -28px rgba(0,0,0,.7);"
                )}
              />
            </div>

            <div
              style={css(
                "position:absolute; left:0; right:0; bottom:0; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:20px 22px; background:linear-gradient(to top, rgba(8,9,11,.82), transparent);"
              )}
            >
              <div style={css("min-width:0;")}>
                <div style={css("font-family:'Open Runde','SF Pro Rounded',-apple-system,sans-serif; font-size:clamp(17px,2.2vw,21px); font-weight:500; letter-spacing:-0.02em; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;")}>
                  {current.title}
                </div>
                <div style={css("font-family:'Inter',sans-serif; font-size:12.5px; color:rgba(255,255,255,.55); margin-top:3px;")}>
                  {current.tag}
                </div>
              </div>
              <div style={css("display:flex; align-items:center; gap:10px; flex:none;")}>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => show(active - 1)}
                  style={css(
                    "width:42px; height:42px; border-radius:50%; border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.08); -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px); color:#fff; font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:transform .2s, background .2s, border-color .2s;"
                  )}
                  data-hover="transform:scale(1.08); background:rgba(255,255,255,.16); border-color:rgba(255,255,255,.35)"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => show(active + 1)}
                  style={css(
                    "width:42px; height:42px; border-radius:50%; border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.08); -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px); color:#fff; font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:transform .2s, background .2s, border-color .2s;"
                  )}
                  data-hover="transform:scale(1.08); background:rgba(255,255,255,.16); border-color:rgba(255,255,255,.35)"
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          <div style={css("display:grid; grid-template-columns:repeat(6,1fr); gap:11px; margin-top:16px;")}>
            {items.map((it, i) => (
              <button
                key={it.src}
                type="button"
                onClick={() => show(i)}
                style={css(
                  `position:relative; aspect-ratio:16/10; border-radius:13px; overflow:hidden; border:2px solid ${i === active ? "var(--accent)" : "transparent"}; padding:0; cursor:pointer; background:#141414; box-shadow:${i === active ? "0 12px 26px -10px rgba(0,0,0,.6)" : "none"}; transform:${i === active ? "translateY(-3px)" : "none"}; transition:transform .25s cubic-bezier(.34,1.4,.5,1), border-color .25s, box-shadow .25s;`
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.src} alt={it.title} style={css("width:100%; height:100%; object-fit:cover; display:block;")} />
              </button>
            ))}
          </div>
          <div style={css("font-family:'Inter',sans-serif; font-size:12.5px; line-height:1.5; color:#9a9a9a; margin-top:14px;")}>
            Pick a thumbnail to bring it to the stage — leave it be and it keeps gliding through the gallery on its own.
          </div>
        </div>
      </div>
    </section>
  );
}
