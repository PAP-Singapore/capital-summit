import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Marquee, MarqueeHandle } from "../ui/marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import ButtonNew from "../ui/ButtonNew";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll";
import { speakersUI } from "../../data/speakers";
import SpeakerCard from "../ui/SpeakerCard";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Speakers: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<MarqueeHandle>(null);
  const headingRef = useFadeInOnScroll<HTMLDivElement>({
    y: 30,
    duration: 0.7,
  });

  useGSAP(
    () => {
      if (!starRef.current) return;

      gsap.to(starRef.current, {
        motionPath: {
          path: [
            { x: 150, y: -15 },
            { x: 300, y: -30 },
            { x: 450, y: -40 },
            { x: 600, y: -42 },
          ],
          curviness: 1.5,
        },
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef },
  );
  return (
    <>
      <section className="w-full bg-background relative overflow-hidden pt-12 pb-10 md:pb-[72px] lg:pb-[112px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] md:w-[110%] lg:h-[400px] h-[300px] bg-[radial-gradient(86%_66%_at_110%_0%,var(--color-primary)_18%,var(--color-primary-pale)_58%,var(--color-background)_100%)] md:bg-[radial-gradient(86%_98%_at_110%_0%,var(--color-primary)_18%,var(--color-primary-pale)_58%,var(--color-background)_100%)] lg:bg-[radial-gradient(86%_98%_at_110%_0%,var(--color-primary)_18%,var(--color-primary-pale)_58%,var(--color-background)_100%)] rounded-t-[100%] border-t border-border-warm ">
          <div className="absolute top-5 left-[26%] lg:top-17 lg:left-[12%] -translate-x-1/2 -translate-y-1/2">
            <img
              src="/arcicon.svg"
              alt="Decorative Star"
              className=" w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 opacity-80"
            />
          </div>
        </div>

        <div className="max-w-full mx-auto  relative z-10 pt-10 md:pt-16  lg:pt-37.5">
          <div
            ref={headingRef}
            className="text-center max-w-4xl mx-auto mb-0 lg:mb-16 px-5 md:px-10 lg:px-20"
          >
            <h2 className="font-headline text-base md:text-2xl lg:text-[40px] font-light leading-[1.2] text-text-medium mb-8">
              <span className="text-primary-soft">Speakers</span> shaping the
              <br /> stablecoin ecosystem
            </h2>
          </div>

          {/* Speakers Marquee */}
          <div className="relative mt-8 md:mt-[70px] lg:mt-[72px]">
            <Marquee
              ref={marqueeRef}
              pauseOnHover
              draggable
              className="[--duration:90s] [--gap:2rem] relative z-[2]"
            >
              {speakersUI.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </Marquee>

            <div className="absolute  left-0 w-full h-px bg-border lg:top-[340px] md:top-[268px] top-[198px]"></div>
            <div
              className="absolute top-0 left-0 w-full h-px bg-border"
              style={{ top: "calc(7px)" }}
            ></div>
          </div>

          {/* Mobile Arrow Buttons */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button
              onClick={() => marqueeRef.current?.scrollBy(250)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-medium active:bg-primary active:text-white active:border-primary transition-colors"
              aria-label="Scroll left"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => marqueeRef.current?.scrollBy(-250)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-medium active:bg-primary active:text-white active:border-primary transition-colors"
              aria-label="Scroll right"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* <div className="lg:mt-24 md:mt-16 mt-10 flex justify-center">
            <ButtonNew variant="outline" onClick={() => navigate("/speakers")}>
              View All Speakers
            </ButtonNew>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Speakers;
