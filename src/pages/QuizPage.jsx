import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiCheck, FiX, FiAward, FiAlertCircle, FiArrowLeft, FiChevronRight, FiChevronLeft, FiGrid } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useProgressStore from '../store/useProgressStore';

// Algoritma Fisher-Yates untuk mengacak urutan array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState({ score: 0, correct: 0, wrong: 0 });
  const [passed, setPassed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noQuizFound, setNoQuizFound] = useState(false);

  const markAsCompleted = useProgressStore((state) => state.markAsCompleted);

  useEffect(() => {
    setLoading(true);
    fetch('/data/quizzes.json')
      .then(res => res.json())
      .then(data => {
        if (data[id] && data[id].length > 0) {
          // PERBAIKAN: Acak soal sebelum dimasukkan ke dalam state
          const randomizedQuestions = shuffleArray(data[id]);
          setQuestions(randomizedQuestions);
          setNoQuizFound(false);
        } else {
          setNoQuizFound(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal memuat kuis:", err);
        setNoQuizFound(true);
        setLoading(false);
      });
  }, [id]);

  const handleSelect = (optionIdx) => {
    const currentQId = questions[currentQuestionIndex].id;
    setSelectedAnswers(prev => ({ ...prev, [currentQId]: optionIdx }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    let wrongCount = 0;

    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const finalScore = Math.round((correctCount / questions.length) * 100);
    setResult({ score: finalScore, correct: correctCount, wrong: wrongCount });
    setIsSubmitted(true);

    if (finalScore >= 70) {
      setPassed(true);
      markAsCompleted(parseInt(id)); 
    } else {
      setPassed(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center animate-pulse text-[var(--color-software-bright)] font-bold">Inisialisasi Sistem Evaluasi...</div>;

  if (noQuizFound) return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
      <div className="max-w-xl text-center bg-[#121212] p-10 rounded-3xl border border-gray-800 shadow-2xl">
        <h1 className="text-3xl font-black text-[var(--color-software-tosca)] mb-4">Modul Eksplorasi Bebas</h1>
        <p className="text-gray-400 mb-8">Knowledge Check tidak tersedia untuk modul ini. Anda dapat langsung memvalidasi progres Anda.</p>
        <button onClick={() => { markAsCompleted(parseInt(id)); navigate('/materi'); }} className="w-full py-4 bg-[var(--color-software-bright)] text-black font-black rounded-xl">Konfirmasi Kelulusan</button>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
         <div className="max-w-2xl w-full bg-[#121212] border border-gray-800 p-12 rounded-3xl text-center shadow-2xl">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500'}`}>
                {passed ? <FiAward size={40} /> : <FiAlertCircle size={40} />}
            </div>
            <h2 className="text-5xl font-black mb-2">Skor: {result.score}</h2>
            <div className="flex justify-center gap-4 my-8">
                <div className="px-6 py-3 bg-[#0a0a0a] rounded-xl border border-gray-800">
                    <p className="text-xs text-gray-500 font-bold">BENAR</p>
                    <p className="text-2xl font-black text-green-400">{result.correct}</p>
                </div>
                <div className="px-6 py-3 bg-[#0a0a0a] rounded-xl border border-gray-800">
                    <p className="text-xs text-gray-500 font-bold">SALAH</p>
                    <p className="text-2xl font-black text-red-400">{result.wrong}</p>
                </div>
            </div>
            <button onClick={() => navigate('/materi')} className="w-full py-4 bg-[var(--color-software-tosca)] text-black font-black rounded-xl shadow-lg">Kembali ke Peta Belajar</button>
         </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row font-sans">
      
      {/* --- SIDEBAR NAVIGASI (GRID SOAL) --- */}
      <div className="w-full md:w-80 bg-[#121212] border-b md:border-b-0 md:border-r border-gray-800 p-6 flex flex-col h-auto md:h-screen sticky top-0 overflow-y-auto">
        <Link to={`/materi/${id}`} className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 mb-8 font-bold text-sm">
          <FiArrowLeft /> Mission Hub
        </Link>
        
        <div className="mb-6">
          <h3 className="text-gray-400 text-xs font-black tracking-widest uppercase mb-4 flex items-center gap-2">
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
                      ? 'border-[var(--color-software-bright)] bg-[var(--color-software-bright)] text-black shadow-[0_0_10px_rgba(57,255,90,0.3)]' 
                      : isAnswered 
                        ? 'border-[var(--color-software-teal)] bg-[var(--color-software-teal)]/20 text-[var(--color-software-tosca)]' 
                        : 'border-gray-800 bg-gray-900 text-gray-500 hover:border-gray-700'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-800 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            <div className="flex justify-between mb-2">
                <span>Status:</span>
                <span className="text-gray-400">{Object.keys(selectedAnswers).length} / {questions.length} Terjawab</span>
            </div>
            <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-[var(--color-software-tosca)] transition-all" 
                    style={{ width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%` }}
                ></div>
            </div>
        </div>
      </div>

      {/* --- AREA UTAMA KUIS --- */}
      <div className="flex-1 p-6 md:p-16 flex flex-col justify-center max-w-5xl mx-auto w-full">
        <div className="bg-[#121212] p-8 md:p-12 rounded-3xl border border-gray-800 shadow-2xl relative">
            <div className="text-[var(--color-software-tosca)] font-black text-xs tracking-tighter mb-4">PERTANYAAN NO. {currentQuestionIndex + 1}</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">{currentQ.question}</h2>

            {currentQ.codeSnippet && (
              <div className="mb-8 rounded-xl overflow-hidden border border-gray-800 text-sm">
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
                        ? 'border-[var(--color-software-tosca)] bg-[var(--color-software-teal)]/10 text-white font-bold' 
                        : 'border-gray-800 bg-[#161616] text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${isSelected ? 'border-[var(--color-software-tosca)]' : 'border-gray-600'}`}>
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
                className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-xl font-bold disabled:opacity-20 hover:bg-gray-800 transition-all flex items-center gap-2"
            >
                <FiChevronLeft /> Prev
            </button>
            
            {isLastQuestion ? (
                <button 
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length < questions.length}
                    className="px-10 py-3 bg-[var(--color-software-bright)] text-black font-black rounded-xl shadow-[0_0_20px_rgba(57,255,90,0.3)] disabled:opacity-30 flex items-center gap-2"
                >
                    Submit <FiCheck />
                </button>
            ) : (
                <button 
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="px-10 py-3 bg-[var(--color-software-tosca)] text-black font-black rounded-xl hover:bg-[var(--color-software-bright)] transition-all flex items-center gap-2"
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