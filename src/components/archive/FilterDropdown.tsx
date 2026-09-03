import React, { useState, useEffect, useRef } from "react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, options, value, onChange, className }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const hasValue = value !== label;

  return (
    <div ref={ref} className={`relative ${className || ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between gap-2 md:gap-5 px-[23px] py-1.5 rounded-full border transition-all duration-200 font-sans text-sm md:text-xl font-medium shadow-sm active:scale-95 w-full ${
          hasValue
            ? "border-primary/30 bg-primary/5 text-primary"
            : "border-dark-gray text-text-medium hover:border-text-light"
        }`}
      >
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{hasValue ? value : label}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className={`shrink-0 transition-transform duration-300 opacity-100 ${open ? "rotate-180" : "rotate-0"}`}
        >
          <path d="M1 2L6 7L11 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 min-w-[200px] md:min-w-[280px] border border-dark-gray rounded-[16px] shadow-2xl z-50 overflow-hidden ring-1 ring-black/5 bg-white">
          <div
            data-lenis-prevent
            className="max-h-[450px] overflow-y-auto overscroll-contain py-2 px-1 custom-scrollbar"
          >
            {[label, ...options].map((opt) => {
              const isSelected = value === opt || (opt === label && value === label);
              return (
                <button
                  key={opt}
                  onClick={() => {
                    onChange(opt === label ? label : opt);
                    setOpen(false);
                  }}
                  className={`block w-full text-left px-5 py-2.5 font-sans text-[13px] transition-colors ${
                    isSelected
                      ? "bg-primary/5 text-primary font-semibold"
                      : "text-text-medium hover:bg-black/5"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
