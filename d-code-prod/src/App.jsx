import { C } from "./constants/theme";
import { Nav, ScrollProgress } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Stats, Services, Portfolio, CaseStudies } from "./components/Sections";
import { WhyUs, Testimonials, Team, Process, TechStack, FAQ, Contact, Footer } from "./components/CompanyDetails";

/* Fixed CSS aurora — soft drifting gradient orbs + grain. GPU-cheap, no WebGL. */
function Aurora() {
  return (
    <div aria-hidden="true" className="aurora" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div className="aurora-orb a1" />
      <div className="aurora-orb a2" />
      <div className="aurora-orb a3" />
      <div className="aurora-grid" />
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        position: "relative",
        background: C.bg,
        color: C.text,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
        body { background: ${C.bg}; color: ${C.text}; }
        h1, h2, h3, .font-display { font-family: 'Sora', 'Inter', sans-serif; }
        ::selection { background: rgba(124,58,237,0.45); color: #fff; }
        :focus-visible { outline: 2px solid ${C.secondary}; outline-offset: 3px; border-radius: 6px; }
        a { color: inherit; }
        ::-webkit-scrollbar { width: 11px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: #2a3650; border-radius: 8px; border: 3px solid ${C.bg}; }
        ::-webkit-scrollbar-thumb:hover { background: #394869; }

        .skip-link {
          position: fixed; top: -60px; left: 12px; z-index: 1001;
          background: ${C.primary}; color: #fff; padding: 10px 18px; border-radius: 8px;
          font-size: 14px; font-weight: 600; text-decoration: none; transition: top 0.2s ease;
        }
        .skip-link:focus { top: 12px; }

        /* Aurora */
        .aurora-orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5; will-change: transform; }
        .aurora-orb.a1 { width: 60vw; height: 60vw; max-width: 760px; max-height: 760px; top: -14%; left: -10%;
          background: radial-gradient(circle, rgba(124,58,237,0.55), transparent 65%); animation: drift1 26s ease-in-out infinite; }
        .aurora-orb.a2 { width: 50vw; height: 50vw; max-width: 640px; max-height: 640px; top: 18%; right: -12%;
          background: radial-gradient(circle, rgba(6,182,212,0.42), transparent 65%); animation: drift2 32s ease-in-out infinite; }
        .aurora-orb.a3 { width: 44vw; height: 44vw; max-width: 560px; max-height: 560px; bottom: -16%; left: 22%;
          background: radial-gradient(circle, rgba(245,158,11,0.20), transparent 65%); animation: drift3 38s ease-in-out infinite; }
        .aurora-grid { position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%); }

        @keyframes drift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(6%, 8%) scale(1.12); } }
        @keyframes drift2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-7%, 5%) scale(1.1); } }
        @keyframes drift3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(5%, -6%) scale(1.15); } }
        @keyframes pulseDot { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .case-grid { grid-template-columns: 1fr !important; }
          .aurora-orb { filter: blur(70px); opacity: 0.4; }
        }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .aurora-orb { animation: none !important; }
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      <Aurora />
      <a href="#main" className="skip-link">Skip to content</a>

      <div style={{ position: "relative", zIndex: 1 }}>
        <ScrollProgress />
        <Nav />
        <main id="main">
          <Hero />
          <Stats />
          <Services />
          <Portfolio />
          <CaseStudies />
          <WhyUs />
          <Testimonials />
          <Team />
          <Process />
          <TechStack />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
