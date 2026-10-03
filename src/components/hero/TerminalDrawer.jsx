import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, CornerDownLeft, CheckCircle2 } from 'lucide-react';
import './TerminalDrawer.css';

export default function TerminalDrawer({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Jagadish Core Shell v2.4.0 (x86_64-systems-darwin)' },
    { type: 'system', text: 'Type "help" to view available system commands.\n' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `jagadish@node:~$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  stack      - Print systems, AI, and infrastructure tech stack
  research   - Active areas of academic & engineering research
  ping       - Perform real-time distributed latency test
  whoami     - Quick background & credentials
  clear      - Clear terminal buffer
  exit       - Close terminal interface`
        });
        break;

      case 'stack':
        newHistory.push({
          type: 'output',
          text: `CORE TECHNOLOGY STACK:
  • Systems & Low-Level: Rust, Go, C++, Linux Kernel, Distributed Systems
  • AI & Deep Learning: PyTorch, Autonomous Agents, LLM Fine-Tuning, CUDA
  • Cloud & Infra:       Docker, Kubernetes, AWS, GCP, Redis, Kafka
  • Web & Interface:     TypeScript, Next.js, React, WebGL / Three.js`
        });
        break;

      case 'research':
        newHistory.push({
          type: 'output',
          text: `ACTIVE RESEARCH INITIATIVES:
  [01] Byzantine Fault-Tolerant Consensus in High-Latency P2P Topologies
  [02] Quantum Circuit Optimization using Reinforcement Learning
  [03] Low-Overhead Autonomous Multi-Agent Orchestration Frameworks`
        });
        break;

      case 'ping':
        newHistory.push({
          type: 'output',
          text: `PING cluster.jagadish.internal (10.0.4.1): 56 data bytes
  64 bytes from 10.0.4.1: icmp_seq=0 ttl=64 time=4.12 ms
  64 bytes from 10.0.4.1: icmp_seq=1 ttl=64 time=3.89 ms
  64 bytes from 10.0.4.1: icmp_seq=2 ttl=64 time=4.05 ms
--- cluster.jagadish.internal ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
Round-trip min/avg/max = 3.89/4.02/4.12 ms [HEALTHY]`
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `Jagadish — UI Designer, Creative Technologist & Systems Architect.
Passionate about engineering beautiful, tactile digital interfaces and high-performance systems.`
        });
        break;

      case 'contact':
      case 'email':
        newHistory.push({
          type: 'output',
          text: `CONTACT & CONNECT:
  • Email:    jagadish@portfolio.dev
  • Status:   Available for Freelance & Collaborative Projects
  • GitHub:   https://github.com/jagadish
  • LinkedIn: https://linkedin.com/in/jagadish`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `command not found: "${cmd}". Type "help" for a list of commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
        
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red" onClick={onClose} />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          <div className="terminal-title">
            <Terminal size={14} className="title-icon" />
            <span>jagadish@core-systems:~ (zsh)</span>
          </div>

          <button className="terminal-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {history.map((entry, idx) => (
            <div key={idx} className={`term-line term-${entry.type}`}>
              <pre>{entry.text}</pre>
            </div>
          ))}

          {/* Interactive Line */}
          <div className="term-input-row">
            <span className="term-prompt">jagadish@node:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="term-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              autoFocus
              spellCheck="false"
            />
            <CornerDownLeft size={12} className="enter-hint" />
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Terminal Footer */}
        <div className="terminal-footer">
          <span>Shortcuts: Press 'ESC' or type 'exit' to close</span>
          <span className="footer-status">
            <CheckCircle2 size={12} color="#10b981" /> Connected: Secure Cluster
          </span>
        </div>

      </div>
    </div>
  );
}
