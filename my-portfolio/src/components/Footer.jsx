export default function Footer() {
  const quickLinks = ["home", "about", "skills", "education", "work", "experience"];

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="footer">
      <div className="box-container">

        <div className="box">
          <h3>Babalo's Portfolio</h3>
          <p>
            Thank you for visiting my personal portfolio website. Connect with me
            over socials.
            <br /><br />
            Keep Rising 🚀
          </p>
        </div>

        <div className="box">
          <h3>Quick Links</h3>
          {quickLinks.map((link) => (
            <a href={`#${link}`} key={link} onClick={(e) => scrollTo(e, link)}>
              <i className="fas fa-chevron-circle-right"></i> {link}
            </a>
          ))}
        </div>

        <div className="box">
          <h3>Contact Info</h3>
          <p>
            <i className="fas fa-envelope"></i>babalonogqala2003@gmail.com
          </p>
          <p>
            <i className="fas fa-map-marked-alt"></i>Cape Town, South Africa
          </p>
          <div className="share">
            <a
              href="https://linkedin.com/"
              className="fab fa-linkedin"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            ></a>
            <a
              href="https://github.com/"
              className="fab fa-github"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            ></a>
          </div>
        </div>

      </div>

      <h1 className="credit">
        Designed with <i className="fa fa-heart fa-heart pulse"></i> by{" "}
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
          Babalo Nogqala
        </a>
      </h1>
    </section>
  );
}
