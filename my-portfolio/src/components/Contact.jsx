import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully! I will get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="contact" id="contact">
      <h2 className="heading">
        <i className="fas fa-headset"></i> Get in <span>Touch</span>
      </h2>

      <div className="container">
        <div className="content">
          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="field">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-user"></i>
              </div>
              <div className="field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-envelope"></i>
              </div>
              <div className="field">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                />
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="message">
                <textarea
                  placeholder="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-comment-dots"></i>
              </div>
            </div>
            <div className="button-area">
              <button type="submit">
                Submit <i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
