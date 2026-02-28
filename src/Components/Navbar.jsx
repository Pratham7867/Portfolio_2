import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (path) => {
    setOpen(false);
    setTimeout(() => navigate(path), 400);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => handleNav("/")}>
            Pratham.dev
          </div>

          {/* Desktop Links */}
          <ul className="nav-links desktop">
            <li><button onClick={() => handleNav("/")}>Home</button></li>
            <li><button onClick={() => handleNav("/contact")}>Contact</button></li>
            <li>
              <a href="https://github.com/Pratham7867" target="_blank" rel="noreferrer">
                Github
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/pratham-gedam-b42a31275/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <div className="hamburger" onClick={() => setOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* ✅ MOBILE MENU VIA PORTAL */}
      {open &&
        createPortal(
          <div className="mobile-drawer">
            
            <div className="overlay" onClick={() => setOpen(false)} />

            <div className="drawer-panel">

              <button className="close-btn" onClick={() => setOpen(false)}>
    <span></span>
    <span></span>
  </button>
              <button onClick={() => handleNav("/")}>Home</button>
              <button onClick={() => handleNav("/contact")}>Contact</button>

              <a href="https://github.com/Pratham7867" target="_blank" rel="noreferrer">
                Github
              </a>

              <a href="https://www.linkedin.com/in/pratham-gedam-b42a31275/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>,
          document.body   // ← renders outside everything
        )}
    </>
  );
}