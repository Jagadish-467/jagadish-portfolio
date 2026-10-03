import { useEffect, useState } from "react";

function istTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function NodeStatus() {
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    setClock(istTime());
    const id = setInterval(() => setClock(istTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg glass-panel px-5 py-3.5">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-beacon rounded-full bg-primary" />
          <span className="size-2 rounded-full bg-primary" />
        </span>
        <span className="text-meta">Available for collaborations</span>
      </div>
      <span className="text-meta">VZM, Andhra Pradesh (UTC +5:30)</span>
      <span className="ml-auto font-mono text-sm tabular-nums text-foreground/80">
        {clock ?? "--:--:--"}
      </span>
    </div>
  );
}
