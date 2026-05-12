import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "@formspree/react";

// ─── Types ────────────────────────────────────────────────────────────────────
type WasteBucket = "<$500" | "$1k" | "$2.5k" | "$5k+";

interface FormData {
  restaurantName: string;
  establishmentType: string;
  laborHours: number;
  wasteBucket: WasteBucket | "";
  email: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const ESTABLISHMENT_TYPES = [
  "Fine Dining",
  "Casual Dining",
  "Fast Casual",
  "Café / Bakery",
  "Bar / Gastropub",
  "Food Truck",
  "Catering",
  "Ghost Kitchen",
];

const WASTE_OPTIONS: { value: WasteBucket; label: string; sublabel: string }[] = [
  { value: "<$500",  label: "Under $500",  sublabel: "Tight ship"            },
  { value: "$1k",    label: "$1,000",      sublabel: "Typical single venue"  },
  { value: "$2.5k",  label: "$2,500",      sublabel: "High-volume kitchen"   },
  { value: "$5k+",   label: "$5,000+",     sublabel: "Multi-concept group"   },
];

const WASTE_MONTHLY: Record<WasteBucket, number> = {
  "<$500": 250,
  "$1k":   1000,
  "$2.5k": 2500,
  "$5k+":  5000,
};

// ─── Utility ──────────────────────────────────────────────────────────────────
function formatDollars(n: number): string {
  if (n >= 1000) return "$" + (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return "$" + Math.round(n).toLocaleString();
}

// ─── Step dots ────────────────────────────────────────────────────────────────
function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="sc-step-dots" aria-label={`Step ${step} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`sc-dot ${i < step ? "sc-dot--done" : i === step - 1 ? "sc-dot--active" : ""}`}
        />
      ))}
    </div>
  );
}

// ─── Animated pane variants ───────────────────────────────────────────────────
const paneVariants = {
  enter:  { opacity: 0, x: 32,  filter: "blur(4px)" },
  center: { opacity: 1, x: 0,   filter: "blur(0px)" },
  exit:   { opacity: 0, x: -32, filter: "blur(4px)" },
};

const paneTransition = { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] as const };

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SavingsCalculator() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    restaurantName:    "",
    establishmentType: "",
    laborHours:        6,
    wasteBucket:       "",
    email:             "",
  });

  // ── Formspree ───────────────────────────────────────────────────────────────
  const [state, formspreeSubmit] = useForm("xpqbnwby");

  // Advance to results screen when Formspree confirms success
  useEffect(() => {
    if (state.succeeded) go(5);
  }, [state.succeeded]);

  const TOTAL_STEPS = 4;

  // ── Validation ──────────────────────────────────────────────────────────────
  const canAdvance = (): boolean => {
    if (step === 1) return form.restaurantName.trim().length > 0 && form.establishmentType.length > 0;
    if (step === 2) return true;
    if (step === 3) return form.wasteBucket !== "";
    if (step === 4) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    return false;
  };

  const go = (next: number) => setStep(next);

  // ── ROI ─────────────────────────────────────────────────────────────────────
  const laborSavings = form.laborHours * 20 * 52;
  const monthlyWaste = form.wasteBucket ? WASTE_MONTHLY[form.wasteBucket] : 0;
  const wasteSavings = monthlyWaste * 0.30 * 12;
  const totalSavings = laborSavings + wasteSavings;

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const displayStep = step > 4 ? 4 : step;

  // ─── JSX ────────────────────────────────────────────────────────────────────
  return (
    <section className="sc-section" id="savings-calculator" aria-label="Savings Calculator">
      <div className="container">

        {/* Section header */}
        <div className="sc-header reveal">
          <span className="section-kicker">Free ROI Audit</span>
          <h2 className="sc-title">
            How much is your kitchen{" "}
            <em className="sc-title-em">leaving on the table?</em>
          </h2>
          <p className="sc-subtitle">
            Answer four questions. Get your personalised savings estimate — free, instant, no strings.
          </p>
        </div>

        {/* Card */}
        <div className="sc-card reveal">

          {/* Progress bar */}
          <div className="sc-progress-bar" aria-hidden="true">
            <motion.div
              className="sc-progress-fill"
              animate={{ width: `${(displayStep / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          <div className="sc-card-inner">

            {/* ── Left panel ── */}
            <div className="sc-left">
              <div className="sc-left-top">
                <span className="sc-audit-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  Premium Audit
                </span>
                <h3 className="sc-left-headline">Your Savings<br/>Report</h3>
                <p className="sc-left-body">
                  ShelfSmart customers cut labour overhead by an average of{" "}
                  <strong>4.2 hours</strong> per week and reduce food waste by up to{" "}
                  <strong>38%</strong> within 60 days.
                </p>
              </div>

              {/* Live preview tiles */}
              <div className="sc-tiles">
                <div className={`sc-tile ${step >= 2 ? "sc-tile--active" : ""}`}>
                  <span className="sc-tile-label">Labor savings / yr</span>
                  <span className="sc-tile-val">
                    {step >= 2 ? formatDollars(laborSavings) : "—"}
                  </span>
                </div>
                <div className={`sc-tile ${form.wasteBucket ? "sc-tile--active" : ""}`}>
                  <span className="sc-tile-label">Waste savings / yr</span>
                  <span className="sc-tile-val">
                    {form.wasteBucket ? formatDollars(wasteSavings) : "—"}
                  </span>
                </div>
                <div className={`sc-tile sc-tile--total ${form.wasteBucket ? "sc-tile--active" : ""}`}>
                  <span className="sc-tile-label">Est. total / yr</span>
                  <span className="sc-tile-val sc-tile-val--big">
                    {form.wasteBucket ? formatDollars(totalSavings) : "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Right panel ── */}
            <div className="sc-right">
              {step <= 4 && <StepDots step={displayStep} total={TOTAL_STEPS} />}

              <AnimatePresence mode="wait">

                {/* Step 1 */}
                {step === 1 && (
                  <motion.div key="s1" variants={paneVariants} initial="enter" animate="center" exit="exit" transition={paneTransition} className="sc-pane">
                    <p className="sc-step-kicker">Step 1 of 4</p>
                    <h4 className="sc-step-title">Tell us about your business.</h4>
                    <div className="sc-fields">
                      <div className="sc-field">
                        <label htmlFor="sc-name" className="sc-label">Restaurant name</label>
                        <input
                          id="sc-name"
                          type="text"
                          className="sc-input"
                          placeholder="The Golden Spoon"
                          value={form.restaurantName}
                          onChange={e => set("restaurantName", e.target.value)}
                          onKeyDown={e => { if (e.key === "Enter" && canAdvance()) go(2); }}
                          autoFocus
                        />
                      </div>
                      <div className="sc-field">
                        <span className="sc-label">Type of establishment</span>
                        <div className="sc-option-grid">
                          {ESTABLISHMENT_TYPES.map(t => (
                            <button
                              key={t}
                              type="button"
                              className={`sc-option ${form.establishmentType === t ? "sc-option--selected" : ""}`}
                              onClick={() => set("establishmentType", t)}
                            >{t}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="sc-cta" disabled={!canAdvance()} onClick={() => go(2)}>
                      Continue
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </motion.div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <motion.div key="s2" variants={paneVariants} initial="enter" animate="center" exit="exit" transition={paneTransition} className="sc-pane">
                    <p className="sc-step-kicker">Step 2 of 4</p>
                    <h4 className="sc-step-title">The Labor Factor.</h4>
                    <p className="sc-step-sub">
                      How many hours per week does your team spend on manual inventory?
                    </p>
                    <div className="sc-slider-wrap">
                      <div className="sc-slider-labels">
                        <span>0 hrs</span>
                        <span className="sc-slider-current">
                          <strong>{form.laborHours >= 20 ? "20+" : form.laborHours}</strong> hrs / wk
                        </span>
                        <span>20+ hrs</span>
                      </div>
                      <div className="sc-slider-track" style={{ "--sc-thumb-pct": `${(form.laborHours / 20) * 100}%` } as React.CSSProperties}>
                        <div className="sc-slider-fill" style={{ width: `${(form.laborHours / 20) * 100}%` }} />
                        <input
                          id="sc-labor"
                          type="range"
                          min={0} max={20} step={1}
                          value={form.laborHours}
                          onChange={e => set("laborHours", Number(e.target.value))}
                          className="sc-slider"
                          aria-label="Hours per week on manual inventory"
                        />
                      </div>
                      <p className="sc-slider-hint">
                        At $20/hr, that's{" "}
                        <strong>{formatDollars(laborSavings)} / yr</strong> in recoverable labour.
                      </p>
                    </div>
                    <div className="sc-nav-row">
                      <button className="sc-back" onClick={() => go(1)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Back
                      </button>
                      <button className="sc-cta" onClick={() => go(3)}>
                        Continue
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <motion.div key="s3" variants={paneVariants} initial="enter" animate="center" exit="exit" transition={paneTransition} className="sc-pane">
                    <p className="sc-step-kicker">Step 3 of 4</p>
                    <h4 className="sc-step-title">The Waste Factor.</h4>
                    <p className="sc-step-sub">
                      Estimated monthly loss from food waste &amp; spoilage?
                    </p>
                    <div className="sc-waste-grid">
                      {WASTE_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          className={`sc-waste-card ${form.wasteBucket === opt.value ? "sc-waste-card--selected" : ""}`}
                          onClick={() => set("wasteBucket", opt.value)}
                        >
                          <span className="sc-waste-val">{opt.label}</span>
                          <span className="sc-waste-sub">{opt.sublabel}</span>
                          {form.wasteBucket === opt.value && (
                            <span className="sc-waste-check" aria-hidden="true">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="sc-nav-row">
                      <button className="sc-back" onClick={() => go(2)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Back
                      </button>
                      <button className="sc-cta" disabled={!canAdvance()} onClick={() => go(4)}>
                        Continue
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4 */}
                {step === 4 && (
                  <motion.div key="s4" variants={paneVariants} initial="enter" animate="center" exit="exit" transition={paneTransition} className="sc-pane">
                    <p className="sc-step-kicker">Step 4 of 4</p>
                    <h4 className="sc-step-title">Get Your Report.</h4>
                    <p className="sc-step-sub">
                      We'll send your personalised savings breakdown to your inbox — free.
                    </p>
                    <form className="sc-fields" onSubmit={formspreeSubmit} noValidate>
                      {/* Hidden fields — all quiz data + computed savings sent to Formspree */}
                      <input type="hidden" name="_subject" value={`💡 Savings Audit — ${form.restaurantName}`} />
                      <input type="hidden" name="Restaurant Name" value={form.restaurantName} />
                      <input type="hidden" name="Establishment Type" value={form.establishmentType} />
                      <input type="hidden" name="Labor Hours/Week" value={form.laborHours} />
                      <input type="hidden" name="Monthly Waste Loss" value={form.wasteBucket} />
                      <input type="hidden" name="Annual Labor Savings" value={`$${Math.round(laborSavings).toLocaleString()}`} />
                      <input type="hidden" name="Annual Waste Savings" value={`$${Math.round(wasteSavings).toLocaleString()}`} />
                      <input type="hidden" name="Total Annual Savings" value={`$${Math.round(totalSavings).toLocaleString()}`} />

                      <div className="sc-field">
                        <label htmlFor="sc-email" className="sc-label">Work email address</label>
                        <input
                          id="sc-email"
                          type="email"
                          name="email"
                          className="sc-input"
                          placeholder="chef@restaurant.com"
                          value={form.email}
                          onChange={e => set("email", e.target.value)}
                          autoComplete="email"
                          required
                        />
                      </div>
                      <div className="sc-nav-row">
                        <button type="button" className="sc-back" onClick={() => go(3)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                          </svg>
                          Back
                        </button>
                        <button
                          type="submit"
                          className="sc-cta sc-cta--final"
                          disabled={!canAdvance() || state.submitting}
                        >
                          {state.submitting ? "Calculating…" : "Calculate My Annual Savings"}
                          {!state.submitting && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14M13 5l7 7-7 7"/>
                            </svg>
                          )}
                        </button>
                      </div>
                      {state.errors && (
                        <p className="sc-error">Something went wrong. Please try again.</p>
                      )}
                    </form>
                    <p className="sc-privacy">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      No spam. Your data is never sold.
                    </p>
                  </motion.div>
                )}

                {/* Step 5 — Results */}
                {step === 5 && (
                  <motion.div key="s5" variants={paneVariants} initial="enter" animate="center" exit="exit" transition={paneTransition} className="sc-pane">
                    <div className="sc-results">
                      <div className="sc-results-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      </div>
                      <h4 className="sc-results-headline">
                        ShelfSmart could save{" "}
                        <em>{form.restaurantName || "your kitchen"}</em>{" "}
                        approximately{" "}
                        <span className="sc-results-total">{formatDollars(totalSavings)}</span>
                        {" "}per year.
                      </h4>
                      <div className="sc-results-breakdown">
                        <div className="sc-result-row">
                          <span className="sc-result-label">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            Labor savings
                          </span>
                          <span className="sc-result-val">{formatDollars(laborSavings)} / yr</span>
                        </div>
                        <div className="sc-result-row">
                          <span className="sc-result-label">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            Waste reduction
                          </span>
                          <span className="sc-result-val">{formatDollars(wasteSavings)} / yr</span>
                        </div>
                        <div className="sc-result-divider" />
                        <div className="sc-result-row sc-result-row--total">
                          <span className="sc-result-label">Total est. savings</span>
                          <span className="sc-result-val sc-result-val--total">{formatDollars(totalSavings)} / yr</span>
                        </div>
                      </div>
                      <p className="sc-results-note">
                        A full breakdown has been sent to <strong>{form.email}</strong>. Our team will be in touch within 24 hours.
                      </p>
                      <a href="#waitlist" className="sc-cta sc-cta--final" style={{ textDecoration: "none", display: "inline-flex" }}>
                        Join the waitlist — get priority access
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 5l7 7-7 7"/>
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
