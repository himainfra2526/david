// Custom hook untuk fetch data soal dari Laravel API
import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'http://localhost:8000/api';

export function useSoal({ matkul, tipe, sortBy, sortDir, page, perPage }) {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);   // pagination meta
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSoal = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Build query params
    const params = new URLSearchParams();
    if (matkul) params.append('matkul', matkul);
    if (tipe)   params.append('tipe', tipe);
    if (sortBy) params.append('sort_by', sortBy);
    if (sortDir) params.append('sort_dir', sortDir);
    params.append('page', page);
    params.append('per_page', perPage);

    try {
      const res = await fetch(`${API_BASE}/soal?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Server merespons dengan status ${res.status}`);
      }
      const json = await res.json();
      if (!json.success) {
        throw new Error(json.message || 'Terjadi kesalahan pada server');
      }
      // Laravel paginate wraps items in json.data.data
      setData(json.data.data ?? json.data);
      setMeta(json.data ?? null);
    } catch (err) {
      setError(err.message || 'Gagal menghubungi server. Pastikan Laravel API sedang berjalan.');
      setData([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, [matkul, tipe, sortBy, sortDir, page, perPage]);

  useEffect(() => {
    fetchSoal();
  }, [fetchSoal]);

  return { data, meta, loading, error, refetch: fetchSoal };
}
