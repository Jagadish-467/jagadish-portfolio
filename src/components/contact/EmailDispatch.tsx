import React, { useState } from "react";
import { Check, Copy, Send, FileText } from "lucide-react";
import { toast } from "sonner";
import { Crosshairs, Magnetic } from "./Magnetic";

const EMAIL = "jagadish.kumar.ponnada@gmail.com";

export function EmailDispatch() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("COPIED TO CLIPBOARD // 0x01", { description: EMAIL });
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Copy blocked by the browser", { description: EMAIL });
    }
  }

  return (
    <div className="contact-light-panel p-6" data-cursor="interactive">
      <Crosshairs />
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs font-bold text-[#10b981] tracking-wider uppercase">
          // 01 DIRECT DISPATCH &amp; CREDENTIALS
        </span>
        <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
          PRIMARY
        </span>
      </div>

      <p className="font-sans text-lg sm:text-xl font-extrabold text-black break-all my-2">
        {EMAIL}
      </p>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <Magnetic strength={0.18}>
          <button
            type="button"
            onClick={copy}
            data-cursor="interactive"
            className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 font-mono text-xs tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer ${
              copied
                ? "border-[#10b981] bg-[#10b981]/15 text-[#10b981]"
                : "border-black/15 text-gray-700 hover:border-black hover:text-black hover:bg-black/5"
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "COPIED // ACK" : "COPY EMAIL"}
          </button>
        </Magnetic>

        <Magnetic strength={0.18}>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="link"
            className="inline-flex items-center gap-2 rounded-lg bg-black text-white px-3.5 py-2 font-mono text-xs tracking-wider uppercase font-semibold transition-all duration-300 hover:bg-[#10b981] hover:scale-[1.02]"
          >
            <Send className="w-3.5 h-3.5" />
            MAIL CLIENT
          </a>
        </Magnetic>

        <Magnetic strength={0.18}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="link"
            className="inline-flex items-center gap-2 rounded-lg border border-black/15 bg-black/[0.03] text-gray-800 px-3.5 py-2 font-mono text-xs tracking-wider uppercase font-semibold transition-all duration-300 hover:border-[#10b981] hover:text-[#10b981] hover:bg-[#10b981]/10 hover:scale-[1.02]"
            onClick={() => toast.info("TECHNICAL CV // 2026 EDITION", { description: "Ponnada Jagadish Kumar • Academic & Engineering Resume" })}
          >
            <FileText className="w-3.5 h-3.5 text-[#10b981]" />
            CURRICULUM VITAE
          </a>
        </Magnetic>
      </div>
    </div>
  );
}
