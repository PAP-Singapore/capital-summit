import React from "react";
import { type AgendaDay } from "./agenda-types";
import AgendaFilterDropdown from "./AgendaFilterDropdown";
import ButtonNew from "../ui/ButtonNew";

interface AgendaFiltersProps {
  agendaDays: AgendaDay[];
  selectedDayKey: string;
  onDayChange: (key: string) => void;
  typeOptions: string[];
  selectedType: string;
  onTypeChange: (val: string) => void;
  topicOptions: string[];
  selectedTopic: string;
  onTopicChange: (val: string) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  isRoundtable?: boolean;
}

const AgendaFilters: React.FC<AgendaFiltersProps> = ({
  agendaDays,
  selectedDayKey,
  onDayChange,
  typeOptions,
  selectedType,
  onTypeChange,
  topicOptions,
  selectedTopic,
  onTopicChange,
  searchQuery,
  onSearchChange,
  isRoundtable,
}) => {
  return (
    <div className="sticky top-[64px] md:top-[84px] z-100 bg-background/95 backdrop-blur-md py-4 md:pt-6 md:pb-12.5 border-b border-border/10">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-11">
        <div className="flex flex-col gap-3 md:gap-0">
          {/* ── Row 1: Day pills + desktop dropdowns + desktop search ── */}
          <div className="flex flex-wrap items-center gap-2 md:gap-5">
            {/* Day segment control */}
            {agendaDays.length > 0 && (
              <div className="max-w-full overflow-x-auto scrollbar-hide">
                <div className="inline-flex rounded-full border border-border overflow-hidden bg-white/50 backdrop-blur-sm h-[34px] md:h-[42px] whitespace-nowrap shadow-sm">
                  {agendaDays.map((day, idx) => (
                    <button
                      key={day.key}
                      onClick={() => onDayChange(day.key)}
                      className={`
                        px-5 md:px-6 h-full
                        font-sans text-sm md:text-base lg:text-xl font-medium items-center flex
                        transition-all duration-300
                        ${idx > 0 ? "border-l border-border" : ""}
                        ${
                          day.key === selectedDayKey
                            ? "bg-primary text-white"
                            : "text-text-dark hover:bg-primary/5"
                        }
                      `}
                    >
                      {day.label}
                    </button>
                  ))}
                  {/* <button
                    onClick={() => onDayChange("workshop")}
                    className={`
                        px-5 md:px-6 h-full
                        font-sans text-sm md:text-base lg:text-xl font-medium items-center flex
                        transition-all duration-300
                        ${"border-l border-border"}
                        ${
                          "workshop" === selectedDayKey
                            ? "bg-primary text-white"
                            : "text-text-dark hover:bg-primary/5"
                        }
                      `}
                  >
                    Workshops
                  </button> */}
                </div>
              </div>
            )}

            {/* Desktop: dropdowns */}
            <div className="hidden md:flex items-center gap-2 md:gap-3">
              <AgendaFilterDropdown
                label="All Types"
                options={typeOptions}
                selected={selectedType}
                onSelect={onTypeChange}
              />
              <AgendaFilterDropdown
                label="All Topics"
                options={topicOptions}
                selected={selectedTopic}
                onSelect={onTopicChange}
              />
            </div>

            {/* Desktop: search bar */}
            <div className="hidden md:flex flex-1 max-w-[339px] items-center gap-2 h-[42px] px-5 rounded-full border border-border bg-background backdrop-blur-sm hover:border-primary transition-all duration-200 focus-within:border-primary shadow-sm hover:shadow-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by name or company"
                className="flex-1 bg-background font-sans text-sm md:text-xl font-medium text-text-dark outline-none placeholder:text-dark-gray"
              />

              {searchQuery ? (
                <button
                  onClick={() => onSearchChange("")}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  aria-label="Clear search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 8.586L4.707 3.293a1 1 0 00-1.414 1.414L8.586 10l-5.293 5.293a1 1 0 101.414 1.414L10 11.414l5.293 5.293a1 1 0 001.414-1.414L11.414 10l5.293-5.293a1 1 0 00-1.414-1.414L10 8.586z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) : (
                <div className="opacity-60">
                  <img src="/search.svg" alt="Search" className="w-5 h-5" />
                </div>
              )}
            </div>

            {isRoundtable ? (
              <a
                href="https://partyactionpeople.typeform.com/roundtabless26"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto"
              >
                <ButtonNew className="w-full md:w-auto">
                  Apply to Participate
                </ButtonNew>
              </a>
            ) : null}
          </div>

          {/* ── Row 2 (mobile only): dropdowns ── */}
          <div className="flex md:hidden items-center gap-2">
            <AgendaFilterDropdown
              label="All Topics"
              options={topicOptions}
              selected={selectedTopic}
              onSelect={onTopicChange}
              className="flex-1"
            />
            <AgendaFilterDropdown
              label="All Types"
              options={typeOptions}
              selected={selectedType}
              onSelect={onTypeChange}
              className="flex-1"
            />
          </div>

          {/* ── Row 3 (mobile only): search bar ── */}
          <div className="flex md:hidden items-center gap-2 h-[36px] px-4 rounded-full border border-border bg-background shadow-sm hover:shadow-md transition-all duration-200 focus-within:border-primary">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name or company"
              className="flex-1 bg-transparent font-sans text-sm text-text-dark placeholder:text-text-medium/50 outline-none"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange("")}
                className="opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 8.586L4.707 3.293a1 1 0 00-1.414 1.414L8.586 10l-5.293 5.293a1 1 0 101.414 1.414L10 11.414l5.293 5.293a1 1 0 001.414-1.414L11.414 10l5.293-5.293a1 1 0 00-1.414-1.414L10 8.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <div className="opacity-60">
                <img src="/search.svg" alt="Search" className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaFilters;
