import { Suspense, lazy, useState, useEffect } from "react";
import { C } from "./constants/theme";
import { useIsMobile, useReducedMotion } from "./hooks/useUiHooks";
import { Nav, ScrollProgress } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Stats, Services, Portfolio, CaseStudies } from "./components/Sections";
import { WhyUs, Testimonials, Team, Process, TechStack, FAQ, Contact, Footer } from "./components/CompanyDetails";
import { ScrollTilt } from "./components/ScrollTilt";

// Code-split the WebGL layer so the DOM content paints first.
const ThreeDBackground = lazy(() =>
  import("./components/ThreeScene").then((m) => ({ default: m.ThreeDBackground }))
);

function LoadingScreen({ done }) {
  return (
    <div
      aria-hidden={done}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        background: C.bg,
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "auto",
        transition: "opacity 0.6s ease",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em" }}>
        <span style={{ background: C.gradientText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>D-Code</span> Studio
      </div>
      <div style={{ width: 160, height: 3, borderRadius: 3, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 3, background: C.gradient, animation: "loadbar 1.1s ease-in-out infinite" }} />
      </div>
    </div>
  );
}

export default function App() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 900);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; }
        ::selection { background: rgba(139,92,246,0.4); color: #fff; }
        :focus-visible { outline: 2px solid ${C.accent}; outline-offset: 3px; border-radius: 6px; }
        .skip-link {
          position: fixed; top: -60px; left: 12px; z-index: 1001;
          background: ${C.accent}; color: #fff; padding: 10px 18px; border-radius: 8px;
          font-size: 14px; font-weight: 600; text-decoration: none; transition: top 0.2s ease;
        }
        .skip-link:focus { top: 12px; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
        @keyframes loadbar { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .case-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>

      <LoadingScreen done={ready} />

      {/* Background WebGL layer — lazy + reduced-motion aware */}
      <Suspense fallback={null}>
        <ThreeDBackground isMobile={isMobile} reduced={reduced} />
      </Suspense>

      {/* Foreground DOM content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScrollProgress />
        <Nav />
        <main id="main">
          <Hero />
          <ScrollTilt><Stats /></ScrollTilt>
          <ScrollTilt><Services /></ScrollTilt>
          <ScrollTilt><Portfolio /></ScrollTilt>
          <ScrollTilt><CaseStudies /></ScrollTilt>
          <ScrollTilt><WhyUs /></ScrollTilt>
          <ScrollTilt><Testimonials /></ScrollTilt>
          <ScrollTilt><Team /></ScrollTilt>
          <ScrollTilt><Process /></ScrollTilt>
          <ScrollTilt><TechStack /></ScrollTilt>
          <ScrollTilt><FAQ /></ScrollTilt>
          <ScrollTilt><Contact /></ScrollTilt>
        </main>
        <Footer />
      </div>
    </div>
  );
}
