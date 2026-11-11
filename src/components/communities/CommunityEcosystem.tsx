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
    <section id="communities" className="relative py-32 px-4 sm:px-6 z-20 bg-slate-950/95 border-t border-white/[0.06] overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-slate-800/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono uppercase tracking-[0.2em] text-slate-300">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span>INNOVATION & COMMUNITY ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            CHOOSE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-sky-200">
              COMMUNITY
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Find the space that matches your intellectual curiosity. Connect with fellow student builders, 
            thinkers, and researchers beyond the syllabus.
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
                className={`glass-studio p-7 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'border-sky-400/60 bg-slate-900/90 shadow-[0_8px_32px_rgba(56,189,248,0.15)] scale-[1.01]'
                    : isHovered
                    ? 'border-white/25 bg-slate-900/70 shadow-lg translate-y-[-2px]'
                    : 'border-white/[0.08] bg-slate-900/40 hover:border-white/20'
                }`}
              >
                {/* Hairline Accent Band */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                  style={{ 
                    backgroundColor: community.color,
                    opacity: isSelected ? 1 : isHovered ? 0.8 : 0.25 
                  }}
                />

                <div className="space-y-5">
                  {/* Top bar: Icon + Status badge */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105"
                      style={{ 
                        backgroundColor: `${community.color}15`, 
                        borderColor: `${community.color}40`,
                        color: community.color,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      {community.status === 'active' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ACTIVE COMMUNITY
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                          IN PRODUCTION
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                      {community.shortTag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight group-hover:text-sky-100 transition-colors">
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

                  {/* Topic Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {community.topics.slice(0, 3).map((topic, i) => (
                      <span 
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-400"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-6 mt-6 border-t border-white/[0.07] flex items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>Orbit #{COMMUNITIES_DATA.indexOf(community) + 1}</span>
                  </div>

                  {community.status === 'active' ? (
                    <button
                      onClick={(e) => handleJoinCommunity(community, e)}
                      className="btn-studio-primary px-4 py-2 text-[11px]"
                    >
                      <span>JOIN COMMUNITY</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10">
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
