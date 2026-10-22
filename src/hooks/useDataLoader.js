import { useState, useEffect, useCallback } from 'react';
import { dataLoaders } from '../services/dataService';

// Custom hook untuk memuat data JSON dengan state loading/error
const useDataLoader = (loaderKey, additionalProps = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const loader = dataLoaders[loaderKey];
      if (!loader) {
        throw new Error(`Unknown data loader: ${loaderKey}`);
      }

      const result = await loader(additionalProps.cacheKey);
      setData(result);
    } catch (err) {
      console.error(`Gagal memuat data (${loaderKey}):`, err);
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [loaderKey, additionalProps.cacheKey]);

  // Muat data saat pertama kali / saat loaderKey berubah
  useEffect(() => {
    let aktif = true;

    const jalankan = async () => {
      await loadData();
      if (!aktif) return;
    };

    jalankan();

    return () => {
      aktif = false;
    };
  }, [loadData]);

  const refetch = () => loadData();

  return { data, loading, error, loadData, refetch };
};

export default useDataLoader;
