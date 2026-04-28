export default function Pagination({ meta, page, onPageChange }) {
  if (!meta || meta.last_page <= 1) return null;

  const { current_page, last_page, total, per_page } = meta;
  const from = (current_page - 1) * per_page + 1;
  const to = Math.min(current_page * per_page, total);

  // Pagination logic to show max 5 page buttons with ellipses
  const getPageNumbers = () => {
    const range = [];
    const delta = 2;
    const start = Math.max(1, current_page - delta);
    const end = Math.min(last_page, current_page + delta);

    if (start > 1) { range.push(1); if (start > 2) range.push('...'); }
    for (let i = start; i <= end; i++) range.push(i);
    if (end < last_page) { if (end < last_page - 1) range.push('...'); range.push(last_page); }

    return range;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Information text */}
      <div className="text-sm text-slate-500">
        Menampilkan <span className="font-medium text-slate-900">{from}</span> hingga{' '}
        <span className="font-medium text-slate-900">{to}</span> dari{' '}
        <span className="font-medium text-slate-900">{total}</span>
      </div>

      {/* Pagination Controls */}
      <nav className="inline-flex shadow-sm rounded-md" aria-label="Pagination">
        
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={current_page === 1}
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="sr-only">Previous</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>

        {getPageNumbers().map((p, i) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${i}`} className="relative inline-flex items-center px-4 py-2 border border-slate-200 bg-white text-sm font-medium text-slate-700">
                ...
              </span>
            );
          }
          const isActive = p === current_page;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`relative inline-flex items-center px-3.5 py-2 border text-sm font-medium focus:z-10 transition-colors ${
                isActive
                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={current_page === last_page}
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="sr-only">Next</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>

      </nav>
    </div>
  );
}
