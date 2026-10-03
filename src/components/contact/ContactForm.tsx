import React, { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { Crosshairs, Magnetic } from "./Magnetic";

type State = "idle" | "sending" | "sent";

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
      toast.success("TRANSMISSION DELIVERED // ACK", { 
        description: "Thank you! Jagadish will reply directly to your email shortly." 
      });
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setState("idle"), 4000);
    }, 1200);
  }

  return (
    <form
      onSubmit={submit}
      className="contact-light-panel p-6 sm:p-8 flex flex-col h-full"
      data-cursor="interactive"
    >
      <Crosshairs />
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs font-bold text-[#10b981] tracking-wider uppercase">
          // TRANSMISSION TERMINAL
        </span>
        <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest px-2 py-0.5 rounded bg-black/5">
          TLS 1.3 // ENCRYPTED
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <label className="block">
          <span className="block font-mono text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            [01] Your Name / Organization
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace / Engineering Studio"
            className="contact-field-light"
          />
        </label>

        <label className="block">
          <span className="block font-mono text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            [02] Your Email Address
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className={`contact-field-light ${error ? "!border-red-500" : ""}`}
          />
          {error && <span className="mt-1 block font-mono text-[11px] text-red-500">{error}</span>}
        </label>

        <label className="flex flex-1 flex-col">
          <span className="block font-mono text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            [03] Project / Collaboration Brief
          </span>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the system, the research challenge, or the idea..."
            className="contact-field-light flex-1 resize-none min-h-[120px]"
          />
        </label>
      </div>

      <Magnetic strength={0.12} className="mt-6">
        <button
          type="submit"
          disabled={state !== "idle"}
          data-cursor="explore"
          className={`relative w-full overflow-hidden rounded-lg px-6 py-3.5 font-mono text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 cursor-pointer ${
            state === "sent"
              ? "bg-[#10b981]/15 text-[#10b981] border border-[#10b981]"
              : "bg-black text-white hover:bg-[#10b981] hover:text-black hover:shadow-lg"
          }`}
        >
          {state === "sending" && (
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              TRANSMITTING DATA...
            </span>
          )}
          {state === "sent" && (
            <span className="inline-flex items-center gap-2 text-[#10b981]">
              <Check className="w-4 h-4" />
              TRANSMISSION ACKNOWLEDGED
            </span>
          )}
          {state === "idle" && (
            <span className="inline-flex items-center justify-center gap-2">
              <span>DISPATCH TRANSMISSION</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </button>
      </Magnetic>
    </form>
  );
}
