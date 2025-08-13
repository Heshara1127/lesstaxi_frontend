export default function Pagination({ page, setPage, total, perPage }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <div className="mt-6 flex justify-center space-x-2">
      {[...Array(pages)].map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded ${
              p === page ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}
