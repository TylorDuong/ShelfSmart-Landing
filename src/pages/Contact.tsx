import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setTimeout(() => setStatus("success"), 1000);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (response.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="ss2" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '40px 20px' }}>
      <div className="container" style={{ maxWidth: 800, margin: 'auto' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: 'var(--muted)', marginBottom: 40, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--ink-new)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          Back to Home
        </Link>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              <span className="dot"></span> Contact Us
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.03em', fontWeight: 600, color: 'var(--ink-new)', marginBottom: 24, lineHeight: 1.05 }}>
              Let's talk about your <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink-soft-new)' }}>kitchen.</em>
            </h1>
            <p style={{ color: 'var(--ink-soft-new)', fontSize: 16, lineHeight: 1.5, marginBottom: 32 }}>
              Whether you have questions about integrations, pricing, or just want to chat about inventory automation, our team is ready to help.
              Thank you for considering ShelfSmart for your business!
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'var(--ink-new)' }}>
              <div style={{ width: 48, height: 48, background: 'var(--green-soft)', color: 'var(--green-2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Email Us</div>
                <div style={{ color: 'var(--muted)', fontSize: 14 }}>hello@shelfsmart.app</div>
              </div>
            </div>
          </div>

          <div className="paper-card" style={{ padding: '32px', borderRadius: 24 }}>
            {status === "success" ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 64, height: 64, background: 'var(--green-soft)', color: 'var(--green-2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h2 style={{ fontSize: 24, letterSpacing: '-0.02em', fontWeight: 600, color: 'var(--ink-new)', marginBottom: 12 }}>Message Sent!</h2>
                <p style={{ color: 'var(--ink-soft-new)', fontSize: 14, lineHeight: 1.5, marginBottom: 24 }}>
                  We've received your message and will get back to you within 24 hours.
                </p>
                <button onClick={() => setStatus("idle")} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink-new)', marginBottom: 8 }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    style={{ width: '100%', background: '#fff', border: '1px solid var(--line-new)', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none' }}
                    placeholder="Alex Chen"
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--green)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'var(--line-new)'}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink-new)', marginBottom: 8 }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    style={{ width: '100%', background: '#fff', border: '1px solid var(--line-new)', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none' }}
                    placeholder="alex@restaurant.com"
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--green)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'var(--line-new)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink-new)', marginBottom: 8 }}>How can we help?</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    style={{ width: '100%', background: '#fff', border: '1px solid var(--line-new)', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none', resize: 'none' }}
                    placeholder="Tell us about your inventory needs..."
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--green)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'var(--line-new)'}
                  />
                </div>
                
                <input type="hidden" name="_subject" value="New Contact Form Submission!" />

                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15, marginTop: 8 }}
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                  {!status && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>}
                </button>
                
                {status === "error" && (
                  <p style={{ color: 'var(--red)', fontSize: 13, textAlign: 'center', marginTop: 12 }}>Oops! Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .ss2 > div > div { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
