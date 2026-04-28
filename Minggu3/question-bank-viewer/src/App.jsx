import { useState, useCallback } from 'react';
import './index.css';
import { useSoal } from './hooks/useSoal';
import FilterBar from './components/FilterBar';
import QuestionList from './components/QuestionList';
import Pagination from './components/Pagination';

const PER_PAGE = 10;

export default function App() {
  const [filters, setFilters] = useState({ matkul: '', tipe: '' });
  const [sort, setSort] = useState({ sortBy: '', sortDir: '' });
  const [page, setPage] = useState(1);

  const handleFilterChange = useCallback((patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  }, []);

  const handleSortChange = useCallback((newSort) => {
    setSort(newSort);
    setPage(1);
  }, []);

  const { data, meta, loading, error } = useSoal({
    matkul: filters.matkul,
    tipe: filters.tipe,
    sortBy: sort.sortBy,
    sortDir: sort.sortDir,
    page,
    perPage: PER_PAGE,
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navbar / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">Question Bank</h1>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">HIMA Informatika</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar: Filters */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="sticky top-24">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              sort={sort}
              onSortChange={handleSortChange}
            />
          </div>
        </div>

        {/* Right Content: Stats & List */}
        <div className="flex-1 min-w-0">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Daftar Soal</h2>
              <p className="text-sm text-slate-500 mt-1">
                Menampilkan hasil untuk {filters.matkul || 'semua mata kuliah'}
              </p>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
              <span className="text-sm font-semibold text-slate-700">Total: </span>
              <span className="text-sm font-bold text-indigo-600">{loading ? '...' : (meta?.total ?? 0)}</span>
              <span className="text-sm text-slate-500 ml-1">soal</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <QuestionList data={data} loading={loading} error={error} perPage={PER_PAGE} />
            
            {/* Pagination Footer */}
            {!loading && !error && meta?.total > 0 && (
              <div className="bg-slate-50 p-4 border-t border-slate-200">
                <Pagination meta={meta} page={page} onPageChange={setPage} />
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
