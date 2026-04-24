import React, { useState } from "react";
import { useStore } from "../utils/useStore.js";
import { profile } from "../data/profile.js";

export default function ContactModal() {
  const open = useStore((s) => s.contactOpen);
  const toggle = useStore((s) => s.toggleContact);
  const [status, setStatus] = useState("");

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !message) return setStatus("Please fill in all fields.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus("Please enter a valid email.");

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    setStatus("Opening your email app…");
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="modal-backdrop" onClick={() => toggle(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ "--accent": "#f472b6" }}>
        <button className="modal-close" onClick={() => toggle(false)}>✕</button>
        <span className="modal-tag">Contact</span>
        <h2 className="modal-title">Let's build something useful.</h2>
        <p className="modal-short">
          Open to internships, junior full-stack roles, and freelance projects in education,
          productivity, or practical digital tools.
        </p>

        <div className="contact-cards">
          <a className="contact-card" href={`mailto:${profile.email}`}>
            <strong>Email</strong><span>{profile.email}</span>
          </a>
          <a className="contact-card" href={profile.github} target="_blank" rel="noopener">
            <strong>GitHub</strong><span>View projects and repositories</span>
          </a>
          <a className="contact-card" href={profile.linkedin} target="_blank" rel="noopener">
            <strong>LinkedIn</strong><span>Connect professionally</span>
          </a>
        </div>

        <form onSubmit={submit} className="contact-form" noValidate>
          <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
          <label>Email<input name="email" type="email" placeholder="you@example.com" required /></label>
          <label>Message<textarea name="message" rows="4" placeholder="Tell me about your project or opportunity…" required /></label>
          <button className="btn btn-primary" type="submit">Send Message</button>
          <p className="form-status">{status}</p>
        </form>
      </div>
    </div>
  );
}
