import { useState, useEffect, useCallback } from 'react';
import { fetchData, loadData } from '../services/dataService';

// Memuat data JSON dan melaporkan status loading/error.
//
// `sumber` bisa berupa:
//   - nama sumber terdaftar, mis. 'silabus' | 'mentors'
//   - path langsung dimulai '/', mis. '/content/kuis/modul-03.json'
const useDataLoader = (sumber) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const hasil = sumber?.startsWith('/') ? await fetchData(sumber) : await loadData(sumber);
      setData(hasil);
    } catch (err) {
      // Data yang memang tidak ada (mis. modul tanpa kuis) bukan kegagalan sistem,
      // jadi tidak perlu dicatat sebagai error di konsol.
      if (!err.notFound) {
        console.error(`Gagal memuat data "${sumber}":`, err);
      }
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [sumber]);

  useEffect(() => {
    let diabaikan = false;

    const jalankan = async () => {
      await load();
      if (diabaikan) return;
    };

    jalankan();

    return () => {
      diabaikan = true;
    };
  }, [load]);

  return { data, loading, error, refetch: load };
};

export default useDataLoader;
