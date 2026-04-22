import re

html_jsx = open(r'C:\Users\tduon\Desktop\Programs\ShelfSmart-Landing\src\pages\HomeNew.tsx', 'r', encoding='utf-8').read()

react_code = '''import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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

    // Tilt preview
    const frame = document.querySelector('.preview-frame') as HTMLElement;
    let ticking = false;
    const handleTilt = () => {
      if (!ticking && frame) {
        window.requestAnimationFrame(() => {
          const r = frame.getBoundingClientRect();
          const vh = window.innerHeight;
          const p = Math.max(-1, Math.min(1, (r.top + r.height/2 - vh/2) / vh));
          frame.style.transform = `perspective(1600px) rotateX(${-p * 1.8}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    };
    if (frame && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.addEventListener('scroll', handleTilt, { passive: true });
    }

    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
      window.removeEventListener('scroll', handleScrollNav);
      window.removeEventListener('scroll', handleNavShadow);
      window.removeEventListener('scroll', handleTilt);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
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
      {/* BODY_PLACEHOLDER */}
    </div>
  );
}
'''

# We need to adapt the waitlist form in html_jsx to use the React state
html_jsx = html_jsx.replace('id="waitlistForm"', 'id="waitlistForm" onSubmit={handleWaitlistSubmit}')
html_jsx = html_jsx.replace('<input type="email" id="waitlistEmail" name="email" placeholder="your@restaurant.com" required aria-label="Email address" autocomplete="email" />', 
  '<input type="email" id="waitlistEmail" name="email" placeholder="your@restaurant.com" required aria-label="Email address" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} readOnly={status === "success"} />')

# Replace the submit button with React state logic
old_btn = '''<button type="submit" className="btn btn-primary">
          Join waitlist
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>'''
new_btn = '''<button type="submit" className="btn btn-primary" disabled={status === "submitting" || status === "success"} style={status === "success" ? { background: "var(--green-2)" } : {}}>
          {status === "submitting" ? "Saving..." : status === "success" ? "Saved" : "Join waitlist"}
          {status !== "success" && status !== "submitting" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>}
        </button>'''
html_jsx = html_jsx.replace(old_btn, new_btn)

# Replace note logic
old_note = '<p className="waitlist-note" id="waitlistNote">No spam. One email when your spot opens.</p>'
new_note = '''<p className={`waitlist-note ${status === "error" ? "error" : status === "success" ? "success" : ""}`} id="waitlistNote">
        {status === "error" ? "Please enter a valid email address, or try again." : status === "success" ? `✓ You're in. We'll be in touch at ${email}.` : "No spam. One email when your spot opens."}
      </p>'''
html_jsx = html_jsx.replace(old_note, new_note)

# Replace specific <a> with <Link> carefully using regex
def replace_waitlist(m):
    return f'<Link {m.group(1)} to="/waitlist">{m.group(2)}</Link>'
html_jsx = re.sub(r'<a([^>]*href="#waitlist"[^>]*)>(.*?)</a>', replace_waitlist, html_jsx, flags=re.DOTALL)

def replace_contact(m):
    return f'<Link to="/contact">Contact</Link>'
html_jsx = re.sub(r'<a[^>]*>Contact</a>', replace_contact, html_jsx)

react_code = react_code.replace('{/* BODY_PLACEHOLDER */}', html_jsx)

with open(r'C:\Users\tduon\Desktop\Programs\ShelfSmart-Landing\src\pages\Home.tsx', 'w', encoding='utf-8') as f:
    f.write(react_code)
print('Done!')
