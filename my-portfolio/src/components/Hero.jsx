import { useState, useEffect } from "react";

const TYPING_STRINGS = [
  "WordPress Development",
  "PHP Development",
  "Frontend Development",
  "Building Real Projects",
];

export default function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_STRINGS[index];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % TYPING_STRINGS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <section className="home" id="home">
      <div className="content">
        <h2>
          Hi There,<br /> I'm Babalo <span>Nogqala</span>
        </h2>
        <p>
          I am into <span className="typing-text">{displayed}</span>
          <span style={{ borderRight: "2px solid #8a0808", animation: "none" }}>|</span>
        </p>

        <a href="#about" className="hero-btn" onClick={(e) => {
          e.preventDefault();
          document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
        }}>
          <span>About Me</span>
          <i className="fas fa-arrow-circle-down"></i>
        </a>

        <div className="socials">
          <ul className="social-icons">
            <li>
              <a className="linkedin" aria-label="LinkedIn" href="https://linkedin.com/" target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a className="github" aria-label="GitHub" href="https://github.com/" target="_blank" rel="noreferrer">
                <i className="fab fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="image">
        <div className="hero-avatar">B.N</div>
      </div>
    </section>
  );
}
