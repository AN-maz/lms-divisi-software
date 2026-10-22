import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import MarkdownViewer from '../components/MarkdownViewer';
import GerbangSanksi from '../components/GerbangSanksi';
import FloatTimeIndicator from '../components/FloatTimeIndicator';
import useDataLoader from '../hooks/useDataLoader';
import { findModuleById } from '../services/dataService';

const WAKTU_FOKUS = 1500; // 25 Menit
const WAKTU_JEDA = 300;   // 5 Menit

const MODE_BIASA = 'BIASA';
const MODE_POMODORO = 'FOKUS_POMODORO';
const MODE_ABSOLUT = 'ABSOLUT';

const formatWaktu = (totalDetik) => {
  const m = Math.floor(totalDetik / 60).toString().padStart(2, '0');
  const s = (totalDetik % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

// Membaca file .md lalu memecahnya menjadi beberapa section berdasarkan Heading 1
const parseMateriMarkdown = (text) => {
  if (text.trim().startsWith('<!doctype html>') || text.includes('id="root"')) {
    throw new Error(
      'Mismatch Data: Berkas .md tidak ditemukan. Path di kurikulum.json dan folder public/ berbeda!'
    );
  }

  return text
    .split(/(?=^#\s)/m)
    .filter((s) => s.trim() !== '')
    .map((sec) => {
      const lines = sec.trim().split('\n');
      return { title: lines[0].replace(/^#+\s/, ''), content: sec };
    });
};

const EksplorasiPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDebugView = searchParams.get('view') === 'debug';

  // State materi
  const [materiTitle, setMateriTitle] = useState('');
  const [sections, setSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State mode fokus
  const [mode, setMode] = useState(() => localStorage.getItem('lms_fokus_mode') || MODE_BIASA);
  const [pomodoro, setPomodoro] = useState({ sisa: WAKTU_FOKUS, istirahat: false });
  const [isPomodoroPaused, setIsPomodoroPaused] = useState(false);
  const [isTerkunci, setIsTerkunci] = useState(
    () => localStorage.getItem('lms_sanksi_absolut') === 'true'
  );

  // Sumber data kurikulum (di-cache oleh dataService)
  const { data: kurikulum, loading: loadingKurikulum } = useDataLoader('kurikulum');

  // Menentukan sumber materi: normal (teknis) atau debug (jiwa).
  // debug_jiwa ada di top-level kurikulum dan dipakai bersama semua modul.
  const materiSource = useMemo(() => {
    if (!kurikulum) return { status: 'loading' };

    const currentMateri = findModuleById(kurikulum, id);
    if (!currentMateri) return { status: 'notfound' };

    if (isDebugView) {
      const debug = kurikulum.debug_jiwa;
      if (!debug) return { status: 'notfound' };
      return {
        status: 'ok',
        title: debug.title,
        file: `/content/debugging-jiwa/${debug.slug}.md`,
      };
    }

    return { status: 'ok', title: currentMateri.title, file: currentMateri.file };
  }, [kurikulum, id, isDebugView]);

  // Memuat isi file .md tiap kali sumber materi berubah
  useEffect(() => {
    if (materiSource.status !== 'ok') return undefined;

    let cancelled = false;

    fetch(materiSource.file)
      .then((res) => {
        if (!res.ok) throw new Error('Koneksi ke peladen statis terputus.');
        return res.text();
      })
      .then((text) => {
        if (cancelled) return;
        const parsed = parseMateriMarkdown(text);
        setMateriTitle(materiSource.title);
        setSections(parsed);
        setCurrentIndex(0);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setError(err);
        setSections([{ title: 'Error', content: '## ⚠️ Maaf, berkas materi gagal dimuat.' }]);
        setCurrentIndex(0);
      });

    return () => {
      cancelled = true;
    };
  }, [materiSource]);

  // Simpan preferensi ke localStorage
  useEffect(() => {
    localStorage.setItem('lms_fokus_mode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('lms_sanksi_absolut', isTerkunci);
  }, [isTerkunci]);

  // Jam Pomodoro
  useEffect(() => {
    if (mode !== MODE_POMODORO || isPomodoroPaused) return undefined;

    const timer = setInterval(() => {
      // Transisi fase otomatis ditangani di dalam updater (pola state tunggal)
      setPomodoro((prev) => {
        if (prev.sisa > 0) return { ...prev, sisa: prev.sisa - 1 };
        return prev.istirahat
          ? { sisa: WAKTU_FOKUS, istirahat: false }
          : { sisa: WAKTU_JEDA, istirahat: true };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, isPomodoroPaused]);

  // Navigasi section lewat tombol panah
  useEffect(() => {
    const tanganiKetukanKeyboard = (event) => {
      if (isTerkunci) return;

      if (event.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        event.preventDefault();
        setCurrentIndex((prev) => prev + 1);
        document.querySelector('.scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
        event.preventDefault();
        setCurrentIndex((prev) => prev - 1);
        document.querySelector('.scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', tanganiKetukanKeyboard);
    return () => window.removeEventListener('keydown', tanganiKetukanKeyboard);
  }, [currentIndex, sections.length, isTerkunci]);

  // Mode Absolut mengunci layar saat jendela kehilangan fokus
  useEffect(() => {
    const handleKehilanganFokus = () => {
      if (mode === MODE_ABSOLUT && !isTerkunci) {
        setIsTerkunci(true);
      }
    };
    window.addEventListener('blur', handleKehilanganFokus);
    return () => window.removeEventListener('blur', handleKehilanganFokus);
  }, [mode, isTerkunci]);

  // Handler
  const gantiMode = (modeBaru) => {
    setMode(modeBaru);
    // Pemusnahan residu Pomodoro dilakukan saat mode diganti, bukan di dalam effect
    if (modeBaru !== MODE_POMODORO) {
      setPomodoro({ sisa: WAKTU_FOKUS, istirahat: false });
      setIsPomodoroPaused(false);
    }
  };

  const gotoSection = (idx) => {
    setCurrentIndex(idx);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
    document.querySelector('.scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLastPage = currentIndex === sections.length - 1;
  const progressPercentage =
    sections.length > 0 ? Math.round(((currentIndex + 1) / sections.length) * 100) : 0;

  // Render
  if (loadingKurikulum || materiSource.status === 'loading') {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a]">
        <div className="animate-pulse text-2xl font-bold text-[var(--color-software-bright)]">
          Memuat Codex...
        </div>
      </div>
    );
  }

  if (materiSource.status === 'notfound') {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a] px-6">
        <div className="max-w-md text-center bg-[#121212] p-10 rounded-3xl border border-gray-800">
          <h1 className="text-2xl font-black text-[var(--color-software-tosca)] mb-3">
            Materi Tidak Ditemukan
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Modul dengan ID <span className="text-white font-bold">{id}</span> tidak tersedia.
          </p>
          <Link
            to="/materi"
            className="inline-block w-full py-3 bg-[var(--color-software-bright)] text-black font-black rounded-xl"
          >
            Kembali ke Peta Belajar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex bg-[#0a0a0a] text-gray-200 overflow-hidden font-sans relative">
      <GerbangSanksi isOpen={isTerkunci} onUnlock={() => setIsTerkunci(false)} />

      {/* Jeda Istirahat Pomodoro (Overlay) */}
      {mode === MODE_POMODORO && pomodoro.istirahat && !isTerkunci && (
        <div className="fixed inset-0 z-[99998] bg-black flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-[#14b8a6] font-extrabold text-3xl mb-4 tracking-widest uppercase animate-pulse">
            Fase Istirahat
          </h2>
          <div className="text-7xl font-mono font-bold text-white mb-6">
            {formatWaktu(pomodoro.sisa)}
          </div>
          <p className="text-gray-400 max-w-lg">
            Layar ini terkunci otomatis untuk melindungi kapasitas kognitif Anda. Regangkan badan dan
            kembalikan atensi.
          </p>
        </div>
      )}

      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar scroll-area relative">
        <div className="md:hidden sticky top-0 z-40 bg-[#121212] border-b border-gray-800 p-4 flex justify-between items-center shadow-md">
          <Link
            to={`/materi/${id}`}
            className="text-[var(--color-software-tosca)] font-bold text-sm"
          >
            ← Kembali ke Hub
          </Link>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white flex items-center gap-2 text-sm font-bold bg-gray-800 px-3 py-1.5 rounded-md"
          >
            Daftar Isi ☰
          </button>
        </div>

        <FloatTimeIndicator
          mode={mode}
          waktuPomodoro={pomodoro.sisa}
          isPomodoroPaused={isPomodoroPaused}
          onTogglePause={() => setIsPomodoroPaused((prev) => !prev)}
        />

        {/* Konten Materi */}
        <div className="max-w-4xl mx-auto w-full px-6 py-8 md:px-12 md:py-16 flex-grow flex flex-col">
          {error && (
            <div className="mb-6 rounded-xl border border-red-700 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {error.message}
            </div>
          )}

          <div className="flex-grow">
            <div className="text-[var(--color-software-teal)] font-bold text-sm tracking-wider uppercase mb-2">
              {materiTitle}
            </div>
            <MarkdownViewer content={sections[currentIndex]?.content || ''} />
          </div>

          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={() => gotoSection(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-[#1a1a1a] text-white rounded-lg font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 border border-gray-700 w-full sm:w-auto transition-colors"
            >
              ← Sebelumnya
            </button>

            {isLastPage ? (
              <button
                onClick={() => navigate(`/materi/${id}`)}
                className="px-8 py-3 bg-[var(--color-software-bright)] text-black font-extrabold rounded-lg hover:bg-[#2de54c] shadow-[0_0_15px_rgba(57,255,90,0.3)] w-full sm:w-auto transition-all"
              >
                Selesai Membaca & Kembali
              </button>
            ) : (
              <button
                onClick={() => gotoSection(Math.min(sections.length - 1, currentIndex + 1))}
                className="px-8 py-3 bg-[var(--color-software-tosca)] text-black font-bold rounded-lg hover:bg-[#1db88a] shadow-[0_0_15px_rgba(32,201,151,0.2)] w-full sm:w-auto transition-colors"
              >
                Selanjutnya →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- SIDEBAR KANAN --- */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-[#121212] border-l border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } md:relative md:translate-x-0 flex-shrink-0`}
      >
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#0a0a0a]">
          <Link
            to={`/materi/${id}`}
            className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs">
              ←
            </span>
            Module Hub
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* PANEL KENDALI ATENSI */}
        <div className="p-4 border-b border-gray-800">
          <div className="mb-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14b8a6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#14b8a6]"></span>
              </span>
              <span className="text-[11px] font-extrabold text-[#14b8a6] uppercase tracking-widest drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]">
                Pilih Mode Fokus
              </span>
            </div>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${
                mode === MODE_BIASA
                  ? 'bg-gray-800/50 text-gray-400 border-gray-700'
                  : mode === MODE_POMODORO
                    ? 'bg-[#14b8a6]/10 text-[#14b8a6] border-[#14b8a6]/30'
                    : 'bg-red-900/20 text-red-400 border-red-900/50'
              }`}
            >
              {mode}
            </span>
          </div>

          <div className="flex bg-[#0a0a0a] p-1 rounded border border-gray-800">
            <button
              onClick={() => gantiMode(MODE_BIASA)}
              title="Mode Standar"
              className={`flex-1 py-1.5 text-xs flex justify-center items-center rounded transition-all duration-200 ${
                mode === MODE_BIASA
                  ? 'bg-gray-700 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              📖
            </button>
            <button
              onClick={() => gantiMode(MODE_POMODORO)}
              title="Mode Pomodoro"
              className={`flex-1 py-1.5 text-xs flex justify-center items-center rounded transition-all duration-200 ${
                mode === MODE_POMODORO
                  ? 'bg-[#14b8a6] text-black shadow-[0_0_8px_rgba(20,184,166,0.4)]'
                  : 'text-gray-500 hover:text-[#14b8a6]'
              }`}
            >
              ⏱️
            </button>
            <button
              onClick={() => gantiMode(MODE_ABSOLUT)}
              title="Mode Kunci Absolut"
              className={`flex-1 py-1.5 text-xs flex justify-center items-center rounded transition-all duration-200 ${
                mode === MODE_ABSOLUT
                  ? 'bg-red-600 text-white shadow-[0_0_8px_rgba(220,38,38,0.4)]'
                  : 'text-gray-500 hover:text-red-400'
              }`}
            >
              ⚡
            </button>
          </div>
        </div>

        {/* PROGRES MEMBACA */}
        <div className="p-5 border-b border-gray-800">
          <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
            <span>PROGRES MEMBACA</span>
            <span className="text-[var(--color-software-tosca)]">{progressPercentage}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-software-tosca)] transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* SILABUS MATERI */}
        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          <ul className="flex flex-col">
            {sections.map((sec, idx) => {
              const isActive = currentIndex === idx;
              const isPassed = idx < currentIndex;
              return (
                <li key={idx}>
                  <button
                    onClick={() => gotoSection(idx)}
                    className={`w-full text-left px-5 py-4 text-sm transition-colors flex justify-between items-center ${
                      isActive
                        ? 'bg-[#1a1a1a] border-l-4 border-[var(--color-software-bright)] text-white font-bold'
                        : 'border-l-4 border-transparent text-gray-400 hover:bg-[#161616] hover:text-gray-200'
                    }`}
                  >
                    <span className="flex-grow pr-3 leading-snug">{sec.title}</span>
                    {isPassed && <span className="text-[var(--color-software-teal)] font-bold">✓</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          role="presentation"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
        ></div>
      )}
    </div>
  );
};

export default EksplorasiPage;
