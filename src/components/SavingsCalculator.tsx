import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "@formspree/react";

type EstablishmentType = "Cafe / Quick Service" | "Casual" | "Fine Dining";
type PainPoint =
  | "Inaccurate Counts"
  | "Spoilage"
  | "High Labor Costs"
  | "Supplier Discrepancies"
  | "Theft/Shrinkage";

interface AuditFormData {
  restaurantName: string;
  establishmentType: EstablishmentType | "";
  hourlyWage: number;
  inventoryHours: number;
  wasteLbs: number;
  selectedHurdles: PainPoint[];
  email: string;
}

const ESTABLISHMENT_TYPES: EstablishmentType[] = [
  "Cafe / Quick Service",
  "Casual",
  "Fine Dining",
];

const PAIN_POINT_OPTIONS: PainPoint[] = [
  "Inaccurate Counts",
  "Spoilage",
  "High Labor Costs",
  "Supplier Discrepancies",
  "Theft/Shrinkage",
];

const WASTE_MULTIPLIER_PER_LB: Record<EstablishmentType, number> = {
  "Cafe / Quick Service": 3.0,
  Casual: 4.5,
  "Fine Dining": 7.5,
};

function formatDollars(n: number): string {
  if (n >= 1000) return "$" + (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return "$" + Math.round(n).toLocaleString();
}

function sliderPercent(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

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

const paneVariants = {
  enter: { opacity: 0, x: 32, filter: "blur(4px)" },
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -32, filter: "blur(4px)" },
};

const paneTransition = { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] as const };
const TOTAL_STEPS = 4;

export default function SavingsCalculator() {
  const [state, handleSubmit] = useForm("xpqbnwby");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<AuditFormData>({
    restaurantName: "",
    establishmentType: "",
    hourlyWage: 24,
    inventoryHours: 8,
    wasteLbs: 30,
    selectedHurdles: [],
    email: "",
  });

  const canAdvance = (): boolean => {
    if (step === 1) return form.restaurantName.trim().length > 0 && form.establishmentType.length > 0;
    if (step === 2) return true;
    if (step === 3) return Number.isFinite(form.wasteLbs) && form.wasteLbs >= 0;
    if (step === 4) {
      return form.selectedHurdles.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    }
    return false;
  };

  const go = (next: number) => setStep(next);

  const set = <K extends keyof AuditFormData>(key: K, val: AuditFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const toggleHurdle = (hurdle: PainPoint) => {
    setForm((prev) => ({
      ...prev,
      selectedHurdles: prev.selectedHurdles.includes(hurdle)
        ? prev.selectedHurdles.filter((h) => h !== hurdle)
        : [...prev.selectedHurdles, hurdle],
    }));
  };

  const wasteMultiplier = form.establishmentType ? WASTE_MULTIPLIER_PER_LB[form.establishmentType] : 0;
  const laborSavings = form.hourlyWage * form.inventoryHours * 52 * 0.7;
  const wasteSavings = form.wasteLbs * wasteMultiplier * 52 * 0.3;
  const totalSavings = laborSavings + wasteSavings;
  const showSidebarEstimates = step === 5;
  const encodedPainPoints = form.selectedHurdles.join(", ");

  const displayStep = step > TOTAL_STEPS ? TOTAL_STEPS : step;
  const waitlistHref = `/waitlist?email=${encodeURIComponent(form.email)}&name=${encodeURIComponent(form.restaurantName)}&restaurantName=${encodeURIComponent(form.restaurantName)}&savings=${encodeURIComponent(String(Math.round(totalSavings)))}&wage=${encodeURIComponent(String(form.hourlyWage))}&hours=${encodeURIComponent(String(form.inventoryHours))}&waste=${encodeURIComponent(String(form.wasteLbs))}&hurdles=${encodeURIComponent(encodedPainPoints)}&wasteLbs=${encodeURIComponent(String(form.wasteLbs))}&painPoints=${encodeURIComponent(encodedPainPoints)}`;

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void handleSubmit;
    if (!canAdvance()) return;
    go(5);
  };

  return (
    <section className="sc-section" id="savings-calculator" aria-label="Savings Calculator">
      <div className="container">
        <div className="sc-header">
          <span className="section-kicker">Comprehensive ROI Audit</span>
          <h2 className="sc-title">
            How much could ShelfSmart <em className="sc-title-em">save your kitchen?</em>
          </h2>
          <p className="sc-subtitle">
            Answer four quick prompts to see your annual upside from labor automation and lower waste.
          </p>
        </div>

        <div className="sc-card">
          <div className="sc-progress-bar" aria-hidden="true">
            <motion.div
              className="sc-progress-fill"
              animate={{ width: `${(displayStep / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          <div className="sc-card-inner">
            <div className="sc-left">
              <div className="sc-left-top">
                <span className="sc-audit-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  Calm Dashboard Audit
                </span>
                <h3 className="sc-left-headline">Annual Savings Projection</h3>
                <p className="sc-left-body">
                  Labor assumes a <strong>70% efficiency gain</strong>. Waste assumes a{" "}
                  <strong>30% reduction</strong> with category-based ingredient value.
                </p>
              </div>

              <div className="sc-tiles">
                <div className={`sc-tile ${step >= 2 ? "sc-tile--active" : ""}`}>
                  <span className="sc-tile-label">Labor savings / yr</span>
                  <span className="sc-tile-val">{showSidebarEstimates ? formatDollars(laborSavings) : "$ --"}</span>
                </div>
                <div className={`sc-tile ${step >= 3 ? "sc-tile--active" : ""}`}>
                  <span className="sc-tile-label">Waste savings / yr</span>
                  <span className="sc-tile-val">{showSidebarEstimates ? formatDollars(wasteSavings) : "$ --"}</span>
                </div>
                <div className={`sc-tile sc-tile--total ${step >= 3 ? "sc-tile--active" : ""}`}>
                  <span className="sc-tile-label">Total est. / yr</span>
                  <span className="sc-tile-val sc-tile-val--big">{showSidebarEstimates ? formatDollars(totalSavings) : "$ --"}</span>
                </div>
              </div>
            </div>

            <div className="sc-right">
              {step <= TOTAL_STEPS && <StepDots step={displayStep} total={TOTAL_STEPS} />}

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" variants={paneVariants} initial="enter" animate="center" exit="exit" transition={paneTransition} className="sc-pane">
                    <p className="sc-step-kicker">Step 1 of 4</p>
                    <h4 className="sc-step-title">Tell us about your operation.</h4>
                    <div className="sc-fields">
                      <div className="sc-field">
                        <label htmlFor="sc-name" className="sc-label">Restaurant name</label>
                        <input
                          id="sc-name"
                          type="text"
                          className="sc-input"
                          placeholder="The Golden Spoon"
                          value={form.restaurantName}
                          onChange={(e) => set("restaurantName", e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && canAdvance()) go(2);
                          }}
                          autoFocus
                        />
                      </div>

                      <div className="sc-field">
                        <span className="sc-label">Establishment type</span>
                        <div className="sc-option-grid">
                          {ESTABLISHMENT_TYPES.map((type) => (
                            <button
                              key={type}
                              type="button"
                              className={`sc-option ${form.establishmentType === type ? "sc-option--selected" : ""}`}
                              onClick={() => set("establishmentType", type)}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="sc-cta" disabled={!canAdvance()} onClick={() => go(2)}>
                      Continue
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" variants={paneVariants} initial="enter" animate="center" exit="exit" transition={paneTransition} className="sc-pane">
                    <p className="sc-step-kicker">Step 2 of 4</p>
                    <h4 className="sc-step-title">The Labor Factor.</h4>
                    <p className="sc-step-sub">Set your average wage and weekly inventory effort.</p>

                    <div className="sc-fields">
                      <div className="sc-slider-wrap">
                        <div className="sc-slider-labels">
                          <span>$15 / hr</span>
                          <span className="sc-slider-current">
                            <strong>${form.hourlyWage}</strong> / hr
                          </span>
                          <span>$60 / hr</span>
                        </div>
                        <div
                          className="sc-slider-track"
                          style={{ "--sc-thumb-pct": `${sliderPercent(form.hourlyWage, 15, 60)}%` } as React.CSSProperties}
                        >
                          <div className="sc-slider-fill" style={{ width: `${sliderPercent(form.hourlyWage, 15, 60)}%` }} />
                          <input
                            type="range"
                            min={15}
                            max={60}
                            step={1}
                            value={form.hourlyWage}
                            onChange={(e) => set("hourlyWage", Number(e.target.value))}
                            className="sc-slider"
                            aria-label="Average staff wage per hour"
                          />
                        </div>
                      </div>

                      <div className="sc-slider-wrap">
                        <div className="sc-slider-labels">
                          <span>0 hrs</span>
                          <span className="sc-slider-current">
                            <strong>{form.inventoryHours}</strong> hrs / wk
                          </span>
                          <span>40 hrs</span>
                        </div>
                        <div
                          className="sc-slider-track"
                          style={{ "--sc-thumb-pct": `${sliderPercent(form.inventoryHours, 0, 40)}%` } as React.CSSProperties}
                        >
                          <div className="sc-slider-fill" style={{ width: `${sliderPercent(form.inventoryHours, 0, 40)}%` }} />
                          <input
                            type="range"
                            min={0}
                            max={40}
                            step={1}
                            value={form.inventoryHours}
                            onChange={(e) => set("inventoryHours", Number(e.target.value))}
                            className="sc-slider"
                            aria-label="Weekly inventory hours"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sc-nav-row">
                      <button className="sc-back" onClick={() => go(1)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                      <button className="sc-cta" onClick={() => go(3)}>
                        Continue
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" variants={paneVariants} initial="enter" animate="center" exit="exit" transition={paneTransition} className="sc-pane">
                    <p className="sc-step-kicker">Step 3 of 4</p>
                    <h4 className="sc-step-title">The Waste Factor.</h4>
                    <p className="sc-step-sub">How many pounds of food are wasted each week?</p>

                    <div className="sc-fields">
                      <div className="sc-field">
                        <label htmlFor="sc-waste-lbs" className="sc-label">Weekly Food Waste (lbs)</label>
                        <input
                          id="sc-waste-lbs"
                          type="number"
                          min={0}
                          step={1}
                          className="sc-input"
                          value={form.wasteLbs}
                          onChange={(e) => set("wasteLbs", Number(e.target.value))}
                          placeholder="e.g. 30"
                        />
                      </div>
                    </div>

                    <p className="sc-slider-hint">We apply the waste conversion multiplier automatically based on your establishment type.</p>

                    <div className="sc-nav-row">
                      <button className="sc-back" onClick={() => go(2)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                      <button className="sc-cta" disabled={!canAdvance()} onClick={() => go(4)}>
                        Continue
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="s4" variants={paneVariants} initial="enter" animate="center" exit="exit" transition={paneTransition} className="sc-pane">
                    <p className="sc-step-kicker">Step 4 of 4</p>
                    <h4 className="sc-step-title">Your Biggest Inventory Hurdles.</h4>
                    <p className="sc-step-sub">Select all that apply, then enter your email for the full breakdown.</p>

                    <form className="sc-fields" onSubmit={handleCalculate} noValidate>
                      <div className="sc-field">
                        <span className="sc-label">Pain points (multi-select)</span>
                        <div className="sc-hurdle-grid">
                          {PAIN_POINT_OPTIONS.map((hurdle) => (
                            <button
                              key={hurdle}
                              type="button"
                              className={`sc-hurdle ${form.selectedHurdles.includes(hurdle) ? "sc-hurdle--selected" : ""}`}
                              onClick={() => toggleHurdle(hurdle)}
                            >
                              {hurdle}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="sc-field">
                        <label htmlFor="sc-email" className="sc-label">Work email address</label>
                        <input
                          id="sc-email"
                          type="email"
                          name="email"
                          className="sc-input"
                          placeholder="chef@restaurant.com"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          autoComplete="email"
                          required
                        />
                      </div>

                      <div className="sc-nav-row">
                        <button type="button" className="sc-back" onClick={() => go(3)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                          </svg>
                          Back
                        </button>
                        <button type="submit" className="sc-cta sc-cta--final" disabled={!canAdvance() || state.submitting}>
                          Calculate Annual Savings
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </form>

                    <p className="sc-privacy">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      No spam. Your data is never sold.
                    </p>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div key="s5" variants={paneVariants} initial="enter" animate="center" exit="exit" transition={paneTransition} className="sc-pane">
                    <div className="sc-results">
                      <div className="sc-results-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <h4 className="sc-results-headline">
                        ShelfSmart could save <em>{form.restaurantName || "your kitchen"}</em> approximately{" "}
                        <span className="sc-results-total">{formatDollars(totalSavings)}</span> per year.
                      </h4>

                      <div className="sc-results-breakdown">
                        <div className="sc-result-row">
                          <span className="sc-result-label">Labor savings</span>
                          <span className="sc-result-val">{formatDollars(laborSavings)} / yr</span>
                        </div>
                        <div className="sc-result-row">
                          <span className="sc-result-label">
                            {form.hourlyWage}/hr x {form.inventoryHours} hrs/wk x 52 x 70%
                          </span>
                          <span className="sc-result-val">{formatDollars(laborSavings)}</span>
                        </div>

                        <div className="sc-result-divider" />

                        <div className="sc-result-row">
                          <span className="sc-result-label">Waste savings</span>
                          <span className="sc-result-val">{formatDollars(wasteSavings)} / yr</span>
                        </div>
                        <div className="sc-result-row">
                          <span className="sc-result-label">
                            {form.wasteLbs} lbs/wk x ${wasteMultiplier.toFixed(2)}/lb x 52 x 30%
                          </span>
                          <span className="sc-result-val">{formatDollars(wasteSavings)}</span>
                        </div>

                        <div className="sc-result-divider" />
                        <div className="sc-result-row sc-result-row--total">
                          <span className="sc-result-label">Total annual savings</span>
                          <span className="sc-result-val sc-result-val--total">{formatDollars(totalSavings)} / yr</span>
                        </div>
                      </div>

                      <div className="sc-waitlist-hook">
                        <h5>Join our Waitlist</h5>
                        <p>Save your audit profile and get priority onboarding with founding-member pricing.</p>
                        <Link to={waitlistHref} className="sc-cta sc-cta--final" style={{ textDecoration: "none", display: "inline-flex" }}>
                          Join Waitlist & Save Audit
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
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
