import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/prathamgedam06@gmail.com",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success === "true" || response.ok) {
        alert("Message sent successfully!");
        e.target.reset();
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".contact-reveal");

      gsap.fromTo(
        elements,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div className="contact-wrapper">
        <div className="contact-heading">
          <h1 className="contact-reveal">Let's Connect</h1>
          <span className="contact-reveal line" />
        </div>

        <p className="contact-reveal contact-text">
          I'm always open to discussing new opportunities, collaborations,
          or interesting projects.
        </p>

        <div className="contact-cards">
          <div className="contact-card contact-reveal">
            <h3>Email</h3>
            <p>prathamgedam06@gmail.com</p>
          </div>

          <div className="contact-card contact-reveal">
            <h3>Location</h3>
            <p>Nagpur, Maharashtra, India</p>
          </div>

          <div className="contact-card contact-reveal">
            <h3>Availability</h3>
            <p>Open to Full-Time & Freelance Roles</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form contact-reveal">
          <input type="hidden" name="_captcha" value="false" />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}