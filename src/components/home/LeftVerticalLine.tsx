import React from "react";

export const LeftVerticalLine: React.FC = () => (
  <div className="fixed top-0 left-0 bottom-0 w-px bg-linear-to-b from-transparent via-border to-border z-10 pointer-events-none"></div>
);

export const DesktopSeparatorLine: React.FC = () => (
  <div
    className="hidden lg:block fixed top-0 right-[36.5%] bottom-0 w-px z-10"
    style={{
      background:
        "linear-gradient(to bottom, transparent 0%, transparent 3%, var(--color-border) 8%, var(--color-border) 100%)",
    }}
  ></div>
);
