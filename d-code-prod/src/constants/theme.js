export const C = {
  bg: "#060810",
  bgAlt: "rgba(255,255,255,0.012)",
  bgCard: "rgba(255,255,255,0.035)",
  bgCardHover: "rgba(255,255,255,0.065)",
  border: "rgba(255,255,255,0.08)",
  borderHover: "rgba(139,92,246,0.5)",
  accent: "#8B5CF6",
  accentGlow: "rgba(139,92,246,0.3)",
  accentAlt: "#06B6D4",
  accentAltGlow: "rgba(6,182,212,0.25)",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  textDim: "#475569",
  gradient: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)",
  gradientText: "linear-gradient(135deg, #C4B5FD 0%, #67E8F9 100%)",
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
  "5xl": 120,
};

// Type scale (clamp = fluid responsive)
export const T = {
  display: "clamp(2.8rem, 7vw, 5.5rem)",
  h1: "clamp(2.2rem, 5vw, 3.5rem)",
  h2: "clamp(1.9rem, 4vw, 3rem)",
  h3: "clamp(1.25rem, 2vw, 1.5rem)",
  body: "clamp(1rem, 1.4vw, 1.125rem)",
  small: 14,
  eyebrow: 13,
};

export const RADIUS = { sm: 10, md: 16, lg: 20, xl: 28, pill: 50 };

export const SHADOW = {
  card: "0 4px 24px rgba(0,0,0,0.25)",
  cardHover: "0 24px 60px rgba(139,92,246,0.18)",
  glow: "0 0 40px rgba(139,92,246,0.3)",
};

export const EASE = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
};

export const MAXW = 1200;
