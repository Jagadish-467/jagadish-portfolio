import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Instagram, Linkedin, Code2 } from "lucide-react";
import { Magnetic } from "./Magnetic";

const platforms = [
  {
    title: "GitHub",
    handle: "@Jagadish-467",
    url: "https://github.com/Jagadish-467",
    tag: "CODE // REPOS",
    Icon: Github,
  },
  {
    title: "LinkedIn",
    handle: "Ponnada Jagadish Kumar",
    url: "https://www.linkedin.com/in/ponnada-jagadish-kumar/",
    tag: "NETWORK // SYNC",
    Icon: Linkedin,
  },
  {
    title: "LeetCode",
    handle: "@Jagadish-467",
    url: "https://leetcode.com/Jagadish-467",
    tag: "ALGORITHMS // DS",
    Icon: Code2,
  },
  {
    title: "Instagram",
    handle: "@___jagadish_kumar___",
    url: "https://www.instagram.com/___jagadish_kumar___",
    tag: "VISUAL // LOGS",
    Icon: Instagram,
  },
];

function PlatformCard({ p }: { p: (typeof platforms)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false });

  return (
    <a
      ref={ref}
      href={p.url}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="link"
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setSpot({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
          on: true,
        });
      }}
      onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
      className="group relative isolate block h-full overflow-hidden rounded-lg glass-panel p-4 transition-colors duration-500 hover:border-primary/40"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at ${spot.x}% ${spot.y}%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)`,
          opacity: spot.on ? 1 : 0,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:animate-sweep group-hover:opacity-70"
      />
      <div className="flex items-start justify-between gap-3">
        <p.Icon className="size-5 text-foreground/70 transition-colors group-hover:text-primary" />
        <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
      </div>
      <h3 className="mt-3 font-display text-base font-extrabold">{p.title}</h3>
      <p className="truncate text-sm text-muted-foreground">{p.handle}</p>
      <p className="mt-2 text-meta">{p.tag}</p>
    </a>
  );
}

export function PlatformMatrix() {
  return (
    <div className="grid flex-1 auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
      {platforms.map((p, i) => (
        <motion.div
          key={p.title}
          className="h-full"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Magnetic strength={0.08} className="h-full"><PlatformCard p={p} /></Magnetic>
        </motion.div>
      ))}
    </div>
  );
}
