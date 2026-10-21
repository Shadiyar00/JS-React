export default function StatusPanel({
  title,
  message,
  action,
  actionLabel,
  error = false,
}) {
  return (
    <section
      className={`status ${error ? "error" : ""}`}
      role={error ? "alert" : "status"}
    >
      <span className="status-icon">{error ? "!" : "◌"}</span>
      <h2>{title}</h2>
      <p>{message}</p>
      {action && (
        <button className="button" onClick={action}>
          {actionLabel}
        </button>
      )}
    </section>
  );
}
