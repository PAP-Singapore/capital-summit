import React from "react";
import { useNavigate } from "react-router-dom";
import { type SpeakerUI } from "../../lib/speakers-client";
import { type AgendaDay } from "../agenda/agenda-types";
import { type DetailSession } from "./SpeakerDetailSessionCard";
import SpeakerDetailSessionCard from "./SpeakerDetailSessionCard";
import ButtonNew from "../ui/ButtonNew";

interface SpeakerDetailSessionsProps {
  speaker: SpeakerUI;
  agendaDays: AgendaDay[];
  selectedDayKey: string;
  onDayChange: (key: string) => void;
}

const SpeakerDetailSessions: React.FC<SpeakerDetailSessionsProps> = ({
  speaker,
  agendaDays,
  selectedDayKey,
  onDayChange,
}) => {
  const navigate = useNavigate();
  const selectedDay = agendaDays.find((d) => d.key === selectedDayKey);

  return (
    <div className="w-full lg:w-[70%] flex flex-col lg:pl-[30px] mt-0 lg:mt-9.5">
      {agendaDays.length > 0 && (
        <div className="flex justify-center lg:justify-start mb-7 md:mb-10 ">
          <div className="inline-flex rounded-full border border-dark-gray overflow-hidden bg-white h-[34px] md:h-[42px]">
            {agendaDays.map((day, idx) => {
              const isActive = day.key === selectedDayKey;
              return (
                <button
                  key={day.key}
                  onClick={() => onDayChange(day.key)}
                  className={`
                    px-5 md:px-6 md:py-2 h-full
                    font-sans text-sm md:text-base lg:text-xl font-medium items-center flex
                    transition-all duration-300
                    ${idx > 0 ? "border-l border-dark-gray" : ""}
                    ${isActive ? "bg-primary text-background" : "text-text-medium hover:bg-gray-50"}
                  `}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col">
        {selectedDay?.sessions.map((session) => (
          <SpeakerDetailSessionCard
            key={session.id}
            session={session as DetailSession}
          />
        ))}

        {(!selectedDay?.sessions?.length || agendaDays.length === 0) && (
          <div className="py-12 text-center">
            <p className="font-sans text-base text-text-medium">
              No sessions scheduled for this day.
            </p>
          </div>
        )}
      </div>

      {agendaDays.length > 0 && (
        <div className="mt-9 md:mt-12 flex justify-center lg:pl-4">
          <ButtonNew
            variant="outline"
            className="border-dark-gray! text-text-dark font-medium h-12 px-5 md:px-10"
            onClick={() =>
              navigate(`/agenda?search=${encodeURIComponent(speaker.name)}`)
            }
          >
            View Full Agenda
          </ButtonNew>
        </div>
      )}
    </div>
  );
};

export default SpeakerDetailSessions;
