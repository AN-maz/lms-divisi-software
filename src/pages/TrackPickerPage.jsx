import { Link } from 'react-router-dom';
import { FiCompass, FiFeather, FiArrowLeft } from 'react-icons/fi';
import useProgressStore from '../store/useProgressStore';
import useDataLoader from '../hooks/useDataLoader';
import { getTracks, countCompleted, countModules } from '../services/dataService';
import ThemeToggle from '../components/ThemeToggle';

// Ikon per jalur; `ikon` di kurikulum.json memilih salah satu di sini.
const IKON = {
  compass: FiCompass,
  flask: FiFeather,
};

const TrackPickerPage = () => {
  const { data: kurikulum, loading, error } = useDataLoader('kurikulum');
  const completedModules = useProgressStore((state) => state.completedModules);

  const tracks = getTracks(kurikulum);
  const daftar = tracks.map((track) => {
    const total = countModules(track);
    return { track, total, selesai: countCompleted(track, completedModules) };
  });

  return (
    <div className="min-h-screen bg-[var(--lms-bg)] p-4 md:p-8 text-[var(--lms-text)] font-sans flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-grow">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[var(--lms-text-muted)] hover:text-[var(--lms-text)] font-bold transition-colors text-sm"
          >
            <FiArrowLeft /> Kembali ke Beranda
          </Link>
          <ThemeToggle />
        </div>

        <h1 className="text-4xl font-black mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--lms-accent-text)] to-[var(--lms-accent-2-text)]">
          Pilih Jalur Kelaz
        </h1>
        <p className="text-center mb-12 text-[var(--lms-text-muted)]">
          Dua jalur belajar. Mulai dari Main Quest untuk fondasi, atau lompat ke Side Quest buat
          eksplorasi bebas.
        </p>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-pulse text-[var(--lms-accent-text)] font-bold">
              Memuat Jalur...
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto text-center bg-[var(--lms-surface)] p-10 rounded-3xl border border-[var(--lms-border)]">
            <h2 className="text-xl font-black text-red-400 mb-3">Gagal Memuat Jalur</h2>
            <p className="text-[var(--lms-text-muted)] text-sm">{error.message}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {daftar.map(({ track, total, selesai }) => {
              const Ikon = IKON[track.ikon] ?? FiCompass;
              const persen = total > 0 ? Math.round((selesai / total) * 100) : 0;
              const kosong = total === 0;

              return (
                <Link
                  key={track.slug}
                  to={`/materi/${track.slug}`}
                  className="group bg-[var(--lms-surface)] border border-[var(--lms-border)] hover:border-[var(--color-software-teal)] rounded-2xl p-8 transition-all hover:-translate-y-2 shadow-lg flex flex-col items-start relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--lms-border-strong)] to-[var(--lms-border-soft)] group-hover:from-[var(--color-software-teal)] group-hover:to-[var(--color-software-bright)] transition-all"></div>

                  <div className="w-14 h-14 rounded-xl bg-[var(--lms-surface-3)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-software-teal)]/20 transition-colors">
                    <Ikon size={28} className="text-[var(--lms-text-muted)] group-hover:text-[var(--lms-accent-text)]" />
                  </div>

                  <h2 className="text-2xl font-bold text-[var(--lms-text)] mb-3">{track.nama}</h2>
                  <p className="text-[var(--lms-text-muted)] leading-relaxed text-sm flex-grow">{track.tagline}</p>

                  <div className="w-full mt-8">
                    {kosong ? (
                      <span className="text-xs font-bold text-[var(--lms-text-faint)] uppercase tracking-wide">
                        Belum ada materi
                      </span>
                    ) : (
                      <>
                        <div className="flex justify-between text-xs font-bold text-[var(--lms-text-muted)] mb-2">
                          <span>PROGRES</span>
                          <span className="text-[var(--lms-accent-2-text)]">
                            {selesai} / {total} modul
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-[var(--lms-surface-3)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[var(--color-software-tosca)] transition-all duration-500 ease-out"
                            style={{ width: `${persen}%` }}
                          ></div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-6 font-bold text-sm text-[var(--lms-accent-2-text)] group-hover:text-[var(--lms-text)] transition-colors flex items-center gap-2">
                    {kosong ? 'Intip Jalur' : 'Masuk Jalur'}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackPickerPage;
