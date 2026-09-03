import React from "react";
import ButtonNew from "../components/ui/ButtonNew";
import { Link, useNavigate, useParams } from "react-router-dom";
import { conferences } from "../data/conferences";
import Stats from "../components/Stats";
import { BUY_TICKETS_URL, APPLY_FOR_SPONSORS_URL } from "../data/constants";

const stats = [
  { value: "1,000+", label: "Attendees", order: "order-4" },
  { value: "80+", label: "Partners", order: "order-5" },
  { value: "300+", label: "Speakers", order: "order-1" },
  { value: "100+", label: "Workshops", order: "order-2" },
  { value: "50+", label: "Office Hours", order: "order-3" },
];

const VenuePage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const navigate = useNavigate();

  const conference = conferences.find(
    (c) => c.city.toLowerCase() === cityId?.toLowerCase(),
  );

  if (!conference) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="font-sans text-lg text-text-medium">Venue not found</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-primary text-white rounded-full font-sans hover:bg-opacity-90 transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }
  return (
    <div className="w-full flex-1 flex flex-col bg-background overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full md:h-[calc(100vh-224px)] lg:h-[calc(100vh-288px)] min-h-[600px] flex flex-col-reverse md:flex-row">
        {/* Left Content */}
        <div className="w-full md:w-[50%] lg:w-[50%] xl:w-[564px] h-full flex flex-col justify-center px-5 md:px-10 lg:px-[44px] xl:px-[44px] py-9 md:py-20 lg:py-0 ">
          <div className="max-w-[500px] xl:pt-[36px]">
            <h1 className="text-[32px] md:text-[50px] lg:text-[70px] xl:text-[80px] leading-[1.05] md:leading-[1.1] font-normal font-headline text-text-medium mb-2 md:mb-5 tracking-tight">
              {conference.city} 2026
            </h1>
            <p className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-light leading-tight md:leading-tight font-headline text-text-medium mb-6 md:mb-10 lg:mb-[85px] text-balance">
              {conference.city === "Cannes"
                ? "First"
                : conference.city === "New York City"
                  ? "Second"
                  : conference.city === "Singapore"
                    ? "Third"
                    : "Fourth"}{" "}
              edition of the year of the global stablecoin conference series.
            </p>
            {/* <div className="mb-6 md:mb-12 lg:mb-[89px]">
              <a
                href="https://cannes.stablesummit.xyz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ButtonNew className="">Buy Tickets</ButtonNew>
              </a>
            </div> */}
            {cityId?.toLowerCase() !== "new york city" &&
            cityId?.toLowerCase() !== "singapore" ? (
              <div className="flex w-full md:w-auto gap-3 md:gap-4 max-[360px]:flex-col mb-6 md:mb-12 lg:mb-[89px]">
                <ButtonNew>Coming Soon</ButtonNew>
              </div>
            ) : (
              <div className="flex w-full md:w-auto gap-3 md:gap-4 max-[360px]:flex-col mb-6 md:mb-12 lg:mb-[89px]">
                <a
                  href={BUY_TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ButtonNew>Get Tickets</ButtonNew>
                </a>
                <a target="_blank" href={APPLY_FOR_SPONSORS_URL}>
                  <ButtonNew variant="outline">Sponsor</ButtonNew>
                </a>
              </div>
            )}

            {cityId?.toLowerCase() === "cannes" && (
              <div className="text-text-medium font-sans text-[14px] md:text-base lg:text-xl font-medium">
                <p>New York</p>
                <p className="flex items-center gap-2 font-normal">
                  <span className="text-xl leading-none lg:text-xl   mb-0.5 ">
                    →
                  </span>{" "}
                  2026
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div
          className="w-full h-[334px] sm:h-[450px] md:h-full relative overflow-hidden flex-1"
          style={{
            borderLeft: "1.5px solid",
            borderImageSource:
              "linear-gradient(180deg, var(--color-dark-gray-0) 0%, var(--color-dark-gray) 100%)",
            borderImageSlice: 1,
          }}
        >
          <img
            // src="/venueheroimg.jpg"
            src={conference.image}
            alt="Cannes 2026 Venue"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* <Stats /> */}

      {/* Details & Themes Section */}
      <div className="w-full flex flex-col-reverse md:flex-row bg-background">
        {/* Left Content */}
        <div className="w-full md:w-[40%] lg:w-[563px] flex flex-col justify-end md:justify-between px-6 md:px-12 lg:px-[44px] pb-9 pt-9 md:py-16 lg:py-14 relative overflow-hidden">
          {/* Decorative Arc - Desktop (Top-Left) */}
          <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
            {/* Corner Glow matches user gradient */}
            <div
              className="absolute top-0 left-0 w-[1130px] h-[870px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(-45.89deg, var(--color-background-0) 28.28%, var(--color-primary) 72.53%)",
              }}
            />
            {/* The Pencil-Line Arc */}
            {/* The Pencil-Line Arc */}
            <svg className="absolute top-4 -left-70 w-full h-full overflow-visible">
              <defs>
                <linearGradient
                  id="arcGradient"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="0"
                  x2="900"
                  y2="900"
                >
                  <stop offset="0%" style={{ stopColor: "var(--color-dark-gray)" }} />
                  <stop offset="53.81%" style={{ stopColor: "var(--color-dark-gray)" }} />
                  <stop offset="94.02%" style={{ stopColor: "var(--color-background)" }} stopOpacity="0" />
                  <stop offset="100%" style={{ stopColor: "var(--color-background)" }} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M -60 -60 A 930 850 0 0 1 900 900"
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {cityId?.toLowerCase() === "new york city" && (
            <>
              <div className="flex-1 flex items-start md:items-center mt-0 md:mt-100 lg:mt-105 relative z-10">
                <h2 className="text-2xl sm:text-[32px] md:text-[32px] lg:text-[40px] leading-[1.1] md:leading-[1.1] font-headline font-normal  md:font-light text-text-medium max-w-[480px]">
                  Located at, <span className="text-primary">Convene</span> is
                  New York most iconic venue.
                </h2>
              </div>

              <div className="mt-5 md:mt-35 text-text-medium relative z-10">
                <h3 className="font-headline text-[20px] md:text-[20px] lg:text-[28px] font-light  md:mb-[6px]">
                  Convene:
                </h3>
                <p className="font-sans text-[14px] md:text-base lg:text-xl font-normal leading-[1.1] text-text-medium md:max-w-[260px] max-w-[180px]">
                  360 Madison Ave, New York, NY 10017, United States
                </p>
              </div>
            </>
          )}

          {cityId?.toLowerCase() === "cannes" && (
            <>
              <div className="flex-1 flex items-start md:items-center mt-0 md:mt-100 lg:mt-105 relative z-10">
                <h2 className="text-2xl sm:text-[32px] md:text-[32px] lg:text-[40px] leading-[1.1] md:leading-[1.1] font-headline font-normal  md:font-light text-text-medium max-w-[480px]">
                  Located along the Bay waterfront,{" "}
                  <span className="text-primary">JW Marriott</span> is Cannes
                  most iconic venue.
                </h2>
              </div>

              <div className="mt-5 md:mt-35 text-text-medium relative z-10">
                <h3 className="font-headline text-[20px] md:text-[20px] lg:text-[28px] font-light  md:mb-[6px]">
                  JW Marriott
                </h3>
                <p className="font-sans text-[14px] md:text-base lg:text-xl font-normal leading-[1.1] text-text-medium md:max-w-[260px] max-w-[180px]">
                  50 Bd de la Croisette, 06400 Cannes, France
                </p>
              </div>
            </>
          )}

          {cityId?.toLowerCase() === "singapore" && (
            <>
              <div className="flex-1 flex items-start md:items-center mt-0 md:mt-100 lg:mt-105 relative z-10">
                <h2 className="text-2xl sm:text-[32px] md:text-[32px] lg:text-[40px] leading-[1.1] md:leading-[1.1] font-headline font-normal  md:font-light text-text-medium max-w-[480px]">
                  Located at
                  <span className="text-primary">Andaz Singapore</span>, a
                  modern venue in central Singapore with easy access to Marina
                  Bay Sands.
                </h2>
              </div>

              <div className="mt-5 md:mt-35 text-text-medium relative z-10">
                <h3 className="font-headline text-[20px] md:text-[20px] lg:text-[28px] font-light  md:mb-[6px]">
                  Andaz Singapore:
                </h3>
                <p className="font-sans text-[14px] md:text-base lg:text-xl font-normal leading-[1.1] text-text-medium md:max-w-[260px] max-w-[180px]">
                  5 Fraser St, Singapore 189354
                </p>
              </div>
            </>
          )}
        </div>

        {/* Right Content */}
        <div className="w-full flex-1 flex flex-col relative">
          {/* Mobile-only background gradient */}
          <div
            className="sm:hidden absolute inset-0 bottom-78 pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(141.11deg, var(--color-background-0) 63.28%, var(--color-primary) 143.53%)",
            }}
          />
          {/* Border (Desktop) */}
          <div
            className="hidden md:block absolute left-0 top-0 bottom-0 pointer-events-none"
            style={{
              borderLeft: "1.5px solid",
              borderImageSource:
                "linear-gradient(180deg, var(--color-dark-gray-0) 0%, var(--color-dark-gray) 45%)",
              borderImageSlice: 1,
            }}
          />
          {/* Border (Mobile) */}
          <div
            className="md:hidden absolute bottom-0 left-0 right-0 pointer-events-none z-20"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, var(--color-dark-gray) 0%, var(--color-dark-gray-0) 100%)",
            }}
          />

          <div className="pt-8 md:pt-10 lg:pt-13 px-5 md:px-8 lg:px-[44px]  pb-9 md:pb-14  flex-1 relative z-10">
            <h4 className="font-headline text-text-medium text-xl font-light md:text-[20px] lg:text-[28px] mb-4 md:mb-6 ">
              Preliminary Themes
            </h4>
            <ul className="flex flex-col gap-0 mb-6 md:mb-12 lg:mb-17">
              {[
                "Bank-issued and crypto-native stablecoins: competition, coexistence and interoperability",
                "Non-USD stablecoins and institutional adoption at scale",
                "Stablecoins, FX and trading use cases for restricted currencies",
                "Cross-border payments, trade finance and stablecoin settlement corridors",
                "Institutional trust architecture: ratings, reserves and systemic risk",
                "Agentic payments and machine-to-machine stablecoin settlement",
                "Stablecoins in geopolitical conflict, sanctions and unstable economies",
              ].map((theme, i) => (
                <li
                  key={i}
                  className="font-headline text-[24px] md:text-[26px] lg:text-[36px] xl:text-[40px] leading-[1.1] text-text-medium tracking-tight md:tracking-[-0.5px] md:font-light"
                >
                  {theme}
                </li>
              ))}
            </ul>
            {/* <Link to="/agenda">
              <ButtonNew variant="outline" className=" border-dark-gray!">
                View Full Agenda
              </ButtonNew>
            </Link> */}
          </div>

          {cityId?.toLowerCase() === "cannes" && (
            <div className="w-full h-[312px] sm:h-[350px] md:h-full lg:h-[600px] xl:h-[600px]">
              <img
                src="/venueimg.png"
                alt="JW Marriott venue"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {cityId?.toLowerCase() === "new york city" && (
            <div className="w-full h-[312px] sm:h-[350px] md:h-full lg:h-[600px] xl:h-[600px]">
              <img
                src="/convene.jpg"
                alt="new york venue"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {cityId?.toLowerCase() === "singapore" && (
            <div className="w-full h-[312px] sm:h-[350px] md:h-full lg:h-[600px] xl:h-[600px]">
              <img
                src="/singapore-venue.webp"
                alt="new york venue"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenuePage;
