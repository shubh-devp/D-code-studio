import { useState, useRef } from "react";
import { C, RADIUS, SHADOW, EASE, T, SP, MAXW } from "../constants/theme";
import { useInView, useReducedMotion } from "../hooks/useUiHooks";

/* Subtle fade/slide reveal on scroll. */
export function Reveal({ children, delay = 0, y = 22, style = {}, as: Tag = "div" }) {
  const [ref, inView] = useInView();
  const reduced = useReducedMotion();
  const shown = inView || reduced;
  return (
    <Tag
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: reduced
          ? "none"
          : `opacity 0.6s ${EASE.out} ${delay}s, transform 0.6s ${EASE.out} ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

export const FadeUp = Reveal;

/* Gradient clipped text. */
export function GradientText({ children, style = {}, warm = false }) {
  return (
    <span
      style={{
        background: warm ? C.gradientWarm : C.gradientText,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function Section({ id, children, alt = false, style = {}, ariaLabel }) {
  return (
    <section
      id={id}
      aria-label={ariaLabel || (id ? id.replace(/-/g, " ") : undefined)}
      style={{
        position: "relative",
        padding: `clamp(64px, 9vw, ${SP["5xl"]}px) 5vw`,
        background: alt ? C.bgAlt : "transparent",
        ...style,
      }}
    >
      <div style={{ maxWidth: MAXW, margin: "0 auto", position: "relative", zIndex: 1 }}>{children}</div>
    </section>
  );
}

export function SectionLabel({ children, align = "center" }) {
  return (
    <div style={{ display: "flex", justifyContent: align === "center" ? "center" : "flex-start", marginBottom: SP.md }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 14px",
          borderRadius: RADIUS.pill,
          border: `1px solid ${C.border}`,
          background: C.primarySoft,
          color: "#C4B5FD",
          fontSize: T.eyebrow,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gradient }} />
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({ label, title, subtitle, align = "center" }) {
  return (
    <Reveal
      style={{
        textAlign: align,
        maxWidth: align === "center" ? 700 : "none",
        margin: align === "center" ? "0 auto" : 0,
      }}
    >
      {label && <SectionLabel align={align}>{label}</SectionLabel>}
      <h2
        style={{
          fontSize: T.h2,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.12,
          color: C.text,
          margin: `0 0 ${SP.md}px`,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: C.textMuted, fontSize: T.body, lineHeight: 1.7, margin: 0 }}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* Glassmorphism card with a cursor-tracking spotlight and gradient-border glow on hover. */
export function GlassCard({ children, style = {}, hover = true, spotlight = true, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [hov, setHov] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const reduced = useReducedMotion();

  const onMove = (e) => {
    if (!spotlight || reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const lift = hov && hover && !reduced;
  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      onFocus={() => hover && setHov(true)}
      onBlur={() => hover && setHov(false)}
      style={{
        position: "relative",
        background: C.glass,
        border: `1px solid ${hov && hover ? C.borderStrong : C.border}`,
        borderRadius: RADIUS.lg,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        transition: reduced
          ? "none"
          : `border-color 0.3s ${EASE.out}, transform 0.3s ${EASE.out}, box-shadow 0.3s ${EASE.out}`,
        transform: lift ? "translateY(-4px)" : "translateY(0)",
        boxShadow: lift ? SHADOW.cardHover : SHADOW.card,
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {spotlight && !reduced && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            opacity: hov ? 1 : 0,
            transition: `opacity 0.4s ${EASE.out}`,
            background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(124,58,237,0.18), rgba(6,182,212,0.08) 40%, transparent 65%)`,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>{children}</div>
    </Tag>
  );
}

/* Card wrapped in a gradient border (for hero / feature emphasis). */
export function GradientBorderCard({ children, style = {}, padding = 1, radius = RADIUS.lg, ...rest }) {
  return (
    <div
      style={{
        borderRadius: radius + padding,
        padding,
        background: C.gradientBorder,
        boxShadow: SHADOW.glow,
        ...style,
      }}
      {...rest}
    >
      <div style={{ borderRadius: radius, background: C.surface, height: "100%" }}>{children}</div>
    </div>
  );
}

/* Plain pass-through (Tilt3D removed; kept for call-site compatibility). */
export function Tilt3D({ children, style = {} }) {
  return <div style={{ height: "100%", ...style }}>{children}</div>;
}

/* Premium button — gradient primary or glass-outline secondary. */
export function MagneticBtn({ children, primary = false, onClick, style = {}, ariaLabel, type = "button" }) {
  const [hov, setHov] = useState(false);
  const reduced = useReducedMotion();
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "13px 26px",
        borderRadius: RADIUS.pill,
        border: primary ? "1px solid transparent" : `1px solid ${hov ? C.borderStrong : C.border}`,
        background: primary ? C.gradient : hov ? C.glassHi : C.glass,
        backdropFilter: primary ? "none" : "blur(10px)",
        WebkitBackdropFilter: primary ? "none" : "blur(10px)",
        color: "#fff",
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer",
        transition: reduced ? "none" : `transform 0.2s ${EASE.out}, box-shadow 0.25s ${EASE.out}, background 0.25s ${EASE.out}, border-color 0.25s ${EASE.out}`,
        transform: hov && !reduced ? "translateY(-2px)" : "translateY(0)",
        boxShadow: primary ? (hov ? SHADOW.glow : "0 8px 24px rgba(124,58,237,0.32)") : "none",
        letterSpacing: "0.005em",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* Accent pill tag. */
export function Tag({ children }) {
  return (
    <span
      style={{
        padding: "4px 12px",
        borderRadius: RADIUS.pill,
        fontSize: 12.5,
        fontWeight: 600,
        background: C.primarySoft,
        color: "#C4B5FD",
        border: `1px solid ${C.border}`,
      }}
    >
      {children}
    </span>
  );
}
