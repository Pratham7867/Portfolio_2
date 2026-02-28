import { useEffect, useRef } from "react";
import gsap from "gsap";
export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".skill-card");

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 80,
        rotateX: 40,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      }
    );
  }, []);

  return (
    <section className="skills-section" ref={sectionRef}>
      <h2 className="skills-heading">My Expertise</h2>
      <p className="skills-sub">
        Technologies I use to craft fast, scalable, real-world applications.
      </p>

      <div className="skills-grid">
        <div className="skill-card">
          <h3>Frontend Development</h3>
          <ul>
            <li>React.js</li>
            <li>JavaScript (ES6+)</li>
            <li>Tailwind / CSS3</li>
            <li>GSAP Animations</li>
            <li>Responsive UI</li>
          </ul>
        </div>

        <div className="skill-card">
          <h3>Backend Development</h3>
          <ul>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
            <li>REST APIs</li>
            <li>JWT Authentication</li>
          </ul>
        </div>

        <div className="skill-card">
          <h3>Performance & State</h3>
          <ul>
            <li>Zustand / Redux</li>
            <li>Virtualization</li>
            <li>Debouncing</li>
            <li>Optimization</li>
            <li>Reusable Architecture</li>
          </ul>
        </div>

        <div className="skill-card">
          <h3>UI Engineering</h3>
          <ul>
            <li>Modern Layout Systems</li>
            <li>Micro-Interactions</li>
            <li>3D + Motion UI</li>
            <li>Accessibility</li>
            <li>UX Thinking</li>
          </ul>
        </div>
      </div>
    </section>
  );
}