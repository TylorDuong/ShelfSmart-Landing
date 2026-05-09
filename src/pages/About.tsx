import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logoIcon from "../../Images/logo-icon.png";
import logoText from "../../Images/logo-text.png";
import finnImg from "../../Images/headshots/Finnegan Roffler.jpeg";
import arveenImg from "../../Images/headshots/Arveen Aziz.jpg";
import tylorImg from "../../Images/headshots/Tylor Duong.jpg";
import nicoImg from "../../Images/headshots/Nico Castagna.jpeg";
import arnavImg from "../../Images/headshots/Arnav Singh.jpeg";
import anirudhImg from "../../Images/headshots/Anirudh Yellapragada.png";

const founders = [
  {
    name: "Tylor Duong",
    role: "CEO & Lead Full-Stack Engineer",
    email: "tylorduong@shelfsmart.cc",
    bio: "Tylor Duong is an Arizona State University Computer Science student driven by building intelligent, scalable applications. He focuses on bridging full-stack development with cloud architecture and integrated AI. As an active hackathon competitor, he has a track record of delivering end-to-end projects for global gaming and tech events.",
    img: tylorImg,
  },
  {
    name: "Arveen Aziz",
    role: "CTO & Lead DevOps Engineer",
    email: "arvenaziz02@gmail.com",
    bio: "Arveen Aziz is a creative individual who values staying active and exploring new ideas. Outside of his engineering work, he enjoys fitness, volleyball, gaming, and experiencing new culinary scenes. He brings a deep passion for building innovative solutions and expressing fresh concepts to the ShelfSmart team.",
    img: arveenImg,
  },
  {
    name: "Anirudh Yellapragada",
    role: "CTO & Lead Backend Engineer",
    email: "anirudh0615@gmail.com",
    bio: "Anirudh Yellapragada is a computer science student at Arizona State University. With a background in competitive high school tennis and DECA, he brings a strong competitive edge, analytical mindset, and collaborative spirit to the engineering team.",
    img: anirudhImg,
  },
  {
    name: "Nico Castagna",
    role: "CMO & Director of Sales",
    email: "dcastagn@asu.edu",
    bio: "Dominic Castagna is a cofounder and electrical engineering student at Arizona State University, where he conducts research in RF systems and advanced energy technologies. His experience combines hardware design, rapid prototyping, and technical leadership across high-frequency electronics, embedded systems, and product-focused engineering projects.",
    img: nicoImg,
  },
  {
    name: "Arnav Singh",
    role: "CPO & Customer Success Manager",
    email: "06arnav.singh0411@gmail.com",
    bio: "Arnav Singh is an Electrical Engineering student at ASU with a background in building automated, sensor-driven hardware prototypes. After developing resource-optimizing systems for agricultural projects, he is applying his technical experience at ShelfSmart to help restaurants predict inventory needs and eliminate food waste.",
    img: arnavImg,
  },
  {
    name: "Finnegan Roffler",
    role: "Secretary & Community Outreach Coordinator",
    email: "finneganroffler2024@gmail.com",
    bio: "Currently a student at Arizona State University, Finnegan Roffler is working on his degree in political science. He leverages his many years of experience in food service to inform improvements and build solutions that work for the entire hospitality industry.",
    img: finnImg,
  }
];

export default function About() {
  useEffect(() => {
    const navNode = document.querySelector('.nav') as HTMLElement;
    const handleNavShadow = () => {
      if (navNode) {
        if (window.scrollY > 40) navNode.classList.add('scrolled');
        else navNode.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleNavShadow, { passive: true });
    return () => window.removeEventListener('scroll', handleNavShadow);
  }, []);

  return (
    <div className="ss2" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            <Link className="brand" to="/" aria-label="ShelfSmart home">
              <img className="brand-mark" src={logoIcon} alt="" width="30" height="30" />
              <img src={logoText} alt="ShelfSmart" style={{ height: '20px', marginLeft: '8px' }} />
            </Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <a href="/#features">Features</a>
              <a href="/#how">How it works</a>
              <a href="/#pricing">Pricing</a>
              <Link to="/about" className="active" style={{ textDecoration: 'none' }}>About Us</Link>
            </div>
            <Link className="nav-cta" to="/waitlist">
              Join waitlist
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container" style={{ maxWidth: 1000, margin: '40px auto', padding: '0 20px' }}>
        
        <div style={{ marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            <span className="dot"></span> Our Story
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.03em', fontWeight: 600, color: 'var(--ink-new)', marginBottom: 24, lineHeight: 1.05 }}>
            Eliminating guesswork from the <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink-soft-new)' }}>modern kitchen.</em>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginTop: 40 }}>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink-new)', marginBottom: 12 }}>Mission</h3>
              <p style={{ color: 'var(--ink-soft-new)', fontSize: 16, lineHeight: 1.6 }}>
                At ShelfSmart, our mission is to empower restaurants to stop ordering blind. We bridge the gap between historical data, live agent signals, and predictive forecasting to ensure kitchens know exactly what they need for tonight's service.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink-new)', marginBottom: 12 }}>Company Overview</h3>
              <p style={{ color: 'var(--ink-soft-new)', fontSize: 16, lineHeight: 1.6 }}>
                Founded by a team of engineers and hospitality veterans, ShelfSmart was built to replace Wednesday-stale spreadsheets and late-night supplier texts. We transform how venues manage inventory, drastically reducing food waste and saving hours of administrative work each week.
              </p>
            </div>
            <div style={{ gridColumn: '1 / -1', marginTop: 16, display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink-soft-new)' }}>Follow us:</span>
              <a href="https://x.com/tryshelfsmart" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--ink-new)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'} aria-label="X (Twitter)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/tryshelfsmart/?viewAsMember=true" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--ink-new)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'} aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="paper-card" style={{ padding: '48px', borderRadius: 24 }}>
          <h2 style={{ fontSize: 32, letterSpacing: '-0.02em', fontWeight: 600, color: 'var(--ink-new)', marginBottom: 40, textAlign: 'center' }}>Meet the Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 40 }}>
            {founders.map((founder, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <img src={founder.img} alt={founder.name} style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 20, border: '4px solid var(--paper)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
                <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink-new)', marginBottom: 4 }}>{founder.name}</h3>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--green-2)', marginBottom: 8 }}>{founder.role}</div>
                <a href={`mailto:${founder.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted)', textDecoration: 'none', marginBottom: 16, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--ink-new)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {founder.email}
                </a>
                <p style={{ color: 'var(--ink-soft-new)', fontSize: 14, lineHeight: 1.6 }}>{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
