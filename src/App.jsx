import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SilabusPage from './pages/SilabusPage';
import ModuleHubPage from './pages/ModuleHubPage';
import EksplorasiPage from './pages/EksplorasiPage';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/materi" element={<SilabusPage />} />
          
          {/* Rute dibuat Flat/Satu Tingkat agar aset tidak pecah */}
          <Route path="/materi/:id" element={<ModuleHubPage />} />
          <Route path="/eksplorasi/:id" element={<EksplorasiPage />} />
          <Route path="/kuis/:id" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;