import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".reveal");

      gsap.fromTo(
        elements,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about" id="about">
      <div className="about-wrapper">
        {/* Heading */}
        <div className="about-heading">
          <h1 className="reveal">About Me</h1>
          <span className="reveal line" />
        </div>

        {/* Intro */}
        <div className="about-description">
          <p className="reveal">
            I'm <strong>Pratham Gedam</strong>, a passionate Web Developer focused on
            building high-performance, visually engaging applications.
            I work with modern technologies like <strong>React</strong>,
            <strong> Three.js</strong>, and <strong>GSAP</strong> to craft
            immersive user experiences.
          </p>

          <p className="reveal">
            I enjoy transforming ideas into scalable digital products —
            combining clean architecture, motion design, and full-stack
            engineering using <strong>Node.js</strong> and <strong>MongoDB</strong>.
          </p>
          {/* Additional Detail */}
          <div className="about-extra reveal">
            <h2>What I Focus On</h2>
            <p>
              I believe great products are built at the intersection of performance,
              usability, and design. My goal is to create applications that not only
              function efficiently but also deliver a smooth, engaging user experience.
            </p>

            <ul className="focus-list">
              <li>✔ Writing clean, maintainable code</li>
              <li>✔ Building scalable frontend architectures</li>
              <li>✔ Crafting smooth animations & micro-interactions</li>
              <li>✔ Optimizing performance for real-world users</li>
            </ul>
          </div>
        </div>

        {/* Capability Cards */}
        <div className="about-cards">
          <div className="cardabout reveal">
            <h3>Frontend Engineering</h3>
            <p>
              Creating responsive, maintainable UI systems using React and
              modern JavaScript patterns.
            </p>
          </div>

          <div className="cardabout reveal">
            <h3>Interactive 3D Interfaces</h3>
            <p>
              Developing immersive web experiences with Three.js and
              React Three Fiber.
            </p>
          </div>

          <div className="cardabout reveal">
            <h3>Full-Stack Development</h3>
            <p>
              Designing APIs, authentication, and databases with Node.js,
              Express, and MongoDB.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}