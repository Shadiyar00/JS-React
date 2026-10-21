export function queryResources(
  items,
  {
    search = "",
    topic = "",
    level = "",
    format = "",
    sort = "title",
    page = 1,
    pageSize = 9,
  } = {},
) {
  const term = search.trim().toLowerCase();
  const filtered = items.filter(
    (item) =>
      (!term ||
        `${item.title} ${item.description}`.toLowerCase().includes(term)) &&
      (!topic || item.topic === topic) &&
      (!level || item.level === level) &&
      (!format || item.format === format),
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "duration")
      return a.minutes - b.minutes || a.id.localeCompare(b.id);
    if (sort === "newest")
      return b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id);
    return a.title.localeCompare(b.title) || a.id.localeCompare(b.id);
  });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  return {
    items: sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    total: sorted.length,
    totalPages,
    page: currentPage,
    catalogTotal: items.length,
  };
}
