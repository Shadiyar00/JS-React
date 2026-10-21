export default function Pagination({ page, totalPages, onChange }) {
  return (
    <nav className="pagination" aria-label="Catalog pages">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        ← Previous
      </button>
      <span>
        Page <b>{page}</b> of {totalPages}
      </span>
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Next →
      </button>
    </nav>
  );
}
