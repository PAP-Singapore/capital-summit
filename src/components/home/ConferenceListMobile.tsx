import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonNew from "../ui/ButtonNew";
import { ConferenceWithImage } from "../../types/conference";
import { conferences } from "../../data/conferences";
import { cityToSlug } from "../../utils/cities";

interface DetailRowProps {
  label: string;
  value: string;
  hideTopBorderDesktop?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({
  label,
  value,
  hideTopBorderDesktop,
}) => (
  <div className="flex flex-row relative py-2.5 lg:py-3.5 items-baseline">
    <div
      className={`absolute top-0 left-0 right-0 h-px ${hideTopBorderDesktop ? "lg:hidden" : ""}`}
      style={{
        background:
          "linear-gradient(90deg, var(--color-dark-gray) 50.48%, var(--color-background-0) 100%)",
      }}
    />
    <span className="w-[196px] text-dark-gray text-[12px] md:text-base lg:text-xl font-sans font-medium leading-relaxed uppercase">
      {label}
    </span>
    <span className="flex-1 text-text-medium text-[12px] md:text-[16px] lg:text-xl font-sans font-normal leading-tight pl-4 md:pl-0">
      {value}
    </span>
  </div>
);

interface ConferenceListMobileProps {
  onConferenceSelect?: (conference: ConferenceWithImage | null) => void;
}

const ConferenceListMobile: React.FC<ConferenceListMobileProps> = ({
  onConferenceSelect,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  // Helper function to format date for mobile
  const formatDateForMobile = (dateString: string) => {
    const parts = dateString.trim().split(" ");
    if (parts.length >= 2) {
      const year = parts[parts.length - 1];
      const shortYear = year.slice(-2);
      const monthPart = parts.slice(0, -1).join(" ");
      return `${monthPart} '${shortYear}`;
    }
    return dateString;
  };

  const handleClick = (conf: ConferenceWithImage, index: number) => {
    if (selectedIndex === index) {
      // Collapse current - reset to null
      setSelectedIndex(null);
      onConferenceSelect?.(null);
    } else {
      // Select new
      setSelectedIndex(index);
      onConferenceSelect?.(conf);
    }
  };

  const handleCityClick = (e: React.MouseEvent, city: string) => {
    e.stopPropagation();
    if (city === "Cannes" || city === "New York City") {
      navigate(`/archive?city=${cityToSlug(city)}`);
    } else {
      navigate(`/venue/${city}`);
    }
  };

  return (
    <section className="w-full bg-background pb-20 pt-5 md:pb-[74px] lg:hidden relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto ">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-[60px] px-5 md:px-0">
          <h2 className="font-headline text-[16px] md:text-[28px] leading-[110%] text-text-medium font-light md:max-w-xl mx-auto">
            Stable Summit operates as a global conference series, with multiple
            editions each year
          </h2>
        </div>

        {/* Conference List */}
        <div className="w-full">
          {conferences.map((conf, index) => {
            const isSelected = selectedIndex === index;

            return (
              <div key={index} className="relative">
                {/* Conference Row */}
                <div
                  className="relative group border-t border-border last:border-b py-4 md:py-3 overflow-hidden cursor-pointer"
                  // onClick={() => handleClick(conf, index)}
                  onClick={(e) => handleCityClick(e, conf.city)}
                >
                  {/* Background Glow */}
                  <div
                    className={`absolute bg-conference transition-opacity duration-500 ${isSelected || index === 0 ? "opacity-100" : "opacity-0"}`}
                  />

                  {/* Mobile Layout */}
                  <div className="relative z-10 flex md:hidden flex-row items-center px-5">
                    {/* Date - Left aligned */}
                    <div
                      className={`w-[70px] flex justify-start transition-all duration-500 ${isSelected || index === 0 ? "opacity-100" : "opacity-0"}`}
                    >
                      <span className="font-sans text-[12px] text-text-dark font-medium">
                        {formatDateForMobile(conf.date)}
                      </span>
                    </div>

                    {/* City Name */}
                    <h3
                      onClick={(e) => handleCityClick(e, conf.city)}
                      className={`flex-1 font-headline text-[32px] leading-tight text-center transition-all duration-500 hover:text-text-dark ${
                        isSelected || index === 0
                          ? "text-text-dark scale-100"
                          : "text-dark-gray scale-95"
                      }`}
                    >
                      {conf.city}
                    </h3>

                    {/* Arrow */}
                    <div
                      className={`w-[65px] flex justify-end transition-all duration-500 ${isSelected || index === 0 ? "opacity-100" : "opacity-0"}`}
                    >
                      <svg
                        width="32"
                        height="16"
                        viewBox="0 0 48 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-text-medium"
                      >
                        <path
                          d="M36 4L44 12L36 20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 12H44"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Tablet Layout */}
                  <div className="relative z-10 hidden md:flex flex-row items-center justify-between px-5 md:px-10">
                    {/* Date Column */}
                    <div
                      className={`flex-1 max-w-[160px] flex justify-start transition-all duration-500 ${
                        isSelected || index === 0
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    >
                      <span className="font-sans text-base text-text-medium font-medium whitespace-nowrap">
                        {conf.date}
                      </span>
                    </div>

                    {/* City Name */}
                    <div className="flex-2 flex justify-center">
                      <h3
                        onClick={(e) => handleCityClick(e, conf.city)}
                        className={`font-headline text-[64px] leading-tight text-center font-normal transition-all duration-500 whitespace-nowrap hover:text-text-medium ${
                          isSelected || index === 0
                            ? "text-text-medium scale-100"
                            : "text-dark-gray scale-95"
                        }`}
                      >
                        {conf.city}
                      </h3>
                    </div>

                    {/* Arrow Column */}
                    <div
                      className={`flex-1 max-w-[160px] flex justify-end transition-all duration-500 ${
                        isSelected || index === 0
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4"
                      }`}
                    >
                      <img src="/arrow-conference.svg" alt="arrow" />
                    </div>
                  </div>
                </div>

                {/* Expandable Detail Section */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out px-5 md:px-10 ${
                    isSelected
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-background px-0 pb-10 md:pb-[70px]">
                    <div className="flex flex-col">
                      {/* Image */}
                      <div className="w-full flex-none relative group overflow-hidden mb-8 md:mb-10">
                        <img
                          src={conf.image || "/location.jpg"}
                          alt={`${conf.city} Location`}
                          className="w-full h-[228px] md:h-[469px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
                      </div>

                      {/* Details */}
                      <div className="w-full px-0 flex flex-col justify-between bg-background">
                        <div className="flex-1">
                          <DetailRow
                            label="LOCATION"
                            value={conf.location || conf.city}
                            hideTopBorderDesktop={true}
                          />
                          <DetailRow label="DATES" value={conf.date} />
                          <DetailRow
                            label="AUDIENCE SIZE"
                            value={
                              conf.audienceSize || "400–600 Senior Attendees"
                            }
                          />
                          <DetailRow
                            label="FORMAT"
                            value={
                              conf.format ||
                              "Talks, panels, workshops, office hours"
                            }
                          />
                          <div className="relative h-px w-full overflow-hidden">
                            <div
                              className="absolute inset-0"
                              style={{
                                background:
                                  "linear-gradient(90deg, var(--color-dark-gray) 50.48%, var(--color-background-0) 100%)",
                              }}
                            />
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-10 md:mt-[68px] flex justify-center">
                          <a href="#" className="w-auto">
                            <ButtonNew>{`View ${conf.city} 2026`}</ButtonNew>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Bottom Line with Orange Dot */}
                    {/* <div className="w-full mt-10">
                      <div className="relative h-1">
                        <div
                          className="absolute top-0 left-0 right-0 h-px"
                          style={{
                            background:
                              "linear-gradient(to right, transparent 0%, var(--color-border) 100%)",
                          }}
                        />
                        <div className="absolute block right-0 top-0 w-2.5 h-2.5 bg-primary -translate-y-1/2 translate-x-1/2"></div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConferenceListMobile;
