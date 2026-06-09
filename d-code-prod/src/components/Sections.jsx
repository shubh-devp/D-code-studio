import React, { useState } from "react";
import { C } from "../constants/theme";
import { useInView, useCounter } from "../hooks/useUiHooks";
import { FadeUp, GradientText, SectionLabel, GlassCard } from "./Primitives";

/* ─── Stats ──────────────────────────────────────────────── */
export function Stats() {
  const [ref, inView] = useInView();
  const stats = [
    { value: 200, suffix: "+", label: "Projects Delivered", sub: "Across 12 countries" },
    { value: 98,  suffix: "%", label: "Client Retention",   sub: "Long-term partnerships" },
    { value: 50,  suffix: "+", label: "Expert Team Members",sub: "Specialists & creatives" },
    { value: 8,   suffix: "yr",label: "Industry Experience",sub: "Founded 2016" },
  ];
  return (
    <section
      ref={ref}
      aria-label="Company statistics"
      style={{
        padding: "clamp(48px, 8vw, 80px) 6vw",
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "clamp(24px, 5vw, 48px)",
        textAlign: "center",
      }}>
        {stats.map((s, i) => (
          <StatItem key={s.label} stat={s} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ stat, index, inView }) {
  const count = useCounter(stat.value, inView);
  return (
    <FadeUp delay={index * 0.1}>
      <div
        aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
        style={{ fontWeight: 800, fontSize: "clamp(2.4rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
      >
        <GradientText>{count}{stat.suffix}</GradientText>
      </div>
      <div style={{ fontWeight: 600, fontSize: 15, color: C.text, margin: "8px 0 4px" }}>{stat.label}</div>
      <div style={{ fontSize: 13, color: C.textMuted }}>{stat.sub}</div>
    </FadeUp>
  );
}

/* ─── Services ───────────────────────────────────────────── */
const SERVICES = [
  {
    icon: "📱",
    title: "Meta Ads Services",
    desc: "Performance-driven Meta advertising that fills your pipeline. Precision targeting, creative testing, and ROAS-focused campaigns.",
    tags: ["Facebook Ads", "Instagram Ads", "Retargeting"],
  },
  {
    icon: "🌐",
    title: "Website Development",
    desc: "High-converting, blazing-fast websites built with modern stacks. From landing pages to complex web applications.",
    tags: ["React / Next.js", "WordPress", "E-commerce"],
  },
  {
    icon: "🛍",
    title: "Shopify Development",
    desc: "Custom Shopify stores that convert browsers into buyers. Bespoke themes, apps, and store optimisation.",
    tags: ["Custom Themes", "Shopify Plus", "CRO"],
  },
  {
    icon: "⚡",
    title: "AI Automation",
    desc: "Automate repetitive workflows and unlock scale. Custom GPT agents, n8n pipelines, and intelligent business systems.",
    tags: ["GPT Agents", "n8n Workflows", "CRM"],
  },
];

export function Services() {
  return (
    <section id="services" aria-label="Our services" style={{ padding: "clamp(64px, 10vw, 120px) 6vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionLabel>What We Do</SectionLabel>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 16px",
          }}>
            Services Built for <GradientText>Ambitious Brands</GradientText>
          </h2>
          <p style={{
            textAlign: "center", color: C.textMuted,
            maxWidth: 560, margin: "0 auto", lineHeight: 1.7,
            fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
          }}>
            From your first ad to your tenth product line — we build the digital infrastructure that scales.
          </p>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: 24, marginTop: 48,
        }}>
          {SERVICES.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.07}>
              <GlassCard style={{ padding: "clamp(20px, 4vw, 32px)", height: "100%" }}>
                <div style={{ fontSize: 34, marginBottom: 16 }} role="img" aria-label={s.title}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, margin: "0 0 12px", color: C.text }}>
                  {s.title}
                </h3>
                <p style={{ color: C.textMuted, lineHeight: 1.7, marginBottom: 20, fontSize: 14 }}>
                  {s.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {s.tags.map((t) => (
                    <span key={t} style={{
                      padding: "4px 12px", borderRadius: 50,
                      fontSize: 12, fontWeight: 600,
                      background: "rgba(139,92,246,0.1)",
                      color: "#C4B5FD",
                      border: "1px solid rgba(139,92,246,0.2)",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Portfolio ───────────────────────────────────────────── */
const PROJECTS = [
  {
    cat: "Website",
    client: "Luxe Realty",
    title: "Premium Real Estate Portal",
    color: "#8B5CF6",
    result: "+340% leads",
    metric: "Lead Gen",
    desc: "End-to-end real estate portal with 3D property tours, advanced search filters, and a conversion-optimised lead funnel.",
    link: "#",
  },
  {
    cat: "E-commerce",
    client: "Bloom & Co",
    title: "Direct-to-Consumer Brand Scale",
    color: "#06B6D4",
    result: "₹2Cr revenue",
    metric: "Revenue",
    desc: "Custom Shopify store with subscription model, personalised UX, and Meta ad funnels driving consistent ₹2Cr+ monthly.",
    link: "#",
  },
  {
    cat: "AI Automation",
    client: "TechServe CRM",
    title: "Full CRM Automation Suite",
    color: "#10B981",
    result: "80% time saved",
    metric: "Efficiency",
    desc: "AI lead scoring, automated nurture sequences, and n8n pipelines replaced a 4-person ops team entirely.",
    link: "#",
  },
  {
    cat: "Website",
    client: "EduPrime",
    title: "EdTech Landing & Funnel",
    color: "#F59E0B",
    result: "6× ROAS",
    metric: "ROAS",
    desc: "Conversion-first landing page with A/B testing infrastructure, connected to Meta Ads, driving 6× return on ad spend.",
    link: "#",
  },
];

export function Portfolio() {
  const [active, setActive] = useState("All");
  const cats = ["All", "Website", "E-commerce", "AI Automation"];
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === active);

  return (
    <section id="portfolio" aria-label="Portfolio" style={{ padding: "clamp(64px, 10vw, 120px) 6vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionLabel>Our Work</SectionLabel>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 16px",
          }}>
            Projects That <GradientText>Moved the Needle</GradientText>
          </h2>

          {/* Filter tabs */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            style={{
              display: "flex", justifyContent: "center",
              gap: "clamp(8px, 2vw, 12px)", flexWrap: "wrap",
              margin: "32px 0 clamp(32px, 5vw, 56px)",
            }}
          >
            {cats.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => setActive(c)}
                style={{
                  padding: "8px clamp(14px, 3vw, 20px)",
                  borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer",
                  background: active === c ? C.gradient : "transparent",
                  border: `1px solid ${active === c ? "transparent" : C.border}`,
                  color: active === c ? "#fff" : C.textMuted,
                  transition: "all 0.25s ease",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: 24,
        }}>
          {filtered.map((p, i) => (
            <FadeUp key={p.client} delay={i * 0.08}>
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }) {
  return (
    <GlassCard style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Color block header */}
      <div style={{
        height: 180,
        background: `radial-gradient(ellipse at 30% 30%, ${p.color}30, transparent 70%),
          linear-gradient(135deg, ${p.color}15, ${C.bg})`,
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            padding: "10px 22px", borderRadius: 50,
            background: `${p.color}25`, border: `1px solid ${p.color}50`,
            color: p.color, fontWeight: 800, fontSize: 22, display: "inline-block",
          }}>
            {p.result}
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 8 }}>{p.metric}</div>
        </div>
        <span style={{
          position: "absolute", top: 14, left: 16,
          padding: "4px 12px", borderRadius: 50,
          background: "rgba(255,255,255,0.07)",
          border: `1px solid ${C.border}`,
          fontSize: 11, fontWeight: 600, color: C.textMuted,
          letterSpacing: "0.05em",
        }}>
          {p.cat}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: "clamp(16px, 4vw, 24px)", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>
          {p.client}
        </div>
        <h3 style={{ fontWeight: 700, fontSize: 18, color: C.text, margin: "0 0 10px" }}>
          {p.title}
        </h3>
        <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6, flex: 1 }}>
          {p.desc}
        </p>
        {p.link && p.link !== "#" && (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View case study for ${p.client}`}
            style={{
              marginTop: 16, display: "inline-flex", alignItems: "center",
              gap: 6, fontSize: 13, fontWeight: 600, color: "#C4B5FD",
              textDecoration: "none",
            }}
          >
            View Case Study →
          </a>
        )}
      </div>
    </GlassCard>
  );
}

/* ─── CaseStudies ─────────────────────────────────────────── */
export function CaseStudies() {
  const cases = [
    {
      brand: "EduPrime",
      category: "Digital Marketing",
      headline: "From ₹50K ad spend to ₹3L revenue monthly",
      metrics: [
        { label: "ROAS", value: "6×" },
        { label: "CPL Drop", value: "−42%" },
        { label: "Conv. Rate", value: "8.4%" },
      ],
      story: "EduPrime needed to scale paid acquisition without ballooning costs. We rebuilt their funnel from the ad creative down to the thank-you page — cutting cost-per-lead by 42% while growing volume 3×.",
      color: "#F59E0B",
    },
  ];

  return (
    <section
      id="case-studies"
      aria-label="Case studies"
      style={{
        padding: "clamp(64px, 10vw, 120px) 6vw",
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionLabel>Deep Dives</SectionLabel>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, marginBottom: 48,
          }}>
            <GradientText>Case Studies</GradientText>
          </h2>
        </FadeUp>

        {cases.map((c, i) => (
          <FadeUp key={i}>
            <GlassCard style={{ padding: "clamp(24px, 5vw, 48px)" }} hover={false}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                gap: "clamp(24px, 5vw, 48px)",
                alignItems: "center",
              }}>
                {/* Left: story */}
                <div>
                  <span style={{
                    display: "inline-block",
                    padding: "4px 12px", borderRadius: 50,
                    background: `${c.color}15`,
                    border: `1px solid ${c.color}40`,
                    color: c.color, fontSize: 12, fontWeight: 600,
                    marginBottom: 16, letterSpacing: "0.06em",
                  }}>
                    {c.category}
                  </span>
                  <h3 style={{
                    fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                    fontWeight: 700, color: C.text, marginBottom: 16,
                  }}>
                    {c.headline}
                  </h3>
                  <p style={{ color: C.textMuted, lineHeight: 1.7, fontSize: 14 }}>{c.story}</p>
                </div>

                {/* Right: metrics */}
                <div style={{
                  display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "flex-start",
                }}>
                  {c.metrics.map((m) => (
                    <div
                      key={m.label}
                      aria-label={`${m.label}: ${m.value}`}
                      style={{
                        padding: "clamp(16px, 3vw, 24px)",
                        background: `${c.color}12`,
                        border: `1px solid ${c.color}30`,
                        borderRadius: 16, textAlign: "center",
                        minWidth: 100, flex: "1 1 100px",
                      }}
                    >
                      <div style={{
                        fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        fontWeight: 800, color: c.color,
                      }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 6 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
