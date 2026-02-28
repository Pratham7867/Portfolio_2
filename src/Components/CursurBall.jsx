import { useEffect, useRef, useState } from "react";

export default function CursorBall() {
  const ballRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const ball = ballRef.current;

    const moveBall = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      ball.style.transform = `translate(${x}px, ${y}px) scale(${
        isHovering ? 2.5 : 1
      })`;
    };

    window.addEventListener("mousemove", moveBall);

    // Add hover detection to all elements with class "hover-target"
    const targets = document.querySelectorAll(".hover-target");

    targets.forEach((el) => {
      el.addEventListener("mouseenter", () => setIsHovering(true));
      el.addEventListener("mouseleave", () => setIsHovering(false));
    });

    return () => {
      window.removeEventListener("mousemove", moveBall);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", () => setIsHovering(true));
        el.removeEventListener("mouseleave", () => setIsHovering(false));
      });
    };
  }, [isHovering]);

  return <div ref={ballRef} className="cursor-ball" />;
}