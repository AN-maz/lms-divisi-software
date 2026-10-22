import { useState, useEffect, useRef } from 'react';

const GerbangSanksi = ({ isOpen, onUnlock }) => {
  
  // MEMORI INTRAMURAL (Hanya hidup di dalam gerbang sanksi)
  
  const [kuisMath, setKuisMath] = useState({ soal: '', jawaban: 0 });
  const [inputUser, setInputUser] = useState('');
  const [pesanError, setPesanError] = useState('');
  const inputRef = useRef(null);

  
  // MESIN GENERATOR LOGIKA
  
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

  // Siklus Hidup: Hasilkan soal baru setiap kali gerbang terbuka
  useEffect(() => {
    if (!isOpen) return undefined;

    // Dijalankan di frame berikutnya agar setState tidak terjadi sinkron
    // di dalam body effect (men memicu cascading render).
    const frameId = requestAnimationFrame(() => {
      generateKuisMath();
      // Fokuskan kursor secara otomatis untuk ergonomi maksimal
      if (inputRef.current) inputRef.current.focus();
    });

    return () => cancelAnimationFrame(frameId);
  }, [isOpen]);

  
  // MESIN VERIFIKASI
  
  const verifikasiJawaban = (e) => {
    e.preventDefault();
    if (parseInt(inputUser, 10) === kuisMath.jawaban) {
      onUnlock(); // Laporkan ke komponen induk bahwa sanksi telah selesai
    } else {
      setPesanError('Logika tidak valid. Kegagalan ini menuntut kalkulasi ulang.');
      generateKuisMath();
    }
  };

  // Jika gerbang tidak aktif, jangan render apapun ke DOM (Positivisme: Hemat Memori)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-[var(--lms-bg-deep)]/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
      <div className="bg-[var(--lms-surface)] border border-red-600 p-6 sm:p-8 rounded-lg shadow-[0_0_50px_rgba(220,38,38,0.3)] w-[95%] max-w-md text-center">
        
        <h2 className="text-red-500 font-extrabold text-xl sm:text-2xl mb-2 tracking-widest uppercase">
          Akses Terkunci
        </h2>
        
        <p className="text-[var(--lms-text-muted)] text-xs sm:text-sm mb-6">
          Sistem mendeteksi perpindahan atensi (Alt+Tab). Selesaikan parameter logis ini untuk memulihkan koneksi kognitif Anda.
        </p>
        
        <h1 className="text-[#14b8a6] text-4xl sm:text-5xl font-bold mb-6">
          {kuisMath.soal}
        </h1>
        
        {pesanError && (
          <div className="mb-4 py-2 px-3 bg-red-900/30 text-red-400 text-xs font-bold border border-red-500 rounded">
            ❌ {pesanError}
          </div>
        )}
        
        <form onSubmit={verifikasiJawaban} className="flex flex-col sm:flex-row gap-3">
          <input 
            ref={inputRef} 
            type="number" 
            value={inputUser} 
            onChange={(e) => setInputUser(e.target.value)}
            placeholder="Jawaban..."
            className="w-full bg-[var(--lms-bg)] border border-[var(--lms-border-strong)] rounded px-4 py-3 text-[var(--lms-text)] text-xl text-center outline-none focus:border-[#14b8a6] transition-colors" 
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
  );
};

export default GerbangSanksi;