import React, { useState, useRef, useEffect, type FormEvent } from "react";
import { ArrowRight, Check, Terminal as TerminalIcon, FormInput, CornerDownLeft } from "lucide-react";
import { toast } from "sonner";
import { Crosshairs, Magnetic } from "./Magnetic";

type State = "idle" | "sending" | "sent";
type Mode = "form" | "cli";

interface TerminalLog {
  type: "system" | "user" | "success" | "error" | "info";
  text: string;
}

export function ContactForm() {
  const [mode, setMode] = useState<Mode>("form");
  const [state, setState] = useState<State>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  // CLI State
  const [cliInput, setCliInput] = useState("");
  const [cliLogs, setCliLogs] = useState<TerminalLog[]>([
    { type: "system", text: "JAGADISH_OS v2.6.4 [Quantum-Safe Kernel initialized]" },
    { type: "info", text: "Type 'help' for available commands or switch tabs to use the visual form." }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const cliInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === "cli") {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
      cliInputRef.current?.focus();
    }
  }, [cliLogs, mode]);

  const [selectedTopic, setSelectedTopic] = useState<string>("Research Collaboration");

  const TOPIC_CHIPS = [
    "Research Collaboration",
    "Distributed Systems",
    "Quantum Computing",
    "High-Performance ML",
    "Full-Stack Web",
    "General Inquiry"
  ];

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
        description: `Thank you! Brief received regarding ${selectedTopic}. Jagadish will reply directly shortly.`
      });
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setState("idle"), 4000);
    }, 1200);
  }

  function handleCliSubmit(e: FormEvent) {
    e.preventDefault();
    const cmd = cliInput.trim();
    if (!cmd) return;

    const newLogs: TerminalLog[] = [...cliLogs, { type: "user", text: `jagadish@gateway:~$ ${cmd}` }];
    const lower = cmd.toLowerCase();

    if (lower === "help") {
      newLogs.push({
        type: "info",
        text: "AVAILABLE COMMANDS:\n  • status     : View current availability & academic standing\n  • skills     : View primary languages & core competencies\n  • ping       : Run low-latency handshake test\n  • socials    : List verified network channels\n  • send <msg> : Transmit a direct brief\n  • clear      : Clear terminal screen"
      });
    } else if (lower === "ping") {
      newLogs.push({
        type: "success",
        text: "PONG // 64 bytes from gateway.jagadish.network: icmp_seq=1 ttl=58 time=14.2 ms"
      });
    } else if (lower === "status") {
      newLogs.push({
        type: "success",
        text: "ACTIVE // 3rd Year B.Tech CSE @ Lendi IET (Vizianagaram, India)\nOPEN FOR: High-performance systems, research collaborations, distributed ML & Web"
      });
    } else if (lower === "skills") {
      newLogs.push({
        type: "info",
        text: "CORE LANGUAGES: Python, C/C++, Go, Rust, Java, TypeScript\nSPECIALIZATIONS: Quantum (Qiskit), Distributed Systems (Ray, WebRTC), High-Perf Web (React 19, GSAP)"
      });
    } else if (lower === "socials") {
      newLogs.push({
        type: "info",
        text: "• GitHub: github.com/Jagadish-467\n• LinkedIn: linkedin.com/in/ponnada-jagadish-kumar\n• LeetCode: leetcode.com/Jagadish-467\n• Email: jagadish.kumar.ponnada@gmail.com"
      });
    } else if (lower.startsWith("send")) {
      const msgContent = cmd.replace(/^send\s*/i, "").trim();
      if (!msgContent) {
        newLogs.push({
          type: "error",
          text: "ERROR: Missing payload. Usage: send <your message or email>"
        });
      } else {
        newLogs.push({
          type: "success",
          text: `TRANSMISSION ENQUEUED // Payload dispatched: "${msgContent}"`
        });
        toast.success("CLI TRANSMISSION ENQUEUED", {
          description: `Payload: "${msgContent.slice(0, 40)}..."`
        });
      }
    } else if (lower === "clear") {
      setCliLogs([]);
      setCliInput("");
      return;
    } else {
      newLogs.push({
        type: "error",
        text: `COMMAND NOT FOUND: "${cmd}". Type 'help' for manual.`
      });
    }

    setCliLogs(newLogs);
    setCliInput("");
  }

  return (
    <div className="contact-light-panel p-6 sm:p-8 flex flex-col h-full relative" data-cursor="interactive">
      <Crosshairs />

      {/* Top Header & Mode Switcher Tabs */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10">
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/[0.05] border border-black/10">
          <button
            type="button"
            onClick={() => setMode("form")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
              mode === "form"
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-black"
            }`}
          >
            <FormInput className="w-3.5 h-3.5" />
            <span>VISUAL FORM</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("cli")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
              mode === "cli"
                ? "bg-[#0b0c10] text-[#10b981] shadow-sm"
                : "text-gray-500 hover:text-black"
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5 text-[#10b981]" />
            <span>CLI TERMINAL</span>
          </button>
        </div>

        <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest px-2 py-0.5 rounded bg-black/5 hidden sm:inline-block">
          TLS 1.3 // ENCRYPTED
        </span>
      </div>

      {/* MODE 1: VISUAL FORM */}
      {mode === "form" ? (
        <form onSubmit={submit} className="flex flex-1 flex-col justify-between">
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

            <div>
              <span className="block font-mono text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">
                [03] Primary Focus / Domain
              </span>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {TOPIC_CHIPS.map((topic) => {
                  const isSelected = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`font-mono text-[11px] px-2.5 py-1 rounded-md border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[#10b981]/15 border-[#10b981] text-black font-bold shadow-sm"
                          : "bg-black/[0.03] border-black/10 text-gray-600 hover:border-black/30 hover:text-black"
                      }`}
                    >
                      {isSelected ? "✓ " : ""}{topic}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="flex flex-1 flex-col">
              <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
                <span className="font-bold text-gray-700 uppercase tracking-wider">
                  [04] Project / Collaboration Brief
                </span>
                <span className="text-gray-400 text-[10px]">
                  {message.length} / 1000 CHARS
                </span>
              </div>
              <textarea
                required
                maxLength={1000}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the system architecture, research challenge, or problem statement..."
                className="contact-field-light flex-1 resize-none min-h-[100px]"
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
                  ? "bg-[#10b981] text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  : "bg-black text-white hover:bg-neutral-800"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {state === "idle" && (
                  <>
                    <span>DISPATCH TRANSMISSION</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
                {state === "sending" && (
                  <>
                    <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>ENCRYPTING &amp; ROUTING...</span>
                  </>
                )}
                {state === "sent" && (
                  <>
                    <Check className="h-4 w-4" />
                    <span>TRANSMISSION ACKNOWLEDGED</span>
                  </>
                )}
              </span>
            </button>
          </Magnetic>
        </form>
      ) : (
        /* MODE 2: INTERACTIVE CLI TERMINAL */
        <div className="flex flex-1 flex-col justify-between rounded-xl bg-[#08090b] text-[#10b981] p-4 font-mono text-xs border border-black/20 shadow-inner">
          <div className="flex-1 overflow-y-auto space-y-2 max-h-[300px] pr-2 select-text">
            {cliLogs.map((log, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap leading-relaxed ${
                  log.type === "system" ? "text-gray-400 font-semibold" :
                  log.type === "user" ? "text-white font-bold" :
                  log.type === "success" ? "text-[#10b981]" :
                  log.type === "error" ? "text-red-400 font-semibold" :
                  "text-emerald-200/80"
                }`}
              >
                {log.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <form onSubmit={handleCliSubmit} className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
            <span className="text-[#10b981] font-bold shrink-0">&gt;</span>
            <input
              ref={cliInputRef}
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              placeholder="type 'help', 'status', 'ping', 'send ...'"
              className="flex-1 bg-transparent text-white placeholder:text-gray-600 focus:outline-none font-mono text-xs"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#10b981] text-[10px] font-mono font-bold inline-flex items-center gap-1"
            >
              <span>RUN</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
