import { useState } from "react";
import QuestCard from "./QuestCard.jsx";
import AddQuestForm from "./AddQuestForm.jsx";
import "./App.css";

import { STATUSES } from "./constants.js";

const SEED = [
  { id: "q1", title: "Clear the Goblin Cellar", realm: "Ashvale", difficulty: "Easy", reward: 120, steps: 3, status: "Open", resetKey: 0 },
  { id: "q2", title: "Escort the Salt Caravan", realm: "Dunmere", difficulty: "Medium", reward: 340, steps: 5, status: "In Progress", resetKey: 0 },
  { id: "q3", title: "Map the Sunken Library", realm: "Thornwick", difficulty: "Hard", reward: 780, steps: 6, status: "Open", resetKey: 0 },
  { id: "q4", title: "Find the Miller's Lost Ring", realm: "Ashvale", difficulty: "Easy", reward: 60, steps: 2, status: "Completed", resetKey: 0 },
];

// Child component #1: summary counts (props only, no state)
function Summary({ quests }) {
  console.log("Summary render");
  const gold = quests.filter((q) => q.status === "Completed").reduce((sum, q) => sum + q.reward, 0);
  return (
    <p className="summary">
      {quests.length} quests on the board · {quests.filter((q) => q.status === "Completed").length} completed · {gold} gold earned
    </p>
  );
}

// Child component #2: filter + order controls (props only)
function Toolbar({ filter, onFilter, reversed, onReverse }) {
  console.log("Toolbar render");
  return (
    <div className="toolbar">
      <div className="tabs" role="group" aria-label="Filter by status">
        {["All", ...STATUSES].map((s) => (
          <button key={s} className={s === filter ? "tab on" : "tab"} onClick={() => onFilter(s)}>
            {s}
          </button>
        ))}
      </div>
      <button className="btn" onClick={onReverse}>
        {reversed ? "Show oldest first" : "Show newest first"}
      </button>
    </div>
  );
}

export default function App() {
  // Parent state: the list itself, the active filter, and the order
  const [quests, setQuests] = useState(SEED);
  const [filter, setFilter] = useState("All");
  const [reversed, setReversed] = useState(false);
  console.log("App render");

  const addQuest = (quest) =>
    setQuests((prev) => [...prev, { ...quest, id: crypto.randomUUID(), status: "Open", resetKey: 0 }]);
  const removeQuest = (id) => setQuests((prev) => prev.filter((q) => q.id !== id));
  const changeStatus = (id, status) =>
    setQuests((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
  // Bumping resetKey changes the card's key -> React unmounts it and mounts a fresh one
  const resetQuest = (id) =>
    setQuests((prev) => prev.map((q) => (q.id === id ? { ...q, resetKey: q.resetKey + 1 } : q)));

  const ordered = reversed ? [...quests].reverse() : quests;
  const matches = (q) => filter === "All" || q.status === filter;
  const shown = ordered.filter(matches).length;

  return (
    <div className="page">
      <header className="masthead">
        <h1>Guild Quest Board</h1>
        <Summary quests={quests} />
      </header>

      <AddQuestForm onAdd={addQuest} />
      <Toolbar filter={filter} onFilter={setFilter} reversed={reversed} onReverse={() => setReversed((r) => !r)} />

      {shown === 0 && (
        <p className="empty">No {filter.toLowerCase()} quests right now. Post one above or pick another filter.</p>
      )}

      <main className="grid">
        {/* Every quest stays mounted; non-matching ones are only hidden, so their local
            state survives filtering. The key is the quest id (+ resetKey), never the index. */}
        {ordered.map((q) => (
          <QuestCard
            key={`${q.id}-${q.resetKey}`}
            quest={q}
            hidden={!matches(q)}
            onStatus={changeStatus}
            onRemove={removeQuest}
            onReset={resetQuest}
          />
        ))}
      </main>
    </div>
  );
}
