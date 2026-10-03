import React, { useEffect, useRef } from "react";

interface BackgroundThreadProps {
  activeIndex: number;
  progressRef?: React.MutableRefObject<number>;
  totalSlides?: number;
  className?: string;
}

/**
 * Master Continuous Organic Spline Path spanning 1440x900 viewport.
 * 
 * Recreates the physical burnt-orange thread from the reference video:
 * - Starts at the very top right end.
 * - Moves strictly towards the left, never going back to the right.
 * - Ends at the very bottom left end.
 */
const THREAD_PATH_D = [
  "M 1440 -20",
  // Section 1: Sweeping entry from top right
  "C 1350 100, 1200 80, 1150 250",
  // Section 2: Large organic curve downwards
  "C 1100 420, 1250 650, 1050 750",
  // Section 3: Smooth arch traversing center
  "C 850 850, 750 450, 600 350",
  // Section 4: Gentle dip
  "C 450 250, 400 600, 250 650",
  // Section 5: Wide sweep left
  "C 100 700, 150 400, 80 300",
  // Section 6: Final elegant exit to bottom left
  "C 10 200, 50 850, -20 920"
].join(" ");

export const BackgroundThread: React.FC<BackgroundThreadProps> = ({
  activeIndex = 0,
  progressRef,
  totalSlides = 6,
  className = "",
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const totalLengthRef = useRef<number>(0);
  const currentLengthRef = useRef<number>(0);
  const targetLengthRef = useRef<number>(0);

  // Initialize path metrics on mount & handle responsive recalculation
  useEffect(() => {
    if (!pathRef.current) return;

    try {
      const length = pathRef.current.getTotalLength();
      totalLengthRef.current = length;

      // Initial resting reveal length on Slide 1 (~11% of path length)
      // This displays only the initial organic serpentine wave on the right margin
      const initialProgress = activeIndex / Math.max(1, totalSlides - 1);
      const startLength = length * 0.11;
      const initialLength = startLength + (length - startLength) * initialProgress;

      currentLengthRef.current = initialLength;
      targetLengthRef.current = initialLength;

      // Set initial SVG stroke dash configuration
      pathRef.current.style.strokeDasharray = `${length} ${length}`;
      pathRef.current.style.strokeDashoffset = `${Math.max(0, length - initialLength)}`;
    } catch {
      // Fallback for non-SVG geometry environments
      totalLengthRef.current = 5000;
    }
  }, [totalSlides]);

  // Main 60-120fps RAF loop: drives scroll-tied progression with physical elasticity & lag
  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const totalLen = totalLengthRef.current;
      if (totalLen <= 0 || !pathRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      // Continuous scroll progress (0.0 to 1.0)
      const rawProgress = progressRef
        ? progressRef.current
        : activeIndex / Math.max(1, totalSlides - 1);

      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      // Initial visible section on Slide 1 is ~11% (the signature right-margin wave)
      // Progressively unrolls to 100% of the path as user approaches Slide 6
      const startLength = totalLen * 0.11;
      targetLengthRef.current = startLength + (totalLen - startLength) * clampedProgress;

      // Damped physical elasticity: lightweight thread inertia (0.075 lerp factor)
      // Gives the thread a natural physical drag without oscillating or jumping
      const diff = targetLengthRef.current - currentLengthRef.current;
      if (Math.abs(diff) > 0.05) {
        currentLengthRef.current += diff * 0.075;
      } else {
        currentLengthRef.current = targetLengthRef.current;
      }

      const offset = Math.max(0, totalLen - currentLengthRef.current);
      pathRef.current.style.strokeDashoffset = `${offset.toFixed(2)}`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [activeIndex, progressRef, totalSlides]);

  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        style={{ willChange: "stroke-dashoffset" }}
      >
        {/* Single Continuous Organic Burnt-Orange Thread (Zero glow, zero gradient, zero particles) */}
        <path
          ref={pathRef}
          d={THREAD_PATH_D}
          fill="none"
          stroke="#D4552B"
          strokeWidth="6.0"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default BackgroundThread;
