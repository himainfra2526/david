const TIPE_CONFIG = {
  pilihan_ganda: {
    label: 'Pilihan Ganda',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: (
      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
  essay: {
    label: 'Essay',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: (
      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
    ),
  },
  praktikum: {
    label: 'Praktikum',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: (
      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
    ),
  },
};

export default function QuestionCard({ soal }) {
  const tipeConf = TIPE_CONFIG[soal.tipe] ?? {
    label: soal.tipe,
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: null,
  };

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 transition-colors hover:bg-slate-50 border-b border-slate-100 last:border-b-0">
      
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
          #{soal.id}
        </div>
        
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="font-semibold text-slate-900 truncate pr-4 text-base">
            {soal.matkul}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${tipeConf.badgeClass}`}>
              {tipeConf.icon}
              {tipeConf.label}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
              <svg className="w-3.5 h-3.5 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Tahun {soal.tahun}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

    </div>
  );
}
