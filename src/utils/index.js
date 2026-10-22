// Utility functions yang dipakai bersama oleh lebih dari satu komponen.

// Algoritma Fisher-Yates untuk mengacak urutan array (mis. urutan soal kuis)
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Membuat id anchor dari teks heading (dipakai anchor-link h2/h3 di materi).
export const slugify = (teks) =>
  String(teks)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// Menghitung skor kuis dari daftar soal + jawaban yang dipilih pengguna
export const calculateQuizScore = (questions, selectedAnswers) => {
  let correctCount = 0;
  let wrongCount = 0;

  questions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const score = Math.round((correctCount / questions.length) * 100);
  return { score, correct: correctCount, wrong: wrongCount };
};
