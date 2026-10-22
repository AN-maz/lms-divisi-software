import { useParams } from 'react-router-dom';
import useDataLoader from './useDataLoader';
import { findModuleContext } from '../services/dataService';

// Menentukan slug jalur (track) untuk sebuah modul.
// Utamakan track dari URL; kalau tidak ada, cari dari id modul di kurikulum.
// Dipakai halaman yang URL-nya tidak memuat track (eksplorasi, kuis) agar
// tombol "kembali" tetap mengarah ke jalur yang benar.
const useTrackSlug = (moduleId) => {
  const { track: slugTrack } = useParams();
  const { data: kurikulum } = useDataLoader('kurikulum');

  if (slugTrack) return slugTrack;
  return findModuleContext(kurikulum, moduleId)?.track?.slug ?? null;
};

export default useTrackSlug;
