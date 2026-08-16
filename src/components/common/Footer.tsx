import React from 'react';
import { ArrowUp, MessageCircle, Radio } from 'lucide-react';
import { YouTubeIcon } from '../youtube/YouTubeSection';
import { ambientAudio } from '../../audio/ambientSynth';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const WHATSAPP_NUMBER = "+91 9177611305";
  const WHATSAPP_RAW = "919177611305";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWhatsApp = () => {
    ambientAudio.playHarmonicChime(700, 'sine', 0.08);
    window.open(`https://wa.me/${WHATSAPP_RAW}?text=Hello%20Intellect%20Interchange!%20I%20would%20like%20to%20connect.`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/95 relative z-30 pt-16 pb-12 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-900">
          {/* Brand & Philosophy */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
              <span className="text-sm font-mono tracking-[0.25em] font-bold text-white uppercase">
                INTELLECT INTERCHANGE.CO
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
              THINK BEYOND THE SYLLABUS.
            </h3>
          </div>

          {/* Minimal Quick Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono">
            <button
              onClick={() => onNavigate('youtube')}
              className="hover:text-rose-300 transition-colors flex items-center gap-2 text-slate-300"
            >
              <YouTubeIcon className="w-4 h-4 text-rose-400" />
              <span>YouTube</span>
            </button>

            <button
              onClick={() => onNavigate('podcast')}
              className="hover:text-violet-300 transition-colors flex items-center gap-2 text-slate-300"
            >
              <Radio className="w-4 h-4 text-violet-400" />
              <span>Podcast — Coming Soon</span>
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="hover:text-emerald-300 transition-colors flex items-center gap-2 text-emerald-400 font-bold"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp: {WHATSAPP_NUMBER}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all ml-auto md:ml-0"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
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
