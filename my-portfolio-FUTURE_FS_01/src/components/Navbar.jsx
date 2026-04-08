import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  // Close menu & update active on scroll
  useEffect(() => {
    const onScroll = () => {
      setMenuOpen(false);
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveLink(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header>
      <a
        href="#home"
        className="logo"
        onClick={(e) => handleNavClick(e, "#home")}
      >
        B.N
      </a>

      <nav className={`navbar${menuOpen ? " nav-toggle" : ""}`}>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeLink === link.href ? "active" : ""}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        id="menu"
        className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      />
    </header>
  );
}
