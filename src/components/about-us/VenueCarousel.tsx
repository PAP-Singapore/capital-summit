import React, { useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import ButtonNew from "../ui/ButtonNew";
import { conferences } from "../../data/conferences";
import { Link } from "react-router-dom";
import { cityToSlug } from "../../utils/cities";
import { BUY_TICKETS_URL } from "../../data/constants";

const VenueCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // Two image slots that alternate as current/incoming
  const [slotAIndex, setSlotAIndex] = useState(0);
  const [slotBIndex, setSlotBIndex] = useState(0);
  const [activeSlot, setActiveSlot] = useState<"a" | "b">("a");

  const trackRef = useRef<HTMLDivElement>(null);
  const slotARef = useRef<HTMLDivElement>(null);
  const slotBRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const getIndex = (offset: number) =>
    (activeIndex + offset + conferences.length) % conferences.length;

  const navigate = (newIndex: number, direction: "left" | "right") => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const exitX = direction === "right" ? "-100%" : "100%";
    const enterX = direction === "right" ? "100%" : "-100%";

    const currentRef = activeSlot === "a" ? slotARef : slotBRef;
    const incomingRef = activeSlot === "a" ? slotBRef : slotARef;
    const nextSlot = activeSlot === "a" ? "b" : "a";

    // Paint the new image into the inactive slot before animating
    flushSync(() => {
      if (activeSlot === "a") setSlotBIndex(newIndex);
      else setSlotAIndex(newIndex);
    });

    // Place incoming off-screen and ensure correct stacking
    gsap.set(currentRef.current, { zIndex: 1 });
    gsap.set(incomingRef.current, { x: enterX, zIndex: 2 });

    // Track: all three cities exit together, then re-enter with new cities
    gsap.to(trackRef.current, {
      x: exitX,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(newIndex);
        gsap.set(trackRef.current, { x: enterX });
        gsap.to(trackRef.current, { x: 0, duration: 0.4, ease: "power2.out" });
      },
    });

    // Images: both slide simultaneously
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveSlot(nextSlot);
        gsap.set(currentRef.current, { x: 0, zIndex: 0 });
        isAnimating.current = false;
      },
    });
    tl.to(
      currentRef.current,
      { x: exitX, duration: 0.5, ease: "power2.inOut" },
      0,
    );
    tl.to(
      incomingRef.current,
      { x: 0, duration: 0.5, ease: "power2.inOut" },
      0,
    );
  };

  const handlePrev = () => {
    navigate(
      (activeIndex - 1 + conferences.length) % conferences.length,
      "left",
    );
  };

  const handleNext = () => {
    navigate((activeIndex + 1) % conferences.length, "right");
  };

  return (
    <div className="flex h-[500px]">
      <div className="w-[50%] h-full relative venues-main">
        <div className="hidden lg:block bottom-border-one-section"></div>
        <div className="venues-bg-img z-0">
          <img src="/bg-venues.svg" alt="Venues" />
        </div>
        <div className="main-content px-8 xl:px-12 max-w-[820px] mx-auto">
          <div className="relative z-1 carousel-container">
            <div ref={trackRef} className="carousel-track">
              {[-1, 0, 1].map((offset) => {
                const idx = getIndex(offset);
                const isActive = offset === 0;
                return (
                  <div
                    className={`flex gap-3 items-center carousel-item ${isActive ? "carousel-item-active" : "carousel-item-side"}`}
                    key={offset}
                  >
                    <div
                      className={`w-2 h-2 bg-primary ${isActive ? "" : "opacity-40"}`}
                    ></div>
                    <h3
                      className={`font-headline font-normal lg:font-light text-text-medium -tracking-[0.24px] md:tracking-normal whitespace-nowrap ${
                        isActive
                          ? "text-[24px] md:text-[32px] lg:text-[40px] leading-[26.4px] md:leading-[30.8px] lg:leading-11"
                          : "text-[16px] md:text-[20px] lg:text-[28px] leading-5 md:leading-6 lg:leading-8.5 opacity-40"
                      }`}
                    >
                      {conferences[idx].city}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="arrow-container">
            <div className="h-10 w-[66px] bg-background flex items-center justify-center">
              <img
                src="/arrow-left.svg"
                alt="arrow-left"
                onClick={handlePrev}
                className="cursor-pointer"
              />
            </div>
            <div className="h-10 w-[66px] bg-background flex items-center justify-center">
              <img
                src="/arrow-right.svg"
                alt="arrow-right"
                onClick={handleNext}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="button-venues">
            {conferences[activeIndex].city === "Singapore" ? (
              <a href={BUY_TICKETS_URL} target="_blank" rel="noopener noreferrer">
                <ButtonNew variant="primary">Get Tickets</ButtonNew>
              </a>
            ) : conferences[activeIndex].city === "Cannes" ||
              conferences[activeIndex].city === "New York City" ? (
              <Link
                to={`/archive?city=${cityToSlug(conferences[activeIndex].city)}`}
              >
                <ButtonNew variant="primary">Go to Archive</ButtonNew>
              </Link>
            ) : (
              <ButtonNew variant="primary">Coming Soon</ButtonNew>
            )}
          </div>
        </div>
      </div>

      {/* Two absolutely-stacked image slots — GSAP slides both at once */}
      <div className="w-[50%] relative overflow-hidden">
        <div ref={slotARef} className="absolute inset-0">
          <img
            src={conferences[slotAIndex].image}
            alt={conferences[slotAIndex].city}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div ref={slotBRef} className="absolute inset-0">
          <img
            src={conferences[slotBIndex].image}
            alt={conferences[slotBIndex].city}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default VenueCarousel;
