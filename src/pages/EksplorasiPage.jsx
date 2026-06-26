import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MarkdownViewer from '../components/MarkdownViewer';



const EksplorasiPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [materiTitle, setMateriTitle] = useState("");
  const [sections, setSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


 const [mode, setMode] = useState(() => {
    return localStorage.getItem('lms_fokus_mode') || 'BIASA';
  });
  
  // Memori Mesin 1: Biasa
  const [waktuBiasa, setWaktuBiasa] = useState(0);

  // Memori Mesin 2: Pomodoro
  const WAKTU_FOKUS = 1500; // 25 Menit
  const WAKTU_JEDA = 300;   // 5 Menit
  const [waktuPomodoro, setWaktuPomodoro] = useState(WAKTU_FOKUS);
  const [isIstirahat, setIsIstirahat] = useState(false);

  const [isPomodoroPaused, setIsPomodoroPaused] = useState(false);
  const [isTerkunci, setIsTerkunci] = useState(() => {
    return localStorage.getItem('lms_sanksi_absolut') === 'true';
  });



  const [kuisMath, setKuisMath] = useState({ soal: '', jawaban: 0 });
  const [inputUser, setInputUser] = useState('');
  const [pesanError, setPesanError] = useState('');
  
  const inputRef = useRef(null);

  // --- MESIN SINKRONISASI MEMORI PERMANEN ---
  // Setiap mode berubah, ukir di hard disk browser
  useEffect(() => {
    localStorage.setItem('lms_fokus_mode', mode);
  }, [mode]);

  // Setiap layar terkunci atau terbuka, catat di hard disk browser
  useEffect(() => {
    localStorage.setItem('lms_sanksi_absolut', isTerkunci);
    
    // Jika terkunci dan belum ada soal, otomatis buat soal baru saat refresh
    if (isTerkunci && kuisMath.jawaban === 0) {
      generateKuisMath();
    }
  }, [isTerkunci]);

 
  useEffect(() => {
    setLoading(true);
    fetch('/silabus.json')
      .then(res => res.json())
      .then(data => {
        const allModules = data.flatMap(group => group.modules);
        const currentMateri = allModules.find(m => m.id === parseInt(id));
        if (currentMateri) {
          setMateriTitle(currentMateri.title);
          return fetch(currentMateri.file);
        } else {
          throw new Error("Materi tidak ditemukan");
        }
      })
      .then(res => {
        if (!res.ok) throw new Error("File markdown gagal dimuat");
        return res.text();
      })
      .then(text => {
        const rawSections = text.split(/(?=^#\s)/m).filter(s => s.trim() !== '');
        const parsedSections = rawSections.map((sec) => {
          const lines = sec.trim().split('\n');
          const titleLine = lines[0].replace(/^#+\s/, '');
          return { title: titleLine, content: sec };
        });

        setSections(parsedSections);
        setCurrentIndex(0);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setSections([{ title: "Error", content: "## ⚠️ Maaf, materi gagal dimuat." }]);
        setLoading(false);
      });
  }, [id]);


 // Mesin Timer Mode Biasa
  useEffect(() => {
    let interval = null;
    if (mode === 'BIASA') {
      interval = setInterval(() => setWaktuBiasa((prev) => prev + 1), 1000);
    } else {
      setWaktuBiasa(0);
    }
    return () => clearInterval(interval);
  }, [mode]);

// Mesin Timer Pomodoro (Diperbarui dengan Logika Jeda)
  useEffect(() => {
    let interval = null;
    
    // Mesin hanya hidup jika Pomodoro aktif DAN TIDAK DIJEDA
    if (mode === 'FOKUS_POMODORO' && !isPomodoroPaused && waktuPomodoro > 0) {
      interval = setInterval(() => setWaktuPomodoro((prev) => prev - 1), 1000);
    } 
    else if (mode === 'FOKUS_POMODORO' && waktuPomodoro === 0) {
      if (!isIstirahat) {
        setIsIstirahat(true);
        setWaktuPomodoro(WAKTU_JEDA);
        setIsPomodoroPaused(false); 
      } else {
        setIsIstirahat(false);
        setWaktuPomodoro(WAKTU_FOKUS);
      }
    } 
    else if (mode !== 'FOKUS_POMODORO') {
      
      setWaktuPomodoro(WAKTU_FOKUS);
      setIsIstirahat(false);
      setIsPomodoroPaused(false);
    }
    
    return () => clearInterval(interval);
  }, [mode, waktuPomodoro, isIstirahat, isPomodoroPaused]); 

  // Sensor Alt+Tab (Mode Absolut)
  useEffect(() => {
    const handleKehilanganFokus = () => {
      if (mode === 'ABSOLUT' && !isTerkunci) {
        generateKuisMath();
        setIsTerkunci(true);
      }
    };
    window.addEventListener('blur', handleKehilanganFokus);
    return () => window.removeEventListener('blur', handleKehilanganFokus);
  }, [mode, isTerkunci]);

  useEffect(() => {
    if (isTerkunci && inputRef.current) inputRef.current.focus();
  }, [isTerkunci]);

  const generateKuisMath = () => {
    const a = Math.floor(Math.random() * 10) + 5;
    const b = Math.floor(Math.random() * 10) + 2;
    const ops = ['+', '*', '-'];
    const operasi = ops[Math.floor(Math.random() * ops.length)];
    let hasil = operasi === '+' ? a + b : operasi === '-' ? a - b : a * b;
    setKuisMath({ soal: `${a} ${operasi} ${b} = ?`, jawaban: hasil });
    setInputUser('');
    setPesanError('');
  };

  const verifikasiJawaban = (e) => {
    e.preventDefault();
    if (parseInt(inputUser) === kuisMath.jawaban) {
      setIsTerkunci(false);
    } else {
      setPesanError('Logika tidak valid. Kerjakan soal baru.');
      generateKuisMath();
    }
  };

  const formatWaktu = (totalDetik) => {
    const m = Math.floor(totalDetik / 60).toString().padStart(2, '0');
    const s = (totalDetik % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };


  const isLastPage = currentIndex === sections.length - 1;
  const progressPercentage = sections.length > 0 ? Math.round(((currentIndex + 1) / sections.length) * 100) : 0;

  const kontenMateriTerisolasi = useMemo(() => {
    if (sections.length === 0) return null;
    return (
      <div className="max-w-4xl mx-auto w-full px-6 py-8 md:px-12 md:py-16 flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="text-[var(--color-software-teal)] font-bold text-sm tracking-wider uppercase mb-2">
            {materiTitle}
          </div>
          <MarkdownViewer content={sections[currentIndex]?.content || ""} />
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => {
              setCurrentIndex(prev => Math.max(0, prev - 1));
              document.querySelector('.scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
              onClick={() => {
                setCurrentIndex(prev => Math.min(sections.length - 1, prev + 1));
                document.querySelector('.scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-[var(--color-software-tosca)] text-black font-bold rounded-lg hover:bg-[#1db88a] shadow-[0_0_15px_rgba(32,201,151,0.2)] w-full sm:w-auto transition-colors"
            >
              Selanjutnya →
            </button>
          )}
        </div>
      </div>
    );
  }, [sections, currentIndex, materiTitle, isLastPage, id, navigate]);


  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a]">
        <div className="animate-pulse text-2xl font-bold text-[var(--color-software-bright)]">Memuat Codex...</div>
      </div>
    );
  }


 

 return (
    <div className="h-screen w-full flex bg-[#0a0a0a] text-gray-200 overflow-hidden font-sans relative">

     {/* --- GERBANG SANKSI ABSOLUT (OVERLAY) --- */}
      {isTerkunci && (
        <div className="fixed inset-0 z-[99999] bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          
      
          <div className="bg-[#121212] border border-red-600 p-6 sm:p-8 rounded-lg shadow-[0_0_50px_rgba(220,38,38,0.3)] w-[95%] max-w-md text-center">
            
            <h2 className="text-red-500 font-extrabold text-xl sm:text-2xl mb-2 tracking-widest uppercase">
              Akses Terkunci
            </h2>
            
            <p className="text-gray-400 text-xs sm:text-sm mb-6">
              Sistem mendeteksi perpindahan aplikasi Selesaikan perhitungan ini untuk kembali fokus.
            </p>
            
            <h1 className="text-[#14b8a6] text-4xl sm:text-5xl font-bold mb-6">
              {kuisMath.soal}
            </h1>
            
            {pesanError && (
              <div className="mb-4 py-2 px-3 bg-red-900/30 text-red-400 text-xs font-bold border border-red-500 rounded">
                ❌ {pesanError}
              </div>
            )}
            
            {/* */}
            <form onSubmit={verifikasiJawaban} className="flex flex-col sm:flex-row gap-3">
              <input 
                ref={inputRef} 
                type="number" 
                value={inputUser} 
                onChange={(e) => setInputUser(e.target.value)}
                placeholder="Jawaban..."
                className="w-full bg-[#0a0a0a] border border-gray-700 rounded px-4 py-3 text-white text-xl text-center outline-none focus:border-[#14b8a6] transition-colors" 
                required
              />
              <button 
                type="submit" 
                className="w-full sm:w-auto bg-[#14b8a6] text-black font-bold px-8 py-3 rounded hover:bg-[#0f8a7c] transition-colors text-lg sm:text-base"
              >
                Buka
              </button>
            </form>

          </div>
        </div>
      )}

      {/*  JEDA ISTIRAHAT POMODORO (OVERLAY)  */}
      {mode === 'FOKUS_POMODORO' && isIstirahat && !isTerkunci && (
        <div className="fixed inset-0 z-[99998] bg-black flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-[#14b8a6] font-extrabold text-3xl mb-4 tracking-widest uppercase animate-pulse">Fase Istirahat</h2>
          <div className="text-7xl font-mono font-bold text-white mb-6">{formatWaktu(waktuPomodoro)}</div>
          <p className="text-gray-400 max-w-lg">Layar ini terkunci otomatis untuk melindungi kapasitas kognitif Anda. Regangkan badan dan kembalikan atensi.</p>
        </div>
      )}

     
      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar scroll-area relative">
        <div className="md:hidden sticky top-0 z-40 bg-[#121212] border-b border-gray-800 p-4 flex justify-between items-center shadow-md">
          <Link to={`/materi/${id}`} className="text-[var(--color-software-tosca)] font-bold text-sm">← Kembali ke Hub</Link>
          <button onClick={() => setIsSidebarOpen(true)} className="text-white flex items-center gap-2 text-sm font-bold bg-gray-800 px-3 py-1.5 rounded-md">Daftar Isi ☰</button>
        </div>

      {/* Indikator Waktu Mengambang (Interaktif & Responsif Mutlak) */}
        {mode !== 'BIASA' && (
           <div className="
             fixed z-[60] flex items-center gap-3 bg-[#121212]/95 backdrop-blur-md border border-gray-800 rounded-full shadow-[0_5px_25px_rgba(0,0,0,0.6)]
             px-4 py-2 bottom-8 left-1/2 transform -translate-x-1/2
             md:absolute md:bottom-auto md:top-4 md:left-auto md:right-6 md:translate-x-0 md:px-3 md:py-1.5
           ">
             
             {/* Indikator Status (Titik Berkedip) & Teks Angka */}
             <div className="flex items-center gap-2">
               <span className="relative flex h-2.5 w-2.5 md:h-2 md:w-2">
                 {/* Pendaran (Ping) dimatikan jika dijeda */}
                 {!isPomodoroPaused && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${mode === 'ABSOLUT' ? 'bg-red-500' : 'bg-[#14b8a6]'}`}></span>}
                 {/* Warna berubah menjadi Kuning jika dijeda */}
                 <span className={`relative inline-flex rounded-full h-full w-full ${mode === 'ABSOLUT' ? 'bg-red-500' : isPomodoroPaused ? 'bg-yellow-500' : 'bg-[#14b8a6]'}`}></span>
               </span>
               <span className={`text-xs md:text-sm font-mono font-bold tracking-wider ${mode === 'ABSOLUT' ? 'text-red-400' : isPomodoroPaused ? 'text-yellow-500' : 'text-[#14b8a6]'}`}>
                 {mode === 'FOKUS_POMODORO' ? `Sisa: ${formatWaktu(waktuPomodoro)}` : 'Sensor Absolut'}
               </span>
             </div>

             {/* Tombol Aksi Jeda (KHUSUS MODE POMODORO) */}
             {mode === 'FOKUS_POMODORO' && (
              <button 
  onClick={() => setIsPomodoroPaused(!isPomodoroPaused)}
  className={`ml-2 flex items-center justify-center h-6 px-3 rounded-full text-white transition-colors border shadow-sm ${
    !isPomodoroPaused 
      ? 'bg-red-600 hover:bg-red-700 border-red-800 shadow-[0_0_8px_rgba(220,38,38,0.4)]' // Kondisi Berjalan: Tombol Jeda Merah Menyala
      : 'bg-gray-800 hover:bg-gray-700 border-gray-600' // Kondisi Berhenti: Tombol Mulai Netral
  }`}
  title={isPomodoroPaused ? "Lanjutkan Waktu" : "Jeda Sementara"}
>
  <span className="text-[10px] font-bold tracking-wider">{isPomodoroPaused ? 'Mulai' : 'Jeda'}</span>
</button>
             )}

           </div>
        )}

        {/* Pemasangan Komponen Materi Terisolasi */}
        {kontenMateriTerisolasi}
      </div>

      {/* --- SIDEBAR KANAN --- */}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-[#121212] border-l border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0 flex-shrink-0`}>
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#0a0a0a]">
          <Link to={`/materi/${id}`} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
            <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs">←</span> Module Hub
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white text-xl">✕</button>
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
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${mode === 'BIASA' ? 'bg-gray-800/50 text-gray-400 border-gray-700' : mode === 'FOKUS_POMODORO' ? 'bg-[#14b8a6]/10 text-[#14b8a6] border-[#14b8a6]/30' : 'bg-red-900/20 text-red-400 border-red-900/50'}`}>
              {mode}
            </span>
          </div>
          
          <div className="flex bg-[#0a0a0a] p-1 rounded border border-gray-800">
            <button onClick={() => setMode('BIASA')} title="Mode Standar" className={`flex-1 py-1.5 text-xs flex justify-center items-center rounded transition-all duration-200 ${mode === 'BIASA' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>📖</button>
            <button onClick={() => setMode('FOKUS_POMODORO')} title="Mode Pomodoro" className={`flex-1 py-1.5 text-xs flex justify-center items-center rounded transition-all duration-200 ${mode === 'FOKUS_POMODORO' ? 'bg-[#14b8a6] text-black shadow-[0_0_8px_rgba(20,184,166,0.4)]' : 'text-gray-500 hover:text-[#14b8a6]'}`}>⏱️</button>
            <button onClick={() => setMode('ABSOLUT')} title="Mode Kunci Absolut" className={`flex-1 py-1.5 text-xs flex justify-center items-center rounded transition-all duration-200 ${mode === 'ABSOLUT' ? 'bg-red-600 text-white shadow-[0_0_8px_rgba(220,38,38,0.4)]' : 'text-gray-500 hover:text-red-400'}`}>⚡</button>
          </div>
        </div>

        {/* PROGRES MEMBACA */}
        <div className="p-5 border-b border-gray-800">
          <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
            <span>PROGRES MEMBACA</span>
            <span className="text-[var(--color-software-tosca)]">{progressPercentage}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-[var(--color-software-tosca)] transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }}></div>
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
                    onClick={() => {
                      setCurrentIndex(idx);
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                      document.querySelector('.scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-5 py-4 text-sm transition-colors flex justify-between items-center ${isActive ? 'bg-[#1a1a1a] border-l-4 border-[var(--color-software-bright)] text-white font-bold' : 'border-l-4 border-transparent text-gray-400 hover:bg-[#161616] hover:text-gray-200'}`}
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

      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"></div>}
    </div>
  );
};

export default EksplorasiPage;