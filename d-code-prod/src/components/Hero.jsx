import { C, T, SP, RADIUS, SHADOW } from "../constants/theme";
import { MagneticBtn, GradientText, GradientBorderCard } from "./Primitives";

const CLIENTS = ["Luxe Realty", "Bloom & Co", "TechServe", "EduPrime", "Northwind", "Vanta"];

const HERO_STATS = [
  ["200+", "Projects delivered"],
  ["98%", "Client retention"],
  ["6×", "Avg. return on ad spend"],
  ["50+", "Specialists"],
];

/* Lightweight glass "product" preview — pure DOM, sells the premium feel. */
function PreviewPanel() {
  const bars = [62, 88, 45, 96, 73, 58, 81];
  return (
    <GradientBorderCard style={{ maxWidth: 760, margin: "0 auto", width: "100%" }} radius={RADIUS.xl} padding={1}>
      <div style={{ padding: "clamp(16px, 3vw, 26px)" }}>
        {/* window chrome */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: SP.lg }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.85 }} />
          ))}
          <span style={{ marginLeft: 10, fontSize: 12, color: C.textDim, fontWeight: 500 }}>dcode.studio / growth-dashboard</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: SP.sm, marginBottom: SP.lg }}>
          {[["Revenue", "₹2.1Cr", C.secondary], ["ROAS", "6.2×", C.primaryBright], ["Conv. rate", "3.8%", C.accent]].map(([l, v, col]) => (
            <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: RADIUS.md, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{l}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: col, letterSpacing: "-0.02em" }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: RADIUS.md, padding: "18px 18px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Monthly performance</span>
            <span style={{ fontSize: 11, color: "#34D399", fontWeight: 600 }}>▲ 38% vs last quarter</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120 }}>
            {bars.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: 6,
                  background: i === 3 ? C.gradient : "rgba(124,58,237,0.28)",
                  border: `1px solid ${i === 3 ? "transparent" : "rgba(124,58,237,0.35)"}`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </GradientBorderCard>
  );
}

export function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      aria-label="Introduction"
      style={{
        position: "relative",
        padding: "clamp(130px, 17vh, 190px) 5vw clamp(72px, 9vw, 110px)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            padding: "7px 16px",
            borderRadius: RADIUS.pill,
            border: `1px solid ${C.border}`,
            background: C.glass,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            color: C.textMuted,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: SP.xl,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34D399", display: "inline-block", animation: "pulseDot 2.4s infinite" }} />
          Now booking projects for Q3 2026
        </div>

        <h1
          style={{
            fontSize: T.display,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: "-0.035em",
            color: C.text,
            margin: `0 0 ${SP.lg}px`,
          }}
        >
          Digital products that drive{" "}
          <GradientText>real business growth</GradientText>
        </h1>

        <p
          style={{
            fontSize: T.body,
            color: C.textMuted,
            lineHeight: 1.75,
            maxWidth: 620,
            margin: `0 auto ${SP["2xl"]}px`,
          }}
        >
          D-Code Studio designs and builds premium websites, performance marketing, and
          AI automation for ambitious brands — measured in revenue, not deliverables.
        </p>

        <div
          style={{
            display: "flex",
            gap: SP.sm,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: SP["2xl"],
          }}
        >
          <MagneticBtn primary onClick={() => scrollTo("contact")}>
            Start your project →
          </MagneticBtn>
          <MagneticBtn onClick={() => scrollTo("portfolio")}>View our work</MagneticBtn>
        </div>
      </div>

      {/* Product preview */}
      <div style={{ marginTop: SP.xl, marginBottom: SP["3xl"] }}>
        <PreviewPanel />
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: SP.lg,
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        {HERO_STATS.map(([n, l]) => (
          <div key={l}>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, color: C.text, letterSpacing: "-0.025em" }} className="font-display">{n}</div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Trust strip */}
      <div style={{ marginTop: SP["3xl"], width: "100%", maxWidth: 960, marginInline: "auto" }}>
        <p style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textDim, marginBottom: SP.md, fontWeight: 600 }}>
          Trusted by ambitious teams
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: `${SP.lg}px ${SP["2xl"]}px` }}>
          {CLIENTS.map((c) => (
            <span key={c} style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", color: C.textDim, whiteSpace: "nowrap" }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
