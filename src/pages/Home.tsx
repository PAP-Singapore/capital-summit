import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { LeftVerticalLine } from "../components/home/LeftVerticalLine";
import BottomSection from "../components/home/BottomSection";
import { Conference, conferences } from "../components/home/ConferenceList";
import Audience from "../components/home/Audience";
import Speakers from "../components/home/Speakers";
import Partners from "../components/home/Partners";
import ConferenceListWithImage from "../components/home/ConferenceListWithImage";
import ButtonNew from "../components/ui/ButtonNew";
import HeroVisual from "../components/home/HeroVisual";
import Archive from "../components/home/Archive";
import { BUY_TICKETS_URL, APPLY_FOR_SPONSORS_URL } from "../data/constants";

const Home = () => {
  const [, setHoveredConference] = useState<Conference | null>(conferences[0]);
  const [, setIsHoveringDetail] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      return;
    }

    const headerLine = document.querySelector(".intro-line-header");
    const headerVerticalLine = document.querySelector(
      ".intro-line-header-vertical",
    );
    const orangeSquare = document.querySelectorAll(".intro-orange-square");
    const verticalLine = document.querySelector(".intro-line-vertical");
    const bottomLine = document.querySelector(".intro-line-bottom");
    const heroVisual = document.querySelector(".hero-visual-fade-in");
    const fadeIntroHeader = document.querySelectorAll(".fade-in-intro-header");
    const fadeintroHeroTitle = document.querySelector(
      ".fade-in-intro-hero-title",
    );
    const fadeInDescription = document.querySelectorAll(
      ".fade-in-intro-hero-description",
    );
    const fadeInButtons = document.querySelectorAll(".fade-in-buttons");
    const fadeInSupporting = document.querySelectorAll(".fade-in-supporting");
    const fadeIntro = document.querySelectorAll(".fade-in-intro");

    // Set initial state - lines hidden via clipPath
    gsap.set(headerLine, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(headerVerticalLine, { clipPath: "inset(100% 0 0 0)" });
    gsap.set(orangeSquare, { opacity: 0 });
    gsap.set(verticalLine, { clipPath: "inset(0 0 100% 0)" });
    gsap.set(bottomLine, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(heroVisual, { opacity: 0, y: 10 });
    gsap.set(fadeIntroHeader, { opacity: 0, clipPath: "inset(0 0 100% 0)" });
    gsap.set(fadeintroHeroTitle, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
    gsap.set(fadeInDescription, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
    gsap.set(fadeInButtons, { opacity: 0, clipPath: "inset(0 0 100% 0)" });
    gsap.set(fadeInSupporting, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
    gsap.set(fadeIntro, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([headerLine, headerVerticalLine, verticalLine, bottomLine], {
          clipPath: "inset(0 0 0 0)",
        });
        gsap.set(orangeSquare, { opacity: 1 });
      },
    });

    tl.to(
      verticalLine,
      { clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: "power2.inOut" },
      1,
    );

    tl.to(
      headerLine,
      { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut" },
      0.3,
    );

    tl.to(
      headerVerticalLine,
      { clipPath: "inset(0 0 0 0)", duration: 1, ease: "power2.inOut" },
      0.2,
    );

    tl.to(orangeSquare, { opacity: 1, duration: 0.4, ease: "power2.out" }, 1.2);

    tl.to(
      bottomLine,
      { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut" },
      0.5,
    );

    tl.to(
      heroVisual,
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.Out", stagger: 0.1 },
      2,
    );

    tl.to(
      fadeIntroHeader,
      {
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: "power2.out",
      },
      2.4,
    );

    tl.to(
      fadeintroHeroTitle,
      {
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 0.8,
        ease: "power2.out",
      },
      3,
    );
    tl.to(
      fadeInDescription,
      {
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 0.6,
        ease: "power2.out",
      },
      3.4,
    );
    tl.to(
      fadeInButtons,
      {
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.6,
        ease: "power2.out",
      },
      3.8,
    );

    tl.to(
      fadeInSupporting,
      {
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 0.6,
        ease: "power2.out",
      },
      4.2,
    );

    tl.to(fadeIntro, { opacity: 1, duration: 0.6, ease: "power2.Out" }, 2);

    return () => {
      tl.kill();
    };
  }, []);

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);

    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHoveringDetail((prev) => {
        if (!prev) setHoveredConference(conferences[0]);
        return prev;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <LeftVerticalLine />
      <div id="hero-section" className="relative flex flex-col lg:flex-row">
        <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-border z-10 pointer-events-none"></div>
        <div className="relative flex flex-col flex-1 w-full lg:w-[63.5%]">
          <div
            className="intro-line-vertical hidden lg:block absolute top-0 right-0 bottom-0 w-px z-10"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-border) 0%, var(--color-border) 100%)",
            }}
          ></div>
          <div className="flex flex-col lg:h-[calc(100vh-89px)] lg:min-h-[620px]">
            <main className="lg:flex-1 flex flex-col justify-center px-5 pt-[30px] pb-9 md:px-8 md:pb-16 md:pt-[38px] lg:px-10 lg:py-0 lg:pt-12 md:text-left lg:text-left fade-in-intro">
              <div className="max-w-4xl md:max-w-full lg:max-w-4xl mx-0 md:mx-0 lg:mx-0 w-full">
                <h1 className="font-headline text-[36px] sm:text-[48px] md:text-[64px] lg:text-[60px] xl:text-[80px] mb-2 md:mb-6 lg:mb-[60px] leading-[100%] tracking-[-1.25px] font-normal fade-in-intro-hero-title">
                  <span className="text-text-medium md:text-medium lg:text-text-medium">
                    The Global{" "}
                  </span>
                  <span className="text-primary">Stablecoin</span>
                  <br />
                  <span className="text-primary">Conference Series</span>
                </h1>
                <p className="font-headline text-base md:text-[28px] lg:text-[32px] text-text-medium md:text-medium mb-7 md:mb-10 lg:mb-[55px] font-light max-w-xl md:max-w-md lg:max-w-2xl md:mx-0 lg:mx-0 leading-[100%] tracking-[0%] lg:tracking-[0%] fade-in-intro-hero-description">
                  Where stablecoin builders, issuers, institutions and
                  regulators convene
                </p>
                <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
                  <div className="flex w-full md:w-auto gap-3 md:gap-4 max-[360px]:flex-col fade-in-buttons">
                    <a
                      href={BUY_TICKETS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ButtonNew>Get Tickets</ButtonNew>
                    </a>
                    <a target="_blank" href={APPLY_FOR_SPONSORS_URL}>
                      <ButtonNew variant="outline">Apply to Sponsor</ButtonNew>
                    </a>
                  </div>
                  <div className="font-sans text-sm md:text-base lg:hidden text-text-dark md:text-black md:ml-auto fade-in-supporting lg:mb-6">
                    <div className="font-medium text-xs md:text-base">
                      Convene: 360 Madison Ave, New York, NY 10017, United
                      States
                    </div>
                    <div className="font-normal text-xs md:text-base md:text-right">
                      → 2026
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/*
              <div className="hidden lg:block lg:mt-auto px-10 pb-10 fade-in-supporting">
              <div className="font-sans text-base text-text-dark">
                <div className="font-medium lg:text-[20px]">Singapore</div>
                <div className="font-normal lg:text-xl">→ October 8, 2026</div>
              </div>
            </div>
            */}
          </div>
          <BottomSection />
        </div>
        <HeroVisual />
      </div>
      <ConferenceListWithImage />
      <Speakers />
      <Audience />
      <Partners />
      <Archive />
    </div>
  );
};

export default Home;
