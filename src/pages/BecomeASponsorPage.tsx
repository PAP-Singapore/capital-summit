import React from "react";
import { useNavigate } from "react-router-dom";
const sponsorImg = "/sponsorimg.svg";
import ButtonNew from "../components/ui/ButtonNew";
import useFadeInOnScroll from "../hooks/useFadeInOnScroll";

const BecomeASponsorPage: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useFadeInOnScroll<HTMLDivElement>({
    y: 30,
    duration: 0.7,
  });

  return (
    <div className="flex-1 bg-background flex flex-col md:min-h-[calc(100vh-84px)] lg:min-h-[calc(100vh-84px)]">
      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section className="w-full flex-1 flex flex-col justify-center pt-9 pb-7 md:pt-32 md:pb-24 lg:pt-23 lg:pb-21 bg-background">
        <div ref={heroRef} className="max-w-[1440px] mx-auto px-5 text-center">
          <h1 className="font-headline text-[32px] md:text-[64px] lg:text-[80px] font-normal leading-none mb-5 md:mb-6 tracking-tightest ">
            Become a <span className="text-primary">sponsor</span>
          </h1>
          <p className="font-headline text-xl md:text-2xl lg:text-[32px] text-text-medium md:max-w-[800px] max-w-[400px] mx-auto leading-[1.2] font-light  ">
            Stable Summit brings together decision makers across the stablecoin ecosystem, issuance, and policy.
          </p>
        </div>
      </section>

      {/* ── Two-panel CTA strip (from SponsorsPageV2) ───────────────────── */}
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
          <div className="relative w-full md:w-1/2 lg:w-[50%] flex flex-col justify-center px-5 md:px-8 lg:px-11 py-12 md:py-[60px]">
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
                onClick={() => navigate("/apply")}
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

export default BecomeASponsorPage;
