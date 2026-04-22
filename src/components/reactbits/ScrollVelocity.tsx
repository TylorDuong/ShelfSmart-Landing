import { useMemo } from "react";

type ScrollVelocityProps = {
  texts: string[];
  velocity?: number;
  numCopies?: number;
  className?: string;
  parallaxClassName?: string;
  scrollerClassName?: string;
  direction?: "left" | "right";
};

export default function ScrollVelocity({
  texts,
  velocity = 60,
  numCopies = 4,
  className = "",
  parallaxClassName = "",
  scrollerClassName = "",
  direction = "left",
}: ScrollVelocityProps) {
  const items = useMemo(() => {
    const safeTexts = texts.filter(Boolean);
    const copies = Array.from({ length: Math.max(1, numCopies) }, () => safeTexts);
    return copies.flat();
  }, [numCopies, texts]);

  const duration = Math.max(12, 1500 / Math.max(1, velocity));

  return (
    <div className={className}>
      <div className={parallaxClassName}>
        <div
          className={scrollerClassName}
          data-scroll-velocity-track
          style={{
            animationDuration: `${duration}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          <div className="trust-track">
            {items.map((item, index) => (
              <span key={`${item}-${index}`} className="trust-pill">
                <span>{item}</span>
              </span>
            ))}
          </div>
          <div className="trust-track" aria-hidden="true">
            {items.map((item, index) => (
              <span key={`${item}-clone-${index}`} className="trust-pill">
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
