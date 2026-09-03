import React from "react";
import { useNavigate } from "react-router-dom";
const arrowBack = "/arrow-back.svg";

const SpeakerDetailBackNav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-12 py-4 md:py-6">
      <button
        onClick={() => navigate("/speakers")}
        className="flex items-center gap-3 md:gap-4 font-sans text-sm lg:text-xl font-medium text-text-muted group"
      >
        <img
          src={arrowBack}
          alt="Back"
          className="md:w-4 md:h-4 h-3 w-3 mt-0.5"
        />
        Back to Speakers
      </button>
    </div>
  );
};

export default SpeakerDetailBackNav;
