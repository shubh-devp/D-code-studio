import React, { useState } from "react";
import { C } from "../constants/theme";
import { useInView } from "../hooks/useUiHooks";

/* ─── FadeUp ──────────────────────────────────────────────── */
export function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── GradientText ────────────────────────────────────────── */
export function GradientText({ children, style = {} }) {
  return (
    <span
      style={{
        background: C.gradientText,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ─── GlassCard ───────────────────────────────────────────── */
export function GlassCard({ children, style = {}, hover = true }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: hov ? C.bgCardHover : C.bgCard,
        border: `1px solid ${hov ? C.borderHover : C.border}`,
        borderRadius: 16,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? `0 20px 60px rgba(139,92,246,0.15)` : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── MagneticBtn ─────────────────────────────────────────── */
export function MagneticBtn({
  children,
  primary = false,
  onClick,
  style = {},
  disabled = false,
  type = "button",
  "aria-label": ariaLabel,
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type={type}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        padding: "14px 32px",
        borderRadius: 50,
        border: primary ? "none" : `1px solid ${hov ? C.accent : C.border}`,
        background: primary
          ? (hov ? "linear-gradient(135deg,#7C3AED,#0891B2)" : C.gradient)
          : (hov ? "rgba(139,92,246,0.1)" : "transparent"),
        color: C.text,
        fontWeight: 600, fontSize: 15, cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.25s ease",
        transform: hov && !disabled ? "scale(1.04)" : "scale(1)",
        boxShadow: primary && hov && !disabled ? `0 0 40px ${C.accentGlow}` : "none",
        letterSpacing: "0.02em",
        opacity: disabled ? 0.6 : 1,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ─── SectionLabel ────────────────────────────────────────── */
export function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      <span
        style={{
          padding: "6px 16px",
          borderRadius: 50,
          border: "1px solid rgba(139,92,246,0.35)",
          background: "rgba(139,92,246,0.08)",
          color: "#C4B5FD",
          fontSize: 12, fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}

/* ─── Tag ─────────────────────────────────────────────────── */
export function Tag({ children }) {
  return (
    <span
      style={{
        padding: "4px 12px", borderRadius: 50,
        fontSize: 12, fontWeight: 600,
        background: "rgba(139,92,246,0.1)",
        color: "#C4B5FD",
        border: "1px solid rgba(139,92,246,0.2)",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}
