import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SpeakerUI } from "../../lib/speakers-client";
import { RevealCard } from "./SpeakerCard";

gsap.registerPlugin(ScrollTrigger);

interface SpeakersListProps {
  filteredSpeakers: SpeakerUI[];
  loading: boolean;
  error: string | null;
  speakersSectionRef: React.RefObject<HTMLElement>;
}

export const SpeakersList: React.FC<SpeakersListProps> = ({
  filteredSpeakers,
  loading,
  error,
  speakersSectionRef,
}) => {
  useGSAP(
    () => {
      if (!filteredSpeakers.length) return;

      ScrollTrigger.batch(".speaker-card-reveal", {
        onEnter: (batch) => {
          // Group elements by their vertical position to animate row-by-row
          const rows: { [key: number]: Element[] } = {};
          batch.forEach((el) => {
            const y = Math.round(el.getBoundingClientRect().top);
            // Use a small threshold (10px) to account for minor layout variations
            const matchedKey = Object.keys(rows).find(key => Math.abs(Number(key) - y) < 10);
            if (matchedKey) {
              rows[Number(matchedKey)].push(el);
            } else {
              rows[y] = [el];
            }
          });

          // Sort rows by vertical position (top to bottom)
          const sortedY = Object.keys(rows).map(Number).sort((a, b) => a - b);
          
          sortedY.forEach((y, index) => {
            gsap.to(rows[y], {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.15, // Stagger rows distinctly
              ease: "expo.out",
              overwrite: true,
            });
          });
        },
        onEnterBack: (batch) => {
          // When scrolling up, show items immediately without progressiveness
          gsap.set(batch, {
            opacity: 1,
            y: 0,
            overwrite: true,
          });
        },
        onLeave: (batch) => {
          // Reset state for re-animation when scrolling deep away
          gsap.set(batch, {
            opacity: 0,
            y: 32,
            overwrite: true,
          });
        },
        onLeaveBack: (batch) => {
          // Reset state for re-animation when scrolling back up past items
          gsap.set(batch, {
            opacity: 0,
            y: 32,
            overwrite: true,
          });
        },
      });
    },
    { scope: speakersSectionRef, dependencies: [filteredSpeakers] }
  );

  return (
    <section ref={speakersSectionRef} className="w-full bg-background pb-10 md:pb-[72px] lg:pb-[112px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        {error && (
          <div className="text-center py-20">
            <p className="font-sans text-lg text-text-medium">{error}</p>
          </div>
        )}
        {loading && !error && (
          <div className="text-center py-20">
            <p className="font-sans text-lg text-text-medium">Loading speakers…</p>
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 gap-y-7 md:gap-x-4 md:gap-y-12 lg:gap-x-6.5 lg:gap-y-[71px]">
            {filteredSpeakers.map((speaker) => (
              <RevealCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        )}

        {!loading && !error && filteredSpeakers.length === 0 && (
          <div className="text-center py-20">
            <p className="font-sans text-lg text-text-medium">
              No speakers found for this role.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
