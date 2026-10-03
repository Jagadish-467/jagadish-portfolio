import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { Crosshairs, Magnetic } from "./Magnetic";

type State = "idle" | "sending" | "sent";

const fieldClass =
  "w-full rounded-md border border-border bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (state !== "idle") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("ERR // INVALID EMAIL ADDRESS");
      return;
    }
    setError(null);
    setState("sending");
    setTimeout(() => {
      setState("sent");
      toast.success("MESSAGE DELIVERED // ACK", { description: "Jagadish will reply shortly." });
    }, 1400);
  }

  return (
    <form
      onSubmit={submit}
      className="relative flex h-full flex-col rounded-lg glass-panel p-5 sm:p-6"
      data-cursor="interactive"
    >
      <Crosshairs />
      <p className="text-meta">Transmission terminal</p>

      <div className="mt-4 flex flex-1 flex-col gap-4">
        <label className="block">
          <span className="text-meta">[01] Your name / org</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace / Studio"
            className={`mt-2.5 ${fieldClass}`}
          />
        </label>

        <label className="block">
          <span className="text-meta">[02] Your email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className={`mt-2.5 ${fieldClass} ${error ? "border-destructive" : ""}`}
          />
          {error && <span className="mt-2 block font-mono text-[11px] text-destructive">{error}</span>}
        </label>

        <label className="flex flex-1 flex-col">
          <span className="text-meta">[03] Message</span>
          <textarea
            required
            rows={4}
            style={{ minHeight: 110 }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the system, the problem, or the idea…"
            className={`mt-2.5 flex-1 resize-none ${fieldClass}`}
          />
        </label>
      </div>

      <Magnetic strength={0.12} className="mt-5">
        <button
          type="submit"
          disabled={state !== "idle"}
          data-cursor="explore"
          className={`relative w-full overflow-hidden rounded-md px-6 py-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors ${
            state === "sent"
              ? "bg-primary/15 text-primary bloom-ring"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {state === "sending" && (
            <span
              aria-hidden
              className="absolute inset-y-0 w-1/3 animate-sweep bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          )}
          <span className="relative inline-flex items-center justify-center gap-2">
            {state === "idle" && (
              <>
                Transmit message <ArrowRight className="size-3.5" />
              </>
            )}
            {state === "sending" && "Transmitting…"}
            {state === "sent" && (
              <>
                <Check className="size-3.5" /> Message delivered // ack
              </>
            )}
          </span>
        </button>
      </Magnetic>

      {state === "sent" && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 font-mono text-[11px] tracking-[0.15em] text-primary uppercase"
        >
          Signal received — transmission acknowledged.
        </motion.p>
      )}
    </form>
  );
}
