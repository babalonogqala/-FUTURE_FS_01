import skills from "../data/skills.js";

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <h2 className="heading">
        <i className="fas fa-laptop-code"></i> Skills &amp;{" "}
        <span>Abilities</span>
      </h2>

      <div className="container">
        <div className="row" id="skillsContainer">
          {skills.map((skill) => (
            <div className="bar" key={skill.name}>
              <div className="info">
                <img src={skill.icon} alt={skill.name} loading="lazy" />
                <span>{skill.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
