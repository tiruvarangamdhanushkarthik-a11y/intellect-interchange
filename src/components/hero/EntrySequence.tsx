import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, FastForward, Users } from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';

interface EntrySequenceProps {
  onExploreCommunities: () => void;
  onJoinInterchange: () => void;
}

export const EntrySequence: React.FC<EntrySequenceProps> = ({
  onExploreCommunities,
  onJoinInterchange,
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
    }, 500);

    const t2 = setTimeout(() => {
      setStage(2);
      ambientAudio.playHarmonicChime(330, 'sine', 0.05);
    }, 1400);

    const t3 = setTimeout(() => {
      setStage(3);
      ambientAudio.playHarmonicChime(440, 'sine', 0.06);
    }, 2400);

    const t4 = setTimeout(() => {
      setStage(4);
      ambientAudio.playHarmonicChime(550, 'sine', 0.08);
    }, 3500);

    const t5 = setTimeout(() => {
      setStage(5);
      ambientAudio.playHarmonicChime(660, 'sine', 0.1);
    }, 4600);

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
        {/* Step 1: Status Badge */}
        <div
          className={`transition-all duration-1000 transform ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>3D INTELLECT CORE ONLINE • 5 ORBITING COMMUNITIES</span>
          </div>
        </div>

        {/* Step 2: Main Brand Heading */}
        <div
          className={`transition-all duration-1000 delay-150 transform ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-tight">
            INTELLECT <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
              INTERCHANGE.CO
            </span>
          </h1>
        </div>

        {/* Step 3: Subheading Tagline */}
        <div
          className={`transition-all duration-1000 delay-250 transform ${
            stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="inline-block px-5 py-1 rounded-full bg-slate-900/60 border border-slate-800">
            <span className="text-xs sm:text-sm md:text-base font-mono tracking-[0.35em] text-cyan-300 uppercase font-bold">
              CONNECT • THINK • CREATE
            </span>
          </div>
        </div>

        {/* Step 4 & 5: Supporting text & Obvious CTAs */}
        <div
          className={`space-y-8 transition-all duration-1000 delay-350 transform ${
            stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            A student-driven ecosystem connecting ideas, technology, communities and conversations beyond the classroom.
          </p>

          {/* Obvious Primary & Secondary CTAs */}
          <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                ambientAudio.playHarmonicChime(528, 'sine', 0.1);
                onExploreCommunities();
              }}
              className="btn-interchange w-full sm:w-auto px-8 py-4 text-sm group shadow-[0_0_30px_rgba(0,240,255,0.25)]"
            >
              <Users className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="font-bold tracking-wider">EXPLORE COMMUNITIES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                ambientAudio.playHarmonicChime(440, 'sine', 0.08);
                onJoinInterchange();
              }}
              className="btn-secondary w-full sm:w-auto px-8 py-4 text-sm group"
            >
              <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 transition-colors" />
              <span className="font-bold tracking-wider">JOIN THE INTERCHANGE</span>
            </button>
          </div>

          {/* 3D Interaction Micro Hint */}
          <div className="pt-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80 animate-ping" />
              INTERACT WITH 3D INTELLECT CORE & ORBITING NODES ABOVE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
