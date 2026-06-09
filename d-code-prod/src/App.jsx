import React from "react";
import { C } from "./constants/theme";
import { useIsMobile } from "./hooks/useUiHooks";
import { ThreeDBackground } from "./components/ThreeScene";
import { Nav, ScrollProgress } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Stats, Services, Portfolio, CaseStudies } from "./components/Sections";
import {
  About, WhyUs, Achievements, Testimonials,
  Team, Process, TechStack, FAQ, Contact, Footer,
} from "./components/CompanyDetails";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* Focus-visible ring for keyboard navigation */
  :focus-visible {
    outline: 2px solid #8B5CF6;
    outline-offset: 3px;
    border-radius: 4px;
  }
  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Respect reduce-motion preference */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Keyframes */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-20px); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%       { transform: translateX(-50%) translateY(6px); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Global responsive typography baseline */
  img, svg, video {
    max-width: 100%;
    display: block;
  }

  button, input, textarea, select {
    font-family: inherit;
  }

  /* Prevent text from breaking layout on mobile */
  h1, h2, h3, h4 {
    overflow-wrap: break-word;
    word-break: break-word;
  }

  /* Mobile-first safe area for notched devices */
  @supports (padding: env(safe-area-inset-bottom)) {
    footer {
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
`;

export default function App() {
  const isMobile = useIsMobile();

  return (
    <div style={{
      background: C.bg,
      color: C.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{GLOBAL_STYLES}</style>

      {/* Background R3F WebGL Layer */}
      <ThreeDBackground isMobile={isMobile} />

      {/* Layered DOM Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScrollProgress />
        <Nav />

        <main id="main-content">
          <Hero />
          <Stats />
          <Services />
          <Portfolio />
          <About />
          <Achievements />
          <WhyUs />
          <CaseStudies />
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
