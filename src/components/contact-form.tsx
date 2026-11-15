"use client";

import { useId, useState } from "react";
import { profile } from "@/data/profile";

type Errors = { name?: string; email?: string; message?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your email so I can reply.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter an email like name@company.com.";
  if (!values.message.trim()) errors.message = "Write a short message.";
  return errors;
}

/** Builds the message and hands it to the visitor's email app. No server or third-party service involved. */
export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (["name", "email", "message"] as const).find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(`${id}-${firstInvalid}`)?.focus();
      return;
    }
    const subject = `Portfolio enquiry from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field = (name: keyof typeof values, label: string, type: "text" | "email" | "textarea") => {
    const inputId = `${id}-${name}`;
    const errorId = `${inputId}-error`;
    const common = {
      id: inputId,
      name,
      value: values[name],
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? errorId : undefined,
      className: "form-field",
    } as const;
    return (
      <div>
        <label htmlFor={inputId} className="text-mono text-[10px] tracking-widest text-muted uppercase">
          {label}
        </label>
        {type === "textarea" ? (
          <textarea {...common} rows={4} onChange={(e) => update(name, e.target.value)} className="form-field resize-none" />
        ) : (
          <input
            {...common}
            type={type}
            autoComplete={name === "email" ? "email" : "name"}
            onChange={(e) => update(name, e.target.value)}
          />
        )}
        {errors[name] && (
          <p id={errorId} className="mt-2 text-xs text-[var(--danger)]">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6 rounded-lg border border-line bg-surface/30 p-6 sm:p-8">
      {field("name", "Name", "text")}
      {field("email", "Email", "email")}
      {field("message", "Message", "textarea")}
      <div className="flex flex-col gap-3">
        <button type="submit" className="btn-accent self-start">
          Open in email app
        </button>
        <p className="text-xs leading-relaxed text-muted" aria-live="polite">
          {sent
            ? `Your email app should be open with the message filled in. If nothing happened, write to ${profile.email}.`
            : "Sending opens your email app with this message filled in."}
        </p>
      </div>
    </form>
  );
}
