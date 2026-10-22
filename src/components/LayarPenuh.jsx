import ThemeToggle from './ThemeToggle';

// Pembungkus layar penuh (loading / kosong / error / hasil).
// Tombol tema diletakkan mengambang di pojok kanan atas agar tetap bisa
// diakses di halaman yang tidak punya header.
const LayarPenuh = ({ children }) => (
  <div className="relative min-h-screen bg-[var(--lms-bg)] text-[var(--lms-text)] flex items-center justify-center p-6">
    <div className="absolute top-4 right-4 z-10">
      <ThemeToggle />
    </div>
    {children}
  </div>
);

export default LayarPenuh;
