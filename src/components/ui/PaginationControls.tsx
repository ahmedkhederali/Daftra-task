type Props = {
  page: number;
  totalPages?: number;
  onPage: (page: number) => void;
  shownCount?: number;
};


function getPages(current: number, total: number): (number | string)[] {
  if (!total) return [];
  // Show all if small number of pages
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | string)[] = [1];
  if (current > 3) pages.push("...");
  for (
    let i = Math.max(2, current - 2);
    i <= Math.min(total - 1, current + 2);
    i++
  ) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export function PaginationControls({
  page,
  totalPages = 1,
  onPage,
  shownCount = 20,
}: Props) {
  const pages = getPages(page, totalPages);

  const buttonStyle = (active = false, disabled = false) => ({
    background: active ? "#222" : "#fff",
    color: active ? "#fff" : "#222",
    border: "none",
    borderRadius: 6,
    padding: "8px 12px",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    minWidth: 44,
    boxShadow: active ? "0 2px 8px rgba(30,60,90,0.10)" : undefined,
  });

  return (
    <div style={{ textAlign: "center", marginTop: 24 }}>
      <nav
        aria-label="Pagination"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 8,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          padding: "0 4px",
          maxWidth: "100vw",
        }}
      >
        {/* Previous */}
        <button
          onClick={() => onPage(page - 1)}
          disabled={page <= 1}
          style={buttonStyle(false, page <= 1)}
        >
          &lt; Previous
        </button>

        {/* Page numbers */}
        <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
          {pages.map((p, idx) =>
            typeof p === "number" ? (
              <button
                key={p}
                onClick={() => onPage(p)}
                disabled={p === page}
                style={buttonStyle(p === page, p === page)}
              >
                {p}
              </button>
            ) : (
              <span
                key={`ellipsis-${idx}`}
                style={{ padding: "8px 0", minWidth: 24, color: "#888" }}
              >
                …
              </span>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPage(page + 1)}
          disabled={page >= totalPages}
          style={buttonStyle(false, page >= totalPages)}
        >
          Next &gt;
        </button>
      </nav>

      {/* Info */}
      <div style={{ color: "#555", fontSize: 16 }}>
        Page {page} of {totalPages} ({shownCount} Pokémon shown)
      </div>
    </div>
  );
}
