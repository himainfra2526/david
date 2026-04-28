// StatsBar — shows a quick summary of results
export default function StatsBar({ meta, loading }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div
        className="flex items-center gap-2 rounded-xl px-4 py-2"
        style={{
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
        }}
      >
        <span className="text-lg">📚</span>
        <div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Total Soal</div>
          <div className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>
            {loading ? '—' : (meta?.total ?? 0)}
          </div>
        </div>
      </div>

      <div
        className="flex items-center gap-2 rounded-xl px-4 py-2"
        style={{
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.2)',
        }}
      >
        <span className="text-lg">📄</span>
        <div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Halaman</div>
          <div className="text-sm font-bold" style={{ color: '#10b981' }}>
            {loading ? '—' : `${meta?.current_page ?? 1} / ${meta?.last_page ?? 1}`}
          </div>
        </div>
      </div>
    </div>
  );
}
