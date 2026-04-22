/**
 * Custom SVG icon component for the editorial dashboard design.
 * These icons match the warm, editorial aesthetic of the ShelfSmart theme.
 * For other pages, lucide-react icons can still be used.
 */

interface IconProps {
  name: string;
  s?: number;
  stroke?: number;
  className?: string;
}

export default function Icon({ name, s = 16, stroke: strokeWidth = 1.6, className = "" }: IconProps) {
  const p = {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (name) {
    case "home":
      return <svg {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></svg>;
    case "box":
      return <svg {...p}><path d="M3 7l9-4 9 4-9 4-9-4z" /><path d="M3 7v10l9 4 9-4V7" /><path d="M12 11v10" /></svg>;
    case "truck":
      return <svg {...p}><path d="M3 7h11v10H3z" /><path d="M14 10h4l3 3v4h-7" /><circle cx="7" cy="19" r="2" /><circle cx="17" cy="19" r="2" /></svg>;
    case "cart":
      return <svg {...p}><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M3 4h3l2 12h12" /></svg>;
    case "chart":
      return <svg {...p}><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M3 20h18" /></svg>;
    case "cal":
      return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>;
    case "gear":
      return <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .4 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.4 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.4l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .4-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.4-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.4H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.4l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.4 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>;
    case "bell":
      return <svg {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10 21a2 2 0 0 0 4 0" /></svg>;
    case "search":
      return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>;
    case "plus":
      return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>;
    case "arrow":
      return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "up":
      return <svg {...p}><path d="M7 17L17 7M9 7h8v8" /></svg>;
    case "down":
      return <svg {...p}><path d="M17 7L7 17M7 9v8h8" /></svg>;
    case "sun":
      return <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" /></svg>;
    case "foot":
      return <svg {...p}><path d="M7 4c1.5 0 3 1.5 3 4s-1 5-3 5-3-2-3-4 1-5 3-5zM16 9c1.5 0 2.5 1 2.5 2.5S17 14 16 14s-2-1-2-2.5S14.5 9 16 9zM6 15c3 0 5 2 5 4H3c0-2 1-4 3-4zM14 16c2 0 3 1.5 3 3h-6c0-1.5 1-3 3-3z" /></svg>;
    case "spark":
      return <svg {...p}><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" /></svg>;
    case "trend":
      return <svg {...p}><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>;
    case "tag":
      return <svg {...p}><path d="M3 12V3h9l9 9-9 9z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg>;
    case "logout":
      return <svg {...p}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="M10 17l-5-5 5-5" /><path d="M5 12h12" /></svg>;
    case "check":
      return <svg {...p}><path d="M4 12l5 5 11-11" /></svg>;
    case "dot":
      return <svg {...p}><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>;
    case "alert":
      return <svg {...p}><path d="M12 3l10 18H2z" /><path d="M12 10v5M12 18h.01" /></svg>;
    case "chevron-left":
      return <svg {...p}><path d="M15 18l-6-6 6-6" /></svg>;
    case "chevron-right":
      return <svg {...p}><path d="M9 6l6 6-6 6" /></svg>;
    case "menu":
      return <svg {...p}><path d="M3 6h18M3 12h18M3 18h18" /></svg>;
    case "filter":
      return <svg {...p}><path d="M3 4h18l-7 8v5l-4 2V12L3 4z" /></svg>;
    case "upload":
      return <svg {...p}><path d="M12 15V3M5 10l7-7 7 7" /><path d="M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" /></svg>;
    case "trash":
      return <svg {...p}><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" /><path d="M5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6" /></svg>;
    case "more":
      return <svg {...p}><circle cx="12" cy="6" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="18" r="1" fill="currentColor" /></svg>;
    case "map-pin":
      return <svg {...p}><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>;
    case "factory":
      return <svg {...p}><path d="M2 20h20M4 20V10l4-2v4l4-2v4l4-2v4l4-2v4" /></svg>;
    case "qr":
      return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="3" height="3" /><rect x="18" y="18" width="3" height="3" /></svg>;
    case "help":
      return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M9 9a3 3 0 1 1 3.5 3c-.5.3-1.5 1-1.5 2" /><circle cx="12" cy="18" r="0.5" fill="currentColor" /></svg>;
    case "user":
      return <svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 12 0v1" /></svg>;
    case "brain":
      return <svg {...p}><path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 3 4.6V19a2 2 0 1 0 4 0v-5.4A5 5 0 0 0 17 9V7a5 5 0 0 0-5-5z" /></svg>;
    case "shield-check":
      return <svg {...p}><path d="M12 2l8 4v6c0 5.5-3.8 10.7-8 12-4.2-1.3-8-6.5-8-12V6l8-4z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "zap":
      return <svg {...p}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>;
    case "clock":
      return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
    case "external":
      return <svg {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14L21 3" /></svg>;
    default:
      return null;
  }
}
