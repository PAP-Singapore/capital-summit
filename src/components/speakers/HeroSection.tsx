import React from "react";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedRole: string;
  setSelectedRole: (val: string) => void;
  selectedDate: string | null;
  setSelectedDate: (val: string | null) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (val: boolean) => void;
  uniqueRoles: string[];
}

export const HeroSection: React.FC<
  Omit<
    HeroSectionProps,
    | "searchQuery"
    | "setSearchQuery"
    | "selectedRole"
    | "setSelectedRole"
    | "selectedDate"
    | "setSelectedDate"
    | "isDropdownOpen"
    | "setIsDropdownOpen"
    | "uniqueRoles"
  >
> = () => {
  return (
    <section className="w-full bg-background relative overflow-hidden pt-14 pb-0 md:pt-12">
      {/* Left Gradient Element */}
      <div className="absolute -top-20 md:-top-36 left-0 w-[300px] h-[400px] md:w-[500px] md:h-[600px] lg:w-[627px] lg:h-[909px] pointer-events-none bg-[linear-gradient(132.16deg,var(--color-background-0)_63.24%,var(--color-border-light-2)_73%,var(--color-primary)_107.55%)] opacity-100 rotate-90 -scale-x-100"></div>

      {/* Right Gradient Element */}
      <div className="absolute -top-20 md:-top-36 right-0 w-[300px] h-[400px] md:w-[500px] md:h-[600px] lg:w-[627px] lg:h-[909px] pointer-events-none bg-[linear-gradient(132.16deg,var(--color-background-0)_63.24%,var(--color-border-light-2)_73%,var(--color-primary)_107.55%)]  opacity-100 -rotate-90"></div>

      <div className="max-w-full mx-auto relative z-10 pt-0 md:pt-12 lg:pt-10">
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-1 md:mb-12 lg:mb-10 px-5 md:px-10 lg:px-20">
          <h1 className="font-headline text-[32px] md:text-[64px] lg:text-[80px] font-normal leading-[1.1] text-text-medium mb-4 md:mb-5.5">
            Meet the <span className="text-primary font-normal">Speakers</span>
          </h1>
          <p className="font-headline text-xl md:text-[28px] lg:text-[32px] font-light leading-[1.2] text-text-medium max-w-[300px] md:max-w-[500px] mx-auto">
            Industry leaders shaping the ecosystem
          </p>
        </div>
      </div>
    </section>
  );
};
