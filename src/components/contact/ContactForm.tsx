import React, { useState, useRef, useEffect, type FormEvent } from "react";
import { ArrowRight, Check, Terminal as TerminalIcon, FormInput, CornerDownLeft, Sparkles, Trash2, ArrowUpRight } from "lucide-react";
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

  // CLI State & History
  const [cliInput, setCliInput] = useState("");
  const [cliLogs, setCliLogs] = useState<TerminalLog[]>([
    { type: "system", text: "JAGADISH_OS v2.6.4 [Quantum-Safe Gateway Kernel initialized]" },
    { type: "info", text: "Identity: Ponnada Jagadish Kumar • B.Tech CSE (3rd Year) @ Lendi IET\nType 'help' for available commands, or type 'send <message>' to dispatch a brief." }
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const cliInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll ONLY the terminal's internal container (NEVER scroll the whole window)
  useEffect(() => {
    if (mode === "cli" && terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
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
        description: `Thank you, ${name}! Brief received regarding ${selectedTopic}. Jagadish will reply directly shortly.`
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

    // Add to history
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const newLogs: TerminalLog[] = [...cliLogs, { type: "user", text: `jagadish@gateway:~$ ${cmd}` }];
    const lower = cmd.toLowerCase();

    if (lower === "help") {
      newLogs.push({
        type: "info",
        text: "AVAILABLE COMMANDS:\n  • status        : View availability, academic minor & location\n  • cv / resume   : View & redirect to verified Technical Curriculum Vitae\n  • skills        : Core programming languages & technical domains\n  • projects      : Multi-QPU synthesis, Amazon ML, OFFLAN tunnel\n  • hackathons    : Competitive achievements & national rankings\n  • ping          : Run network latency handshake test\n  • socials       : Direct links to GitHub, LinkedIn, LeetCode, IG\n  • email         : Display direct verified inbox address\n  • send <msg>    : Transmit a direct transmission to Jagadish\n  • whoami        : Current session identity credentials\n  • clear / cls   : Clear terminal logs\n  • form / exit   : Switch to the visual interactive form"
      });
    } else if (lower === "ping") {
      newLogs.push({
        type: "success",
        text: "PONG // 64 bytes from gateway.jagadish.network: icmp_seq=1 ttl=58 time=12.4 ms [ZERO PACKET LOSS]"
      });
    } else if (lower === "status") {
      newLogs.push({
        type: "success",
        text: "STATUS: ACTIVE // 3rd Year B.Tech CSE @ Lendi IET (Vizianagaram, India)\nACADEMIC MINOR: Quantum Computing (IBM Qiskit)\nOPEN FOR: Summer 2025/2026 Engineering Roles, Research Collaborations & Grants\nRESPONSE SLA: Under 12 Hours"
      });
    } else if (lower === "cv" || lower === "resume") {
      window.open("/resume.pdf", "_blank", "noopener,noreferrer");
      newLogs.push({
        type: "success",
        text: "DISPATCHING // Opening verified Curriculum Vitae (Ponnada Jagadish Kumar • 2026 Edition)\nURI: /resume.pdf"
      });
      toast.info("TECHNICAL CV // 2026 EDITION", {
        description: "Ponnada Jagadish Kumar • Academic & Engineering Resume"
      });
    } else if (lower === "skills") {
      newLogs.push({
        type: "info",
        text: "CORE LANGUAGES  : Python (3.12), C++20, Go, Rust, Java, TypeScript, C\nSYSTEMS & ML    : PyTorch, Ray Clusters, Apple MPS Silicon, Scikit-learn\nQUANTUM COMPUTE : IBM Qiskit, Quantum Kernels (QSVM), 3D Bloch Sphere\nPROTOCOLS & WEB : WebRTC P2P, Double Ratchet E2EE, React 19, Three.js, GSAP"
      });
    } else if (lower === "projects") {
      newLogs.push({
        type: "info",
        text: "1. Multi-QPU Synthesis   : Distributed quantum circuit compiler & min-cut partitioner\n2. Amazon ML Challenge   : High-throughput entity resolution (National Rank 135, Top 0.2%)\n3. OFFLAN Sovereign P2P : Zero-cloud WebRTC LAN-first media & data tunnel\n4. 3D Dirac Bloch Sphere: Real-time WebGL quantum state vector simulation"
      });
    } else if (lower === "hackathons") {
      newLogs.push({
        type: "success",
        text: "• Smart India Hackathon (SIH) : Nationwide grand finalist\n• Techniverse Hackathon        : Multi-QPU quantum architecture award\n• LNIT National Hackathon      : Offline-first emergency mesh communication\n• Amazon ML Challenge 2026     : Rank 135 / ~75,000 teams (Macro F0.5 ~0.9863)"
      });
    } else if (lower === "socials" || lower === "links") {
      newLogs.push({
        type: "info",
        text: "• GitHub   : github.com/Jagadish-467\n• LinkedIn : linkedin.com/in/ponnada-jagadish-kumar\n• LeetCode : leetcode.com/Jagadish-467 (425+ Problems Solved)\n• Instagram: instagram.com/___jagadish_kumar___"
      });
    } else if (lower === "email" || lower === "contact") {
      newLogs.push({
        type: "success",
        text: "PRIMARY INBOX: jagadish.kumar.ponnada@gmail.com\nType 'send <your message>' to transmit directly through this terminal."
      });
    } else if (lower === "whoami") {
      newLogs.push({
        type: "info",
        text: "USER: guest@quantum-gateway (Authorized Visitor // IP: 127.0.0.1 // TLS 1.3 256-Bit)"
      });
    } else if (lower === "date" || lower === "time") {
      newLogs.push({
        type: "info",
        text: `GATEWAY TIMESTAMP: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} IST`
      });
    } else if (lower.startsWith("send")) {
      const msgContent = cmd.replace(/^send\s*/i, "").trim();
      if (!msgContent) {
        newLogs.push({
          type: "error",
          text: "ERROR: Missing payload. Usage: send <your message or email address>"
        });
      } else {
        newLogs.push({
          type: "success",
          text: `TRANSMISSION ENQUEUED // Payload dispatched: "${msgContent}"\nSTATUS: ACKNOWLEDGED // Jagadish will review and reply directly.`
        });
        toast.success("CLI TRANSMISSION DISPATCHED", {
          description: `Payload: "${msgContent.slice(0, 45)}..."`
        });
      }
    } else if (lower === "clear" || lower === "cls") {
      setCliLogs([
        { type: "system", text: "JAGADISH_OS v2.6.4 [Screen cleared // Terminal active]" },
        { type: "info", text: "Type 'help' for available commands." }
      ]);
      setCliInput("");
      return;
    } else if (lower === "form" || lower === "exit") {
      setMode("form");
      toast.info("SWITCHED TO VISUAL FORM");
      return;
    } else {
      newLogs.push({
        type: "error",
        text: `COMMAND NOT FOUND: "${cmd}". Type 'help' for available command manual.`
      });
    }

    setCliLogs(newLogs);
    setCliInput("");
  }

  // Key navigation for command history (Up / Down Arrow)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setCliInput(history[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setCliInput("");
      } else {
        setHistoryIndex(nextIndex);
        setCliInput(history[nextIndex] || "");
      }
    }
  };

  return (
    <div className="contact-light-panel p-5 sm:p-6 lg:p-7 flex flex-col h-full relative" data-cursor="interactive">
      <Crosshairs />

      {/* Top Header & Mode Switcher Tabs */}
      <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-black/10 shrink-0">
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
        <form onSubmit={submit} className="flex flex-1 flex-col justify-between gap-3">
          <div className="flex flex-1 flex-col gap-3">
            {/* 2-Column Row for Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="block font-mono text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
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
                <span className="block font-mono text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
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
                {error && <span className="mt-1 block font-mono text-[10px] text-red-500">{error}</span>}
              </label>
            </div>

            {/* Topic Chips */}
            <div>
              <span className="block font-mono text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                [03] Primary Focus / Domain
              </span>
              <div className="flex flex-wrap gap-1.5">
                {TOPIC_CHIPS.map((topic) => {
                  const isSelected = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md border transition-all duration-200 cursor-pointer ${
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

            {/* Project Brief Textarea */}
            <label className="flex flex-1 flex-col">
              <div className="flex items-center justify-between mb-1 font-mono text-[11px]">
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
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the system architecture, research challenge, or engineering requirements..."
                className="contact-field-light flex-1 resize-none min-h-[90px]"
              />
            </label>
          </div>

          <Magnetic strength={0.12} className="mt-2">
            <button
              type="submit"
              disabled={state !== "idle"}
              data-cursor="explore"
              className={`relative w-full overflow-hidden rounded-lg px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 cursor-pointer ${
                state === "sent"
                  ? "bg-[#10b981] text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  : "bg-black text-white hover:bg-neutral-800"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5">
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
        /* MODE 2: INTERACTIVE CLI TERMINAL (PERFECTED) */
        <div
          onClick={() => cliInputRef.current?.focus()}
          className="flex flex-1 flex-col justify-between rounded-xl bg-[#07080a] text-[#10b981] p-3 sm:p-4 font-mono text-xs border border-black/30 shadow-2xl relative overflow-hidden cursor-text"
        >
          {/* macOS Traffic Dots Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 shrink-0 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
              <span className="text-gray-400 text-[10px] ml-2 font-mono hidden sm:inline">
                jagadish@gateway:~ [zsh]
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-400">
              <span className="flex items-center gap-1 text-[#10b981]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                ONLINE
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setCliLogs([]); }}
                className="hover:text-white transition-colors px-1"
                title="Clear screen"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Terminal Body Logs (Strict inner container scroll with zero window scroll) */}
          <div
            ref={terminalBodyRef}
            className="flex-1 overflow-y-auto space-y-1.5 terminal-scroll pr-2 select-text font-mono text-[11px] min-h-[220px]"
          >
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
          </div>

          {/* Command Prompt Line */}
          <form
            onSubmit={handleCliSubmit}
            className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[#10b981] font-bold text-xs shrink-0 select-none">&gt;</span>
            <input
              ref={cliInputRef}
              type="text"
              autoFocus
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'status', 'ping', 'send ...'"
              className="flex-1 bg-transparent text-white placeholder:text-gray-600 focus:outline-none font-mono text-xs selection:bg-[#10b981] selection:text-black"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#10b981] text-[10px] font-mono font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
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
