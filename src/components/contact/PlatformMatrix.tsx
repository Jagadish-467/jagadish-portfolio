import React from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, Code2 } from "lucide-react";
import { Magnetic } from "./Magnetic";

const platforms = [
  {
    title: "GitHub",
    handle: "@Jagadish-467",
    url: "https://github.com/Jagadish-467",
    tag: "CODE // REPOSITORIES",
    Icon: Github,
  },
  {
    title: "LinkedIn",
    handle: "Ponnada Jagadish Kumar",
    url: "https://www.linkedin.com/in/ponnada-jagadish-kumar/",
    tag: "PROFESSIONAL // NETWORK",
    Icon: Linkedin,
  },
  {
    title: "LeetCode",
    handle: "@Jagadish-467",
    url: "https://leetcode.com/Jagadish-467",
    tag: "ALGORITHMS // DSA",
    Icon: Code2,
  },
  {
    title: "Instagram",
    handle: "@___jagadish_kumar___",
    url: "https://www.instagram.com/___jagadish_kumar___",
    tag: "CREATIVE // TIMELINE",
    Icon: Instagram,
  },
];

function PlatformCard({ p }: { p: (typeof platforms)[number] }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="link"
      className="contact-platform-card group"
    >
      <div className="flex items-start justify-between gap-2">
        <p.Icon className="w-4 h-4 text-gray-700 transition-colors group-hover:text-[#10b981]" />
        <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#10b981]" />
      </div>
      <h3 className="mt-1.5 font-sans text-sm font-bold text-black group-hover:text-[#10b981] transition-colors leading-tight">
        {p.title}
      </h3>
      <p className="truncate text-[11px] font-mono text-gray-500 mt-0.5">
        {p.handle}
      </p>
      <p className="mt-1.5 text-[9px] font-mono tracking-wider text-gray-400 uppercase">
        {p.tag}
      </p>
    </a>
  );
}

export function PlatformMatrix() {
  return (
    <div className="grid grid-cols-2 gap-2.5 flex-1">
      {platforms.map((p) => (
        <Magnetic key={p.title} strength={0.08} className="h-full">
          <PlatformCard p={p} />
        </Magnetic>
      ))}
    </div>
  );
}
