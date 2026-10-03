import { useRef, useEffect, useCallback, useState } from "react";
import { Play, Pause } from "lucide-react";
import PolaroidCard from "./PolaroidCard";
import CardStackText, { CardStackTextHandle } from "./CardStackText";
import BackgroundStagePresets from "./BackgroundStagePresets";
import CustomCursorManager from "./CustomCursorManager";
import auPhoto from "@/assets/hackathon-au.jpg";
import techniversePhoto from "@/assets/hackathon-techniverse.jpg";
import sihPhoto from "@/assets/hackathon-sih.jpg";
import lnitPhoto from "@/assets/hackathon-lnit.jpg";
import adobePhoto from "@/assets/about-5.jpg";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  image: string;
  title: string;
  date: string;
  result: string;
  statement: string;
  description: string;
  technologies: string[];
}

export interface CardStackSectionProps {
  id?: string;
  tag?: string;
  sectionTitle?: string;
  subtitle?: string;
  cards?: CardItem[];
  height?: string;
  className?: string;
}

export const DEFAULT_CARDS: CardItem[] = [
  { 
    id: 1, 
    image: techniversePhoto, 
    title: "Techniverse 2K25", 
    date: "7–9 MAR 2025 · RGUKT IIIT SRIKAKULAM",
    result: "Finalist",
    statement: "Built the backend logic for a command-line food delivery system in C, covering authentication, admin controls, menu management, ordering and order processing.",
    description: "EVENT: Techniverse 2K25 · RGUKT IIIT Srikakulam\nPROJECT: C Code for Food Service (12-hour hackathon)\nROLE: Backend Developer\nCONTRIBUTION: User auth, admin panel, menu controls, ordering and order processing\nSCREENING: Solved 8-problem Data Structures screening round\nACTIVITY: Selected NVIDIA & finished 4th in Code Bidding activity\nRESULT: Reached the final stage (Finalist)",
    technologies: ["C", "CLI", "Data Structures"],
  },
  { 
    id: 2, 
    image: auPhoto, 
    title: "AU Hackathon", 
    date: "AU HACKATHON 2025",
    result: "Final Round",
    statement: "Advanced through DSA, problem-solving and written-response challenges to reach the final round.",
    description: "EVENT: AU Hackathon\nPROJECT: LearnYourWay\nSELECTION: DSA questions, problem-solving challenges, and written responses\nRESULT: Advanced to the final round",
    technologies: ["DSA", "EdTech", "Problem Solving"],
  },
  { 
    id: 3, 
    image: sihPhoto, 
    title: "Smart India Hackathon 2025", 
    date: "SIH 2025",
    result: "College-Level Finalist",
    statement: "Selected as a college-level finalist for the nationwide Smart India Hackathon initiative.",
    description: "EVENT: Smart India Hackathon 2025\nSTAGE: Internal institutional evaluation round\nRESULT: Selected as college-level finalist",
    technologies: ["AI/ML", "Python", "System Design"],
  },
  { 
    id: 4, 
    image: lnitPhoto, 
    title: "LNIT Summit 2026", 
    date: "LNIT SUMMIT 2026",
    result: "Final 10 Teams",
    statement: "Competed through technical problem-solving rounds to finish among the final 10 teams.",
    description: "EVENT: LNIT Summit · Hackathon 2026\nSTAGE: Multi-stage competitive technical evaluation\nRESULT: Reached the final 10 teams",
    technologies: ["React", "FastAPI", "PostgreSQL", "AI"],
  },
  { 
    id: 5, 
    image: adobePhoto, 
    title: "Unstop × Adobe Hackathon", 
    date: "UNSTOP × ADOBE 2025",
    result: "Final Round Selection",
    statement: "Advanced through competitive nationwide screening rounds to be selected for the final round.",
    description: "EVENT: Unstop × Adobe Hackathon\nSTAGE: National screening challenge & evaluation\nRESULT: Selected for the final round",
    technologies: ["Design Systems", "UI/UX", "Problem Solving"],
  },
];

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

// Handcrafted dynamic motion profiles for all 5 cards ensuring distinct, non-repetitive movement
export const CARD_MOTION_PROFILES = [
  // Card 1: Techniverse 2K25 - Clean neutral anchor
  { entranceTilt: -2.0, entranceX: -6, stackTilt: -3.5, stackX: -9, stackY: 6 },
  // Card 2: AU Hackathon - Gentle right lean
  { entranceTilt: 3.5, entranceX: 8, stackTilt: 4.8, stackX: 12, stackY: 11 },
  // Card 3: Smart India Hackathon 2025 - Crisp left sweep
  { entranceTilt: -3.8, entranceX: -10, stackTilt: -6.0, stackX: -16, stackY: 16 },
  // Card 4: LNIT Hackathon 2026 - Dynamic right flare
  { entranceTilt: 4.5, entranceX: 12, stackTilt: 7.2, stackX: 20, stackY: 21 },
  // Card 5: Unstop x Adobe Hackathon - Expansive finale stack
  { entranceTilt: -5.8, entranceX: -16, stackTilt: -8.8, stackX: -24, stackY: 26 },
];

export const CARD_TRANSITION_DURATION = 2200; // ms: exact shared duration with text animation
export const COUNTDOWN_DURATION = 5000; // ms: 5s reading duration
export const SLIDE_TOTAL_DURATION = CARD_TRANSITION_DURATION + COUNTDOWN_DURATION; // 7200ms: continuous slide lifespan

export const CardStackSection = ({
  id = "hackathons",
  tag = "01 // SELECTED WORK",
  sectionTitle = "Hackathons & Technical Competitions",
  subtitle = "A curated record of hackathon projects, competitive problem-solving, and outcomes.",
  cards = DEFAULT_CARDS,
  height,
  className = "",
}: CardStackSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stackWrapperRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollOverlayRef = useRef<HTMLDivElement>(null);
  const circleRingRef = useRef<SVGCircleElement>(null);

  const computedHeight = height || "100vh";

  // Slider and animation state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [countdownProgress, setCountdownProgress] = useState(0);
  const [centerLabel, setCenterLabel] = useState(String(1).padStart(2, "0"));
  const centerLabelRef = useRef(String(1).padStart(2, "0"));

  const textHandleRef = useRef<CardStackTextHandle>(null);
  const isAutoAdvancingRef = useRef(false);

  // Physics simulation state
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const startProgressRef = useRef(0);

  // Master unified timeline refs
  const masterRafRef = useRef<number | null>(null);
  const slideStartTimeRef = useRef<number>(0);
  const pausedElapsedRef = useRef<number>(0);
  const prevActiveIndexRef = useRef<number>(0);

  // Mouse hover parallax physics (UNTOUCHED)
  const tiltRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0, isHovered: false });
  const tiltRafRef = useRef<number | null>(null);

  const vhRef = useRef(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => { vhRef.current = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render cards based on smoothed physics progress
  const renderCardsAtProgress = useCallback((progress: number) => {
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
        // Not reached yet - safely parked below viewport
        translateY = 140; 
        opacity = 0; 
        rotation = 0; translateX = 0; offsetY = 0; brightness = 0.3;
      } else if (progress > prevPhase && progress < phaseStart) {
        // Transition phase between card i-1 and card i
        const rawU = (progress - prevPhase) / phaseStep;
        
        if (rawU <= 0.5) {
          // First half: incoming card waits below while previous card clears to/from the deck
          translateY = 140;
          opacity = 0;
          rotation = 0; translateX = 0; offsetY = 0; brightness = 0.85;
        } else {
          // Second half: smooth glide between translateY 140 and 0 with zero velocity at both endpoints
          const u = (rawU - 0.5) * 2;
          const ease = u * u * (3 - 2 * u);
          
          translateY = lerp(140, 0, ease);
          // Keep physical card opaque as it slides up; use brightness to fade from dark instead
          opacity = 1.0;
          
          rotation = (1 - ease) * profile.entranceTilt;
          translateX = (1 - ease) * profile.entranceX;
          offsetY = 0;
          brightness = lerp(0.85, 1.0, ease);
        }
      } else {
        // Active hero card or stacked behind in the deck
        translateY = 0;
        opacity = 1.0; // Solid physical card
        
        const rawStackProgress = (progress - phaseStart) / phaseStep; 
        
        // Movement happens in the first half
        let moveProgress = rawStackProgress;
        if (rawStackProgress > 0) {
           const integerPart = Math.floor(rawStackProgress);
           const fractionalPart = rawStackProgress - integerPart;
           moveProgress = integerPart + Math.min(1, fractionalPart * 2);
        }

        if (moveProgress <= 0) {
           rotation = 0; translateX = 0; offsetY = 0; brightness = 1.0;
        } else {
          // Progressive physical fan spread for each depth level
          const d = Math.min(moveProgress, 1.0);
          const easeD = d * d * (3 - 2 * d);
          
          // Incremental fan spread for cards deep in the deck
          const extraDepth = Math.max(0, moveProgress - 1);
          const extraX = (profile.stackX > 0 ? 1 : -1) * extraDepth * 3.5;
          const extraRot = (profile.stackTilt > 0 ? 1 : -1) * extraDepth * 1.0;
          const extraY = extraDepth * 4.0;

          rotation = lerp(0, profile.stackTilt, easeD) + extraRot;
          translateX = lerp(0, profile.stackX, easeD) + extraX;
          offsetY = lerp(0, profile.stackY, easeD) + extraY;
          
          // Soft natural depth brightness - keeps cards clear and recognizable without blackening
          const depthFactor = Math.min(1.5, moveProgress);
          brightness = Math.max(0.82, 1.0 - (depthFactor * 0.08));
        }
      }

      // Ensure first card is visible initially
      if (i === 0 && progress <= 0) {
        translateY = 0; opacity = 1.0; rotation = 0; translateX = 0; offsetY = 0; brightness = 1.0;
      }

      const zInd = 10 + i;
      const pixelY = (translateY / 100) * vh + (offsetY - 50);

      el.style.transform = `translate3d(${translateX.toFixed(2)}px, ${pixelY.toFixed(2)}px, 0) rotate(${rotation.toFixed(2)}deg)`;
      el.style.opacity = `${opacity.toFixed(3)}`;
      el.style.filter = `brightness(${brightness.toFixed(3)})`;
      el.style.zIndex = `${zInd}`;
    }

    // Update mechanical odometer in lockstep with progress
    textHandleRef.current?.updateProgress(progress);
  }, [cards]);

  // Master Unified Slide Lifecycle Engine: Drives Cards, Text, and Circle in 1:1 Lockstep
  useEffect(() => {
    const totalCards = cards.length;
    if (totalCards === 0) return;

    // ONLY run slide animation lifecycle when the user enters the Hackathons section!
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

    // Handle seamless loop wrap-around without rewinding
    if (activeIndex === 0 && currentProgressRef.current > 0.8) {
      currentProgressRef.current = 0;
      targetProgressRef.current = 0;
      renderCardsAtProgress(0);
    }

    targetProgressRef.current = activeIndex * phaseStep;
    startProgressRef.current = currentProgressRef.current;

    // If slide changed: reset timing and initialize clean zero-state for incoming slide
    if (isIndexChange || slideStartTimeRef.current === 0) {
      slideStartTimeRef.current = performance.now();
      pausedElapsedRef.current = 0;
      setIsAnimationComplete(false);
      setCountdownProgress(0);

      const initialLabel = String(activeIndex + 1).padStart(2, "0");
      centerLabelRef.current = initialLabel;
      setCenterLabel(initialLabel);

      if (circleRingRef.current) {
        circleRingRef.current.style.transition = 'none';
        circleRingRef.current.style.opacity = '1';
        circleRingRef.current.style.strokeDasharray = '0 113.1';
        circleRingRef.current.style.strokeDashoffset = '0';
      }

      // Sync native scroll overlay smoothly without blocking RAF loop
      if (scrollOverlayRef.current) {
        isAutoAdvancingRef.current = true;
        const vh = scrollOverlayRef.current.clientHeight;
        scrollOverlayRef.current.scrollTo({
          top: activeIndex * vh,
          behavior: activeIndex === 0 ? "auto" : "smooth",
        });
        setTimeout(() => {
          isAutoAdvancingRef.current = false;
        }, 500);
      }
    }

    // Cancel existing RAF before starting fresh
    if (masterRafRef.current !== null) {
      cancelAnimationFrame(masterRafRef.current);
      masterRafRef.current = null;
    }

    // If paused, freeze at current elapsed without running tick
    if (isPaused) {
      pausedElapsedRef.current = performance.now() - slideStartTimeRef.current;
      return;
    }

    // If unpausing, resume from previous elapsed
    if (pausedElapsedRef.current > 0) {
      slideStartTimeRef.current = performance.now() - pausedElapsedRef.current;
    }

    const tick = (now: number) => {
      const elapsed = now - slideStartTimeRef.current;

      // 1. Card transition physics (0 to 2200ms) with Hermite C1-continuous smoothstep
      const rawU = Math.min(1, elapsed / CARD_TRANSITION_DURATION);
      const ease = rawU * rawU * (3 - 2 * rawU);
      currentProgressRef.current = lerp(startProgressRef.current, targetProgressRef.current, ease);
      renderCardsAtProgress(currentProgressRef.current);

      const entranceDone = rawU >= 1;
      setIsAnimationComplete(entranceDone);

      // 2. Synchronized Clockwise Circular Progress Ring (Zero jump, zero snap, 100% continuous)
      const C = 113.1;
      if (circleRingRef.current) {
        if (!entranceDone) {
          // Entrance phase (0 to 2200ms): charges clockwise in exact 1:1 lockstep with card & text entrance
          const dash = C * ease;
          circleRingRef.current.style.strokeDasharray = `${dash.toFixed(2)} ${C}`;
          circleRingRef.current.style.strokeDashoffset = '0';
        } else {
          // Reading countdown phase (2200ms to 7200ms): drains clockwise in lockstep with hairline beam
          const readElapsed = elapsed - CARD_TRANSITION_DURATION;
          const readRatio = Math.min(1, readElapsed / COUNTDOWN_DURATION);
          const dash = C * (1 - readRatio);
          const offset = -C * readRatio;
          circleRingRef.current.style.strokeDasharray = `${dash.toFixed(2)} ${C}`;
          circleRingRef.current.style.strokeDashoffset = `${offset.toFixed(2)}`;
        }
      }

      // 3. Hairline divider charging beam (Reading phase: 2200ms to 7200ms)
      if (entranceDone) {
        const readElapsed = elapsed - CARD_TRANSITION_DURATION;
        const readRatio = Math.min(100, (readElapsed / COUNTDOWN_DURATION) * 100);
        setCountdownProgress(readRatio);
      } else {
        setCountdownProgress(0);
      }

      // 4. Center indicator label: displays incoming slide [02] during entrance, then [5s...1s] during reading
      let nextLabel = '';
      if (!entranceDone) {
        nextLabel = String(activeIndex + 1).padStart(2, "0");
      } else {
        const readElapsed = elapsed - CARD_TRANSITION_DURATION;
        const remainingSeconds = Math.max(1, Math.ceil((COUNTDOWN_DURATION - readElapsed) / 1000));
        nextLabel = `${remainingSeconds}s`;
      }
      if (centerLabelRef.current !== nextLabel) {
        centerLabelRef.current = nextLabel;
        setCenterLabel(nextLabel);
      }

      // 5. Slide lifecycle completion -> seamlessly advance to next slide
      if (typeof window !== 'undefined') {
        (window as any).__tick_info = { 
          elapsed, 
          entranceDone,
          activeIndex,
          centerLabel: nextLabel,
        };
      }

      if (elapsed < SLIDE_TOTAL_DURATION) {
        masterRafRef.current = requestAnimationFrame(tick);
      } else {
        masterRafRef.current = null;
        slideStartTimeRef.current = 0;
        pausedElapsedRef.current = 0;
        setIsAnimationComplete(false);
        setCountdownProgress(0);
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

  // Advance to next slide immediately on polaroid photo click
  const goToNextSlide = useCallback(() => {
    slideStartTimeRef.current = 0;
    pausedElapsedRef.current = 0;
    setIsAnimationComplete(false);
    setCountdownProgress(0);
    setActiveIndex((prev) => {
      const next = (prev + 1) % cards.length;
      if (scrollOverlayRef.current) {
        scrollOverlayRef.current.scrollTo({
          top: next * scrollOverlayRef.current.clientHeight,
          behavior: "smooth",
        });
      }
      return next;
    });
  }, [cards.length]);

  // Jump to specific slide on indicator dot click
  const handleSelectIndex = useCallback((idx: number) => {
    slideStartTimeRef.current = 0;
    pausedElapsedRef.current = 0;
    setIsAnimationComplete(false);
    setCountdownProgress(0);
    setActiveIndex(idx);
    if (scrollOverlayRef.current) {
      scrollOverlayRef.current.scrollTo({
        top: idx * scrollOverlayRef.current.clientHeight,
        behavior: "smooth",
      });
    }
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

  useEffect(() => {
    renderCardsAtProgress(0);
    return () => {
      if (masterRafRef.current !== null) cancelAnimationFrame(masterRafRef.current);
      if (tiltRafRef.current !== null) cancelAnimationFrame(tiltRafRef.current);
    };
  }, [renderCardsAtProgress]);

  return (
    <section 
      id={id}
      ref={sectionRef} 
      className={`relative bg-black ${className}`}
      style={{ height: computedHeight }}
    >
      {/* 1. Massive Awwwards Parallax Stroke Watermark on the Right */}
      <div className="hackathons-watermark absolute top-[8%] right-[-2vw] pointer-events-none select-none z-0 opacity-[0.045]">
        <h1 
          className="text-[28vw] md:text-[22vw] lg:text-[18vw] font-black leading-none tracking-tight select-none" 
          style={{ 
            writingMode: 'vertical-rl', 
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.7)', 
            color: 'transparent' 
          }}
        >
          HACKATHONS
        </h1>
      </div>

      {/* 2. Decorative Architectural Corner Crosshairs */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-white/20 pointer-events-none z-30"></div>
      <div className="absolute top-8 right-8 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-white/20 pointer-events-none z-30"></div>
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-white/20 pointer-events-none z-30"></div>
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-white/20 pointer-events-none z-30"></div>

      {/* Dynamic Background Stage Atmosphere & Framing (Option 6: Curated Blend) */}
      <BackgroundStagePresets 
        activeIndex={activeIndex}
        cards={cards}
        progressRef={currentProgressRef}
      />

      {/* Interactive Custom Cursor Manager with Switcher Dock */}
      <CustomCursorManager 
        cardTiltRef={tiltRef}
        activeSlideIndex={activeIndex}
        totalSlides={cards.length}
        isPaused={isPaused}
      />

      {/* Harmonized Top Header & Pause Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-40 px-6 md:px-12 lg:px-16 pt-6 md:pt-10 flex items-start justify-between pointer-events-none">
        {/* Section Header Left */}
        <div className="pointer-events-auto">
          <span className="text-muted-foreground text-[10px] md:text-xs tracking-widest uppercase mb-1 block font-mono">
            {tag}
          </span>
          <h2 className="text-sm md:text-base font-medium text-foreground/90 tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-xs text-foreground/50 max-w-sm mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Header Right: Architectural Coordinate Badge + Single Circular Countdown/Play/Pause Controller */}
        <div className="pointer-events-auto shrink-0 flex items-center gap-4 md:gap-5">
          {/* Top Right Architectural Coordinate Badge - Perfectly Vertically Centered */}
          <div className="text-white/35 font-mono text-[9px] md:text-[10px] tracking-widest uppercase hidden lg:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
            <span>SEC // 42.3601° N · 71.0942° W</span>
          </div>

          <button
            type="button"
            data-cursor="play-pause"
            onClick={() => setIsPaused((prev) => !prev)}
            className={cn(
              "group relative w-12 h-12 md:w-13 md:h-13 rounded-full flex items-center justify-center",
              "border transition-all duration-300 backdrop-blur-xl select-none cursor-pointer",
              isPaused
                ? "bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.3)] hover:bg-amber-500/20"
                : "bg-white/[0.04] border-white/15 text-white hover:border-[#00e599]/60 hover:bg-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            )}
            title={isPaused ? "Click to Resume (Auto-slide paused)" : isAnimationComplete ? `Click to Pause (${centerLabel} remaining)` : `Loading Slide ${activeIndex + 1}...`}
            aria-label={isPaused ? "Resume auto-slide" : "Pause auto-slide"}
          >
            {/* SVG Circular Progress Track & Dynamic Unified Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 p-1" viewBox="0 0 44 44">
              {/* Background ambient track ring */}
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-white/10 fill-none"
                strokeWidth="2.5"
              />

              {/* Single Continuous Precision Progress & Countdown Ring */}
              <circle
                ref={circleRingRef}
                cx="22"
                cy="22"
                r="18"
                className={cn(
                  "fill-none transition-colors duration-300 origin-center",
                  isPaused ? "stroke-amber-400" : "stroke-[#00e599]"
                )}
                strokeWidth="2.5"
                strokeDasharray="0 113.1"
                strokeDashoffset="0"
                strokeLinecap="round"
                style={{
                  filter: isPaused
                    ? "drop-shadow(0 0 6px rgba(245,158,11,0.75))"
                    : "drop-shadow(0 0 7px rgba(0,229,153,0.85))",
                }}
              />
            </svg>

            {/* Center Content: Monospace Slide Number / Countdown Seconds or Play/Pause */}
            <div className="relative z-10 flex items-center justify-center font-mono select-none">
              {isPaused ? (
                <Play className="w-4 h-4 fill-amber-300 text-amber-300 ml-0.5 transition-transform group-hover:scale-110" />
              ) : (
                <>
                  {/* Monospace Indicator (Slide number during entrance [02], then [5s...1s] during reading) */}
                  <span className="font-bold text-[13px] text-[#00e599] tracking-tight group-hover:hidden transition-all duration-200">
                    {centerLabel}
                  </span>
                  {/* On hover: reveal Pause icon smoothly */}
                  <Pause className="w-3.5 h-3.5 fill-white text-white hidden group-hover:block transition-all" />
                </>
              )}
            </div>
          </button>
        </div>
      </header>

      {/* Invisible overlay for native scroll-snapping (1 scroll gesture = 1 card) */}
      <div 
        ref={scrollOverlayRef}
        className="absolute inset-0 w-full h-full overflow-y-auto snap-y snap-mandatory z-30 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onWheel={(e) => {
          if (!scrollOverlayRef.current) return;
          if (scrollOverlayRef.current.scrollTop <= 10 && e.deltaY < -20) {
            const heroEl = document.getElementById("hero");
            if (heroEl) {
              heroEl.scrollIntoView({ behavior: "smooth" });
            }
          } else {
            const vh = scrollOverlayRef.current.clientHeight;
            const maxScroll = (cards.length - 1) * vh;
            if (scrollOverlayRef.current.scrollTop >= maxScroll - 15 && e.deltaY > 20) {
              const contactEl = document.getElementById("contact");
              if (contactEl) {
                contactEl.scrollIntoView({ behavior: "smooth" });
              }
            }
          }
        }}
        onScroll={(e) => {
          if (isAutoAdvancingRef.current) return;
          const vh = e.currentTarget.clientHeight;
          const maxScroll = (cards.length - 1) * vh;
          if (maxScroll > 0) {
            currentProgressRef.current = e.currentTarget.scrollTop / maxScroll;
          }
          const index = Math.round(e.currentTarget.scrollTop / vh);
          if (index !== activeIndex) {
            setActiveIndex(clamp(index, 0, cards.length - 1));
          }
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={(e) => {
          if (stackWrapperRef.current) {
            const rect = stackWrapperRef.current.getBoundingClientRect();
            if (
              e.clientX >= rect.left &&
              e.clientX <= rect.right &&
              e.clientY >= rect.top &&
              e.clientY <= rect.bottom
            ) {
              goToNextSlide();
            }
          }
        }}
      >
        {cards.map((card) => (
          <div 
            key={`snap-${card.id}`} 
            className="w-full h-full snap-start"
            style={{ scrollSnapStop: 'always' }}
          />
        ))}
      </div>

      {/* Main Center Stage: Permanent Widescreen Curated Layout */}
      <div 
        className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center mx-auto px-6 md:px-10 pt-16 md:pt-10 overflow-hidden pointer-events-none max-w-[1560px] xl:max-w-[1640px] gap-8 lg:gap-14 xl:gap-22 transition-all duration-700 ease-out"
      >
        
        {/* Left Column: 3D Physics Card Deck (UNTOUCHED CARD ANIMATION) */}
        <div className="flex items-center justify-center relative z-10 shrink-0">
          <div 
            ref={stackWrapperRef}
            data-cursor="card"
            className="relative w-[390px] sm:w-[440px] md:w-[490px] lg:w-[530px] xl:w-[560px] h-[510px] sm:h-[560px] md:h-[610px] lg:h-[640px] xl:h-[670px] will-change-transform cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            {cards.map((card, index) => (
              <div 
                key={card.id} 
                ref={(el) => (cardElementsRef.current[index] = el)}
                onClick={goToNextSlide}
                className="absolute inset-0 flex items-center justify-center pointer-events-auto will-change-transform cursor-pointer"
                style={{ backfaceVisibility: "hidden" }}
              >
                {/* Mobile Frame (With Text) */}
                <div className="block md:hidden">
                  <PolaroidCard 
                    image={card.image} 
                    name={card.title}
                    subtitle={card.result}
                    showCaption={true}
                    loading={index === 0 ? "eager" : "lazy"}
                    isActive={index === activeIndex}
                  />
                </div>
                {/* Desktop Frame (Without Text) */}
                <div className="hidden md:block">
                  <PolaroidCard 
                    image={card.image} 
                    name={card.title}
                    subtitle={card.result}
                    showCaption={false}
                    loading={index === 0 ? "eager" : "lazy"}
                    isActive={index === activeIndex}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Synchronized Architectural Text Column (Horizontally Aligned with Cards) */}
        <div className="hidden md:flex items-center justify-start relative z-10 shrink-0 w-[440px] lg:w-[500px] xl:w-[540px] md:-translate-y-[44px]">
          <CardStackText 
            ref={textHandleRef}
            cards={cards}
            activeIndex={activeIndex}
            isAnimationComplete={isAnimationComplete}
            countdownProgress={countdownProgress}
            isPaused={isPaused}
            onSelectIndex={handleSelectIndex}
          />
        </div>
      </div>

    </section>
  );
};

export default CardStackSection;
