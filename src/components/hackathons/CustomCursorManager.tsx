import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CustomCursorManagerProps {
  cardTiltRef?: React.MutableRefObject<{ currentX: number; currentY: number; [key: string]: any }>;
  activeSlideIndex?: number;
  totalSlides?: number;
  isPaused?: boolean;
}

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

/**
 * Permanent Photographic Viewfinder & Mechanical Shutter Cursor
 * - Zero-latency hardware center dot (1:1 tracking)
 * - Spring-damped 4-bracket analog camera viewfinder
 * - Contextual expansion over Polaroid card deck with [ SNAP // NEXT ] badge
 * - Mechanical aperture shutter snap + flash ring pulse on click
 */
export const CustomCursorManager: React.FC<CustomCursorManagerProps> = ({
  isPaused = false,
}) => {
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [hoverContext, setHoverContext] = useState<string | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isClickFlashing, setIsClickFlashing] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Position refs for 60fps RAF spring physics loop
  const mousePos = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  // Direct DOM refs for zero-lag hardware transforms
  const hardwareDotRef = useRef<HTMLDivElement | null>(null);
  const springWrapperRef = useRef<HTMLDivElement | null>(null);

  // Global pointer & context tracking
  useEffect(() => {
    const handleMove = (e: MouseEvent | PointerEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Context inspection
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isInsideHackathons = !!el?.closest('#hackathons, [data-hackathons-section]');
      
      setCursorVisible(isInsideHackathons);

      if (isInsideHackathons) {
        document.body.classList.add("custom-cursor-enabled");
      } else {
        document.body.classList.remove("custom-cursor-enabled");
      }

      if (!el || !isInsideHackathons) {
        setIsHoveringCard(false);
        setHoverContext(null);
        return;
      }

      // Hardware dot: 100% instantaneous 1:1 hardware tracked
      if (hardwareDotRef.current) {
        hardwareDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check Polaroid card deck
      const isCard = !!el.closest('[data-cursor="card"], [data-card-stack], .polaroid-card-hero');
      setIsHoveringCard(isCard);

      // Interactive targets
      if (el.closest('button[title*="Resume"], button[title*="Pause"], button[aria-label*="slide"]')) {
        setHoverContext(isPaused ? "RESUME" : "PAUSE");
      } else if (el.closest('button[aria-label^="Go to slide"]')) {
        const btn = el.closest('button[aria-label^="Go to slide"]');
        const match = btn?.getAttribute("aria-label")?.match(/\d+/);
        setHoverContext(match ? `SLIDE 0${match[0]}` : "SLIDE");
      } else if (el.closest('[data-cursor="tech"], .tech-pill')) {
        setHoverContext(el.textContent?.trim().slice(0, 10).toUpperCase() || "TECH");
      } else if (isCard) {
        setHoverContext("SNAP // NEXT");
      } else if (el.closest('button, a, [role="button"]')) {
        setHoverContext("SELECT");
      } else {
        setHoverContext(null);
      }
    };

    const handleDown = () => {
      setIsMouseDown(true);
      setIsClickFlashing(true);
      setTimeout(() => setIsClickFlashing(false), 380);
    };

    const handleUp = () => {
      setIsMouseDown(false);
    };

    const handleLeave = () => {
      setCursorVisible(false);
    };

    const handleEnter = () => {
      setCursorVisible(true);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorVisible, isPaused]);

  // Spring physics render loop for trailing viewfinder brackets
  useEffect(() => {
    const tick = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      smoothPos.current.x = lerp(smoothPos.current.x, targetX, 0.18);
      smoothPos.current.y = lerp(smoothPos.current.y, targetY, 0.18);

      if (springWrapperRef.current) {
        springWrapperRef.current.style.transform = `translate3d(${smoothPos.current.x}px, ${smoothPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!cursorVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      
      {/* LAYER 1: Zero-Latency Hardware Pinpoint Center Dot */}
      <div 
        ref={hardwareDotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform z-10"
      >
        <div 
          className={cn(
            "w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)] transition-transform duration-100",
            isMouseDown && "scale-50"
          )} 
        />
      </div>

      {/* LAYER 2: Spring-Damped Trailing Viewfinder Corner Brackets */}
      <div 
        ref={springWrapperRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
      >
        <div className="relative flex items-center justify-center">
          
          {/* 4 Viewfinder Corner Brackets */}
          <div 
            className={cn(
              "transition-all duration-200 ease-out shrink-0 flex items-center justify-center relative",
              isHoveringCard ? "w-14 h-14" : hoverContext ? "w-10 h-10" : "w-7 h-7",
              isMouseDown && "scale-75",
              isClickFlashing && "border-white"
            )}
          >
            {/* Top-Left Corner */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t-[1.5px] border-l-[1.5px] border-white/80" />
            {/* Top-Right Corner */}
            <span className="absolute top-0 right-0 w-2 h-2 border-t-[1.5px] border-r-[1.5px] border-white/80" />
            {/* Bottom-Left Corner */}
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b-[1.5px] border-l-[1.5px] border-white/80" />
            {/* Bottom-Right Corner */}
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-[1.5px] border-r-[1.5px] border-white/80" />

            {/* Aperture Click Flash Ring */}
            {isClickFlashing && (
              <div className="absolute inset-0 rounded-full border border-white animate-ping opacity-90" />
            )}
          </div>

          {/* Context Subtitle Label (e.g. [ SNAP // NEXT ] or [ PAUSE ]) */}
          {(isHoveringCard || hoverContext) && (
            <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/85 border border-white/15 text-[8px] font-mono tracking-widest text-[#00e599] uppercase shadow-xl backdrop-blur-md">
              {hoverContext || "SNAP // NEXT"}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default CustomCursorManager;
