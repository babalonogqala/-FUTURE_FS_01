import projects from "../data/projects.js";

const PROJECT_EMOJIS = ["🏠", "🍽️", "🎟️", "👤"];

export default function Work() {
  return (
    <section className="work" id="work">
      <h2 className="heading">
        <i className="fas fa-laptop-code"></i> Projects <span>Made</span>
      </h2>

      <div className="box-container">
        {projects.map((project, i) => (
          <div className="box" key={project.name}>
            <div className="placeholder-img">{PROJECT_EMOJIS[i] || "💻"}</div>
            <div className="content">
              <div className="tag">
                <h3>{project.name}</h3>
              </div>
              <div className="desc">
                <p>{project.desc}</p>
                <div className="btns">
                  <a
                    href={project.links.view}
                    className="btn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fas fa-eye"></i> View
                  </a>
                  <a
                    href={project.links.code}
                    className="btn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Code <i className="fas fa-code"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="viewall">
        <a href="#" className="btn">
          <span>View All</span>
          <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </section>
  );
}
