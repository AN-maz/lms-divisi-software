import { useMemo } from 'react';

const FloatingTimer = ({ 
  mode, 
  waktuPomodoro, 
  isPomodoroPaused, 
  onTogglePause 
}) => {
 
  // ENKAPSULASI LOGIKA VISUAL 
  
  
  // Mengubah sisa detik menjadi format MM:SS secara empiris
  const formattedTime = useMemo(() => {
    const m = Math.floor(waktuPomodoro / 60).toString().padStart(2, '0');
    const s = (waktuPomodoro % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, [waktuPomodoro]);

  // Jika subjek berada di Mode Biasa, widget ini tidak boleh merender apa pun ke DOM
  if (mode === 'BIASA') return null;

  return (
    <div className="
      fixed z-[60] flex items-center gap-3 bg-[var(--lms-surface)]/95 backdrop-blur-md border border-[var(--lms-border)] rounded-full shadow-[0_5px_25px_rgba(0,0,0,0.6)]
      px-4 py-2 bottom-8 left-1/2 transform -translate-x-1/2
      md:absolute md:bottom-auto md:top-4 md:left-auto md:right-6 md:translate-x-0 md:px-3 md:py-1.5
      transition-all duration-300 ease-in-out
    ">
      
      {/* 1. Indikator Status (Titik Berkedip) & Teks Angka */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5 md:h-2 md:w-2">
          {/* Pendaran (Ping) otomatis mati jika mesin waktu dijeda oleh subjek */}
          {!isPomodoroPaused && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              mode === 'ABSOLUT' ? 'bg-red-500' : 'bg-[#14b8a6]'
            }`}></span>
          )}
          {/* Warna merepresentasikan psikologi status: Merah (Sanksi), Kuning (Jeda), Tosca (Fokus) */}
          <span className={`relative inline-flex rounded-full h-full w-full ${
            mode === 'ABSOLUT' ? 'bg-red-500' : isPomodoroPaused ? 'bg-yellow-500' : 'bg-[#14b8a6]'
          }`}></span>
        </span>
        
        <span className={`text-xs md:text-sm font-mono font-bold tracking-wider ${
          mode === 'ABSOLUT' ? 'text-red-400' : isPomodoroPaused ? 'text-yellow-500' : 'text-[#14b8a6]'
        }`}>
          {mode === 'FOKUS_POMODORO' ? `Sisa: ${formattedTime}` : 'Sensor Absolut'}
        </span>
      </div>

      {/* 2. Tombol Aksi Jeda/Mulai */}
      {mode === 'FOKUS_POMODORO' && (
        <button 
          onClick={onTogglePause}
          className={`ml-2 flex items-center justify-center h-6 px-3 rounded-full text-[var(--lms-text)] transition-all duration-200 border shadow-sm ${
            !isPomodoroPaused 
              ? 'bg-red-600 hover:bg-red-700 border-red-800 shadow-[0_0_8px_rgba(220,38,38,0.4)]' // Berjalan -> Tombol Jeda Merah
              : 'bg-[var(--lms-surface-3)] hover:bg-[var(--lms-surface-3)] border-[var(--lms-border-soft)]'                                  // Berhenti -> Tombol Mulai Netral
          }`}
          title={isPomodoroPaused ? "Lanjutkan Waktu" : "Jeda Sementara"}
        >
          <span className="text-[10px] font-bold tracking-wider">
            {isPomodoroPaused ? 'Mulai' : 'Jeda'}
          </span>
        </button>
      )}

    </div>
  );
};

export default FloatingTimer;