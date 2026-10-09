import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/** Pulls its child subtly toward the cursor with spring physics. */
export function Magnetic({ children, className, strength = 0.25 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { damping: 15, stiffness: 150, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { damping: 15, stiffness: 150, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Corner crosshair marks for architectural panels (Visible in light mode). */
export function Crosshairs() {
  return (
    <>
      {[
        "-top-[7px] -left-[7px]",
        "-top-[7px] -right-[7px]",
        "-bottom-[7px] -left-[7px]",
        "-bottom-[7px] -right-[7px]",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute ${pos} font-mono text-sm leading-none text-black/30 select-none`}
        >
          +
        </span>
      ))}
    </>
  );
}
