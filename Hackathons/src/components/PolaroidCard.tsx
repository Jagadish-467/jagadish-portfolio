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

const PolaroidCard = ({ 
  image, 
  name, 
  subtitle, 
  showCaption = true,
  imageOpacity = 1,
  className, 
  style,
  loading = "lazy",
  isActive = false,
}: PolaroidCardProps) => {
  return (
    <div 
      className={cn(
        "group/polaroid relative bg-[#dedcd9] dark:bg-[#1e1e20] p-2 md:p-2.5",
        "border border-black/[0.07] dark:border-white/[0.08]",
        "shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_3px_rgba(0,0,0,0.1)]",
        showCaption ? "pb-14 md:pb-16" : "pb-2 md:pb-2.5",
        "w-full",
        "select-none transition-shadow duration-300",
        className
      )}
      style={style}
    >
      {/* Photo area */}
      <div className="relative aspect-square overflow-hidden bg-neutral-900 border border-black/[0.08] dark:border-white/[0.05]">
        <img 
          src={image} 
          alt={name || "Artwork"}
          loading={loading}
          decoding="async"
          draggable={false}
          className="w-full h-full object-cover select-none grayscale contrast-125 brightness-90"
          style={{ opacity: imageOpacity }}
        />
        {/* Subtle physical photo sheen */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-black/[0.06] via-transparent to-white/[0.08] pointer-events-none" 
          aria-hidden="true" 
        />
        {/* Interactive hover gloss sheen */}
        <div 
          className="absolute inset-0 opacity-0 group-hover/polaroid:opacity-100 transition-opacity duration-300 pointer-events-none z-10 bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.10]" 
          aria-hidden="true" 
        />
        {/* Active spotlight photographic surface sheen sweep (locks in at 1.85s as card settles into hero position) */}
        {isActive && (
          <div 
            key={`sheen-sweep-${image}-${isActive ? 'active' : 'idle'}`}
            className="absolute -inset-[50%] w-[200%] h-[200%] pointer-events-none will-change-transform z-20"
            style={{
              background: "linear-gradient(118deg, transparent 36%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.65) 49%, rgba(255,255,255,0.95) 50.5%, rgba(0,229,153,0.45) 51.5%, rgba(255,255,255,0.35) 53%, transparent 62%)",
              animation: "photoSheenSweep 1.15s cubic-bezier(0.2, 0.9, 0.3, 1) 1.85s both",
            }}
            aria-hidden="true"
          />
        )}
      </div>
      
      {/* Caption area - only shown if showCaption is true (Card 4) */}
      {showCaption && name && subtitle && (
        <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-3.5 md:right-3.5">
          <h3 className="text-lg md:text-xl font-semibold text-[#1a1a1a] dark:text-[#f0f0f0] tracking-tight leading-snug">
            {name}
          </h3>
          <p className="text-xs md:text-sm text-[#666666] dark:text-[#999999] tracking-normal font-normal mt-0.5">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
};

export default PolaroidCard;
