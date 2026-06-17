import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp, FiCheckCircle, FiBookOpen } from 'react-icons/fi';
import useProgressStore from '../store/useProgressStore';

const SilabusPage = () => {
  const [silabus, setSilabus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Menampilkan 3 kelompok pertemuan per halaman

  // State untuk melacak pertemuan mana saja yang sedang terbuka dropdown-nya
  const [openSections, setOpenSections] = useState({});

  const completedModules = useProgressStore((state) => state.completedModules);

  useEffect(() => {
    fetch('/silabus.json')
      .then((res) => res.json())
      .then((data) => {
        setSilabus(data);
        // Secara default, buka dropdown untuk pertemuan pertama di halaman tersebut
        if (data.length > 0) {
          setOpenSections({ [data[0].pertemuan]: true });
        }
      })
      .catch((err) => console.error("Gagal memuat silabus:", err));
  }, []);

  // Fungsi toggle buka-tutup accordion
  const toggleSection = (pertemuanId) => {
    setOpenSections(prev => ({
      ...prev,
      [pertemuanId]: !prev[pertemuanId]
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8 text-white font-sans flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-grow">
        
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white font-bold mb-8 transition-colors text-sm">
          ← Kembali ke Beranda
        </Link>
        
        <h1 className="text-4xl font-black mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-software-bright)] to-[var(--color-software-teal)]">
          Peta Perjalanan Belajar
        </h1>
        <p className="text-center mb-12 text-gray-400">
          Kelompok materi berdasarkan pertemuan divisi. Buka pertemuan untuk melihat modul penjelasannya!
        </p>

        {/* List Kelompok Pertemuan */}
        <div className="space-y-6 min-h-[400px]">
          {currentPertemuan.map((group) => {
            const isExpanded = openSections[group.pertemuan];
            
            // Hitung total modul yang selesai di dalam pertemuan ini
            const completedCount = group.modules.filter(m => completedModules.includes(m.id)).length;
            const isAllGroupCompleted = completedCount === group.modules.length;

            return (
              <div 
                key={group.pertemuan}
                className="rounded-2xl border border-gray-800 bg-[#121212] overflow-hidden shadow-xl transition-all"
              >
                {/* BAR BARIS UTAMA (HEADER PERTEMUAN) */}
                <button
                  onClick={() => toggleSection(group.pertemuan)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 bg-[#161616] hover:bg-[#1e1e1e] transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl md:text-2xl font-black text-white">
                        {group.title}
                      </h2>
                      {isAllGroupCompleted && (
                        <FiCheckCircle className="text-[var(--color-software-bright)] flex-shrink-0" size={20} />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-2xl hidden sm:block">
                      {group.description}
                    </p>
                    <div className="text-xs font-bold text-[var(--color-software-tosca)] mt-2 tracking-wide uppercase">
                      Progres: {completedCount} dari {group.modules.length} Modul Selesai
                    </div>
                  </div>

                  {/* Ikon Panah Dropdown */}
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 border border-gray-800">
                    {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                  </div>
                </button>

                {/* ISI DROPDOWN (DAFTAR MODUL) */}
                {isExpanded && (
                  <div className="border-t border-gray-800/60 bg-[#0d0d0d] p-4 md:p-6 space-y-3">
                    {group.modules.map((materi) => {
                      const isCompleted = completedModules.includes(materi.id);

                      return (
                        <div 
                          key={materi.id}
                          className="p-4 rounded-xl border border-gray-800 bg-[#121212] hover:border-[var(--color-software-teal)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <FiBookOpen className={isCompleted ? "text-[var(--color-software-bright)]" : "text-gray-600"} size={18} />
                            <span className={`font-semibold text-sm md:text-base ${isCompleted ? 'text-gray-400' : 'text-gray-200'}`}>
                              {materi.title}
                            </span>
                          </div>

                          <Link
                            to={`/materi/${materi.id}`}
                            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all w-full sm:w-auto text-center ${
                              isCompleted
                                ? 'bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700'
                                : 'bg-[var(--color-software-tosca)] text-black hover:bg-[var(--color-software-bright)]'
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
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-2.5 bg-[#121212] text-white rounded-lg font-bold border border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 w-full sm:w-auto transition-colors"
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
                      : 'bg-[#121212] text-gray-400 border border-gray-700 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-2.5 bg-[#121212] text-white rounded-lg font-bold border border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 w-full sm:w-auto transition-colors"
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