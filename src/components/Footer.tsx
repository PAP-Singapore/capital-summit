import React from "react";
import { Link } from "react-router-dom";
import {
  BUY_TICKETS_URL,
  APPLY_FOR_SPONSORS_URL,
  APPLY_FOR_SPEAKERS_URL,
} from "../data/constants";

const footerColumns = [
  {
    title: "Stable Summit",
    links: [{ label: "About", href: "/about" }],
  },
  {
    title: "Singapore",
    links: [
      { label: "Venue", href: "/venue/Singapore" },
      // { label: "Agenda", href: "/agenda" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Attend", href: BUY_TICKETS_URL },
      {
        label: "Apply to Sponsor",
        href: APPLY_FOR_SPONSORS_URL,
      },
      {
        label: "Apply to Speak",
        href: APPLY_FOR_SPEAKERS_URL,
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy-and-terms" },
      { label: "Terms", href: "/privacy-and-terms" },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-charcoal text-white pt-9 pb-10 md:pt-16 lg:y-18 px-5 md:px-10 lg:px-12 mt-auto">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-[78px] lg:gap-[10%] items-start">
        {/* Left Section */}
        <div className="w-full md:w-[51%] lg:max-w-[340px] flex flex-col order-2 md:order-1 mt-2 md:mt-0 items-start">
          {/* Mobile Divider (Above Socials) - Hidden on Tablet/Desktop */}
          <div className="w-full h-px bg-dark-gray mt-4 mb-9 md:hidden" />

          {/* Socials */}
          <div className="flex items-center gap-6 md:gap-5 lg:gap-6 mb-8 md:mb-10">
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@StableSummit"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-100 transition-opacity flex items-center justify-center"
              aria-label="YouTube"
            >
              <img
                src="/youtube.svg"
                alt="YouTube"
                className="w-[24px] h-[24px] brightness-0 invert"
              />
            </a>
            {/* LinkedIn */}
            <a
              href="http://linkedin.com/company/stable-summit"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-100 transition-opacity flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <img
                src="/linkdin.svg"
                alt="LinkedIn"
                className="w-[19px] h-[19px] brightness-0 invert"
              />
            </a>
            {/* X (Twitter) */}
            <a
              href="https://x.com/stable_summit"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-100 transition-opacity flex items-center justify-center"
              aria-label="X"
            >
              <img
                src="/xlogo.svg"
                alt="X"
                className="w-[24px] h-[24px] brightness-0 invert"
              />
            </a>
            {/* Telegram */}
            <a
              href="https://t.me/+4EvIc5QRuugyNTY1"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-100 transition-opacity flex items-center justify-center"
              aria-label="Telegram"
            >
              <img
                src="/telegram.svg"
                alt="Telegram"
                className="w-[24px] h-[24px] brightness-0 invert"
              />
            </a>
          </div>

          {/* Desktop/Tablet Divider (Below Socials) - Hidden on mobile */}
          <div className="hidden md:block w-full max-w-[340px] lg:w-full border-t border-dark-gray mb-10" />

          {/* Logo & Copyright */}
          <div className="flex flex-col items-start gap-5 md:gap-5 lg:gap-[30px]">
            <img
              src="/logowhite.svg"
              alt="Stable Summit"
              className="w-[98px] md:w-[98px] lg:w-[98px] h-auto"
            />
            <div className="flex flex-col text-dark-gray text-[12px] md:text-[16px]  font-sans font-medium leading-[16px] md:leading-[19.84px] md:-tracking-[0.16px]">
              <span>© Stable Summit</span>
              <span>A Party Action People Production</span>
            </div>
          </div>
        </div>

        {/* Right Section / Columns Grid */}
        <div className="w-full md:w-[70%] lg:flex-1 order-1 md:order-2 flex md:justify-end">
          <div className="w-full grid grid-cols-2 lg:grid-cols-[158px_141px_137px_106px] justify-end gap-y-15 md:gap-y-10 lg:gap-y-0 gap-x-6 md:gap-x-12 lg:gap-x-16 xl:gap-x-25">
            {footerColumns.map((col, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex items-center gap-3 mb-2 md:mb-2">
                  <h3 className="text-ice-white text-[16px] md:text-[20px]  font-normal font-sans flex items-center">
                    {col.title}
                  </h3>
                  <span className="w-2 h-2 md:w-2 md:h-2 lg:w-2 lg:h-2 bg-white block relative shrink-0"></span>
                </div>
                <ul className="flex flex-col ">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        to={link.href}
                        className="text-dark-gray hover:text-white transition-colors duration-200 text-[16px] md:text-[16px] font-sans"
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
