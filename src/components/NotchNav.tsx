import { css } from "@/lib/css";

export default function NotchNav() {
  return (
    <div
      id="notch-pos"
      style={css(
        "position:fixed; top:0; left:50%; z-index:200; transform:translateX(-50%) translateY(-130%); opacity:0; transition:opacity .6s ease, transform .75s cubic-bezier(.34,1.4,.5,1);"
      )}
    >
      <div
        id="notch"
        style={css(
          "position:relative; height:32px; width:210px; background:#000; border-radius:0 0 20px 20px; overflow:hidden; cursor:pointer; box-shadow:0 8px 26px rgba(0,0,0,.34); transition:width .55s cubic-bezier(.34,1.45,.5,1), height .55s cubic-bezier(.34,1.45,.5,1), border-radius .5s ease;"
        )}
      >
        <div
          id="notch-compact"
          style={css(
            "position:absolute; inset:0; display:flex; align-items:center; justify-content:center; gap:10px; padding:0 18px; transition:opacity .18s ease;"
          )}
        >
          <span
            style={css(
              "width:7px; height:7px; border-radius:50%; background:#1f1f1f; box-shadow:inset 0 0 0 1.5px #333; flex:none;"
            )}
          />
          <span
            style={css(
              "color:#fff; font-size:14px; font-weight:600; letter-spacing:-0.01em; white-space:nowrap;"
            )}
          >
            Tenxl
          </span>
          <span
            id="notch-clock-mini"
            style={css(
              "font-family:'General Sans',sans-serif; font-size:12.5px; color:rgba(255,255,255,.5); white-space:nowrap;"
            )}
          >
            9:41
          </span>
        </div>
        <div
          id="notch-full"
          style={css(
            "position:absolute; inset:0; display:flex; align-items:center; justify-content:space-between; gap:18px; padding:0 8px 0 20px; opacity:0; pointer-events:none; transition:opacity .25s ease .06s; white-space:nowrap;"
          )}
        >
          <a
            href="#top"
            data-notch-link="1"
            style={css(
              "display:flex; align-items:center; gap:8px; color:#fff; font-size:15px; font-weight:600; letter-spacing:-0.01em; flex:none;"
            )}
          >
            <span style={css("color:var(--accent); font-size:16px;")}>✦</span> Tenxl
          </a>
          <div
            style={css(
              "display:flex; align-items:center; gap:24px; font-size:15px; font-weight:500; color:rgba(255,255,255,.82);"
            )}
          >
            <a href="#work" data-notch-link="1" style={css("transition:color .2s;")} data-hover="color:#fff">
              Work
            </a>
            <a href="#vfx" data-notch-link="1" style={css("transition:color .2s;")} data-hover="color:#fff">
              VFX
            </a>
            <a href="#gfx" data-notch-link="1" style={css("transition:color .2s;")} data-hover="color:#fff">
              GFX
            </a>
            <a href="#about" data-notch-link="1" style={css("transition:color .2s;")} data-hover="color:#fff">
              About
            </a>
          </div>
          <div style={css("display:flex; align-items:center; gap:14px; flex:none;")}>
            <span
              id="notch-clock"
              style={css(
                "font-family:'General Sans',sans-serif; font-size:13px; color:rgba(255,255,255,.45); white-space:nowrap;"
              )}
            >
              9:41 AM
            </span>
            <a
              href="#contact"
              data-notch-link="1"
              style={css(
                "display:inline-flex; align-items:center; gap:7px; background:var(--accent); color:#fff; padding:8px 16px; border-radius:50px; font-size:14px; font-weight:500; letter-spacing:0.02em; box-shadow:0 6px 16px rgba(71,142,255,.42); transition:transform .2s, box-shadow .2s;"
              )}
              data-hover="transform:translateY(-1px); box-shadow:0 10px 22px rgba(71,142,255,.55)"
            >
              Get in touch ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
