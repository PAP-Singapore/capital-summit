import { cn } from "../../lib/utils";
import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  draggable?: boolean;
}

export interface MarqueeHandle {
  scrollBy: (amount: number) => void;
}

export const Marquee = forwardRef<MarqueeHandle, MarqueeProps>(function Marquee(
  {
    className,
    reverse,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
    draggable = false,
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isSmoothScrolling, setIsSmoothScrolling] = useState(false);
  const wasDraggingRef = useRef(false);

  const isPaused = (pauseOnHover && isHovered) || isDragging;

  useImperativeHandle(ref, () => ({
    scrollBy: (amount: number) => {
      setIsSmoothScrolling(true);
      setCurrentOffset((prev) => prev + amount);
      setTimeout(() => setIsSmoothScrolling(false), 500);
    },
  }));

  // Threshold in pixels - movements smaller than this are treated as clicks
  const DRAG_THRESHOLD = 5;

  // Measure the width of a single set of items for infinite looping
  useEffect(() => {
    if (innerRef.current && draggable && !initializedRef.current) {
      const firstChild = innerRef.current.children[0] as HTMLElement;
      if (firstChild) {
        // Get the gap value from CSS variable
        const computedStyle = getComputedStyle(innerRef.current);
        const gap = parseFloat(computedStyle.gap) || 0;
        const width = firstChild.offsetWidth + gap;
        setSingleSetWidth(width);
        // Initialize offset to start in the middle of repeated content
        // This gives room to drag in both directions
        setCurrentOffset(-width);
        initializedRef.current = true;
      }
    }
  }, [draggable, children]);

  // Silently reset offset when it drifts too far (after drag ends)
  // This creates the infinite loop effect
  useEffect(() => {
    if (!isDragging && singleSetWidth > 0 && initializedRef.current) {
      const maxOffset = 0;
      const minOffset = -singleSetWidth * (repeat - 1);

      if (currentOffset > maxOffset) {
        // Drifted too far right, reset back
        setIsResetting(true);
        setCurrentOffset((prev) => prev - singleSetWidth);
        requestAnimationFrame(() => setIsResetting(false));
      } else if (currentOffset < minOffset) {
        // Drifted too far left, reset back
        setIsResetting(true);
        setCurrentOffset((prev) => prev + singleSetWidth);
        requestAnimationFrame(() => setIsResetting(false));
      }
    }
  }, [currentOffset, isDragging, singleSetWidth, repeat]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (isDragging) {
      const wasMeaningfulDrag = Math.abs(dragOffset) > DRAG_THRESHOLD;
      setIsDragging(false);
      setCurrentOffset((prev) => prev + dragOffset);
      setDragOffset(0);

      if (wasMeaningfulDrag) {
        wasDraggingRef.current = true;
        requestAnimationFrame(() => {
          wasDraggingRef.current = false;
        });
      }
    }
  }, [isDragging, dragOffset]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!draggable) return;
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.clientX);
      setDragOffset(0);
    },
    [draggable],
  );

  // Touch events for mobile drag support
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!draggable) return;
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setDragOffset(0);
    },
    [draggable],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!draggable || !isDragging) return;
      const diff = e.touches[0].clientX - startX;
      setDragOffset(diff);
    },
    [draggable, isDragging, startX],
  );

  const handleTouchEnd = useCallback(() => {
    if (!draggable || !isDragging) return;
    const wasMeaningfulDrag = Math.abs(dragOffset) > DRAG_THRESHOLD;
    setIsDragging(false);
    setCurrentOffset((prev) => prev + dragOffset);
    setDragOffset(0);

    if (wasMeaningfulDrag) {
      wasDraggingRef.current = true;
      requestAnimationFrame(() => {
        wasDraggingRef.current = false;
      });
    }
  }, [draggable, isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    if (!draggable || !isDragging) return;
    const wasMeaningfulDrag = Math.abs(dragOffset) > DRAG_THRESHOLD;
    setIsDragging(false);
    setCurrentOffset((prev) => prev + dragOffset);
    setDragOffset(0);

    if (wasMeaningfulDrag) {
      // Mark that we just finished a drag so the click event gets suppressed
      wasDraggingRef.current = true;
      // Reset after a tick so future real clicks work
      requestAnimationFrame(() => {
        wasDraggingRef.current = false;
      });
    }
  }, [draggable, isDragging, dragOffset]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!draggable || !isDragging) return;
      e.preventDefault();
      const diff = e.clientX - startX;
      setDragOffset(diff);
    },
    [draggable, isDragging, startX],
  );

  // Handle mouse up outside the component
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        const wasMeaningfulDrag = Math.abs(dragOffset) > DRAG_THRESHOLD;
        setIsDragging(false);
        setCurrentOffset((prev) => prev + dragOffset);
        setDragOffset(0);

        if (wasMeaningfulDrag) {
          wasDraggingRef.current = true;
          requestAnimationFrame(() => {
            wasDraggingRef.current = false;
          });
        }
      }
    };

    if (isDragging) {
      window.addEventListener("mouseup", handleGlobalMouseUp);
      return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }
  }, [isDragging, dragOffset]);

  // Use raw offset for smooth dragging - the reset effect handles wrapping
  const totalOffset = currentOffset + dragOffset;

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex overflow-hidden [--duration:40s] [--gap:1rem] gap-(--gap)",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
          "cursor-grab select-none": draggable && !isDragging,
          "cursor-grabbing select-none": draggable && isDragging,
        },
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClickCapture={(e) => {
        // Suppress click events that fire after a drag
        if (wasDraggingRef.current) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      {/* Wrapper div for drag offset - separate from animation */}
      <div
        ref={innerRef}
        className="flex gap-(--gap)"
        style={{
          transform: draggable ? `translateX(${totalOffset}px)` : undefined,
          transition:
            isDragging || isResetting
              ? "none"
              : isSmoothScrolling
                ? "transform 0.5s ease-in-out"
                : "transform 0.1s ease-out",
        }}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn("flex shrink-0 justify-around gap-5 pt-2", {
                "animate-marquee flex-row": !vertical,
                "animate-marquee-vertical flex-col": vertical,
                "[animation-direction:reverse]": reverse,
              })}
              style={{
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {children}
            </div>
          ))}
      </div>
    </div>
  );
});
