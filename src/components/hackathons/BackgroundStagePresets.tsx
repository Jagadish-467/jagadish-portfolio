import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { CardItem } from "./CardStackSection";
import { BackgroundThread } from "./BackgroundThread";

// Card-reactive ambient aura colors for each slide (Restrained monochrome & green)
export const CARD_AURA_COLORS: Record<string | number, { primary: string; glow: string; label: string }> = {
  1: { primary: "#00e599", glow: "rgba(0, 229, 153, 0.06)", label: "Emerald AU Aura" },
  2: { primary: "#00e599", glow: "rgba(0, 229, 153, 0.06)", label: "Techniverse Systems Aura" },
  3: { primary: "#00e599", glow: "rgba(0, 229, 153, 0.05)", label: "SIH Screening Aura" },
  4: { primary: "#00e599", glow: "rgba(0, 229, 153, 0.06)", label: "LNIT Final 10 Aura" },
  5: { primary: "#00e599", glow: "rgba(0, 229, 153, 0.06)", label: "Adobe Final Round Aura" },
};

interface BackgroundAtmosphereProps {
  activeIndex: number;
  cards: CardItem[];
  progressRef?: React.MutableRefObject<number>;
  className?: string;
}

/**
 * Permanent Atmospheric Canvas: Option 6 (Curated Blend)
 * - Volumetric slide-reactive ambient aura spotlight behind cards
 * - Organic flowing background thread animation reactive to scroll
 * - Architectural perimeter rails & technical corner crosshairs (+)
 * - Bottom archive index rail & navigation guidance
 */
export const BackgroundStagePresets = ({
  activeIndex,
  cards,
  progressRef,
  className = "",
}: BackgroundAtmosphereProps) => {
  const currentCard = cards[activeIndex] || cards[0];
  const auraConfig = CARD_AURA_COLORS[currentCard.id] || CARD_AURA_COLORS[1];

  // Dynamic Hackathon Year calculation for synchronized mechanical odometer reel
  const currentYear = useMemo(() => {
    const match = currentCard?.date?.match(/\d{4}/) || currentCard?.title?.match(/\d{4}/);
    return match ? match[0] : "2024";
  }, [currentCard?.date, currentCard?.title]);

  const yearPrefix = currentYear.slice(0, 3); // "202"

  // Collect distinct last digits (e.g. ["4", "5"] for 2024-2025) while preserving order
  const yearDigits = useMemo(() => {
    const digits: string[] = [];
    cards.forEach((card) => {
      const match = card.date?.match(/\d{4}/) || card.title?.match(/\d{4}/);
      const digit = match ? match[0].slice(3) : "4";
      if (digit && !digits.includes(digit)) {
        digits.push(digit);
      }
    });
    return digits.length > 0 ? digits : ["4", "5"];
  }, [cards]);

  const currentLastDigit = currentYear.slice(3) || "4";
  const activeDigitIndex = Math.max(0, yearDigits.indexOf(currentLastDigit));

  return (
    <div className={cn("absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0", className)}>
      
      {/* ======================================================== */}
      {/* LAYER 1: Slide-Reactive Ambient Aura Spotlight           */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left aura directly behind the 3D polaroid card deck */}
        <div 
          className="absolute top-1/2 left-[28%] -translate-x-1/2 -translate-y-1/2 w-[520px] md:w-[650px] lg:w-[720px] h-[520px] md:h-[650px] lg:h-[720px] rounded-full blur-[110px] md:blur-[140px] pointer-events-none transition-colors duration-1000 ease-out"
          style={{
            backgroundColor: auraConfig.glow,
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* Subtle center ambient radial bleed for holistic depth */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-colors duration-1000 ease-out"
          style={{
            backgroundColor: auraConfig.glow,
            opacity: 0.45,
          }}
        />
      </div>

      {/* ======================================================== */}
      {/* LAYER 2: Organic Flowing Reactive Background Thread      */}
      {/* ======================================================== */}
      {/* Temporarily hidden per request */}
      {/* <BackgroundThread 
        activeIndex={activeIndex}
        progressRef={progressRef}
        totalSlides={cards.length}
      /> */}

      {/* ======================================================== */}
      {/* LAYER 3: Architectural Perimeter Rails & HUD Framing     */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Far Left Hairline Guide Rail */}
        <div className="absolute top-0 bottom-0 left-4 md:left-6 w-[1px] bg-white/[0.04] hidden md:block" />

        {/* Far Right Hairline Guide Rail */}
        <div className="absolute top-0 bottom-0 right-4 md:right-6 w-[1px] bg-white/[0.04] hidden md:block" />

        {/* Four Minimalist Technical Corner Crosshairs (+) */}
        <span className="absolute top-3 left-3 text-white/35 font-mono text-xs hidden md:block select-none">+</span>
        <span className="absolute top-3 right-3 text-white/35 font-mono text-xs hidden md:block select-none">+</span>
        <span className="absolute bottom-3 left-3 text-white/35 font-mono text-xs hidden md:block select-none">+</span>
        <span className="absolute bottom-3 right-3 text-white/35 font-mono text-xs hidden md:block select-none">+</span>

        {/* Bottom Left Status & Track Indicator Rail with Synchronized Odometer Reel */}
        <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8 flex items-center gap-2.5 font-mono text-[10px] tracking-widest text-white/45 hidden sm:flex">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00e599] animate-pulse" />
          {/* Dynamic Year Odometer: static "ARCHIVE // 202" with synchronized rolling digit reel */}
          <div className="flex items-center">
            <span>ARCHIVE //&nbsp;</span>
            <span className="h-[18px] leading-[18px] flex items-center text-[10px] text-white font-bold">
              {yearPrefix}
            </span>
            <div className="h-[18px] overflow-hidden relative w-2 text-white font-bold">
              <div 
                className="flex flex-col will-change-transform transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${activeDigitIndex * 18}px)` }}
              >
                {yearDigits.map((digit) => (
                  <span 
                    key={digit} 
                    className="h-[18px] leading-[18px] shrink-0 flex items-center justify-center text-[10px] text-white font-bold"
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-0.5">
            <span className="text-white/30">INDEX [</span>
            <div className="h-[18px] overflow-hidden relative w-5 text-white font-bold inline-block">
              <div 
                className="flex flex-col will-change-transform transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${activeIndex * 18}px)` }}
              >
                {cards.map((_, i) => (
                  <span key={i} className="h-[18px] leading-[18px] shrink-0 flex items-center justify-center text-[10px] text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-white/30">/</span>
            <span className="text-white/50 ml-0.5">{String(cards.length).padStart(2, "0")}</span>
            <span className="text-white/30">]</span>
          </div>
        </div>

        {/* Bottom Right Interaction Guidance Badges */}
        <div className="absolute bottom-4 right-6 md:bottom-6 md:right-8 flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/40 hidden md:flex">
          <span className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.02] text-white/60 text-[9px]">↑</span>
          <span className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.02] text-white/60 text-[9px]">↓</span>
          <span className="text-white/30">/ SCROLL TO EXPLORE</span>
        </div>

        {/* Bottom Center Hairline Edge Frame Rule */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

    </div>
  );
};

export default BackgroundStagePresets;
