import { css } from "@/lib/css";

/** Fixed bottom frosted fade + side scroll-progress rail. */
export default function Overlays() {
  return (
    <>
      <div
        aria-hidden="true"
        style={css(
          "position:fixed; left:0; right:0; bottom:0; height:120px; z-index:140; pointer-events:none; -webkit-backdrop-filter:blur(7px); backdrop-filter:blur(7px); -webkit-mask-image:linear-gradient(to top, #000 0%, #000 28%, transparent 100%); mask-image:linear-gradient(to top, #000 0%, #000 28%, transparent 100%); background:linear-gradient(to top, rgba(255,255,255,0.6), rgba(255,255,255,0));"
        )}
      />
      <div
        aria-hidden="true"
        style={css(
          "position:fixed; top:50%; right:16px; transform:translateY(-50%); height:150px; width:3px; border-radius:3px; background:rgba(0,0,0,0.08); z-index:140; overflow:hidden;"
        )}
      >
        <div
          id="scroll-fill"
          style={css(
            "position:absolute; top:0; left:0; right:0; height:0%; background:var(--accent); border-radius:3px;"
          )}
        />
      </div>
    </>
  );
}
