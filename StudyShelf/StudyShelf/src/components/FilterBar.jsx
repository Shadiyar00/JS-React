import { topics, levels, formats } from "../data/constants.js";
export default function FilterBar({ query, onChange, onReset }) {
  return (
    <section className="filters" aria-label="Search and filters">
      <label className="search">
        <span aria-hidden="true">⌕</span>
        <input
          aria-label="Search resources"
          placeholder="Search a topic, skill, or keyword…"
          value={query.search}
          onChange={(event) => onChange("search", event.target.value)}
        />
      </label>
      <div className="filter-row">
        {[
          ["topic", "All topics", topics],
          ["level", "All levels", levels],
          ["format", "All formats", formats],
        ].map(([key, label, options]) => (
          <label key={key}>
            <span className="sr-only">{label}</span>
            <select
              value={query[key]}
              onChange={(event) => onChange(key, event.target.value)}
            >
              <option value="">{label}</option>
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
        <button className="text-button" onClick={onReset}>
          Reset filters ↺
        </button>
      </div>
    </section>
  );
}
