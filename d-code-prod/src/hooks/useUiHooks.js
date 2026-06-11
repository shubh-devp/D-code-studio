import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.15, once = true) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, once]);
  return [ref, inView];
}

export function useCounter(target, inView, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    let startTime = null;
    const tick = (now) => {
      if (startTime === null) startTime = now;
      const p = Math.min((now - startTime) / duration, 1);
      // easeOutExpo for a premium settle
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return count;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const fn = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const s = document.documentElement.scrollTop;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? (s / h) * 100 : 0);
        raf = 0;
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => {
      window.removeEventListener("scroll", fn);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return progress;
}

export function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const check = () => setMobile(mq.matches);
    check();
    mq.addEventListener("change", check);
    return () => mq.removeEventListener("change", check);
  }, [breakpoint]);
  return mobile;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
