import QuestionCard from './QuestionCard';

function SkeletonCard() {
  return (
    <div className="flex p-5 border-b border-slate-100 last:border-b-0 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-slate-200 mr-4 shrink-0" />
      <div className="flex-1 pt-1">
        <div className="h-4 bg-slate-200 rounded-md w-1/3 mb-3" />
        <div className="flex gap-2">
          <div className="h-5 bg-slate-200 rounded-md w-24" />
          <div className="h-5 bg-slate-200 rounded-md w-16" />
        </div>
      </div>
    </div>
  );
}

export default function QuestionList({ data, loading, error, perPage }) {
  if (loading) {
    return (
      <div className="flex flex-col">
        {Array.from({ length: perPage }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Gagal Memuat Data</h3>
        <p className="text-slate-500 max-w-sm mx-auto">{error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Tidak Ada Soal</h3>
        <p className="text-slate-500">Ubah filter pencarian Anda untuk melihat hasil.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {data.map((soal) => (
        <QuestionCard key={soal.id} soal={soal} />
      ))}
    </div>
  );
}
