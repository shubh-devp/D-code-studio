import React, { useState, useRef, useEffect } from "react";
import { C } from "../constants/theme";
import { FadeUp, GradientText, GlassCard, MagneticBtn, SectionLabel } from "./Primitives";
import { useInView, useCounter } from "../hooks/useUiHooks";

/* ─── About ──────────────────────────────────────────────────── */
export function About() {
  return (
    <section id="about" aria-label="About D-Code Studio" style={{ padding: "clamp(64px, 10vw, 120px) 6vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionLabel>About D-Code Studio</SectionLabel>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 16px",
          }}>
            Not Just an Agency. <GradientText>A Growth Partner.</GradientText>
          </h2>
          <p style={{
            textAlign: "center", color: C.textMuted, maxWidth: 660,
            margin: "0 auto 64px", lineHeight: 1.8,
            fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
          }}>
            Founded in 2016 in Pune, D-Code Studio was born from a single belief: that great design
            and smart technology should drive measurable business outcomes — not just look beautiful.
          </p>
        </FadeUp>

        {/* Mission / Vision / Values grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          gap: 24, marginBottom: 64,
        }}>
          {[
            {
              icon: "🎯",
              label: "Our Mission",
              text: "Empower ambitious brands with digital systems that attract, convert, and retain customers at scale — with transparency, speed, and precision.",
            },
            {
              icon: "🚀",
              label: "Our Vision",
              text: "Become South Asia's most trusted full-stack digital growth studio, known for ROI-first thinking and world-class execution.",
            },
            {
              icon: "🤝",
              label: "Why Clients Trust Us",
              text: "We embed inside your team, share the same goals, and only win when you win. No retainer-padding. No vanity metrics.",
            },
          ].map((item, i) => (
            <FadeUp key={item.label} delay={i * 0.08}>
              <GlassCard style={{ padding: "clamp(20px, 4vw, 32px)", height: "100%" }}>
                <div style={{ fontSize: 32, marginBottom: 14 }} role="img" aria-label={item.label}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 10 }}>{item.label}</h3>
                <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{item.text}</p>
              </GlassCard>
            </FadeUp>
          ))}
        </div>

        {/* CTA row */}
        <FadeUp>
          <div style={{ textAlign: "center" }}>
            <MagneticBtn
              primary
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              aria-label="Start a conversation with D-Code Studio"
            >
              Let's Talk Strategy →
            </MagneticBtn>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── WhyUs ───────────────────────────────────────────────── */
export function WhyUs() {
  const reasons = [
    { icon: "📊", title: "ROI-First Approach", desc: "Every decision is tied to a revenue metric. We kill vanity projects before they waste your budget." },
    { icon: "⚡", title: "Rapid Execution", desc: "Avg. 14-day launch for landing pages. Full websites in 4–6 weeks. AI automation in 2 weeks." },
    { icon: "🔒", title: "Radical Transparency", desc: "Weekly loom updates, shared dashboards, and Slack access to your team — no black boxes." },
    { icon: "🧠", title: "Full-Stack Expertise", desc: "Design, dev, ads, AI — under one roof. No outsourcing, no handoff friction." },
    { icon: "📈", title: "Proven Track Record", desc: "200+ projects delivered. ₹15Cr+ in client revenue generated. References available." },
    { icon: "🌐", title: "Global Experience", desc: "Clients in India, UAE, UK, US, and Australia. We understand cross-market nuance." },
  ];

  return (
    <section id="why-choose-us" aria-label="Why choose D-Code Studio" style={{ padding: "clamp(64px, 10vw, 120px) 6vw", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionLabel>Why D-Code</SectionLabel>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 16px",
          }}>
            The Reasons Clients <GradientText>Come Back</GradientText>
          </h2>
          <p style={{
            textAlign: "center", color: C.textMuted, maxWidth: 560, margin: "0 auto 48px",
            lineHeight: 1.7, fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
          }}>
            We could list credentials. Instead, here's what we actually do differently.
          </p>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: 20,
        }}>
          {reasons.map((r, i) => (
            <FadeUp key={r.title} delay={i * 0.06}>
              <GlassCard style={{ padding: "clamp(18px, 3.5vw, 28px)" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }} role="img" aria-label={r.title}>{r.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 8 }}>{r.title}</h3>
                <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.65 }}>{r.desc}</p>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Achievements ────────────────────────────────────────── */
export function Achievements() {
  const [ref, inView] = useInView();
  const achievements = [
    { value: 15,  suffix: "Cr+", label: "Client Revenue Generated", sub: "₹ across all clients", icon: "💰" },
    { value: 200, suffix: "+",   label: "Projects Delivered",        sub: "Since 2016",           icon: "🏆" },
    { value: 12,  suffix: "+",   label: "Industries Served",         sub: "Diverse expertise",    icon: "🌐" },
    { value: 4,   suffix: "",    label: "Industry Awards",           sub: "Design & performance", icon: "🥇" },
  ];

  return (
    <section
      ref={ref}
      id="achievements"
      aria-label="Achievements"
      style={{
        padding: "clamp(64px, 10vw, 120px) 6vw",
        background: `linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.04) 50%, transparent 100%)`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionLabel>By the Numbers</SectionLabel>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 56px",
          }}>
            Results That <GradientText>Speak for Themselves</GradientText>
          </h2>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
          gap: "clamp(16px, 4vw, 32px)",
        }}>
          {achievements.map((a, i) => (
            <AchievementItem key={a.label} item={a} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementItem({ item, index, inView }) {
  const count = useCounter(item.value, inView);
  return (
    <FadeUp delay={index * 0.1}>
      <GlassCard style={{ padding: "clamp(20px, 4vw, 36px)", textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 12 }} role="img" aria-label={item.label}>{item.icon}</div>
        <div
          aria-label={`${item.value}${item.suffix} ${item.label}`}
          style={{
            fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "-0.03em", lineHeight: 1,
          }}
        >
          <GradientText>{count}{item.suffix}</GradientText>
        </div>
        <div style={{ fontWeight: 600, fontSize: 15, color: C.text, margin: "10px 0 4px" }}>{item.label}</div>
        <div style={{ fontSize: 12, color: C.textMuted }}>{item.sub}</div>
      </GlassCard>
    </FadeUp>
  );
}

/* ─── Testimonials ────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    role: "Founder, Bloom & Co",
    text: "D-Code rebuilt our Shopify store and ran our Meta ads. Within 3 months we crossed ₹2Cr monthly revenue — something we'd been chasing for 2 years.",
    stars: 5,
  },
  {
    name: "Rohan Kapoor",
    role: "CEO, TechServe Solutions",
    text: "The AI automation suite they built replaced our entire lead ops team. We're now closing deals faster with zero manual follow-up.",
    stars: 5,
  },
  {
    name: "Anika Sharma",
    role: "Marketing Director, EduPrime",
    text: "6× ROAS in 90 days. The team is incredibly data-driven — they killed underperforming creatives fast and scaled winners ruthlessly.",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      style={{ padding: "clamp(64px, 10vw, 120px) 6vw", background: "rgba(255,255,255,0.01)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionLabel>Client Love</SectionLabel>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 48px",
          }}>
            What Our <GradientText>Clients Say</GradientText>
          </h2>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: 24,
        }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.1}>
              <GlassCard style={{ padding: "clamp(20px, 4vw, 32px)", height: "100%", display: "flex", flexDirection: "column" }}>
                <div aria-label={`${t.stars} stars`} style={{ color: "#FBBF24", fontSize: 18, marginBottom: 16, letterSpacing: 2 }}>
                  {"★".repeat(t.stars)}
                </div>
                <p style={{
                  color: C.text, fontSize: 15, lineHeight: 1.75,
                  fontStyle: "italic", flex: 1, marginBottom: 24,
                }}>
                  "{t.text}"
                </p>
                <div>
                  <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{t.role}</div>
                </div>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Team ────────────────────────────────────────────────── */
const TEAM = [
  {
    name: "Darshan Patel",
    role: "Founder & CEO",
    bio: "8+ years in digital strategy. Ex-agency director who built D-Code to prove that great work and real results can coexist.",
    initials: "DP",
    color: "#8B5CF6",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Sneha Joshi",
    role: "Head of Growth",
    bio: "Performance marketing specialist. Managed ₹3Cr+ in Meta & Google ad spend. Obsessed with ROAS and funnel architecture.",
    initials: "SJ",
    color: "#06B6D4",
    socials: { linkedin: "#" },
  },
  {
    name: "Arjun Nair",
    role: "Lead Developer",
    bio: "Full-stack engineer with 6 years in React, Next.js, and Shopify. Builds fast, accessible, and conversion-optimised web products.",
    initials: "AN",
    color: "#10B981",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Riya Desai",
    role: "AI & Automation Lead",
    bio: "Former data scientist turned AI solutions architect. Designs n8n pipelines and GPT-powered workflows that actually ship.",
    initials: "RD",
    color: "#F59E0B",
    socials: { linkedin: "#" },
  },
];

export function Team() {
  return (
    <section
      id="team"
      aria-label="Our team"
      style={{ padding: "clamp(64px, 10vw, 120px) 6vw" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionLabel>The Team</SectionLabel>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 16px",
          }}>
            The People Behind <GradientText>Your Growth</GradientText>
          </h2>
          <p style={{
            textAlign: "center", color: C.textMuted, maxWidth: 520,
            margin: "0 auto 48px", lineHeight: 1.7,
            fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
          }}>
            Small enough to care. Experienced enough to deliver.
          </p>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
          gap: 24,
        }}>
          {TEAM.map((member, i) => (
            <FadeUp key={member.name} delay={i * 0.08}>
              <TeamCard member={member} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member: m }) {
  return (
    <GlassCard style={{ padding: "clamp(20px, 4vw, 28px)", textAlign: "center" }}>
      {/* Avatar */}
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: `radial-gradient(circle at 40% 40%, ${m.color}, ${m.color}55)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 800, fontSize: 22, color: "#fff",
        margin: "0 auto 16px",
        border: `2px solid ${m.color}40`,
        flexShrink: 0,
      }}
        aria-hidden="true"
      >
        {m.initials}
      </div>
      <h3 style={{ fontWeight: 700, fontSize: 17, color: C.text }}>{m.name}</h3>
      <div style={{
        fontSize: 13, color: "#C4B5FD", fontWeight: 600,
        margin: "4px 0 12px", letterSpacing: "0.03em",
      }}>
        {m.role}
      </div>
      <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.65, marginBottom: 18 }}>
        {m.bio}
      </p>
      {/* Social links */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {m.socials.linkedin && (
          <SocialLink href={m.socials.linkedin} label={`${m.name} on LinkedIn`}>in</SocialLink>
        )}
        {m.socials.twitter && (
          <SocialLink href={m.socials.twitter} label={`${m.name} on Twitter`}>𝕏</SocialLink>
        )}
        {m.socials.github && (
          <SocialLink href={m.socials.github} label={`${m.name} on GitHub`}>⌥</SocialLink>
        )}
      </div>
    </GlassCard>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: 32, height: 32, borderRadius: 8,
        background: C.bgCard, border: `1px solid ${C.border}`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: C.textMuted, textDecoration: "none", fontSize: 13, fontWeight: 700,
        transition: "border-color 0.2s, color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.borderHover;
        e.currentTarget.style.color = C.text;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.color = C.textMuted;
      }}
    >
      {children}
    </a>
  );
}

/* ─── Process ─────────────────────────────────────────────── */
export function Process() {
  const steps = [
    { n: "01", title: "Discovery Call",     desc: "We audit your current digital presence, understand your goals, and identify the highest-leverage opportunities." },
    { n: "02", title: "Strategy & Scope",   desc: "A custom roadmap with deliverables, timelines, and expected ROI — no guesswork, no scope creep." },
    { n: "03", title: "Build & Launch",     desc: "Design, development, and campaign setup in parallel sprints. You see progress weekly, not at the end." },
    { n: "04", title: "Optimise & Scale",   desc: "Post-launch data drives every iteration. We A/B test, analyse, and push performance higher every month." },
  ];

  return (
    <section
      id="process"
      aria-label="Our process"
      style={{ padding: "clamp(64px, 10vw, 120px) 6vw", background: "rgba(255,255,255,0.01)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionLabel>How We Work</SectionLabel>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 56px",
          }}>
            Our <GradientText>Proven Process</GradientText>
          </h2>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: 24,
        }}>
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.08}>
              <GlassCard style={{ padding: "clamp(20px, 4vw, 28px)" }}>
                <div style={{
                  fontWeight: 800, fontSize: 40,
                  background: C.gradientText,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text", marginBottom: 16, lineHeight: 1,
                }}>
                  {s.n}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.65 }}>{s.desc}</p>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TechStack ───────────────────────────────────────────── */
export function TechStack() {
  const techs = [
    "React", "Next.js", "TypeScript", "Node.js",
    "Shopify", "Meta Ads", "Google Ads", "n8n",
    "OpenAI", "Tailwind CSS", "PostgreSQL", "Vercel",
  ];
  return (
    <section
      id="tech-stack"
      aria-label="Technologies we use"
      style={{
        padding: "clamp(48px, 8vw, 80px) 6vw",
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <p style={{
            textAlign: "center", fontSize: 13, color: C.textMuted,
            fontWeight: 600, letterSpacing: "0.1em", marginBottom: 24,
            textTransform: "uppercase",
          }}>
            Technologies & Platforms We Master
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {techs.map((t) => (
              <span
                key={t}
                style={{
                  padding: "8px 18px", borderRadius: 50,
                  background: C.bgCard, border: `1px solid ${C.border}`,
                  color: C.textMuted, fontSize: 13, fontWeight: 500,
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.borderHover;
                  e.currentTarget.style.color = C.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.color = C.textMuted;
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Landing pages: 7–14 days. Full websites: 4–6 weeks. Shopify stores: 3–5 weeks. AI automation: 2–3 weeks. We always give you a timeline before kickoff.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We have active clients in India, UAE, UK, USA, and Australia. All communication is async-friendly with weekly syncs via video call.",
  },
  {
    q: "What's your minimum project budget?",
    a: "Engagements typically start from ₹50,000 for a focused landing page to ₹3L+ for full-stack website + ads management. We'll scope it honestly after a discovery call.",
  },
  {
    q: "Do you offer ongoing retainers?",
    a: "Yes. Most clients stay on a monthly retainer for ads management, website maintenance, and continuous optimisation. Retainers start from ₹25,000/month.",
  },
  {
    q: "Who will I be working with?",
    a: "You get a dedicated project lead plus direct Slack access to the delivery team. No account managers in the way. Senior team members are hands-on throughout.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      style={{ padding: "clamp(64px, 10vw, 120px) 6vw" }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <FadeUp>
          <SectionLabel>FAQ</SectionLabel>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 48px",
          }}>
            Questions <GradientText>Answered</GradientText>
          </h2>
        </FadeUp>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <GlassCard hover={false} style={{ overflow: "hidden" }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  style={{
                    width: "100%", background: "none", border: "none",
                    padding: "clamp(16px, 3vw, 22px)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    gap: 16, cursor: "pointer", textAlign: "left",
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: "clamp(14px, 2vw, 16px)", color: C.text }}>
                    {faq.q}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      color: C.accent, fontSize: 20, fontWeight: 300, flexShrink: 0,
                      transform: open === i ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform 0.25s ease",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  style={{
                    maxHeight: open === i ? 300 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p style={{
                    padding: "0 clamp(16px, 3vw, 22px) clamp(16px, 3vw, 22px)",
                    color: C.textMuted, fontSize: 14, lineHeight: 1.7,
                  }}>
                    {faq.a}
                  </p>
                </div>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────────── */
const CONTACT_INITIAL = { name: "", email: "", company: "", service: "", message: "" };
const SERVICES_OPTIONS = ["Website Development", "Meta Ads / Paid Social", "Shopify Development", "AI Automation", "Full Growth Package", "Other"];

export function Contact() {
  const [form, setForm] = useState(CONTACT_INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required.";
    if (!form.email.trim())   e.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Tell us a bit about your project.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

const handleSubmit = async (data) => {
  try {
    const response = await fetch(
       '${import.meta.env.VITE_API_URL}/api/contact' || "https://your-backend-url.onrender.com/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const result = await response.json();

    if (result.success) {
      alert("Message sent successfully!");
    }
  } catch (error) {
    console.error(error);
  }
};

  const inputStyle = (field) => ({
    width: "100%", background: C.bgCard,
    border: `1px solid ${errors[field] ? "#EF4444" : C.border}`,
    borderRadius: 10, padding: "14px 16px",
    color: C.text, fontSize: 14, outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  });

  const labelStyle = { fontSize: 13, fontWeight: 600, color: C.textMuted, display: "block", marginBottom: 8 };

  if (status === "success") {
    return (
      <section id="contact" style={{ padding: "clamp(64px, 10vw, 120px) 6vw" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, marginBottom: 16 }}>
            <GradientText>Message Received!</GradientText>
          </h2>
          <p style={{ color: C.textMuted, lineHeight: 1.7, marginBottom: 32 }}>
            Thanks for reaching out. We'll review your brief and reply within 1 business day.
          </p>
          <MagneticBtn onClick={() => setStatus("idle")}>Send Another Message</MagneticBtn>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      aria-label="Contact us"
      style={{ padding: "clamp(64px, 10vw, 120px) 6vw" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 16px",
          }}>
            Ready to Build <GradientText>Something Great?</GradientText>
          </h2>
          <p style={{
            textAlign: "center", color: C.textMuted, maxWidth: 520, margin: "0 auto 48px",
            lineHeight: 1.7, fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
          }}>
            Tell us about your project. We'll send a no-obligation proposal within 24 hours.
          </p>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "clamp(32px, 6vw, 64px)", alignItems: "start",
        }}>
          {/* Left: contact info */}
          <FadeUp>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { icon: "📧", label: "Email", value: "hello@dcode.studio", href: "mailto:hello@dcode.studio" },
                { icon: "📱", label: "WhatsApp", value: "+91 98765 43210", href: "https://wa.me/919876543210" },
                { icon: "📍", label: "Location", value: "Pune, Maharashtra, India", href: null },
              ].map((item) => (
                <GlassCard key={item.label} style={{ padding: "clamp(16px, 3vw, 24px)", display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }} role="img" aria-label={item.label}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ color: C.text, textDecoration: "none", fontSize: 15, fontWeight: 500 }}>{item.value}</a>
                    ) : (
                      <span style={{ color: C.text, fontSize: 15, fontWeight: 500 }}>{item.value}</span>
                    )}
                  </div>
                </GlassCard>
              ))}

              <GlassCard style={{ padding: "clamp(16px, 3vw, 24px)" }}>
                <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.7 }}>
                  ⚡ <strong style={{ color: C.text }}>Avg. response time: 4 hours.</strong> We reply to every serious inquiry the same day during business hours (Mon–Sat, 9am–7pm IST).
                </p>
              </GlassCard>
            </div>
          </FadeUp>

          {/* Right: form */}
          <FadeUp delay={0.1}>
            <GlassCard style={{ padding: "clamp(24px, 5vw, 40px)" }}>
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                  gap: 16, marginBottom: 16,
                }}>
                  <div>
                    <label htmlFor="contact-name" style={labelStyle}>Full Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-err" : undefined}
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Priya Mehta"
                      style={inputStyle("name")}
                      onFocus={(e) => (e.target.style.borderColor = C.accent)}
                      onBlur={(e) => (e.target.style.borderColor = errors.name ? "#EF4444" : C.border)}
                    />
                    {errors.name && (
                      <span id="contact-name-err" role="alert" style={{ fontSize: 12, color: "#EF4444", marginTop: 4, display: "block" }}>{errors.name}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" style={labelStyle}>Email *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "contact-email-err" : undefined}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="priya@brand.com"
                      style={inputStyle("email")}
                      onFocus={(e) => (e.target.style.borderColor = C.accent)}
                      onBlur={(e) => (e.target.style.borderColor = errors.email ? "#EF4444" : C.border)}
                    />
                    {errors.email && (
                      <span id="contact-email-err" role="alert" style={{ fontSize: 12, color: "#EF4444", marginTop: 4, display: "block" }}>{errors.email}</span>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="contact-company" style={labelStyle}>Company / Brand</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Bloom & Co"
                    style={inputStyle("company")}
                    onFocus={(e) => (e.target.style.borderColor = C.accent)}
                    onBlur={(e) => (e.target.style.borderColor = C.border)}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="contact-service" style={labelStyle}>Service Needed</label>
                  <select
                    id="contact-service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    style={{ ...inputStyle("service"), appearance: "none", cursor: "pointer" }}
                  >
                    <option value="">Select a service…</option>
                    {SERVICES_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label htmlFor="contact-message" style={labelStyle}>Project Brief *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-err" : undefined}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your goals, timeline, and budget…"
                    style={{
                      ...inputStyle("message"),
                      resize: "vertical", minHeight: 120, fontFamily: "inherit",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = C.accent)}
                    onBlur={(e) => (e.target.style.borderColor = errors.message ? "#EF4444" : C.border)}
                  />
                  {errors.message && (
                    <span id="contact-message-err" role="alert" style={{ fontSize: 12, color: "#EF4444", marginTop: 4, display: "block" }}>{errors.message}</span>
                  )}
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    style={{
                      padding: "12px 16px", borderRadius: 8,
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      color: "#FCA5A5", fontSize: 13, marginBottom: 20,
                    }}
                  >
                    Something went wrong. Please email us directly at hello@dcode.studio.
                  </div>
                )}

                <MagneticBtn
                  primary
                  onClick={handleSubmit}
                  aria-label="Submit contact form"
                  disabled={status === "loading"}
                  style={{
                    width: "100%", justifyContent: "center",
                    opacity: status === "loading" ? 0.7 : 1,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", gap: 8,
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <span style={{
                        width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff", borderRadius: "50%",
                        display: "inline-block", animation: "spin 0.7s linear infinite",
                      }} />
                      Sending…
                    </>
                  ) : "Send Message →"}
                </MagneticBtn>
              </form>
            </GlassCard>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────── */
const FOOTER_LINKS = {
  Services: ["Meta Ads", "Website Dev", "Shopify Dev", "AI Automation"],
  Company:  ["About", "Team", "Process", "Contact"],
  Legal:    ["Privacy Policy", "Terms of Service"],
};

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/dcode-studio", icon: "in" },
  { label: "Instagram", href: "https://instagram.com/dcode.studio", icon: "IG" },
  { label: "Twitter / X", href: "https://twitter.com/dcodestudio", icon: "𝕏" },
  { label: "WhatsApp", href: "https://wa.me/919876543210", icon: "WA" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [nlStatus, setNlStatus] = useState("idle"); // idle | success

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    // TODO: Connect to newsletter API (Mailchimp / ConvertKit)
    setNlStatus("success");
  };

  return (
    <footer style={{ borderTop: `1px solid ${C.border}` }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Main footer grid */}
      <div style={{ padding: "clamp(48px, 8vw, 80px) 6vw 0", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
          gap: "clamp(32px, 5vw, 48px)",
        }}>
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em", marginBottom: 16 }}>
              <GradientText>D-Code</GradientText>
              <span style={{ color: C.text }}> Studio</span>
            </div>
            <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.7, marginBottom: 20, maxWidth: 220 }}>
              Premium digital studio building brands, automation, and growth systems for ambitious businesses.
            </p>
            {/* Social links */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`D-Code Studio on ${s.label}`}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: C.bgCard, border: `1px solid ${C.border}`,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    color: C.textMuted, textDecoration: "none", fontSize: 11, fontWeight: 700,
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = C.borderHover;
                    e.currentTarget.style.color = C.text;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.color = C.textMuted;
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 16, letterSpacing: "0.05em" }}>
                {heading.toUpperCase()}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(l.toLowerCase().replace(/ /g, "-"))?.scrollIntoView({ behavior: "smooth" });
                      }}
                      style={{ color: C.textMuted, textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 16, letterSpacing: "0.05em" }}>
              STAY IN THE LOOP
            </h3>
            <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
              Monthly insights on digital marketing, AI, and growth.
            </p>
            {nlStatus === "success" ? (
              <p style={{ color: "#10B981", fontSize: 13, fontWeight: 600 }}>✓ You're subscribed!</p>
            ) : (
              <form onSubmit={handleNewsletter} aria-label="Newsletter signup" style={{ display: "flex", gap: 8, flexDirection: "column" }}>
                <input
                  type="email"
                  aria-label="Email address for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    background: C.bgCard, border: `1px solid ${C.border}`,
                    borderRadius: 8, padding: "10px 14px",
                    color: C.text, fontSize: 13, outline: "none", width: "100%",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = C.accent)}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
                <button
                  type="submit"
                  style={{
                    background: C.gradient, border: "none", borderRadius: 8,
                    padding: "10px 16px", color: "#fff", fontSize: 13, fontWeight: 600,
                    cursor: "pointer", transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Subscribe →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: `1px solid ${C.border}`,
          padding: "clamp(16px, 3vw, 24px) 0",
          marginTop: "clamp(32px, 6vw, 56px)",
          display: "flex", flexWrap: "wrap", gap: 12,
          justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ color: C.textDim, fontSize: 13 }}>
            © 2026 D-Code Studio. All rights reserved.
          </span>
          <span style={{ color: C.textDim, fontSize: 13 }}>
            Made with ❤️ in Pune, India
          </span>
        </div>
      </div>
    </footer>
  );
}
