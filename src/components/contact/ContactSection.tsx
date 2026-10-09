import React from "react";
import { ContactForm } from "./ContactForm";
import { EmailDispatch } from "./EmailDispatch";
import { NodeStatus } from "./NodeStatus";
import { PlatformMatrix } from "./PlatformMatrix";
import "./Contact.css";

export function ContactSection() {
  return (
    <section 
      id="contact" 
      className="portfolio-section-anchor contact-section-root"
      data-theme="light"
    >
      {/* Background Architectural Dot Grid */}
      <div className="contact-dot-grid" />

      {/* Massive Awwwards Parallax Stroke Watermark on the Right (Matching MANIFESTO) */}
      <div className="contact-watermark absolute top-[8%] right-[-2vw] pointer-events-none select-none z-0 opacity-[0.04]">
        <h1 
          className="text-[28vw] md:text-[22vw] lg:text-[18vw] font-black leading-none tracking-tight select-none" 
          style={{ 
            writingMode: 'vertical-rl', 
            WebkitTextStroke: '2px #000000', 
            color: 'transparent' 
          }}
        >
          CONTACT
        </h1>
      </div>

      {/* Awwwards Rotating Typographic Stamp on Top-Right */}
      <div className="absolute top-24 right-8 lg:right-16 z-20 pointer-events-none hidden md:block">
        <div className="relative w-36 h-36 opacity-85">
          <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible animate-spin" style={{ animationDuration: '28s' }}>
            <path id="contactCirclePath" d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="transparent" />
            <text className="text-[7.2px] font-mono tracking-[0.08em] fill-black font-semibold uppercase">
              <textPath href="#contactCirclePath" textLength="263" lengthAdjust="spacing">
                • 05 TRANSMISSION • PONNADA JAGADISH KUMAR • DIRECT NETWORK • 
              </textPath>
            </text>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
        </div>
      </div>

      {/* Decorative Architectural Corner Crosshairs */}
      <div className="contact-crosshair contact-crosshair-tl" />
      <div className="contact-crosshair contact-crosshair-tr" />
      <div className="contact-crosshair contact-crosshair-bl" />
      <div className="contact-crosshair contact-crosshair-br" />

      <div className="relative z-10 mx-auto max-w-7xl w-full flex-1 flex flex-col justify-between">
        {/* 2-Column Responsive Layout: Information on Left, Contact Form fully fitting Right Side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-stretch my-auto">
          
          {/* Left Column: Section Header & Direct Channels */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-widest text-black/70 uppercase">
                  05 // TRANSMISSION &amp; DIRECT NETWORK
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black uppercase leading-[1.05]">
                LET&apos;S BUILD SOMETHING EXTRAORDINARY.
              </h2>

              <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-sans max-w-xl">
                Open for research collaborations, engineering challenges, high-performance distributed systems,
                and quantum algorithmic developments.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <EmailDispatch />
              <PlatformMatrix />
              <NodeStatus />
            </div>
          </div>

          {/* Right Column: Full-Height Fitted Contact Terminal */}
          <div className="h-full flex flex-col justify-stretch">
            <ContactForm />
          </div>
        </div>

        {/* Bottom Section Editorial Credits */}
        <div className="mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-gray-500">
          <div>
            PONNADA JAGADISH KUMAR // DESIGNED WITH RIGOR &amp; AESTHETIC INTEGRITY
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full" />
            <span className="text-black font-semibold">ALL TRANSMISSIONS PRIVACY PRESERVED</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
