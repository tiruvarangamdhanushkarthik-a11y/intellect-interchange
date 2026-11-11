import React, { useState } from 'react';
import { 
  Bot, 
  Terminal, 
  FlaskConical,
  Activity
} from 'lucide-react';
import { IntellectEngine } from '../intellect-engine/IntellectEngine';
import { AIHumanitySection } from '../ai-humanity/AIHumanitySection';
import { ambientAudio } from '../../audio/ambientSynth';

export const AIProductsShowcase: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState<'socratic-engine' | 'cognitive-sim'>('socratic-engine');

  return (
    <section id="ai-showcase" className="relative py-32 px-4 sm:px-6 z-20 bg-slate-950 border-t border-white/[0.06]">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono uppercase tracking-[0.2em] text-slate-300">
            <Bot className="w-3.5 h-3.5 text-sky-400" />
            <span>AI PRODUCTS & RESEARCH LAB</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            COGNITIVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-sky-200">
              AI ARCHITECTURES
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            We build and test artificial intelligence tools designed to assist human thinking rather than replace it.
          </p>
        </div>

        {/* Product Tier Switcher (Operational vs Experimental) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {/* Operational Product Tab */}
          <button
            onClick={() => {
              setActiveProduct('socratic-engine');
              ambientAudio.playHarmonicChime(550, 'sine', 0.05);
            }}
            className={`p-4 rounded-2xl text-left border transition-all duration-300 flex items-start gap-3.5 ${
              activeProduct === 'socratic-engine'
                ? 'glass-studio border-sky-400/40 bg-slate-900/90 shadow-md'
                : 'bg-slate-900/30 border-white/[0.06] hover:border-white/20'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-sky-950/60 border border-sky-400/40 flex items-center justify-center text-sky-400 shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white uppercase">
                  SOCRATIC INTELLECT ENGINE
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 uppercase font-bold">
                  <Activity className="w-2.5 h-2.5 animate-pulse" />
                  OPERATIONAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">
                Multi-perspective dialectic decomposition of philosophical questions.
              </p>
            </div>
          </button>

          {/* Experimental Concept Tab */}
          <button
            onClick={() => {
              setActiveProduct('cognitive-sim');
              ambientAudio.playHarmonicChime(660, 'sine', 0.05);
            }}
            className={`p-4 rounded-2xl text-left border transition-all duration-300 flex items-start gap-3.5 ${
              activeProduct === 'cognitive-sim'
                ? 'glass-studio border-sky-400/40 bg-slate-900/90 shadow-md'
                : 'bg-slate-900/30 border-white/[0.06] hover:border-white/20'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-violet-950/60 border border-violet-400/40 flex items-center justify-center text-violet-300 shrink-0">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white uppercase">
                  COGNITIVE SIMULATOR
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-950/80 border border-violet-500/40 text-[9px] font-mono text-violet-300 uppercase font-bold">
                  EXPERIMENTAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">
                Model A (Dependency) vs Model B (Agency) cognitive forecast.
              </p>
            </div>
          </button>
        </div>

        {/* Active Product Interactive Workspace */}
        <div className="rounded-3xl border border-white/10 overflow-hidden bg-slate-950/70">
          {activeProduct === 'socratic-engine' ? (
            <div className="p-4 sm:p-8">
              <IntellectEngine />
            </div>
          ) : (
            <div className="p-4 sm:p-8">
              <AIHumanitySection />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
