// Cache hasil fetch JSON supaya request yang sama tidak diulang.
const dataCache = new Map();

// Penanda "data tidak ada" (HTTP 404), dibedakan dari error koneksi.
// Dipakai untuk modul yang memang belum punya kuis.
export class DataTidakAdaError extends Error {
  constructor(path) {
    super(`Data tidak ditemukan: ${path}`);
    this.name = 'DataTidakAdaError';
    this.notFound = true;
  }
}

// Mengambil JSON dari `path` dengan cache dalam memori.
// `cacheKey` boleh diisi bila dua path berbeda ingin berbagi entri cache.
export const fetchData = async (path, cacheKey = null) => {
  const key = cacheKey || path;

  if (dataCache.has(key)) {
    return dataCache.get(key);
  }

  const response = await fetch(path);
  if (response.status === 404) {
    throw new DataTidakAdaError(path);
  }
  if (!response.ok) {
    throw new Error(`Gagal memuat ${path} (HTTP ${response.status})`);
  }

  // Server SPA (Vite/Netlify) mengembalikan index.html untuk path yang tidak ada,
  // bukan 404. Kalau bukan JSON, anggap datanya memang tidak ada.
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new DataTidakAdaError(path);
  }

  const data = await response.json();
  dataCache.set(key, data);
  return data;
};

// Sumber data statis aplikasi. Path relatif terhadap folder public/.
export const dataSources = {
  kurikulum: '/content/kurikulum.json',
  mentors: '/data/mentors.json',
  kuisModul: (moduleId) => `/content/kuis/modul-${String(moduleId).padStart(2, '0')}.json`,
};

// Memuat sumber data bernama (kurikulum / mentors).
export const loadData = (nama) => {
  const path = dataSources[nama];
  if (!path) {
    return Promise.reject(new Error(`Sumber data tidak dikenal: ${nama}`));
  }
  return fetchData(path);
};

// Daftar jalur belajar (Main Quest, Side Quest, ...).
export const getTracks = (kurikulum) => kurikulum?.tracks ?? [];

export const getTrack = (kurikulum, slugTrack) =>
  getTracks(kurikulum).find((t) => t.slug === slugTrack) ?? null;

export const extractAllModules = (kurikulum) => {
  if (!kurikulum?.tracks) return [];
  return kurikulum.tracks.flatMap((track) =>
    (track.pertemuan ?? []).flatMap((grup) => grup.modules ?? [])
  );
};

// Mencari modul lintas track. Mengembalikan modul beserta track induknya
// supaya tautan bisa dibentuk ulang tanpa perlu tahu track dari URL.
export const findModuleContext = (kurikulum, moduleId) => {
  const id = Number.parseInt(moduleId, 10);
  for (const track of getTracks(kurikulum)) {
    for (const grup of track.pertemuan ?? []) {
      const modul = (grup.modules ?? []).find((m) => m.id === id);
      if (modul) return { track, modul, pertemuan: grup.pertemuan };
    }
  }
  return null;
};

export const findModuleById = (kurikulum, moduleId) =>
  findModuleContext(kurikulum, moduleId)?.modul ?? null;

// Jumlah modul yang sudah selesai di dalam sebuah track.
export const countCompleted = (track, completedModules) => {
  const semua = (track?.pertemuan ?? []).flatMap((grup) => grup.modules ?? []);
  return semua.filter((m) => completedModules.includes(m.id)).length;
};

export const countModules = (track) =>
  (track?.pertemuan ?? []).flatMap((grup) => grup.modules ?? []).length;

export const clearDataCache = () => {
  dataCache.clear();
};
