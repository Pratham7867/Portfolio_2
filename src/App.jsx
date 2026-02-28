import React, { useState, lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "./Components/Loader";
import Navbar from "./Components/Navbar";
import PageTransition from "./Components/PageTransition";
import CursorBall from "./Components/CursurBall";
import Contact from "./Components/Contact";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";

// Lazy Pages
const Plane = lazy(() => import("./3D/Plane"));
const About = lazy(() => import("./Components/About"));

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const location = useLocation();

  // 🔥 This controls WHEN the new page is actually rendered
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isAnimating, setIsAnimating] = useState(false);

  // Detect route change
  useEffect(() => {
    if (location !== displayLocation) {
      setIsAnimating(true); // start animation
    }
  }, [location, displayLocation]);

  return (
    <>
      {showIntro ? (
        <Loader onFinish={() => setShowIntro(false)} />
      ) : (
        <>
          <Navbar />

          {/* 🔥 Runs animation ONLY when route changes */}
          <PageTransition
            isAnimating={isAnimating}
            onFinish={() => {
              setIsAnimating(false);
              setDisplayLocation(location);
            }}
            onCovered={() => {
              // 🔥 swap page while hidden
              setDisplayLocation(location);
            }}
          />
          <CursorBall/>
          {/* 🔥 Render OLD page until animation completes */}
          <Suspense fallback={null}>
            <Routes location={displayLocation}>
              <Route path="/" element={<Plane paused={isAnimating} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/skills" element={<Skills/>} />
              <Route path="/projects" element={<Projects/>} />
            </Routes>
          </Suspense>
        </>
      )}
    </>
  );
}

export default App;