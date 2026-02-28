import { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null); // for animation
  const formRef = useRef(null);    // for EmailJS
  const serviceKey = import.meta.env.VITE_EMAIL_SERVICE;
  const templateKey = import.meta.env.VITE_EMAIL_TEMPLATE;
  const publicKey = import.meta.env.VITE_EMAIL_PUBLIC;


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        `${serviceKey}`,
        `${templateKey}`,
        formRef.current,   // ✅ now this is the real form
        `${publicKey}`
      )
      .then(() => {
        alert("Message Sent Successfully!");
        formRef.current.reset();
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("Something went wrong.");
      });
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

        {/* ✅ IMPORTANT: ref must be here */}
        <form ref={formRef} className="contact-form contact-reveal" onSubmit={sendEmail}>
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="from_email"
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
