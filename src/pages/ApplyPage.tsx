import React, { useState } from "react";
import ButtonNew from "../components/ui/ButtonNew";
import { APPLY_FOR_SPONSORS_URL, APPLY_FOR_SPEAKERS_URL } from "../data/constants";
const arcIcon = "/arc.svg";

// ─── Card data ─────────────────────────────────────────────────────────────────

interface ApplyCard {
  title: string;
  description: string;
  cta: string;
  href: string;
  /** Mobile: fixed bg theme — overrides the hover behaviour on small screens */
  mobileTheme: "light" | "dark" | "orange";
}

const cards: ApplyCard[] = [
  {
    title: "Speaker",
    description: "Industry leaders shaping the stablecoin ecosystem.",
    cta: "Apply to Speak",
    href: APPLY_FOR_SPEAKERS_URL,
    mobileTheme: "light",
  },
  {
    title: "Sponsor",
    description:
      "Sponsorship focus on long-term partnerships over short-term visibility.",
    cta: "Apply to Sponsor",
    href: APPLY_FOR_SPONSORS_URL,
    mobileTheme: "dark",
  },
  {
    title: "Partner",
    description: "Industry leaders shaping the stablecoin ecosystem.",
    cta: "Apply to Partner",
    href: " ",
    mobileTheme: "orange",
  },
];

// ─── Single card ───────────────────────────────────────────────────────────────

interface ApplyCardItemProps {
  card: ApplyCard;
  isHovered: boolean;
  /** When true the card renders its mobile-fixed colour scheme */
  isMobile?: boolean;
}

const ApplyCardItem: React.FC<ApplyCardItemProps> = ({
  card,
  isHovered,
  isMobile = false,
}) => {
  const isExternal =
    card.href.startsWith("http") || card.href.startsWith("mailto");

  // On mobile, the text colour is determined by the fixed background theme
  const mobileTextDark = card.mobileTheme === "light"; // white bg → dark text

  // On desktop it follows hover state
  const desktopTextLight = isHovered;

  const titleColorClass = isMobile
    ? mobileTextDark
      ? "text-text-dark"
      : "text-background"
    : desktopTextLight
      ? "text-background"
      : "text-text-dark";

  const descColorClass = isMobile
    ? mobileTextDark
      ? "text-text-medium"
      : "text-background-85"
    : desktopTextLight
      ? "text-background-85"
      : "text-text-medium";

  const ballOpacity = isHovered ? "opacity-100" : "opacity-0";

  const ballBg = isMobile
    ? card.mobileTheme === "orange"
      ? "bg-[linear-gradient(31.11deg,var(--color-background-0)_37.91%,var(--color-background)_85.5%)]"
      : "bg-[linear-gradient(31.11deg,var(--color-background-0)_37.91%,var(--color-background-30)_85.5%)]"
    : "bg-[linear-gradient(31.11deg,var(--color-background-0)_37.91%,var(--color-background)_85.5%)]";

  return (
    <div
      className={`relative flex flex-col justify-between transition-all duration-700 ease-in-out pt-9.5 pb-[39px] px-5 md:px-8 md:py-12 lg:pt-23.5 lg:pb-24.5 lg:px-11 min-h-full md:min-h-full lg:min-h-full lg:h-full flex-1 overflow-hidden
        ${
          isMobile
            ? card.mobileTheme === "light"
              ? "bg-[linear-gradient(89deg,var(--color-background-0)_73.91%,var(--color-primary)_196.69%)]"
              : card.mobileTheme === "dark"
                ? "bg-text-medium "
                : "bg-[radial-gradient(131.6%_263.25%_at_29.5%_12.41%,var(--color-primary)_20.74%,var(--color-background)_100%)]"
            : "bg-background"
        }`}
    >
      {!isMobile && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-[radial-gradient(131.6%_263.25%_at_29.5%_12.41%,var(--color-primary)_20.74%,var(--color-background)_100%)] ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* ── Ball 1 — top: -143px ── */}
      <div
        className={`absolute pointer-events-none w-[480px] h-[480px] rounded-full p-px transition-opacity duration-700 ease-in-out rotate-0 top-[-143px] left-1/2 -translate-x-1/2 ${ballOpacity} ${ballBg}`}
      >
        <div className="w-full h-full rounded-full bg-[linear-gradient(45deg,var(--color-background-0)_35.91%,var(--color-primary)_88.69%)]" />
      </div>

      {/* ── Ball 2 — bottom ── */}
      <div
        className={`absolute pointer-events-none w-[480px] h-[480px] rounded-full p-px rotate-90 transition-opacity duration-700 ease-in-out bottom-[-143px] left-1/2 -translate-x-1/2 ${ballOpacity} ${ballBg}`}
      >
        <div className="w-full h-full rounded-full bg-[linear-gradient(45deg,var(--color-background-0)_35.91%,var(--color-primary)_88.69%)]" />
      </div>

      {/* ── Arc icon for Sponsor card mobile — only on mobile ── */}
      {isMobile && card.title === "Sponsor" && (
        <img
          src={arcIcon}
          alt=""
          className="absolute bottom-0 right-0 w-full pointer-events-none z-0"
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        <h2
          className={`font-headline font-normal leading-none mb-2 md:mb-8 lg:mb-6 transition-colors duration-500 text-[32px] md:text-[clamp(48px,6vw,80px)] ${titleColorClass}`}
        >
          {card.title}
        </h2>
        <p
          className={`font-headline text-[20px] mb-5 md:mb-5 lg:mb-0 md:text-lg lg:text-[28px] font-light leading-tight tracking-normal transition-colors duration-500 max-w-[307px] md:max-w-[438px] ${descColorClass}`}
        >
          {card.description}
        </p>
      </div>

      {/* CTA Button */}
      <div className="relative z-10 mt-auto mt-5">
        <ButtonNew
          variant="outline"
          className={`transition-all duration-300 hover:scale-[1.03] ${
            isMobile
              ? `bg-transparent border ${
                  card.title === "Speaker"
                    ? "text-text-dark border-text-dark"
                    : "text-white border-white"
                }`
              : "bg-white border border-dark-gray text-text-dark"
          }`}
          onClick={() => {
            if (isExternal) {
              window.open(card.href, "_blank", "noopener,noreferrer");
            } else {
              window.location.href = card.href;
            }
          }}
        >
          {card.cta}
        </ButtonNew>
      </div>
    </div>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────────

const ApplyPage: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="min-h-[calc(100vh-84px)] lg:h-[calc(100vh-84px)] bg-background flex flex-col">
      {/* Cards grid wrapper */}
      <div className="w-full flex-1 flex flex-col">
        {/* Top border line */}
        <div className="w-full h-px mb-0 bg-[linear-gradient(90deg,var(--color-dark-gray)_0%,var(--color-dark-gray-0)_100%)]" />

        {/* ── Desktop / Tablet: side-by-side columns with dividers ── */}
        <div className="hidden lg:flex flex-row flex-1">
          {cards.map((card, idx) => (
            <React.Fragment key={card.title}>
              {/* Vertical divider between cards */}
              {idx > 0 && (
                <div className="w-px shrink-0 min-h-full bg-[linear-gradient(180deg,var(--color-dark-gray)_0%,var(--color-dark-gray-0)_100%)]" />
              )}
              <div
                className="flex-1 cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <ApplyCardItem card={card} isHovered={hoveredIdx === idx} />
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* ── Mobile: stacked full-width cards with fixed themes ── */}
        <div className="flex lg:hidden flex-col flex-1">
          {cards.map((card, idx) => (
            <React.Fragment key={card.title}>
              {idx > 0 && (
                <div className="w-full h-px bg-[linear-gradient(90deg,var(--color-dark-gray)_0%,var(--color-dark-gray-0)_100%)]" />
              )}
              <ApplyCardItem card={card} isHovered={false} isMobile />
            </React.Fragment>
          ))}
        </div>

        {/* Bottom border line */}
        <div className="w-full h-px bg-[linear-gradient(90deg,var(--color-dark-gray)_0%,var(--color-dark-gray-0)_100%)]" />
      </div>
    </div>
  );
};

export default ApplyPage;
