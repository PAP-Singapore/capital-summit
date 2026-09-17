import React, { useRef, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ButtonNew from "./ui/ButtonNew";
import { navItems, BUY_TICKETS_URL } from "../data/constants";

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/home";
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // On home page: hide vertical line + dot after user scrolls past hero section
  useEffect(() => {
    if (!isHome || typeof window === "undefined") return;

    const header = headerRef.current;
    if (!header) return;

    const updateScrollState = () => {
      const hero = document.querySelector(
        "#hero-section",
      ) as HTMLElement | null;
      if (!hero) {
        setHasScrolled(false);
        return;
      }

      const headerHeight = header.offsetHeight || 0;

      // When the first fold (one viewport height of content) scrolls past
      // the header, fade out the line + dot.
      const firstFoldPassed =
        window.scrollY >= window.innerHeight - headerHeight;
      setHasScrolled(firstFoldPassed);
    };

    const onScroll = () => {
      updateScrollState();
    };

    const onResize = () => {
      updateScrollState();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Initialize state based on current layout and scroll position
    updateScrollState();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isHome]);

  // On non-home pages: animate bottom line then logo/button (like home intro)
  // useEffect(() => {
  //   if (isHome || typeof window === "undefined") return;

  //   const header = headerRef.current;
  //   if (!header || window.innerWidth < 1024) return;

  //   const headerLine = document.querySelector(".intro-line-header");

  //   const fadeElsHeader = header.querySelectorAll(".fade-in-intro-header");
  //   if (!headerLine) return;

  //   gsap.set(headerLine, { clipPath: "inset(0 100% 0 0)" });
  //   gsap.set(fadeElsHeader, { opacity: 0, clipPath: "inset(0 0 100% 0)" });

  //   const tl = gsap.timeline({
  //     onComplete: () => {
  //       // Set final visible state explicitly (don't use clearProps as CSS has hidden state)
  //       gsap.set([headerLine], {
  //         clipPath: "inset(0 0 0 0)",
  //       });
  //     },
  //   });

  //   tl.to(
  //     headerLine,
  //     { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut" },
  //     0,
  //   ).to(
  //     fadeElsHeader,
  //     {
  //       opacity: 1,
  //       clipPath: "inset(0 0 0% 0)",
  //       duration: 0.8,
  //       ease: "power2.out",
  //     },
  //     0.6,
  //   );

  //   return () => {
  //     tl.kill();
  //   };
  // }, [isHome, pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  // const introClass = "fade-in-intro-header";

  return (
    <>
      <header
        ref={headerRef}
        className="flex items-center justify-between px-5 pb-4 pt-4 md:px-10 md:py-5 lg:px-12 lg:py-5 w-full sticky top-0 z-9999 bg-background"
      >
        {/* Bottom line — Desktop: hidden on home until scrolled (handled by opacity elsewhere/class), visible here otherwise. 
            Actually, logic was: home -> hidden lg:block. non-home -> block (so visible on mobile).
            We change it to: ALWAYS hidden on mobile, visible on desktop.
        */}
        {/* <div
          className={`intro-line-header absolute bottom-0 left-0 right-0 h-px hidden lg:block`}
          style={{
            background:
              "linear-gradient(to right, transparent 0%, transparent 135px, var(--color-border) 50%, transparent 98%)",
          }}
        /> */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px hidden lg:block`}
          style={{
            background:
              "linear-gradient(to right, transparent 0%, transparent 135px, var(--color-border) 50%, transparent 98%)",
          }}
        />

        {/* Bottom line — Mobile: Visible if menu is open OR if not home page */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px lg:hidden ${
            isMenuOpen || !isHome ? "block" : "hidden"
          }`}
          style={{
            background:
              "linear-gradient(to right, var(--color-border) 0%, transparent 100%)",
          }}
        />

        {/* Red/orange dot + vertical line — only on home page, fade out on scroll */}
        {isHome && (
          <>
            <div
              className={`intro-orange-square hidden lg:block absolute bottom-0 right-[36.5%] w-[8px] h-[8px] bg-primary transform translate-x-1/2 translate-y-1/2 z-20 transition-opacity duration-500 ease-out ${
                hasScrolled ? "opacity-0 bg-transparent w-0 h-0" : "opacity-100"
              }`}
            />
            <div
              className={`intro-line-header-vertical hidden lg:block absolute right-[36.5%] top-0 bottom-0 w-px z-10 pointer-events-none transition-opacity duration-500 ease-out ${
                hasScrolled ? "opacity-0" : "opacity-100"
              }`}
              style={{
                background:
                  "linear-gradient(to top, var(--color-border) 0%, var(--color-border) 60%, transparent 100%)",
              }}
            />
          </>
        )}

        {/* <div className={`flex items-center gap-2 md:gap-3 ${introClass}`}> */}
        <div className={`flex items-center gap-2 md:gap-3`}>
          {/* Logo */}
          <Link to="/">
            <img
              src="/stablesummitlogo.svg"
              alt="Capital Summit Logo"
              className="h-8 w-auto md:h-11"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        {/* <nav
          className={`hidden lg:flex items-center gap-6  lg:gap-8 xl:gap-[52px] ${introClass}`}
        > */}
        <nav
          className={`hidden lg:flex items-center gap-6  lg:gap-8 xl:gap-[52px]`}
        >
          {navItems.map((item) => (
            <React.Fragment key={item.label}>
              {item.type === "internal" ? (
                <Link
                  to={item.href}
                  className="text-sm md:text-base lg:text-lg xl:text-xl font-medium text-text-medium hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base lg:text-lg xl:text-xl font-medium text-text-medium hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
                >
                  {item.label}
                </a>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* <div className={`flex items-center gap-4 lg:gap-6 ${introClass}`}> */}
        <div className={`flex items-center gap-4 lg:gap-6`}>
          <a
            href={BUY_TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block"
          >
            <ButtonNew>Buy Tickets</ButtonNew>
          </a>

          <a
            href={BUY_TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`lg:hidden ${isMenuOpen ? "hidden" : "block"}`}
          >
            <ButtonNew>Buy Tickets</ButtonNew>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-center gap-1 w-5 h-5 z-100 relative "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`block w-full h-[1.5px] bg-current transition-transform duration-300 ${
                isMenuOpen
                  ? "rotate-45 translate-y-[5.5px] bg-text-medium"
                  : "bg-text-medium"
              }`}
            ></span>
            <span
              className={`block w-full h-[1.5px] bg-current transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0 bg-text-medium" : "bg-text-medium"
              }`}
            ></span>
            <span
              className={`block w-full h-[1.5px] bg-current transition-transform duration-300 ${
                isMenuOpen
                  ? "-rotate-45 -translate-y-[5.5px] bg-text-medium"
                  : "bg-text-medium"
              }`}
            ></span>
          </button>
        </div>
        {/* Mobile Menu Dropdown */}
        <div
          className={`absolute top-full left-0 w-full bg-background z-90 shadow-lg transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${
            isMenuOpen
              ? "h-[calc(100vh-62px)] md:h-[485px] opacity-100"
              : "h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col w-full flex-1">
            {navItems.map((item) => (
              <React.Fragment key={item.label}>
                {item.type === "internal" ? (
                  <Link
                    to={item.href}
                    className="px-5 py-5 md:px-10 md:py-8 text-[32px] md:text-4xl font-headline text-text-medium hover:text-primary transition-colors block text-left leading-normal md:leading-[0.9]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-5 md:px-10 md:py-8 text-[32px] md:text-4xl font-headline text-text-medium hover:text-primary transition-colors block text-left leading-normal md:leading-[0.9]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
                {/* Separator gradient */}
                <div
                  className="h-px w-full"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-border) 0%, transparent 100%)",
                  }}
                />
              </React.Fragment>
            ))}
          </nav>

          {/* Mobile Menu Bottom Button */}
          <div className="p-5 mt-auto mb-8 md:hidden">
            <a
              href={BUY_TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <ButtonNew className="w-full text-xl py-5">Buy Tickets</ButtonNew>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
