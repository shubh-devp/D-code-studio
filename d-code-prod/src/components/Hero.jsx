import { useState, useEffect } from "react";
import { C, T, SP, RADIUS } from "../constants/theme";
import { GradientText, MagneticBtn } from "./Primitives";
import { useReducedMotion } from "../hooks/useUiHooks";
import { mouseWorld } from "../state/pointer";

const CLIENTS = ["Luxe Realty", "Bloom & Co", "TechServe", "EduPrime", "Northwind", "Vanta"];

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    let raf = 0;
    const fn = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        mouseWorld.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseWorld.y = -((e.clientY / window.innerHeight) * 2 - 1);
        raf = 0;
      });
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => {
      window.removeEventListener("mousemove", fn);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const reveal = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: reduced ? "none" : `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  });

  return (
    <section
      aria-label="Introduction"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "120px 5vw 64px",
        textAlign: "center",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(6,8,16,0.55) 100%)" }} />

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
        <div style={{ position: "absolute", top: "18%", left: "12%", width: 520, height: 520, background: "radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(48px)", animation: reduced ? "none" : "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "18%", right: "8%", width: 420, height: 420, background: "radial-gradient(circle, rgba(6,182,212,0.11) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(48px)", animation: reduced ? "none" : "float 10s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 60% 50% at 50% 45%, #000 30%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 45%, #000 30%, transparent 75%)" }} />
      </div>

      <div style={{ maxWidth: 920, position: "relative", zIndex: 10 }}>
        <div style={reveal(0.2)}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: RADIUS.pill, border: `1px solid rgba(139,92,246,0.4)`, background: "rgba(139,92,246,0.08)", color: "#C4B5FD", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", marginBottom: SP.xl }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#A78BFA", display: "inline-block", animation: reduced ? "none" : "pulse 2s infinite" }} />
            AWARD-WINNING DIGITAL STUDIO
          </div>
        </div>

        <h1 style={{ fontSize: T.display, fontWeight: 800, lineHeight: 1.07, letterSpacing: "-0.03em", margin: `0 0 ${SP.lg}px`, ...reveal(0.35) }}>
          We Build Digital <GradientText>Experiences</GradientText> That Drive Real Growth
        </h1>

        <p style={{ fontSize: T.body, color: C.textMuted, lineHeight: 1.7, maxWidth: 600, margin: `0 auto ${SP["2xl"]}px`, ...reveal(0.5) }}>
          D-Code Studio crafts premium websites, performance marketing, and AI-powered automation for ambitious brands ready to dominate their market.
        </p>

        <div style={{ display: "flex", gap: SP.md, justifyContent: "center", flexWrap: "wrap", marginBottom: SP["3xl"], ...reveal(0.65) }}>
          <MagneticBtn primary onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Start Your Project →
          </MagneticBtn>
          <MagneticBtn onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}>
            View Our Work
          </MagneticBtn>
        </div>

        <div style={{ display: "flex", gap: SP["2xl"], justifyContent: "center", flexWrap: "wrap", ...reveal(0.8) }}>
          {[["200+", "Projects Delivered"], ["98%", "Client Satisfaction"], ["5★", "Average Rating"], ["50+", "Team Members"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, background: C.gradientText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{n}</div>
              <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust / client logos strip */}
      <div style={{ position: "relative", zIndex: 10, marginTop: SP["3xl"], width: "100%", maxWidth: 980, ...reveal(0.95) }}>
        <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: C.textDim, marginBottom: SP.md }}>
          Trusted by ambitious teams
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: SP["2xl"], opacity: 0.7 }}>
          {CLIENTS.map((c) => (
            <span key={c} style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em", color: C.textMuted, whiteSpace: "nowrap" }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: loaded ? 0.5 : 0, transition: "opacity 1s ease 1.4s", animation: reduced ? "none" : "bounce 2s ease-in-out infinite", zIndex: 10 }} aria-hidden="true">
        <span style={{ fontSize: 12, color: C.textMuted, letterSpacing: "0.1em" }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(${C.accent}, transparent)` }} />
      </div>
    </section>
  );
}
