import React, { useEffect, useState } from "react";
import { Clock, MapPin, Radio } from "lucide-react";

export function NodeStatus() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="contact-light-panel p-5">
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-gray-700">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
          <span className="font-bold text-black uppercase">NODE ACTIVE</span>
          <span className="text-gray-400">// IST TIME (UTC+5:30)</span>
        </div>

        <div className="flex items-center gap-4 text-gray-600">
          <span className="flex items-center gap-1.5 font-bold text-black bg-black/[0.04] px-2.5 py-1 rounded border border-black/10">
            <Clock className="w-3.5 h-3.5 text-[#10b981]" />
            {time || "--:--:--"} IST
          </span>
          <span className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
            VIZIANAGARAM, INDIA
          </span>
        </div>
      </div>
    </div>
  );
}
