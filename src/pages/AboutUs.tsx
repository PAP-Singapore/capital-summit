import { useState } from "react";
import "../styles/about.css";
import { conferences } from "../data/conferences";
import ButtonNew from "../components/ui/ButtonNew";
import VenueCarousel from "../components/about-us/VenueCarousel";
import VenueCarouselMobile from "../components/about-us/VenueCarouselMobile";

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + conferences.length) % conferences.length,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % conferences.length);
  };

  const getIndex = (offset: number) =>
    (activeIndex + offset + conferences.length) % conferences.length;

  return (
    <section className="about overflow-x-hidden">
      <div className="lg:h-[calc(100vh-84px)] lg:min-h-155 relative">
        <div className="hidden lg:block bottom-border"></div>
        <div className="flex flex-col-reverse lg:flex-row h-full">
          <div className="w-full lg:w-1/2 h-full flex items-center py-12 relative">
            <div className="hidden lg:block hero-left"></div>
            <div className="pl-5 md:pl-10 lg:pl-12 pr-5 lg:pr-8 max-w-180">
              <h3 className="font-headline font-normal lg:font-light text-[24px] md:text-[32px] lg:text-[40px] leading-[26.4px] md:leading-[30.8px] lg:leading-11 text-text-medium -tracking-[0.24px] md:tracking-normal mt-6 lg:mt-0">
                <span className="text-primary">Capital Summit</span> exists to
                bring institutional capital and onchain infrastructure into the
                same room
              </h3>
              <p className="text-text-medium text-xl md:text-[24px] lg:text-[28px] font-headline font-light leading-[24px] md:leading-[28.8px] lg:leading-[33.6px] mt-5 lg:mt-9">
                The summit is intentionally neutral, independent, and focused on
                infrastructure-level truth rather than marketing narratives
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-[85vw]  md:h-[65vw] lg:h-full">
            <div className="bg-right h-full relative overflow-hidden">
              <div className="inner-gradient">
                <div className="top-diamond"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="relative px-5 md:px-10 lg:px-12">
        <div className="hidden lg:block bottom-border"></div>
        <div className="pt-0 lg:pt-14 pb-14 mx-auto lg:max-w-[816px]">
          <p className="text-text-medium text-xl md:text-[24px] lg:text-[28px] font-headline font-light leading-[24px] md:leading-[28.8px] lg:leading-[33.6px] lg:text-center -mt-6 lg:mt-0">
            The programme is intentionally practical — focused on the {""}
            <span className="text-primary">
              focused on the execution, compliance and risk
            </span>{" "}
            conditions institutions need before committing capital at size, not
            the case for adoption
          </p>
        </div>
      </section>

      <section className="hidden lg:block">
        <VenueCarousel />
      </section>

      <section className="block lg:hidden">
        <VenueCarouselMobile />
      </section>

      <section>
        <div className="flex flex-col lg:flex-row">
          <div className="top-line block lg:hidden"></div>
          <div className="w-full lg:w-1/2 py-0 lg:py-18.5 px-5 md:px-10 lg:px-12 relative ">
            <div className="w-2 h-2 absolute -right-1 bg-primary z-99999 -top-1.5 hidden lg:block"></div>
            <div className="left-defi hidden lg:block"></div>
            <p className="text-text-medium text-xl md:text-[24px] lg:text-[28px] font-headline font-light leading-[24px] md:leading-[28.8px] lg:leading-[33.6px] mt-10 lg:mt-0 lg:max-w-[628px]">
              Capital Summit is produced by{" "}
              <span className="text-primary">Party Action People,</span> an
              independent conference and research organisation focused on DeFi,
              stablecoins, and financial infrastructure
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient mt-8 lg:mt-0 pb-10 lg:pb-0">
            <img src="/pap-logo.png" alt="pap-logo" className="w-13 lg:w-20" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutUs;
