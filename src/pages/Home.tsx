import React, { useEffect, useRef, useState } from "react";
import { motion, LayoutGroup } from "motion/react";
import { Link } from "react-router-dom";
import LiveDashboardPreview from "../components/LiveDashboardPreview";
import BorderGlow from "../components/reactbits/BorderGlow";
import CountUp from "../components/reactbits/CountUp";
import LogoLoop from "../components/reactbits/LogoLoop";
import RotatingText from "../components/reactbits/RotatingText";
import ScrollVelocity from "../components/reactbits/ScrollVelocity";
import { SiSquare, SiUbereats, SiDoordash, SiDeliveroo } from "react-icons/si";

const LiveNumber = ({ initial, isPercent = false }: { initial: number, isPercent?: boolean }) => {
  const [val, setVal] = useState(initial);
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        setVal(v => v + Math.floor(Math.random() * 3));
      }
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);
  return <>{isPercent ? '+' + val + '%' : val}</>;
};

import logoIcon from "../../Images/logo-icon.png";
import logoText from "../../Images/logo-text.png";

// Replicas for missing icons
const toastLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F15A2B', fontWeight: 800, fontSize: '28px', fontFamily: 'system-ui, sans-serif', letterSpacing: '-1px' }}>
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M19 5c-1.3-.6-3.6-1-7-1s-5.7.4-7 1c-1.7.6-3 1.9-3 3.6v8.8c0 1.7 1.3 3.1 3 3.6 1.3.6 3.6 1 7 1s5.7-.4 7-1c1.7-.6 3-1.9 3-3.6V8.6C22 6.9 20.7 5.6 19 5zM12 19c-2.8 0-4.9-.3-6-.7-1-.3-1.5-1.1-1.5-1.9v-3c1.5 1 4 1.6 7.5 1.6s6-.6 7.5-1.6v3c0 .8-.5 1.6-1.5 1.9-1.1.4-3.2.7-6 .7zM19.5 11c-1.5 1-4 1.6-7.5 1.6S4.5 12 3 11V8.6c0-.8.5-1.6 1.5-1.9 1.1-.4 3.2-.7 6-.7s4.9.3 6 .7c1 .3 1.5 1.1 1.5 1.9V11z"/></svg>
    toast
  </div>
);

const cloverLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00A859', fontWeight: 600, fontSize: '26px', fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.5px' }}>
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="4"/></svg>
    clover
  </div>
);

const openTableLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DA3743', fontWeight: 700, fontSize: '24px', fontFamily: 'system-ui, sans-serif' }}>
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
    OpenTable
  </div>
);

const grubhubLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', color: '#FF8000', fontWeight: 900, fontSize: '26px', fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.5px' }}>
    GRUBHUB
  </div>
);

const rotatingAdjectives = [
  "modern", "casual", "upscale", "atmospheric", "cozy", "bustling", "minimalist", "rustic", "chic", "tableside", "grab-and-go", "authentic", "fusion", "experimental", "farm-to-table", "specialized", "artisanal", "global", "international", "premium", "luxury", "competitive", "romantic", "professional", "communal", "celebratory", "trendy",
];

const trustBrands: { name: string; style: React.CSSProperties }[] = [
  { name: 'Maison Clair',  style: { fontFamily: 'var(--font-serif)',    fontStyle: 'italic',  fontSize: '26px', fontWeight: 400, letterSpacing: '-0.02em' } },
  { name: 'ORTOLAN',       style: { fontFamily: 'var(--font-display)',  fontStyle: 'normal',  fontSize: '12px', fontWeight: 700, letterSpacing: '0.22em',  textTransform: 'uppercase' } },
  { name: 'KITŌ',          style: { fontFamily: 'var(--font-mono-new)', fontStyle: 'normal',  fontSize: '15px', fontWeight: 400, letterSpacing: '0.28em',  textTransform: 'uppercase' } },
  { name: 'Bellweather',   style: { fontFamily: 'var(--font-display)',  fontStyle: 'normal',  fontSize: '22px', fontWeight: 300, letterSpacing: '-0.03em' } },
  { name: 'Hōjō & Sons',   style: { fontFamily: 'var(--font-serif)',    fontStyle: 'italic',  fontSize: '22px', fontWeight: 400, letterSpacing: '-0.01em' } },
  { name: 'Verdoye',       style: { fontFamily: 'var(--font-display)',  fontStyle: 'normal',  fontSize: '24px', fontWeight: 800, letterSpacing: '-0.04em' } },
];

const trustTexts = [
  <React.Fragment key="trust">
    {trustBrands.map(({ name, style }, i) => (
      <React.Fragment key={i}>
        <span className="trust-pill" style={style}>{name}</span>
        <span className="trust-sep" aria-hidden="true">·</span>
      </React.Fragment>
    ))}
  </React.Fragment>
];

const integrationLogos = [
  { node: toastLogo(), ariaLabel: "Toast POS", href: "https://pos.toasttab.com/" },
  { node: cloverLogo(), ariaLabel: "Clover", href: "https://www.clover.com/" },
  { node: <SiSquare size={36} color="#000000" />, ariaLabel: "Square", href: "https://squareup.com/" },
  { node: openTableLogo(), ariaLabel: "OpenTable", href: "https://www.opentable.com/" },
  { node: <SiUbereats size={36} color="#06C167" />, ariaLabel: "Uber Eats", href: "https://www.ubereats.com/" },
  { node: <SiDoordash size={36} color="#FF3008" />, ariaLabel: "DoorDash", href: "https://www.doordash.com/" },
  { node: grubhubLogo(), ariaLabel: "Grubhub", href: "https://www.grubhub.com/" },
  { node: <SiDeliveroo size={36} color="#00CCBC" />, ariaLabel: "Deliveroo", href: "https://deliveroo.co.uk/" }
];

const previewTaglines: Record<string, { label: string; text: string }> = {
  "/": {
    label: "Dashboard",
    text: "Forecasted guests, critical SKUs, and live agent signals in one glance.",
  },
  "/inventory": {
    label: "Inventory",
    text: "Ledger view with stock depth, reorder points, and depletion signals.",
  },
  "/suppliers": {
    label: "Suppliers",
    text: "Vendor reliability, inbound coverage, and market intelligence.",
  },
  "/analytics": {
    label: "Analytics",
    text: "Influence breakdowns and demand velocity projections.",
  },
  "/settings": {
    label: "Settings",
    text: "Company profile, integrations, and API access controls.",
  },
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [previewPath, setPreviewPath] = useState("/");
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);


  const activeTagline = previewTaglines[previewPath] || previewTaglines["/"];

  useEffect(() => {
    // Reveal on scroll
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal, .rise').forEach(el => revealObserver.observe(el));

    // Active nav link tracking
    const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
    const sectionIds = ['features', 'how', 'pricing'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const setActive = (id: string) => {
      navLinks.forEach(a => {
        const href = a.getAttribute('href');
        if (href === '#' + id) a.classList.add('active');
        else a.classList.remove('active');
      });
    };

    const activeObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length && visible[0].target.id) setActive(visible[0].target.id);
    }, {
      rootMargin: '-35% 0px -55% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });
    sections.forEach(s => activeObserver.observe(s));

    const handleScrollNav = () => {
      if (window.scrollY < 400) {
        navLinks.forEach(a => a.classList.remove('active'));
      }
    };
    window.addEventListener('scroll', handleScrollNav, { passive: true });

    // Smooth scroll for anchors
    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.startsWith('/')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: 'smooth' });
      window.history.pushState(null, '', href);
    };
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Nav subtle shrink
    const nav = document.querySelector('.nav-inner') as HTMLElement;
    const handleNavShadow = () => {
      if (nav) {
        if (window.scrollY > 40) nav.style.boxShadow = '0 10px 30px rgba(14,18,16,.08)';
        else nav.style.boxShadow = '0 4px 20px rgba(14,18,16,.04)';
      }
    };
    window.addEventListener('scroll', handleNavShadow, { passive: true });

    // Tilt preview — both scroll and hover tilt live on the outer frame so the border glow follows
    const frame = document.querySelector('.preview-frame') as HTMLElement;
    let ticking = false;
    let isHovered = false;
    let lastScrollX = 0;
    let leaveTimer: ReturnType<typeof setTimeout>;
    const MAX_TILT = 6;
    // Buffer prevents oscillation at edges: card must be this many px past the border before leave fires
    const EDGE_BUFFER = 80;

    const applyTilt = (rotateX: number, rotateY: number, withTransition = false) => {
      if (!frame) return;
      if (withTransition) frame.style.transition = 'transform 0.5s cubic-bezier(.2,.8,.2,1)';
      frame.style.transform = `perspective(1600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleTilt = () => {
      if (isHovered || !frame) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const r = frame.getBoundingClientRect();
          const vh = window.innerHeight;
          const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
          lastScrollX = -p * 1.8;
          applyTilt(lastScrollX, -8);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Single window-level handler avoids enter/leave oscillation at tilted edges
    const handlePointerMove = (e: PointerEvent) => {
      if (!frame) return;
      const rect = frame.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left - EDGE_BUFFER && e.clientX <= rect.right + EDGE_BUFFER &&
        e.clientY >= rect.top - EDGE_BUFFER && e.clientY <= rect.bottom + EDGE_BUFFER;

      if (inside) {
        clearTimeout(leaveTimer);
        if (!isHovered) isHovered = true;
        frame.style.transition = '';
        const normX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const normY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        applyTilt(-normY * MAX_TILT, normX * MAX_TILT);
      } else if (isHovered) {
        isHovered = false;
        applyTilt(lastScrollX, -8, true);
        leaveTimer = setTimeout(() => { if (frame) frame.style.transition = ''; }, 500);
      }
    };

    if (frame && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyTilt(0, -8); // initial resting tilt before first scroll
      window.addEventListener('scroll', handleTilt, { passive: true });
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }

    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
      window.removeEventListener('scroll', handleScrollNav);
      window.removeEventListener('scroll', handleNavShadow);
      window.removeEventListener('scroll', handleTilt);
      clearTimeout(leaveTimer);
      window.removeEventListener('pointermove', handlePointerMove);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  useEffect(() => {
    const target = statsRef.current;
    if (!target) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStatsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      return;
    }

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      console.warn("VITE_FORMSPREE_ENDPOINT is not set.");
      setTimeout(() => setStatus("success"), 1000);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("email", email);
      fd.append("_subject", "New Waitlist Signup (Landing Page)!");

      const response = await fetch(endpoint, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (response.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="ss2">

      <span id="top" aria-hidden="true"></span>

      {/* ==========================================================
     NAV
     ========================================================== */}
      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            <a className="brand" href="#top" aria-label="ShelfSmart home">
              <img className="brand-mark" src={logoIcon} alt="" width="30" height="30" />
              <img src={logoText} alt="ShelfSmart" style={{ height: '20px', marginLeft: '8px' }} />
            </a>
            <div className="nav-links">
              <a href="#features" data-nav>Features</a>
              <a href="#how" data-nav>How it works</a>
              <a href="#pricing" data-nav>Pricing</a>
            </div>
            <Link className="nav-cta" href="#waitlist" to="/waitlist">
              Join waitlist
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* ==========================================================
     HERO
     ========================================================== */}
      <section className="hero">
        <div className="container hero-grid" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-text-col">
            <span className="eyebrow rise d1">
              <span className="dot"></span>
              Powered by · S.M.A.R.T forecasting
            </span>

            <h1 className="hero-title rise d2">
              Inventory <em>intelligence</em><br />
              for<br />
              <span className="hero-adj-line">
                <LayoutGroup id="hero-adj">
                  <RotatingText
                    texts={rotatingAdjectives}
                    rotationInterval={2700}
                    staggerDuration={0.025}
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    splitLevelClassName="rotating-split-level"
                    mainClassName="rotating-adjective"
                  />
                  <motion.span
                    layout="position"
                    transition={{ type: "spring", damping: 35, stiffness: 250 }}
                    style={{ originX: 0 }}
                  >
                    {" "}kitchens.
                  </motion.span>
                </LayoutGroup>
              </span>
            </h1>

            <p className="hero-sub rise d3">
              ShelfSmart turns guest forecasts, supplier feeds, and shelf counts into one calm dashboard —
              so you stop guessing what to order and start knowing exactly what tonight needs.
            </p>

            <div className="hero-ctas rise d4">
              <Link href="#waitlist" className="btn btn-primary" to="/waitlist">
                Join waitlist — be first in
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </Link>
              <a href="#preview" className="btn btn-ghost">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                See the dashboard
              </a>
            </div>

            <div className="hero-meta rise d5">
              <span><span className="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg></span> Connects to 30+ POS systems</span>
              <span><span className="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg></span> Live in under 24 hours</span>
              <span><span className="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg></span> Early-access pricing</span>
            </div>
          </div>

          <div className="hero-visual-col rise d5" style={{ perspective: '1600px', justifySelf: 'start', width: '100%' }} id="preview">
            <BorderGlow
              className="preview-frame"
              borderRadius={24}
              edgeSensitivity={44}
              glowRadius={36}
              glowIntensity={1.15}
              glowColor="140 55 60"
              backgroundColor="var(--paper)"
              coneSpread={28}
              colors={['#3DA35D', '#96E072', '#17b26a']}
              glowReach={120}
              animated
            >
              <div className="preview-tilt">
                <LiveDashboardPreview onPathChange={setPreviewPath} />
              </div>
            </BorderGlow>
            <div key={previewPath} className="preview-tagline">
              <span className="preview-tagline__label">{activeTagline.label}</span>
              <span className="preview-tagline__text">{activeTagline.text}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
     TRUST
     ========================================================== */}
      <section className="trust">
        <div className="container">
          <p className="trust-label reveal">Trusted by kitchens plating <em style={{ fontFamily: "var(--font-serif)" }}>12M+</em> covers a year</p>
          <div className="trust-logos reveal">
            <ScrollVelocity
              texts={trustTexts}
              velocity={60}
              numCopies={4}
              className="trust-copy"
              parallaxClassName="trust-parallax"
              scrollerClassName="trust-scroller"
              velocityMapping={{ input: [0, 1000], output: [0, 0] }}
            />
          </div>
          <div className="trust-integrations reveal" style={{ marginTop: '3rem' }}>
            <span className="integrations-label">Integrations</span>
            <div style={{ position: 'relative', height: '60px', overflow: 'hidden' }}>
              <LogoLoop
                logos={integrationLogos}
                speed={85}
                direction="left"
                logoHeight={36}
                gap={48}
                scaleOnHover
                fadeOut
                fadeOutColor="var(--color-bone)"
                ariaLabel="Technology partners"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
     FEATURES
     ========================================================== */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-kicker">Built for service</span>
            <h2 className="section-title">Three dials <em>every operator</em> wishes they had.</h2>
            <p className="section-sub">Most tools show you yesterday. ShelfSmart shows you tonight. Forecasting, shelf intelligence, and supplier flow — in one pane.</p>
          </div>

          <div className="features">
            {/* Forecast */}
            <article className="feature dark reveal">
              <span className="f-label">01 · Forecasting</span>
              <h3 className="f-title">Predicted guests, <em>not wishful thinking.</em></h3>
              <p className="f-desc">Blend weather, local events, reservations and historical lifts into one number. Updated every 15 minutes.</p>
              <div className="f-visual">
                <div className="f-forecast" style={{ height: "65px" }}>
                  <div className="bar" style={{ height: "40%" }}></div>
                  <div className="bar" style={{ height: "55%" }}></div>
                  <div className="bar peak" style={{ height: "90%" }}></div>
                  <div className="bar" style={{ height: "70%" }}></div>
                  <div className="bar" style={{ height: "45%" }}></div>
                  <div className="bar" style={{ height: "60%" }}></div>
                  <div className="bar peak" style={{ height: "85%" }}></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginTop: '8px', textAlign: 'center', fontFamily: 'var(--font-mono-new)', fontSize: '10.5px', color: 'var(--muted-2)', textTransform: 'uppercase' }}>
                  <span>Mon</span><span>Tue</span><span style={{ color: 'var(--cream)', fontWeight: 500 }}>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span style={{ color: 'var(--cream)', fontWeight: 500 }}>Sun</span>
                </div>
              </div>
            </article>

            {/* Shelf intelligence */}
            <article className="feature reveal">
              <span className="f-label">02 · Shelf intelligence</span>
              <h3 className="f-title">Know what's <em>running thin</em> before service does.</h3>
              <p className="f-desc">Every SKU tied to a reorder point, a supplier lead time, and tonight's forecast. Silent until something matters.</p>
              <div className="f-visual">
                <div className="f-list">
                  <div className="f-list-row crit"><span className="sq"></span><span className="name">Burrata 125g</span><span className="tag">2.4 kg · critical</span></div>
                  <div className="f-list-row warn"><span className="sq"></span><span className="name">San Marzano</span><span className="tag">6 tins · low</span></div>
                  <div className="f-list-row ok"><span className="sq"></span><span className="name">Olive oil, Tuscan</span><span className="tag">12 L · ok</span></div>
                  <div className="f-list-row ok"><span className="sq"></span><span className="name">Fiori di zucca</span><span className="tag">48 pcs · ok</span></div>
                </div>
              </div>
            </article>

            {/* Supplier flow */}
            <article className="feature reveal">
              <span className="f-label">03 · Supplier flow</span>
              <h3 className="f-title">One order button, <em>zero spreadsheets.</em></h3>
              <p className="f-desc">Draft, approve, and dispatch orders to every supplier from one screen. Track each delivery down to the crate.</p>
              <div className="f-visual">
                <div className="f-track" style={{ background: "var(--ink)", borderRadius: "14px", padding: "30px 20px", color: "var(--cream)" }}>
                  <div className="line"></div>
                  <div className="node done" style={{ left: "10%" }}></div>
                  <div className="lbl" style={{ left: "10%" }}>Drafted</div>
                  <div className="node done" style={{ left: "37%" }}></div>
                  <div className="lbl" style={{ left: "37%" }}>Sent</div>
                  <div className="node active" style={{ left: "64%" }}></div>
                  <div className="lbl" style={{ left: "64%" }}>In transit</div>
                  <div className="node" style={{ left: "91%" }}></div>
                  <div className="lbl" style={{ left: "91%" }}>Received</div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ==========================================================
     BEFORE/AFTER SPLIT
     ========================================================== */}
      <section className="section" style={{ paddingTop: "40px" }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="section-kicker">The shift</span>
            <h2 className="section-title">From <em>guesswork</em> to a kitchen that <em>knows.</em></h2>
          </div>
          <div className="split-grid">
            <div className="split-card before reveal">
              <span className="badge">Before ShelfSmart</span>
              <h3>A Sunday prep built on <em>hope.</em></h3>
              <ul>
                <li>Monday spreadsheets that are Wednesday-stale</li>
                <li>Chef texting suppliers from memory at 11pm</li>
                <li>Weekend 86s because a weather spike wasn't priced in</li>
                <li>Month-end variance no one can explain</li>
                <li>Three tools, four tabs, one exhausted manager</li>
              </ul>
            </div>
            <div className="split-card after reveal">
              <span className="badge">After ShelfSmart</span>
              <h3>One screen. <em>One decision.</em> Service on.</h3>
              <ul>
                <li>Forecasts that move with the weather, events, and rezzies</li>
                <li>Auto-drafted POs the chef approves in 30 seconds</li>
                <li>Critical SKUs flagged at 8am, not 8pm</li>
                <li>Variance attributed per dish, per night, per supplier</li>
                <li>Everything — procurement, stock, calendar — in one calm view</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
     STATS BAND
     ========================================================== */}
      <section className="section" style={{ paddingTop: "40px" }}>
        <div className="container">
          <div className="stat-band reveal" ref={statsRef}>
            <div className="stat-grid">
              <div className="stat-item">
                <div className="num">−<CountUp to={38} duration={1.6} startWhen={statsInView} /><em>%</em></div>
                <div className="lbl">Average reduction in food waste within 60 days</div>
              </div>
              <div className="stat-item">
                <div className="num"><CountUp to={4.2} duration={1.8} startWhen={statsInView} /><em>h</em></div>
                <div className="lbl">Manager hours saved per week on ordering</div>
              </div>
              <div className="stat-item">
                <div className="num"><CountUp to={91} duration={1.6} startWhen={statsInView} /><em>%</em></div>
                <div className="lbl">Forecast accuracy across partner restaurants</div>
              </div>
              <div className="stat-item">
                <div className="num"><CountUp to={24} duration={1.6} startWhen={statsInView} /><em>h</em></div>
                <div className="lbl">From install to first predictive service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
     HOW IT WORKS
     ========================================================== */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-kicker">How it works</span>
            <h2 className="section-title">Three evenings <em>to a smarter kitchen.</em></h2>
          </div>
          <div className="steps">
            {/* ── Step 01: green / connect ── */}
            <div className="step step--01 reveal">
              <div className="step-num">01</div>
              <div className="step-body">
                <h4>Connect your POS &amp; suppliers</h4>
                <p>We pull two years of covers, items and invoices. Thirty-plus POS integrations. No spreadsheets, no sales calls, no CSV gymnastics.</p>
              </div>
              <div className="step-visual">
                <div className="card card--01">
                  <div className="card-accent-bar card-accent-bar--green"/>
                  <div className="row"><span>Toast POS</span><strong className="chip chip--green">✓ connected</strong></div>
                  <div className="row"><span>Sysco · East Bay</span><strong className="chip chip--green">✓ connected</strong></div>
                  <div className="row"><span>Local Greens Co.</span><strong className="chip chip--green">✓ connected</strong></div>
                  <div className="row"><span>Historical data</span><strong className="chip chip--ink">2y 3mo</strong></div>
                </div>
              </div>
            </div>

            {/* ── Step 02: indigo / learn ── */}
            <div className="step step--02 step--reversed reveal">
              <div className="step-num">02</div>
              <div className="step-body">
                <h4>We learn your kitchen</h4>
                <p>Models train on your specific patterns — which dishes move on rainy Thursdays, which wine pairs with what, which supplier slips when.</p>
              </div>
              <div className="step-visual">
                <div className="card card--02">
                  <div className="card-accent-bar card-accent-bar--indigo"/>
                  <div className="row"><span>Weather uplift</span><strong className="chip chip--blue">+12% Fri rain</strong></div>
                  <div className="row"><span>Event uplift</span><strong className="chip chip--purple">+170 covers Mon</strong></div>
                  <div className="row"><span>SKU elasticity</span><strong className="chip chip--ink">328 mapped</strong></div>
                  <div className="row"><span>Supplier ETA</span><strong className="chip chip--green">±0.6 days</strong></div>
                </div>
              </div>
            </div>

            {/* ── Step 03: amber / operate ── */}
            <div className="step step--03 reveal">
              <div className="step-num">03</div>
              <div className="step-body">
                <h4>Cook with confidence</h4>
                <p>Every morning: tonight's guest count, what to prep, what to order, who to call. Every evening: variance you can act on.</p>
              </div>
              <div className="step-visual">
                <div className="card card--03">
                  <div className="card-accent-bar card-accent-bar--amber"/>
                  <div className="row"><span>Tonight's forecast</span><strong className="chip chip--ink">465 covers</strong></div>
                  <div className="row"><span>Drafts awaiting</span><strong className="chip chip--amber">3 POs</strong></div>
                  <div className="row"><span>Critical SKUs</span><strong className="chip chip--green">0 live</strong></div>
                  <div className="row"><span>Status</span><strong className="chip chip--green">● optimal</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
     PRICING
     ========================================================== */}
      <section className="section" id="pricing">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-kicker">Pricing</span>
            <h2 className="section-title">Pays for itself <em>by the third Saturday.</em></h2>
            <p className="section-sub">One price per venue. No per-user fees, no integration tax, no six-month contracts.</p>
          </div>
          <div className="pricing">
            <div className="price reveal">
              <div className="price-head">
                <div className="price-name">Starter</div>
                <div className="price-tag">Single venue</div>
              </div>
              <div className="price-amt"><span className="num">$149</span><span className="per">/ venue / month</span></div>
              <div className="price-desc">Everything a single kitchen needs to stop ordering blind.</div>
              <ul>
                <li>Predicted guests &amp; forecast calendar</li>
                <li>Up to 500 SKUs tracked</li>
                <li>5 supplier integrations</li>
                <li>Email &amp; chat support</li>
              </ul>
              <a href="#" className="btn btn-ghost">Start 14-day trial</a>
            </div>
            <div className="price pro reveal">
              <div className="price-head">
                <div className="price-name">Group</div>
                <div className="price-tag">Most chosen</div>
              </div>
              <div className="price-amt"><span className="num">$349</span><span className="per">/ venue / month</span></div>
              <div className="price-desc">For multi-venue groups, chef collectives, and hospitality teams.</div>
              <ul>
                <li>Everything in Starter</li>
                <li>Unlimited SKUs &amp; suppliers</li>
                <li>Cross-venue analytics &amp; transfers</li>
                <li>Dedicated success chef-partner</li>
                <li>API access &amp; SSO</li>
              </ul>
              <a href="#" className="btn btn-primary">Book a walkthrough</a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
     FINAL CTA
     ========================================================== */}
      <section className="container" id="waitlist">
        <div className="cta-band reveal">
          <span className="section-kicker" style={{ color: "var(--green-2)", marginBottom: "20px" }}>Early access · Spring 2026</span>
          <h2>Tonight deserves <em>a smarter kitchen.</em></h2>
          <p>Join the waitlist for priority onboarding, founding-member pricing, and a 30-minute walkthrough with a chef-partner before you commit.</p>
          <form className="waitlist-form" id="waitlistForm" onSubmit={handleWaitlistSubmit} noValidate>
            <div className="waitlist-fields">
              <input type="email" id="waitlistEmail" name="email" placeholder="your@restaurant.com" required aria-label="Email address" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} readOnly={status === "success"} />
              <button type="submit" className="btn btn-primary" disabled={status === "submitting" || status === "success"} style={status === "success" ? { background: "var(--green-2)" } : {}}>
                {status === "submitting" ? "Saving..." : status === "success" ? "Saved" : "Join waitlist"}
                {status !== "success" && status !== "submitting" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>}
              </button>
            </div>
            <p className={`waitlist-note ${status === "error" ? "error" : status === "success" ? "success" : ""}`} id="waitlistNote">
              {status === "error" ? "Please enter a valid email address, or try again." : status === "success" ? `✓ You're in. We'll be in touch at ${email}.` : "No spam. One email when your spot opens."}
            </p>
          </form>
        </div>
      </section>

      {/* ==========================================================
     FOOTER
     ========================================================== */}
      <footer className="foot container">
        <div className="foot-top">
          <div className="foot-brand">
            <a className="brand" href="#top" aria-label="ShelfSmart home">
              <img className="brand-mark" src={logoIcon} alt="ShelfSmart Icon" />
              <img className="brand-name-img" src={logoText} alt="ShelfSmart" style={{ height: "24px" }} />
            </a>
            <p>Inventory intelligence for modern kitchens. Made with too many late-night orders by a team of chefs and engineers.</p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h5>Product</h5>
              <a href="#features">Features</a>
              <a href="#how">How it works</a>
              <a href="#preview">Dashboard</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="foot-col">
              <h5>Company</h5>
              <a href="#">About</a>
              <a href="#">Customers</a>
              <a href="#">Careers</a>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="foot-col">
              <h5>Resources</h5>
              <a href="#">Docs</a>
              <a href="#">Guides</a>
              <a href="#">Status</a>
              <a href="#">Support</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 ShelfSmart Labs · <em>made for the back of house.</em></span>
          <span>Tempe, AZ · Paris, FR · Tokyo, JP</span>
        </div>
      </footer>


    </div>
  );
}
