import experiences from "../data/experiences.js";

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <h2 className="heading">
        <i className="fas fa-briefcase"></i> Experience
      </h2>

      <div className="timeline">
        {experiences.map((exp, i) => (
          <div className={`container ${exp.side}`} key={i}>
            <div className="content">
              <div className="tag">
                <h2>{exp.company}</h2>
              </div>
              <div className="desc">
                <h3>{exp.role}</h3>
                <p>{exp.period}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="morebtn">
        <a href="#" className="btn">
          <span>View All</span>
          <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </section>
  );
}
