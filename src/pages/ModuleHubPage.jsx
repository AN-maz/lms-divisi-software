import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiBookOpen, FiCheckSquare, FiArrowLeft } from 'react-icons/fi';
import useProgressStore from '../store/useProgressStore';

const ModuleHubPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [moduleData, setModuleData] = useState(null);

    const completedModules = useProgressStore((state) => state.completedModules);
    const isCompleted = completedModules.includes(parseInt(id));

    useEffect(() => {
        fetch('/silabus.json')
            .then(res => res.json())
            .then(data => {
                const allModules = data.flatMap(group => group.modules);
                const currentMateri = allModules.find(m => m.id === parseInt(id));
                if (currentMateri) {
                    setModuleData(currentMateri);
                }
            });
    }, [id]);

    if (!moduleData) return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <div className="animate-pulse text-[var(--color-software-bright)] font-bold">Memuat Hub...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col p-6 md:p-12">
            <div className="max-w-4xl mx-auto w-full">

                {/* Tombol Back ke Silabus */}
                <button
                    onClick={() => navigate('/materi', { state: { lastModuleId: parseInt(id) } })}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 font-bold text-sm"
                >
                    <FiArrowLeft /> Peta Belajar
                </button>

                {/* Header Modul */}
                <div className="mb-12 border-b border-gray-800 pb-8">
                    <p className="text-[var(--color-software-tosca)] font-bold tracking-widest uppercase text-xs mb-2">
                        Control Hub
                    </p>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
                        {moduleData.title}
                    </h1>
                    {isCompleted && (
                        <span className="inline-block px-4 py-1.5 bg-[#1a2b4c] text-[var(--color-software-tosca)] text-xs rounded border border-[var(--color-software-teal)] font-bold tracking-wider uppercase">
                            ✓ Modul Selesai
                        </span>
                    )}
                </div>

                {/* Pilihan Aksi (Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Card 1: Eksplorasi Konsep */}
                    <Link
                        to={`/eksplorasi/${id}`}
                        className="group bg-[#121212] border border-gray-800 hover:border-[var(--color-software-teal)] rounded-2xl p-8 transition-all hover:-translate-y-2 shadow-lg flex flex-col items-start relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 to-gray-500 group-hover:from-[var(--color-software-teal)] group-hover:to-[var(--color-software-bright)] transition-all"></div>

                        <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] flex items-center justify-center mb-6 group-hover:bg-[var(--color-software-teal)]/20 transition-colors">
                            <FiBookOpen size={28} className="text-gray-400 group-hover:text-[var(--color-software-bright)]" />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-3">Eksplorasi Konsep</h2>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Pelajari teori dasar, baca dokumentasi, dan pahami studi kasus dari materi ini secara terstruktur.
                        </p>

                        <div className="mt-8 font-bold text-sm text-[var(--color-software-tosca)] group-hover:text-white transition-colors flex items-center gap-2">
                            Mulai Membaca <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </Link>

                    {/* Card 2: Knowledge Check */}
                    <Link
                        to={`/kuis/${id}`}
                        className="group bg-[#121212] border border-gray-800 hover:border-[var(--color-software-teal)] rounded-2xl p-8 transition-all hover:-translate-y-2 shadow-lg flex flex-col items-start relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 to-gray-500 group-hover:from-[var(--color-software-teal)] group-hover:to-[var(--color-software-bright)] transition-all"></div>

                        <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] flex items-center justify-center mb-6 group-hover:bg-[var(--color-software-teal)]/20 transition-colors">
                            <FiCheckSquare size={28} className="text-gray-400 group-hover:text-[var(--color-software-bright)]" />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-3">Knowledge Check</h2>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Uji pemahamanmu dari Eksplorasi Konsep. Dapatkan skor minimal 70% untuk menyelesaikan modul ini!
                        </p>

                        <div className="mt-8 font-bold text-sm text-[var(--color-software-tosca)] group-hover:text-white transition-colors flex items-center gap-2">
                            Mulai Evaluasi <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default ModuleHubPage;