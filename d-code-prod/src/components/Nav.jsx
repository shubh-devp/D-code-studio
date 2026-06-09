import React, { useState, useEffect, useRef } from "react";
import { C } from "../constants/theme";
import { GradientText, MagneticBtn } from "./Primitives";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!open) return;
    const fn = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = ["Services", "Portfolio", "About", "Team", "Contact"];
  const scroll = (id) => {
    document.getElementById(id.toLowerCase().replace(/ /g, "-"))?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <style>{`
        .nav-desktop-links { display: flex; }
        .nav-hamburger { display: none; }
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-12px); }
        }
      `}</style>

      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 5vw", height: 68, display: "flex",
          alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(6,8,16,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "none",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Logo */}
        <button
          aria-label="Go to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em", padding: 0,
          }}
        >
          <GradientText>D-Code</GradientText>
          <span style={{ color: C.text }}> Studio</span>
        </button>

        {/* Desktop links */}
        <div className="nav-desktop-links" style={{ gap: 32, alignItems: "center" }}>
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scroll(l)}
              aria-label={`Navigate to ${l}`}
              style={{
                background: "none", border: "none", color: C.textMuted,
                fontSize: 14, cursor: "pointer", fontWeight: 500,
                transition: "color 0.2s", padding: "4px 0",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
            >
              {l}
            </button>
          ))}
          <MagneticBtn
            primary
            style={{ padding: "10px 24px", fontSize: 14 }}
            onClick={() => scroll("Contact")}
            aria-label="Get started — navigate to contact"
          >
            Get Started
          </MagneticBtn>
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          style={{
            background: "none",
            border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "8px 14px",
            color: C.text, cursor: "pointer",
            fontSize: 18, lineHeight: 1,
            alignItems: "center", justifyContent: "center",
            transition: "border-color 0.2s, background 0.2s",
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          style={{
            position: "fixed", top: 68, left: 0, right: 0,
            zIndex: 99,
            background: "rgba(6,8,16,0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: `1px solid ${C.border}`,
            padding: "28px 6vw 36px",
            display: "flex", flexDirection: "column", gap: 4,
            animation: "slideDown 0.28s ease",
          }}
        >
          {links.map((l, i) => (
            <button
              key={l}
              onClick={() => scroll(l)}
              style={{
                background: "none", border: "none",
                color: C.text, fontSize: 18, cursor: "pointer",
                fontWeight: 600, textAlign: "left",
                padding: "14px 0",
                borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : "none",
                transition: "color 0.2s",
                animationDelay: `${i * 0.04}s`,
              }}
            >
              {l}
            </button>
          ))}
          <div style={{ marginTop: 24 }}>
            <MagneticBtn primary onClick={() => scroll("Contact")} style={{ width: "100%" }}>
              Get Started →
            </MagneticBtn>
          </div>
        </div>
      )}
    </>
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      const s = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (s / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 3 }}
    >
      <div
        style={{
          height: "100%", width: `${progress}%`,
          background: C.gradient, transition: "width 0.1s",
        }}
      />
    </div>
  );
}
