export function TopicMark({ topic }) {
  return (
    <span
      className={`topic-mark topic-${topic.toLowerCase()}`}
      aria-hidden="true"
    >
      {{
        React: "⚛",
        Python: "Py",
        SQL: "SQL",
        JavaScript: "JS",
        Git: "git",
        CSS: "#",
        Django: "dj",
        Linux: ">_",
      }[topic] || "↗"}
    </span>
  );
}
export default function ResourceCard({ item }) {
  return (
    <article className="resource-card">
      <div className="card-top">
        <TopicMark topic={item.topic} />
        <span className="format">{item.format}</span>
      </div>
      <div className="eyebrow">{item.topic}</div>
      <h3>
        <a href={`#/resource/${item.id}`}>{item.title}</a>
      </h3>
      <p>{item.description}</p>
      <div className="card-bottom">
        <span className="level">{item.level}</span>
        <span>
          {item.minutes} min <span aria-hidden="true">↗</span>
        </span>
      </div>
    </article>
  );
}
