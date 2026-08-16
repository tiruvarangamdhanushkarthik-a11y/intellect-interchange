import React, { useState } from 'react';
import { Sparkles, Compass, ShieldAlert, Brain, Lightbulb, CheckCircle2 } from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';

interface Pillar {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  quote: string;
  breakdown: string;
  contrast: {
    conventional: string;
    interchange: string;
  };
  icon: React.ElementType;
}

const PILLARS: Pillar[] = [
  {
    id: 'learn',
    step: '01',
    title: 'LEARN',
    subtitle: 'Beyond the Syllabus Boundary',
    quote: '“True learning begins where the examination rubric ends.”',
    breakdown: 'Acquiring facts is merely the ingestion of raw material. Genuine autodidactism is the pursuit of knowledge driven by intrinsic fascination rather than external grading penalties.',
    contrast: {
      conventional: 'Memorize what is tested on the midterm to maximize GPA.',
      interchange: 'Explore first principles to understand how reality actually operates.'
    },
    icon: Lightbulb
  },
  {
    id: 'question',
    step: '02',
    title: 'QUESTION',
    subtitle: 'Interrogating the Axioms',
    quote: '“The answers you accept without struggle become the bars of your mental prison.”',
    breakdown: 'Every human institution is built upon unspoken assumptions. To question is not to be contrarian; it is the rigorous search for the foundations beneath cultural certainty.',
    contrast: {
      conventional: 'Accept textbook definitions as self-evident truths.',
      interchange: 'Deconstruct who formulated the definition and what incentives they had.'
    },
    icon: Compass
  },
  {
    id: 'challenge',
    step: '03',
    title: 'CHALLENGE',
    subtitle: 'Dismantling Dogma',
    quote: '“Consensus is often just shared exhaustion from thinking.”',
    breakdown: 'Dissent requires psychological courage. When an entire classroom or society nods in agreement, the critical thinker pauses to investigate what is being ignored or silenced.',
    contrast: {
      conventional: 'Conform to peer opinions to maintain social safety and approval.',
      interchange: 'Subject consensus to ruthless counter-factual stress testing.'
    },
    icon: ShieldAlert
  },
  {
    id: 'think',
    step: '04',
    title: 'THINK',
    subtitle: 'First-Principles Synthesis',
    quote: '“Thinking is the hardest work there is, which is why so few engage in it.”',
    breakdown: 'Thinking is not the passive stream of chatter in the brain; it is the deliberate, disciplined simulation of multiple hypotheses, trade-offs, and second-order consequences.',
    contrast: {
      conventional: 'Outsource complex dilemmas to algorithms or authority figures.',
      interchange: 'Engage in rigorous cognitive wrestling until clarity is earned.'
    },
    icon: Brain
  },
  {
    id: 'understand',
    step: '05',
    title: 'UNDERSTAND',
    subtitle: 'Synthesizing Truth',
    quote: '“To understand is to perceive the interconnected web of all things.”',
    breakdown: 'Understanding is holistic. It connects physics with poetry, economics with human psychology, and historical trauma with modern technological architecture.',
    contrast: {
      conventional: 'Store fragmented subjects in isolated mental folders.',
      interchange: 'Integrate knowledge into an autonomous, sovereign worldview.'
    },
    icon: Sparkles
  }
];

export const PhilosophySection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string>('learn');

  const selected = PILLARS.find((p) => p.id === activePillar) || PILLARS[0];
  const Icon = selected.icon;

  return (
    <section id="philosophy" className="relative py-28 px-4 sm:px-6 z-20 overflow-hidden bg-slate-950/60">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Kinetic Header Transition */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono uppercase tracking-widest text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            CORE PHILOSOPHY
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-400 font-light font-display">
              Education gives us answers.
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
              Thinking teaches us{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-violet-300">
                what to question.
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            The transition from passive consumer of information to sovereign intellectual architect 
            unfolds across five non-negotiable stages.
          </p>
        </div>

        {/* The 5 Pillars Kinetic Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          {PILLARS.map((pillar) => {
            const isActive = activePillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => {
                  setActivePillar(pillar.id);
                  ambientAudio.playHarmonicChime(500, 'sine', 0.05);
                }}
                className={`py-4 px-3 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center transition-all duration-300 relative ${
                  isActive
                    ? 'bg-slate-800 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.15)] border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span className="text-[10px] font-mono text-slate-500">{pillar.step}</span>
                <span className="text-xs sm:text-sm font-bold tracking-wider font-mono">
                  {pillar.title}
                </span>
                {isActive && (
                  <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-cyan-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep Dimensional Display Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-slate-800/90 relative overflow-hidden transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Col: Step info & quote */}
            <div className="md:col-span-5 space-y-5 border-b md:border-b-0 md:border-r border-slate-800/80 pb-6 md:pb-0 md:pr-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
                    STAGE {selected.step} OF 05
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {selected.title}
                  </h3>
                </div>
              </div>

              <span className="text-sm font-mono text-violet-300 block font-medium">
                {selected.subtitle}
              </span>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/90">
                <p className="text-sm italic font-serif text-slate-200 leading-relaxed">
                  {selected.quote}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {selected.breakdown}
              </p>
            </div>

            {/* Right Col: Conventional vs Interchange Paradigm Shift */}
            <div className="md:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-2">
                Paradigm Transformation
              </span>

              {/* Conventional approach */}
              <div className="p-4 sm:p-5 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>The Syllabus / Compliance Paradigm</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-light">
                  {selected.contrast.conventional}
                </p>
              </div>

              {/* Interchange approach */}
              <div className="p-4 sm:p-5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5 shadow-[0_0_25px_rgba(0,240,255,0.08)]">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>The Intellect Interchange Way</span>
                </div>
                <p className="text-xs sm:text-sm text-cyan-100 font-light">
                  {selected.contrast.interchange}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
