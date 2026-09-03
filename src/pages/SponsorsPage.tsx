import React from "react";
const sponsorImg = "/sponsorimg.svg";
import ButtonNew from "../components/ui/ButtonNew";
import SponsorsSection from "../components/sponsors/SponsorsSection";
import { APPLY_FOR_SPONSORS_URL } from "../data/constants";

const SPONSOR_APPLICATION_URL = APPLY_FOR_SPONSORS_URL;

// ─── Page ──────────────────────────────────────────────────────────────────────

const SponsorsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col ">
      <SponsorsSection />

      {/* ── Two-panel CTA strip ──────────────────────────────────────────── */}
      <section className="w-full bg-background border-t border-border/40 overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-stretch">
          {/* Left: sponsor illustration */}
          <div className="w-full md:w-1/2 lg:w-[50%] flex items-center justify-center md:justify-start overflow-hidden">
            <img
              src={sponsorImg}
              alt="Sponsorship illustration"
              className="min-w-[550px] md:min-w-0 md:w-full object-contain"
            />
          </div>

          {/* Right: copy + CTA */}
          <div className="relative w-full md:w-1/2 lg:w-[50%] flex flex-col justify-center px-5 md:px-8 lg:px-11 py-14 md:py-[60px]">
            {/* Mobile Top Border */}
            <div
              className="md:hidden absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-background-0) 0%, var(--color-dark-gray) 49.18%)",
              }}
            />
            {/* Desktop Left Border */}
            <div
              className="hidden md:block absolute left-0 top-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-dark-gray-0) 0%, var(--color-dark-gray) 100%)",
              }}
            />

            <p className="font-headline text-xl md:text-2xl lg:text-[28px] font-light text-text-medium mb-8 md:mb-24 leading-[1.15] tracking-tight ">
              Sponsorship focus on long-term partnerships over short-term
              visibility.
            </p>
            <div>
              <ButtonNew
                variant="outline"
                className="border-dark-gray! text-text-dark font-medium! h-11 px-5"
                onClick={() =>
                  window.open(
                    SPONSOR_APPLICATION_URL,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                Apply to Sponsor
              </ButtonNew>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SponsorsPage;
