import { useEffect, useRef, useState } from "react";
import { resourcesApi, validateResource } from "../api/resources.js";
import { topics, levels, formats } from "../data/constants.js";
import Field from "./Field.jsx";
const initial = {
  title: "",
  description: "",
  url: "",
  topic: "React",
  level: "Beginner",
  format: "Guide",
  minutes: "30",
};
export default function ResourceForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [created, setCreated] = useState(null);
  const active = useRef(false);
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);
  function change(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }
  async function submit(event) {
    event.preventDefault();
    const nextErrors = validateResource(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStatus("saving");
    setMessage("");
    try {
      const item = await resourcesApi.add(values);
      if (active.current) {
        setCreated(item);
        setStatus("success");
      }
    } catch (error) {
      if (active.current) {
        setMessage(error.message);
        setStatus("error");
      }
    }
  }
  if (status === "success")
    return (
      <section className="success-card" role="status">
        <span>✓</span>
        <h1>A new idea on the shelf.</h1>
        <p>Your resource was saved in this browser.</p>
        <a className="button" href={`#/resource/${created.id}`}>
          View resource ↗
        </a>
        <button
          className="text-button"
          onClick={() => {
            setValues(initial);
            setStatus("idle");
          }}
        >
          Add another
        </button>
      </section>
    );
  return (
    <section className="form-page">
      <a className="back-link" href="#/">
        ← Back to collection
      </a>
      <div className="eyebrow">GROW YOUR COLLECTION</div>
      <h1>Something worth learning.</h1>
      <p>Add a guide, course, or practice task to your shelf.</p>
      <form onSubmit={submit} noValidate>
        <fieldset disabled={status === "saving"}>
          <Field label="Resource title" error={errors.title}>
            <input
              name="title"
              value={values.title}
              onChange={change}
              maxLength={120}
              placeholder="e.g. React: Understanding useEffect"
              aria-invalid={!!errors.title}
            />
          </Field>
          <div className="form-row">
            {[
              ["topic", "Topic", topics],
              ["level", "Level", levels],
              ["format", "Format", formats],
            ].map(([name, label, options]) => (
              <Field key={name} label={label} error={errors[name]}>
                <select name={name} value={values[name]} onChange={change}>
                  {options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
            ))}
          </div>
          <Field label="Description" error={errors.description}>
            <textarea
              name="description"
              value={values.description}
              onChange={change}
              rows={4}
              maxLength={1000}
              placeholder="What will you learn, and what should you try?"
              aria-invalid={!!errors.description}
            />
          </Field>
          <div className="form-row">
            <Field label="Source link" error={errors.url}>
              <input
                name="url"
                type="url"
                value={values.url}
                onChange={change}
                placeholder="https://…"
                aria-invalid={!!errors.url}
              />
            </Field>
            <Field label="Study time (minutes)" error={errors.minutes}>
              <input
                name="minutes"
                type="number"
                min="5"
                max="1200"
                value={values.minutes}
                onChange={change}
                aria-invalid={!!errors.minutes}
              />
            </Field>
          </div>
          {message && (
            <p className="field-error" role="alert">
              {message}
            </p>
          )}
          <div className="form-actions">
            <button className="button" type="submit">
              {status === "saving" ? "Saving…" : "Add to shelf ＋"}
            </button>
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setValues(initial);
                setErrors({});
                setMessage("");
              }}
            >
              Reset form
            </button>
          </div>
          <p className="form-note">
            Saved locally in your browser. All fields are required.
          </p>
        </fieldset>
      </form>
    </section>
  );
}
