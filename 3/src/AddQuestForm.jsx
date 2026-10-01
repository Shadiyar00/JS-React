import { useState } from "react";

const EMPTY = { title: "", realm: "Ashvale", difficulty: "Easy", reward: 100, steps: 3 };

export default function AddQuestForm({ onAdd }) {
  // Local form state; the parent only hears about it on submit
  const [draft, setDraft] = useState(EMPTY);
  console.log("AddQuestForm render");

  const set = (field) => (e) => setDraft({ ...draft, [field]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    onAdd({ ...draft, title: draft.title.trim(), reward: Number(draft.reward), steps: Number(draft.steps) });
    setDraft(EMPTY);
  };

  return (
    <form className="form" onSubmit={submit}>
      <label className="field grow">
        Quest title
        <input value={draft.title} onChange={set("title")} placeholder="Slay the bridge troll" required />
      </label>
      <label className="field">
        Realm
        <select value={draft.realm} onChange={set("realm")}>
          {["Ashvale", "Dunmere", "Thornwick", "Korr Peaks"].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
      <label className="field">
        Difficulty
        <select value={draft.difficulty} onChange={set("difficulty")}>
          {["Easy", "Medium", "Hard"].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </label>
      <label className="field narrow">
        Reward
        <input type="number" min="0" value={draft.reward} onChange={set("reward")} />
      </label>
      <label className="field narrow">
        Steps
        <input type="number" min="1" max="10" value={draft.steps} onChange={set("steps")} />
      </label>
      <button className="btn primary" type="submit">
        Post quest
      </button>
    </form>
  );
}
