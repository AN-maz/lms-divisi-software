import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TrackPickerPage from './pages/TrackPickerPage';
import SilabusPage from './pages/SilabusPage';
import ModuleHubPage from './pages/ModuleHubPage';
import EksplorasiPage from './pages/EksplorasiPage';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--lms-bg)]">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Pemilih jalur -> daftar pertemuan -> hub modul */}
          <Route path="/materi" element={<TrackPickerPage />} />
          <Route path="/materi/:track" element={<SilabusPage />} />
          <Route path="/materi/:track/:id" element={<ModuleHubPage />} />

          {/* Rute flat agar aset tidak pecah */}
          <Route path="/eksplorasi/:id" element={<EksplorasiPage />} />
          <Route path="/kuis/:id" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
