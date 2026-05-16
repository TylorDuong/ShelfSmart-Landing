import { Link } from "react-router-dom";
import SavingsCalculator from "../components/SavingsCalculator";

export default function Audit() {
  return (
    <div className="ss2" style={{ minHeight: "100vh", padding: "28px 20px 56px" }}>
      <div className="container" style={{ marginBottom: 8 }}>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 500,
            color: "var(--muted)",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "var(--ink-new)")}
          onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Home
        </Link>
      </div>
      <SavingsCalculator />
    </div>
  );
}
