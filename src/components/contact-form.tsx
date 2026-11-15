"use client";

import { useEffect, useId, useState } from "react";
import { profile, services, whatsappLink } from "@/data/profile";
import { SELECT_INTENT_EVENT, type Intent } from "./contact-intent";
import { SELECT_SERVICE_EVENT } from "./service-button";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  service: string;
  timeline: string;
  message: string;
};
type Errors = { name?: string; email?: string; message?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTHER = "Something else";
const TIMELINES = ["As soon as possible", "Within 1–3 months", "Just exploring"];
const INTENTS: { value: Intent; label: string }[] = [
  { value: "job", label: "Job opportunity" },
  { value: "project", label: "Freelance project" },
];

function validate(values: Values, intent: Intent): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter an email like name@company.com.";
  if (!values.message.trim()) errors.message = intent === "job" ? "Tell me a little about the role." : "Tell me a little about the project.";
  return errors;
}

function contactLines(values: Values): string[] {
  const lines: string[] = [];
  if (values.email.trim()) lines.push(`Email: ${values.email.trim()}`);
  if (values.phone.trim()) lines.push(`Phone: ${values.phone.trim()}`);
  return lines;
}

function composeBody(values: Values, intent: Intent): string {
  if (intent === "job") {
    const company = values.company.trim();
    const role = values.role.trim();
    const lines = [
      `Hi Shubham, I'm ${values.name.trim()}${company ? ` from ${company}` : ""}. I'm reaching out about ${role ? `the ${role} role` : "a role"}.`,
      "",
      values.message.trim(),
      "",
      ...contactLines(values),
    ];
    return lines.join("\n").trim();
  }
  const lines = [
    `Hi Shubham, I'm ${values.name.trim()}.`,
    `Service: ${values.service || OTHER}`,
    `Timeline: ${values.timeline}`,
    "",
    values.message.trim(),
    "",
    ...contactLines(values),
  ];
  return lines.join("\n").trim();
}

/** Builds the enquiry and hands it to WhatsApp or the visitor's email app. No server or third-party service involved. */
export function ContactForm() {
  const id = useId();
  const [intent, setIntent] = useState<Intent>("job");
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    service: "",
    timeline: TIMELINES[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<"whatsapp" | "email" | null>(null);

  useEffect(() => {
    function onSelectService(event: Event) {
      const serviceId = (event as CustomEvent<string>).detail;
      const match = services.find((s) => s.id === serviceId);
      if (match) {
        setIntent("project");
        setValues((v) => ({ ...v, service: match.title }));
        setErrors((e) => ({ ...e, message: undefined }));
      }
    }
    function onSelectIntent(event: Event) {
      const next = (event as CustomEvent<Intent>).detail;
      if (next === "job" || next === "project") {
        setIntent(next);
        setErrors((e) => ({ ...e, message: undefined }));
      }
    }
    window.addEventListener(SELECT_SERVICE_EVENT, onSelectService);
    window.addEventListener(SELECT_INTENT_EVENT, onSelectIntent);
    return () => {
      window.removeEventListener(SELECT_SERVICE_EVENT, onSelectService);
      window.removeEventListener(SELECT_INTENT_EVENT, onSelectIntent);
    };
  }, []);

  function update(field: keyof Values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (field in errors && errors[field as keyof Errors]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function send(channel: "whatsapp" | "email") {
    const found = validate(values, intent);
    setErrors(found);
    const firstInvalid = (["name", "email", "message"] as const).find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(`${id}-${firstInvalid}`)?.focus();
      return;
    }
    const body = composeBody(values, intent);
    if (channel === "whatsapp") {
      window.open(whatsappLink(body), "_blank", "noopener,noreferrer");
    } else {
      const subject = intent === "job" ? `Job opportunity from ${values.name.trim()}` : `Project enquiry from ${values.name.trim()}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setSent(channel);
  }

  const labelClass = "text-mono text-[10px] tracking-widest text-muted uppercase";

  const field = (
    name: "name" | "email" | "phone" | "company" | "role" | "message",
    label: string,
    type: "text" | "email" | "tel" | "textarea",
    required = false,
  ) => {
    const inputId = `${id}-${name}`;
    const errorId = `${inputId}-error`;
    const error = name in errors ? errors[name as keyof Errors] : undefined;
    const common = {
      id: inputId,
      name,
      value: values[name],
      required,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId : undefined,
      className: "form-field",
    } as const;
    const autoComplete = { email: "email", phone: "tel", name: "name", company: "organization", role: "organization-title", message: "off" }[name];
    return (
      <div>
        <label htmlFor={inputId} className={labelClass}>
          {label}
          {required ? "" : " (optional)"}
        </label>
        {type === "textarea" ? (
          <textarea {...common} rows={5} onChange={(e) => update(name, e.target.value)} className="form-field resize-none" />
        ) : (
          <input {...common} type={type} autoComplete={autoComplete} onChange={(e) => update(name, e.target.value)} />
        )}
        {error && (
          <p id={errorId} className="mt-2 text-xs text-[var(--danger)]">
            {error}
          </p>
        )}
      </div>
    );
  };

  const select = (name: "service" | "timeline", label: string, options: string[], placeholder?: string) => {
    const inputId = `${id}-${name}`;
    return (
      <div>
        <label htmlFor={inputId} className={labelClass}>
          {label}
        </label>
        <select id={inputId} name={name} value={values[name]} onChange={(e) => update(name, e.target.value)} className="form-field">
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <form
      id="enquiry-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        send("whatsapp");
      }}
      className="flex flex-col gap-6 rounded-lg border border-line bg-surface/30 p-5 sm:p-8"
    >
      <fieldset className="min-w-0">
        <legend className={`${labelClass} mb-2`}>What&apos;s this about?</legend>
        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line-strong p-1 sm:rounded-full">
          {INTENTS.map((option) => (
            <label
              key={option.value}
              className="text-mono relative cursor-pointer rounded-xl px-2 py-2.5 text-center text-[10px] leading-tight tracking-wide sm:rounded-full sm:px-3 sm:text-[11px] sm:tracking-widest text-muted uppercase transition-colors has-[:checked]:bg-accent has-[:checked]:text-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
            >
              <input
                type="radio"
                name={`${id}-intent`}
                value={option.value}
                checked={intent === option.value}
                onChange={() => {
                  setIntent(option.value);
                  setErrors((e) => ({ ...e, message: undefined }));
                }}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
      {field("name", "Name", "text", true)}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {field("email", "Email", "email")}
        {field("phone", "Phone or WhatsApp", "tel")}
      </div>
      {intent === "job" ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {field("company", "Company", "text")}
            {field("role", "Role or position", "text")}
          </div>
          {field("message", "Tell me about the role", "textarea", true)}
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {select("service", "Service", [...services.map((s) => s.title), OTHER], "Choose a service")}
            {select("timeline", "Timeline", TIMELINES)}
          </div>
          {field("message", "Project details", "textarea", true)}
        </>
      )}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn-accent w-full justify-center sm:w-auto">
            Send on WhatsApp
          </button>
          <button type="button" onClick={() => send("email")} className="btn-outline w-full justify-center sm:w-auto">
            Send by email
          </button>
        </div>
        <p className="text-xs leading-relaxed text-muted" aria-live="polite">
          {sent
            ? `Your ${sent === "whatsapp" ? "WhatsApp" : "email app"} should be open with the message filled in. If nothing happened, message ${profile.whatsappDisplay} on WhatsApp or write to ${profile.email}.`
            : "Both open your WhatsApp or email app with this message filled in."}
        </p>
      </div>
    </form>
  );
}
