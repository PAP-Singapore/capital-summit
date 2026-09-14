import React from "react";

const HeroVisual2: React.FC = () => {
  return (
    <div className="w-full h-[68vw] md:h-[68vw] lg:w-[36.5%] lg:h-[calc(100vh-86px)] lg:sticky lg:top-[86px] lg:self-start order-first lg:order-last px-5 lg:px-0 relative  md:mt-0 hero-visual-fade-in overflow-hidden">
      <div className="decorative-line-top absolute top-0.75 md:top-1.25 left-0 right-5 block lg:hidden z-10"></div>
      <div className="overflow-hidden mt-0.75 block md:hidden bg-background">
        {/* <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden w-full h-full object-contain object-center -translate-y-10 bg-background"
        /> */}
        <img
          src="/capital-mobile.png"
          alt=""
          className="block md:hidden w-full h-full object-contain object-center bg-background"
        />
      </div>
      <div className="decorative-line-bottom absolute bottom-0 md:bottom-0 left-0 right-5 block z-10 lg:hidden"></div>
      <div className="mt-1.25 overflow-hidden hidden md:block lg:hidden bg-background!">
        {/* <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block lg:hidden w-[120%] h-full object-contain -translate-y-28 bg-background! "
        /> */}
        <img
          src="/capital-mobile.png"
          alt=""
          className="hidden md:block lg:hidden w-full h-full object-contain object-center bg-background!"
        />
      </div>
      <div className="w-[100%] h-[99.7%] overflow-hidden hidden lg:block bg-background!">
        {/* <video
          src="/herosection-video.webm"
          autoPlay
          loop
          muted
          playsInline
          className="hidden lg:block w-full h-full object-cover object-left bg-background! "
        /> */}
        <img
          src="/capital-desktop.png"
          alt=""
          className="hidden lg:block w-full h-full object-contain object-center bg-background!"
        />
      </div>
    </div>
  );
};

export default HeroVisual2;
