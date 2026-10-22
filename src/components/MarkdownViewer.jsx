import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiLink } from 'react-icons/fi';
import MermaidDiagram from './markdown/MermaidDiagram';
import Callout from './markdown/Callout';
import CodeBlock from './markdown/CodeBlock';
import { slugify } from '../utils';

// Konten heading/anchor di bawah datang dari `children` (isi markdown), sehingga
// analisis statis tidak bisa melihatnya -> dua rule a11y dimatikan di file ini.
/* aislop-ignore-file jsx-a11y/heading-has-content, jsx-a11y/anchor-has-content */

// Heading dengan anchor-link kecil yang muncul saat hover untuk menyalin tautan.
const Heading = ({ level, children }) => {
  const Tag = `h${level}`;
  const teks = typeof children === 'string' ? children : String(children ?? '');
  const id = slugify(teks);
  const kelas =
    level === 1
      ? 'text-3xl md:text-4xl font-bold text-[var(--lms-accent-text)] mt-8 mb-4 border-b border-[var(--lms-border-strong)] pb-2'
      : level === 2
        ? 'text-2xl md:text-3xl font-bold text-[var(--lms-accent-2-text)] mt-8 mb-3'
        : 'text-xl font-bold text-[var(--lms-accent-2-text)] mt-5 mb-2';

  return (
    <Tag id={id} className={`group scroll-mt-24 ${kelas}`}>
      {children}
      <a
        href={`#${id}`}
        aria-label="Salin tautan bagian ini"
        className="ml-2 align-middle text-[var(--lms-text-faint)] opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 hover:text-[var(--lms-accent-2-text)]"
        onClick={(e) => {
          e.preventDefault();
          const url = `${window.location.origin}${window.location.pathname}#${id}`;
          navigator.clipboard?.writeText(url).catch(() => {});
          window.history.replaceState(null, '', `#${id}`);
        }}
      >
        <FiLink size={level === 1 ? 18 : 15} className="inline" />
      </a>
    </Tag>
  );
};

const MarkdownViewer = ({ content }) => {
  return (
    <div className="font-sans text-[var(--lms-text)]">
      <div className="max-w-[68ch]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ _node, children }) => <Heading level={1}>{children}</Heading>,
            h2: ({ _node, children }) => <Heading level={2}>{children}</Heading>,
            h3: ({ _node, children }) => <Heading level={3}>{children}</Heading>,
            p: ({ _node, ...props }) => <p className="mb-4 leading-relaxed text-[var(--lms-text-strong)] text-base md:text-lg" {...props} />,
            ul: ({ _node, ...props }) => <ul className="list-disc list-outside ml-6 mb-4 text-[var(--lms-text-strong)] space-y-2.5 marker:text-[var(--lms-accent-2-text)]" {...props} />,
            ol: ({ _node, ...props }) => <ol className="list-decimal list-outside ml-6 mb-4 text-[var(--lms-text-strong)] space-y-2.5 marker:font-semibold marker:text-[var(--lms-accent-2-text)]" {...props} />,
            li: ({ _node, ...props }) => <li className="pl-2" {...props} />,
            a: ({ _node, ...props }) => <a className="text-[var(--lms-accent-2-text)] underline hover:text-[var(--lms-accent-text)]" target="_blank" rel="noopener noreferrer" {...props} />,
            blockquote: ({ _node, children }) => <Callout>{children}</Callout>,
            // hr dipakai sebagai pemisah section; tampilkan sebagai spacer halus.
            hr: () => <div aria-hidden="true" className="my-8 h-px bg-gradient-to-r from-transparent via-[var(--lms-border-strong)] to-transparent" />,
            img: ({ _node, alt, ...props }) => (
              <img className="h-auto my-6 max-w-full rounded-xl border border-[var(--lms-border-strong)] shadow-lg" loading="lazy" alt={alt ?? ''} {...props} />
            ),
            table: ({ _node, ...props }) => (
              <div className="my-6 overflow-x-auto rounded-lg border border-[var(--lms-border-strong)]">
                <table className="w-full min-w-[600px] border-collapse text-left" {...props} />
              </div>
            ),
            thead: ({ _node, ...props }) => <thead className="sticky top-0 z-10 bg-[var(--lms-surface-3)] text-[var(--lms-accent-2-text)]" {...props} />,
            th: ({ _node, ...props }) => <th className="border-b border-[var(--lms-border-strong)] px-4 py-3 font-bold" {...props} />,
            tbody: ({ _node, ...props }) => <tbody className="[&>tr:nth-child(even)]:bg-[var(--lms-surface-2)]/50" {...props} />,
            td: ({ _node, ...props }) => <td className="border-b border-[var(--lms-border)] px-4 py-3 text-[var(--lms-text-body)]" {...props} />,
            tr: ({ _node, ...props }) => <tr className="transition-colors hover:bg-[var(--lms-surface-3)]/50" {...props} />,
            code({ _node, inline, className, children, ...props }) {
              const cocok = /language-([\w-]+)/.exec(className || '');
              const kode = String(children).replace(/\n$/, '');

              if (inline || !cocok) {
                if (!inline && !cocok) {
                  // Blok tanpa bahasa: tampilkan sebagai teks polos (rules: wajib bahasa).
                  return (
                    <pre className="my-4 overflow-x-auto rounded-xl border border-[var(--lms-border-strong)] bg-[var(--lms-surface-2)] p-4 text-sm text-[var(--lms-text-body)]">
                      <code {...props}>{kode}</code>
                    </pre>
                  );
                }
                return (
                  <code className="rounded bg-[var(--lms-surface-3)] px-1.5 py-0.5 font-mono text-[0.9em] font-medium text-[var(--lms-accent-text)]" {...props}>
                    {children}
                  </code>
                );
              }

              const bahasa = cocok[1].toLowerCase();
              if (bahasa === 'mermaid' || bahasa === 'flow') {
                return <MermaidDiagram chart={kode} />;
              }
              return <CodeBlock bahasa={bahasa} kode={kode} />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownViewer;
