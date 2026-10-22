import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Konten heading/anchor di bawah datang dari `children` (isi markdown), sehingga
// analisis statis tidak bisa melihatnya -> dua rule a11y dimatikan di file ini.
/* aislop-ignore-file jsx-a11y/heading-has-content, jsx-a11y/anchor-has-content */

const MarkdownViewer = ({ content }) => {
  return (
    <div className="text-[var(--lms-text)] font-sans overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ _node, ...props }) => <h1 className="text-3xl md:text-4xl font-bold text-[var(--lms-accent-text)] mt-8 mb-4 border-b border-[var(--lms-border-strong)] pb-2" {...props} />,
          h2: ({ _node, ...props }) => <h2 className="text-2xl md:text-3xl font-bold text-[var(--lms-accent-2-text)] mt-6 mb-3" {...props} />,
          h3: ({ _node, ...props }) => <h3 className="text-xl font-bold text-[var(--lms-accent-2-text)] mt-4 mb-2" {...props} />,
          p: ({ _node, ...props }) => <p className="mb-4 leading-relaxed text-[var(--lms-text-strong)] text-base md:text-lg" {...props} />,
          ul: ({ _node, ...props }) => <ul className="list-disc list-outside ml-6 mb-4 text-[var(--lms-text-strong)] space-y-2" {...props} />,
          ol: ({ _node, ...props }) => <ol className="list-decimal list-outside ml-6 mb-4 text-[var(--lms-text-strong)] space-y-2" {...props} />,
          li: ({ _node, ...props }) => <li className="pl-2" {...props} />,
          a: ({ _node, ...props }) => <a className="text-[var(--lms-accent-2-text)] hover:text-[var(--lms-accent-text)] underline" target="_blank" rel="noopener noreferrer" {...props} />,
          blockquote: ({ _node, ...props }) => <blockquote className="border-l-4 border-[var(--color-software-tosca)] bg-[var(--lms-surface-3)]/50 p-4 my-4 italic text-[var(--lms-text-body)] rounded-r-lg" {...props} />,
          img: ({ _node, alt, ...props }) => (
            <img className="max-w-full h-auto rounded-xl my-6 border border-[var(--lms-border-strong)] shadow-lg" loading="lazy" alt={alt ?? ''} {...props} />
          ),
          table: ({ _node, ...props }) => (
            <div className="overflow-x-auto my-6 border border-[var(--lms-border-strong)] rounded-lg">
              <table className="w-full text-left border-collapse min-w-[600px]" {...props} />
            </div>
          ),
          thead: ({ _node, ...props }) => <thead className="bg-[var(--lms-surface-3)] text-[var(--lms-accent-2-text)]" {...props} />,
          th: ({ _node, ...props }) => <th className="py-3 px-4 font-bold border-b border-[var(--lms-border-strong)]" {...props} />,
          td: ({ _node, ...props }) => <td className="py-3 px-4 border-b border-[var(--lms-border)] text-[var(--lms-text-body)]" {...props} />,
          tr: ({ _node, ...props }) => <tr className="hover:bg-[var(--lms-surface-3)]/50 transition-colors" {...props} />,
          code({ _node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className="rounded-xl my-4 text-sm md:text-base border border-[var(--lms-border-strong)] shadow-md"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-[var(--lms-surface-3)] text-[var(--lms-accent-text)] px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
