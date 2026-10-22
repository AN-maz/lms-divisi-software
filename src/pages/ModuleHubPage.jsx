import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiBookOpen, FiCheckSquare, FiArrowLeft, FiActivity } from 'react-icons/fi';
import useProgressStore from '../store/useProgressStore';
import useDataLoader from '../hooks/useDataLoader';
import { findModuleContext, getTrack } from '../services/dataService';
import ThemeToggle from '../components/ThemeToggle';

const ModuleHubPage = () => {
    const { track: slugTrack, id } = useParams();
    const navigate = useNavigate();

    const completedModules = useProgressStore((state) => state.completedModules);
    const isCompleted = completedModules.includes(parseInt(id));

    const { data: kurikulum, loading } = useDataLoader('kurikulum');

    // Track diambil dari URL; bila URL dibuat tanpa track, resolve dari id modul.
    const konteks = findModuleContext(kurikulum, id);
    const track = getTrack(kurikulum, slugTrack) ?? konteks?.track ?? null;
    const moduleData = konteks?.modul ?? null;
    const siap = !loading && Boolean(kurikulum);

    if (!siap) return (
        <div className="relative min-h-screen bg-[var(--lms-bg)] flex items-center justify-center">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div className="animate-pulse text-[var(--lms-accent-text)] font-bold">Memuat Hub...</div>
        </div>
    );

    if (!moduleData || !track) return (
        <div className="relative min-h-screen bg-[var(--lms-bg)] flex items-center justify-center p-6">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div className="max-w-md text-center bg-[var(--lms-surface)] p-10 rounded-3xl border border-[var(--lms-border)]">
                <h1 className="text-2xl font-black text-red-400 mb-3">Modul Tidak Ditemukan</h1>
                <p className="text-[var(--lms-text-muted)] text-sm mb-6">
                    Tidak ada modul dengan ID <span className="text-[var(--lms-text)] font-bold">{id}</span>.
                </p>
                <Link
                    to="/materi"
                    className="inline-block w-full py-3 bg-[var(--lms-accent-bg)] text-black font-black rounded-xl"
                >
                    Pilih Jalur Kelaz
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[var(--lms-bg)] text-[var(--lms-text)] font-sans flex flex-col p-6 md:p-12">
            <div className="max-w-4xl mx-auto w-full">

                {/* Tombol Back ke daftar pertemuan track ini */}
                <div className="flex items-center justify-between mb-10">
                    <button
                        onClick={() => navigate(`/materi/${track.slug}`)}
                        className="flex items-center gap-2 text-[var(--lms-text-muted)] hover:text-[var(--lms-text)] transition-colors font-bold text-sm"
                    >
                        <FiArrowLeft /> {track.nama}
                    </button>
                    <ThemeToggle />
                </div>

                {/* Header Modul */}
                <div className="mb-12 border-b border-[var(--lms-border)] pb-8">
                    <p className="text-[var(--lms-accent-2-text)] font-bold tracking-widest uppercase text-xs mb-2">
                        Control Hub
                    </p>
                    <h1 className="text-3xl md:text-5xl font-black text-[var(--lms-text)] mb-4">
                        {moduleData.title}
                    </h1>
                    {isCompleted && (
                        <span className="inline-block px-4 py-1.5 bg-[var(--lms-card-2)] text-[var(--lms-accent-2-text)] text-xs rounded border border-[var(--color-software-teal)] font-bold tracking-wider uppercase">
                            ✓ Modul Selesai
                        </span>
                    )}
                </div>

                {/* Pilihan Aksi (Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Card 1: Eksplorasi Konsep */}
                    <Link
                        to={`/eksplorasi/${id}`}
                        className="group bg-[var(--lms-surface)] border border-[var(--lms-border)] hover:border-[var(--color-software-teal)] rounded-2xl p-8 transition-all hover:-translate-y-2 shadow-lg flex flex-col items-start relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--lms-border-strong)] to-[var(--lms-border-soft)] group-hover:from-[var(--color-software-teal)] group-hover:to-[var(--color-software-bright)] transition-all"></div>

                        <div className="w-14 h-14 rounded-xl bg-[var(--lms-surface-3)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-software-teal)]/20 transition-colors">
                            <FiBookOpen size={28} className="text-[var(--lms-text-muted)] group-hover:text-[var(--lms-accent-text)]" />
                        </div>

                        <h2 className="text-2xl font-bold text-[var(--lms-text)] mb-3">Eksplorasi Konsep</h2>
                        <p className="text-[var(--lms-text-muted)] leading-relaxed text-sm">
                            Pelajari teori dasar, baca dokumentasi, dan pahami studi kasus dari materi ini secara terstruktur.
                        </p>

                        <div className="mt-8 font-bold text-sm text-[var(--lms-accent-2-text)] group-hover:text-[var(--lms-text)] transition-colors flex items-center gap-2">
                            Mulai Membaca <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </Link>

                    {/* Card 2: Knowledge Check */}
                    <Link
                        to={`/kuis/${id}`}
                        className="group bg-[var(--lms-surface)] border border-[var(--lms-border)] hover:border-[var(--color-software-teal)] rounded-2xl p-8 transition-all hover:-translate-y-2 shadow-lg flex flex-col items-start relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--lms-border-strong)] to-[var(--lms-border-soft)] group-hover:from-[var(--color-software-teal)] group-hover:to-[var(--color-software-bright)] transition-all"></div>

                        <div className="w-14 h-14 rounded-xl bg-[var(--lms-surface-3)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-software-teal)]/20 transition-colors">
                            <FiCheckSquare size={28} className="text-[var(--lms-text-muted)] group-hover:text-[var(--lms-accent-text)]" />
                        </div>

                        <h2 className="text-2xl font-bold text-[var(--lms-text)] mb-3">Knowledge Check</h2>
                        <p className="text-[var(--lms-text-muted)] leading-relaxed text-sm">
                            Uji pemahamanmu dari Eksplorasi Konsep. Dapatkan skor minimal 70% untuk menyelesaikan modul ini!
                        </p>

                        <div className="mt-8 font-bold text-sm text-[var(--lms-accent-2-text)] group-hover:text-[var(--lms-text)] transition-colors flex items-center gap-2">
                            Mulai Evaluasi <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </Link>



                {/* Card 3: Debugging Jiwa  */}
                    <Link
                        to={`/eksplorasi/${id}?view=debug`}
                        className="group bg-[var(--lms-surface)] border border-[var(--lms-border)] hover:border-amber-500 rounded-2xl p-8 transition-all hover:-translate-y-2 shadow-lg flex flex-col items-start relative overflow-hidden"
                    >
  
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--lms-border-strong)] to-[var(--lms-border-soft)] group-hover:from-amber-600 group-hover:to-yellow-500 transition-all"></div>

   
                        <div className="w-14 h-14 rounded-xl bg-[var(--lms-surface-3)] flex items-center justify-center mb-6 group-hover:bg-amber-500/10 transition-colors">
        
                        <FiActivity className="text-[var(--lms-text-muted)] group-hover:text-amber-400" size={28} />
                        </div>

                        <h2 className="text-2xl font-bold text-[var(--lms-text)] mb-3">Debugging Jiwa</h2>
                        <p className="text-[var(--lms-text-muted)] leading-relaxed text-sm">
                        Bukan tentang motivasi sesaat, tetapi tentang bertumbuh setiap hari.
                        </p>

                        <div className="mt-8 font-bold text-sm text-amber-500 group-hover:text-[var(--lms-text)] transition-colors flex items-center gap-2">
                        Perkuat Mental <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ModuleHubPage;