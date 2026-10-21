import { useState } from "react";
import { STATUSES } from "./constants.js";

export default function QuestCard({ quest, hidden, onStatus, onRemove, onReset }) {
  // Local state: lives in this card only and is tied to its key
  const [steps, setSteps] = useState(0);
  const [note, setNote] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);
  console.log(`QuestCard render: ${quest.title}`);

  const done = quest.status === "Completed";
  const percent = done ? 100 : Math.round((steps / quest.steps) * 100);

  return (
    <article className={`card ${done ? "card-done" : ""}`} hidden={hidden}>
      <div className="card-head">
        <h2>{quest.title}</h2>
        <span className={`tag tag-${quest.difficulty.toLowerCase()}`}>{quest.difficulty}</span>
      </div>
      <p className="meta">
        {quest.realm} · {quest.reward} gold
      </p>

      <label className="field">
        Status
        <select value={quest.status} onChange={(e) => onStatus(quest.id, e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>

      <div className="progress" aria-label={`Progress ${percent}%`}>
        <div className="bar" style={{ width: `${percent}%` }} />
      </div>
      <div className="row">
        {done ? (
          <span className="done-text">Quest complete</span>
        ) : (
          <>
            <span>
              Steps {steps}/{quest.steps}
            </span>
            <button className="btn small" onClick={() => setSteps((s) => s - 1)} disabled={steps === 0}>
              −
            </button>
            <button className="btn small" onClick={() => setSteps((s) => s + 1)} disabled={steps === quest.steps}>
              +
            </button>
          </>
        )}
      </div>

      <button className="link" onClick={() => setNoteOpen((o) => !o)}>
        {noteOpen ? "Hide field notes" : note ? "Show field notes (1)" : "Add field notes"}
      </button>
      {noteOpen && (
        <textarea rows="3" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Clues, allies, dangers…" />
      )}

      <div className="row actions">
        <button className="btn small" onClick={() => onReset(quest.id)}>
          Reset progress
        </button>
        <button className="btn small danger" onClick={() => onRemove(quest.id)}>
          Remove
        </button>
      </div>
    </article>
  );
}
