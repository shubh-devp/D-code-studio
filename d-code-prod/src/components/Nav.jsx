import { useState, useEffect, useCallback } from "react";
import { C, EASE } from "../constants/theme";
import { GradientText, MagneticBtn } from "./Primitives";
import { useScrollLock } from "../hooks/useUiHooks";

const LINKS = [
  { label: "Services", id: "services" },
  { label: "Work", id: "portfolio" },
  { label: "Process", id: "process" },
  { label: "Team", id: "team" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useScrollLock(open);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Active-section highlighting via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scroll = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <nav
        aria-label="Primary"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 5vw",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(6,8,16,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
          borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
          transition: `background 0.4s ${EASE.out}, border-color 0.4s ${EASE.out}, backdrop-filter 0.4s ${EASE.out}`,
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="D-Code Studio, back to top"
          style={{
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "-0.02em",
            cursor: "pointer",
            background: "none",
            border: "none",
            color: C.text,
            padding: 0,
          }}
        >
          <GradientText>D-Code</GradientText> Studio
        </button>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scroll(l.id)}
              aria-current={active === l.id ? "true" : undefined}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                color: active === l.id ? C.text : C.textMuted,
                fontSize: 14,
                cursor: "pointer",
                fontWeight: 500,
                padding: "4px 0",
                transition: `color 0.2s ${EASE.out}`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = active === l.id ? C.text : C.textMuted)}
            >
              {l.label}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: -2,
                  height: 2,
                  width: active === l.id ? "100%" : "0%",
                  background: C.gradient,
                  borderRadius: 2,
                  transition: `width 0.3s ${EASE.out}`,
                }}
              />
            </button>
          ))}
          <MagneticBtn primary style={{ padding: "10px 24px", fontSize: 14 }} onClick={() => scroll("contact")}>
            Get Started
          </MagneticBtn>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          style={{
            display: "none",
            background: "none",
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            width: 42,
            height: 42,
            color: C.text,
            cursor: "pointer",
            fontSize: 18,
            alignItems: "center",
            justifyContent: "center",
          }}
          className="mobile-menu-btn"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        style={{
          position: "fixed",
          inset: 0,
          top: 68,
          zIndex: 99,
          background: "rgba(6,8,16,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "32px 6vw",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          transform: open ? "translateY(0)" : "translateY(-12px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: `opacity 0.3s ${EASE.out}, transform 0.3s ${EASE.out}`,
        }}
      >
        {LINKS.map((l, i) => (
          <button
            key={l.id}
            onClick={() => scroll(l.id)}
            tabIndex={open ? 0 : -1}
            style={{
              background: "none",
              border: "none",
              borderBottom: `1px solid ${C.border}`,
              color: C.text,
              fontSize: 18,
              fontWeight: 600,
              cursor: "pointer",
              textAlign: "left",
              padding: "16px 0",
              opacity: open ? 1 : 0,
              transform: open ? "translateX(0)" : "translateX(-12px)",
              transition: `opacity 0.3s ${EASE.out} ${0.05 * i + 0.05}s, transform 0.3s ${EASE.out} ${0.05 * i + 0.05}s`,
            }}
          >
            {l.label}
          </button>
        ))}
        <div style={{ marginTop: 24 }}>
          <MagneticBtn primary style={{ width: "100%" }} onClick={() => scroll("contact")}>
            Get Started
          </MagneticBtn>
        </div>
      </div>
    </>
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const fn = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const s = document.documentElement.scrollTop;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? (s / h) * 100 : 0);
        raf = 0;
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 3, pointerEvents: "none" }} aria-hidden="true">
      <div style={{ height: "100%", width: `${progress}%`, background: C.gradient, transition: "width 0.1s linear" }} />
    </div>
  );
}
