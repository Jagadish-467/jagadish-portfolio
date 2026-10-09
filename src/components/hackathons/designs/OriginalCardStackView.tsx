import React, { useRef, useEffect, useCallback, useState } from "react";
import PolaroidCard from "../PolaroidCard";
import CardStackText, { CardStackTextHandle } from "../CardStackText";
import { CARD_MOTION_PROFILES, CARD_TRANSITION_DURATION, COUNTDOWN_DURATION, SLIDE_TOTAL_DURATION, CardItem } from "../CardStackSection";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

interface OriginalCardStackViewProps {
  cards: CardItem[];
  isInView: boolean;
}

export const OriginalCardStackView: React.FC<OriginalCardStackViewProps> = ({ cards, isInView }) => {
  const stackWrapperRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const circleRingRef = useRef<SVGCircleElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const centerLabelRef = useRef(String(1).padStart(2, "0"));
  const centerLabelSpanRef = useRef<HTMLSpanElement>(null);
  const playPauseBtnRef = useRef<HTMLButtonElement>(null);
  const cardOverlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastOverlayOpacityRef = useRef<string[]>([]);

  const textHandleRef = useRef<CardStackTextHandle>(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const startProgressRef = useRef(0);

  const masterRafRef = useRef<number | null>(null);
  const slideStartTimeRef = useRef<number>(0);
  const pausedElapsedRef = useRef<number>(0);
  const prevActiveIndexRef = useRef<number>(0);

  const tiltRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0, isHovered: false });
  const tiltRafRef = useRef<number | null>(null);
  const lastCardStyleRef = useRef<string[]>([]);
  const isAnimationCompleteRef = useRef(false);

  const vhRef = useRef(typeof window !== "undefined" ? window.innerHeight : 800);

  useEffect(() => {
    const handleResize = () => {
      vhRef.current = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderCardsAtProgress = useCallback(
    (progress: number) => {
      const totalCards = cards.length;
      if (totalCards === 0) return;

      const phaseStep = 1 / Math.max(1, totalCards - 1);
      const vh = vhRef.current;

      for (let i = 0; i < totalCards; i++) {
        const el = cardElementsRef.current[i];
        if (!el) continue;

        const phaseStart = i * phaseStep;
        const prevPhase = phaseStart - phaseStep;
        const profile = CARD_MOTION_PROFILES[i] || CARD_MOTION_PROFILES[0];

        let translateY = 140;
        let opacity = 0;
        let rotation = 0;
        let translateX = 0;
        let offsetY = 0;
        let brightness = 1.0;

        if (progress <= prevPhase) {
          translateY = 140;
          opacity = 0;
          rotation = 0;
          translateX = 0;
          offsetY = 0;
          brightness = 0.3;
        } else if (progress > prevPhase && progress < phaseStart) {
          const rawU = (progress - prevPhase) / phaseStep;
          if (rawU <= 0.5) {
            translateY = 140;
            opacity = 0;
            rotation = 0;
            translateX = 0;
            offsetY = 0;
            brightness = 0.85;
          } else {
            const u = (rawU - 0.5) * 2;
            const ease = u * u * (3 - 2 * u);
            translateY = lerp(140, 0, ease);
            opacity = 1.0;
            rotation = (1 - ease) * profile.entranceTilt;
            translateX = (1 - ease) * profile.entranceX;
            offsetY = 0;
            brightness = lerp(0.85, 1.0, ease);
          }
        } else {
          translateY = 0;
          opacity = 1.0;
          const rawStackProgress = (progress - phaseStart) / phaseStep;
          let moveProgress = rawStackProgress;
          if (rawStackProgress > 0) {
            const integerPart = Math.floor(rawStackProgress);
            const fractionalPart = rawStackProgress - integerPart;
            moveProgress = integerPart + Math.min(1, fractionalPart * 2);
          }

          if (moveProgress <= 0) {
            rotation = 0;
            translateX = 0;
            offsetY = 0;
            brightness = 1.0;
          } else {
            const d = Math.min(moveProgress, 1.0);
            const easeD = d * d * (3 - 2 * d);
            const extraDepth = Math.max(0, moveProgress - 1);
            const extraX = (profile.stackX > 0 ? 1 : -1) * extraDepth * 3.5;
            const extraRot = (profile.stackTilt > 0 ? 1 : -1) * extraDepth * 1.0;
            const extraY = extraDepth * 4.0;

            rotation = lerp(0, profile.stackTilt, easeD) + extraRot;
            translateX = lerp(0, profile.stackX, easeD) + extraX;
            offsetY = lerp(0, profile.stackY, easeD) + extraY;
            const depthFactor = Math.min(1.5, moveProgress);
            brightness = Math.max(0.82, 1.0 - depthFactor * 0.08);
          }
        }

        if (i === 0 && progress <= 0) {
          translateY = 0;
          opacity = 1.0;
          rotation = 0;
          translateX = 0;
          offsetY = 0;
          brightness = 1.0;
        }

        const zInd = 10 + i;
        const pixelY = (translateY / 100) * vh + (offsetY - 50);
        const transform = `translate3d(${translateX.toFixed(2)}px, ${pixelY.toFixed(2)}px, 0) rotate(${rotation.toFixed(2)}deg)`;
        const opacityStr = opacity.toFixed(3);
        const brightnessStr = brightness.toFixed(3);
        const signature = `${transform}|${opacityStr}|${brightnessStr}|${zInd}`;

        if (lastCardStyleRef.current[i] !== signature) {
          lastCardStyleRef.current[i] = signature;
          el.style.transform = transform;
          el.style.opacity = opacityStr;
          el.style.zIndex = `${zInd}`;

          const overlay = cardOverlayRefs.current[i];
          if (overlay) {
            const overlayOpacity = Math.max(0, 1 - brightness).toFixed(3);
            if (lastOverlayOpacityRef.current[i] !== overlayOpacity) {
              lastOverlayOpacityRef.current[i] = overlayOpacity;
              overlay.style.opacity = overlayOpacity;
            }
          }
        }
      }

      textHandleRef.current?.updateProgress(progress);
    },
    [cards]
  );

  useEffect(() => {
    const totalCards = cards.length;
    if (totalCards === 0) return;

    if (!isInView) {
      if (masterRafRef.current !== null) {
        cancelAnimationFrame(masterRafRef.current);
        masterRafRef.current = null;
      }
      slideStartTimeRef.current = 0;
      pausedElapsedRef.current = 0;
      setActiveIndex(0);
      renderCardsAtProgress(0);
      return;
    }

    const phaseStep = 1 / Math.max(1, totalCards - 1);
    const isIndexChange = prevActiveIndexRef.current !== activeIndex;
    prevActiveIndexRef.current = activeIndex;

    if (activeIndex === 0 && currentProgressRef.current > 0.8) {
      currentProgressRef.current = 0;
      targetProgressRef.current = 0;
      renderCardsAtProgress(0);
    }

    targetProgressRef.current = activeIndex * phaseStep;
    startProgressRef.current = currentProgressRef.current;

    if (isIndexChange || slideStartTimeRef.current === 0) {
      slideStartTimeRef.current = performance.now();
      pausedElapsedRef.current = 0;
      isAnimationCompleteRef.current = false;
      textHandleRef.current?.updateCountdown(0, false);

      const initialLabel = String(activeIndex + 1).padStart(2, "0");
      centerLabelRef.current = initialLabel;
      if (centerLabelSpanRef.current) {
        centerLabelSpanRef.current.textContent = initialLabel;
      }

      if (circleRingRef.current) {
        circleRingRef.current.style.transition = "none";
        circleRingRef.current.style.opacity = "1";
        circleRingRef.current.style.strokeDasharray = "0 113.1";
        circleRingRef.current.style.strokeDashoffset = "0";
      }
    }

    if (masterRafRef.current !== null) {
      cancelAnimationFrame(masterRafRef.current);
      masterRafRef.current = null;
    }

    if (isPaused) {
      pausedElapsedRef.current = performance.now() - slideStartTimeRef.current;
      return;
    }

    if (pausedElapsedRef.current > 0) {
      slideStartTimeRef.current = performance.now() - pausedElapsedRef.current;
    }

    const tick = (now: number) => {
      const elapsed = now - slideStartTimeRef.current;
      const rawU = Math.min(1, elapsed / CARD_TRANSITION_DURATION);
      const ease = rawU * rawU * (3 - 2 * rawU);
      currentProgressRef.current = lerp(startProgressRef.current, targetProgressRef.current, ease);
      renderCardsAtProgress(currentProgressRef.current);

      const entranceDone = rawU >= 1;
      const C = 113.1;
      if (circleRingRef.current) {
        if (!entranceDone) {
          const dash = C * ease;
          circleRingRef.current.style.strokeDasharray = `${dash.toFixed(2)} ${C}`;
          circleRingRef.current.style.strokeDashoffset = "0";
        } else {
          const readElapsed = elapsed - CARD_TRANSITION_DURATION;
          const readRatio = Math.min(1, readElapsed / COUNTDOWN_DURATION);
          const dash = C * (1 - readRatio);
          const offset = -C * readRatio;
          circleRingRef.current.style.strokeDasharray = `${dash.toFixed(2)} ${C}`;
          circleRingRef.current.style.strokeDashoffset = `${offset.toFixed(2)}`;
        }
      }

      if (entranceDone) {
        const readElapsed = elapsed - CARD_TRANSITION_DURATION;
        const readRatio = Math.min(100, (readElapsed / COUNTDOWN_DURATION) * 100);
        textHandleRef.current?.updateCountdown(readRatio, true);
      } else {
        textHandleRef.current?.updateCountdown(0, false);
      }

      let nextLabel = "";
      if (!entranceDone) {
        nextLabel = String(activeIndex + 1).padStart(2, "0");
      } else {
        const readElapsed = elapsed - CARD_TRANSITION_DURATION;
        const remainingSeconds = Math.max(1, Math.ceil((COUNTDOWN_DURATION - readElapsed) / 1000));
        nextLabel = `${remainingSeconds}s`;
      }
      if (centerLabelRef.current !== nextLabel) {
        centerLabelRef.current = nextLabel;
        if (centerLabelSpanRef.current) {
          centerLabelSpanRef.current.textContent = nextLabel;
        }
      }

      if (elapsed < SLIDE_TOTAL_DURATION) {
        masterRafRef.current = requestAnimationFrame(tick);
      } else {
        masterRafRef.current = null;
        slideStartTimeRef.current = 0;
        pausedElapsedRef.current = 0;
        setActiveIndex((prev) => (prev + 1) % totalCards);
      }
    };

    masterRafRef.current = requestAnimationFrame(tick);

    return () => {
      if (masterRafRef.current !== null) {
        cancelAnimationFrame(masterRafRef.current);
        masterRafRef.current = null;
      }
    };
  }, [activeIndex, isPaused, cards.length, renderCardsAtProgress, isInView]);

  const goToNextSlide = useCallback(() => {
    slideStartTimeRef.current = 0;
    pausedElapsedRef.current = 0;
    setActiveIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const handleSelectIndex = useCallback((idx: number) => {
    slideStartTimeRef.current = 0;
    pausedElapsedRef.current = 0;
    setActiveIndex(idx);
  }, []);

  const updateTiltPhysics = useCallback(() => {
    const tilt = tiltRef.current;
    tilt.currentX = lerp(tilt.currentX, tilt.isHovered ? tilt.targetX : 0, 0.14);
    tilt.currentY = lerp(tilt.currentY, tilt.isHovered ? tilt.targetY : 0, 0.14);

    if (stackWrapperRef.current) {
      stackWrapperRef.current.style.transform = `perspective(1000px) rotateX(${tilt.currentX.toFixed(2)}deg) rotateY(${tilt.currentY.toFixed(2)}deg)`;
    }

    if (Math.abs(tilt.currentX) > 0.02 || Math.abs(tilt.currentY) > 0.02 || tilt.isHovered) {
      tiltRafRef.current = requestAnimationFrame(updateTiltPhysics);
    } else {
      if (stackWrapperRef.current) {
        stackWrapperRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      }
      tiltRafRef.current = null;
    }
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltRef.current.targetX = y * -8;
    tiltRef.current.targetY = x * 8;
    tiltRef.current.isHovered = true;

    if (tiltRafRef.current === null) {
      tiltRafRef.current = requestAnimationFrame(updateTiltPhysics);
    }
  };

  const handlePointerLeave = () => {
    tiltRef.current.isHovered = false;
    if (tiltRafRef.current === null) {
      tiltRafRef.current = requestAnimationFrame(updateTiltPhysics);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Play / Pause Pill Header */}
      <div className="flex items-center justify-between w-full max-w-[1200px] mb-4 px-6">
        <span className="font-mono text-[10px] text-white/50 uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          // ORIGINAL POLAROID ENGINE [AUTOPLAY ACTIVE]
        </span>

        <button
          ref={playPauseBtnRef}
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          className={cn(
            "group relative w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 backdrop-blur-xl cursor-pointer",
            isPaused
              ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
              : "bg-white/[0.04] border-white/15 text-white hover:border-[#10b981]/60"
          )}
          title={isPaused ? "Resume auto-slide" : "Pause auto-slide"}
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90 p-1" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" className="stroke-white/10 fill-none" strokeWidth="2.5" />
            <circle
              ref={circleRingRef}
              cx="22"
              cy="22"
              r="18"
              className={cn("fill-none transition-colors duration-300", isPaused ? "stroke-amber-400" : "stroke-[#10b981]")}
              strokeWidth="2.5"
              strokeDasharray="0 113.1"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </svg>
          <div className="relative z-10 flex items-center justify-center font-mono">
            {isPaused ? (
              <Play className="w-3.5 h-3.5 fill-amber-300 text-amber-300 ml-0.5" />
            ) : (
              <>
                <span ref={centerLabelSpanRef} className="font-bold text-xs text-[#10b981] group-hover:hidden">
                  {centerLabelRef.current}
                </span>
                <Pause className="w-3 h-3 fill-white text-white hidden group-hover:block" />
              </>
            )}
          </div>
        </button>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-14 xl:gap-22">
        {/* Left: Card Deck */}
        <div className="flex items-center justify-center relative z-10 shrink-0">
          <div
            ref={stackWrapperRef}
            className="relative w-[340px] sm:w-[380px] md:w-[420px] lg:w-[450px] h-[450px] sm:h-[490px] md:h-[530px] lg:h-[560px] will-change-transform cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onClick={goToNextSlide}
          >
            {cards.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => (cardElementsRef.current[index] = el)}
                onClick={goToNextSlide}
                className="absolute inset-0 flex items-center justify-center pointer-events-auto will-change-transform cursor-pointer"
                style={{
                  backfaceVisibility: "hidden",
                  contain: "layout style paint",
                  transform: "translate3d(0, 0, 0)",
                }}
              >
                <PolaroidCard
                  image={card.image}
                  name={card.title}
                  subtitle={card.result}
                  showCaption={true}
                  loading={index === 0 ? "eager" : "lazy"}
                  isActive={index === activeIndex}
                  overlayRef={(el) => (cardOverlayRefs.current[index] = el)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Synchronized Text */}
        <div className="hidden md:flex items-center justify-start relative z-10 shrink-0 w-[420px] lg:w-[480px] md:-translate-y-8">
          <CardStackText
            ref={textHandleRef}
            cards={cards}
            activeIndex={activeIndex}
            isPaused={isPaused}
            onSelectIndex={handleSelectIndex}
          />
        </div>
      </div>
    </div>
  );
};
