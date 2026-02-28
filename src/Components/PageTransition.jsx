import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageTransition({ isAnimating, onCovered, onFinish }) {
  const overlay = useRef();

  useEffect(() => {
    if (!isAnimating) return;

    const tl = gsap.timeline();

    // Start from bottom
    gsap.set(overlay.current, { y: "100%" });

    // 🔵 PHASE 1 — COVER SCREEN
    tl.to(overlay.current, {
      y: "0%",
      duration: 0.8,
      ease: "power4.out",
      onComplete: () => {
        onCovered(); // 🔥 change route HERE (screen is hidden)
      }
    });
    // 🔵 PHASE 2 — REVEAL NEW PAGE
    tl.to(overlay.current, {
      y: "-100%",
      duration: 1,
      ease: "power4.inOut",
      onComplete: onFinish
    });

  }, [isAnimating, onCovered, onFinish]);

  return <div ref={overlay} className="page-transition" />;
}