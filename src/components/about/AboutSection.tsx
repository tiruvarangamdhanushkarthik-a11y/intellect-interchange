import React from 'react';
import { Compass, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950/70 border-t border-slate-900">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Main Kinetic Headlines */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-[11px] font-mono uppercase tracking-widest text-cyan-300">
            <Compass className="w-3.5 h-3.5" />
            MANIFESTO & ORIGIN
          </div>

          <div className="space-y-3">
            <p className="text-xl sm:text-2xl md:text-3xl font-display text-slate-400 font-light tracking-wide">
              WE ARE NOT HERE TO GIVE YOU MORE INFORMATION.
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
              WE ARE HERE TO MAKE YOU{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-violet-300 drop-shadow-[0_0_30px_rgba(0,240,255,0.25)]">
                THINK ABOUT
              </span>{' '}
              THE INFORMATION YOU ALREADY HAVE.
            </h2>
          </div>
        </div>

        {/* Mission Statement Box */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.06)]">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 block">
              The Mission Statement
            </span>
            <p className="text-lg sm:text-2xl italic font-serif text-slate-200 leading-relaxed">
              “To create a space where students question systems, examine ideas, 
              challenge assumptions, and develop independent thinking.”
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto" />
            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
              Intellect Interchange was founded on the conviction that human dignity is forged through 
              sovereign critical inquiry. In an era dominated by credentialist anxiety and algorithmic feeds, 
              we construct tools that return cognitive autonomy to youth.
            </p>
          </div>
        </div>

        {/* 3 Core Ethical Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              01. Zero Commercial Dogma
            </h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              No sponsored advertising, no algorithmic behavioral manipulation, and no monetized dopamine loops.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-violet-950/80 border border-violet-500/40 flex items-center justify-center text-violet-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              02. Radical Intellectual Humility
            </h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              We do not claim final truth. We build frameworks to uncover blind spots and encourage multiple perspectives.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              03. Student-Centered Agency
            </h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Every feature is built to protect the student mind from cognitive atrophy and foster lifelong autodidactic courage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
