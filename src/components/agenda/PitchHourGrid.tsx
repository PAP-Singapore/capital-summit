import React from "react";

export interface PitchHourCompany {
  name: string;
  logo: string;
  website: string;
  invert?: boolean;
}

const PITCH_HOUR_COMPANIES: PitchHourCompany[] = [
  {
    name: "Polaris Finance",
    logo: "/pitch-hour/polaris.svg",
    website: "https://polarisfinance.io/",
    invert: true,
  },
  {
    name: "Aegis",
    logo: "/pitch-hour/aegis.svg",
    website: "https://aegis.im",
    invert: true,
  },
  {
    name: "Twyne",
    logo: "/pitch-hour/twyne.png",
    website: "https://twyne.xyz",
    invert: true,
  },
  {
    name: "Ebisu",
    logo: "/pitch-hour/ebisu.svg",
    website: "https://ebisu.money/",
  },
  {
    name: "Monetari",
    logo: "/pitch-hour/monetari.png",
    website: "https://monetari.tech",
  },
];

const PitchHourGrid: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4">
      {PITCH_HOUR_COMPANIES.map((company) => (
        <a
          key={company.name}
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2.5 md:px-5 md:py-3 rounded-full border border-border-light bg-background hover:border-primary/40 transition-colors"
        >
          <img
            src={company.logo}
            alt={company.name}
            className={`h-6 md:h-8 w-auto object-contain${company.invert ? " brightness-0" : ""}`}
          />
        </a>
      ))}
    </div>
  );
};

export default PitchHourGrid;
