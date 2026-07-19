import { css } from "@/lib/css";

const videos = [
  { thumb: "/yt-thumb-miami.jpg", duration: "8:42", title: "MIAMI — a weekend in Brickell", views: "2.1K views · 3 weeks ago" },
  { thumb: "/yt-thumb-bahamas.jpg", duration: "12:07", title: "BAHAMAS — swimming with stingrays", views: "3.4K views · 1 month ago" },
  { thumb: "/yt-thumb-nyc.png", duration: "6:15", title: "NYC — from the top of the Edge", views: "5.8K views · 2 months ago" },
];

function YoutubeGlyph() {
  return (
    <svg width={18} height={13} viewBox="0 0 24 17" fill="currentColor">
      <path d="M23.5 2.7A3 3 0 0 0 21.4.55C19.5 0 12 0 12 0S4.5 0 2.6.55A3 3 0 0 0 .5 2.7 31.5 31.5 0 0 0 0 8.5a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.15C4.5 17 12 17 12 17s7.5 0 9.4-.55a3 3 0 0 0 2.1-2.15 31.5 31.5 0 0 0 .5-5.8 31.5 31.5 0 0 0-.5-5.8ZM9.6 12.1V4.9l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

export default function Youtube() {
  return (
    <section
      id="youtube"
      data-screen-label="YouTube"
      style={css("max-width:1180px; margin:0 auto; padding:120px 24px 0; scroll-margin-top:90px;")}
    >
      <div
        data-reveal="0"
        style={css(
          "display:flex; align-items:flex-end; justify-content:space-between; gap:20px; flex-wrap:wrap; margin-bottom:36px; opacity:0; transform:translateY(30px); transition:opacity .45s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1);"
        )}
      >
        <div>
          <div style={css("font-family:'Inter',sans-serif; font-size:14px; letter-spacing:0.14em; color:var(--accent); margin-bottom:14px;")}>
            ON YOUTUBE
          </div>
          <h2 style={css("margin:0; font-size:clamp(32px,4.6vw,50px); line-height:1.05; letter-spacing:-0.05em; font-weight:500; color:#000;")}>
            Watch it in{" "}
            <span style={css("font-family:'Instrument Serif',Georgia,serif; font-style:italic; font-weight:400; color:var(--accent);")}>
              motion.
            </span>
          </h2>
        </div>
        <a
          href="https://www.youtube.com/@shotbytenxl"
          target="_blank"
          rel="noopener noreferrer"
          style={css(
            "display:inline-flex; align-items:center; gap:9px; background:#ff0033; color:#fff; padding:12px 24px; border-radius:50px; font-size:15px; font-weight:600; letter-spacing:0.01em; box-shadow:0 10px 26px rgba(255,0,51,.3); transition:transform .25s, box-shadow .25s;"
          )}
          data-hover="transform:translateY(-2px); box-shadow:0 16px 34px rgba(255,0,51,.42)"
        >
          <YoutubeGlyph /> Subscribe
        </a>
      </div>

      <div
        data-reveal="1"
        style={css(
          "position:relative; border-radius:28px; overflow:hidden; background:#0f0f0f; box-shadow:0 40px 90px -40px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.05); padding:clamp(24px,3.4vw,40px); opacity:0; transform:translateY(30px); transition:opacity .5s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);"
        )}
      >
        <div style={css("display:flex; align-items:center; gap:18px; flex-wrap:wrap; margin-bottom:28px;")}>
          <div style={css("width:72px; height:72px; flex:none;")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://unavatar.io/youtube/@shotbytenxl"
              alt="Tenxl"
              style={css("width:72px; height:72px; border-radius:50%; object-fit:cover; display:block; background:#222;")}
            />
          </div>
          <div style={css("min-width:0;")}>
            <div style={css("font-family:'Open Runde','SF Pro Rounded',-apple-system,sans-serif; font-size:clamp(22px,2.8vw,30px); font-weight:500; letter-spacing:-0.02em; color:#fff;")}>
              Tenxl
            </div>
            <div style={css("font-family:'Inter',sans-serif; font-size:13.5px; color:rgba(255,255,255,.55); margin-top:3px;")}>
              @shotbytenxl · On the road — sometimes I have no idea where.
            </div>
          </div>
        </div>
        <div style={css("display:grid; grid-template-columns:repeat(3,1fr); gap:20px;")}>
          {videos.map((v) => (
            <div key={v.thumb} style={css("display:flex; flex-direction:column;")}>
              <a
                href="https://www.youtube.com/@shotbytenxl"
                target="_blank"
                rel="noopener noreferrer"
                style={css(
                  "position:relative; display:block; aspect-ratio:16/9; border-radius:14px; overflow:hidden; transition:transform .3s cubic-bezier(.34,1.3,.5,1);"
                )}
                data-hover="transform:scale(1.02)"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.thumb}
                  alt=""
                  style={css("position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;")}
                />
                <span
                  style={css(
                    "position:absolute; right:8px; bottom:8px; background:rgba(0,0,0,.8); color:#fff; font-family:'Inter',sans-serif; font-size:12px; font-weight:500; padding:3px 6px; border-radius:5px; font-variant-numeric:tabular-nums; pointer-events:none;"
                  )}
                >
                  {v.duration}
                </span>
              </a>
              <div style={css("display:flex; gap:12px; margin-top:12px;")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://unavatar.io/youtube/@shotbytenxl"
                  alt=""
                  style={css("width:36px; height:36px; border-radius:50%; object-fit:cover; flex:none; background:#222;")}
                />
                <div style={css("min-width:0;")}>
                  <div style={css("font-size:15px; font-weight:600; letter-spacing:-0.01em; color:#fff; line-height:1.35;")}>
                    {v.title}
                  </div>
                  <div style={css("font-family:'Inter',sans-serif; font-size:13px; color:rgba(255,255,255,.55); margin-top:4px;")}>
                    Tenxl
                  </div>
                  <div style={css("font-family:'Inter',sans-serif; font-size:13px; color:rgba(255,255,255,.55);")}>
                    {v.views}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
