import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface AgendaFilterDropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}

const AgendaFilterDropdown: React.FC<AgendaFilterDropdownProps> = ({
  label,
  options,
  selected,
  onSelect,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const displayLabel = selected || label;

  const handleSelect = (value: string) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between gap-4 lg:px-6 px-4 h-[34px] md:h-[42px] rounded-full border transition-all duration-200 bg-background backdrop-blur-sm shadow-sm hover:shadow-md w-full ${
          selected
            ? "border-primary text-primary"
            : "border-border text-text-medium hover:border-primary"
        }`}
      >
        <span className="font-sans font-medium text-sm md:text-xl truncate">
          {displayLabel}
        </span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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

      {/* Click-away overlay */}
      {open && (
        <div className="fixed inset-0 z-110" onClick={() => setOpen(false)} />
      )}

      {/* Dropdown panel */}
      <div
        className={`absolute top-full mt-2 left-0 md:left-1/2 md:-translate-x-1/2 min-w-[150px] md:min-w-[280px] z-120 origin-top transition-all duration-200 ease-out ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="bg-white border border-border rounded-2xl shadow-lg overflow-hidden">
          <ScrollArea className="h-[214px] md:h-[300px] w-full">
            <div className="py-2">
              {/* "All" reset option */}
              <button
                onClick={() => handleSelect("")}
                className={`w-full text-left px-5 py-2.5 font-sans text-sm transition-colors ${
                  !selected
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-text-medium hover:bg-background"
                }`}
              >
                {label}
              </button>

              {/* Option list */}
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left px-5 py-2.5 font-sans text-sm transition-colors ${
                    selected === opt
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-text-medium hover:bg-background"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default AgendaFilterDropdown;
