import { FiMoon, FiSun } from 'react-icons/fi';
import useThemeStore, { TEMA } from '../store/useThemeStore';

// Tombol ganti tema. `variant` mengatur gaya agar menyatu dengan tiap halaman:
//   - 'pill'   : tombol bulat mengambang (halaman baca materi)
//   - 'inline' : tombol kotak sejajar ikon sosial/aksi (header & footer)
const ThemeToggle = ({ variant = 'inline', className = '' }) => {
  const tema = useThemeStore((state) => state.tema);
  const toggleTema = useThemeStore((state) => state.toggleTema);

  const gelap = tema === TEMA.GELAP;
  const label = gelap ? 'Aktifkan mode terang' : 'Aktifkan mode gelap';

  const gaya =
    variant === 'pill'
      ? 'h-9 w-9 rounded-full bg-[var(--lms-surface)] border border-[var(--lms-border)] hover:bg-[var(--lms-surface-3)] shadow-lg'
      : 'h-10 w-10 rounded bg-[var(--lms-surface)] border border-[var(--lms-border)] hover:bg-[var(--color-software-tosca)] hover:text-black';

  return (
    <button
      type="button"
      onClick={toggleTema}
      title={label}
      aria-label={label}
      aria-pressed={gelap}
      className={`flex items-center justify-center text-[var(--lms-text-muted)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-software-tosca)] ${gaya} ${className}`}
    >
      {gelap ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
};

export default ThemeToggle;
