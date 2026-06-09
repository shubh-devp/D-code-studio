import React, { useState, useEffect } from "react";
import { C } from "../constants/theme";
import { GradientText, MagneticBtn } from "./Primitives";
import { mouseWorld } from "./ThreeScene";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  useEffect(() => {
    const fn = (e) => {
      mouseWorld.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseWorld.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const scroll = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      aria-label="Hero"
      style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        padding: "120px 6vw 80px", textAlign: "center",
      }}
    >
      {/* Decorative background glows */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(6,8,16,0.55) 100%)" }}
      />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "18%", left: "12%",
          width: "clamp(200px, 40vw, 520px)", height: "clamp(200px, 40vw, 520px)",
          background: "radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(48px)",
          animation: "float 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "18%", right: "8%",
          width: "clamp(160px, 32vw, 420px)", height: "clamp(160px, 32vw, 420px)",
          background: "radial-gradient(circle, rgba(6,182,212,0.11) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(48px)",
          animation: "float 10s ease-in-out infinite reverse",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      {/* Main content */}
      <div style={{
        maxWidth: 900, position: "relative", zIndex: 10,
        pointerEvents: "auto", width: "100%",
      }}>
        {/* Badge */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.2s",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 20px", borderRadius: 50,
            border: "1px solid rgba(139,92,246,0.4)",
            background: "rgba(139,92,246,0.08)",
            color: "#C4B5FD", fontSize: 12, fontWeight: 600,
            letterSpacing: "0.06em", marginBottom: 32,
          }}>
            <span aria-hidden="true" style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#A78BFA", display: "inline-block",
              animation: "pulse 2s infinite",
            }} />
            AWARD-WINNING DIGITAL STUDIO
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
          fontWeight: 800, lineHeight: 1.08,
          letterSpacing: "-0.03em", margin: "0 0 28px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease 0.4s",
        }}>
          We Build Digital<br />
          <GradientText>Experiences That</GradientText><br />
          Drive Real Growth
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
          color: C.textMuted, lineHeight: 1.7,
          maxWidth: 620, margin: "0 auto 44px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.6s",
          padding: "0 8px",
        }}>
          D-Code Studio crafts premium websites, digital marketing systems, and
          AI-powered automation for ambitious brands ready to dominate their market.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: 16, justifyContent: "center",
          flexWrap: "wrap", marginBottom: 64,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.8s",
        }}>
          <MagneticBtn
            primary
            onClick={() => scroll("contact")}
            aria-label="Start your project — scroll to contact form"
          >
            Start Your Project →
          </MagneticBtn>
          <MagneticBtn
            onClick={() => scroll("portfolio")}
            aria-label="View our portfolio work"
          >
            View Our Work
          </MagneticBtn>
        </div>

        {/* Quick stats */}
        <div
          role="list"
          aria-label="Key statistics"
          style={{
            display: "flex", gap: "clamp(20px, 5vw, 40px)",
            justifyContent: "center", flexWrap: "wrap",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 1s",
          }}
        >
          {[
            ["200+", "Projects Delivered"],
            ["98%", "Client Satisfaction"],
            ["5★", "Average Rating"],
            ["50+", "Team Members"],
          ].map(([n, l]) => (
            <div key={l} role="listitem" style={{ textAlign: "center", minWidth: 80 }}>
              <div
                aria-label={`${n} ${l}`}
                style={{
                  fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
                  fontWeight: 800,
                  background: C.gradientText,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {n}
              </div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2, whiteSpace: "nowrap" }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: loaded ? 0.5 : 0, transition: "opacity 1s ease 1.5s",
          animation: "bounce 2s ease-in-out infinite", zIndex: 10,
        }}
      >
        <span style={{ fontSize: 11, color: C.textMuted, letterSpacing: "0.1em" }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(${C.accent}, transparent)` }} />
      </div>
    </section>
  );
}
