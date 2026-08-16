import React from 'react';
import { 
  Play, 
  ExternalLink 
} from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';

// Custom clean SVG YouTube Icon
export const YouTubeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const YouTubeSection: React.FC = () => {
  // Official channel name exactly as specified
  const CHANNEL_NAME = "INTELLECT_INTERCHANGE.CO.";
  // Configurable channel URL destination (ready for direct URL insertion)
  const YOUTUBE_URL = "https://www.youtube.com/results?search_query=INTELLECT_INTERCHANGE.CO.";

  const handleWatchOnYouTube = () => {
    ambientAudio.playHarmonicChime(750, 'sine', 0.1);
    window.open(YOUTUBE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="youtube" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950 border-t border-slate-900 overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/10 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(244,63,94,0.15)]">
            <YouTubeIcon className="w-3.5 h-3.5 text-rose-400" />
            <span>OFFICIAL BROADCAST CHANNEL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            WATCH US ON YOUTUBE
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Official video destination for Intellect Interchange broadcasts, visual essays, and student dialogues.
          </p>
        </div>

        {/* Featured YouTube Channel Marquee Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-12 border border-rose-500/30 relative overflow-hidden shadow-[0_0_60px_rgba(244,63,94,0.08)] group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Col: Channel Info & Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/50 flex items-center justify-center text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                  <YouTubeIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                    CHANNEL
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-wider">
                    {CHANNEL_NAME}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 font-light leading-relaxed">
                Explore our official visual broadcasts, documentaries, and discussions centered on thinking beyond the syllabus.
              </p>

              {/* YouTube CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={handleWatchOnYouTube}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 border border-rose-400/40 shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all hover:scale-[1.02] active:scale-95"
                >
                  <div className="w-6 h-6 rounded-full bg-white text-rose-600 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <span>WATCH US ON YOUTUBE</span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </button>
              </div>
            </div>

            {/* Right Col: Video Screen Mockup with Playback Overlay */}
            <div className="lg:col-span-5">
              <div 
                onClick={handleWatchOnYouTube}
                className="relative aspect-video rounded-2xl bg-slate-900 border border-slate-700/80 overflow-hidden cursor-pointer group/screen shadow-2xl flex flex-col justify-between p-5"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-rose-950/80 border border-rose-500/50 text-[10px] font-mono text-rose-300 uppercase font-bold">
                    OFFICIAL BROADCAST
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">4K</span>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <div className="w-16 h-16 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.6)] group-hover/screen:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>

                <div className="relative z-10">
                  <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                    {CHANNEL_NAME}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">
                    Watch on Official Channel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
