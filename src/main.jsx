import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Terapkan tema sebelum paint pertama agar tidak berkedip (FOUC).
// Nilai disimpan sendiri oleh useThemeStore (key: lms-tema).
;(function terapkanTemaAwal() {
  const tema = (() => {
    try {
      const mentah = localStorage.getItem('lms-tema')
      const tersimpan = mentah ? JSON.parse(mentah)?.state?.tema : null
      if (tersimpan) return tersimpan
    } catch {
      // localStorage tidak tersedia / isinya rusak -> pakai preferensi sistem
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })()

  document.documentElement.setAttribute('data-theme', tema)
})()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
