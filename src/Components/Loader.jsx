import { useEffect } from "react";

export default function Loader({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // tell App to show main website
    }, 2500); // duration of intro screen

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="intro">
      <div className="intro-content">
        <h1 className="logo2">Pratham.dev</h1>

        <div className="Loadline"></div>

        <p className="tag">Hi... Welcom to my Portfolio</p>
      </div>
    </div>
  );
}