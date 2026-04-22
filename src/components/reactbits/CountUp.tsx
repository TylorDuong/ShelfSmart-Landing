import { useEffect, useMemo, useState } from "react";

type CountUpProps = {
  to: number;
  duration?: number;
  startWhen?: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function CountUp({
  to,
  duration = 1.4,
  startWhen = true,
  decimals,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const target = Number.isFinite(to) ? to : 0;
  const inferredDecimals = useMemo(() => {
    if (typeof decimals === "number") return decimals;
    const asString = `${target}`;
    return asString.includes(".") ? asString.split(".")[1].length : 0;
  }, [decimals, target]);

  const [value, setValue] = useState(startWhen || prefersReducedMotion() ? target : 0);

  useEffect(() => {
    if (!startWhen) {
      setValue(0);
      return;
    }
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const from = 0;
    let frame = 0;

    const animate = (now: number) => {
      const progress = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (target - from) * eased);
      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [duration, startWhen, target]);

  const formatted = inferredDecimals > 0 ? value.toFixed(inferredDecimals) : Math.round(value).toString();

  return (
    <span className="count-up" data-count-up>
      {prefix}
      <span className="count-up-value">{formatted === "-0" ? "0" : formatted}</span>
      {suffix}
    </span>
  );
}
