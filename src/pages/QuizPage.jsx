import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiCheck, FiAward, FiAlertCircle, FiArrowLeft, FiChevronRight, FiChevronLeft, FiGrid } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useProgressStore from '../store/useProgressStore';
import useDataLoader from '../hooks/useDataLoader';
import useTrackSlug from '../hooks/useTrackSlug';
import ThemeToggle from '../components/ThemeToggle';
import LayarPenuh from '../components/LayarPenuh';
import { dataSources } from '../services/dataService';
import { shuffleArray, calculateQuizScore } from '../utils';

const NILAI_LULUS = 70;

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const slugTrack = useTrackSlug(id);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState({ score: 0, correct: 0, wrong: 0 });

  const markAsCompleted = useProgressStore((state) => state.markAsCompleted);

  // Satu file soal per modul: /content/kuis/modul-NN.json
  const { data: daftarSoal, loading, error } = useDataLoader(dataSources.kuisModul(id));

  // Tujuan kembali: hub modul bila track diketahui, selain itu pemilih jalur.
  const backTo = slugTrack ? `/materi/${slugTrack}/${id}` : '/materi';

  // Soal diacak (Fisher-Yates) sekali per modul, urutan tidak berubah saat render ulang
  const questions = useMemo(
    () => (Array.isArray(daftarSoal) && daftarSoal.length > 0 ? shuffleArray(daftarSoal) : []),
    [daftarSoal]
  );

  const noQuizFound = !loading && (!error || error.notFound) && questions.length === 0;
  const passed = result.score >= NILAI_LULUS;

  const handleSelect = (optionIdx) => {
    const currentQId = questions[currentQuestionIndex].id;
    setSelectedAnswers(prev => ({ ...prev, [currentQId]: optionIdx }));
  };

  const handleSubmit = () => {
    const hasil = calculateQuizScore(questions, selectedAnswers);
    setResult(hasil);
    setIsSubmitted(true);

    if (hasil.score >= NILAI_LULUS) {
      markAsCompleted(parseInt(id));
    }
  };

  if (loading) return (
    <LayarPenuh>
      <div className="animate-pulse text-[var(--lms-accent-text)] font-bold">Inisialisasi Sistem Evaluasi...</div>
    </LayarPenuh>
  );

  if (noQuizFound) return (
    <LayarPenuh>
      <div className="max-w-xl text-center bg-[var(--lms-surface)] p-10 rounded-3xl border border-[var(--lms-border)] shadow-2xl">
        <h1 className="text-3xl font-black text-[var(--lms-accent-2-text)] mb-4">Modul Eksplorasi Bebas</h1>
        <p className="text-[var(--lms-text-muted)] mb-8">Knowledge Check tidak tersedia untuk modul ini. Anda dapat langsung memvalidasi progres Anda.</p>
        <button onClick={() => { markAsCompleted(parseInt(id)); navigate('/materi'); }} className="w-full py-4 bg-[var(--lms-accent-bg)] text-black font-black rounded-xl">Konfirmasi Kelulusan</button>
      </div>
    </LayarPenuh>
  );

  if (error) return (
    <LayarPenuh>
      <div className="max-w-xl text-center bg-[var(--lms-surface)] p-10 rounded-3xl border border-[var(--lms-border)] shadow-2xl">
        <h1 className="text-3xl font-black text-red-400 mb-4">Gagal Memuat Kuis</h1>
        <p className="text-[var(--lms-text-muted)] mb-8">{error.message}</p>
        <button onClick={() => navigate('/materi')} className="w-full py-4 bg-[var(--lms-accent-bg)] text-black font-black rounded-xl">Kembali ke Peta Belajar</button>
      </div>
    </LayarPenuh>
  );

  if (isSubmitted) {
    return (
      <LayarPenuh>
         <div className="max-w-2xl w-full bg-[var(--lms-surface)] border border-[var(--lms-border)] p-12 rounded-3xl text-center shadow-2xl">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500'}`}>
                {passed ? <FiAward size={40} /> : <FiAlertCircle size={40} />}
            </div>
            <h2 className="text-5xl font-black mb-2">Skor: {result.score}</h2>
            <div className="flex justify-center gap-4 my-8">
                <div className="px-6 py-3 bg-[var(--lms-bg)] rounded-xl border border-[var(--lms-border)]">
                    <p className="text-xs text-[var(--lms-text-faint)] font-bold">BENAR</p>
                    <p className="text-2xl font-black text-green-400">{result.correct}</p>
                </div>
                <div className="px-6 py-3 bg-[var(--lms-bg)] rounded-xl border border-[var(--lms-border)]">
                    <p className="text-xs text-[var(--lms-text-faint)] font-bold">SALAH</p>
                    <p className="text-2xl font-black text-red-400">{result.wrong}</p>
                </div>
            </div>
            <button onClick={() => navigate(backTo)} className="w-full py-4 bg-[var(--color-software-tosca)] text-black font-black rounded-xl shadow-lg">Kembali ke Hub Modul</button>
         </div>
      </LayarPenuh>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-[var(--lms-bg)] text-[var(--lms-text)] flex flex-col md:flex-row font-sans">
      
      {/* --- SIDEBAR NAVIGASI (GRID SOAL) --- */}
      <div className="w-full md:w-80 bg-[var(--lms-surface)] border-b md:border-b-0 md:border-r border-[var(--lms-border)] p-6 flex flex-col h-auto md:h-screen sticky top-0 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to={backTo} className="text-[var(--lms-text-faint)] hover:text-[var(--lms-text)] transition-colors flex items-center gap-2 font-bold text-sm">
            <FiArrowLeft /> Mission Hub
          </Link>
          <ThemeToggle variant="pill" />
        </div>
        
        <div className="mb-6">
          <h3 className="text-[var(--lms-text-muted)] text-xs font-black tracking-widest uppercase mb-4 flex items-center gap-2">
            <FiGrid /> Navigator Soal
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isActive = currentQuestionIndex === idx;
              
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`h-10 rounded-lg font-bold text-xs transition-all border-2 ${
                    isActive 
                      ? 'border-[var(--color-software-bright)] bg-[var(--lms-accent-bg)] text-black shadow-[0_0_10px_rgba(57,255,90,0.3)]' 
                      : isAnswered 
                        ? 'border-[var(--color-software-teal)] bg-[var(--color-software-teal)]/20 text-[var(--lms-accent-2-text)]' 
                        : 'border-[var(--lms-border)] bg-[var(--lms-surface-3)] text-[var(--lms-text-faint)] hover:border-[var(--lms-border-strong)]'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-[var(--lms-border)] text-[10px] text-[var(--lms-text-ghost)] font-bold uppercase tracking-widest">
            <div className="flex justify-between mb-2">
                <span>Status:</span>
                <span className="text-[var(--lms-text-muted)]">{Object.keys(selectedAnswers).length} / {questions.length} Terjawab</span>
            </div>
            <div className="w-full h-1 bg-[var(--lms-surface-3)] rounded-full overflow-hidden">
                <div 
                    className="h-full bg-[var(--color-software-tosca)] transition-all" 
                    style={{ width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%` }}
                ></div>
            </div>
        </div>
      </div>

      {/* --- AREA UTAMA KUIS --- */}
      <div className="flex-1 p-6 md:p-16 flex flex-col justify-center max-w-5xl mx-auto w-full">
        <div className="bg-[var(--lms-surface)] p-8 md:p-12 rounded-3xl border border-[var(--lms-border)] shadow-2xl relative">
            <div className="text-[var(--lms-accent-2-text)] font-black text-xs tracking-tighter mb-4">PERTANYAAN NO. {currentQuestionIndex + 1}</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">{currentQ.question}</h2>

            {currentQ.codeSnippet && (
              <div className="mb-8 rounded-xl overflow-hidden border border-[var(--lms-border)] text-sm">
                <SyntaxHighlighter language={currentQ.language || 'javascript'} style={vscDarkPlus} PreTag="div" customStyle={{ margin: 0, padding: '1.5rem' }}>
                  {currentQ.codeSnippet}
                </SyntaxHighlighter>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {currentQ.options.map((option, oIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(oIdx)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 ${
                      isSelected 
                        ? 'border-[var(--color-software-tosca)] bg-[var(--color-software-teal)]/10 text-[var(--lms-text)] font-bold' 
                        : 'border-[var(--lms-border)] bg-[var(--lms-surface-2)] text-[var(--lms-text-muted)] hover:border-[var(--lms-border-soft)]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${isSelected ? 'border-[var(--color-software-tosca)]' : 'border-[var(--lms-border-soft)]'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-software-tosca)]"></div>}
                    </div>
                    {option}
                  </button>
                );
              })}
            </div>
        </div>

        <div className="mt-10 flex justify-between gap-4">
            <button 
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 bg-[var(--lms-surface-3)] border border-[var(--lms-border)] rounded-xl font-bold disabled:opacity-20 hover:bg-[var(--lms-surface-3)] transition-all flex items-center gap-2"
            >
                <FiChevronLeft /> Prev
            </button>
            
            {isLastQuestion ? (
                <button 
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length < questions.length}
                    className="px-10 py-3 bg-[var(--lms-accent-bg)] text-black font-black rounded-xl shadow-[0_0_20px_rgba(57,255,90,0.3)] disabled:opacity-30 flex items-center gap-2"
                >
                    Submit <FiCheck />
                </button>
            ) : (
                <button 
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="px-10 py-3 bg-[var(--color-software-tosca)] text-black font-black rounded-xl hover:bg-[var(--lms-accent-bg)] transition-all flex items-center gap-2"
                >
                    Next <FiChevronRight />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;