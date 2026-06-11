import { useState } from "react";
import { C, SP, T, RADIUS } from "../constants/theme";
import { useInView, useCounter } from "../hooks/useUiHooks";
import { Reveal, GradientText, SectionHeading, GlassCard, Section, Tag, Tilt3D } from "./Primitives";

function StatItem({ value, suffix, label, sub, inView, delay }) {
  const count = useCounter(value, inView);
  return (
    <Reveal delay={delay}>
      <div style={{ fontWeight: 800, fontSize: "clamp(2.4rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
        <GradientText>{count}{suffix}</GradientText>
      </div>
      <div style={{ fontWeight: 600, fontSize: 16, color: C.text, margin: "8px 0 4px" }}>{label}</div>
      <div style={{ fontSize: 13, color: C.textMuted }}>{sub}</div>
    </Reveal>
  );
}

export function Stats() {
  const [ref, inView] = useInView();
  const stats = [
    { value: 200, suffix: "+", label: "Projects Delivered", sub: "Across 12 countries" },
    { value: 98, suffix: "%", label: "Client Retention", sub: "Long-term partnerships" },
    { value: 50, suffix: "+", label: "Expert Team Members", sub: "Specialists & creatives" },
    { value: 8, suffix: "yr", label: "Industry Experience", sub: "Founded 2016" },
  ];
  return (
    <section ref={ref} aria-label="Key metrics" style={{ padding: `${SP["4xl"]}px 5vw`, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: SP["2xl"], textAlign: "center" }}>
        {stats.map((s, i) => (
          <StatItem key={s.label} {...s} inView={inView} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: "📱", title: "Meta Ads Services", desc: "Performance-driven Meta advertising that fills your pipeline. Precision targeting, creative testing, and ROAS-focused campaigns.", tags: ["Facebook Ads", "Instagram Ads", "Retargeting"] },
  { icon: "🌐", title: "Website Development", desc: "High-converting, blazing-fast websites built with modern stacks. From landing pages to complex web applications.", tags: ["React / Next.js", "WordPress", "E-commerce"] },
  { icon: "🛍", title: "Shopify Development", desc: "Custom Shopify stores that convert browsers into buyers. Bespoke themes, apps, and store optimisation.", tags: ["Custom Themes", "Shopify Plus", "CRO"] },
  { icon: "⚡", title: "AI Automation", desc: "Automate repetitive workflows and unlock scale. Custom GPT agents, n8n pipelines, and intelligent business systems.", tags: ["GPT Agents", "n8n Workflows", "CRM"] },
];

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        label="What We Do"
        title={<>Services Built for <GradientText>Ambitious Brands</GradientText></>}
        subtitle="Full-stack growth — from the first ad impression to a polished product experience."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: SP.lg, marginTop: SP["2xl"] }}>
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.07}>
            <Tilt3D>
              <GlassCard style={{ padding: SP.xl, height: "100%" }}>
                <div style={{ fontSize: 34, marginBottom: SP.md, lineHeight: 1 }} aria-hidden="true">{s.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: `0 0 ${SP.sm}px`, color: C.text }}>{s.title}</h3>
                <p style={{ color: C.textMuted, lineHeight: 1.7, marginBottom: SP.lg, fontSize: 15 }}>{s.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {s.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </GlassCard>
            </Tilt3D>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const PROJECTS = [
  { cat: "Website", title: "Luxe Realty", color: "#8B5CF6", result: "+340% leads", desc: "Premium real estate portal with immersive 3D property tours." },
  { cat: "E-commerce", title: "Bloom & Co", color: "#06B6D4", result: "₹2Cr revenue", desc: "Direct-to-consumer Shopify brand scaling rapidly across India." },
  { cat: "AI Automation", title: "TechServe CRM", color: "#10B981", result: "80% time saved", desc: "Full CRM automation with AI lead scoring and routing." },
  { cat: "Website", title: "Northwind SaaS", color: "#F59E0B", result: "2.1s → 0.6s", desc: "Marketing site rebuild with a 3.5× faster load time." },
  { cat: "E-commerce", title: "Vanta Apparel", color: "#EC4899", result: "+62% AOV", desc: "Headless storefront with personalised product bundles." },
  { cat: "AI Automation", title: "EduPrime Bot", color: "#06B6D4", result: "24/7 support", desc: "GPT support agent resolving 70% of tickets autonomously." },
];

export function Portfolio() {
  const [active, setActive] = useState("All");
  const cats = ["All", "Website", "E-commerce", "AI Automation"];
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === active);

  return (
    <Section id="portfolio">
      <SectionHeading
        label="Our Work"
        title={<>Projects That <GradientText>Moved the Needle</GradientText></>}
      />
      <div role="tablist" aria-label="Filter projects" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", margin: `${SP.xl}px 0 ${SP["2xl"]}px` }}>
        {cats.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            style={{
              padding: "8px 20px",
              borderRadius: RADIUS.pill,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: SP.lg }}>
        {filtered.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <Tilt3D max={8}>
              <GlassCard style={{ overflow: "hidden", height: "100%" }}>
                <div style={{ height: 200, background: `radial-gradient(ellipse at 30% 30%, ${p.color}30, transparent 70%), linear-gradient(135deg, ${p.color}15, ${C.bg})`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ padding: "8px 18px", borderRadius: RADIUS.pill, background: `${p.color}25`, border: `1px solid ${p.color}50`, color: p.color, fontWeight: 700, fontSize: 22 }}>{p.result}</div>
                  <span style={{ position: "absolute", top: 14, left: 14, fontSize: 12, fontWeight: 600, color: C.textMuted, background: "rgba(0,0,0,0.35)", padding: "4px 10px", borderRadius: RADIUS.pill }}>{p.cat}</span>
                </div>
                <div style={{ padding: SP.lg }}>
                  <h3 style={{ fontWeight: 700, fontSize: 20, color: C.text }}>{p.title}</h3>
                  <p style={{ color: C.textMuted, fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </GlassCard>
            </Tilt3D>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const CASES = [
  {
    brand: "EduPrime",
    category: "Performance Marketing",
    headline: "From ₹50K ad spend to ₹3L revenue monthly",
    story: "EduPrime needed to scale paid acquisition without blowing up CAC. We rebuilt their funnel, creative system, and attribution — then scaled spend 6× while holding ROAS.",
    metrics: [{ label: "ROAS", value: "6×" }, { label: "CAC", value: "-38%" }, { label: "Leads/mo", value: "1,200+" }],
    color: "#F59E0B",
  },
  {
    brand: "Bloom & Co",
    category: "E-commerce",
    headline: "₹2Cr in first-year DTC revenue",
    story: "A custom Shopify Plus build plus a retention-first email/SMS engine took Bloom & Co from launch to eight figures in twelve months.",
    metrics: [{ label: "Revenue", value: "₹2Cr" }, { label: "Repeat rate", value: "41%" }, { label: "Conv. rate", value: "3.8%" }],
    color: "#06B6D4",
  },
];

export function CaseStudies() {
  return (
    <Section id="case-studies" alt>
      <SectionHeading label="Proof" title={<>Real <GradientText>Case Studies</GradientText></>} />
      <div style={{ display: "grid", gap: SP.lg, marginTop: SP["2xl"] }}>
        {CASES.map((c) => (
          <Reveal key={c.brand}>
            <GlassCard hover={false} style={{ padding: "clamp(28px, 5vw, 48px)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: SP["2xl"], alignItems: "center" }} className="case-grid">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: SP.md }}>
                    <span style={{ fontWeight: 700, color: c.color }}>{c.brand}</span>
                    <span style={{ color: C.textDim }}>•</span>
                    <span style={{ fontSize: 13, color: C.textMuted }}>{c.category}</span>
                  </div>
                  <h3 style={{ fontSize: T.h3, fontWeight: 700, lineHeight: 1.3, margin: `0 0 ${SP.sm}px` }}>{c.headline}</h3>
                  <p style={{ color: C.textMuted, lineHeight: 1.7 }}>{c.story}</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: SP.sm }}>
                  {c.metrics.map((m) => (
                    <div key={m.label} style={{ padding: "18px 12px", background: `${c.color}12`, border: `1px solid ${c.color}30`, borderRadius: RADIUS.sm, textAlign: "center" }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: c.color }}>{m.value}</div>
                      <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4, letterSpacing: "0.02em" }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
