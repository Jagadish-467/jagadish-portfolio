import { forwardRef, useImperativeHandle, useRef, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CardItem } from "./CardStackSection";

export interface CardStackTextHandle {
  updateProgress: (progress: number) => void;
}

export interface CardStackTextProps {
  cards: CardItem[];
  activeIndex: number;
  isAnimationComplete?: boolean;
  countdownProgress?: number;
  isPaused?: boolean;
  onAnimationComplete?: (index: number) => void;
  onSelectIndex?: (index: number) => void;
  className?: string;
}

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

interface LineSchedule {
  key: string;
  val: string;
  isResult: boolean;
  keyStart: number;
  keyInterval: number;
  valStart: number;
  valInterval: number;
}

interface TechPillSchedule {
  tech: string;
  start: number;
  interval: number;
}

interface CardSchedule {
  metaText: string;
  metaStart: number;
  metaInterval: number;
  titleStart: number;
  titleInterval: number;
  stmtStart: number;
  stmtInterval: number;
  dividerStart: number;
  boxLines: LineSchedule[];
  techPills: TechPillSchedule[];
  resultBadgeStart: number;
  resultBadgeInterval: number;
  totalDuration: number;
}

export const ANIMATION_SYNC_DURATION = 2200; // ms: exact shared duration for both card and text

function computeCardSchedule(card: CardItem, targetDuration = ANIMATION_SYNC_DURATION): CardSchedule {
  const bloomDuration = 360; // ms: duration of spring-damper physical strike keyframe
  const maxDelay = targetDuration - bloomDuration; // 1840ms: when the final letter starts striking

  // 1. Meta (0.04s - 0.20s)
  const metaText = `${card.date}  ·  ${card.result}`;
  const metaStart = 40;
  const metaInterval = Math.max(5, (200 - metaStart) / Math.max(1, metaText.length));

  // 2. Title (0.18s - 0.42s)
  const titleStart = 180;
  const titleInterval = Math.max(12, (420 - titleStart) / Math.max(1, card.title.length));

  // 3. Statement (0.40s - 0.74s)
  const stmtStart = 400;
  const stmtInterval = Math.max(6, (740 - stmtStart) / Math.max(1, card.statement.length));

  // 4. Divider (0.70s)
  const dividerStart = 700;

  // 5. Box Lines (0.82s - 1.66s: dedicated 840ms for clear, distinct letter-by-letter typing)
  const boxStart = 820;
  const boxEnd = 1660;
  const rawBoxLines = card.description.split("\n");

  let totalChars = 0;
  rawBoxLines.forEach((l) => {
    totalChars += l.length + 12;
  });

  let boxCurrent = boxStart;
  const boxLines: LineSchedule[] = rawBoxLines.map((line) => {
    const splitIdx = line.indexOf(":");
    let key = "";
    let val = line;
    let isResult = false;

    if (splitIdx !== -1) {
      key = `[${line.substring(0, splitIdx).trim()}]`;
      val = line.substring(splitIdx + 1).trim();
      isResult = key.includes("RESULT");
    }

    const lineRatio = (line.length + 12) / Math.max(1, totalChars);
    const lineBudget = (boxEnd - boxStart) * lineRatio;

    const keyStart = boxCurrent;
    const keyInterval = key.length > 0 ? (lineBudget * 0.16) / key.length : 0;
    const keyEnd = key.length > 0 ? keyStart + key.length * keyInterval : keyStart;

    const valStart = keyEnd + 15;
    const valInterval = (lineBudget * 0.78) / Math.max(1, val.length);
    const valEnd = valStart + val.length * valInterval;

    boxCurrent = valEnd + 25;

    return {
      key,
      val,
      isResult,
      keyStart,
      keyInterval,
      valStart,
      valInterval,
    };
  });

  // 6. Tech Pills (1.67s - 1.78s)
  const techStart = 1670;
  const techEnd = 1780;
  let totalTechChars = 0;
  card.technologies.forEach((t) => {
    totalTechChars += t.length + 6;
  });

  let techCurrent = techStart;
  const techPills: TechPillSchedule[] = card.technologies.map((tech) => {
    const techRatio = (tech.length + 6) / Math.max(1, totalTechChars);
    const pillBudget = (techEnd - techStart) * techRatio;
    const start = techCurrent;
    const interval = (pillBudget * 0.78) / Math.max(1, tech.length);
    techCurrent = start + tech.length * interval + 15;
    return { tech, start, interval };
  });

  // 7. Result Badge: last character begins at EXACTLY maxDelay (1840ms)
  // so with 360ms physical recoil, it settles at exactly targetDuration (2200ms)
  const resultBadgeStart = card.technologies && card.technologies.length > 0 ? 1790 : 1680;
  const resultBadgeInterval = (maxDelay - resultBadgeStart) / Math.max(1, card.result.length);

  return {
    metaText,
    metaStart,
    metaInterval,
    titleStart,
    titleInterval,
    stmtStart,
    stmtInterval,
    dividerStart,
    boxLines,
    techPills,
    resultBadgeStart,
    resultBadgeInterval,
    totalDuration: targetDuration,
  };
}

interface AnimatedLetterTextProps {
  text: string;
  startDelay: number;
  charInterval?: number;
  active: boolean;
  isAccent?: boolean;
  charClassName?: string;
  className?: string;
}

const AnimatedLetterText = ({
  text,
  startDelay,
  charInterval = 8,
  active,
  isAccent = false,
  charClassName,
  className,
}: AnimatedLetterTextProps) => {
  const words = useMemo(() => text.split(" "), [text]);

  let globalCharIndex = 0;

  return (
    <span className={cn("inline", className)} style={{ perspective: "800px" }}>
      {words.map((word, wIdx) => {
        const chars = Array.from(word);
        const wordStartIndex = globalCharIndex;
        globalCharIndex += chars.length + 1;

        if (word === "") {
          return (
            <span key={wIdx} className="inline-block mr-[0.28em]">
              &nbsp;
            </span>
          );
        }

        return (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
            {chars.map((char, cIdx) => {
              const charIndex = wordStartIndex + cIdx;
              const delay = startDelay + charIndex * charInterval;

              return (
                <span
                  key={cIdx}
                  className={cn(
                    "inline-block will-change-[transform,opacity,filter] origin-bottom",
                    charClassName
                  )}
                  style={{
                    animation: active
                      ? `${isAccent ? "letterAccentReveal" : "letterReveal"} 0.38s cubic-bezier(0.16, 1, 0.3, 1) both`
                      : "none",
                    animationDelay: `${delay}ms`,
                    opacity: active ? undefined : 0,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

export const CardStackText = forwardRef<CardStackTextHandle, CardStackTextProps>(
  (
    {
      cards,
      activeIndex,
      isAnimationComplete = false,
      countdownProgress = 0,
      isPaused = false,
      onAnimationComplete,
      onSelectIndex,
      className,
    },
    ref
  ) => {
    const odometerRef = useRef<HTMLDivElement>(null);

    const cardSchedules = useMemo(() => {
      return cards.map((c) => computeCardSchedule(c));
    }, [cards]);

    useImperativeHandle(
      ref,
      () => ({
        updateProgress: (progress) => {
          const totalCards = cards.length;
          if (totalCards === 0) return;

          const phaseStep = 1 / Math.max(1, totalCards - 1);
          const continuousIndex = progress / phaseStep;

          if (odometerRef.current) {
            const clampedIndex = clamp(continuousIndex, 0, totalCards - 1);
            odometerRef.current.style.transform = `translateY(-${(clampedIndex * 24).toFixed(2)}px)`;
          }
        },
      }),
      [cards]
    );

    useEffect(() => {
      if (activeIndex < 0 || activeIndex >= cardSchedules.length) return;

      const schedule = cardSchedules[activeIndex];
      const timer = setTimeout(() => {
        onAnimationComplete?.(activeIndex);
      }, schedule.totalDuration);

      return () => clearTimeout(timer);
    }, [activeIndex, cardSchedules, onAnimationComplete]);

    return (
      <div className={cn("relative w-full max-w-[520px] lg:max-w-[560px] select-none flex flex-col justify-center", className)}>
        {/* Milestone Bar: Mechanical Odometer Reel + Consolidated Slide Indicators */}
        <div className="flex items-center justify-between mb-3.5 w-full z-20">
          <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-white/60 tracking-[0.2em] uppercase">
            <span className="text-white/40 font-semibold">[</span>
            <div className="h-6 overflow-hidden relative w-7 text-white font-bold inline-block">
              <div ref={odometerRef} className="flex flex-col will-change-transform">
                {cards.map((_, i) => (
                  <span key={i} className="h-6 flex items-center">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-white/30">/</span>
            <span className="text-white/60">{String(cards.length).padStart(2, "0")}</span>
            <span className="text-white/40 font-semibold">]</span>
          </div>

          {/* Interactive Slide Dots consolidated next to milestone */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {cards.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectIndex?.(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  idx === activeIndex
                    ? "w-7 bg-[#00e599]"
                    : "w-2 bg-white/25 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stack of text layers - unified flush architectural column */}
        <div className="relative w-full h-[520px] lg:h-[550px]">
          {cards.map((card, index) => {
            const isActive = index === activeIndex;
            const schedule = cardSchedules[index];

            return (
              <div
                key={`card-text-${card.id}-${isActive ? "active" : "dormant"}`}
                className={cn(
                  "absolute inset-0 flex flex-col justify-center will-change-transform transition-all duration-400 ease-out",
                  isActive
                    ? "opacity-100 translate-y-0 pointer-events-auto z-10"
                    : "opacity-0 translate-y-4 pointer-events-none z-0"
                )}
              >
                {/* Date & Result metadata line - Letter by Letter */}
                <div className="text-[11px] sm:text-xs font-mono tracking-[0.22em] text-white/60 uppercase mb-2.5">
                  <AnimatedLetterText
                    text={schedule.metaText}
                    startDelay={schedule.metaStart}
                    charInterval={schedule.metaInterval}
                    active={isActive}
                  />
                </div>

                {/* Headline Title - Letter by Letter */}
                <div className="py-0.5 mb-2.5">
                  <h3 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-white flex flex-wrap leading-[1.12]">
                    <AnimatedLetterText
                      text={card.title}
                      startDelay={schedule.titleStart}
                      charInterval={schedule.titleInterval}
                      active={isActive}
                    />
                  </h3>
                </div>

                {/* Statement - Letter by Letter (Full column width) */}
                <div className="py-0.5 mb-4 w-full">
                  <p className="text-base sm:text-[1.05rem] text-white/85 font-normal leading-relaxed flex flex-wrap">
                    <AnimatedLetterText
                      text={card.statement}
                      startDelay={schedule.stmtStart}
                      charInterval={schedule.stmtInterval}
                      active={isActive}
                    />
                  </p>
                </div>

                {/* Architectural Hairline Divider with Integrated 5s Timeline Beam */}
                <div className="relative w-full h-[1px] mb-4 overflow-visible">
                  {/* Baseline Hairline Guide (Scales in with entrance animation at 700ms) */}
                  <div
                    className="absolute inset-0 h-[1px] bg-white/15 origin-left w-full will-change-transform"
                    style={{
                      animation: isActive
                        ? "hairlineSweepIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both"
                        : "none",
                      animationDelay: `${schedule.dividerStart}ms`,
                      transformOrigin: "left",
                    }}
                  />

                  {/* Active Charging Beam across the 5s countdown */}
                  {isActive && (
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 h-[1px] pointer-events-none will-change-[width,opacity]",
                        isPaused
                          ? "bg-gradient-to-r from-transparent via-amber-400/50 to-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                          : "bg-gradient-to-r from-transparent via-[#00e599]/40 to-[#00e599] shadow-[0_0_10px_#00e599]"
                      )}
                      style={{
                        width: isAnimationComplete ? `${countdownProgress}%` : "0%",
                        opacity: isAnimationComplete && countdownProgress > 0 ? 1 : 0,
                        transition: "opacity 200ms ease",
                      }}
                    >
                      {/* Leading photon spark at the tip of the beam (centered, no left clipping, smooth fade) */}
                      <div
                        className={cn(
                          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 rounded-full pointer-events-none will-change-[opacity,transform]",
                          isPaused
                            ? "bg-amber-200 shadow-[0_0_6px_#f59e0b,0_0_10px_#f59e0b]"
                            : "bg-white shadow-[0_0_6px_#00e599,0_0_12px_#00e599]"
                        )}
                        style={{
                          opacity: isAnimationComplete && countdownProgress > 1.5 && countdownProgress < 98.5 ? 1 : 0,
                          transition: "opacity 250ms ease",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Structured Architectural Case Study Breakdown */}
                <div className="sync-details will-change-transform w-full">
                  {/* Case Study Box with Flush Width & Aligned Starting Points */}
                  <div className="border border-white/12 bg-white/[0.03] backdrop-blur-sm p-3.5 md:p-4 mb-4 space-y-2.5 rounded-none w-full">
                    {schedule.boxLines.map((lineItem, lIdx) => (
                      <div key={lIdx} className="grid grid-cols-[95px_1fr] sm:grid-cols-[105px_1fr] items-start gap-3">
                        {lineItem.key && (
                          <span
                            className={cn(
                              "text-[11px] sm:text-xs font-mono tracking-wider font-semibold uppercase leading-5 select-none",
                              lineItem.isResult ? "text-[#00e599]" : "text-white/50"
                            )}
                          >
                            <AnimatedLetterText
                              text={lineItem.key}
                              startDelay={lineItem.keyStart}
                              charInterval={lineItem.keyInterval}
                              active={isActive}
                              isAccent={lineItem.isResult}
                            />
                          </span>
                        )}
                        <span className="text-xs sm:text-[13px] text-white/85 leading-5 font-sans min-w-0">
                          <AnimatedLetterText
                            text={lineItem.val}
                            startDelay={lineItem.valStart}
                            charInterval={lineItem.valInterval}
                            active={isActive}
                          />
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills - Letter by Letter (only if present) */}
                  {schedule.techPills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {schedule.techPills.map((pill) => (
                        <span
                          key={pill.tech}
                          className="px-3 py-1.5 text-xs font-mono rounded-none bg-white/[0.05] text-white/85 border border-white/20 inline-flex items-center"
                        >
                          <AnimatedLetterText
                            text={pill.tech}
                            startDelay={pill.start}
                            charInterval={pill.interval}
                            active={isActive}
                          />
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Result Badge - Letter by Letter with Glowing Dot */}
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-none border border-[#00e599]/40 bg-[#00e599]/10 text-[#00e599] font-mono text-xs sm:text-sm tracking-wider uppercase font-semibold max-w-fit">
                    <span
                      className="w-2 h-2 rounded-full bg-[#00e599] transition-opacity duration-300"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transitionDelay: `${schedule.resultBadgeStart}ms`,
                        boxShadow: isActive ? "0 0 10px #00e599" : "none",
                      }}
                    />
                    <AnimatedLetterText
                      text={card.result}
                      startDelay={schedule.resultBadgeStart}
                      charInterval={schedule.resultBadgeInterval}
                      active={isActive}
                      isAccent={true}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CardStackText.displayName = "CardStackText";

export default CardStackText;
