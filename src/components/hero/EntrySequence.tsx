import React, { useState, useEffect } from 'react';
import { ArrowRight, FastForward, Users, Sparkles, Terminal } from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';

interface EntrySequenceProps {
  onExploreStudio: () => void;
  onJoinCommunity: () => void;
}

export const EntrySequence: React.FC<EntrySequenceProps> = ({
  onExploreStudio,
  onJoinCommunity,
}) => {
  const [stage, setStage] = useState<number>(0);
  const [hasSkipped, setHasSkipped] = useState<boolean>(false);

  useEffect(() => {
    if (hasSkipped) {
      setStage(4);
      return;
    }

    const t1 = setTimeout(() => {
      setStage(1);
    }, 400);

    const t2 = setTimeout(() => {
      setStage(2);
    }, 1100);

    const t3 = setTimeout(() => {
      setStage(3);
    }, 1900);

    const t4 = setTimeout(() => {
      setStage(4);
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [hasSkipped]);

  const handleSkip = () => {
    setHasSkipped(true);
    setStage(4);
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-16 z-20 pointer-events-none">
      {/* Skip Button */}
      {stage < 4 && (
        <button
          onClick={handleSkip}
          className="pointer-events-auto absolute top-20 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/10 text-[11px] font-mono uppercase text-slate-400 hover:text-white transition-all backdrop-blur-sm"
        >
          <FastForward className="w-3 h-3" />
          Skip Intro
        </button>
      )}

      {/* Main Hero Container */}
      <div className="max-w-4xl mx-auto space-y-7">
        {/* Step 1: Studio Identity & Locked Design Tagline */}
        <div
          className={`transition-all duration-700 transform ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-slate-300 text-xs font-mono uppercase tracking-[0.25em]">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-white font-semibold">WE BUILD WHAT COMES NEXT</span>
          </div>
        </div>

        {/* Step 2: Main Brand Heading */}
        <div
          className={`transition-all duration-700 delay-100 transform ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.08]">
            INTELLECT <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-sky-200">
              INTERCHANGE.CO
            </span>
          </h1>
        </div>

        {/* Step 3: Subheading & Tagline */}
        <div
          className={`transition-all duration-700 delay-150 transform ${
            stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900/60 border border-white/[0.08]">
            <span className="text-xs sm:text-sm font-mono tracking-[0.3em] text-slate-300 uppercase font-medium">
              CONNECT • THINK • CREATE
            </span>
          </div>
        </div>

        {/* Step 4: Editorial Supporting Copy & Obvious CTAs */}
        <div
          className={`space-y-8 transition-all duration-700 delay-200 transform ${
            stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            A premium digital experience studio exploring emerging technology, autonomous systems, 
            cognitive architectures, and student communities beyond the syllabus.
          </p>

          {/* Studio Primary & Secondary CTAs */}
          <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => {
                ambientAudio.playHarmonicChime(528, 'sine', 0.1);
                onExploreStudio();
              }}
              className="btn-studio-primary w-full sm:w-auto px-8 py-3.5 text-xs group"
            >
              <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>EXPLORE STUDIO PORTFOLIO</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                ambientAudio.playHarmonicChime(660, 'sine', 0.08);
                onJoinCommunity();
              }}
              className="btn-studio-secondary w-full sm:w-auto px-8 py-3.5 text-xs group"
            >
              <Users className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
              <span>JOIN COMMUNITY</span>
            </button>
          </div>

          {/* Minimal 3D Interaction Cue */}
          <div className="pt-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500 flex items-center justify-center gap-2">
              <Terminal className="w-3 h-3 text-slate-400" />
              SIGNATURE 3D INTELLECT CORE ONLINE • INTERACT SPATIALLY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
