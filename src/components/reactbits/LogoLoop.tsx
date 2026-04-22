import { useMemo } from "react";

type Logo = { src: string; alt: string };

type LogoLoopProps = {
  logos: Logo[];
  direction?: "left" | "right";
  speed?: number;
  gap?: number;
  logoHeight?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  className?: string;
  ariaLabel?: string;
};

export default function LogoLoop({
  logos,
  direction = "left",
  speed = 60,
  gap = 32,
  logoHeight = 32,
  fadeOut = false,
  fadeOutColor = "var(--color-bone)",
  className = "",
  ariaLabel = "Logos",
}: LogoLoopProps) {
  const trackDuration = Math.max(12, 1500 / Math.max(1, speed));
  const items = useMemo(() => logos.filter(Boolean), [logos]);

  return (
    <div className={className} aria-label={ariaLabel}>
      <div className="logo-loop-shell" style={{ position: "relative", overflow: "hidden" }}>
        {fadeOut ? (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(90deg, ${fadeOutColor} 0%, transparent 12%, transparent 88%, ${fadeOutColor} 100%)`,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        ) : null}

        <div
          className="logo-loop-track"
          data-loop-track
          style={{
            display: "flex",
            alignItems: "center",
            gap: `${gap}px`,
            width: "max-content",
            animationDuration: `${trackDuration}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {[...items, ...items].map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", height: `${logoHeight}px` }}
            >
              <img src={logo.src} alt={logo.alt} style={{ height: `${logoHeight}px`, width: "auto" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
