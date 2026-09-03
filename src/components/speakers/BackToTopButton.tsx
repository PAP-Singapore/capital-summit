import React, { useState, useEffect, useCallback } from "react";

export const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-12 right-8 z-9999 flex items-center justify-center w-12 h-12 md:w-[72px] md:h-[72px] rounded-full  bg-primary shadow-md transition-all duration-300 hover:border-primary hover:shadow-lg group ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <img src="/arrowup.svg" alt="Back to top" className="w-5 h-5 md:w-8 md:h-8" />
    </button>
  );
};
