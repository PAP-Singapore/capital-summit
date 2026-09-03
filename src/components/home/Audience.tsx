import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll";

gsap.registerPlugin(ScrollTrigger);

const audienceItems = [
  "Stablecoin Protocol Teams",
  "DeFi Infrastructure & Middleware",
  "Fintech & Payments Companies",
  "Banks, Funds & Institutions",
  "Regulators & Policy-Adjacent Stakeholders",
];

const Audience: React.FC = () => {
  const section2Ref = useRef<HTMLElement>(null);
  const list2Ref = useRef<HTMLDivElement>(null);
  const headlineRef = useFadeInOnScroll<HTMLHeadingElement>({
    y: 25,
    duration: 0.6,
    start: "top 95%",
  });

  useGSAP(
    () => {
      if (list2Ref.current) {
        const items =
          list2Ref.current.querySelectorAll<HTMLElement>(".audience-opacity");
        gsap.set(items, { clipPath: "inset(0 100% 0 0)" });
        gsap.to(items, {
          clipPath: "inset(0 0% 0 0)",
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: list2Ref.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }
    },
    { scope: section2Ref },
  );

  return (
    <>
      <section
        ref={section2Ref}
        className="w-full bg-background py-10 md:py-[72px] lg:py-[90px] px-5 md:px-10 lg:px-11"
      >
        <div className="max-w-[1440px] mx-auto">
          <h2
            ref={headlineRef}
            className="font-headline text-base md:text-[28px] lg:text-[40px] font-light leading-[20.6px] md:leading-none lg:leading-[1.1] text-text-medium mb-5 md:mb-6 lg:mb-18 max-w-[250px] md:max-w-[450px] lg:max-w-[620px]"
            style={{ fontWeight: 300 }}
          >
            Built for <br></br> decision-makers and implementers
          </h2>

          <div ref={list2Ref} className="flex flex-col ">
            {audienceItems.map((item, index) => (
              <h3
                key={index}
                className="audience-opacity font-headline text-[20px] md:text-[36px] lg:text-[76px] font-normal leading-[1.05] text-dark-gray cursor-default tracking-[-0.02em]"
              >
                {item}
              </h3>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Audience;
