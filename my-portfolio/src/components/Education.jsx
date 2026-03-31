const educationData = [
  {
    emoji: "💻",
    title: "WordPress Developer Course",
    school: "Udemy — Become a WordPress Developer: Unlocking Power With Code",
    year: "2025 - Present | In Progress",
  },
  {
    emoji: "🎓",
    title: "Self-Taught Frontend Foundations",
    school: "HTML, CSS & JavaScript — Independent Study",
    year: "2023 - 2025 | Completed",
  },
];

export default function Education() {
  return (
    <section className="education" id="education">
      <h1 className="heading">
        <i className="fas fa-graduation-cap"></i> My <span>Education</span>
      </h1>

      <p className="qoute">
        Education is not the learning of facts, but the training of the mind to think.
      </p>

      <div className="box-container">
        {educationData.map((ed) => (
          <div className="box" key={ed.title}>
            <div className="image">
              <div className="edu-placeholder">{ed.emoji}</div>
            </div>
            <div className="content">
              <h3>{ed.title}</h3>
              <p>{ed.school}</p>
              <h4>{ed.year}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
