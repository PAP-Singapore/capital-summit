import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInOptions {
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
  stagger?: number;
  childSelector?: string;
}

export const useFadeInOnScroll = <T extends HTMLElement>(
  options: FadeInOptions = {},
) => {
  const ref = useRef<T>(null);

  const {
    y = 40,
    duration = 0.8,
    delay = 0,
    start = "top 95%",
    stagger,
    childSelector,
  } = options;

  useGSAP(
    () => {
      if (!ref.current) return;

      const tweens: gsap.core.Tween[] = [];

      if (childSelector) {
        const children = ref.current.querySelectorAll(childSelector);
        children.forEach((child, index) => {
          gsap.set(child, { opacity: 0, y });
          const tween = gsap.to(child, {
            opacity: 1,
            y: 0,
            duration,
            delay: delay + (stagger || 0) * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: child,
              start,
              toggleActions: "play none none reset",
            },
          });
          tweens.push(tween);
        });
      } else {
        gsap.set(ref.current, { opacity: 0, y });
        const tween = gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none reset",
          },
        });
        tweens.push(tween);
      }

      return () => {
        tweens.forEach((tween) => tween.kill());
      };
    },
    { scope: ref },
  );

  return ref;
};

export default useFadeInOnScroll;
