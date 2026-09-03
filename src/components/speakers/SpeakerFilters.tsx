import React from "react";
import { ScrollArea } from "../ui/scroll-area";

interface SpeakerFiltersProps {
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

export const SpeakerFilters: React.FC<SpeakerFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRole,
  setSelectedRole,
  selectedDate,
  setSelectedDate,
  isDropdownOpen,
  setIsDropdownOpen,
  uniqueRoles,
}) => {
  return (
    <div className="w-full bg-background/95 backdrop-blur-md sticky top-[64px] z-100 py-4 pb-10 md:py-0 md:relative md:top-auto md:z-10 md:bg-transparent md:backdrop-blur-none">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-11">
        {/* Mobile Filter Container - Search + Dates + Roles */}
        <div className="max-w-md mx-auto space-y-2 md:hidden">
          {/* Search Bar */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Search by name or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3.5 rounded-full border border-border text-sm font-sans font-medium bg-background h-[36px] text-text-dark placeholder:text-dark-gray focus:outline-none focus:border-primary transition-all shadow-sm hover:shadow-md"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-60">
              <img src="/search.svg" alt="Search" className="w-5 h-5" />
            </div>
          </div>

          {/* Mobile Roles & Dates Row */}
          <div className="flex flex-row items-center gap-3">
            {/* Role Filter Dropdown (Mobile) */}
            <div className="relative flex-1">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-6 py-1.5 rounded-full border border-border text-text-medium text-sm transition-all hover:border-primary bg-white shadow-sm hover:shadow-md"
              >
                <span className="font-sans font-medium text-sm truncate">
                  {selectedRole}
                </span>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`opacity-60 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Dropdown Menu (Mobile) */}
              <div
                className={`absolute top-full mt-2 left-0 right-0 z-[110] origin-top transition-all duration-200 ease-out ${
                  isDropdownOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
                aria-hidden={!isDropdownOpen}
              >
                <div className="bg-white border border-border rounded-2xl shadow-lg overflow-hidden">
                  <ScrollArea className="h-[214px] w-full">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setSelectedRole("All Roles");
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 font-sans text-sm transition-colors ${
                          selectedRole === "All Roles"
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-text-medium hover:bg-background"
                        }`}
                      >
                        All Roles
                      </button>
                      {uniqueRoles.map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            setSelectedRole(role);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-5 py-2.5 font-sans text-sm transition-colors ${
                            selectedRole === role
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-text-medium hover:bg-background"
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>

            {/* Date Filters Group */}
            <div className="flex flex-row items-center">
              <button
                onClick={() =>
                  setSelectedDate(
                    selectedDate === "March 27" ? null : "March 27",
                  )
                }
                className={`px-4 py-1.5 rounded-l-2xl border border-r-0 border-border text-sm font-sans font-medium transition-all ${
                  selectedDate === "March 27"
                    ? "bg-primary text-background border-primary z-10"
                    : "bg-white text-text-medium hover:bg-white"
                }`}
              >
                March 27
              </button>
              <button
                onClick={() =>
                  setSelectedDate(
                    selectedDate === "March 28" ? null : "March 28",
                  )
                }
                className={`px-4 py-1.5 rounded-r-2xl border border-border text-sm font-sans font-medium transition-all -ml-px ${
                  selectedDate === "March 28"
                    ? "bg-primary text-background border-primary z-10"
                    : "bg-white text-text-medium hover:bg-white"
                }`}
              >
                March 28
              </button>
            </div>
          </div>
        </div>

        {/* Desktop & Tablet Filter Layer - Center Aligned */}
        <div className="hidden md:flex justify-center mb-10 lg:mb-19">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-7 lg:px-6 px-4 lg:py-1.5 py-1.5 md:py-1 rounded-full border border-border text-text-medium text-sm md:text-base transition-all hover:border-primary bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
            >
              <span className="font-sans font-medium text-[16px] md:text-xl">
                {selectedRole}
              </span>
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`opacity-100 mt-0.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dropdown Menu (Desktop) */}
            <div
              className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 min-w-[280px] z-50 origin-top transition-all duration-200 ease-out ${
                isDropdownOpen
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
              aria-hidden={!isDropdownOpen}
            >
              <div className="bg-white border border-border rounded-2xl shadow-lg overflow-hidden">
                <ScrollArea className="h-[214px] md:h-[333px] w-full">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setSelectedRole("All Roles");
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 font-sans text-sm transition-colors ${
                        selectedRole === "All Roles"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-text-medium hover:bg-background"
                      }`}
                    >
                      All Roles
                    </button>
                    {uniqueRoles.map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          setSelectedRole(role);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 font-sans text-sm transition-colors ${
                          selectedRole === role
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-text-medium hover:bg-background"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
