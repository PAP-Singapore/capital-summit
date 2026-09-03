import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const BottomSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gradientSize = useRef({ size: 25 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (sectionRef.current && isDesktop) {
      sectionRef.current.style.background = `radial-gradient(circle at 100% 0%, var(--color-primary-light) -20%, var(--color-primary-light) -25%, transparent 25%)`;
    } else if (sectionRef.current) {
      sectionRef.current.style.background = "transparent";
    }
  }, [isDesktop]);

  const handleMouseEnter = useCallback(() => {
    if (!isDesktop) return;
    const section = sectionRef.current;
    if (!section) return;

    gsap.to(gradientSize.current, {
      size: 40,
      duration: 3,
      ease: "power2.out",
      onUpdate: () => {
        const { size } = gradientSize.current;
        section.style.background = `radial-gradient(circle at 100% 0%, var(--color-primary-light) -20%, var(--color-primary-light) -25%, transparent ${size}%)`;
      },
    });
  }, [isDesktop]);

  const handleMouseLeave = useCallback(() => {
    if (!isDesktop) return;
    const section = sectionRef.current;
    if (!section) return;

    gsap.to(gradientSize.current, {
      size: 25,
      duration: 3,
      ease: "power2.out",
      onUpdate: () => {
        const { size } = gradientSize.current;
        section.style.background = `radial-gradient(circle at 100% 0%, var(--color-primary-light) -20%, var(--color-primary-light) -25%, transparent ${size}%)`;
      },
    });
  }, [isDesktop]);

  return (
    <div className="relative flex flex-col text-xs text-text-light font-sans footer-section px-5 lg:px-0">
      <div className="decorative-line-bottom w-full block lg:hidden"></div>
      <div
        className="intro-line-bottom hidden lg:block absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, var(--color-border) 20px, var(--color-border) 100%)",
        }}
      ></div>
      <div
        className="hidden lg:block absolute bottom-0 left-0 w-[157.5%] h-[1.5px]"
        style={{
          background:
            "linear-gradient(to right, transparent 3%, var(--color-border) 88%, var(--color-border) 80%, transparent 95%)",
        }}
      ></div>
      <div className="intro-line-bottom hidden lg:block absolute top-0 right-0 w-[8px] h-[8px] bg-primary transform translate-x-1/2 -translate-y-1/2 z-20"></div>
      <section
        ref={sectionRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full lg:px-5 px-0 py-10 md:px-8 md:py-16 lg:px-10 lg:pt-[100px] lg:pb-[134px]"
      >
        <div className="max-w-4xl md:max-w-full lg:max-w-4xl mx-0 md:mx-0 lg:mx-0 w-full">
          <h2 className="font-headline text-[16px] md:text-[28px] lg:text-[32px] leading-[110%]  mb-5 md:mb-8 text-text-medium font-light">
            <span className="text-primary">Stable Summit</span> is the world's
            leading conference series dedicated to stablecoins and programmable
            money
          </h2>
          <div className="flex flex-col gap-5 text-text-medium font-sans text-xs md:text-base lg:text-xl font-normal leading-tight max-w-3xl">
            <p>
              Since 2023, Stable Summit has convened senior builders, protocol
              teams, stablecoin issuers, financial institutions, and
              policymakers across multiple continents.
            </p>
            <p>
              The summit operates as a neutral, technically rigorous forum
              focused on real-world deployment, risk, and infrastructure.
            </p>
          </div>
        </div>
      </section>
      <div className="decorative-line-bottom mb-5 md:mb-6 w-full block lg:hidden"></div>
      <div className="block lg:hidden relative"></div>
    </div>
  );
};

export default BottomSection;
