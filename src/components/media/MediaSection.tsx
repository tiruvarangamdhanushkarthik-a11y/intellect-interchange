import React, { useState } from 'react';
import { 
  Radio, 
  BookOpen, 
  Play, 
  Pause, 
  X, 
  ArrowRight,
  Volume2,
  Layers
} from 'lucide-react';
import { YouTubeIcon } from '../youtube/YouTubeSection';
import { MEDIA_RESOURCES } from '../../data/mediaData';
import type { MediaResource } from '../../types';
import { ambientAudio } from '../../audio/ambientSynth';

export const MediaSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'PODCAST' | 'YOUTUBE' | 'ARTICLES_RESEARCH'>('ALL');
  const [selectedMedia, setSelectedMedia] = useState<MediaResource | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const filterMap: Record<string, string[]> = {
    ALL: ['DOCUMENTARIES', 'VIDEOS', 'PODCASTS', 'ARTICLES', 'RESEARCH'],
    PODCAST: ['PODCASTS'],
    YOUTUBE: ['VIDEOS', 'DOCUMENTARIES'],
    ARTICLES_RESEARCH: ['ARTICLES', 'RESEARCH']
  };

  const filteredMedia = MEDIA_RESOURCES.filter((item) =>
    filterMap[activeCategory]?.includes(item.type)
  );

  const handleToggleAudioPreview = () => {
    setIsPlayingAudio(!isPlayingAudio);
    ambientAudio.playHarmonicChime(660, 'sine', 0.08);
  };

  return (
    <section id="media" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950/90 border-t border-slate-900">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-[11px] font-mono uppercase tracking-widest text-cyan-300">
            <Layers className="w-3.5 h-3.5" />
            <span>MULTIMEDIA & RESEARCH DISPATCHES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-display tracking-tight uppercase">
            THE MEDIA HUB
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Explore our three core media channels: audio podcasts, YouTube broadcasts, and investigative whitepapers.
          </p>
        </div>

        {/* 3 Core Media Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          <button
            onClick={() => {
              setActiveCategory('ALL');
              ambientAudio.playHarmonicChime(450, 'sine', 0.04);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
              activeCategory === 'ALL'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Media
          </button>

          <button
            onClick={() => {
              setActiveCategory('PODCAST');
              ambientAudio.playHarmonicChime(500, 'sine', 0.04);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all ${
              activeCategory === 'PODCAST'
                ? 'bg-violet-950/80 text-violet-300 border border-violet-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-violet-400" />
            <span>PODCAST (COMING SOON)</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory('YOUTUBE');
              ambientAudio.playHarmonicChime(550, 'sine', 0.04);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all ${
              activeCategory === 'YOUTUBE'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <YouTubeIcon className="w-3.5 h-3.5 text-rose-400" />
            <span>YOUTUBE (INTELLECT_INTERCHANGE.CO.)</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory('ARTICLES_RESEARCH');
              ambientAudio.playHarmonicChime(600, 'sine', 0.04);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all ${
              activeCategory === 'ARTICLES_RESEARCH'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>ARTICLES & RESEARCH</span>
          </button>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((media) => (
            <div
              key={media.id}
              onClick={() => {
                setSelectedMedia(media);
                ambientAudio.playHarmonicChime(540, 'sine', 0.05);
              }}
              className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-800 flex flex-col justify-between cursor-pointer space-y-4 group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                    {media.type}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {media.durationOrLength}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                  {media.title}
                </h3>

                <span className="text-xs font-mono text-slate-400 block">
                  {media.subtitle}
                </span>

                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {media.abstract}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono text-[11px]">
                  {media.category}
                </span>

                <span className="text-cyan-400 font-mono text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Media</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail View */}
      {selectedMedia && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedMedia(null);
          }}
        >
          <div className="w-full max-w-3xl max-h-[92vh] glass-panel rounded-3xl border border-cyan-500/30 flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                    {selectedMedia.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedMedia.durationOrLength} • {selectedMedia.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {selectedMedia.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMedia(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-xs sm:text-sm">
              {selectedMedia.audioWaveformPreset && (
                <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-cyan-400 flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4" />
                      Audio Discourse Player
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {isPlayingAudio ? '03:42 / 36:00' : '00:00 / 36:00'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 h-12 py-2">
                    {selectedMedia.audioWaveformPreset.map((height, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          isPlayingAudio
                            ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.6)]'
                            : 'bg-slate-700'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={handleToggleAudioPreview}
                      className="btn-interchange text-xs py-2 px-4"
                    >
                      {isPlayingAudio ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause Audio Essay</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Play Audio Essay</span>
                        </>
                      )}
                    </button>
                    <span className="text-[11px] font-mono text-slate-500">
                      Recorded in high-fidelity binaural audio
                    </span>
                  </div>
                </div>
              )}

              <p className="text-base font-serif italic text-cyan-200">
                “{selectedMedia.subtitle}”
              </p>

              <div className="space-y-3 text-slate-300 font-light leading-relaxed">
                {selectedMedia.detailedAnalysis.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {selectedMedia.coreQuestions.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                    Questions For Further Contemplation
                  </span>
                  <ul className="space-y-1.5">
                    {selectedMedia.coreQuestions.map((q, i) => (
                      <li key={i} className="text-xs text-slate-300">
                        • {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                Author / Wing: {selectedMedia.authorOrCreator}
              </span>
              <button
                onClick={() => setSelectedMedia(null)}
                className="btn-secondary text-xs"
              >
                Close Media View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
