import React, { useRef, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import gsap from "gsap";
import ButtonNew from "./ui/ButtonNew";
import { navItems, BUY_TICKETS_URL } from "../data/constants";

const HomeHeader: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/home";
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuFullyClosed, setMenuFullyClosed] = useState(true);

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
  useEffect(() => {
    if (isHome || typeof window === "undefined") return;

    const header = headerRef.current;
    if (!header || window.innerWidth < 1024) return;

    const headerLine = document.querySelector(".intro-line-header");

    const fadeElsHeader = header.querySelectorAll(".fade-in-intro-header");
    if (!headerLine) return;

    gsap.set(headerLine, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(fadeElsHeader, { opacity: 0, clipPath: "inset(0 0 100% 0)" });

    const tl = gsap.timeline({
      onComplete: () => {
        // Set final visible state explicitly (don't use clearProps as CSS has hidden state)
        gsap.set([headerLine], {
          clipPath: "inset(0 0 0 0)",
        });
      },
    });

    tl.to(
      headerLine,
      { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut" },
      0,
    ).to(
      fadeElsHeader,
      {
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: "power2.out",
      },
      0.6,
    );

    return () => {
      tl.kill();
    };
  }, [isHome, pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  // GSAP clipPath animation for menu open/close
  useEffect(() => {
    const desktopMenu = desktopMenuRef.current;
    const mobileMenu = mobileMenuRef.current;

    if (isMenuOpen) {
      setMenuFullyClosed(false);
      // Open: clip from top to bottom
      if (desktopMenu) {
        gsap.set(desktopMenu, {
          clipPath: "inset(0 0 100% 0)",
          visibility: "visible",
        });
        gsap.to(desktopMenu, {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
      if (mobileMenu) {
        gsap.set(mobileMenu, {
          clipPath: "inset(0 0 100% 0)",
          visibility: "visible",
        });
        gsap.to(mobileMenu, {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    } else {
      // Close: clip from bottom to top
      const onCloseComplete = () => {
        setMenuFullyClosed(true);
      };
      if (desktopMenu) {
        gsap.to(desktopMenu, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(desktopMenu, { visibility: "hidden" });
            onCloseComplete();
          },
        });
      }
      if (mobileMenu) {
        gsap.to(mobileMenu, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(mobileMenu, { visibility: "hidden" });
            onCloseComplete();
          },
        });
      }
    }
  }, [isMenuOpen]);

  const introClass = "fade-in-intro-header";

  return (
    <>
      <header
        ref={headerRef}
        className="flex items-center justify-between px-5 pb-4 pt-4 md:px-10 md:py-5 lg:px-12 lg:py-5 w-full sticky top-0 z-9999 bg-background"
      >
        <div
          className={`intro-line-header absolute bottom-0 left-0 right-0 h-px hidden lg:block transition-opacity duration-500 ease-out ${
            isMenuOpen ? "opacity-0" : "opacity-100"
          }`}
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
                hasScrolled || !menuFullyClosed
                  ? "opacity-0 bg-transparent w-0 h-0"
                  : "opacity-100"
              }`}
            />
            <div
              className={`intro-line-header-vertical hidden lg:block absolute right-[36.5%] top-0 bottom-0 w-px z-10 pointer-events-none transition-opacity duration-500 ease-out ${
                hasScrolled || !menuFullyClosed ? "opacity-0" : "opacity-100"
              }`}
              style={{
                background:
                  "linear-gradient(to top, var(--color-border) 0%, var(--color-border) 60%, transparent 100%)",
              }}
            />
          </>
        )}

        <div className={`flex items-center gap-2 md:gap-3 ${introClass}`}>
          {/* Logo */}
          <Link to="/">
            <span className="font-headline font-semibold text-2xl md:text-3xl leading-none tracking-tight text-charcoal whitespace-nowrap">
              Capital Summit
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}

        <div className={`flex items-center gap-4 lg:gap-6 ${introClass}`}>
          <a
            href={BUY_TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:block transition-opacity duration-500 ${!hasScrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <ButtonNew>Buy Tickets</ButtonNew>
          </a>

          <a
            href={BUY_TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`lg:hidden ${isMenuOpen ? "hidden md:block" : "block"}`}
          >
            <ButtonNew>Buy Tickets</ButtonNew>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="flex flex-col justify-center gap-1 w-5 h-5 z-100 relative "
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

        {/* Desktop dropdown  */}
        <div
          ref={desktopMenuRef}
          className="absolute top-full left-0 w-full bg-background z-90 shadow-lg overflow-hidden hidden lg:flex flex-col"
          style={{ visibility: "hidden", clipPath: "inset(0 0 100% 0)" }}
        >
          <nav className="w-full grid grid-cols-7 min-h-[86px] h-fit border-b border-background">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className={`relative flex items-center justify-center group overflow-hidden ${
                  index === 0 ? "col-start-3" : ""
                }`}
              >
                {/* Hover gradient from bottom */}
                <div className="absolute inset-0 z-0 flex justify-center items-end pointer-events-none origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100">
                  <div className="w-[300%] h-[140px] bg-[radial-gradient(ellipse_at_bottom,var(--color-primary-light)_40%,transparent_71%)] translate-y-1/2 relative top-[30px]"></div>
                </div>
                <div className="absolute right-0 top-0 w-px h-full bg-[linear-gradient(90deg,var(--color-dark-gray-20)_0%,var(--color-dark-gray)_49.18%)]"></div>
                {item.type === "internal" ? (
                  <Link
                    to={item.href}
                    className="relative z-10 text-[26px] font-headline font-normal text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 text-[26px] font-headline font-normal text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </div>
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

        {/* Mobile Menu Dropdown */}
        <div
          ref={mobileMenuRef}
          className="absolute top-full left-0 w-full bg-background z-90 shadow-lg overflow-hidden flex lg:hidden flex-col h-[calc(100vh-62px)]"
          style={{ visibility: "hidden", clipPath: "inset(0 0 100% 0)" }}
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

export default HomeHeader;
