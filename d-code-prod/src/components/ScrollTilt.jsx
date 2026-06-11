import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useUiHooks";

/**
 * Wraps a section so it rotates from slightly tilted-back to flat as it
 * scrolls into view, with a gentle scale + fade. Subtle by design.
 * Falls back to a plain wrapper when the user prefers reduced motion.
 */
export function ScrollTilt({ children, style = {} }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  // Track the section across its full pass through the viewport so the tilt
  // plays on the way in (scroll down) and on the way out (scroll up).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 0 = entering bottom, 0.5 = centered/flat, 1 = exiting top.
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [26, 0, -18]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.25, 1, 1, 0.35]);

  if (reduced) {
    return <div style={style}>{children}</div>;
  }

  return (
    <div ref={ref} style={{ perspective: 1200, ...style }}>
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformOrigin: "center top",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
