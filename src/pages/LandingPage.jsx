import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import useDataLoader from '../hooks/useDataLoader';
import ThemeToggle from '../components/ThemeToggle';

// Dihitung sekali di luar render (fungsi impure: tidak boleh dipanggil saat render)
const TAHUN_INI = new Date().getFullYear();

const LandingPage = () => {
  const [mounted, setMounted] = useState(false);

  const { data: mentorsData } = useDataLoader('mentors');
  const mentors = mentorsData ?? [];

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--lms-bg)] text-[var(--lms-text)] font-sans flex flex-col overflow-x-hidden">

      {/* --- NAVBAR --- */}
      <nav className="w-full p-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-4">
          <img src="/software.png" alt="Logo Divisi" className="h-12 w-auto object-contain" />
          <div>
            <h2 className="font-extrabold text-xl tracking-wide text-[var(--lms-text)]">OXIGEN</h2>
            <p className="text-xs text-[var(--lms-accent-2-text)] font-medium tracking-widest uppercase">Divisi Software</p>
          </div>
        </div>
        <ThemeToggle />
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 relative text-center">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-software-teal)] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none"></div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight relative z-10">
          Tingkatkan <br className="md:hidden" /> Skill Web-mu <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--lms-accent-text)] to-[var(--lms-accent-2-text)]">
            Secara Terstruktur
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--lms-text-muted)] mb-12 max-w-2xl relative z-10">
          Media pembelajaran interaktif khusus untuk anggota Divisi Software Universitas Teknologi Bandung. Pelatihan untuk membantu kalian di acara OXIGEN GALAXY!
        </p>

        <Link
          to="/materi"
          className="relative z-10 inline-flex items-center justify-center px-10 py-4 bg-[var(--color-software-tosca)] text-black font-extrabold text-lg rounded-full hover:bg-[var(--lms-accent-bg-hover)] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(32,201,151,0.4)]"
        >
          Masuk ke Ruang Kelaz 🚀
        </Link>
      </main>

      {/* --- SECTION TIM SOFTWARE --- */}
      <section className="py-24 bg-[var(--lms-section)] relative border-t border-[var(--lms-border)]">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--lms-text)] mb-4">
            Di Balik Layar <span className="text-[var(--lms-accent-2-text)]">Divisi Software</span>
          </h2>
          <p className="text-[var(--lms-text-muted)] font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Kenalan dengan tim pengurus periode 2025-2026 yang menyusun kurikulum pembelajaran ini. Mau farming aura dulu YGY
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-[var(--lms-card)] rounded-2xl overflow-hidden relative group transform md:hover:-translate-y-3 transition-all duration-500 border border-[var(--lms-border)] hover:border-[var(--color-software-tosca)] flex flex-col shadow-lg"
              >

                <div className="hidden md:block absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-software-teal)] to-[var(--color-software-bright)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                <div className="relative h-80 md:h-64 overflow-hidden bg-[var(--lms-card-2)]">
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-[var(--lms-text-strong)] z-10 border border-[var(--lms-border-strong)]">
                    {mentor.tag}
                  </div>

                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover object-top md:transition-transform md:duration-700 md:group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--lms-card)] to-transparent"></div>
                </div>

                <div className="p-6 text-left flex-grow flex flex-col justify-between">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[var(--lms-text)] mb-1 md:group-hover:text-[var(--lms-accent-text)] transition-colors">{mentor.name}</h3>
                    <p className="text-[var(--lms-text-faint)] text-xs font-bold tracking-widest uppercase">{mentor.subtitle}</p>
                  </div>

                  <div className="space-y-3">
                    {mentor.stats.map((stat, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-[var(--lms-text-muted)] w-24">{stat.label}</span>
                        <div className="flex-grow mx-3 h-1.5 bg-[var(--lms-card-2)] rounded-full overflow-hidden relative">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--color-software-teal)] to-[var(--color-software-bright)] rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: mounted ? `${stat.value}%` : '0%',
                              transitionDelay: `${idx * 200}ms`
                            }}
                          ></div>
                        </div>
                        <span className="text-[var(--lms-text)] font-bold w-6 text-right">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>


      <footer className="bg-[var(--lms-bg)] text-[var(--lms-text)] pt-16 pb-8 px-6 md:px-12 relative overflow-hidden border-t border-[var(--lms-border)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-software-teal)] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">

          <div>
            <div className="flex items-center gap-3 mb-6">

              <img src="/oxigen.webp" alt="OXIGEN Logo" className="h-14 w-auto white brightness-200" />
            </div>
            <p className="text-sm text-[var(--lms-text-muted)] leading-relaxed pr-4 mb-6">
              OXIGEN Universitas Teknologi Bandung is one of the student activity units at the Bandung High School of Technology that focuses on the scope of science and technology.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/@oxigenutb08"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-[var(--lms-surface-3)] border border-[var(--lms-border)] hover:bg-[var(--color-software-tosca)] hover:text-black flex items-center justify-center transition-all"
              >
                <FaYoutube size={18} />
              </a>

              <a
                href="https://github.com/OXIGEN-UniversitasTeknologiBandung"
                rel="noopener noreferrer"
                target="_blank"
                className="w-10 h-10 rounded bg-[var(--lms-surface-3)] border border-[var(--lms-border)] hover:bg-[var(--color-software-tosca)] hover:text-black flex items-center justify-center transition-all"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.instagram.com/oxigen.utb/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-[var(--lms-surface-3)] border border-[var(--lms-border)] hover:bg-[var(--color-software-tosca)] hover:text-black flex items-center justify-center transition-all"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://www.linkedin.com/company/oxigen-stt-bandung"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-[var(--lms-surface-3)] border border-[var(--lms-border)] hover:bg-[var(--color-software-tosca)] hover:text-black flex items-center justify-center transition-all"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-[var(--lms-text)]">Quick Link</h3>
            <ul className="space-y-4 text-sm text-[var(--lms-text-muted)]">
              <li><a href="https://utb-univ.ac.id" target="_blank" rel="noreferrer" className="hover:text-[var(--lms-accent-text)] transition-colors">Universitas Teknologi Bandung</a></li>
              <li><a // aislop-ignore-next-line ai-slop/hardcoded-url -- situs resmi organisasi, bukan URL environment
                href="https://oxigenutb.netlify.app/" target="_blank" rel="noreferrer" className="hover:text-[var(--lms-accent-text)] transition-colors">Oxigen UTB</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-[var(--lms-text)]">Contact Us</h3>
            <ul className="space-y-4 text-sm text-[var(--lms-text-muted)]">
              <li><a href="mailto:oxigenutb@utb-univ.ac.id" className="hover:text-[var(--lms-accent-text)] transition-colors">oxigenutb@utb-univ.ac.id</a></li>
              <li className="pt-2 flex items-center gap-2">
                Bandung, Indonesia
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-[var(--lms-border)] flex justify-between items-center relative z-10 text-sm text-[var(--lms-text-faint)]">
          <p>© {TAHUN_INI} <span className="text-[var(--lms-accent-text)]">SOFTWARE</span>-OXIGEN UTB</p>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded bg-[var(--lms-surface-3)] border border-[var(--lms-border)] hover:bg-[var(--color-software-tosca)] hover:text-black flex items-center justify-center transition-all"
            >
              ↑
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;