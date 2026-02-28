import { useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Html, RoundedBox } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(MotionPathPlugin);

function VerticalBox({
  position,
  delay = 0,
  title,
  description,
  image,
  btn,
  navigate,
  paused,
  isMobile
}) {
  const meshRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const Navigate = useNavigate();

  // ENTRY ANIMATION (shorter for mobile)
  useLayoutEffect(() => {
    if (paused) return;

    const mesh = meshRef.current;
    if (!mesh) return;

    const offsetX = isMobile ? 3 : 6;
    const offsetY = isMobile ? 2 : 5;

    gsap.set(mesh.position, {
      x: position[0] - offsetX,
      y: position[1] + offsetY,
      z: -3,
    });

    gsap.to(mesh.position, {
      duration: 1.4,
      delay,
      ease: "power3.out",
      motionPath: {
        path: [
          { x: position[0] - offsetX, y: position[1] + offsetY, z: -3 },
          { x: position[0] - 1, y: position[1] + 1, z: -1 },
          { x: position[0], y: position[1], z: position[2] },
        ],
        curviness: 1.8,
      },
    });

    gsap.from(mesh.rotation, {
      y: -0.4,
      z: -0.2,
      duration: 1.4,
      delay,
      ease: "power3.out",
    });

  }, [position, delay, paused, isMobile]);

  // Disable tilt on mobile
  useFrame(() => {
    if (paused || isMobile) return;

    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.x += (targetRotation.current.x - mesh.rotation.x) * 0.1;
    mesh.rotation.y += (targetRotation.current.y - mesh.rotation.y) * 0.1;
  });

  const handlePointerMove = (e) => {
    if (isMobile) return;
    if (!isHovering.current || paused) return;

    const { x, y } = e.uv;
    targetRotation.current = {
      x: -(y - 0.5) * 0.2,
      y: (x - 0.5) * 0.3,
    };
  };

  // Only geometry changes
  const boxSize = isMobile
    ? [1.7, 2.3, 0.05]
    : [2.3, 3.1, 0.05];

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => !paused && (isHovering.current = true)}
      onPointerLeave={() => !paused && (isHovering.current = false)}
      onPointerMove={handlePointerMove}
    >
      <RoundedBox args={boxSize}>
        <meshStandardMaterial color="#131399" />
      </RoundedBox>

      {/* HTML NOT changed */}
      <Html
        transform
        distanceFactor={1.5}
        position={[0, 0, 0.2]}
        occlude
        zIndexRange={[1, 0]}
        style={{ pointerEvents: paused ? "none" : "auto" }}
      >
        <div className="card">
          <div className="profile"><img src={image} alt="" /></div>
          <h2 className="title">{title}</h2>
          <p className="description">{description}</p>

          <button
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              if (paused) return;
              Navigate(navigate);
            }}
          >
            {btn}
          </button>
        </div>
      </Html>
    </mesh>
  );
}

export default VerticalBox;