import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const TEMA = { GELAP: 'dark', TERANG: 'light' };
const KUNCI_TEMA = 'lms-tema';

const sistemGelap = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;

// Tema awal: pilihan tersimpan -> preferensi sistem -> gelap.
export const temaAwal = () => (sistemGelap() ? TEMA.GELAP : TEMA.TERANG);

const terapkanTema = (tema) => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', tema);
};

const useThemeStore = create(
  persist(
    (set, get) => ({
      tema: temaAwal(),

      setTema: (tema) => {
        terapkanTema(tema);
        set({ tema });
      },

      toggleTema: () => {
        const berikutnya = get().tema === TEMA.GELAP ? TEMA.TERANG : TEMA.GELAP;
        terapkanTema(berikutnya);
        set({ tema: berikutnya });
      },
    }),
    {
      name: KUNCI_TEMA,
      // Terapkan tema hasil hidrasi agar atribut HTML selalu sinkron.
      onRehydrateStorage: () => (state) => {
        if (state?.tema) terapkanTema(state.tema);
      },
    }
  )
);

export { TEMA };
export default useThemeStore;
