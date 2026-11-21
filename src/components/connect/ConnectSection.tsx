import React from 'react';
import { 
  Users, 
  ExternalLink, 
  MessageSquare, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';
import { OFFICIAL_WHATSAPP_COMMUNITY_URL } from '../../data/communitiesData';

// Pixel-perfect official brand SVG components
const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const ConnectSection: React.FC = () => {
  const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/results?search_query=INTELLECT_INTERCHANGE.CO.';
  const INSTAGRAM_PROFILE_URL = 'https://instagram.com/intellect_interchange.co';

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="connect"
      className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F28A45]" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#F28A45] uppercase">
              COMMUNITY & SOCIAL NETWORKS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-[#F5F5F5]">
            CONNECT.
          </h2>
        </div>

        <span className="text-xs font-mono text-[#A8ADB7] tracking-wider">
          ENGAGE WITH THE ECOSYSTEM • CONVERSATIONS THAT CHALLENGE
        </span>
      </div>

      {/* Hero WhatsApp Community Card */}
      <div className="norxy-glass-panel rounded-3xl p-8 sm:p-12 mb-8 relative overflow-hidden border border-white/15">
        {/* Subtle dual-tone background radial illumination */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F28A45]/15 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#31B9E8]/10 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full norxy-glass border border-[#F28A45]/30 bg-[#F28A45]/10">
            <Users className="w-3.5 h-3.5 text-[#F28A45]" />
            <span className="text-[10px] font-mono tracking-widest text-[#F28A45] uppercase font-bold">
              OFFICIAL HUB
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F5F5F5] font-display">
            JOIN OUR WHATSAPP COMMUNITY
          </h3>

          <p className="text-sm sm:text-base text-[#A8ADB7] font-light leading-relaxed max-w-2xl">
            Join the Intellect Interchange community and stay connected with our conversations, updates and upcoming podcast announcements.
          </p>

          <div className="pt-2">
            <button
              onClick={() => handleOpenLink(OFFICIAL_WHATSAPP_COMMUNITY_URL)}
              className="btn-norxy-primary text-xs sm:text-sm px-7 py-3 flex items-center gap-2.5 group cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#08090C]" />
              <span>JOIN THE COMMUNITY</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Social Channels: YouTube & Instagram Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* YouTube Card */}
        <div
          onClick={() => handleOpenLink(YOUTUBE_CHANNEL_URL)}
          className="norxy-glass p-7 sm:p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer relative overflow-hidden"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <YouTubeIcon className="w-6 h-6 text-red-500" />
            </div>

            <div className="p-2 rounded-full norxy-glass text-[#A8ADB7] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono tracking-widest text-[#A8ADB7] uppercase">
              VIDEO BROADCASTS & PODCASTS
            </span>
            <h4 className="text-xl font-bold tracking-tight text-[#F5F5F5] font-display">
              INTELLECT_INTERCHANGE.CO.
            </h4>
            <p className="text-xs text-[#A8ADB7] font-light leading-relaxed pt-1">
              Deep-dive video dialogues, technology breakdowns, and long-form podcasts dissecting student realities and future engineering.
            </p>
          </div>
        </div>

        {/* Instagram Card */}
        <div
          onClick={() => handleOpenLink(INSTAGRAM_PROFILE_URL)}
          className="norxy-glass p-7 sm:p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer relative overflow-hidden"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <InstagramIcon className="w-6 h-6 text-pink-400" />
            </div>

            <div className="p-2 rounded-full norxy-glass text-[#A8ADB7] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono tracking-widest text-[#A8ADB7] uppercase">
              COMMUNITY DISPATCHES
            </span>
            <h4 className="text-xl font-bold tracking-tight text-[#F5F5F5] font-display">
              @intellect_interchange.co
            </h4>
            <p className="text-xs text-[#A8ADB7] font-light leading-relaxed pt-1">
              Short-form mental models, quote archives, backstage build clips, and community question prompts.
            </p>
          </div>
        </div>
      </div>

      {/* Direct Collaboration Inquiry Banner */}
      <div className="norxy-glass p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-widest text-[#31B9E8] uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COLLABORATION & RESEARCH INQUIRIES</span>
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[#F5F5F5]">
            Interested in building systems together?
          </h4>
          <p className="text-xs text-[#A8ADB7] font-light">
            We collaborate with student researchers, software developers, and independent creators worldwide.
          </p>
        </div>

        <button
          onClick={() => handleOpenLink(OFFICIAL_WHATSAPP_COMMUNITY_URL)}
          className="btn-norxy-secondary text-xs px-5 py-2.5 flex items-center gap-2 cursor-pointer self-stretch sm:self-auto"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#F28A45]" />
          <span>Message the Studio</span>
        </button>
      </div>
    </section>
  );
};
