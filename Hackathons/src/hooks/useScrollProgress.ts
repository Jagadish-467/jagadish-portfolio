import { useState, useEffect, useRef, RefObject } from "react";

export interface ScrollProgressOptions {
  /**
   * High-performance callback invoked on animation frame without triggering React re-renders.
   */
  onProgress?: (progress: number) => void;
  /**
   * Sync React state (default: false for zero-rerender performance).
   */
  syncState?: boolean;
}

export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  options: ScrollProgressOptions = {}
) {
  const { onProgress, syncState = false } = options;
  const [progress, setProgress] = useState(0);

  // Keep callback reference updated without triggering effect re-runs
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cachedTop = 0;
    let cachedScrollableDistance = 1;
    let rafId: number | null = null;
    let isIntersecting = true;

    // Cache element geometry to eliminate layout thrashing during scroll
    const updateDimensions = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      cachedTop = rect.top + scrollY;
      const windowHeight = window.innerHeight;
      const sectionHeight = el.offsetHeight;
      cachedScrollableDistance = Math.max(1, sectionHeight - windowHeight);
      computeProgress();
    };

    const computeProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const scrolled = scrollY - cachedTop;
      const newProgress = Math.max(0, Math.min(1, scrolled / cachedScrollableDistance));

      if (onProgressRef.current) {
        onProgressRef.current(newProgress);
      }

      if (syncState) {
        setProgress((prev) => (Math.abs(prev - newProgress) > 0.001 ? newProgress : prev));
      }
    };

    const onScroll = () => {
      if (!isIntersecting) return;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        computeProgress();
        rafId = null;
      });
    };

    // IntersectionObserver to pause listening when out of viewport (0% CPU when idle)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          updateDimensions();
        }
      },
      { rootMargin: "150px 0px 150px 0px" }
    );
    observer.observe(el);

    // ResizeObserver recalibrates cached geometry when container size changes
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(el);

    window.addEventListener("resize", updateDimensions, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Initial calculation
    updateDimensions();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref, syncState]);

  return progress;
}
