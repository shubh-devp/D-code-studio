import { useState } from "react";
import { C, SP, RADIUS, EASE } from "../constants/theme";
import { Reveal, GradientText, GlassCard, MagneticBtn, SectionHeading, Section, Tag, Tilt3D } from "./Primitives";

/* ------------------------------- Why Us -------------------------------- */
const WHY = [
  { icon: "🎯", title: "Outcome-obsessed", desc: "We measure success in your revenue, not our deliverables. Every decision ladders up to growth." },
  { icon: "⚡", title: "Senior-only team", desc: "No juniors learning on your budget. You work directly with specialists who have shipped at scale." },
  { icon: "🔍", title: "Radical transparency", desc: "Live dashboards, weekly reporting, and Slack access. You always know exactly where things stand." },
  { icon: "🚀", title: "Built to scale", desc: "Architecture, ad systems, and automations designed to grow with you — not break at the next level." },
];

export function WhyUs() {
  return (
    <Section id="why-choose-us">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: SP["3xl"], alignItems: "center" }}>
        <Reveal>
          <SectionHeading
            align="left"
            label="Why D-Code"
            title={<>Not Just an Agency.<br /><GradientText>A Growth Partner.</GradientText></>}
            subtitle="We embed inside your team and your systems to compound results month over month — transparently, and accountably."
          />
          <div style={{ marginTop: SP.lg }}>
            <MagneticBtn primary onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Let's Talk Strategy →
            </MagneticBtn>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: SP.md }}>
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <GlassCard style={{ padding: SP.lg, height: "100%" }}>
                <div style={{ fontSize: 26, marginBottom: SP.sm }} aria-hidden="true">{w.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px" }}>{w.title}</h3>
                <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{w.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------- Testimonials ---------------------------- */
const TESTIMONIALS = [
  { quote: "D-Code rebuilt our funnel and tripled qualified leads in 90 days. They operate like an in-house team that actually ships.", name: "Aarav Mehta", role: "Founder, Luxe Realty", avatar: "AM", color: "#8B5CF6" },
  { quote: "Our Shopify store went from a side project to ₹2Cr in year one. The CRO work alone paid for the engagement many times over.", name: "Priya Nair", role: "CEO, Bloom & Co", avatar: "PN", color: "#06B6D4" },
  { quote: "The AI automation they built handles 70% of our support tickets. My team finally focuses on customers instead of busywork.", name: "Rohan Gupta", role: "COO, TechServe", avatar: "RG", color: "#10B981" },
  { quote: "ROAS went from 1.8× to 6× while we scaled spend 6×. I've worked with five agencies — none came close to this.", name: "Sara Khan", role: "CMO, EduPrime", avatar: "SK", color: "#F59E0B" },
  { quote: "Site load dropped from 2.1s to 0.6s and conversions jumped 28%. Fast, communicative, and genuinely strategic.", name: "Daniel Brooks", role: "Head of Growth, Northwind", avatar: "DB", color: "#EC4899" },
  { quote: "They treated our brand like their own. The new storefront lifted AOV 62% and our team actually enjoys managing it.", name: "Meera Iyer", role: "Director, Vanta Apparel", avatar: "MI", color: "#06B6D4" },
];

export function Testimonials() {
  return (
    <Section id="testimonials" alt>
      <SectionHeading label="Testimonials" title={<>What Our <GradientText>Clients Say</GradientText></>} subtitle="A few words from the founders and operators we've partnered with." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: SP.lg, marginTop: SP["2xl"] }}>
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 0.08}>
            <GlassCard style={{ padding: SP.xl, height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ color: "#FBBF24", fontSize: 16, letterSpacing: 2, marginBottom: SP.md }} aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote style={{ color: C.text, fontSize: 15, lineHeight: 1.7, margin: 0, flex: 1 }}>"{t.quote}"</blockquote>
              <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: SP.lg }}>
                <span aria-hidden="true" style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${t.color}, ${t.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: "#fff" }}>{t.avatar}</span>
                <span>
                  <span style={{ display: "block", fontWeight: 600, fontSize: 14, color: C.text }}>{t.name}</span>
                  <span style={{ display: "block", fontSize: 13, color: C.textMuted }}>{t.role}</span>
                </span>
              </figcaption>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------- Team --------------------------------- */
const TEAM = [
  { name: "Arjun Kapoor", role: "Founder & Strategy", avatar: "AK", color: "#8B5CF6", tags: ["Growth", "Vision"] },
  { name: "Nisha Rao", role: "Head of Design", avatar: "NR", color: "#06B6D4", tags: ["UX", "Brand"] },
  { name: "Vikram Shah", role: "Lead Engineer", avatar: "VS", color: "#10B981", tags: ["React", "Architecture"] },
  { name: "Tara Singh", role: "Performance Lead", avatar: "TS", color: "#F59E0B", tags: ["Meta Ads", "Analytics"] },
  { name: "Karan Patel", role: "Automation Engineer", avatar: "KP", color: "#EC4899", tags: ["AI", "n8n"] },
  { name: "Ananya Bose", role: "Client Success", avatar: "AB", color: "#A78BFA", tags: ["Strategy", "Ops"] },
];

export function Team() {
  return (
    <Section id="team">
      <SectionHeading label="Our Team" title={<>The People Behind <GradientText>Your Growth</GradientText></>} subtitle="Senior specialists who've shipped for startups and enterprises alike." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: SP.lg, marginTop: SP["2xl"] }}>
        {TEAM.map((m, i) => (
          <Reveal key={m.name} delay={(i % 3) * 0.08}>
            <Tilt3D max={12}>
              <GlassCard style={{ padding: SP.xl, textAlign: "center", height: "100%" }}>
                <div aria-hidden="true" style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 16px", background: `linear-gradient(135deg, ${m.color}, ${m.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 26, color: "#fff", boxShadow: `0 8px 30px ${m.color}40` }}>{m.avatar}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 4px" }}>{m.name}</h3>
                <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 14px" }}>{m.role}</p>
                <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                  {m.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </GlassCard>
            </Tilt3D>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------- Process ------------------------------- */
const STEPS = [
  { n: "01", title: "Discovery", desc: "We dig into your goals, audience, and metrics to define what winning actually looks like." },
  { n: "02", title: "Strategy", desc: "A clear, prioritised roadmap — channels, scope, and milestones mapped to revenue." },
  { n: "03", title: "Design", desc: "Premium, conversion-focused interfaces and creative, validated against real user behaviour." },
  { n: "04", title: "Development", desc: "Fast, accessible, scalable builds with rigorous QA and performance baked in." },
  { n: "05", title: "Launch", desc: "Ship, measure, and iterate — with live reporting and continuous optimisation." },
];

export function Process() {
  return (
    <Section id="process" alt>
      <SectionHeading label="How We Work" title={<>Our <GradientText>Proven Process</GradientText></>} subtitle="A transparent, repeatable system that turns ambition into shipped results." />
      <ol style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: SP.lg, marginTop: SP["2xl"], padding: 0, counterReset: "step" }}>
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 0.08} style={{ position: "relative" }}>
            <Tilt3D max={9}>
              <GlassCard style={{ padding: SP.xl, height: "100%" }}>
                <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, marginBottom: SP.sm, background: C.gradientText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.n}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </GlassCard>
            </Tilt3D>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------ Tech Stack ----------------------------- */
const TECHS = ["React", "Next.js", "TypeScript", "Node.js", "Shopify", "Meta Ads", "n8n", "OpenAI", "Tailwind CSS", "PostgreSQL"];

export function TechStack() {
  return (
    <section aria-label="Technology stack" style={{ padding: `${SP["4xl"]}px 5vw`, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <p style={{ textAlign: "center", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: C.textDim, marginBottom: SP.lg }}>Tools we build with</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {TECHS.map((t) => (
            <span key={t} style={{ padding: "10px 20px", borderRadius: RADIUS.pill, background: C.bgCard, border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 14, fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FAQ --------------------------------- */
const FAQS = [
  { q: "What services does D-Code Studio offer?", a: "We focus on four core areas: performance marketing (Meta Ads), website & web-app development, Shopify builds, and AI automation. Most clients engage us across several of these." },
  { q: "How long does a typical project take?", a: "Landing pages ship in 1–2 weeks, full websites in 4–8 weeks, and ongoing marketing or automation engagements are continuous. We'll give you a concrete timeline after discovery." },
  { q: "How much does it cost to work with you?", a: "Projects start around ₹1.5L for focused builds and scale with scope. Retainers for marketing and automation are monthly. We'll quote precisely once we understand your goals." },
  { q: "Do you work with early-stage startups?", a: "Yes. We work with funded startups and established brands. For very early teams we offer scoped, milestone-based engagements to keep budgets predictable." },
  { q: "Who will I actually be working with?", a: "Senior specialists — no work is offloaded to juniors. You get direct access to the people building and running your project, plus a dedicated point of contact." },
  { q: "How do you report on results?", a: "Live dashboards, weekly written updates, and a shared Slack channel. You'll always have real-time visibility into performance and progress." },
  { q: "What tech stack do you build on?", a: "Primarily React, Next.js, and Node.js for web; Shopify Plus for commerce; and n8n plus the OpenAI platform for automation. We choose tools that scale with you." },
  { q: "Do you offer ongoing support after launch?", a: "Absolutely. We offer maintenance, optimisation, and growth retainers so your product and campaigns keep improving after go-live." },
  { q: "Can you take over an existing project?", a: "Often, yes. We'll audit the current build or ad account first, flag risks, then propose a clear plan to stabilise and improve it." },
  { q: "How do we get started?", a: "Send a message through the contact form below. We'll book a discovery call, scope the work, and share a proposal — usually within a few business days." },
];

function FaqItem({ item, open, onToggle, id }) {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <h3 style={{ margin: 0 }}>
        <button
          id={`faq-btn-${id}`}
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          onClick={onToggle}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 4px", background: "none", border: "none", color: C.text, fontSize: 16, fontWeight: 600, cursor: "pointer", textAlign: "left" }}
        >
          {item.q}
          <span aria-hidden="true" style={{ flexShrink: 0, fontSize: 22, lineHeight: 1, color: C.accent, transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: `transform 0.3s ${EASE.out}` }}>＋</span>
        </button>
      </h3>
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: `grid-template-rows 0.3s ${EASE.out}` }}
      >
        <div style={{ overflow: "hidden" }}>
          <p style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.7, margin: 0, padding: "0 4px 20px" }}>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq">
      <SectionHeading label="FAQ" title={<>Questions <GradientText>Answered</GradientText></>} />
      <div style={{ maxWidth: 760, margin: `${SP["2xl"]}px auto 0` }}>
        {FAQS.map((item, i) => (
          <FaqItem key={i} id={i} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------- Contact ------------------------------- */
const initialForm = { name: "", email: "", company: "", message: "" };

function validate(values) {
  const e = {};
  if (!values.name.trim()) e.name = "Please enter your name.";
  if (!values.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Please enter a valid email.";
  if (!values.message.trim()) e.message = "Tell us a little about your project.";
  else if (values.message.trim().length < 10) e.message = "Please add a bit more detail (10+ characters).";
  return e;
}

const fieldStyle = (hasError) => ({
  width: "100%",
  padding: "13px 16px",
  borderRadius: RADIUS.sm,
  background: "rgba(255,255,255,0.04)",
  border: `1px solid ${hasError ? "#F87171" : C.border}`,
  color: C.text,
  fontSize: 15,
  fontFamily: "inherit",
  outline: "none",
  transition: `border-color 0.2s ${EASE.out}`,
});

function Field({ label, name, type = "text", textarea, optional, values, errors, onChange }) {
  return (
    <label style={{ display: "block", textAlign: "left" }}>
      <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.textMuted, marginBottom: 6 }}>
        {label}{optional && <span style={{ color: C.textDim, fontWeight: 400 }}> (optional)</span>}
      </span>
      {textarea ? (
        <textarea name={name} rows={4} value={values[name]} onChange={onChange} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-err` : undefined} style={{ ...fieldStyle(errors[name]), resize: "vertical" }} />
      ) : (
        <input name={name} type={type} value={values[name]} onChange={onChange} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-err` : undefined} style={fieldStyle(errors[name])} />
      )}
      {errors[name] && <span id={`${name}-err`} role="alert" style={{ display: "block", color: "#F87171", fontSize: 12, marginTop: 6 }}>{errors[name]}</span>}
    </label>
  );
}

export function Contact() {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSubmitted(true);
      setValues(initialForm);
    }
  };

  const fieldProps = { values, errors, onChange };

  return (
    <Section id="contact">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: SP["3xl"], alignItems: "start" }}>
        <Reveal>
          <SectionHeading align="left" label="Get in Touch" title={<>Ready to Build <GradientText>Something Great?</GradientText></>} subtitle="Tell us about your project and we'll get back to you within two business days." />
          <div style={{ marginTop: SP.lg, display: "grid", gap: SP.sm }}>
            {[["✉️", "hello@dcode.studio"], ["📞", "+91 98765 43210"], ["📍", "Bengaluru, India"]].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 12, color: C.textMuted, fontSize: 15 }}>
                <span aria-hidden="true">{icon}</span>{text}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard hover={false} style={{ padding: "clamp(24px, 4vw, 36px)" }}>
            {submitted ? (
              <div role="status" style={{ textAlign: "center", padding: "32px 8px" }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>✅</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>Thanks — message received!</h3>
                <p style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.6, margin: "0 0 20px" }}>We'll be in touch shortly. In the meantime, feel free to explore our work.</p>
                <MagneticBtn onClick={() => setSubmitted(false)}>Send another</MagneticBtn>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: SP.md }}>
                <Field label="Name" name="name" {...fieldProps} />
                <Field label="Email" name="email" type="email" {...fieldProps} />
                <Field label="Company" name="company" optional {...fieldProps} />
                <Field label="Project details" name="message" textarea {...fieldProps} />
                <MagneticBtn primary type="submit" style={{ width: "100%", marginTop: 4 }}>Send Message →</MagneticBtn>
              </form>
            )}
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}

/* -------------------------------- Footer ------------------------------- */
const FOOTER_LINKS = {
  Company: ["About", "Team", "Careers", "Contact"],
  Services: ["Meta Ads", "Web Development", "Shopify", "AI Automation"],
  Resources: ["Case Studies", "Process", "FAQ", "Blog"],
};

export function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: `${SP["3xl"]}px 5vw ${SP.xl}px`, background: C.bgAlt }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(220px,1.5fr) repeat(3, minmax(120px,1fr))", gap: SP["2xl"], paddingBottom: SP["2xl"] }} className="footer-grid">
          <div>
            <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em", marginBottom: 12 }}>
              <GradientText>D-Code</GradientText> Studio
            </div>
            <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7, maxWidth: 280, margin: 0 }}>
              Premium websites, performance marketing, and AI automation for ambitious brands.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.text, margin: "0 0 14px" }}>{heading}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                {links.map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase().replace(/ /g, "-")}`} style={{ color: C.textMuted, fontSize: 14, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.text)} onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}>{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: SP.lg, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: C.textDim, fontSize: 13, margin: 0 }}>© 2026 D-Code Studio. All rights reserved.</p>
          <div style={{ display: "flex", gap: SP.lg }}>
            {["Privacy", "Terms"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ color: C.textDim, fontSize: 13, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
