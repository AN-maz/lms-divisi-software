import { useEffect, useRef, useState } from 'react';
import useThemeStore, { TEMA } from '../../store/useThemeStore';

// mermaid dimuat malas (dynamic import) supaya bundle awal tetap ringan;
// materi tanpa diagram tidak pernah mengunduhnya.
let mermaidPromise = null;
const muatMermaid = () => {
  if (!mermaidPromise) mermaidPromise = import('mermaid');
  return mermaidPromise;
};

const temaMermaid = (tema) =>
  tema === TEMA.GELAP
    ? {
        darkMode: true,
        background: 'transparent',
        primaryColor: '#0f2b2a',
        primaryTextColor: '#e5e7eb',
        primaryBorderColor: '#20C997',
        lineColor: '#20C997',
        secondaryColor: '#1a2b4c',
        tertiaryColor: '#161616',
        fontFamily: 'inherit',
      }
    : {
        darkMode: false,
        background: 'transparent',
        primaryColor: '#e8f5f1',
        primaryTextColor: '#0f1f26',
        primaryBorderColor: '#0d8b58',
        lineColor: '#0d8b58',
        secondaryColor: '#eef2f4',
        tertiaryColor: '#f7fafb',
        fontFamily: 'inherit',
      };

// Merender diagram Mermaid. Diberi fallback: kalau sintaks salah, tampilkan
// sumber diagram + pesan, jangan sampai halaman crash.
const MermaidDiagram = ({ chart, judul }) => {
  const tema = useThemeStore((state) => state.tema);
  const wrapRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let dibatalkan = false;
    let id = null;

    const render = async () => {
      try {
        const { default: mermaid } = await muatMermaid();
        if (dibatalkan) return;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          themeVariables: temaMermaid(tema),
          flowchart: { curve: 'basis', htmlLabels: true, useMaxWidth: true },
        });

        id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        if (dibatalkan || !wrapRef.current) return;

        if (wrapRef.current) {
          // Kosongkan wrapper
          while (wrapRef.current.firstChild) wrapRef.current.removeChild(wrapRef.current.firstChild);
          // Parse SVG string dari Mermaid ke DOM
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(svg, 'text/html');
            const svgEl = doc.body.firstChild;
            if (svgEl) wrapRef.current.appendChild(svgEl);
          } catch {
            // Parsing gagal; tampilkan teks error aman.
            wrapRef.current.textContent = 'Gagal merender diagram';
          }
        }
        setError(null);
      } catch (err) {
        if (dibatalkan) return;
        // Elemen sisa Mermaid kadang tertinggal di body saat parse gagal.
        if (id) document.getElementById(id)?.remove();
        document.getElementById(`d${id}`)?.remove();
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    render();

    return () => {
      dibatalkan = true;
    };
  }, [chart, tema]);

  if (error) {
    return (
      <figure className="my-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
        <figcaption className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
          Diagram gagal dirender
        </figcaption>
        <pre className="overflow-x-auto rounded-lg bg-[var(--lms-surface-2)] p-3 text-xs text-[var(--lms-text-body)]">
          <code>{chart}</code>
        </pre>
        <p className="mt-2 text-xs text-[var(--lms-text-muted)]">{error}</p>
      </figure>
    );
  }

  return (
    <figure className="my-6 rounded-xl border border-[var(--lms-border)] bg-[var(--lms-surface-4)] p-4">
      <div
        ref={wrapRef}
        role="img"
        aria-label={judul || 'Diagram alur materi'}
        className="flex justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full"
      />
    </figure>
  );
};

export default MermaidDiagram;
