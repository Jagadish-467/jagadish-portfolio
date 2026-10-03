import React from "react";
import { cn } from "@/lib/utils";

interface PolaroidCardProps {
  image: string;
  name?: string;
  subtitle?: string;
  showCaption?: boolean;
  imageOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
  loading?: "eager" | "lazy";
  isActive?: boolean;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({ 
  image, 
  name, 
  subtitle, 
  showCaption = true,
  imageOpacity = 1,
  className, 
  style,
  loading = "lazy",
  isActive = false,
}) => {
  return (
    <div 
      className={cn(
        "group/polaroid relative bg-[#0b0f17]/95 p-3 md:p-3.5",
        "border-[1.5px] border-white/16 rounded-2xl",
        "shadow-[0_24px_65px_rgba(0,0,0,0.85),0_0_30px_rgba(16,185,129,0.18)]",
        "backdrop-blur-2xl transition-all duration-500",
        showCaption ? "pb-14 md:pb-16" : "pb-3 md:p-3.5",
        "w-full select-none",
        className
      )}
      style={style}
    >
      {/* Precision Emerald Corner Brackets */}
      <span className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#10b981] pointer-events-none rounded-tl-sm" />
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#10b981] pointer-events-none rounded-tr-sm" />
      <span className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#10b981] pointer-events-none rounded-bl-sm" />
      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#10b981] pointer-events-none rounded-br-sm" />

      {/* Top HUD Status Bar */}
      <div className="flex items-center justify-between px-1.5 pb-2.5 text-[9px] font-mono tracking-widest text-white/50 uppercase">
        <span className="flex items-center gap-1.5 text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          // HACKATHON REPERTOIRE
        </span>
        <span className="text-[#10b981] font-semibold">
          [ STAGE: VERIFIED ]
        </span>
      </div>

      {/* Photo Area with Awwwards Cinematic Editorial Grade */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-black/60 border border-white/12">
        <img 
          src={image} 
          alt={name || "Hackathon Record"}
          loading={loading}
          decoding="async"
          draggable={false}
          className="w-full h-full object-cover select-none transition-all duration-700 ease-out filter grayscale-[70%] contrast-[1.18] brightness-[0.95] group-hover/polaroid:filter-none group-hover/polaroid:scale-[1.03] group-hover/polaroid:brightness-105"
          style={{ opacity: imageOpacity }}
        />

        {/* Ambient Film Grain & Vignette */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Top Left Watermark inside image */}
        <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[8.5px] font-mono text-white/80 tracking-wider uppercase">
          CODE_ARENA // 2K25
        </div>

        {/* Bottom Right Verified Badge inside image */}
        <div className="absolute bottom-2.5 right-2.5 z-10 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#10b981]/50 text-[9px] font-mono text-[#10b981] font-bold tracking-wider uppercase shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          FINALIST
        </div>
        
        {/* Subtle active spotlight photographic sheen sweep */}
        {isActive && (
          <div 
            key={`sheen-sweep-${image}-${isActive ? 'active' : 'idle'}`}
            className="absolute -inset-[50%] w-[200%] h-[200%] pointer-events-none will-change-transform z-20"
            style={{
              background: "linear-gradient(118deg, transparent 36%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.35) 49%, rgba(255,255,255,0.65) 50.5%, rgba(16,185,129,0.35) 51.5%, rgba(255,255,255,0.2) 53%, transparent 62%)",
              animation: "photoSheenSweep 1.15s cubic-bezier(0.2, 0.9, 0.3, 1) 1.85s both",
            }}
            aria-hidden="true"
          />
        )}
      </div>
      
      {/* Caption Area */}
      {showCaption && name && subtitle && (
        <div className="absolute bottom-3 left-3.5 right-3.5 md:bottom-4 md:left-4 md:right-4 flex items-center justify-between">
          <div>
            <h3 className="text-base md:text-lg font-bold text-white tracking-tight leading-snug uppercase">
              {name}
            </h3>
            <p className="text-xs md:text-sm text-[#10b981] font-mono tracking-wider uppercase mt-0.5 font-semibold">
              {subtitle}
            </p>
          </div>
          <span className="text-white/40 font-mono text-xs hidden sm:block">
            [ 0x02 ]
          </span>
        </div>
      )}
    </div>
  );
};

export default PolaroidCard;
