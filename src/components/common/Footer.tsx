import React from 'react';
import { ArrowUp, Users, ExternalLink } from 'lucide-react';
import { OFFICIAL_WHATSAPP_COMMUNITY_URL } from '../../data/communitiesData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCommunity = () => {
    window.open(OFFICIAL_WHATSAPP_COMMUNITY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#08090C] relative z-20 pt-16 pb-12 text-[#A8ADB7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand & Mission Statement */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#11151C] border border-white/20 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F28A45]" />
              </div>
              <span className="text-xs font-mono tracking-[0.25em] font-bold text-[#F5F5F5] uppercase">
                INTELLECT INTERCHANGE
              </span>
            </div>

            <p className="text-xs text-[#A8ADB7] font-light leading-relaxed">
              An independent intellectual ecosystem exploring ideas, technology, autonomous systems and student realities beyond conventional boundaries.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-mono">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('founder')}
              className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Founder
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => onNavigate('connect')}
              className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Connect
            </button>
            <button
              onClick={handleOpenCommunity}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full norxy-glass border border-white/10 hover:border-white/20 text-[#F5F5F5] transition-all cursor-pointer"
            >
              <Users className="w-3 h-3 text-[#F28A45]" />
              <span>WhatsApp Hub</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full norxy-glass border border-white/10 hover:border-white/30 text-[#A8ADB7] hover:text-[#F5F5F5] transition-all ml-auto md:ml-0 cursor-pointer"
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#A8ADB7]/80">
          <div>
            © 2026 INTELLECT INTERCHANGE.CO. • ALL RIGHTS RESERVED • FOUNDED BY <span className="text-[#F5F5F5] font-medium">T. DHANUSH KARTHIK</span>
          </div>
          <div className="text-[#F28A45] tracking-widest uppercase">
            THINK BEYOND THE SYLLABUS.
          </div>
        </div>
      </div>
    </footer>
  );
};
