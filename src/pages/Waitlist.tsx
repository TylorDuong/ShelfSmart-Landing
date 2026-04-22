import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Waitlist() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      console.warn("VITE_FORMSPREE_ENDPOINT is not set.");
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
      <div className="container" style={{ maxWidth: 640, margin: 'auto' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: 'var(--muted)', marginBottom: 40, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--ink-new)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          Back to Home
        </Link>
        
        <div className="paper-card" style={{ padding: '48px 40px', borderRadius: 24 }}>
          {status === "success" ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: 64, height: 64, background: 'var(--green-soft)', color: 'var(--green-2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h2 style={{ fontSize: 36, letterSpacing: '-0.025em', fontWeight: 600, color: 'var(--ink-new)', marginBottom: 16 }}>
                You're on the list!
              </h2>
              <p style={{ color: 'var(--ink-soft-new)', fontSize: 16, lineHeight: 1.5, marginBottom: 32 }}>
                Thank you for your interest in ShelfSmart. We are excited to help you eliminate kitchen guesswork. We'll be in touch soon with your early access invitation.
              </p>
              <Link to="/" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                Return to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                <span className="dot"></span> Early Access
              </div>
              <h2 style={{ fontSize: 40, letterSpacing: '-0.03em', fontWeight: 600, color: 'var(--ink-new)', marginBottom: 16, lineHeight: 1.1 }}>
                Join the <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink-soft-new)' }}>Waitlist</em>
              </h2>
              <p style={{ color: 'var(--ink-soft-new)', fontSize: 16, lineHeight: 1.5, marginBottom: 40 }}>
                ShelfSmart is an AI that predicts exactly what your kitchen needs, down to the last onion. 
                Thank you for your interest—join the waitlist below to be the first to know when we launch and secure exclusive early access pricing.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink-new)', marginBottom: 8 }}>Name or Company</label>
                  <input
                    type="text"
                    name="name"
                    required
                    style={{ width: '100%', background: '#fff', border: '1px solid var(--line-new)', borderRadius: 12, padding: '12px 16px', fontSize: 15, outline: 'none' }}
                    placeholder="E.g., The Pearl Bistro"
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
                    style={{ width: '100%', background: '#fff', border: '1px solid var(--line-new)', borderRadius: 12, padding: '12px 16px', fontSize: 15, outline: 'none' }}
                    placeholder="chef@example.com"
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--green)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'var(--line-new)'}
                  />
                </div>
                
                <input type="hidden" name="_subject" value="New Waitlist Signup!" />

                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 16, marginTop: 12 }}
                >
                  {status === "submitting" ? "Submitting..." : "Secure My Spot"}
                  {!status && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>}
                </button>
                
                {status === "error" && (
                  <p style={{ color: 'var(--red)', fontSize: 14, textAlign: 'center', marginTop: 16 }}>Oops! Something went wrong. Please try again.</p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
