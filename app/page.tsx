'use client';

import React, { useState, useEffect, useRef } from 'react';

// ── Íconos inline (evita depender de versiones específicas de lucide-react) ──
type IconProps = { size?: number; className?: string };

function IconBase({
  children,
  size = 18,
  className = '',
}: React.PropsWithChildren<IconProps>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

function Github({ size, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M15 22v-4.33a3.44 3.44 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91.65S17.73.35 15 2.19a13.38 13.38 0 0 0-6 0C6.27.35 5.09.65 5.09.65A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.44 3.44 0 0 0 9 18.13V22" />
      <path d="M9 20.13c-3 .87-5.36 0-6.5-2.13" />
    </IconBase>
  );
}

function Linkedin({ size, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </IconBase>
  );
}

function Mail({ size, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </IconBase>
  );
}

function ArrowUpRight({ size, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </IconBase>
  );
}

// ── Reemplaza estos enlaces con tus perfiles reales ──
const LINKS = {
  github: 'https://github.com/ErnestoCorzo',
  linkedin: 'https://linkedin.com/in/ernesto-corzo'
};

const TERMINAL_LINES = [
  { prompt: 'whoami', output: 'Ernesto Corzo — Desarrollador de Software' },
  {
    prompt: 'cat perfil.txt',
    output:
      'Construyo software eficiente, escalable y orientado a resultados, especializado en aplicaciones web modernas, sistemas multiplataforma y despliegues en la nube.',
  },
];

type TerminalLine = { prompt: string; output: string };
type RenderedLine = { prompt: string; output: string; outputDone: boolean };

function useTypewriter(lines: TerminalLine[], active: boolean) {
  const [rendered, setRendered] = useState<RenderedLine[]>(
    lines.map(() => ({ prompt: '', output: '', outputDone: false }))
  );
  const [, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active || done) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setRendered(lines.map((l) => ({ prompt: l.prompt, output: l.output, outputDone: true })));
      setDone(true);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function typePrompt(li: number, ci: number) {
      if (cancelled) return;
      const line = lines[li];
      if (ci <= line.prompt.length) {
        setRendered((prev) => {
          const next = [...prev];
          next[li] = { ...next[li], prompt: line.prompt.slice(0, ci) };
          return next;
        });
        timers.push(setTimeout(() => typePrompt(li, ci + 1), 38));
      } else {
        timers.push(setTimeout(() => typeOutput(li, 0), 260));
      }
    }

    function typeOutput(li: number, ci: number) {
      if (cancelled) return;
      const line = lines[li];
      if (ci <= line.output.length) {
        setRendered((prev) => {
          const next = [...prev];
          next[li] = { ...next[li], output: line.output.slice(0, ci) };
          return next;
        });
        timers.push(setTimeout(() => typeOutput(li, ci + 1), 12));
      } else {
        setRendered((prev) => {
          const next = [...prev];
          next[li] = { ...next[li], outputDone: true };
          return next;
        });
        if (li + 1 < lines.length) {
          setLineIndex(li + 1);
          timers.push(setTimeout(() => typePrompt(li + 1, 0), 420));
        } else {
          setDone(true);
        }
      }
    }

    typePrompt(0, 0);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  return { rendered, done };
}

function Gutter({ n }: { n: number }) {
  return (
    <span className="inline-block w-8 shrink-0 text-right pr-3 text-[11px] tabular-nums text-[var(--ink-faint)] select-none">
      {String(n).padStart(2, '0')}
    </span>
  );
}

export default function Portfolio() {
  const [heroActive, setHeroActive] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setHeroActive(true);
  }, []);

  const { rendered, done } = useTypewriter(TERMINAL_LINES, heroActive);

  return (
    <div
      style={
        {
          '--paper': '#FAF9F5',
          '--ink': '#14171B',
          '--ink-soft': '#4B5159',
          '--ink-faint': '#9CA1A8',
          '--jade': '#1F6F5C',
          '--jade-deep': '#123E33',
          '--line': '#E2DFD3',
          '--panel': '#101317',
        } as React.CSSProperties
      }
      className="min-h-screen bg-[var(--paper)] text-[var(--ink)]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .caret { animation: blink 1s step-end infinite; }
        @media (prefers-reduced-motion: reduce) {
          .caret { animation: none; opacity: 1; }
        }
        .tag {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="max-w-5xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between font-mono text-sm">
        <span className="text-[var(--ink)]">ernesto<span className="text-[var(--jade)]">.corzo</span></span>
        <div className="flex items-center gap-5 text-[var(--ink-soft)]">
          <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-[var(--jade)] transition-colors">
            <Github size={18} />
          </a>
        </div>
      </nav>

     {/* ── HERO: terminal ── */}
      <header ref={heroRef} className="max-w-5xl mx-auto px-6 md:px-10 pt-10 pb-24">
        <div className="rounded-md border border-[var(--line)] bg-[var(--panel)] shadow-[0_1px_0_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4B5159]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4B5159]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4B5159]" />
            <span className="ml-3 font-mono text-xs text-white/40">perfil.sh — zsh</span>
          </div>
          <div className="px-5 md:px-8 py-8 md:py-10 font-mono text-[13px] md:text-[15px] leading-relaxed">
            {TERMINAL_LINES.map((l, i) => {
              const r = rendered[i];
              return (
                <div key={i} className="mb-5 last:mb-0">
                  <div className="text-white/90">
                    <span className="text-[var(--jade)]">➜</span>{' '}
                    <span className="text-white/50">~</span>{' '}
                    <span>{r.prompt}</span>
                    {!done && r.prompt.length < l.prompt.length && <span className="caret text-white/70">▌</span>}
                  </div>
                  {r.output && (
                    <p className="mt-2 text-white/70 max-w-2xl">
                      {r.output}
                      {!done && r.outputDone === false && r.output.length > 0 && r.output.length < l.output.length && (
                        <span className="caret text-white/50">▌</span>
                      )}
                    </p>
                  )}
                </div>
              );
            })}
            {done && (
              <div className="text-white/90">
                <span className="text-[var(--jade)]">➜</span> <span className="text-white/50">~</span>{' '}
                <span className="caret text-white/70">▌</span>
              </div>
            )}
          </div>
        </div>

        {/* ── SECCIÓN MODIFICADA: Foto de perfil y Título ── */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Contenedor de la imagen */}
            <div className="shrink-0">
              <img 
                src="perfil.png" 
                alt="Fotografía de Ernesto Corzo" 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border border-[var(--line)] shadow-sm grayscale hover:grayscale-0 transition-all duration-500 ease-out"
              />
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              Ernesto Corzo
            </h1>
          </div>
          
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 font-mono text-sm text-[var(--ink-soft)] hover:text-[var(--jade)] transition-colors mb-2 sm:mb-1"
          >
            github.com/ErnestoCorzo
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-10 pb-28 space-y-20">
        {/* ── STACK ── */}
        <section>
          <div className="flex items-baseline gap-3 mb-6">
            <Gutter n={1} />
            <h2 className="font-display text-2xl md:text-3xl font-medium">Stack técnico</h2>
          </div>
          <div className="ml-11 rounded-md border border-[var(--line)] bg-white/60 p-6 md:p-8 font-mono text-sm md:text-[15px] leading-relaxed overflow-x-auto">
            <pre className="whitespace-pre">
<span className="text-[var(--ink-faint)]">{'{'}</span>{'\n'}
{'  '}<span className="text-[var(--jade)]">"frontend"</span>: [<span className="text-[var(--ink-soft)]">"Next.js"</span>, <span className="text-[var(--ink-soft)]">"TypeScript"</span>, <span className="text-[var(--ink-soft)]">"Tailwind CSS"</span>],{'\n'}
{'  '}<span className="text-[var(--jade)]">"backend"</span>: [<span className="text-[var(--ink-soft)]">"Node.js"</span>, <span className="text-[var(--ink-soft)]">"C# (.NET)"</span>],{'\n'}
{'  '}<span className="text-[var(--jade)]">"cloud"</span>: [<span className="text-[var(--ink-soft)]">"Vercel"</span>, <span className="text-[var(--ink-soft)]">"Render"</span>],{'\n'}
{'  '}<span className="text-[var(--jade)]">"database"</span>: [<span className="text-[var(--ink-soft)]">"PostgreSQL (Neon)"</span>, <span className="text-[var(--ink-soft)]">"SQLite"</span>]{'\n'}
<span className="text-[var(--ink-faint)]">{'}'}</span>
            </pre>
          </div>
        </section>

        {/* ── PROYECTOS ── */}
        <section>
          <div className="flex items-baseline gap-3 mb-6">
            <Gutter n={2} />
            <h2 className="font-display text-2xl md:text-3xl font-medium">Proyectos</h2>
          </div>

          <div className="ml-11 space-y-6">
            {/* Proyecto 1: NovaFintech */}
            <div className="rounded-md border border-[var(--line)] bg-white/60 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="font-mono text-xs text-[var(--ink-faint)]">/proyectos/novafintech.tsx</span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm border border-[var(--jade)] text-[var(--jade)] shrink-0">
                  En la nube
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium mb-2">NovaFintech</h3>
              <p className="text-[var(--ink-soft)] leading-relaxed mb-4 max-w-2xl">
                Plataforma financiera con arquitectura escalable: frontend desplegado en Vercel que consume una API en .NET alojada en Render, con datos gestionados en PostgreSQL sobre Neon.
              </p>
              <div className="flex flex-wrap gap-2 tag text-xs">
                {['Next.js', 'C# (.NET)', 'PostgreSQL (Neon)', 'Render', 'Vercel'].map((t) => (
                  <span key={t} className="px-2 py-1 border border-[var(--line)] text-[var(--ink-soft)] rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Proyecto 2 */}
            <div className="rounded-md border border-[var(--line)] bg-white/60 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="font-mono text-xs text-[var(--ink-faint)]">/proyectos/explora-ocozocoautla.tsx</span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm border border-[var(--line)] text-[var(--ink-faint)] shrink-0">
                  Local
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium mb-2">Explora Ocozocoautla</h3>
              <p className="text-[var(--ink-soft)] leading-relaxed mb-4 max-w-2xl">
                Directorio digital interactivo con mapas y rutas dinámicas para mejorar la navegación y el descubrimiento de comercios y sitios locales.
              </p>
              <div className="flex flex-wrap gap-2 tag text-xs">
                {['Next.js', 'TypeScript', 'Tailwind CSS', 'Leaflet'].map((t) => (
                  <span key={t} className="px-2 py-1 border border-[var(--line)] text-[var(--ink-soft)] rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Proyecto 3 */}
            <div className="rounded-md border border-[var(--line)] bg-white/60 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="font-mono text-xs text-[var(--ink-faint)]">/proyectos/agua-primavera.tsx</span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm border border-[var(--line)] text-[var(--ink-faint)] shrink-0">
                  Local
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium mb-2">Agua Primavera</h3>
              <p className="text-[var(--ink-soft)] leading-relaxed mb-4 max-w-2xl">
                Sistema de escritorio a medida para gestión empresarial: una aplicación web moderna empaquetada como ejecutable nativo multiplataforma.
              </p>
              <div className="flex flex-wrap gap-2 tag text-xs">
                {['Next.js', 'SQLite', 'Electron'].map((t) => (
                  <span key={t} className="px-2 py-1 border border-[var(--line)] text-[var(--ink-soft)] rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Proyecto 4: Nova Tec */}
            <div className="rounded-md border border-[var(--line)] bg-white/60 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="font-mono text-xs text-[var(--ink-faint)]">/proyectos/nova-tec.tsx</span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm border border-[var(--line)] text-[var(--ink-faint)] shrink-0">
                  Local
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium mb-2">Nova Tec</h3>
              <p className="text-[var(--ink-soft)] leading-relaxed mb-4 max-w-2xl">
                Sistema de gestión integral para un taller de servicio técnico de equipos de cómputo y telefonía, con panel administrativo para órdenes, seguimiento de reparaciones, cotizaciones y métricas de rendimiento.
              </p>
              <div className="flex flex-wrap gap-2 tag text-xs">
                {['Next.js', 'Tailwind CSS', 'SQLite'].map((t) => (
                  <span key={t} className="px-2 py-1 border border-[var(--line)] text-[var(--ink-soft)] rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Proyecto 5: SoftLog */}
            <div className="rounded-md border border-[var(--line)] bg-white/60 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="font-mono text-xs text-[var(--ink-faint)]">/proyectos/softlog.tsx</span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm border border-[var(--line)] text-[var(--ink-faint)] shrink-0">
                  Local
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium mb-2">SoftLog</h3>
              <p className="text-[var(--ink-soft)] leading-relaxed mb-4 max-w-2xl">
                Sistema de inventario de hardware para el Departamento de TI. TypeScript impone reglas estrictas sobre los datos —como obligar a llenar correctamente campos de RAM o procesador— evitando errores al registrar los equipos, mientras SQLite almacena todo el catálogo de computadoras en un archivo local y ligero, sin necesidad de un servidor externo.
              </p>
              <div className="flex flex-wrap gap-2 tag text-xs">
                {['Next.js', 'TypeScript', 'SQLite'].map((t) => (
                  <span key={t} className="px-2 py-1 border border-[var(--line)] text-[var(--ink-soft)] rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCIA ── */}
        <section>
          <div className="flex items-baseline gap-3 mb-6">
            <Gutter n={3} />
            <h2 className="font-display text-2xl md:text-3xl font-medium">Experiencia</h2>
          </div>
          <div className="ml-11 rounded-md border border-[var(--line)] bg-[var(--panel)] p-6 md:p-8 font-mono text-[13px] md:text-sm leading-relaxed text-white/80">
            <p className="text-[#E3B341]">commit 8f3a1c2 — servicio social</p>
            <p className="mt-1 text-white/60">Author: Gobierno Municipal de Ocozocoautla</p>
            <p className="text-white/60">Date:&nbsp;&nbsp;&nbsp;Ene 2026 — Jul 2026</p>
            <p className="mt-4 pl-4 border-l border-white/10 text-white/80">
              Desarrollo de soluciones técnicas y optimización de procesos internos para el
              Departamento de TI durante 480 horas de servicio social, aplicando ingeniería
              de software en un entorno gubernamental real.
            </p>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--line)]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-sm">
          <p className="text-[var(--ink-faint)]">© {new Date().getFullYear()} Ernesto Corzo</p>
          <div className="flex items-center gap-6">
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[var(--ink-soft)] hover:text-[var(--jade)] transition-colors">
              <Github size={16} /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}