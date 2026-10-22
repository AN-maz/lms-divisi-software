import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';

// Blok kode berpagar dengan tombol salin. Bahasanya wajib (lihat README:
// "Rules Penulisan Materi"); blok tanpa bahasa ditangani sebagai teks polos.
const CodeBlock = ({ bahasa, kode }) => {
  const [tersalin, setTersalin] = useState(false);

  const salin = async () => {
    try {
      await navigator.clipboard.writeText(kode);
      setTersalin(true);
      setTimeout(() => setTersalin(false), 1500);
    } catch {
      // Clipboard bisa ditolak (izin / konteks tidak aman); abaikan diam-diam.
    }
  };

  return (
    <div className="group relative my-4">
      <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
        <span className="pointer-events-none rounded bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/70 opacity-0 transition-opacity group-hover:opacity-100">
          {bahasa}
        </span>
        <button
          type="button"
          onClick={salin}
          aria-label={tersalin ? 'Tersalin' : 'Salin kode'}
          className="flex items-center gap-1 rounded-md border border-white/15 bg-black/50 px-2 py-1 text-[11px] font-medium text-white/80 opacity-0 transition-opacity hover:bg-black/70 hover:text-white focus:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-software-tosca)] group-hover:opacity-100"
        >
          {tersalin ? <FiCheck size={13} /> : <FiCopy size={13} />}
          <span>{tersalin ? 'Tersalin' : 'Salin'}</span>
        </button>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={bahasa}
        PreTag="div"
        className="rounded-xl !my-0 text-sm md:text-base border border-[var(--lms-border-strong)] shadow-md"
      >
        {kode}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
