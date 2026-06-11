import { useState, useRef } from "react";
import { C, RADIUS, SHADOW, EASE, T, SP, MAXW } from "../constants/theme";
import { useInView, useReducedMotion } from "../hooks/useUiHooks";

export function Reveal({ children, delay = 0, y = 32, style = {}, as: Tag = "div" }) {
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
          : `opacity 0.7s ${EASE.out} ${delay}s, transform 0.7s ${EASE.out} ${delay}s`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// Back-compat alias
export const FadeUp = Reveal;

export function GradientText({ children, style = {} }) {
  return (
    <span
      style={{
        background: C.gradientText,
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
        padding: `${SP["5xl"]}px 5vw`,
        background: alt ? C.bgAlt : "transparent",
        ...style,
      }}
    >
      <div style={{ maxWidth: MAXW, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

export function SectionHeading({ label, title, subtitle, align = "center" }) {
  return (
    <Reveal style={{ textAlign: align, maxWidth: align === "center" ? 720 : "none", margin: align === "center" ? "0 auto" : 0 }}>
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2
        style={{
          fontSize: T.h2,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: 1.12,
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

export function GlassCard({ children, style = {}, hover = true, as: Tag = "div", ...rest }) {
  const [hov, setHov] = useState(false);
  const reduced = useReducedMotion();
  return (
    <Tag
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      onFocus={() => hover && setHov(true)}
      onBlur={() => hover && setHov(false)}
      style={{
        position: "relative",
        background: hov ? C.bgCardHover : C.bgCard,
        border: `1px solid ${hov ? C.borderHover : C.border}`,
        borderRadius: RADIUS.md,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: reduced ? "none" : `background 0.3s ${EASE.out}, border-color 0.3s ${EASE.out}, transform 0.3s ${EASE.out}, box-shadow 0.3s ${EASE.out}`,
        transform: hov && !reduced ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov ? SHADOW.cardHover : SHADOW.card,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Interactive 3D perspective tilt with a moving glare highlight.
export function Tilt3D({ children, style = {}, max = 10, glare = true }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2, gx: px * 100, gy: py * 100, active: true });
  };
  const onLeave = () => setT({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        height: "100%",
        transformStyle: "preserve-3d",
        transform: reduced
          ? "none"
          : `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(0) scale(${t.active ? 1.02 : 1})`,
        transition: t.active ? "transform 0.08s linear" : `transform 0.5s ${EASE.out}`,
        willChange: "transform",
        ...style,
      }}
    >
      {children}
      {glare && !reduced && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            opacity: t.active ? 1 : 0,
            transition: `opacity 0.4s ${EASE.out}`,
            background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(196,181,253,0.18), transparent 45%)`,
          }}
        />
      )}
    </div>
  );
}

export function MagneticBtn({ children, primary = false, onClick, style = {}, ariaLabel, type = "button" }) {
  const [hov, setHov] = useState(false);
  const [pull, setPull] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.45;
    setPull({ x, y });
  };
  const onLeave = () => {
    setHov(false);
    setPull({ x: 0, y: 0 });
  };

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      onMouseEnter={() => setHov(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "14px 32px",
        borderRadius: RADIUS.pill,
        border: primary ? "1px solid transparent" : `1px solid ${hov ? C.accent : C.border}`,
        background: primary
          ? hov
            ? "linear-gradient(135deg,#7C3AED,#0891B2)"
            : C.gradient
          : hov
          ? "rgba(139,92,246,0.12)"
          : "transparent",
        color: C.text,
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer",
        transition: pull.x === 0 && pull.y === 0 ? `transform 0.4s ${EASE.out}, box-shadow 0.25s ${EASE.out}, background 0.25s ${EASE.out}, border-color 0.25s ${EASE.out}` : `box-shadow 0.25s ${EASE.out}, background 0.25s ${EASE.out}`,
        transform: reduced ? "none" : `translate(${pull.x}px, ${pull.y}px) scale(${hov ? 1.04 : 1})`,
        boxShadow: primary ? (hov ? SHADOW.glow : "0 8px 24px rgba(139,92,246,0.25)") : "none",
        letterSpacing: "0.01em",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: SP.md }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 16px",
          borderRadius: RADIUS.pill,
          border: `1px solid rgba(139,92,246,0.35)`,
          background: "rgba(139,92,246,0.08)",
          color: "#C4B5FD",
          fontSize: T.eyebrow,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export function Tag({ children }) {
  return (
    <span
      style={{
        padding: "4px 12px",
        borderRadius: RADIUS.pill,
        fontSize: 12,
        fontWeight: 600,
        background: "rgba(139,92,246,0.1)",
        color: "#C4B5FD",
        border: "1px solid rgba(139,92,246,0.2)",
      }}
    >
      {children}
    </span>
  );
}
