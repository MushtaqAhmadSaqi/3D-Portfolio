import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { useStore } from "../utils/useStore.js";
import { profile } from "../data/profile.js";
import { useModalAccessibility } from "../utils/useModalAccessibility.js";

export default function ContactModal() {
  const open = useStore((s) => s.contactOpen);
  const toggleContact = useStore((s) => s.toggleContact);
  const [status, setStatus] = useState("");

  const titleId = useId();
  const descId = useId();
  const statusId = useId();
  const closeButtonRef = useRef(null);

  const close = useCallback(() => {
    toggleContact(false);
  }, [toggleContact]);

  const modalRef = useModalAccessibility({
    open,
    onClose: close,
    initialFocusRef: closeButtonRef,
  });

  useEffect(() => {
    if (open) setStatus("");
  }, [open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    setStatus("Opening your email app.");
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        style={{ "--accent": "#f472b6" }}
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          onClick={close}
          aria-label="Close contact dialog"
        >
          ✕
        </button>

        <span className="modal-tag">Contact</span>

        <h2 id={titleId} className="modal-title">
          Let&apos;s build something useful.
        </h2>

        <p id={descId} className="modal-short">
          Open to internships, junior full-stack roles, and freelance projects in education,
          productivity, or practical digital tools.
        </p>

        <div className="contact-cards" aria-label="Contact links">
          <a className="contact-card" href={`mailto:${profile.email}`}>
            <strong>Email</strong>
            <span>{profile.email}</span>
          </a>

          <a className="contact-card" href={profile.github} target="_blank" rel="noopener noreferrer">
            <strong>GitHub</strong>
            <span>View projects and repositories</span>
          </a>

          <a className="contact-card" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <strong>LinkedIn</strong>
            <span>Connect professionally</span>
          </a>
        </div>

        <form onSubmit={submit} className="contact-form" noValidate aria-describedby={statusId}>
          <label>
            Name
            <input
              name="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="4"
              placeholder="Tell me about your project or opportunity…"
              required
            />
          </label>

          <button className="btn btn-primary" type="submit">
            Open Email App
          </button>

          <p id={statusId} className="form-status" role="status" aria-live="polite">
            {status}
          </p>
        </form>
      </div>
    </div>
  );
}
