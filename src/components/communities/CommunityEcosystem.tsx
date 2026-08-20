import React, { useState } from 'react';
import { 
  Cpu, 
  CircuitBoard, 
  Scale, 
  HeartPulse, 
  Radio, 
  ExternalLink, 
  Sparkles, 
  Users, 
  Layers
} from 'lucide-react';
import { COMMUNITIES_DATA, type CommunityItem } from '../../data/communitiesData';
import { ambientAudio } from '../../audio/ambientSynth';

interface CommunityEcosystemProps {
  activeCommunityId: string | null;
  onSelectCommunity: (id: string | null) => void;
}

const ICON_COMPONENTS: Record<string, React.ElementType> = {
  Cpu,
  CircuitBoard,
  Scale,
  HeartPulse,
  Radio,
};

export const CommunityEcosystem: React.FC<CommunityEcosystemProps> = ({
  activeCommunityId,
  onSelectCommunity,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const handleJoinCommunity = (community: CommunityItem, e: React.MouseEvent) => {
    e.stopPropagation();
    ambientAudio.playHarmonicChime(700, 'sine', 0.08);
    if (community.inviteUrl) {
      window.open(community.inviteUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardClick = (community: CommunityItem) => {
    const nextId = activeCommunityId === community.id ? null : community.id;
    onSelectCommunity(nextId);
    ambientAudio.playHarmonicChime(550, 'sine', 0.05);
  };

  return (
    <section id="communities" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950/95 border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[400px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMUNITY ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-display tracking-tight uppercase">
            CHOOSE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-violet-300">
              COMMUNITY
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Find the space that matches your interests. Connect with fellow student builders, thinkers, and innovators.
          </p>
        </div>

        {/* 5 Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COMMUNITIES_DATA.map((community) => {
            const Icon = ICON_COMPONENTS[community.iconName] || Sparkles;
            const isSelected = activeCommunityId === community.id;
            const isHovered = hoveredCardId === community.id;

            return (
              <div
                key={community.id}
                onClick={() => handleCardClick(community)}
                onMouseEnter={() => setHoveredCardId(community.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`glass-panel p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'border-cyan-400 bg-slate-900/90 shadow-[0_0_40px_rgba(0,240,255,0.25)] scale-[1.02]'
                    : isHovered
                    ? 'border-slate-700 bg-slate-900/60 shadow-[0_0_30px_rgba(0,0,0,0.5)] translate-y-[-2px]'
                    : 'border-slate-800/90 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                {/* Glow accent band */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
                  style={{ 
                    backgroundColor: community.color,
                    opacity: isSelected ? 1 : isHovered ? 0.7 : 0.25 
                  }}
                />

                <div className="space-y-5">
                  {/* Top bar: Icon + Status badge */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 shadow-lg"
                      style={{ 
                        backgroundColor: `${community.color}15`, 
                        borderColor: `${community.color}40`,
                        color: community.color,
                        boxShadow: `0 0 20px ${community.color}25`
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      {community.status === 'active' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ACTIVE COMMUNITY
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/70 border border-violet-500/40 text-violet-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                          COMING SOON
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                      {community.shortTag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight group-hover:text-cyan-200 transition-colors">
                      {community.name}
                    </h3>
                    <p className="text-xs font-serif italic text-slate-400">
                      "{community.tagline}"
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {community.description}
                  </p>

                  {/* Topic Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {community.topics.slice(0, 3).map((topic, i) => (
                      <span 
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-slate-950/70 border border-slate-800 text-[10px] font-mono text-slate-400"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>3D Orbit #{COMMUNITIES_DATA.indexOf(community) + 1}</span>
                  </div>

                  {community.status === 'active' ? (
                    <button
                      onClick={(e) => handleJoinCommunity(community, e)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all hover:scale-105 active:scale-95 shrink-0"
                    >
                      <span>JOIN COMMUNITY</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider text-violet-300 bg-violet-950/40 border border-violet-500/30">
                      COMING SOON
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
