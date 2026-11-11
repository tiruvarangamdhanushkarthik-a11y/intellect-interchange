import React from 'react';
import { ArrowUp, Users, Info, Briefcase, Bot, ExternalLink } from 'lucide-react';
import { OFFICIAL_WHATSAPP_COMMUNITY_URL } from '../../data/communitiesData';
import { ambientAudio } from '../../audio/ambientSynth';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCommunity = () => {
    ambientAudio.playHarmonicChime(700, 'sine', 0.08);
    window.open(OFFICIAL_WHATSAPP_COMMUNITY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="border-t border-white/[0.06] bg-slate-950/95 relative z-30 pt-20 pb-14 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pb-14 border-b border-white/[0.06]">
          {/* Brand & Studio Mission */}
          <div className="space-y-3.5 max-w-md">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              </div>
              <span className="text-sm font-mono tracking-[0.25em] font-bold text-white uppercase">
                INTELLECT INTERCHANGE 2.0
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
              WE BUILD WHAT COMES NEXT.
            </h3>
            
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              A premium digital experience studio connecting ideas, emerging technology, autonomous systems, 
              and student communities beyond the classroom. Hosted & curated by <span className="text-slate-200 font-medium">T. Dhanush Karthik</span>.
            </p>
          </div>

          {/* Quick Studio Navigation Links */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-mono">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
            >
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>Philosophy</span>
            </button>

            <button
              onClick={() => onNavigate('portfolio')}
              className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
            >
              <Briefcase className="w-3.5 h-3.5 text-sky-400" />
              <span>Portfolio</span>
            </button>

            <button
              onClick={() => onNavigate('ai-showcase')}
              className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
            >
              <Bot className="w-3.5 h-3.5 text-sky-400" />
              <span>AI Products</span>
            </button>

            <button
              onClick={() => onNavigate('communities')}
              className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
            >
              <Users className="w-3.5 h-3.5 text-sky-400" />
              <span>Communities</span>
            </button>

            <button
              onClick={handleOpenCommunity}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-all"
            >
              <Users className="w-3 h-3 text-sky-300" />
              <span>WhatsApp Community</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-slate-900 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-all ml-auto lg:ml-0"
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Studio Signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © 2026 Intellect Interchange.co • All rights reserved.
          </div>
          <div>
            THINK BEYOND THE SYLLABUS.
          </div>
        </div>
      </div>
    </footer>
  );
};
