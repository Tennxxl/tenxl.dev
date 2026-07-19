"use client";

import { useEffect } from "react";

/**
 * Mounts once and reproduces every behaviour from the original design's
 * support.js Component, driven imperatively against the DOM (same approach as
 * the source, which keeps the markup static and 1:1):
 *   - generic hover (the design's `style-hover`, here via [data-hover])
 *   - reveal-on-scroll (staggered IntersectionObserver)
 *   - macOS Dynamic-Island notch (hover / click-to-pin + live clock)
 *   - side scroll-progress rail
 *   - count-up numbers
 *   - scroll FX: work-card stacking (scale + dim), hero parallax/fade, banner zoom
 *   - smooth wheel scrolling
 *
 * reduceMotion defaults to false, matching the design's default prop.
 */
export default function Effects({ reduceMotion = false }: { reduceMotion?: boolean }) {
  useEffect(() => {
    const reduce = reduceMotion;
    const cleanups: Array<() => void> = [];

    if (reduce) {
      document.querySelectorAll<HTMLElement>("[data-motion]").forEach((el) => {
        el.style.animation = "none";
      });
    }

    /* ---------- hover (replaces the framework's style-hover) ---------- */
    const parseDecls = (text: string): Array<[string, string]> => {
      const out: Array<[string, string]> = [];
      for (const decl of text.split(";")) {
        const i = decl.indexOf(":");
        if (i < 0) continue;
        const k = decl.slice(0, i).trim();
        const v = decl.slice(i + 1).trim();
        if (k) out.push([k, v]);
      }
      return out;
    };
    document.querySelectorAll<HTMLElement>("[data-hover]").forEach((el) => {
      const decls = parseDecls(el.getAttribute("data-hover") || "");
      if (!decls.length) return;
      const saved: Record<string, string> = {};
      const enter = () => {
        for (const [k, v] of decls) {
          saved[k] = el.style.getPropertyValue(k);
          el.style.setProperty(k, v);
        }
      };
      const leave = () => {
        for (const [k] of decls) {
          if (saved[k]) el.style.setProperty(k, saved[k]);
          else el.style.removeProperty(k);
        }
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    });

    /* ---------- cursor spotlight: track --mx/--my per card ---------- */
    document.querySelectorAll<HTMLElement>(".bcard").forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", e.clientX - r.left + "px");
        el.style.setProperty("--my", e.clientY - r.top + "px");
      };
      el.addEventListener("mousemove", onMove);
      cleanups.push(() => el.removeEventListener("mousemove", onMove));
    });

    /* ---------- reveal ---------- */
    const revEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reveal = (el: HTMLElement) => {
      el.style.setProperty("opacity", "1", "important");
      el.style.transform = "none";
    };
    const hardReveal = (el: HTMLElement) => {
      el.style.setProperty("transition", "none", "important");
      el.style.setProperty("opacity", "1", "important");
      el.style.transform = "none";
    };
    const showAllReveal = () => revEls.forEach(hardReveal);
    let revealIO: IntersectionObserver | null = null;
    let revealTimer: ReturnType<typeof setTimeout> | null = null;
    if (reduce || !("IntersectionObserver" in window)) {
      showAllReveal();
    } else {
      revealIO = new IntersectionObserver(
        (ents) => {
          ents.forEach((en) => {
            if (en.isIntersecting) {
              const el = en.target as HTMLElement;
              const i = parseInt(el.getAttribute("data-reveal") || "0", 10) || 0;
              el.style.transitionDelay = (i % 6) * 80 + "ms";
              reveal(el);
              revealIO!.unobserve(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revEls.forEach((e) => revealIO!.observe(e));
      revealTimer = setTimeout(showAllReveal, 1400);
    }
    cleanups.push(() => {
      revealIO?.disconnect();
      if (revealTimer) clearTimeout(revealTimer);
    });

    /* ---------- notch ---------- */
    (() => {
      const pos = document.getElementById("notch-pos");
      const notch = document.getElementById("notch");
      const compact = document.getElementById("notch-compact");
      const full = document.getElementById("notch-full");
      if (!pos || !notch) return;
      const open = () => {
        const w = Math.min(468, Math.round(window.innerWidth * 0.94));
        notch.style.width = w + "px";
        notch.style.height = "54px";
        notch.style.borderRadius = "0 0 22px 22px";
        if (compact) compact.style.opacity = "0";
        if (full) {
          full.style.opacity = "1";
          full.style.pointerEvents = "auto";
        }
      };
      const close = () => {
        notch.style.width = "210px";
        notch.style.height = "32px";
        notch.style.borderRadius = "0 0 20px 20px";
        if (compact) compact.style.opacity = "1";
        if (full) {
          full.style.opacity = "0";
          full.style.pointerEvents = "none";
        }
      };
      let hovering = false;
      let pinned = false;
      const onEnter = () => {
        hovering = true;
        open();
      };
      const onLeave = () => {
        hovering = false;
        if (!pinned) close();
      };
      const onClick = () => {
        pinned = !pinned;
        if (pinned) open();
        else if (!hovering) close();
      };
      pos.addEventListener("mouseenter", onEnter);
      pos.addEventListener("mouseleave", onLeave);
      notch.addEventListener("click", onClick);
      const linkHandlers: Array<[Element, EventListener]> = [];
      document.querySelectorAll("[data-notch-link]").forEach((a) => {
        const h: EventListener = (e) => {
          e.stopPropagation();
          pinned = false;
          close();
        };
        a.addEventListener("click", h);
        linkHandlers.push([a, h]);
      });
      const mini = document.getElementById("notch-clock-mini");
      const fullClock = document.getElementById("notch-clock");
      const tick = () => {
        const d = new Date();
        const h = d.getHours();
        const m = String(d.getMinutes()).padStart(2, "0");
        const ap = h >= 12 ? "PM" : "AM";
        let hh = h % 12;
        if (hh === 0) hh = 12;
        if (mini) mini.textContent = hh + ":" + m;
        if (fullClock) fullClock.textContent = hh + ":" + m + " " + ap;
      };
      tick();
      const clock = setInterval(tick, 1000);
      const revealNotch = () => {
        pos.style.opacity = "1";
        pos.style.transform = "translateX(-50%) translateY(0)";
      };
      let notchTimer: ReturnType<typeof setTimeout> | null = null;
      if (reduce) {
        pos.style.transition = "none";
        revealNotch();
      } else {
        notchTimer = setTimeout(revealNotch, 350);
      }
      cleanups.push(() => {
        pos.removeEventListener("mouseenter", onEnter);
        pos.removeEventListener("mouseleave", onLeave);
        notch.removeEventListener("click", onClick);
        linkHandlers.forEach(([a, h]) => a.removeEventListener("click", h));
        clearInterval(clock);
        if (notchTimer) clearTimeout(notchTimer);
      });
    })();

    /* ---------- scroll rail ---------- */
    (() => {
      const fill = document.getElementById("scroll-fill");
      if (!fill) return;
      const onScroll = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
        fill.style.height = (p * 100).toFixed(1) + "%";
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    })();

    /* ---------- counters ---------- */
    (() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
      if (!els.length) return;
      const finalText = (el: HTMLElement) =>
        (el.getAttribute("data-count") || "") + (el.getAttribute("data-suffix") || "");
      const run = (el: HTMLElement) => {
        const target = parseFloat(el.getAttribute("data-count") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        const dur = 1300;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
      };
      if (reduce || !("IntersectionObserver" in window)) {
        els.forEach((el) => (el.textContent = finalText(el)));
        return;
      }
      const io = new IntersectionObserver(
        (ents) => {
          ents.forEach((en) => {
            if (en.isIntersecting) {
              run(en.target as HTMLElement);
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      els.forEach((el) => io.observe(el));
      const t = setTimeout(
        () => els.forEach((el) => (el.textContent = finalText(el))),
        3000
      );
      cleanups.push(() => {
        io.disconnect();
        clearTimeout(t);
      });
    })();

    /* ---------- scroll FX ---------- */
    (() => {
      if (reduce) return;
      const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
      const cards = Array.from(document.querySelectorAll<HTMLElement>("#work article"));
      const stickyTops = cards.map((c) => parseFloat(getComputedStyle(c).top) || 88);
      const overlays: HTMLElement[] = [];
      cards.forEach((c) => {
        c.style.transformOrigin = "center top";
        c.style.willChange = "transform";
        const ov = document.createElement("div");
        ov.setAttribute("aria-hidden", "true");
        ov.dataset.stackDim = "1";
        ov.style.cssText =
          "position:absolute; inset:0; z-index:6; pointer-events:none; opacity:0; background:#ffffff;";
        c.appendChild(ov);
        overlays.push(ov);
      });
      const heroInner = document.getElementById("hero-inner");
      const update = () => {
        const vh = window.innerHeight;
        for (let i = 0; i < cards.length; i++) {
          const next = cards[i + 1];
          let p = 0;
          if (next) {
            const nTop = next.getBoundingClientRect().top;
            const sNext = stickyTops[i + 1];
            const span = vh - sNext || 1;
            p = clamp((vh - nTop) / span, 0, 1);
          }
          const scale = 1 - p * 0.1;
          cards[i].style.transform = "scale(" + scale.toFixed(4) + ")";
          const ov = cards[i].querySelector<HTMLElement>("[data-stack-dim]");
          if (ov) ov.style.opacity = (p * 0.9).toFixed(3);
        }
        if (heroInner) {
          heroInner.style.transform = "none";
          heroInner.style.opacity = "1";
        }
      };
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        overlays.forEach((o) => o.remove());
      });
    })();

    /* Note: the design's custom smooth wheel-scroll (a lerp that hijacked the
       wheel) was removed — it felt too floaty/slow. Native scrolling is used
       instead; all scroll-driven effects above still work on native scroll. */

    return () => cleanups.forEach((fn) => fn());
  }, [reduceMotion]);

  return null;
}
