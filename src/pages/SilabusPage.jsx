import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FiChevronDown, FiChevronUp, FiCheckCircle, FiBookOpen, FiArrowLeft } from 'react-icons/fi';
import useProgressStore from '../store/useProgressStore';
import useDataLoader from '../hooks/useDataLoader';
import { getTrack, findModuleContext } from '../services/dataService';
import ThemeToggle from '../components/ThemeToggle';

const SilabusPage = () => {
  const { track: slugTrack } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Menampilkan 3 kelompok pertemuan per halaman

  // State untuk melacak pertemuan mana saja yang sedang terbuka dropdown-nya
  const [openSections, setOpenSections] = useState({});

  const completedModules = useProgressStore((state) => state.completedModules);

  const { data: kurikulum, loading, error } = useDataLoader('kurikulum');
  const track = getTrack(kurikulum, slugTrack);
  const silabus = track?.pertemuan ?? [];
  const belumDimuat = loading || !kurikulum;
  const trackTidakDikenal = !belumDimuat && !track;

  // Kompatibilitas tautan lama /materi/:id -> /materi/<track>/<id>.
  // Rute /materi/:track menangkap "8" sebagai slug, jadi dialihkan di sini.
  const idLama = /^\d+$/.test(slugTrack ?? '') ? Number(slugTrack) : null;
  const konteksLama = idLama !== null ? findModuleContext(kurikulum, idLama) : null;

  // Pertemuan pertama otomatis terbuka (bisa ditimpa oleh toggle pengguna)
  const pertemuanAwal = silabus[0]?.pertemuan;

  // Fungsi toggle buka-tutup accordion
  const toggleSection = (pertemuanId) => {
    setOpenSections((prev) => ({
      ...prev,
      [pertemuanId]: !(prev[pertemuanId] ?? pertemuanId === pertemuanAwal),
    }));
  };

  // Logika Pagination berdasarkan kelompok Pertemuan
  const totalPages = Math.ceil(silabus.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPertemuan = silabus.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (belumDimuat) {
    return (
      <div className="min-h-screen bg-[var(--lms-bg)] flex items-center justify-center">
        <div className="animate-pulse text-[var(--lms-accent-text)] font-bold">
          Memuat Peta Belajar...
        </div>
      </div>
    );
  }

  if (error || trackTidakDikenal) {
    // Tautan lama /materi/8 -> arahkan ke jalur yang benar.
    if (!error && idLama !== null) {
      return <Navigate to={konteksLama ? `/materi/${konteksLama.track.slug}/${idLama}` : '/materi'} replace />;
    }

    return (
      <div className="min-h-screen bg-[var(--lms-bg)] flex flex-col p-6">
        <div className="mx-auto w-full max-w-md flex justify-end">
          <ThemeToggle />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md text-center bg-[var(--lms-surface)] p-10 rounded-3xl border border-[var(--lms-border)]">
            <h1 className="text-2xl font-black text-red-400 mb-3">
              {error ? 'Gagal Memuat Silabus' : 'Jalur Tidak Dikenal'}
            </h1>
            <p className="text-[var(--lms-text-muted)] text-sm mb-6">
              {error ? error.message : `Tidak ada jalur dengan nama "${slugTrack}".`}
            </p>
            <Link
              to="/materi"
              className="inline-block w-full py-3 bg-[var(--lms-accent-bg)] text-black font-black rounded-xl"
            >
              Pilih Jalur Kelaz
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--lms-bg)] p-4 md:p-8 text-[var(--lms-text)] font-sans flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-grow">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/materi"
            className="inline-flex items-center gap-2 text-[var(--lms-text-muted)] hover:text-[var(--lms-text)] font-bold transition-colors text-sm"
          >
            <FiArrowLeft /> Pilih Jalur Kelaz
          </Link>
          <ThemeToggle />
        </div>

        <h1 className="text-4xl font-black mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--lms-accent-text)] to-[var(--lms-accent-2-text)]">
          {track.nama}
        </h1>
        <p className="text-center mb-12 text-[var(--lms-text-muted)]">{track.tagline}</p>

        {silabus.length === 0 && (
          <div className="max-w-md mx-auto text-center bg-[var(--lms-surface)] p-10 rounded-3xl border border-[var(--lms-border)]">
            <h2 className="text-xl font-black text-[var(--lms-accent-2-text)] mb-3">
              Belum Ada Materi
            </h2>
            <p className="text-[var(--lms-text-muted)] text-sm">
              Jalur ini sedang disiapkan. Pantau terus, ya!
            </p>
          </div>
        )}

        {/* List Kelompok Pertemuan */}
        <div className="space-y-6 min-h-[400px]">
          {currentPertemuan.map((group) => {
            const isExpanded = openSections[group.pertemuan] ?? group.pertemuan === pertemuanAwal;
            
            // Hitung total modul yang selesai di dalam pertemuan ini
            const completedCount = group.modules.filter(m => completedModules.includes(m.id)).length;
            const isAllGroupCompleted = completedCount === group.modules.length;

            return (
              <div 
                key={group.pertemuan}
                className="rounded-2xl border border-[var(--lms-border)] bg-[var(--lms-surface)] overflow-hidden shadow-xl transition-all"
              >
                {/* BAR BARIS UTAMA (HEADER PERTEMUAN) */}
                <button
                  onClick={() => toggleSection(group.pertemuan)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 bg-[var(--lms-surface-2)] hover:bg-[var(--lms-surface-5)] transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl md:text-2xl font-black text-[var(--lms-text)]">
                        {group.title}
                      </h2>
                      {isAllGroupCompleted && (
                        <FiCheckCircle className="text-[var(--lms-accent-text)] flex-shrink-0" size={20} />
                      )}
                    </div>
                    <p className="text-sm text-[var(--lms-text-muted)] leading-relaxed max-w-2xl hidden sm:block">
                      {group.description}
                    </p>
                    <div className="text-xs font-bold text-[var(--lms-accent-2-text)] mt-2 tracking-wide uppercase">
                      Progres: {completedCount} dari {group.modules.length} Modul Selesai
                    </div>
                  </div>

                  {/* Ikon Panah Dropdown */}
                  <div className="w-10 h-10 rounded-full bg-[var(--lms-surface-3)] flex items-center justify-center text-[var(--lms-text-muted)] border border-[var(--lms-border)]">
                    {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                  </div>
                </button>

                {/* ISI DROPDOWN (DAFTAR MODUL) */}
                {isExpanded && (
                  <div className="border-t border-[var(--lms-border)]/60 60 bg-[var(--lms-surface-4)] p-4 md:p-6 space-y-3">
                    {group.modules.map((materi) => {
                      const isCompleted = completedModules.includes(materi.id);

                      return (
                        <div 
                          key={materi.id}
                          className="p-4 rounded-xl border border-[var(--lms-border)] bg-[var(--lms-surface)] hover:border-[var(--color-software-teal)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <FiBookOpen className={isCompleted ? "text-[var(--lms-accent-text)]" : "text-[var(--lms-text-ghost)]"} size={18} />
                            <span className={`font-semibold text-sm md:text-base ${isCompleted ? 'text-[var(--lms-text-muted)]' : 'text-[var(--lms-text-strong)]'}`}>
                              {materi.title}
                            </span>
                          </div>

                          <Link
                            to={`/materi/${track.slug}/${materi.id}`}
                            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all w-full sm:w-auto text-center ${
                              isCompleted
                                ? 'bg-[var(--lms-surface-3)] text-[var(--lms-text-muted)] hover:bg-[var(--lms-surface-3)] border border-[var(--lms-border-strong)]'
                                : 'bg-[var(--color-software-tosca)] text-black hover:bg-[var(--lms-accent-bg)]'
                            }`}
                          >
                            {isCompleted ? 'Baca Ulang' : 'Mulai Belajar'}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* PAGINATION KONTROL */}
        {totalPages > 1 && (
          <div className="mt-12 pt-8 border-t border-[var(--lms-border)] flex flex-col sm:flex-row justify-between items-center gap-4">
            <button 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-2.5 bg-[var(--lms-surface)] text-[var(--lms-text)] rounded-lg font-bold border border-[var(--lms-border-strong)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--lms-surface-3)] w-full sm:w-auto transition-colors"
            >
              ← Sebelumnya
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                    currentPage === i + 1
                      ? 'bg-[var(--color-software-tosca)] text-black'
                      : 'bg-[var(--lms-surface)] text-[var(--lms-text-muted)] border border-[var(--lms-border-strong)] hover:bg-[var(--lms-surface-3)] hover:text-[var(--lms-text)]'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-2.5 bg-[var(--lms-surface)] text-[var(--lms-text)] rounded-lg font-bold border border-[var(--lms-border-strong)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--lms-surface-3)] w-full sm:w-auto transition-colors"
            >
              Selanjutnya →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default SilabusPage;