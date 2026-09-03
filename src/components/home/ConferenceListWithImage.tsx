import React, { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConferenceListMobile from "./ConferenceListMobile";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll";
import { ConferenceWithImage } from "../../types/conference";
import { conferences } from "../../data/conferences";
import { cityToSlug } from "../../utils/cities";

interface ConferenceListWithImageProps {
  onConferenceHover?: (conference: ConferenceWithImage | null) => void;
}

const CARD_WIDTH = 480;
const CARD_HEIGHT = 280;
const CURSOR_OFFSET = 16;

const ConferenceListWithImage: React.FC<ConferenceListWithImageProps> = ({
  onConferenceHover,
}) => {
  const sectionFadeRef = useFadeInOnScroll<HTMLElement>({
    y: 50,
    duration: 0.9,
  });

  const navigate = useNavigate();

  const [hoveredConference, setHoveredConference] =
    useState<ConferenceWithImage | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const gradientRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverCardRef = useRef<HTMLDivElement | null>(null);
  const hoveredIndexRef = useRef<number | null>(null);
  const hoverDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);
  const pendingHoverRef = useRef<{
    conf: ConferenceWithImage;
    index: number;
  } | null>(null);
  const onConferenceHoverRef = useRef(onConferenceHover);
  onConferenceHoverRef.current = onConferenceHover;

  // Register GSAP plugin
  useGSAP(() => {
    gsap.registerPlugin();
  }, []);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (hoverDelayRef.current) clearTimeout(hoverDelayRef.current);
      if (leaveDelayRef.current) clearTimeout(leaveDelayRef.current);
    };
  }, []);

  // Animate hover card elements from top to bottom
  useEffect(() => {
    if (hoveredConference && hoverCardRef.current) {
      const card = hoverCardRef.current;
      const image = card.querySelector(".hover-card-image");
      const title = card.querySelector(".hover-card-title");
      const details = card.querySelectorAll(".hover-card-detail");

      // Set initial state
      gsap.set(card, { opacity: 0 });
      gsap.set(image, { opacity: 0, y: -20, clipPath: "inset(0 0 100% 0)" });
      gsap.set(title, { opacity: 0, y: -15 });
      gsap.set(details, { opacity: 0, y: -10 });

      // Create staggered animation timeline
      const tl = gsap.timeline();

      tl.to(card, {
        opacity: 1,
        duration: 0.15,
        ease: "power2.out",
      })
        .to(
          image,
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.4,
            ease: "power3.out",
          },
          0.05,
        )
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          0.15,
        )
        .to(
          details,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.06,
          },
          0.25,
        );

      return () => {
        tl.kill();
      };
    }
  }, [hoveredConference]);

  const animateGradientIn = useCallback((index: number) => {
    const el = gradientRefs.current[index];
    if (el) {
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { scaleY: 0, opacity: 1 },
        {
          scaleY: 1,
          duration: 0.5,
          ease: "power2.out",
        },
      );
    }
  }, []);

  const animateGradientOut = useCallback((index: number) => {
    const el = gradientRefs.current[index];
    if (el) {
      gsap.killTweensOf(el);
      gsap.to(el, {
        scaleY: 0,
        duration: 0.35,
        ease: "power2.in",
      });
    }
  }, []);

  const animateDateArrowIn = useCallback((index: number) => {
    const dateEl = dateRefs.current[index];
    const arrowEl = arrowRefs.current[index];

    if (dateEl) {
      gsap.killTweensOf(dateEl);
      gsap.fromTo(
        dateEl,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
      );
    }
    if (arrowEl) {
      gsap.killTweensOf(arrowEl);
      gsap.fromTo(
        arrowEl,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", delay: 0.05 },
      );
    }
  }, []);

  const animateDateArrowOut = useCallback((index: number) => {
    const dateEl = dateRefs.current[index];
    const arrowEl = arrowRefs.current[index];

    if (dateEl) {
      gsap.killTweensOf(dateEl);
      gsap.to(dateEl, { y: -20, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
    if (arrowEl) {
      gsap.killTweensOf(arrowEl);
      gsap.to(arrowEl, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, []);

  // Block hover triggers while scrolling and dismiss any active/pending hover
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      isScrollingRef.current = true;

      // Cancel any pending hover delay
      if (hoverDelayRef.current) {
        clearTimeout(hoverDelayRef.current);
        hoverDelayRef.current = null;
      }

      // Cancel any pending leave delay
      if (leaveDelayRef.current) {
        clearTimeout(leaveDelayRef.current);
        leaveDelayRef.current = null;
      }

      // Immediately dismiss the hover card
      if (hoveredIndexRef.current !== null) {
        hoveredIndexRef.current = null;
        setHoveredConference(null);
        onConferenceHoverRef.current?.(null);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;

        // If cursor is still over a venue after scrolling stops, trigger hover
        if (pendingHoverRef.current) {
          const { conf, index } = pendingHoverRef.current;
          hoveredIndexRef.current = index;
          setHoveredConference(conf);
          onConferenceHoverRef.current?.(conf);
          if (!conf.active) {
            animateGradientIn(index);
            animateDateArrowIn(index);
          }
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [animateGradientIn, animateDateArrowIn]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  const HOVER_DELAY = 250; // ms delay before showing hover card
  const LEAVE_DELAY = 100; // ms delay before hiding hover card (prevents cut animation between items)

  const handleMouseEnter = useCallback(
    (
      conf: ConferenceWithImage,
      index: number,
      e: React.MouseEvent<HTMLDivElement>,
    ) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Always track which venue the cursor is over (used when scroll stops)
      pendingHoverRef.current = { conf, index };

      // Don't trigger hover while scrolling
      if (isScrollingRef.current) return;

      // Cancel any pending leave — user moved to another item
      if (leaveDelayRef.current) {
        clearTimeout(leaveDelayRef.current);
        leaveDelayRef.current = null;
      }

      // Clear any pending hover delay from a previous item
      if (hoverDelayRef.current) {
        clearTimeout(hoverDelayRef.current);
        hoverDelayRef.current = null;
      }

      hoverDelayRef.current = setTimeout(() => {
        hoveredIndexRef.current = index;
        setHoveredConference(conf);
        onConferenceHoverRef.current?.(conf);
        if (!conf.active) {
          animateGradientIn(index);
          animateDateArrowIn(index);
        }
        hoverDelayRef.current = null;
      }, HOVER_DELAY);
    },
    [animateGradientIn, animateDateArrowIn],
  );

  const handleMouseLeave = useCallback(
    (conf: ConferenceWithImage, index: number) => {
      // Cursor left the venue row
      pendingHoverRef.current = null;

      // Cancel pending hover if user leaves before delay completes
      if (hoverDelayRef.current) {
        clearTimeout(hoverDelayRef.current);
        hoverDelayRef.current = null;
      }

      // Delay the actual leave so moving between items doesn't cut the animation
      leaveDelayRef.current = setTimeout(() => {
        hoveredIndexRef.current = null;
        setHoveredConference(null);
        onConferenceHoverRef.current?.(null);
        leaveDelayRef.current = null;
      }, LEAVE_DELAY);

      // Animate out the row's gradient/date/arrow immediately (these are per-row, not the card)
      if (!conf.active) {
        animateGradientOut(index);
        animateDateArrowOut(index);
      }
    },
    [animateGradientOut, animateDateArrowOut],
  );
  const getCardStyle = (): React.CSSProperties => {
    let left = cursorPos.x + CURSOR_OFFSET;
    let top = cursorPos.y + CURSOR_OFFSET;
    if (left + CARD_WIDTH > window.innerWidth - 16) {
      left = cursorPos.x - CARD_WIDTH - CURSOR_OFFSET;
    }
    if (top + CARD_HEIGHT > window.innerHeight - 16) {
      top = cursorPos.y - CARD_HEIGHT - CURSOR_OFFSET;
    }

    return {
      position: "fixed",
      left,
      top,
      width: CARD_WIDTH,
      zIndex: 99999999,
      pointerEvents: "none" as const,
    };
  };
  const formatDateForMobile = (dateString: string) => {
    const [month, year] = dateString.split(" ");
    const shortYear = year.slice(-2);
    return `${month} '${shortYear}`;
  };

  return (
    <>
      <ConferenceListMobile onConferenceSelect={onConferenceHover} />
      <section
        ref={sectionFadeRef}
        className="w-full bg-background pb-20 pt-5 lg:pt-20 lg:pb-[112px] relative overflow-hidden hidden lg:block"
      >
        <div className="max-w-full mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-8 md:mb-[60px] lg:mb-[72px]">
            <h2 className="font-headline text-[16px] md:text-[28px] lg:text-[32px] leading-[110%] text-text-medium font-light">
              Stable Summit operates as a global conference series, with
              multiple editions each year
            </h2>
          </div>
          <div className="w-full">
            {conferences.map((conf, index) => (
              <div
                key={index}
                className="relative group border-t border-border last:border-b py-4 md:py-3 lg:pt-3 lg:pb-0 overflow-hidden cursor-pointer"
                onMouseEnter={(e) => handleMouseEnter(conf, index, e)}
                onMouseLeave={() => handleMouseLeave(conf, index)}
                onMouseMove={handleMouseMove}
                onClick={() =>
                  conf.city === "Cannes" || conf.city === "New York City"
                    ? navigate(`/archive?city=${cityToSlug(conf.city)}`)
                    : navigate(`/venue/${conf.city}`)
                }
              >
                <div
                  ref={(el) => {
                    gradientRefs.current[index] = el;
                  }}
                  className="absolute inset-0 z-0 flex justify-center items-start pointer-events-none origin-top"
                  style={{
                    transform: conf.active ? "scaleY(1)" : "scaleY(0)",
                  }}
                >
                  <div className="w-[300%] h-[140px] bg-[radial-gradient(ellipse_at_top,var(--color-primary-light)__40%,transparent_70%)] md:bg-[radial-gradient(ellipse_at_top,var(--color-primary-light)__30%,transparent_70%)] lg:bg-[radial-gradient(ellipse_at_top,var(--color-primary-light)__40%,transparent_70%)] -translate-y-1/2"></div>
                </div>
                <div className="relative z-10 flex md:hidden flex-row items-center">
                  <div
                    ref={(el) => {
                      dateRefs.current[index] = el;
                    }}
                    className="w-[70px] flex justify-start"
                    style={{
                      opacity: conf.active ? 1 : 0,
                      transform: conf.active
                        ? "translateY(0)"
                        : "translateY(-50px)",
                    }}
                  >
                    <span className="font-sans text-[12px] text-text-dark font-medium">
                      {formatDateForMobile(conf.date)}
                    </span>
                  </div>
                  <h3
                    className={`flex-1 font-headline text-[32px] leading-tight text-center cursor-pointer transition-colors duration-500 ${
                      conf.active
                        ? "text-text-dark"
                        : "text-dark-gray group-hover:text-text-dark"
                    }`}
                  >
                    {conf.city}
                  </h3>
                  <div
                    ref={(el) => {
                      arrowRefs.current[index] = el;
                    }}
                    className="w-[65px] flex justify-end"
                    style={{
                      opacity: conf.active ? 1 : 0,
                      transform: conf.active
                        ? "translateY(0)"
                        : "translateY(-20px)",
                    }}
                  >
                    <svg
                      width="32"
                      height="16"
                      viewBox="0 0 48 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-text-dark"
                    >
                      <path
                        d="M36 4L44 12L36 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 12H44"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 hidden md:flex flex-row items-center justify-between max-w-[1440px] mx-auto">
                  <div
                    className={`flex-1 max-w-[160px] lg:max-w-[420px] flex justify-start lg:justify-end transition-all duration-500 ${conf.active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"}`}
                  >
                    <span className="font-sans text-lg md:text-base lg:text-xl lg:tracking-[0.4px] lg:-mt-3 text-text-medium font-medium whitespace-nowrap">
                      {conf.date}
                    </span>
                  </div>

                  <div className="flex-2 flex justify-center">
                    <h3
                      className={`font-headline text-[64px] lg:text-[80px] leading-tight text-center font-normal cursor-pointer transition-colors duration-500 whitespace-nowrap ${
                        conf.active
                          ? "text-text-dark"
                          : "text-dark-gray group-hover:text-text-dark"
                      }`}
                    >
                      {conf.city}
                    </h3>
                  </div>
                  <div
                    className={`flex-1 max-w-[160px] lg:max-w-[420px] flex justify-end lg:justify-start transition-all duration-500 ${conf.active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"}`}
                  >
                    <svg
                      width="56"
                      height="28"
                      viewBox="0 0 48 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-text-dark"
                    >
                      <path
                        d="M36 4L44 12L36 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 12H44"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {hoveredConference &&
        createPortal(
          <div
            ref={hoverCardRef}
            className="hidden lg:flex bg-white border border-solid relative"
            style={{
              ...getCardStyle(),
              borderImageSource:
                "linear-gradient(70.45deg, var(--color-dark-gray) 17.57%, var(--color-dark-gray-0) 50.86%, var(--color-dark-gray-0) 76.37%, var(--color-dark-gray) 96.54%)",
              borderImageSlice: 1,
              boxShadow: "4px 4px 8px 0px var(--color-black-5)",
            }}
          >
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-dark-gray z-10"></div>
            <div className="hover-card-image w-60 flex-none overflow-hidden">
              <img
                src={hoveredConference.image || "/location.jpg"}
                alt={hoveredConference.city}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 bg-background p-5 lg:p-5 flex flex-col justify-center gap-4">
              <div className="flex flex-col text-sm font-sans divide-y divide-divider ">
                <div className="hover-card-detail pt-3 pb-2">
                  <span className="text-dark-gray uppercase tracking-widest text-xs font-medium">
                    Location
                  </span>
                  <p className="text-text-dark mt-1  leading-snug">
                    {hoveredConference.location || hoveredConference.city}
                  </p>
                </div>
                <div className="hover-card-detail py-2">
                  <span className="text-dark-gray uppercase tracking-[0.14em] text-xs font-medium">
                    Dates
                  </span>
                  <p className="text-text-dark mt-1  leading-snug">
                    {hoveredConference.date}
                  </p>
                </div>
                <div className="hover-card-detail py-2">
                  <span className="text-dark-gray uppercase tracking-[0.14em] text-xs font-medium">
                    Audience Size
                  </span>
                  <p className="text-text-dark mt-1 text-[14px] leading-snug">
                    {hoveredConference.audienceSize}
                  </p>
                </div>
                <div className="hover-card-detail py-2">
                  <span className="text-dark-gray uppercase tracking-[0.14em] text-xs font-medium">
                    Format
                  </span>
                  <p className="text-text-dark mt-1  leading-snug">
                    {hoveredConference.format}
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default ConferenceListWithImage;
