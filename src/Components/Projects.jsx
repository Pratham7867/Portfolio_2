import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Hologram ",
    desc: "Create three 3d model and turn them into holograms.",
    tech: "Three js • Shaders ",
    link: "https://hologram-umber.vercel.app/",
  },
  {
    title: "3D Portfolio Website",
    desc: "Interactive developer portfolio with Three.js, smooth transitions, and GSAP animations.",
    tech: " • GSAP • Three.js",
    link: "https://portfolio-three-blond-12.vercel.app/",
  },
  {
    title: "Refoluz UI Page ",
    desc: "Reusable component-based UI with optimized rendering and modern UX patterns.",
    tech: "React • Framer Motion  • Tailwind",
    link: "https://refokuz.vercel.app/",
  },
  {
    title: "WolfPage ",
    desc: "Create a interactive page with 3d model and smooth animation .",
    tech: "ReactThreeFiber • Performance Optimization",
    link: `https://wolf-page.vercel.app/`,
  },
    {
    title: "Get Tala ",
    desc: "Create a static page of Tala Snack  .",
    tech: "html/Css •Javascript and GSAP •Responsive ",
    link: "https://get-tala-two.vercel.app/",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".project-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.25,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section className="projects-section" ref={sectionRef}>
      <h2 className="projects-heading">Selected Work</h2>
      <p className="projects-sub">
        Projects that demonstrate real-world development, performance, and UX thinking.
      </p>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <div className="project-card" key={i}>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <span className="tech">{project.tech}</span>
            </div>

            <a href={project.link} className="view-btn" target="_blank" rel="noopener noreferrer">
              View Project →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}