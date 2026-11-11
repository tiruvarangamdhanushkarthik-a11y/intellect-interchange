import React, { useState } from 'react';
import { 
  Briefcase, 
  Radio, 
  Play, 
  ExternalLink, 
  Disc, 
  Smartphone, 
  BookOpen, 
  User, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { YouTubeIcon } from '../youtube/YouTubeSection';
import { DigitalDrainCalculator } from '../student-reality/DigitalDrainCalculator';
import { ambientAudio } from '../../audio/ambientSynth';

export const StudioPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'podcast' | 'broadcast' | 'research'>('all');
  const [showDrainCalculator, setShowDrainCalculator] = useState<boolean>(false);

  const YOUTUBE_URL = "https://www.youtube.com/results?search_query=INTELLECT_INTERCHANGE.CO.";

  const handleOpenYouTube = () => {
    ambientAudio.playHarmonicChime(750, 'sine', 0.1);
    window.open(YOUTUBE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="portfolio" className="relative py-32 px-4 sm:px-6 z-20 bg-slate-950/90 border-t border-white/[0.06]">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-slate-800/[0.05] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono uppercase tracking-[0.2em] text-slate-300">
            <Briefcase className="w-3.5 h-3.5 text-sky-400" />
            <span>STUDIO PRODUCTIONS & PORTFOLIO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            DIGITAL EXPERIENCE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-sky-200">
              PORTFOLIO
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Explore our curated body of work spanning studio audio, YouTube documentaries, 
            interactive cognitive calculators, and intellectual publications.
          </p>
        </div>

        {/* Minimal Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {[
            { id: 'all', label: 'ALL PRODUCTIONS' },
            { id: 'podcast', label: 'PODCAST' },
            { id: 'broadcast', label: 'YOUTUBE' },
            { id: 'research', label: 'INTERACTIVE RESEARCH' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                ambientAudio.playHarmonicChime(500, 'sine', 0.04);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-slate-950 font-bold shadow-sm'
                  : 'glass-pill text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Intellect Interchange Podcast */}
          {(activeTab === 'all' || activeTab === 'podcast') && (
            <div className="glass-studio p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all duration-300 group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                    <Radio className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-400/30 text-sky-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      IN STUDIO PRODUCTION
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <User className="w-3 h-3 text-sky-400" />
                    <span>HOST: T. DHANUSH KARTHIK</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display uppercase tracking-tight">
                    Intellect Interchange Podcast
                  </h3>
                  <p className="text-xs sm:text-sm font-serif italic text-slate-400">
                    “Conversations beyond the classroom.”
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Deep unscripted dialogues with engineering innovators, civil services aspirants, 
                  philosophers, and students deconstructing credentialism, attention sovereignty, and emerging technology.
                </p>

                {/* Binaural Frequency Visualizer preview banner */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Disc className="w-4 h-4 text-sky-400 animate-spin" />
                    <span className="text-slate-200">BINAURAL AUDIO STUDIO ENGINE</span>
                  </div>
                  <span className="text-[10px] text-sky-300 font-bold uppercase">COMING SOON</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">PRODUCTION 01 • AUDIO DISPATCH</span>
                <span className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 bg-white/5 border border-white/10">
                  LAUNCHING EPISODE 01
                </span>
              </div>
            </div>
          )}

          {/* Card 2: YouTube Broadcast Media */}
          {(activeTab === 'all' || activeTab === 'broadcast') && (
            <div className="glass-studio p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all duration-300 group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                    <YouTubeIcon className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/50 border border-rose-500/30 text-rose-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    OFFICIAL BROADCAST
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-slate-400">CHANNEL: INTELLECT_INTERCHANGE.CO.</span>
                  <h3 className="text-2xl font-bold text-white font-display uppercase tracking-tight">
                    Visual Essays & Documentaries
                  </h3>
                  <p className="text-xs sm:text-sm font-serif italic text-slate-400">
                    “Cinema of inquiry and technological deconstruction.”
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Our official video channel broadcasting deep-dive video essays, student roundtables, 
                  systemic breakdowns of modern education, and technological forecasts.
                </p>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-rose-400" />
                    <span className="text-slate-200">YOUTUBE VIDEO HUB</span>
                  </div>
                  <span className="text-[10px] text-slate-400">4K STEREO DISPATCHES</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">PRODUCTION 02 • VIDEO BROADCAST</span>
                <button
                  onClick={handleOpenYouTube}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-sm"
                >
                  <span>WATCH ON YOUTUBE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Card 3: Digital Drain Interactive Study */}
          {(activeTab === 'all' || activeTab === 'research') && (
            <div className="glass-studio p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all duration-300 group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    INTERACTIVE RESEARCH
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-slate-400">STUDENT REALITY LAB</span>
                  <h3 className="text-2xl font-bold text-white font-display uppercase tracking-tight">
                    Digital Drain & Attention Siphon
                  </h3>
                  <p className="text-xs sm:text-sm font-serif italic text-slate-400">
                    “Measuring the cognitive cost of algorithmic distraction.”
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  An empirical examination of how endless doom-scrolling, push notifications, and credentialist anxiety 
                  atrophy student creativity, deep reading capacity, and long-term ambition.
                </p>

                {showDrainCalculator && (
                  <div className="pt-2">
                    <DigitalDrainCalculator />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">PRODUCTION 03 • COGNITIVE STUDY</span>
                <button
                  onClick={() => setShowDrainCalculator(!showDrainCalculator)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span>{showDrainCalculator ? 'HIDE CALCULATOR' : 'OPEN INTERACTIVE CALCULATOR'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Card 4: Epistemic Whitepapers */}
          {(activeTab === 'all' || activeTab === 'research') && (
            <div className="glass-studio p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all duration-300 group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    EPISTEMIC PAPERS
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-slate-400">RESEARCH DISPATCH</span>
                  <h3 className="text-2xl font-bold text-white font-display uppercase tracking-tight">
                    Cognitive Depth in the Age of AI
                  </h3>
                  <p className="text-xs sm:text-sm font-serif italic text-slate-400">
                    “Preserving human friction in thought when answers are instant.”
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  A foundational manifesto exploring how synthetic cognition challenges human educational institutions, 
                  why first-principles learning matters more than ever, and how to stay autodidactically sovereign.
                </p>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-200">INTERCHANGE ESSAY SERIES</span>
                  </div>
                  <span className="text-[10px] text-emerald-300">OPEN ACCESS</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">PRODUCTION 04 • RESEARCH ESSAY</span>
                <span className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 bg-white/5 border border-white/10">
                  CURATED BY INTELLECT COLLECTIVE
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
