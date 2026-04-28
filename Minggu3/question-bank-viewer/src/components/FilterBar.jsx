export default function FilterBar({ filters, onFilterChange, sort, onSortChange }) {
  const tipeOptions = [
    { value: '', label: 'Semua Tipe Soal' },
    { value: 'pilihan_ganda', label: 'Pilihan Ganda' },
    { value: 'essay', label: 'Essay' },
    { value: 'praktikum', label: 'Praktikum' },
  ];

  const sortOptions = [
    { value: '', label: 'Paling Relevan' },
    { value: 'tahun_desc', label: 'Tahun Terabaru' },
    { value: 'tahun_asc', label: 'Tahun Terlama' },
    { value: 'matkul_asc', label: 'Mata Kuliah (A-Z)' },
    { value: 'matkul_desc', label: 'Mata Kuliah (Z-A)' },
  ];

  const handleSortChange = (e) => {
    const val = e.target.value;
    if (!val) {
      onSortChange({ sortBy: '', sortDir: '' });
      return;
    }
    const [by, dir] = val.split('_');
    onSortChange({ sortBy: by, sortDir: dir });
  };

  const currentSortValue = sort.sortBy ? `${sort.sortBy}_${sort.sortDir}` : '';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <h3 className="font-semibold text-slate-800">Filter & Urutkan</h3>
      </div>

      {/* Pencarian */}
      <div>
        <label htmlFor="search-matkul" className="block text-sm font-medium text-slate-700 mb-1.5">
          Pencarian Mata Kuliah
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="search-matkul"
            type="text"
            placeholder="Cari matkul..."
            value={filters.matkul}
            onChange={(e) => onFilterChange({ matkul: e.target.value })}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-shadow bg-slate-50 hover:bg-white"
          />
        </div>
      </div>

      {/* Tipe Soal */}
      <div>
        <label htmlFor="filter-tipe" className="block text-sm font-medium text-slate-700 mb-1.5">
          Tipe Soal
        </label>
        <div className="relative">
          <select
            id="filter-tipe"
            value={filters.tipe}
            onChange={(e) => onFilterChange({ tipe: e.target.value })}
            className="block w-full pl-3 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-shadow appearance-none bg-slate-50 hover:bg-white"
          >
            {tipeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      {/* Urutkan */}
      <div>
        <label htmlFor="sort-select" className="block text-sm font-medium text-slate-700 mb-1.5">
          Urutkan Berdasarkan
        </label>
        <div className="relative">
          <select
            id="sort-select"
            value={currentSortValue}
            onChange={handleSortChange}
            className="block w-full pl-3 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-shadow appearance-none bg-slate-50 hover:bg-white"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      {(filters.matkul || filters.tipe || sort.sortBy) && (
        <button
          onClick={() => {
            onFilterChange({ matkul: '', tipe: '' });
            onSortChange({ sortBy: '', sortDir: '' });
          }}
          className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium rounded-xl transition-colors mt-2"
        >
          Reset Filter
        </button>
      )}
    </div>
  );
}
