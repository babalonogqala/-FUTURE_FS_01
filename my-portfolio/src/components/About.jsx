export default function About() {
  return (
    <section className="about" id="about">
      <h2 className="heading">
        <i className="fas fa-user-alt"></i> About <span>Me</span>
      </h2>

      <div className="row">
        <div className="image">
          <div className="about-avatar-large">B.N</div>
        </div>

        <div className="content">
          <h3>I'm Babalo</h3>
          <span className="tag">WordPress Developer</span>

          <p>
            I'm a WordPress developer based in Cape Town, South Africa. I build
            modern, functional websites with clean code and real attention to
            detail. I'm passionate about improving my skills and building
            real-world projects.
          </p>
          <p>
            My foundation is HTML, CSS, and PHP — the core stack that powers
            WordPress. I'm actively deepening my skills through a structured
            course and hands-on portfolio projects, aiming to join a web agency
            or company as a junior developer.
          </p>

          <div className="box-container">
            <div className="box">
              <p>
                <span>Email: </span>babalonogqala2003@gmail.com
              </p>
              <p>
                <span>Location: </span>Cape Town, South Africa
              </p>
            </div>
          </div>

          <div className="resumebtn">
            <a href="#" className="btn">
              <span>Resume</span>
              <i className="fas fa-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
