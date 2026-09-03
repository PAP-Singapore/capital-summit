import { useRef, useState } from "react";
import gsap from "gsap";
import { conferences } from "../../data/conferences";
import ButtonNew from "../ui/ButtonNew";
import { Link } from "react-router-dom";
import { cityToSlug } from "../../utils/cities";
import { BUY_TICKETS_URL } from "../../data/constants";

const VenueCarouselMobile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const navigate = (newIndex: number, direction: "left" | "right") => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const exitX = direction === "right" ? "-100%" : "100%";
    const enterX = direction === "right" ? "100%" : "-100%";
    const targets = [imageRef.current, titleRef.current].filter(Boolean);

    gsap.killTweensOf(targets);

    gsap.to(targets, {
      x: exitX,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(newIndex);
        gsap.set(targets, { x: enterX });
        gsap.to(targets, {
          x: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            isAnimating.current = false;
          },
        });
      },
    });
  };

  const handlePrev = () => {
    const newIndex =
      (activeIndex - 1 + conferences.length) % conferences.length;
    navigate(newIndex, "left");
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % conferences.length;
    navigate(newIndex, "right");
  };

  return (
    <div className="pt-1.5 pb-9.5">
      <div className="bg-[url(/bg-venues-mobile.svg)] bg-no-repeat bg-cover md:bg-contain bg-center w-full h-auto px-5 md:px-10">
        <div className="pt-6.5 pb-10">
          <div className="overflow-hidden flex justify-center">
            <div ref={titleRef} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary mb-1 shrink-0"></div>
              <h3 className="text-[24px] md:text-[32px] font-headline font-normal lg:font-light text-text-medium -tracking-[0.24px] md:tracking-normal whitespace-nowrap">
                {conferences[activeIndex].city}
              </h3>
            </div>
          </div>

          <div className="mt-5 w-full h-[250px] md:h-[400px] img-div relative overflow-hidden">
            <div ref={imageRef} className="w-full h-full">
              <img
                src={conferences[activeIndex].image}
                alt={conferences[activeIndex].city}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="flex justify-center gap-8 items-center mt-7 mb-4">
            <img
              src="/arrow-left.svg"
              alt="arrow-left"
              onClick={handlePrev}
              className="cursor-pointer"
              width={15}
              height={9}
            />
            <img
              src="/arrow-right.svg"
              alt="arrow-right"
              onClick={handleNext}
              className="cursor-pointer"
              width={15}
              height={9}
            />
          </div>
        </div>
      </div>
      <div className="flex -mt-6 justify-center">
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
  );
};

export default VenueCarouselMobile;
