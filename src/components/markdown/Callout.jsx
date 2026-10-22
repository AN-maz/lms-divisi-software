import { FiInfo, FiAlertTriangle, FiZap, FiHelpCircle } from 'react-icons/fi';

// Blockquote bertipe: jenisnya dideteksi dari awalan teks di dalam `>`.
// Menulis tetap markdown biasa, tanpa sintaks baru:
//   > **Catatan:** ...   > **Tips:** ...   > **Perhatian:** ...   > **Apa itu X?**
const TIPE = [
  { id: 'info', awalan: /^\s*\*\*(catatan|note|info|apa itu)\b/i, Ikon: FiInfo },
  { id: 'tip', awalan: /^\s*\*\*(tips?|saran)\b/i, Ikon: FiZap },
  { id: 'warn', awalan: /^\s*\*\*(perhatian|penting|warning|hati-hati|awas)\b/i, Ikon: FiAlertTriangle },
  { id: 'tanya', awalan: /^\s*\*\*(kenapa|mengapa|bagaimana)\b/i, Ikon: FiHelpCircle },
];

const GAYA = {
  info: {
    kotak: 'border-sky-500/50 bg-sky-500/10',
    label: 'text-sky-600 dark:text-sky-300',
    ikon: 'text-sky-500',
  },
  tip: {
    kotak: 'border-emerald-500/50 bg-emerald-500/10',
    label: 'text-emerald-700 dark:text-emerald-300',
    ikon: 'text-emerald-500',
  },
  warn: {
    kotak: 'border-amber-500/50 bg-amber-500/10',
    label: 'text-amber-700 dark:text-amber-300',
    ikon: 'text-amber-500',
  },
  tanya: {
    kotak: 'border-violet-500/50 bg-violet-500/10',
    label: 'text-violet-700 dark:text-violet-300',
    ikon: 'text-violet-500',
  },
  biasa: {
    kotak: 'border-[var(--color-software-tosca)]/60 bg-[var(--lms-surface-3)]/60',
    label: 'text-[var(--lms-accent-2-text)]',
    ikon: 'text-[var(--lms-accent-2-text)]',
  },
};

// Ambil teks polos dari props.children untuk mendeteksi jenis callout.
const teksDatar = (node) => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(teksDatar).join('');
  if (typeof node === 'object' && node.props) return teksDatar(node.props.children);
  return '';
};

const padanTipe = (teks) => TIPE.find((t) => t.awalan.test(teks))?.id ?? 'biasa';

const Callout = ({ children }) => {
  const jenis = padanTipe(teksDatar(children));
  const gaya = GAYA[jenis];
  const Ikon = TIPE.find((t) => t.id === jenis)?.Ikon ?? FiInfo;

  return (
    <aside className={`my-5 flex gap-3 rounded-r-xl rounded-l-sm border-l-4 px-4 py-3 ${gaya.kotak}`}>
      <Ikon size={18} className={`mt-1 shrink-0 ${gaya.ikon}`} aria-hidden="true" />
      <div className={`min-w-0 flex-1 text-sm leading-relaxed md:text-base [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-bold ${gaya.label}`}>
        {children}
      </div>
    </aside>
  );
};

export default Callout;
