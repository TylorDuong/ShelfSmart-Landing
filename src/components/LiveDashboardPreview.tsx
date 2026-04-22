import React, { useState, useEffect, useMemo, useRef } from 'react';
import Icon from './Icon';
import logoImg from '../../Images/logo-icon.png';
import textImg from '../../Images/logo-text.png';
import '../live-dashboard.css';

type Order = any;

const navItems = [
  { name: 'Dashboard', icon: 'home', path: '/', badge: 0 },
  { name: 'Inventory', icon: 'box', path: '/inventory', badge: 6 },
  { name: 'Suppliers', icon: 'truck', path: '/suppliers', badge: 0 },
  { name: 'Analytics', icon: 'chart', path: '/analytics', badge: 0 },
  { name: 'Settings', icon: 'gear', path: '/settings', badge: 0 },
];

const mockOrders = [
  { id: 1, status: 'In Transit', supplier_name: 'Fresh Farms', scheduled_date: new Date(Date.now() + 86400000).toISOString(), cost: 450.50 },
  { id: 2, status: 'Pending', supplier_name: 'Ocean Catch', scheduled_date: new Date(Date.now() + 172800000).toISOString(), cost: 890.00 },
  { id: 3, status: 'Confirmed', supplier_name: 'Highland Dairy', scheduled_date: new Date(Date.now()).toISOString(), cost: 310.25 },
  { id: 4, status: 'In Transit', supplier_name: 'Golden Grain', scheduled_date: new Date(Date.now() + 259200000).toISOString(), cost: 620.80 }
];

const mockInventory = [
  { name: 'Atlantic Salmon', sku: 'SEA-201', current_stock: 4, reorder_point: 10, capacity: 50, category: 'Proteins', daily_usage: 5, supplier_name: 'Ocean Catch', unit_cost: 14.5, uom: 'lb' },
  { name: 'Ribeye Steak', sku: 'BEE-114', current_stock: 45, reorder_point: 15, capacity: 60, category: 'Proteins', daily_usage: 10, supplier_name: 'Butcher Street', unit_cost: 18.2, uom: 'lb' },
  { name: 'Organic Kale', sku: 'PRD-032', current_stock: 8, reorder_point: 20, capacity: 100, category: 'Produce', daily_usage: 15, supplier_name: 'Fresh Farms', unit_cost: 2.4, uom: 'bunch' },
  { name: 'Heavy Cream', sku: 'DRY-508', current_stock: 2, reorder_point: 5, capacity: 20, category: 'Dairy', daily_usage: 4, supplier_name: 'Highland Dairy', unit_cost: 3.1, uom: 'qt' },
  { name: 'Truffle Oil', sku: 'DRY-914', current_stock: 12, reorder_point: 3, capacity: 15, category: 'Dry', daily_usage: 0.5, supplier_name: 'Maison Noir', unit_cost: 26.0, uom: 'oz' }
];

const mockSuppliers = [
  { name: 'Fresh Farms', category: 'Produce', lead_time_days: 2, on_time_pct: 96, spend: 12450, status: 'Preferred', contact: 'A. Ortiz' },
  { name: 'Ocean Catch', category: 'Seafood', lead_time_days: 3, on_time_pct: 82, spend: 18200, status: 'Watch', contact: 'D. Singh' },
  { name: 'Highland Dairy', category: 'Dairy', lead_time_days: 1, on_time_pct: 92, spend: 9650, status: 'Preferred', contact: 'M. Park' },
  { name: 'Golden Grain', category: 'Dry', lead_time_days: 4, on_time_pct: 78, spend: 7350, status: 'Issue', contact: 'S. Cole' },
  { name: 'Butcher Street', category: 'Proteins', lead_time_days: 2, on_time_pct: 88, spend: 14900, status: 'Watch', contact: 'J. Patel' }
];

const mockMarketIntel = [
  { item: 'Atlantic Salmon', delta: -12, note: 'Wholesale dip - lock 2 week contract', action: 'Buy window' },
  { item: 'Heavy Cream', delta: 6, note: 'Seasonal demand lift forecasted', action: 'Hold' },
  { item: 'Truffle Oil', delta: -4, note: 'EU surplus - negotiate bulk', action: 'Negotiate' }
];

const mockDemandData = Array.from({ length: 14 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
  const base = isWeekend ? 350 : 150;
  return {
    date: d.toISOString().split('T')[0],
    predictedCustomers: base + Math.floor(Math.random() * 50) + (i === 4 ? 80 : 0),
    historicalBaseline: base,
    weather: 5,
    weatherDetail: { rawTemp: 72, precipType: 'none' },
    events: i === 4 ? 10 : 0,
    eventDetail: { activeEvents: i === 4 ? [{ name: 'Local Festival' }] : [] },
    trends: 0,
    trendDetail: { trendingItems: [] },
    promos: 0,
    promoDetail: { activePromos: [] }
  };
});

const ChevronExpand = ({ expanded }: { expanded: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

type AnimatedNumberProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

const useAnimatedNumber = (value: number, duration: number) => {
  const safeValue = Number.isFinite(value) ? value : 0;
  const [display, setDisplay] = useState(safeValue);
  const displayRef = useRef(safeValue);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    const from = displayRef.current;
    const to = Number.isFinite(value) ? value : 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (from === to) {
      setDisplay(to);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = from + (to - from) * eased;
      setDisplay(next);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return display;
};

const AnimatedNumber = ({ value, decimals = 0, prefix = "", suffix = "", duration = 650 }: AnimatedNumberProps) => {
  const animated = useAnimatedNumber(value, duration);
  const safe = Number.isFinite(animated) ? animated : 0;
  const raw = decimals > 0 ? safe.toFixed(decimals) : Math.round(safe).toString();
  const cleaned = raw === "-0" ? "0" : raw;
  return <>{prefix}{cleaned}{suffix}</>;
};

const buildSparkPath = (values: number[], width: number, height: number, pad = 6) => {
  if (!values || values.length === 0) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  return values
    .map((v, i) => {
      const x = pad + (i / Math.max(1, values.length - 1)) * (width - pad * 2);
      const y = height - pad - ((v - min) / range) * (height - pad * 2);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
};

type ExpandedCard = null | 'guests' | 'critical' | 'arriving' | 'eod';

function DashboardInner() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [subTab, setSubTab] = useState<'transit' | 'scheduled' | 'drafting'>('transit');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [eventType, setEventType] = useState('Promo');
  const [eventLabel, setEventLabel] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventDiscount, setEventDiscount] = useState('0');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [demandData, setDemandData] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [chartRange, setChartRange] = useState('14D');
  const [expandedCard, setExpandedCard] = useState<ExpandedCard>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCard = (k: Exclude<ExpandedCard, null>) =>
    setExpandedCard((prev) => (prev === k ? null : k));

  useEffect(() => {
    setOrders(mockOrders);
    setInventory(mockInventory);
    setDemandData(mockDemandData);
    
    const interval = setInterval(() => {
      setDemandData(prev => prev.map((d, i) => {
        if (i === 0) {
          const guestDelta = Math.random() > 0.5 ? Math.floor(Math.random() * 4) : -Math.floor(Math.random() * 4);
          const trendDelta = Math.random() > 0.6 ? 1 : Math.random() < 0.4 ? -1 : 0;
          return { 
            ...d, 
            predictedCustomers: d.predictedCustomers + guestDelta,
            trends: d.trends + trendDelta
          };
        }
        return d;
      }));
      setInventory(prev => prev.map((item, i) => {
        if (i < 3 && Math.random() > 0.5) {
          return { ...item, current_stock: Math.max(0, item.current_stock + (Math.random() > 0.5 ? 1 : -1)) };
        }
        return item;
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

const days = useMemo(() => {
    if (!demandData || demandData.length === 0) return [];
    return demandData.map((d) => {
      let date: Date;
      if (typeof d.date === "string" && d.date.includes("-")) {
        const parts = d.date.split("-");
        date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      } else {
        date = new Date();
      }
      const dow = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayNum = date.getDate();
      const tags: string[] = [];
      if (d.eventDetail?.activeEvents?.length > 0) tags.push("event");
      if (d.promoDetail?.activePromos?.length > 0) tags.push("promo");
      if (date.getDay() === 2) tags.push("delivery");

      return {
        name: `${dow} ${dayNum}`,
        guests: d.predictedCustomers || 0,
        baseline: d.historicalBaseline || 0,
        tags,
        date,
        raw: d,
      };
    });
  }, [demandData]);

  const safeIdx = selectedDayIndex >= days.length ? 0 : selectedDayIndex;
  const selectedDay = days.length > 0 ? days[safeIdx] : null;

  /* ── Influences for selected day ── */
  const influences = useMemo(() => {
    if (!selectedDay) return [];
    const d = selectedDay.raw;
    return [
      {
        name: "Weather",
        score: d.weather || 0,
        desc: d.weatherDetail
          ? `${d.weatherDetail.rawTemp}°F, ${d.weatherDetail.precipType === "none" ? "clear" : d.weatherDetail.precipType}`
          : "Forecast active",
        icon: "sun",
      },
      {
        name: "Foot traffic",
        score: d.historicalBaseline || 0,
        desc: `${d.historicalBaseline || 0} avg baseline`,
        icon: "foot",
        isBaseline: true,
      },
      {
        name: "Local event",
        score: d.events || 0,
        desc:
          d.eventDetail?.activeEvents?.length > 0
            ? d.eventDetail.activeEvents[0].name
            : "No major events",
        icon: "spark",
      },
      {
        name: "Menu trend",
        score: d.trends || 0,
        desc: d.trendDetail?.trendingItems?.length > 0 ? `${d.trendDetail.trendingItems[0].name} ↑` : "Standard baseline",
        icon: "trend",
      },
      {
        name: "Promo",
        score: d.promos || 0,
        desc:
          d.promoDetail?.activePromos?.length > 0
            ? d.promoDetail.activePromos[0].name
            : "No campaign",
        icon: "tag",
      },
    ];
  }, [selectedDay]);

  const compositeScore = influences.reduce((a, b) => a + (b.isBaseline ? 0 : b.score), 0);

  /* ── Critical inventory ── */
  const criticalItems = useMemo(() => {
    return inventory
      .filter((i) => i.current_stock <= i.reorder_point)
      .sort((a, b) => a.current_stock / a.capacity - b.current_stock / b.capacity)
      .slice(0, 4);
  }, [inventory]);

  /* ── SKUs projected to drop below ROP by EOD ── */
  const skusBelowROPByEOD = useMemo(() => {
    return inventory.filter(
      (i) => (i.current_stock - (i.daily_usage || 0)) <= i.reorder_point
    ).length;
  }, [inventory]);

  /* ── Orders ── */
  const filteredOrders = useMemo(() => {
    if (subTab === "transit") return orders.filter((o) => o.status === "In Transit");
    if (subTab === "scheduled") return orders.filter((o) => o.status === "Confirmed");
    return orders.filter((o) => o.status === "Pending");
  }, [orders, subTab]);

  const arrivingCount = useMemo(
    () => orders.filter((o) => o.status === "In Transit").length,
    [orders]
  );

  /* ── Chart geometry ── */
  const chartW = 640, chartH = 180, chartPad = 20;
  const chartMax = days.length > 0 ? Math.max(...days.map((d) => d.guests)) + 40 : 200;
  const chartMin = days.length > 0 ? Math.min(...days.map((d) => d.baseline)) - 40 : 0;
  const xs = (i: number) => chartPad + (i / Math.max(1, days.length - 1)) * (chartW - chartPad * 2);
  const ys = (v: number) => chartH - chartPad - ((v - chartMin) / (chartMax - chartMin || 1)) * (chartH - chartPad * 2);
  const forecastPath = days.map((d, i) => `${i === 0 ? "M" : "L"} ${xs(i)} ${ys(d.guests)}`).join(" ");
  const baselinePath = days.map((d, i) => `${i === 0 ? "M" : "L"} ${xs(i)} ${ys(d.baseline)}`).join(" ");

  /* ── Greeting ── */
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const todayLabel = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  /* ── Today's hero values ── */
  const todayGuests = selectedDay?.guests || 0;
  const todayBaseline = selectedDay?.baseline || 0;
  const todayDelta = todayBaseline > 0 ? Math.round(((todayGuests - todayBaseline) / todayBaseline) * 100) : 0;

  /* ── Stock health categories ── */
  const stockHealth = useMemo(() => {
    const cats = ["Proteins", "Produce", "Dairy", "Dry", "Grocery"];
    return cats.map((cat) => {
      const items = inventory.filter((i) => i.category === cat);
      const healthy = items.filter((i) => i.current_stock > i.reorder_point).length;
      const total = items.length;
      const pct = total > 0 ? Math.round((healthy / total) * 100) : 100;
      return {
        name: cat === "Dry" ? "Dry goods" : cat,
        pct,
        count: `${healthy}/${total}`,
        color: pct >= 70 ? "var(--color-sage)" : pct >= 50 ? "var(--color-accent)" : "var(--color-danger)",
      };
    });
  }, [inventory]);

  const totalHealthy = stockHealth.reduce((a, c) => a + parseInt(c.count.split("/")[0]), 0);
  const totalItems = stockHealth.reduce((a, c) => a + parseInt(c.count.split("/")[1]), 0);

  /* ── Calendar tag styles ── */
  const tagStyle = (tag: string) => {
    switch (tag) {
      case "delivery": return { bg: "var(--color-ink)", color: "#fff", label: "Delivery" };
      case "promo": return { bg: "var(--color-accent)", color: "#fff", label: "Promo" };
      case "event": return { bg: "oklch(0.65 0.15 280)", color: "#fff", label: "Event" };
      case "trend": return { bg: "var(--color-sage)", color: "#fff", label: "Trend" };
      default: return null;
    }
  };

  /* ── Mini sparkline path for the Predicted Guests preview ── */
  const guestsSparkPath = useMemo(() => {
    if (days.length === 0) return "";
    const pts = days.slice(0, 7);
    const max = Math.max(...pts.map((d) => d.guests));
    const min = Math.min(...pts.map((d) => d.guests));
    const range = max - min || 1;
    return pts
      .map((d, i) => {
        const x = (i / Math.max(1, pts.length - 1)) * 200;
        const y = 28 - ((d.guests - min) / range) * 24;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  }, [days]);

  /* ── EOD variance sparkline (positive consumption uplift = red, negative = green) ── */
  const eodSparkPath = useMemo(() => {
    if (days.length === 0) return "M0 14 L100 14";
    return days
      .slice(0, 7)
      .map((d, i) => {
        const x = (i / 6) * 100;
        const variance = d.baseline > 0 ? (d.guests - d.baseline) / d.baseline : 0;
        const y = Math.max(2, Math.min(26, 14 - variance * 30));
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  }, [days]);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      {/* ═══ Greeting ═══ */}
      <div className="flex items-end justify-between mb-5 mt-2">
        <div>
          <div className="eyebrow mb-1">{todayLabel}</div>
          <h1 className="display" style={{ fontSize: 38, margin: 0 }}>
            {greeting}, John.{" "}
            <span className="serif" style={{ color: "var(--color-ink-soft)", fontWeight: 500 }}>
               Here's service today.
            </span>
          </h1>
        </div>
        
      </div>

      {/* ═══ Top Row · 4 KPI cards ═══ */}
      <div className="grid grid-cols-12 gap-4">
        {/* Predicted Guests · dark hero, condensed */}
        <div
          className="col-span-3 card-dark p-5 flex flex-col"
          style={{ minHeight: 220, position: "relative", overflow: "hidden" }}
        >
          <div className="flex items-center justify-between">
            <div className="eyebrow" style={{ color: "#b4ab96" }}>Predicted guests</div>
            <button
              onClick={() => toggleCard("guests")}
              aria-label="Expand guest forecast"
              style={{ color: "#b4ab96", background: "transparent", border: "none", cursor: "pointer", padding: 4 }}
            >
              <ChevronExpand expanded={expandedCard === "guests"} />
            </button>
          </div>
          <div className="num" style={{ fontSize: 56, color: "#f4efe3", lineHeight: 1, marginTop: "auto" }}>
            <AnimatedNumber value={todayGuests} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="mono" style={{ fontSize: 11, color: "#b4ab96" }}>
              vs {todayBaseline} base · {todayGuests - todayBaseline >= 0 ? "+" : ""}
              {todayGuests - todayBaseline}
            </div>
            <span className="chip chip-accent">
              <Icon name={todayDelta >= 0 ? "up" : "down"} s={11} />
              <AnimatedNumber value={todayDelta} prefix={todayDelta > 0 ? "+" : ""} suffix="%" />
            </span>
          </div>
          <svg viewBox="0 0 200 32" style={{ width: "100%", height: 32, marginTop: 10 }}>
            <defs>
              <linearGradient id="guests-spark" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f4efe3" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#f4efe3" stopOpacity="0" />
              </linearGradient>
            </defs>
            {guestsSparkPath && (
              <>
                <path d={`${guestsSparkPath} L 200 32 L 0 32 Z`} fill="url(#guests-spark)" />
                <path d={guestsSparkPath} stroke="#f4efe3" strokeWidth="1.6" fill="none" />
              </>
            )}
          </svg>
        </div>

        {/* Critical SKUs */}
        <div
          className="col-span-3 card p-5 flex flex-col"
          style={{
            minHeight: 220,
            borderColor: criticalItems.length > 0 ? "var(--color-danger)" : "var(--color-line)",
          }}
        >
          <div className="eyebrow flex items-center justify-between">
            <span>Critical SKUs</span>
            <div className="flex items-center gap-2">
              <Icon name="alert" s={13} />
              <button
                onClick={() => toggleCard("critical")}
                aria-label="Expand critical SKUs"
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, color: "var(--color-ink-soft)" }}
              >
                <ChevronExpand expanded={expandedCard === "critical"} />
              </button>
            </div>
          </div>
          <div className="num" style={{ fontSize: 56, marginTop: "auto", color: "var(--color-danger)" }}>
            <AnimatedNumber value={criticalItems.length} />
          </div>
          <div style={{ fontSize: 12, color: "var(--color-ink-soft)", marginTop: 4 }}>
            {criticalItems.filter((i) => i.current_stock < i.reorder_point * 0.5).length} urgent
          </div>
          <svg viewBox="0 0 100 24" style={{ width: "100%", height: 24, marginTop: 10 }}>
            <path
              d="M0 12 L15 15 L30 10 L45 18 L60 8 L75 20 L100 22"
              fill="none"
              stroke="var(--color-danger)"
              strokeWidth="1.8"
            />
          </svg>
        </div>

        {/* Arriving · next 48h */}
        <div className="col-span-3 card p-5 flex flex-col" style={{ minHeight: 220 }}>
          <div className="eyebrow flex items-center justify-between">
            <span>Arriving · next 48h</span>
            <div className="flex items-center gap-2">
              <Icon name="truck" s={13} />
              <button
                onClick={() => toggleCard("arriving")}
                aria-label="Expand arriving shipments"
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, color: "var(--color-ink-soft)" }}
              >
                <ChevronExpand expanded={expandedCard === "arriving"} />
              </button>
            </div>
          </div>
          <div className="num" style={{ fontSize: 56, marginTop: "auto" }}>
            {arrivingCount > 0 ? <AnimatedNumber value={arrivingCount} /> : "—"}
          </div>
          <div style={{ fontSize: 12, color: "var(--color-ink-soft)", marginTop: 4 }}>On schedule</div>
          <svg viewBox="0 0 100 24" style={{ width: "100%", height: 24, marginTop: 10 }}>
            <path
              d="M0 18 L15 14 L30 16 L45 10 L60 12 L75 6 L100 8"
              fill="none"
              stroke="var(--color-sage)"
              strokeWidth="1.8"
            />
          </svg>
        </div>

        {/* EOD Stock Variation · NEW */}
        <div className="col-span-3 card p-5 flex flex-col" style={{ minHeight: 220 }}>
          <div className="eyebrow flex items-center justify-between">
            <span>EOD stock variance</span>
            <div className="flex items-center gap-2">
              <Icon name="trend" s={13} />
              <button
                onClick={() => toggleCard("eod")}
                aria-label="Expand EOD stock variance"
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, color: "var(--color-ink-soft)" }}
              >
                <ChevronExpand expanded={expandedCard === "eod"} />
              </button>
            </div>
          </div>
          <div
            className="num"
            style={{
              fontSize: 56,
              marginTop: "auto",
              color:
                compositeScore > 0
                  ? "var(--color-danger)"
                  : compositeScore < 0
                  ? "var(--color-sage)"
                  : "var(--color-ink)",
            }}
          >
            <AnimatedNumber value={compositeScore} prefix={compositeScore > 0 ? "+" : ""} suffix="%" />
          </div>
          <div style={{ fontSize: 12, color: "var(--color-ink-soft)", marginTop: 4 }}>
            <span className="num" style={{ fontSize: 13, color: "var(--color-ink)" }}>
              <AnimatedNumber value={skusBelowROPByEOD} />
            </span>{" "}
            SKUs → ROP by EOD
          </div>
          <svg viewBox="0 0 100 28" style={{ width: "100%", height: 28, marginTop: 10 }}>
            <line x1="0" x2="100" y1="14" y2="14" stroke="var(--color-line)" strokeDasharray="2 2" />
            <path d={eodSparkPath} fill="none" stroke="var(--color-accent)" strokeWidth="1.8" />
          </svg>
        </div>
      </div>

      {/* ═══ Conditional Expanded Detail Row ═══ */}
      {expandedCard && (
        <div className="card p-6 mt-4 fadein" style={{ minHeight: 360 }}>
          {expandedCard === "guests" && (
            <div>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="eyebrow mb-1">S.M.A.R.T forecast</div>
                  <div className="display" style={{ fontSize: 26 }}>Guest flow, next 14 days</div>
                  <div style={{ fontSize: 12, color: "var(--color-ink-soft)", marginTop: 4 }}>
                    Composite uplift model · <span className="mono">94.2%</span> accuracy (T-30)
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {["7D", "14D", "30D"].map((r) => (
                    <button
                      key={r}
                      className={"pill-btn " + (chartRange === r ? "active" : "")}
                      onClick={() => setChartRange(r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {days.length > 0 ? (
                <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: 240 }}>
                  {[0.25, 0.5, 0.75].map((p, i) => (
                    <line
                      key={i}
                      x1={chartPad}
                      x2={chartW - chartPad}
                      y1={chartPad + p * (chartH - chartPad * 2)}
                      y2={chartPad + p * (chartH - chartPad * 2)}
                      stroke="var(--color-line)"
                      strokeDasharray="2 4"
                    />
                  ))}
                  <path d={baselinePath} stroke="var(--color-mute)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                  <defs>
                    <linearGradient id="area-exp" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.68 0.17 45)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="oklch(0.68 0.17 45)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`${forecastPath} L ${xs(days.length - 1)} ${chartH - chartPad} L ${xs(0)} ${chartH - chartPad} Z`}
                    fill="url(#area-exp)"
                  />
                  <path d={forecastPath} stroke="var(--color-ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  {days.map((d, i) => (
                    <g key={i} onClick={() => setSelectedDayIndex(i)} style={{ cursor: "pointer" }}>
                      <circle
                        cx={xs(i)}
                        cy={ys(d.guests)}
                        r={safeIdx === i ? 5 : 3.5}
                        fill={safeIdx === i ? "var(--color-accent)" : "var(--color-ink)"}
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      {safeIdx === i && (
                        <g>
                          <line x1={xs(i)} x2={xs(i)} y1={chartPad} y2={chartH - chartPad} stroke="var(--color-accent)" strokeDasharray="3 3" />
                          <rect x={xs(i) - 36} y={ys(d.guests) - 34} width="72" height="22" rx="11" fill="var(--color-ink)" />
                          <text x={xs(i)} y={ys(d.guests) - 19} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">
                            {d.guests} guests
                          </text>
                        </g>
                      )}
                      <text
                        x={xs(i)}
                        y={chartH - 4}
                        textAnchor="middle"
                        fontSize="9"
                        fill={safeIdx === i ? "var(--color-ink)" : "var(--color-mute)"}
                        fontWeight={safeIdx === i ? 700 : 500}
                      >
                        {d.name}
                      </text>
                    </g>
                  ))}
                </svg>
              ) : (
                <div className="flex items-center justify-center" style={{ height: 240, color: "var(--color-mute)" }}>
                  <span className="mono" style={{ fontSize: 12 }}>Loading forecast data…</span>
                </div>
              )}

              <div className="flex items-center gap-6 mt-2 pt-3" style={{ borderTop: "1px solid var(--color-line)" }}>
                <div className="flex items-center gap-2">
                  <span style={{ width: 16, height: 2, background: "var(--color-ink)" }} />
                  <span style={{ fontSize: 11, color: "var(--color-ink-soft)" }}>Forecast</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ width: 16, height: 2, background: "var(--color-mute)", borderTop: "1px dashed var(--color-mute)" }} />
                  <span style={{ fontSize: 11, color: "var(--color-ink-soft)" }}>Historical baseline</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-accent)" }} />
                  <span style={{ fontSize: 11, color: "var(--color-ink-soft)" }}>Selected day</span>
                </div>
                {selectedDay && (
                  <div className="ml-auto mono" style={{ fontSize: 11, color: "var(--color-mute)" }}>
                    {selectedDay.name} · {selectedDay.guests} guests
                  </div>
                )}
              </div>
            </div>
          )}

          {expandedCard === "critical" && (
            <div>
              <div className="eyebrow mb-1">Critical SKUs · stock depth</div>
              <div className="display mb-5" style={{ fontSize: 22 }}>
                {criticalItems.length} items at or below reorder point
              </div>
              <div className="flex flex-col gap-3">
                {criticalItems.map((item, i) => {
                  const pct = Math.min(100, (item.current_stock / item.capacity) * 100);
                  const ropPct = Math.min(100, (item.reorder_point / item.capacity) * 100);
                  const isCritical = item.current_stock < item.reorder_point * 0.5;
                  const color = isCritical ? "var(--color-danger)" : "var(--color-accent)";
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</span>
                        <span className="mono" style={{ fontSize: 11, color: "var(--color-mute)" }}>
                          {item.current_stock?.toFixed(0)} / {item.capacity} · ROP {item.reorder_point}
                        </span>
                      </div>
                      <div
                        style={{
                          position: "relative",
                          height: 10,
                          borderRadius: 999,
                          background: "var(--color-cream)",
                          border: "1px solid var(--color-line)",
                          overflow: "hidden",
                        }}
                      >
                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: pct + "%", background: color }} />
                        <div style={{ position: "absolute", top: -3, bottom: -3, left: ropPct + "%", width: 2, background: "var(--color-ink)" }} />
                      </div>
                    </div>
                  );
                })}
                {criticalItems.length === 0 && (
                  <div style={{ color: "var(--color-mute)", fontSize: 12 }} className="mono">
                    All inventory levels healthy.
                  </div>
                )}
              </div>
            </div>
          )}

          {expandedCard === "arriving" && (
            <div>
              <div className="eyebrow mb-1">Inbound · next 48 hours</div>
              <div className="display mb-5" style={{ fontSize: 22 }}>
                <AnimatedNumber value={arrivingCount} /> shipments en route
              </div>
              <div className="flex flex-col gap-3">
                {orders
                  .filter((o) => o.status === "In Transit")
                  .slice(0, 6)
                  .map((o) => (
                    <div
                      key={o.id}
                      className="card-cream p-4 flex items-center gap-4"
                      style={{ borderRadius: 12 }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: "var(--color-paper)",
                          border: "1px solid var(--color-line)",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <Icon name="truck" s={16} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>
                          {o.supplier_name || `Supplier ${o.supplier_id}`}
                        </div>
                        <div className="mono" style={{ fontSize: 11, color: "var(--color-mute)" }}>
                          PO #{o.id}
                        </div>
                      </div>
                      <div className="num" style={{ fontSize: 13 }}>
                        {new Date(o.scheduled_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                      <div className="num" style={{ fontSize: 13 }}>${o.cost?.toFixed(2)}</div>
                      <span className="chip chip-sage" style={{ fontSize: 10 }}>Transit</span>
                    </div>
                  ))}
                {orders.filter((o) => o.status === "In Transit").length === 0 && (
                  <div style={{ color: "var(--color-mute)", fontSize: 12 }} className="mono">
                    No shipments currently in transit.
                  </div>
                )}
              </div>
            </div>
          )}

          {expandedCard === "eod" && (
            <div>
              <div className="eyebrow mb-1">End-of-day stock variance</div>
              <div className="display mb-1" style={{ fontSize: 22 }}>
                {compositeScore > 0 ? "+" : ""}{compositeScore}% projected uplift in consumption
              </div>
              <div style={{ fontSize: 12, color: "var(--color-ink-soft)", marginBottom: 16 }}>
                {skusBelowROPByEOD} SKUs projected to fall to or below reorder point by end of service.
              </div>
              {days.length > 0 ? (
                <svg viewBox="0 0 640 200" style={{ width: "100%", height: 220 }}>
                  {[0.25, 0.5, 0.75].map((p, i) => (
                    <line
                      key={i}
                      x1={20}
                      x2={620}
                      y1={20 + p * 160}
                      y2={20 + p * 160}
                      stroke="var(--color-line)"
                      strokeDasharray="2 4"
                    />
                  ))}
                  <line x1={20} x2={620} y1={100} y2={100} stroke="var(--color-mute)" strokeDasharray="4 4" />
                  <text x={24} y={96} fontSize="10" fill="var(--color-mute)" className="mono">baseline</text>
                  {(() => {
                    const slice = days.slice(0, 7);
                    const path = slice
                      .map((d, i) => {
                        const x = 20 + (i / Math.max(1, slice.length - 1)) * 600;
                        const variance = d.baseline > 0 ? (d.guests - d.baseline) / d.baseline : 0;
                        const y = Math.max(25, Math.min(175, 100 - variance * 200));
                        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
                      })
                      .join(" ");
                    return (
                      <>
                        <path d={path} stroke="var(--color-accent)" strokeWidth="2.5" fill="none" />
                        {slice.map((d, i) => {
                          const x = 20 + (i / Math.max(1, slice.length - 1)) * 600;
                          const variance = d.baseline > 0 ? (d.guests - d.baseline) / d.baseline : 0;
                          const y = Math.max(25, Math.min(175, 100 - variance * 200));
                          return (
                            <g key={i}>
                              <circle cx={x} cy={y} r={3.5} fill="var(--color-accent)" stroke="#fff" strokeWidth="2" />
                              <text x={x} y={195} textAnchor="middle" fontSize="10" fill="var(--color-mute)">
                                {d.name}
                              </text>
                            </g>
                          );
                        })}
                      </>
                    );
                  })()}
                </svg>
              ) : (
                <div className="flex items-center justify-center" style={{ height: 220, color: "var(--color-mute)" }}>
                  <span className="mono" style={{ fontSize: 12 }}>Loading variance data…</span>
                </div>
              )}
              <div className="flex items-center gap-6 mt-2 pt-3" style={{ borderTop: "1px solid var(--color-line)" }}>
                <div className="flex items-center gap-2">
                  <span style={{ width: 16, height: 2, background: "var(--color-accent)" }} />
                  <span style={{ fontSize: 11, color: "var(--color-ink-soft)" }}>Projected variance vs baseline</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ width: 16, height: 2, background: "var(--color-mute)", borderTop: "1px dashed var(--color-mute)" }} />
                  <span style={{ fontSize: 11, color: "var(--color-ink-soft)" }}>Normal consumption</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ Main content area ═══ */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Row 2 · Kitchen Calendar (Full width) */}
        <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="eyebrow mb-1">Kitchen calendar</div>
                <div className="display" style={{ fontSize: 24 }}>
                  {days.length > 0
                    ? `${days[0].date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${days[days.length - 1].date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · next two weeks`
                    : "Loading…"}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-ghost" style={{ padding: "8px 12px" }}>←</button>
                <button className="btn btn-ghost">This fortnight</button>
                <button className="btn btn-ghost" style={{ padding: "8px 12px" }}>→</button>
                <button className="btn btn-dark" onClick={() => setShowAddEvent(true)}>
                  <Icon name="plus" s={13} />
                  Add event
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2.5">
              {days.slice(0, 14).map((d, i) => {
                const isSel = safeIdx === i;
                const delta = d.guests - d.baseline;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDayIndex(i)}
                    className={"text-left fadein"}
                    style={{
                      background: isSel ? "var(--color-ink)" : i < 7 ? "var(--color-cream)" : "var(--color-paper)",
                      color: isSel ? "#f4efe3" : "var(--color-ink)",
                      borderRadius: 16,
                      padding: "12px 14px",
                      minHeight: 130,
                      border: "1px solid " + (isSel ? "var(--color-ink)" : "var(--color-line)"),
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      cursor: "pointer",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="eyebrow" style={{ color: isSel ? "#b4ab96" : "var(--color-mute)" }}>
                        {d.name.split(" ")[0]}
                      </span>
                      <span className="num" style={{ fontSize: 18, color: isSel ? "#fff" : "var(--color-ink)" }}>
                        {d.name.split(" ")[1]}
                      </span>
                    </div>
                    <div className="num" style={{ fontSize: 22, color: isSel ? "#fff" : "var(--color-ink)" }}>
                      {d.guests}
                    </div>
                    <div className="mono" style={{ fontSize: 10.5, color: isSel ? "#b4ab96" : "var(--color-ink-soft)" }}>
                      base {d.baseline} ·{" "}
                      <span
                        style={{
                          color:
                            delta >= 0
                              ? isSel
                                ? "oklch(0.82 0.16 150)"
                                : "var(--color-sage)"
                              : "var(--color-danger)",
                        }}
                      >
                        {delta > 0 ? "+" : ""}
                        {delta}
                      </span>
                    </div>
                    <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {d.tags.map((t, ti) => {
                        const s = tagStyle(t);
                        if (!s) return null;
                        return (
                          <span key={ti} className="chip" style={{ background: s.bg, color: s.color, padding: "2px 8px", fontSize: 10 }}>
                            {s.label}
                          </span>
                        );
                      })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        {/* ── SPLIT MAIN / RIGHT SIDEBAR ── */}
        <div className="grid grid-cols-12 gap-4">
          {/* ── MAIN COLUMN (8 cols) ── */}
          <div className="col-span-8 flex flex-col gap-4">
            {/* Row 3 · Critical Inventory (5/8) + Stock Health (3/8) */}
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-5 card p-6" style={{ minHeight: 460 }}>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-danger)", boxShadow: "0 0 0 4px var(--color-danger-soft)" }} />
                    <div className="eyebrow">Critical inventory</div>
                  </div>
                  <div className="display" style={{ fontSize: 22 }}>
                    {criticalItems.length} SKUs below reorder point
                  </div>
                  <div style={{ fontSize: 12, color: "var(--color-ink-soft)", marginTop: 2 }}>
                    Projected end-of-day depletion shown in solid bars
                  </div>
                </div>
                <a href="/inventory" className="btn btn-ghost" style={{ textDecoration: "none" }}>
                  View all <Icon name="arrow" s={13} />
                </a>
              </div>

              <div className="flex flex-col gap-3">
                {criticalItems.map((item, i) => {
                  const onHandPct = Math.min(100, (item.current_stock / item.capacity) * 100);
                  const eodStock = Math.max(0, item.current_stock - (item.daily_usage || 1));
                  const eodPct = Math.min(100, (eodStock / item.capacity) * 100);
                  const ropPct = (item.reorder_point / item.capacity) * 100;
                  const isCritical = item.current_stock < item.reorder_point * 0.5;
                  const color = isCritical ? "var(--color-danger)" : "var(--color-accent)";
                  return (
                    <div key={i} className="card-cream p-4" style={{ borderRadius: 16 }}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
                          <div style={{ fontSize: 11, color: "var(--color-ink-soft)" }}>{item.category} · supplier on file</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div style={{ textAlign: "right" }}>
                            <div className="mono" style={{ fontSize: 11, color: "var(--color-mute)" }}>On hand → EOD</div>
                            <div className="num" style={{ fontSize: 15 }}>
                              <span style={{ color }}>{item.current_stock.toFixed(0)}</span>
                              <span style={{ color: "var(--color-mute)", margin: "0 6px" }}>→</span>
                              <span style={{ color }}>{eodStock.toFixed(0)}</span>
                            </div>
                          </div>
                          <span className="chip" style={{ background: color, color: "#fff" }}>
                            {isCritical ? "Critical" : "Low"}
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          position: "relative",
                          height: 10,
                          borderRadius: 999,
                          background: "var(--color-paper)",
                          border: "1px solid var(--color-line)",
                          overflow: "hidden",
                        }}
                      >
                        <div className="hatch-light" style={{ position: "absolute", inset: 0, width: onHandPct + "%", background: color, opacity: 0.28 }} />
                        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: eodPct + "%", background: color }} />
                        <div style={{ position: "absolute", top: -3, bottom: -3, left: ropPct + "%", width: 2, background: "var(--color-ink)" }} />
                      </div>
                      <div className="flex items-center justify-between mt-2 mono" style={{ fontSize: 10.5, color: "var(--color-mute)" }}>
                        <span>0</span>
                        <span style={{ color: "var(--color-ink)" }}>ROP {item.reorder_point}</span>
                        <span>{item.capacity} cap</span>
                      </div>
                    </div>
                  );
                })}
                {criticalItems.length === 0 && (
                  <div className="card-cream p-6" style={{ borderRadius: 16, textAlign: "center", color: "var(--color-mute)" }}>
                    <div className="mono" style={{ fontSize: 12 }}>All inventory levels healthy</div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-3 card-cream p-6 flex flex-col" style={{ minHeight: 460 }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="eyebrow mb-1">Stock health</div>
                  <div className="display" style={{ fontSize: 20 }}>By category</div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--color-ink-soft)" }}>
                  {totalHealthy}/{totalItems}
                </div>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto scroll-hide pb-2" style={{ flex: 1, minHeight: 0 }}>
                {stockHealth.map((c, i) => {
                  const isExpanded = expandedCategory === c.name;
                  const catItems = inventory.filter(item => (c.name === "Dry goods" ? item.category === "Dry" : item.category === c.name));
                  return (
                    <div key={i} className="card p-3 flex-shrink-0" style={{ border: isExpanded ? "1px solid var(--color-ink)" : "1px solid var(--color-line)", borderRadius: 14 }}>
                      <button 
                        onClick={() => setExpandedCategory(isExpanded ? null : c.name)}
                        className="w-full bg-transparent border-none p-0 cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-ink)" }}>{c.name}</span>
                            <div className="mono" style={{ fontSize: 10.5, color: "var(--color-mute)", marginTop: 2 }}>
                              {c.count} healthy
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="num" style={{ fontSize: 14, color: c.pct >= 70 ? "var(--color-ink)" : c.color }}>{c.pct}%</span>
                            <span style={{ color: "var(--color-mute)", display: "flex" }}>
                              <ChevronExpand expanded={isExpanded} />
                            </span>
                          </div>
                        </div>
                        <div style={{ height: 6, borderRadius: 999, background: "var(--color-paper)", border: "1px solid var(--color-line)", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: c.pct + "%", background: c.color, borderRadius: 999 }} />
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="mt-4 pt-3 flex flex-col gap-2.5" style={{ borderTop: "1px dashed var(--color-line)" }}>
                          {catItems.map((item, idx) => {
                            const isCritical = item.current_stock <= item.reorder_point;
                            const pct = Math.max(0, Math.min(100, (item.current_stock / item.capacity) * 100));
                            return (
                              <div key={idx}>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span style={{ fontSize: 11.5, color: "var(--color-ink-2)" }}>{item.name}</span>
                                  <span className="mono" style={{ fontSize: 10, color: isCritical ? "var(--color-danger)" : "var(--color-mute)" }}>
                                    {Math.round(item.current_stock)} / {item.capacity}
                                  </span>
                                </div>
                                <div style={{ height: 6, borderRadius: 999, background: "var(--color-cream)", overflow: "hidden" }}>
                                  <div style={{ height: "100%", width: pct + "%", background: isCritical ? "var(--color-danger)" : "var(--color-sage)" }} />
                                </div>
                              </div>
                            );
                          })}
                          {catItems.length === 0 && (
                            <div className="mono text-center" style={{ fontSize: 10, color: "var(--color-mute)", padding: "10px 0" }}>No items found</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 4 · Inbound Deliveries */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="eyebrow mb-1">Inbound shipments</div>
                <div className="display" style={{ fontSize: 22 }}>Next deliveries</div>
              </div>
              <div className="flex gap-1.5">
                <button className={"pill-btn " + (subTab === "transit" ? "active" : "")} onClick={() => setSubTab("transit")}>
                  In transit
                </button>
                <button className={"pill-btn " + (subTab === "scheduled" ? "active" : "")} onClick={() => setSubTab("scheduled")}>
                  Scheduled
                </button>
                <button className={"pill-btn " + (subTab === "drafting" ? "active" : "")} onClick={() => setSubTab("drafting")}>
                  Drafting
                </button>
              </div>
            </div>
            <div>
              <div
                className="grid"
                style={{
                  gridTemplateColumns: "1.6fr 1fr 1fr 0.8fr",
                  gap: 12,
                  padding: "10px 12px",
                  fontSize: 10.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-mute)",
                  fontWeight: 600,
                  borderBottom: "1px solid var(--color-line)",
                }}
              >
                <span>Supplier</span>
                <span>ETA</span>
                <span>Cost</span>
                <span>Status</span>
              </div>
              {filteredOrders.map((o, i) => (
                <div
                  key={o.id}
                  className="grid items-center"
                  style={{
                    gridTemplateColumns: "1.6fr 1fr 1fr 0.8fr",
                    gap: 12,
                    padding: "14px 12px",
                    borderBottom: i < filteredOrders.length - 1 ? "1px solid var(--color-line)" : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: "var(--color-cream)",
                        border: "1px solid var(--color-line)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon name="truck" s={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{o.supplier_name || `Supplier ${o.supplier_id}`}</div>
                      <div className="mono" style={{ fontSize: 10.5, color: "var(--color-mute)" }}>PO #{o.id}</div>
                    </div>
                  </div>
                  <div className="mono" style={{ fontSize: 12 }}>
                    {new Date(o.scheduled_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                  <div className="num" style={{ fontSize: 14 }}>${o.cost?.toFixed(2)}</div>
                  <div>
                    {o.status === "In Transit" && <span className="chip chip-sage" style={{ fontSize: 10 }}>Transit</span>}
                    {o.status === "Confirmed" && <span className="chip chip-ghost" style={{ fontSize: 10 }}>Sched</span>}
                    {o.status === "Pending" && (
                      <span className="chip" style={{ background: "var(--color-accent-soft)", color: "var(--color-accent)", fontSize: 10, border: "1px solid var(--color-accent)" }}>
                        Draft
                      </span>
                    )}
                    {o.status === "Delayed" && <span className="chip chip-danger" style={{ fontSize: 10 }}>Delayed</span>}
                  </div>
                </div>
              ))}
              {filteredOrders.length === 0 && (
                <div style={{ padding: 24, textAlign: "center", color: "var(--color-mute)", fontSize: 12 }} className="mono">
                  No orders in this category
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDEBAR (4 cols, persistent) ── */}
        <div className="col-span-4 flex flex-col gap-4">
          {/* Influence Factors */}
          <div className="card p-6" style={{ display: "flex", flexDirection: "column" }}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="eyebrow mb-1">Influence factors</div>
                <div className="display" style={{ fontSize: 22 }}>
                  {selectedDay?.name || "—"} · analysis
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="eyebrow" style={{ fontSize: 9 }}>Composite</div>
                <div
                  className="num"
                  style={{ fontSize: 32, color: compositeScore > 0 ? "var(--color-sage)" : compositeScore < 0 ? "var(--color-danger)" : "var(--color-mute)" }}
                >
                  {compositeScore > 0 ? "+" : ""}{compositeScore}%
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {influences.map((f, i) => (
                <div key={i} className="card-cream p-3 flex items-center gap-3" style={{ borderRadius: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "var(--color-paper)",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--color-ink)",
                      border: "1px solid var(--color-line)",
                    }}
                  >
                    <Icon name={f.icon} s={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: "var(--color-ink-soft)" }}>{f.desc}</div>
                  </div>
                  {!f.isBaseline && (
                    <>
                      <div
                        style={{
                          width: 60,
                          height: 6,
                          borderRadius: 3,
                          background: "var(--color-line)",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: 0,
                            bottom: 0,
                            width: Math.abs(f.score) * 1.2,
                            background: f.score >= 0 ? "var(--color-sage)" : "var(--color-danger)",
                            transform: f.score < 0 ? "translateX(-100%)" : "none",
                          }}
                        />
                      </div>
                      <div
                        className="num"
                        style={{
                          fontSize: 13,
                          width: 40,
                          textAlign: "right",
                          color: f.score >= 0 ? "var(--color-sage)" : "var(--color-danger)",
                        }}
                      >
                        {f.score > 0 ? "+" : ""}{f.score}%
                      </div>
                    </>
                  )}
                  {f.isBaseline && (
                    <div className="num" style={{ fontSize: 13, color: "var(--color-ink)", textAlign: "right", width: 56 }}>
                      {f.score} ppl
                    </div>
                  )}
                </div>
              ))}
            </div>

            <a className="btn btn-dark mt-4" style={{ justifyContent: "center", textDecoration: "none" }} href="/analytics">
              See full breakdown <Icon name="arrow" s={13} />
            </a>
          </div>

          {/* SMART Suggestion */}
          <div className="card-dark p-6" style={{ position: "relative", overflow: "hidden" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="chip chip-accent">
                <Icon name="spark" s={10} />
                S.M.A.R.T suggestion
              </span>
              <span className="mono" style={{ fontSize: 10.5, color: "#b4ab96" }}>
                Awaits your OK
              </span>
            </div>
            <div className="display" style={{ fontSize: 20, color: "#f4efe3", marginBottom: 8, letterSpacing: "-0.03em" }}>
              {criticalItems.length > 0
                ? `Draft a supplemental ${criticalItems[0].name} order to avoid service gap.`
                : "All inventory levels are healthy — no action needed."}
            </div>
            <div style={{ fontSize: 12, color: "#b4ab96", lineHeight: 1.5, marginBottom: 14 }}>
              {criticalItems.length > 0
                ? `Current ${criticalItems[0].name} on-hand (${criticalItems[0].current_stock.toFixed(0)}) falls below ROP (${criticalItems[0].reorder_point}) by end of service.`
                : "S.M.A.R.T monitoring all stock levels against forecast demand."}
            </div>
            {criticalItems.length > 0 && (
              <>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div style={{ background: "#252525", borderRadius: 12, padding: "10px 12px" }}>
                    <div className="eyebrow" style={{ color: "#7a746a", fontSize: 9 }}>Recommend</div>
                    <div className="num" style={{ fontSize: 20, color: "#f4efe3" }}>
                      +{Math.ceil(criticalItems[0].reorder_point - criticalItems[0].current_stock + (criticalItems[0].daily_usage || 1) * 2)}
                    </div>
                  </div>
                  <div style={{ background: "#252525", borderRadius: 12, padding: "10px 12px" }}>
                    <div className="eyebrow" style={{ color: "#7a746a", fontSize: 9 }}>Supplier</div>
                    <div style={{ fontSize: 12, color: "#f4efe3", fontWeight: 600, marginTop: 4 }}>
                      {criticalItems[0].supplier_name || "On file"}
                    </div>
                  </div>
                  <div style={{ background: "#252525", borderRadius: 12, padding: "10px 12px" }}>
                    <div className="eyebrow" style={{ color: "#7a746a", fontSize: 9 }}>Est. cost</div>
                    <div className="num" style={{ fontSize: 20, color: "#f4efe3" }}>
                      ${(criticalItems[0].unit_cost * Math.ceil(criticalItems[0].reorder_point - criticalItems[0].current_stock + (criticalItems[0].daily_usage || 1) * 2)).toFixed(0)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-accent" style={{ flex: 1, justifyContent: "center" }}>Draft order</button>
                  <button className="btn" style={{ flex: 1, justifyContent: "center", background: "transparent", border: "1px solid #444", color: "#f4efe3" }}>
                    Adjust
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Agent Log */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="eyebrow mb-1">Activity · today</div>
                <div className="display" style={{ fontSize: 20 }}>Agent log</div>
              </div>
              <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 11 }}>All</button>
            </div>
            <div className="flex flex-col gap-0" style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1, background: "var(--color-line)" }} />
              {[
                { t: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), msg: "Dashboard loaded — all metrics refreshed", tag: "sync" },
                { t: "—", msg: `${criticalItems.length} items at critical stock levels`, tag: "alert" },
                { t: "—", msg: "Weather API synced — forecast active", tag: "sync" },
                { t: "—", msg: "Demand pipeline complete — 14 day forecast ready", tag: "event" },
                { t: "—", msg: "POS sync complete", tag: "sync" },
              ].map((a, i) => {
                const dotColor = { auto: "var(--color-accent)", alert: "var(--color-danger)", sync: "var(--color-mute)", event: "oklch(0.65 0.15 280)" }[a.tag] || "var(--color-ink)";
                return (
                  <div key={i} className="flex gap-3 py-2.5" style={{ position: "relative" }}>
                    <div
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: 999,
                        background: dotColor,
                        border: "2px solid var(--color-paper)",
                        boxShadow: "0 0 0 1px var(--color-line)",
                        marginTop: 4,
                        flexShrink: 0,
                        zIndex: 1,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, color: "var(--color-ink-2)", lineHeight: 1.45 }}>{a.msg}</div>
                      <div className="mono" style={{ fontSize: 10.5, color: "var(--color-mute)", marginTop: 2 }}>{a.t}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* ═══ Footer ═══ */}
      <footer
        className="flex items-center justify-between mt-8 pt-5"
        style={{ borderTop: "1px solid var(--color-line)", color: "var(--color-mute)", fontSize: 11 }}
      >
        <span className="mono">ShelfSmart · S.M.A.R.T v2.0 · deterministic rules engine</span>
        <span className="mono">Composite uplift · weather · events · trends · promos · POS</span>
        <span className="mono">Last sync {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} UTC</span>
      </footer>

      {/* ═══ Add Event Modal ═══ */}
      {showAddEvent && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[100] p-6"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="card p-8" style={{ width: "100%", maxWidth: 440 }}>
            <div className="flex justify-between items-center mb-6" style={{ borderBottom: "1px solid var(--color-line)", paddingBottom: 16 }}>
              <div className="display" style={{ fontSize: 20 }}>Schedule new event</div>
              <button onClick={() => setShowAddEvent(false)} style={{ color: "var(--color-mute)" }}>
                <Icon name="plus" s={18} stroke={2} />
              </button>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                if (eventType === "Promo") {
                  await fetch("/api/promotions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: eventLabel,
                      start_date: eventDate,
                      end_date: eventEndDate || eventDate,
                      channel: "instore",
                      daily_spend: 0,
                      estimated_reach: 2000,
                      adstock_decay_rate: 0.6,
                      discount_percentage: parseFloat(eventDiscount) || 0,
                    }),
                  });
                }
                setShowAddEvent(false);
              }}
            >
              <div>
                <div className="eyebrow mb-2">Event Type</div>
                <div className="grid grid-cols-3 gap-2">
                  {["Delivery", "Promo", "Local Event"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEventType(type)}
                      className={"pill-btn " + (eventType === type ? "active" : "")}
                      style={{ textAlign: "center" }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="eyebrow mb-2">Event Label</div>
                <input
                  className="input"
                  type="text"
                  value={eventLabel}
                  onChange={(e) => setEventLabel(e.target.value)}
                  placeholder="e.g. 20% Off Wine Pairing"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="eyebrow mb-2">Start Date</div>
                  <input className="input" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                </div>
                <div>
                  <div className="eyebrow mb-2">End Date</div>
                  <input className="input" type="date" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} required />
                </div>
              </div>

              {eventType === "Promo" && (
                <div>
                  <div className="eyebrow mb-2">Discount Percentage (%)</div>
                  <input className="input" type="number" min="0" max="100" value={eventDiscount} onChange={(e) => setEventDiscount(e.target.value)} />
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <button type="button" onClick={() => setShowAddEvent(false)} className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-dark" style={{ flex: 1, justifyContent: "center" }}>
                  Create {eventType}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

}

function InventoryInner() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedSku, setExpandedSku] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(mockInventory.map((item) => item.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredInventory = useMemo(() => {
    if (activeCategory === "All") return mockInventory;
    return mockInventory.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const gridColumns = "2.2fr 2.6fr 0.8fr 0.9fr 0.8fr 0.8fr";

  const statusFor = (item: any) => {
    if (item.current_stock <= item.reorder_point) {
      return { label: "Critical", className: "chip chip-danger" };
    }
    if (item.current_stock <= item.reorder_point * 1.5) {
      return { label: "Medium", className: "chip chip-accent" };
    }
    return { label: "Healthy", className: "chip chip-sage" };
  };

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div className="flex items-end justify-between mb-5 mt-2">
        <div>
          <div className="eyebrow mb-1">Inventory</div>
          <div className="display" style={{ fontSize: 30 }}>Inventory ledger</div>
          <div style={{ fontSize: 12, color: "var(--color-ink-soft)", marginTop: 4 }}>
            Real-time stock depth with reorder projections.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost" style={{ padding: "8px 12px" }}>
            <Icon name="upload" s={13} />
            Export
          </button>
          <button className="btn btn-dark">
            <Icon name="plus" s={13} />
            New PO
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={"pill-btn " + (activeCategory === cat ? "active" : "")}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="card p-5">
        <div
          className="grid"
          style={{
            gridTemplateColumns: gridColumns,
            gap: 12,
            padding: "10px 12px",
            fontSize: 10.5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-mute)",
            fontWeight: 600,
            borderBottom: "1px solid var(--color-line)",
          }}
        >
          <span>Item</span>
          <span>Stock / capacity</span>
          <span>ROP</span>
          <span>Daily use</span>
          <span>Days left</span>
          <span>Status</span>
        </div>

        {filteredInventory.map((item) => {
          const onHandPct = Math.min(100, (item.current_stock / item.capacity) * 100);
          const eodStock = Math.max(0, item.current_stock - (item.daily_usage || 0));
          const eodPct = Math.min(100, (eodStock / item.capacity) * 100);
          const ropPct = Math.min(100, (item.reorder_point / item.capacity) * 100);
          const daysLeft = item.daily_usage ? item.current_stock / item.daily_usage : null;
          const status = statusFor(item);
          const isExpanded = expandedSku === item.sku;
          const consumptionSeries = Array.from({ length: 7 }).map((_, idx) => {
            const jitter = Math.sin(idx + item.current_stock) * 0.6;
            return Math.max(0.5, item.daily_usage * (0.9 + idx * 0.04) + jitter);
          });
          const exhaustionSeries = Array.from({ length: 7 }).map((_, idx) =>
            Math.max(0, item.current_stock - item.daily_usage * idx)
          );
          const consumptionPath = buildSparkPath(consumptionSeries, 220, 70);
          const exhaustionPath = buildSparkPath(exhaustionSeries, 220, 70);

          return (
            <div key={item.sku} style={{ padding: "8px 0" }}>
              <button
                type="button"
                onClick={() => setExpandedSku(isExpanded ? null : item.sku)}
                className="w-full"
                style={{
                  display: "grid",
                  gridTemplateColumns: gridColumns,
                  gap: 12,
                  alignItems: "center",
                  padding: "10px 12px",
                  borderRadius: 14,
                  border: "1px solid " + (isExpanded ? "var(--color-ink)" : "transparent"),
                  background: isExpanded ? "var(--color-cream)" : "transparent",
                  textAlign: "left",
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--color-mute)" }}>
                    {item.sku} · {item.supplier_name}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="mono" style={{ fontSize: 10, color: "var(--color-mute)" }}>
                      {item.current_stock} / {item.capacity} {item.uom}
                    </span>
                    <span className="mono" style={{ fontSize: 10, color: "var(--color-ink-soft)" }}>
                      EOD {eodStock.toFixed(1)}
                    </span>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      height: 8,
                      borderRadius: 999,
                      background: "var(--color-paper)",
                      border: "1px solid var(--color-line)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="hatch-light"
                      style={{ position: "absolute", inset: 0, width: onHandPct + "%", background: "var(--color-sage)", opacity: 0.25 }}
                    />
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: eodPct + "%", background: "var(--color-sage)" }} />
                    <div style={{ position: "absolute", top: -3, bottom: -3, left: ropPct + "%", width: 2, background: "var(--color-ink)" }} />
                  </div>
                </div>
                <div className="mono" style={{ fontSize: 12 }}>{item.reorder_point} {item.uom}</div>
                <div className="mono" style={{ fontSize: 12 }}>{item.daily_usage} {item.uom}/day</div>
                <div className="mono" style={{ fontSize: 12 }}>
                  {daysLeft ? `${daysLeft.toFixed(1)} d` : "n/a"}
                </div>
                <div className="flex items-center gap-2">
                  <span className={status.className} style={{ fontSize: 10 }}>{status.label}</span>
                  <span style={{ color: "var(--color-mute)" }}>
                    <ChevronExpand expanded={isExpanded} />
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="card-cream p-4 mt-3" style={{ borderRadius: 14 }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="eyebrow mb-2">Consumption pace</div>
                      <svg viewBox="0 0 220 70" style={{ width: "100%", height: 70 }}>
                        <path d={consumptionPath} stroke="var(--color-accent)" strokeWidth="2" fill="none" />
                        <path d={`${consumptionPath} L 220 70 L 0 70 Z`} fill="var(--color-accent-soft)" />
                      </svg>
                      <div className="mono" style={{ fontSize: 10, color: "var(--color-mute)" }}>
                        Avg {item.daily_usage} {item.uom} per day
                      </div>
                    </div>
                    <div>
                      <div className="eyebrow mb-2">Projected exhaustion</div>
                      <svg viewBox="0 0 220 70" style={{ width: "100%", height: 70 }}>
                        <path d={exhaustionPath} stroke="var(--color-danger)" strokeWidth="2" fill="none" />
                        <path d={`${exhaustionPath} L 220 70 L 0 70 Z`} fill="var(--color-danger-soft)" />
                      </svg>
                      <div className="mono" style={{ fontSize: 10, color: "var(--color-mute)" }}>
                        {daysLeft ? `${daysLeft.toFixed(1)} days to zero` : "No depletion forecast"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filteredInventory.length === 0 && (
          <div className="mono" style={{ fontSize: 12, color: "var(--color-mute)", padding: "18px 12px" }}>
            No inventory found for this category.
          </div>
        )}
      </div>
    </div>
  );
}

function SuppliersInner() {
  const todayKey = new Date().toDateString();
  const arrivingToday = mockOrders.filter((o) => new Date(o.scheduled_date).toDateString() === todayKey).length;
  const inTransit = mockOrders.filter((o) => o.status === "In Transit").length;
  const pending = mockOrders.filter((o) => o.status === "Pending").length;
  const avgOnTime = Math.round(
    mockSuppliers.reduce((sum, s) => sum + s.on_time_pct, 0) / Math.max(1, mockSuppliers.length)
  );

  const kpis = [
    { label: "In transit", value: inTransit, note: "shipments live", icon: "truck" },
    { label: "Arriving today", value: arrivingToday, note: "scheduled drops", icon: "clock" },
    { label: "Pending", value: pending, note: "needs approval", icon: "alert" },
    { label: "Delivery scheduler", value: 3, note: "slots open", icon: "cal" },
  ];

  const gridColumns = "2.2fr 1fr 1fr 1fr 0.8fr";

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div className="flex items-end justify-between mb-5 mt-2">
        <div>
          <div className="eyebrow mb-1">Suppliers</div>
          <div className="display" style={{ fontSize: 30 }}>Vendor network</div>
          <div style={{ fontSize: 12, color: "var(--color-ink-soft)", marginTop: 4 }}>
            Real-time reliability and inbound coverage.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost">
            <Icon name="filter" s={13} />
            Filters
          </button>
          <button className="btn btn-dark">
            <Icon name="plus" s={13} />
            Add supplier
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="card p-4" style={{ minHeight: 120 }}>
            <div className="flex items-center justify-between">
              <div className="eyebrow">{kpi.label}</div>
              <Icon name={kpi.icon} s={14} />
            </div>
            <div className="num" style={{ fontSize: 32, marginTop: 8 }}>
              <AnimatedNumber value={kpi.value} />
            </div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--color-mute)" }}>{kpi.note}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="eyebrow mb-1">Supplier registry</div>
              <div className="display" style={{ fontSize: 22 }}>Active vendors</div>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--color-ink-soft)" }}>
              Avg on-time {avgOnTime}%
            </div>
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: gridColumns,
              gap: 12,
              padding: "10px 12px",
              fontSize: 10.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-mute)",
              fontWeight: 600,
              borderBottom: "1px solid var(--color-line)",
            }}
          >
            <span>Supplier</span>
            <span>Lead time</span>
            <span>On-time</span>
            <span>Spend</span>
            <span>Status</span>
          </div>
          {mockSuppliers.map((supplier, i) => {
            const perfColor = supplier.on_time_pct >= 92
              ? "var(--color-sage)"
              : supplier.on_time_pct >= 85
              ? "var(--color-accent)"
              : "var(--color-danger)";
            const statusClass = supplier.status === "Preferred"
              ? "chip chip-sage"
              : supplier.status === "Watch"
              ? "chip chip-ghost"
              : "chip chip-danger";
            return (
              <div
                key={supplier.name}
                className="grid items-center"
                style={{
                  gridTemplateColumns: gridColumns,
                  gap: 12,
                  padding: "14px 12px",
                  borderBottom: i < mockSuppliers.length - 1 ? "1px solid var(--color-line)" : "none",
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{supplier.name}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--color-mute)" }}>
                    {supplier.category} · {supplier.contact}
                  </div>
                </div>
                <div className="mono" style={{ fontSize: 12 }}>{supplier.lead_time_days} days</div>
                <div className="flex items-center gap-2">
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: perfColor }} />
                  <span className="mono" style={{ fontSize: 12, color: perfColor }}>{supplier.on_time_pct}%</span>
                </div>
                <div className="mono" style={{ fontSize: 12 }}>${supplier.spend.toLocaleString()}</div>
                <div>
                  <span className={statusClass} style={{ fontSize: 10 }}>{supplier.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="card p-5">
            <div className="eyebrow mb-1">Market intelligence</div>
            <div className="display" style={{ fontSize: 20 }}>Arbitrage watch</div>
            <div className="flex flex-col gap-3 mt-4">
              {mockMarketIntel.map((item) => {
                const deltaColor = item.delta <= 0 ? "var(--color-sage)" : "var(--color-danger)";
                return (
                  <div key={item.item} className="card-cream p-4" style={{ borderRadius: 14 }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{item.item}</div>
                        <div className="mono" style={{ fontSize: 10.5, color: "var(--color-mute)", marginTop: 4 }}>
                          {item.note}
                        </div>
                      </div>
                      <div className="num" style={{ fontSize: 16, color: deltaColor }}>
                        {item.delta > 0 ? "+" : ""}{item.delta}%
                      </div>
                    </div>
                    <span className="chip chip-ghost" style={{ fontSize: 10, marginTop: 8 }}>{item.action}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-cream p-5" style={{ borderRadius: 18 }}>
            <div className="eyebrow mb-1">Supplier scorecard</div>
            <div className="display" style={{ fontSize: 20 }}>Reliability index</div>
            <div className="num" style={{ fontSize: 34, marginTop: 8 }}>
              <AnimatedNumber value={avgOnTime} suffix="%" />
            </div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--color-mute)" }}>
              Based on last 30 inbound shipments
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {mockSuppliers.filter((s) => s.status !== "Preferred").map((s) => (
                <div key={s.name} className="flex items-center justify-between" style={{ fontSize: 12 }}>
                  <span>{s.name}</span>
                  <span className="mono" style={{ color: "var(--color-mute)" }}>{s.on_time_pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsInner() {
  const demandSlice = mockDemandData.slice(0, 7);
  const focusDay = demandSlice[0];
  const stackKeys = [
    { key: "historicalBaseline", label: "Baseline", color: "var(--color-ink)", opacity: 0.18 },
    { key: "weather", label: "Weather", color: "var(--color-sage)", opacity: 0.85 },
    { key: "events", label: "Events", color: "var(--color-accent)", opacity: 0.9 },
    { key: "promos", label: "Promos", color: "var(--color-danger)", opacity: 0.85 },
    { key: "trends", label: "Trends", color: "var(--color-ink-2)", opacity: 0.55 },
  ];

  const totals = demandSlice.map((d) =>
    stackKeys.reduce((sum, key) => sum + (d as any)[key.key], 0)
  );
  const maxTotal = Math.max(1, ...totals);
  const chartW = 640;
  const chartH = 190;
  const chartPad = 16;
  const barGap = 16;
  const barW = (chartW - barGap * (demandSlice.length + 1)) / Math.max(1, demandSlice.length);

  const velocitySeries = mockDemandData.slice(0, 10).map((d) => d.predictedCustomers);
  const velocityW = 640;
  const velocityH = 160;
  const velocityPad = 16;
  const velocityMax = Math.max(...velocitySeries, 1);
  const velocityMin = Math.min(...velocitySeries, 0);
  const velocityRange = velocityMax - velocityMin || 1;
  const velocityX = (i: number) => velocityPad + (i / Math.max(1, velocitySeries.length - 1)) * (velocityW - velocityPad * 2);
  const velocityY = (v: number) => velocityH - velocityPad - ((v - velocityMin) / velocityRange) * (velocityH - velocityPad * 2);
  const velocityPath = velocitySeries
    .map((v, i) => {
      const x = velocityX(i);
      const y = velocityY(v);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  const influenceCards = focusDay
    ? [
        {
          name: "Foot traffic",
          value: `${focusDay.historicalBaseline} base`,
          icon: "foot",
          meta: "Baseline driver",
        },
        {
          name: "Weather",
          value: `${focusDay.weatherDetail?.rawTemp ?? 72}F`,
          icon: "sun",
          meta: `Impact ${focusDay.weather > 0 ? "+" : ""}${focusDay.weather}%`,
        },
        {
          name: "Events",
          value: focusDay.eventDetail?.activeEvents?.[0]?.name || "No major events",
          icon: "spark",
          meta: `Impact ${focusDay.events > 0 ? "+" : ""}${focusDay.events}%`,
        },
        {
          name: "Promos",
          value: focusDay.promoDetail?.activePromos?.[0]?.name || "No campaign",
          icon: "tag",
          meta: `Impact ${focusDay.promos > 0 ? "+" : ""}${focusDay.promos}%`,
        },
        {
          name: "Trends",
          value: focusDay.trendDetail?.trendingItems?.[0]?.name || "Stable",
          icon: "trend",
          meta: `Impact ${focusDay.trends > 0 ? "+" : ""}${focusDay.trends}%`,
        },
      ]
    : [];

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div className="flex items-end justify-between mb-5 mt-2">
        <div>
          <div className="eyebrow mb-1">Analytics</div>
          <div className="display" style={{ fontSize: 30 }}>Demand intelligence</div>
          <div style={{ fontSize: 12, color: "var(--color-ink-soft)", marginTop: 4 }}>
            Live influence breakdown across the next 14 days.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="chip chip-sage" style={{ fontSize: 10 }}>Confidence 94%</span>
          <button className="btn btn-ghost">
            <Icon name="upload" s={13} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="eyebrow mb-1">Influence breakdown</div>
              <div className="display" style={{ fontSize: 22 }}>Stacked impact model</div>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--color-mute)" }}>
              Next 7 days
            </div>
          </div>
          <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: 220 }}>
            {demandSlice.map((day, i) => {
              const total = totals[i] || 1;
              const scale = (chartH - chartPad * 2) / maxTotal;
              const x = barGap + i * (barW + barGap);
              let y = chartH - chartPad;
              return (
                <g key={day.date}>
                  {stackKeys.map((key) => {
                    const value = (day as any)[key.key];
                    const h = Math.max(1, value * scale);
                    y -= h;
                    return (
                      <rect
                        key={key.key}
                        x={x}
                        y={y}
                        width={barW}
                        height={h}
                        rx={4}
                        fill={key.color}
                        fillOpacity={key.opacity}
                      />
                    );
                  })}
                  <text x={x + barW / 2} y={chartH - 2} textAnchor="middle" fontSize="9" fill="var(--color-mute)">
                    {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="flex flex-wrap gap-3 mt-3">
            {stackKeys.map((key) => (
              <div key={key.key} className="flex items-center gap-2" style={{ fontSize: 11, color: "var(--color-ink-soft)" }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: key.color, opacity: key.opacity }} />
                {key.label}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-5 card p-6">
          <div className="eyebrow mb-1">Influence detail</div>
          <div className="display" style={{ fontSize: 22 }}>Drivers for today</div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {influenceCards.map((card) => (
              <div key={card.name} className="card-cream p-4" style={{ borderRadius: 14 }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="eyebrow" style={{ fontSize: 9 }}>{card.name}</div>
                  <Icon name={card.icon} s={14} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{card.value}</div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--color-mute)" }}>
                  {card.meta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="eyebrow mb-1">Consumption velocity</div>
            <div className="display" style={{ fontSize: 22 }}>Guest pace projection</div>
          </div>
          <span className="chip chip-ghost" style={{ fontSize: 10 }}>Today marker</span>
        </div>
        <svg viewBox={`0 0 ${velocityW} ${velocityH}`} style={{ width: "100%", height: 200 }}>
          <path d={velocityPath} stroke="var(--color-ink)" strokeWidth="2.5" fill="none" />
          {velocitySeries.map((v, i) => (
            <circle key={i} cx={velocityX(i)} cy={velocityY(v)} r={i === 0 ? 4.5 : 3} fill={i === 0 ? "var(--color-accent)" : "var(--color-ink)"} />
          ))}
          <line x1={velocityX(0)} x2={velocityX(0)} y1={velocityPad} y2={velocityH - velocityPad} stroke="var(--color-accent)" strokeDasharray="4 4" />
          <text x={velocityX(0) + 10} y={velocityPad + 12} fontSize="10" fill="var(--color-accent)">
            Today
          </text>
        </svg>
      </div>
    </div>
  );
}

function SettingsInner() {
  const integrations = [
    { name: "Toast", status: "Connected", desc: "POS sync every 15 min", icon: "cart" },
    { name: "Clover", status: "Disconnected", desc: "Credentials required", icon: "qr" },
    { name: "Sysco", status: "Connected", desc: "Catalog + invoices", icon: "factory" },
    { name: "DoorDash", status: "Connected", desc: "Order volume feed", icon: "truck" },
  ];

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div className="flex items-end justify-between mb-5 mt-2">
        <div>
          <div className="eyebrow mb-1">Settings</div>
          <div className="display" style={{ fontSize: 30 }}>Workspace control</div>
          <div style={{ fontSize: 12, color: "var(--color-ink-soft)", marginTop: 4 }}>
            Configure company details, integrations, and API access.
          </div>
        </div>
        <button className="btn btn-dark">
          <Icon name="check" s={13} />
          Save changes
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 flex flex-col gap-4">
          <div className="card p-6">
            <div className="eyebrow mb-1">General</div>
            <div className="display" style={{ fontSize: 22 }}>Company profile</div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="eyebrow mb-2">Company name</div>
                <input className="input" defaultValue="North Ridge Bistro" />
              </div>
              <div>
                <div className="eyebrow mb-2">Primary contact</div>
                <input className="input" defaultValue="ops@northridge.com" />
              </div>
              <div>
                <div className="eyebrow mb-2">Street address</div>
                <input className="input" defaultValue="1280 Market Street" />
              </div>
              <div>
                <div className="eyebrow mb-2">Suite</div>
                <input className="input" defaultValue="Suite 402" />
              </div>
              <div>
                <div className="eyebrow mb-2">City</div>
                <input className="input" defaultValue="San Francisco" />
              </div>
              <div>
                <div className="eyebrow mb-2">Timezone</div>
                <input className="input" defaultValue="Pacific (GMT-8)" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="eyebrow mb-1">API keys</div>
            <div className="display" style={{ fontSize: 22 }}>Access credentials</div>
            <div className="card-cream p-4 mt-4" style={{ borderRadius: 14 }}>
              <div className="eyebrow" style={{ fontSize: 9 }}>Production key</div>
              <div className="mono" style={{ fontSize: 12, marginTop: 6 }}>sk_live_2f18************************</div>
              <div className="flex items-center gap-2 mt-3">
                <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 11 }}>Copy</button>
                <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 11 }}>Rotate</button>
              </div>
            </div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--color-mute)", marginTop: 8 }}>
              Last rotated 12 days ago · 3 active keys
            </div>
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-4">
          <div className="card p-6">
            <div className="eyebrow mb-1">Integrations</div>
            <div className="display" style={{ fontSize: 22 }}>Connected services</div>
            <div className="flex flex-col gap-3 mt-4">
              {integrations.map((integration) => {
                const statusClass = integration.status === "Connected" ? "chip chip-sage" : "chip chip-ghost";
                return (
                  <div key={integration.name} className="card-cream p-4" style={{ borderRadius: 14 }}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: "var(--color-paper)",
                            border: "1px solid var(--color-line)",
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <Icon name={integration.icon} s={16} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{integration.name}</div>
                          <div className="mono" style={{ fontSize: 10.5, color: "var(--color-mute)", marginTop: 4 }}>
                            {integration.desc}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={statusClass} style={{ fontSize: 10 }}>{integration.status}</span>
                        <button className="btn btn-ghost" style={{ padding: "6px 10px", fontSize: 10 }}>
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-cream p-6" style={{ borderRadius: 18 }}>
            <div className="eyebrow mb-1">Security</div>
            <div className="display" style={{ fontSize: 20 }}>Permissions</div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 12 }}>2-factor required</span>
                <span className="chip chip-sage" style={{ fontSize: 10 }}>Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 12 }}>Admin seats</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--color-mute)" }}>3 total</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 12 }}>Audit log retention</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--color-mute)" }}>90 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


type LiveDashboardPreviewProps = {
  onPathChange?: (path: string) => void;
};

export default function LiveDashboardPreview({ onPathChange }: LiveDashboardPreviewProps) {
  const isCollapsed = true;
  const [activePath, setActivePath] = useState('/');

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  useEffect(() => {
    const delay = activePath === '/' ? 9500 : 4500;
    const timeout = setTimeout(() => {
      setActivePath((prev) => {
        const idx = navItems.findIndex((n) => n.path === prev);
        const next = navItems[(idx + 1) % navItems.length]?.path || navItems[0].path;
        return next;
      });
    }, delay);
    return () => clearTimeout(timeout);
  }, [activePath]);

  useEffect(() => {
    if (onPathChange) onPathChange(activePath);
  }, [activePath, onPathChange]);

  return (
    <div className="dash-preview flex" style={{ zoom: 0.70, width: '100%', maxWidth: 1560, background: 'var(--color-canvas)', height: '700px', overflow: 'hidden', textAlign: 'left', borderRadius: '16px', border: '1px solid var(--color-line)', boxShadow: '0 20px 40px -24px rgba(14,18,16,.18)' }}>
      {/* Sidebar */}
      <aside
        className="h-full flex flex-col z-50 transition-all duration-300"
        style={{
          width: isCollapsed ? 72 : 248,
          padding: isCollapsed ? '20px 10px' : 20,
          background: 'var(--color-canvas)',
          borderRight: '1px solid var(--line-soft)',
          flexShrink: 0
        }}
      >
        <div className="flex items-center gap-3 px-2 pt-1 mb-6">
          <img src={logoImg} alt="ShelfSmart" style={{ width: 30, height: 30, objectFit: 'contain' }} />
          {!isCollapsed && (
            <div className="fadein" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <img src={textImg} alt="ShelfSmart" style={{ width: 'auto', height: 16, objectFit: 'contain' }} />
              <div className="eyebrow" style={{ fontSize: 9, marginTop: 4 }}>
                v2.0 · S.M.A.R.T
              </div>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((n) => {
            const isActive = activePath === n.path;
            return (
              <button
                key={n.name}
                onClick={() => setActivePath(n.path)}
                title={isCollapsed ? n.name : ''}
                className="flex items-center justify-between"
                style={{
                  padding: isCollapsed ? '11px 0' : '11px 14px',
                  borderRadius: 14,
                  background: isActive ? 'var(--color-ink)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--color-ink-2)',
                  fontWeight: 500,
                  fontSize: 13,
                  transition: 'background .15s',
                  border: 'none',
                  cursor: 'pointer',
                  justifyContent: isCollapsed ? 'center' : 'space-between',
                }}
              >
                <span className="flex items-center gap-3" style={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
                  <Icon name={n.icon} s={17} />
                  {!isCollapsed && n.name}
                </span>
                {!isCollapsed && n.badge > 0 && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 999,
                      background: isActive ? 'var(--color-accent)' : 'var(--color-ink)',
                      color: '#fff',
                    }}
                  >
                    {n.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col" style={{ overflow: 'hidden', background: 'var(--color-bone)' }}>
        <header
          className="z-40 flex items-center gap-4"
          style={{
            padding: '12px 32px 12px 16px',
            background: 'var(--color-canvas)',
            borderBottom: '1px solid var(--line-soft)',
            flexShrink: 0
          }}
        >
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              className="input"
              placeholder="Search SKUs, suppliers, orders…"
              style={{ paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: 'var(--color-paper)', borderRadius: 999, border: '1px solid var(--line-soft)', width: '100%', fontSize: 13 }}
            />
            <div
              style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-mute)',
              }}
            >
              <Icon name="search" s={15} />
            </div>
          </div>

          <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '999px', border: '1px solid var(--line-soft)', background: 'transparent', fontSize: 13 }}>
            <Icon name="cal" s={14} />
            {dateStr}
          </button>

          <button
            className="btn btn-ghost"
            style={{
              width: 40,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              aspectRatio: '1',
              position: 'relative',
              border: '1px solid var(--line-soft)',
              background: 'transparent'
            }}
          >
            <Icon name="bell" s={15} />
            <span
              style={{
                position: 'absolute',
                top: 9,
                right: 11,
                width: 7,
                height: 7,
                borderRadius: 999,
                background: 'var(--color-accent)',
              }}
            />
          </button>
        </header>

        <main className="thin-scroll" style={{ padding: '16px 32px 40px 16px', overflowY: 'auto', flex: 1 }}>
          <div key={activePath} className="dash-preview-page">
            {activePath === '/' && <DashboardInner />}
            {activePath === '/inventory' && <InventoryInner />}
            {activePath === '/suppliers' && <SuppliersInner />}
            {activePath === '/analytics' && <AnalyticsInner />}
            {activePath === '/settings' && <SettingsInner />}
          </div>
        </main>
      </div>
    </div>
  );
}
