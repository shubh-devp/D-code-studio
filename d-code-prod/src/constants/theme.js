// "Midnight Luxury" — premium dark design system.
// Inspired by Linear / Raycast / Arc. CSS-only effects, no WebGL.
export const C = {
  // Surfaces
  bg: "#0B1020",          // page background — deep midnight
  bgAlt: "#0D1426",       // alternating band
  surface: "#111827",     // panels
  card: "#182235",        // raised cards
  cardHover: "#1C2942",

  // Brand
  primary: "#7C3AED",     // violet
  primaryBright: "#9F67FF",
  secondary: "#06B6D4",   // cyan
  accent: "#F59E0B",      // amber

  // Text
  text: "#F4F7FF",        // near-white
  textMuted: "#9AA7C2",   // muted slate-blue
  textDim: "#5B6781",     // captions / tertiary

  // Lines & tints
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.16)",
  glass: "rgba(24,34,53,0.55)",
  glassHi: "rgba(33,46,72,0.7)",
  primarySoft: "rgba(124,58,237,0.14)",
  secondarySoft: "rgba(6,182,212,0.12)",

  // Gradients
  gradient: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
  gradientText: "linear-gradient(135deg, #C4B5FD 0%, #67E8F9 60%, #FCD9A0 100%)",
  gradientBorder: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(6,182,212,0.5), rgba(245,158,11,0.4))",
  gradientWarm: "linear-gradient(135deg, #7C3AED 0%, #F59E0B 100%)",
};

// 4px-based spacing scale
export const SP = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
  "4xl": 96,
  "5xl": 128,
};

// Fluid responsive type scale
export const T = {
  display: "clamp(2.6rem, 6vw, 4.5rem)",
  h1: "clamp(2.1rem, 4.6vw, 3.2rem)",
  h2: "clamp(1.8rem, 3.6vw, 2.6rem)",
  h3: "clamp(1.2rem, 1.9vw, 1.45rem)",
  body: "clamp(1rem, 1.2vw, 1.0625rem)",
  small: 14,
  eyebrow: 12.5,
};

export const RADIUS = { sm: 10, md: 14, lg: 18, xl: 26, pill: 999 };

export const SHADOW = {
  xs: "0 1px 2px rgba(0,0,0,0.4)",
  card: "0 8px 30px rgba(0,0,0,0.35)",
  cardHover: "0 24px 60px rgba(8,12,28,0.6), 0 0 0 1px rgba(124,58,237,0.15)",
  glow: "0 0 50px rgba(124,58,237,0.35)",
  lg: "0 30px 80px rgba(0,0,0,0.5)",
};

export const EASE = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
};

export const MAXW = 1180;
