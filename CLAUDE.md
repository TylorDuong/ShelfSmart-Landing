# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server on port 3000 (host `0.0.0.0`).
- `npm run build` — production build via Vite.
- `npm run preview` — serve the built `dist/`.
- `npm run lint` — type-check only (`tsc --noEmit`); there is no ESLint/Prettier config. Run this as the correctness gate after edits.
- `npm run clean` — removes `dist/` (uses `rm -rf`, so use a Unix-style shell on Windows).

There is no test runner configured.

## Environment

- `.env` / `.env.example` declare `GEMINI_API_KEY` and `APP_URL`; `vite.config.ts` exposes `GEMINI_API_KEY` via `process.env.GEMINI_API_KEY`. These are residue from the AI Studio template — no code currently reads them.
- `VITE_FORMSPREE_ENDPOINT` is the real runtime dependency. `Waitlist.tsx` and `Contact.tsx` POST form data to it. If unset, both forms **fake a success response after a 1s timeout** (development fallback) — when debugging form submission, verify the env var is actually set before assuming network/endpoint issues.

## Architecture

This is a single-page marketing site for ShelfSmart (AI inventory for restaurants), bootstrapped from a Google AI Studio React template. Despite the `@google/genai` and `express` dependencies in `package.json`, **there is no backend and no AI integration** — it's a pure static Vite/React app. Treat those deps as dead weight unless a task adds server/AI functionality.

- **Routing** — `src/App.tsx` mounts a `BrowserRouter` with three routes: `/` (`Home`), `/waitlist`, `/contact`. All navigation between them uses `react-router-dom` `<Link>`.
- **Pages live in `src/pages/`.** `Home.tsx` is a long single file containing every landing-page section (`Navbar`, `Hero`, `DashboardPreview`, `Features`, `HowItWorks`, `Testimonials`, `Footer`, plus the final CTA inline in the default export). Sections are **not** extracted into separate files — when editing one section, scroll within `Home.tsx` rather than hunting for a component file.
- **Animation** uses `motion/react` (the new Motion package, not `framer-motion`). Icons come from `lucide-react`.
- **Path alias** `@/*` → project root (configured in both `tsconfig.json` and `vite.config.ts`). Note this points to the repo root, not `src/`.
- **Logo assets** live in the top-level `Images/` directory (`logo-icon.png`, `logo-text.png`) and are imported with relative paths like `../../Images/logo-icon.png`.

## Styling system

Tailwind CSS v4 via the `@tailwindcss/vite` plugin — configuration is **CSS-first** in `src/index.css` using `@theme`, not a `tailwind.config.js`. When adding colors, fonts, or animations, extend the `@theme` block there.

Custom design tokens defined in `src/index.css` (use these utility classes rather than raw hex values):

- Colors: `mint` (`#F3FFEC`), `green-primary` (`#3DA35D`), `green-light` (`#96E072`), `coral` (`#F97C7C`), `text-dark` (`#1A3D2B`), `text-muted` (`#5A7A6A`).
- Fonts: `font-sans` (Inter), `font-display` (Outfit) — both loaded from Google Fonts at the top of `index.css`.
- Utility classes: `.glass-card` (white translucent card with blur), `.blob` (animated decorative blob), `.custom-scrollbar` (thin scrollbar for dashboard preview).

## Form handling pattern

Both `Waitlist.tsx` and `Contact.tsx` follow an identical pattern: local `status` state (`idle | submitting | success | error`), POST `FormData` to `VITE_FORMSPREE_ENDPOINT` with `Accept: application/json`, swap the form for a success card on 2xx. If you add another form, mirror this pattern — don't introduce a new form library.
