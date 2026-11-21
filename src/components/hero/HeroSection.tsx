import React from 'react';
import { Compass, Sparkles, Users, ArrowDown, ExternalLink } from 'lucide-react';
import { OFFICIAL_WHATSAPP_COMMUNITY_URL } from '../../data/communitiesData';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const handleJoinCommunity = () => {
    window.open(OFFICIAL_WHATSAPP_COMMUNITY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none select-none"
    >
      {/* Top Editorial Eyebrow & System Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto z-10 animate-in fade-in duration-700">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#F28A45] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.28em] text-[#A8ADB7] uppercase">
            COGNITIVE ECOSYSTEM • 2026 HORIZON
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[10px] font-mono tracking-widest text-[#A8ADB7]/80">
          <span className="px-2.5 py-1 rounded-full norxy-glass border border-white/5 text-[#F5F5F5]">
            LATENCY &lt; 14ms
          </span>
          <span className="px-2.5 py-1 rounded-full norxy-glass border border-white/5 text-[#31B9E8]">
            DUAL-HEMISPHERE ACTIVE
          </span>
        </div>
      </div>

      {/* Center Hero Typography */}
      <div className="my-auto py-12 z-10 pointer-events-none">
        <div className="max-w-3xl space-y-6">
          <div className="inline-block">
            <span className="px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#F28A45] bg-[#F28A45]/10 border border-[#F28A45]/20 backdrop-blur-md">
              INTELLECT INTERCHANGE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-[#F5F5F5] leading-[1.06]">
            THINK BEYOND <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F5] via-[#F28A45] to-[#31B9E8]">
              THE SYLLABUS.
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#A8ADB7] font-light max-w-xl leading-relaxed">
            An independent intellectual ecosystem exploring ideas, technology, innovation and student realities.
          </p>

          {/* Mobile Direct Action Buttons */}
          <div className="flex sm:hidden items-center gap-3 pt-3 pointer-events-auto">
            <button
              onClick={() => onNavigate('projects')}
              className="btn-norxy-primary text-xs px-4 py-2"
            >
              Our Projects
            </button>
            <button
              onClick={handleJoinCommunity}
              className="btn-norxy-secondary text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <span>Community</span>
              <ExternalLink className="w-3 h-3 text-[#F28A45]" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Translucent Glass Interaction Capsule Controls around the 3D Brain */}
      <div className="pointer-events-auto z-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/[0.06]">
        {/* Floating Interactive Glass Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('founder')}
            className="norxy-glass-pill px-4 sm:px-5 py-2.5 rounded-full flex items-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F28A45] transition-transform group-hover:scale-110" />
            <span className="text-xs font-mono tracking-wider text-[#F5F5F5] group-hover:text-white uppercase font-medium">
              Explore
            </span>
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className="norxy-glass-pill px-4 sm:px-5 py-2.5 rounded-full flex items-center gap-2 group cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#31B9E8] transition-transform group-hover:scale-110" />
            <span className="text-xs font-mono tracking-wider text-[#F5F5F5] group-hover:text-white uppercase font-medium">
              Our Projects
            </span>
          </button>

          <button
            onClick={handleJoinCommunity}
            className="norxy-glass-pill px-4 sm:px-5 py-2.5 rounded-full flex items-center gap-2 group cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-[#F28A45] transition-transform group-hover:scale-110" />
            <span className="text-xs font-mono tracking-wider text-[#F5F5F5] group-hover:text-white uppercase font-medium">
              Join Community
            </span>
            <ExternalLink className="w-3 h-3 text-[#A8ADB7] opacity-60 group-hover:opacity-100" />
          </button>
        </div>

        {/* Minimal Scroll Down Cue */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('founder')}
            className="flex items-center gap-2 text-[#A8ADB7] hover:text-[#F5F5F5] transition-colors group cursor-pointer py-1"
            aria-label="Scroll to Founder Section"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase">
              SCROLL TO DISCOVER
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-[#F28A45] animate-bounce group-hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};
