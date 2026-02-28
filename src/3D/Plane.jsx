import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import VerticalBox from "./VerticleBox";

export default function Plane({ paused }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Add vertical spacing for mobile (scrollable layout)
  const positions = isMobile
    ? [
        [0, 3.2, 0],   // top card
        [0, 0, 0],     // middle card
        [0, -3.2, 0],  // bottom card
      ]
    : [
        [-3.5, 0, 0],  // desktop layout unchanged
        [0, 0, 0],
        [3.5, 0, 0],
      ];

  return (
    <div
      className="bg"
      style={{
        height: "100vh",
        overflowY: isMobile ? "auto" : "hidden", // ✅ scroll only on mobile
        WebkitOverflowScrolling: "touch",
      }}
    >
      <Canvas
        camera={{
          position: isMobile ? [0, 1, 9.5] : [0, 1, 6.5],
          fov: isMobile ? 60 : 50,
        }}
        style={{ height: "100vh", width: "100vw" }}
        frameloop={paused ? "never" : "always"}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 3]} />

        <VerticalBox position={positions[0]} delay={0} paused={paused} isMobile={isMobile}
          title="About Me"
          image="./Profile.png"
          btn="Know More"
          description="I'm a B.Tech student passionate about building modern web experiences. I specialize in React, Three.js, and interactive UI development."
          navigate="/about"
        />

        <VerticalBox position={positions[1]} delay={0.2} paused={paused} isMobile={isMobile}
          title="Skills"
          image="./Skills.jpg"
          btn="View Skills"
          description="I have expertise in frontend technologies like React, Three.js, and GSAP for animations. I'm also experienced in backend development with Node.js and MongoDB."
          navigate="/skills"
        />

        <VerticalBox position={positions[2]} delay={0.4} paused={paused} isMobile={isMobile}
          title="Projects"
          image="./Projects.avif"
          btn="View Projects"
          description="I've built interactive web apps, 3D visualizations, and full-stack projects showcasing my skills."
          navigate="/projects"
        />
      </Canvas>
    </div>
  );
}