import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Eye, FastForward } from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';

interface EntrySequenceProps {
  onEnterApp: () => void;
  onExploreIdeas: () => void;
}

export const EntrySequence: React.FC<EntrySequenceProps> = ({
  onEnterApp,
  onExploreIdeas,
}) => {
  const [stage, setStage] = useState<number>(0);
  const [hasSkipped, setHasSkipped] = useState<boolean>(false);

  useEffect(() => {
    if (hasSkipped) {
      setStage(5);
      return;
    }

    const t1 = setTimeout(() => {
      setStage(1);
      ambientAudio.playHarmonicChime(220, 'sine', 0.04);
    }, 600);

    const t2 = setTimeout(() => {
      setStage(2);
      ambientAudio.playHarmonicChime(330, 'sine', 0.05);
    }, 1800);

    const t3 = setTimeout(() => {
      setStage(3);
      ambientAudio.playHarmonicChime(440, 'sine', 0.06);
    }, 3200);

    const t4 = setTimeout(() => {
      setStage(4);
      ambientAudio.playHarmonicChime(550, 'sine', 0.08);
    }, 4600);

    const t5 = setTimeout(() => {
      setStage(5);
      ambientAudio.playHarmonicChime(660, 'sine', 0.1);
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [hasSkipped]);

  const handleSkip = () => {
    setHasSkipped(true);
    setStage(5);
    ambientAudio.playHarmonicChime(528, 'sine', 0.08);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-16 z-20 pointer-events-none">
      {/* Skip Button */}
      {stage < 5 && (
        <button
          onClick={handleSkip}
          className="pointer-events-auto absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-[11px] font-mono uppercase text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all backdrop-blur-sm"
        >
          <FastForward className="w-3 h-3" />
          Skip Intro
        </button>
      )}

      {/* Main Container */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Step 1: Subtle Cosmic Initiation */}
        <div
          className={`transition-all duration-1000 transform ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            HUMAN THINKING CORE ACTIVE
          </div>
        </div>

        {/* Step 2 & 3: Brand Reveal */}
        <div
          className={`transition-all duration-1000 delay-200 transform ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-slate-400 font-semibold mb-2">
            INTELLECT INTERCHANGE.CO
          </h2>
        </div>

        {/* Step 4 & 5: Central Manifesto Title */}
        <div
          className={`transition-all duration-1000 transform ${
            stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-tight">
            THINK BEYOND <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
              THE SYLLABUS.
            </span>
          </h1>
        </div>

        {/* Step 5: Subheadline & CTAs */}
        <div
          className={`space-y-8 transition-all duration-1000 delay-300 transform ${
            stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            A student-driven space for questioning ideas, exploring perspectives, 
            and thinking deeper in an age of automated certainty.
          </p>

          {/* Interactive CTAs */}
          <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                ambientAudio.playHarmonicChime(528, 'sine', 0.1);
                onEnterApp();
              }}
              className="btn-interchange w-full sm:w-auto px-8 py-3.5 text-sm group"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>ENTER THE INTERCHANGE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                ambientAudio.playHarmonicChime(440, 'sine', 0.08);
                onExploreIdeas();
              }}
              className="btn-secondary w-full sm:w-auto px-8 py-3.5 text-sm group"
            >
              <Eye className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              <span>EXPLORE IDEAS LAB</span>
            </button>
          </div>

          {/* Micro Instruction */}
          <div className="pt-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500">
              MOVE • EXPLORE • QUESTION
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
