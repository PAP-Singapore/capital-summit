import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "../components/SmoothScroll";

/**
 * Deep links of the shape `/speakers#speaker-<id>` or `/sponsors#sponsor-<id>` —
 * the "Open preview" link on an approval request in Slack — have to land on the
 * one item under review.
 *
 * The browser's own hash handling cannot do it here, for three reasons:
 *   - the list is fetched after mount, so the element does not exist yet at the
 *     moment the browser looks for it, and it gives up silently;
 *   - `ScrollToTop` jumps to 0 on every navigation, which would undo it anyway;
 *   - Lenis owns the scroll position, and a native jump leaves it desynced.
 *
 * Pass `ready` as the page's "the list has rendered" signal, so the wait ends
 * when the data actually arrives rather than on a fixed timer.
 */

const HIGHLIGHT_CLASS = "hash-target-highlight";
/**
 * The scroll-reveal wrappers, one per list: speaker cards and sponsor tier
 * blocks both sit at `opacity: 0` until ScrollTrigger brings them in. Any list
 * this hook is used on needs its wrapper here, or a deep link lands on an
 * invisible item.
 */
const REVEAL_WRAPPERS = ".speaker-card-reveal, .partner-tier";
const HIGHLIGHT_MS = 2600;
/** Give up rather than poll forever if the id is not on this page at all. */
const WAIT_TIMEOUT_MS = 8000;
const POLL_MS = 100;
/** Images above the target settle after the first pass and shift it down. */
const SETTLE_MS = 1200;

export function useScrollToHash(ready: boolean) {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    if (!id || !ready) return;

    let cancelled = false;
    let userTookOver = false;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    // A corrective scroll that fights the reader is worse than a few pixels of
    // drift, so any real input ends this hook's involvement.
    const yieldToUser = () => {
      userTookOver = true;
    };
    const inputEvents = ["wheel", "touchstart", "keydown"] as const;
    for (const evt of inputEvents) {
      window.addEventListener(evt, yieldToUser, { passive: true });
    }

    let target: HTMLElement | null = null;
    const deadline = Date.now() + WAIT_TIMEOUT_MS;

    const scrollToTarget = (el: HTMLElement) => {
      // The header is sticky, so landing the card at y=0 puts it underneath.
      const gap = (document.querySelector("header")?.offsetHeight ?? 0) + 24;
      if (lenis) {
        lenis.scrollTo(el, { offset: -gap, duration: 1 });
      } else {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - gap,
          behavior: "smooth",
        });
      }
    };

    const run = () => {
      if (cancelled) return;

      const el = document.getElementById(id);
      if (!el) {
        if (Date.now() < deadline) later(run, POLL_MS);
        return;
      }
      target = el;

      // Trigger positions were computed while the grid was still empty.
      ScrollTrigger.refresh();

      // Cards sit at opacity 0 until ScrollTrigger reveals them on the way in.
      // Jumping straight to one can land past its trigger, so reveal the target
      // up front — an empty slot is the one thing a reviewer must never see.
      const reveal = el.closest(REVEAL_WRAPPERS);
      if (reveal) gsap.set(reveal, { opacity: 1, y: 0, overwrite: true });

      scrollToTarget(el);
      later(() => {
        if (!cancelled && !userTookOver) scrollToTarget(el);
      }, SETTLE_MS);

      el.classList.add(HIGHLIGHT_CLASS);
      later(() => el.classList.remove(HIGHLIGHT_CLASS), HIGHLIGHT_MS);
    };

    // One tick after paint, so the first poll sees the committed DOM.
    later(run, 0);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      target?.classList.remove(HIGHLIGHT_CLASS);
      for (const evt of inputEvents) {
        window.removeEventListener(evt, yieldToUser);
      }
    };
  }, [pathname, hash, ready, lenis]);
}
