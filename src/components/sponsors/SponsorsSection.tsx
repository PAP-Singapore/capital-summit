import React from "react";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll";
import { useScrollToHash } from "../../hooks/useScrollToHash";
import { useGetSponsors } from "../../queries/speakers";
import { ApiSponsor } from "../../types/sponsor";

// ─── Tier configuration ─────────────────────────────────────────────────────

const TIER_ORDER = [
  "HOSTED BY",
  "WITH",
  "TITLE SPONSOR",
  "PLATINUM SPONSORS",
  "GOLD SPONSORS",
  "MEDIA AND COMMUNITY PARTNERS",
];

const API_KEY_MAP: Record<string, string> = {
  "HOSTED BY": "Hosted By",
  WITH: "With",
  "TITLE SPONSOR": "Title",
  "PLATINUM SPONSORS": "Platinum",
  "GOLD SPONSORS": "Gold",
  "MEDIA AND COMMUNITY PARTNERS": "Media & Community Partners",
};

const TIER_CLASS_MAP: Record<string, string> = {
  "HOSTED BY": "w-[183px] h-[51px] sm:w-[372px] sm:h-[103px]",
  WITH: "w-[129px] h-[70px] sm:w-[262px] sm:h-[100px]",
  "TITLE SPONSOR": "w-[180px] h-[70px] sm:w-[350px] sm:h-[100px]",
  "PLATINUM SPONSORS": "w-[117.23px] h-[39.08px] sm:w-[188.6px] sm:h-[62.87px]",
  "GOLD SPONSORS": "w-[105px] h-[20px] sm:w-[168px] sm:h-[32.92px]",
  "MEDIA AND COMMUNITY PARTNERS":
    "w-[45.4px] sm:w-[73.13px] h-[30.27px] sm:h-[48.75px]",
};

// ─── Reusable sponsor logo link ────────────────────────────────────────────────

const SponsorLogo: React.FC<{
  sponsor: ApiSponsor;
  className?: string;
  id?: string;
}> = ({ sponsor, className, id }) => (
  <div
    id={id}
    className={`flex items-center justify-center ${sponsor.customCss} ${
      /(w-|h-)/.test(sponsor.customCss)
        ? className?.replace(
            /\b(sm:|md:|lg:|xl:)?(w|h)-\[[^\]]+\]|\b(sm:|md:|lg:|xl:)?(w|h)-\S+/g,
            "",
          )
        : className || ""
    }`}
  >
    <a
      href={sponsor.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-full transition-all duration-500 hover:scale-105"
    >
      <img
        src={sponsor.imageUrl}
        alt={sponsor.name}
        className={`w-full h-full object-contain transition-all duration-500 `}
      />
    </a>
  </div>
);

// ─── Component ──────────────────────────────────────────────────────────────────

const SponsorsSection: React.FC = () => {
  const headingRef = useFadeInOnScroll<HTMLDivElement>({
    y: 30,
    duration: 0.7,
  });

  const partnersGridRef = useFadeInOnScroll<HTMLDivElement>({
    y: 40,
    duration: 0.3,
    stagger: 0.05,
    childSelector: ".partner-tier",
  });

  const { isLoading, data } = useGetSponsors();

  // `/sponsors#sponsor-<id>` — the "Open preview" link on a Slack approval.
  // Gated on the data rather than a timer: the logos are fetched after mount,
  // so the anchor does not exist when the browser handles the hash.
  useScrollToHash(!isLoading && !!data);

  return (
    <section
      className="w-full pt-10 pb-4 md:pt-[70px] md:pb-8 lg:pt-[95px] lg:pb-[65px] relative"
      style={{
        background:
          "linear-gradient(337.83deg, var(--color-charcoal) 75.69%, var(--color-primary) 98.88%)",
      }}
    >
      <div className="max-w-full mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-7 md:mb-17 px-5">
          <h2 className="hidden md:block font-headline text-xl md:text-[28px] lg:text-[40px] text-background font-light max-w-[300px] md:max-w-[400px] lg:max-w-[575px] mx-auto leading-tight lg:leading-[1.1]">
            Stable Summit is supported by the biggest names in stablecoins
          </h2>
          <h2 className="block md:hidden font-headline text-[20px] text-background font-light max-w-[255px] mx-auto leading-[1.2] text-center tracking-normal">
            Supported by the biggest names in stablecoins
          </h2>
        </div>

        {/* Partners Grid */}
        <div
          ref={partnersGridRef}
          className="relative mt-5 md:mt-16 lg:border-t"
          style={{
            borderImageSource:
              "linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-0) 100%)",
            borderImageSlice: 1,
          }}
        >
          {/* Mobile/Tablet Top Decorative Line */}
          <div
            className="absolute top-0 left-0 right-0 h-px block lg:hidden"
            style={{
              background:
                "linear-gradient(90deg, var(--color-primary) 0%, var(--color-background-0) 100%)",
            }}
          />

          {!isLoading &&
            data &&
            TIER_ORDER.map((tier, index) => {
              const apiKey = API_KEY_MAP[tier];
              const sponsors = data[apiKey];
              if (!sponsors || sponsors.length === 0) return null;

              const logoClass = TIER_CLASS_MAP[tier] || "";
              const isSingleSponsor =
                sponsors.length === 1 &&
                ["HOSTED BY", "WITH", "TITLE SPONSOR"].includes(tier);
              const isLastTier = index === TIER_ORDER.length - 1;

              return (
                <div
                  key={tier}
                  className={`partner-tier flex flex-col items-center justify-center relative ${
                    isLastTier ? "lg:border-b-0" : "lg:border-b"
                  } ${
                    index === 0
                      ? "pt-5 pb-6.5 lg:pt-8 lg:pb-11"
                      : isSingleSponsor
                        ? "py-5 lg:pt-12 lg:pb-9"
                        : "py-5 lg:pt-12 lg:pb-16"
                  }`}
                  style={{
                    borderImageSource:
                      index === 0
                        ? "linear-gradient(90deg, var(--color-dark-gray) 75.82%, var(--color-background-0) 100%)"
                        : "linear-gradient(90deg, var(--color-dark-gray) 50.82%, var(--color-background-0) 100%)",
                    borderImageSlice: 1,
                  }}
                >
                  {/* Mobile bottom border */}
                  {!isLastTier && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-px block lg:hidden"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--color-dark-gray) 75.82%, var(--color-background-0) 100%)",
                      }}
                    />
                  )}

                  <p
                    className={`text-dark-gray text-[12px] md:text-[16px] lg:text-[20px] font-sans font-medium ${
                      index === 0
                        ? "mb-3 md:mb-8"
                        : isSingleSponsor
                          ? "-mb-1 md:mb-3"
                          : "mb-5 lg:mb-4"
                    }`}
                  >
                    {tier === "MEDIA AND COMMUNITY PARTNERS"
                      ? "Media and Community Partners"
                      : tier === "HOSTED BY"
                        ? "Hosted By"
                        : tier === "WITH"
                          ? "With"
                          : tier === "TITLE SPONSOR"
                            ? "Title Sponsor"
                            : tier === "PLATINUM SPONSORS"
                              ? "Platinum Sponsors"
                              : "Gold Sponsors"}
                  </p>

                  {isSingleSponsor ? (
                    <SponsorLogo
                      sponsor={sponsors[0]}
                      className={`w-auto ${logoClass}`}
                      id={`sponsor-${sponsors[0].id}`}
                    />
                  ) : (
                    <div
                      className={`w-full ${
                        tier === "MEDIA AND COMMUNITY PARTNERS"
                          ? "lg:w-[60%] flex flex-wrap items-center gap-[22px] sm:gap-[35px] justify-center"
                          : tier === "GOLD SPONSORS"
                            ? "max-w-[285px] sm:max-w-[676px] flex flex-wrap items-center justify-center gap-x-[22px] sm:gap-x-[28px] gap-y-[28px] sm:gap-y-[32px]"
                            : "max-w-[285px] sm:max-w-[676px] flex flex-wrap items-center justify-center gap-x-[28px] gap-y-[20px] sm:gap-[30px] sm:gap-y-[10px] md:gap-[46px] md:gap-y-[32px]"
                      }`}
                    >
                      {sponsors.map((sponsor) => (
                        <div key={sponsor.id} className="flex justify-center">
                          <SponsorLogo
                            sponsor={sponsor}
                            className={`w-auto ${logoClass}`}
                            id={`sponsor-${sponsor.id}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
