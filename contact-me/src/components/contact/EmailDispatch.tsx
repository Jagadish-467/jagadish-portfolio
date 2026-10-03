import { useState } from "react";
import { Check, Copy, Send } from "lucide-react";
import { toast } from "sonner";
import { Crosshairs, Magnetic } from "./Magnetic";

const EMAIL = "jagadish.kumar.ponnada@gmail.com";

export function EmailDispatch() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("COPIED // 0x01", { description: EMAIL });
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Copy blocked by the browser", { description: EMAIL });
    }
  }

  return (
    <div className="relative rounded-lg glass-panel p-5" data-cursor="interactive">
      <Crosshairs />
      <p className="text-meta">Direct channel // 01</p>
      <p className="mt-2 font-display text-lg font-extrabold break-all sm:text-xl">{EMAIL}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Magnetic strength={0.18}>
          <button
            type="button"
            onClick={copy}
            data-cursor="interactive"
            className={`inline-flex items-center gap-2 rounded-md border px-4 py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${
              copied
                ? "border-primary/50 bg-primary/10 text-primary bloom-ring"
                : "border-border text-foreground/80 hover:border-primary/40 hover:text-primary"
            }`}
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied // 0x01" : "Copy email"}
          </button>
        </Magnetic>
        <Magnetic strength={0.18}>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="link"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-mono text-[11px] tracking-[0.18em] text-primary-foreground uppercase transition-shadow hover:bloom-ring"
          >
            <Send className="size-3.5" />
            Launch mail
          </a>
        </Magnetic>
      </div>
    </div>
  );
}
