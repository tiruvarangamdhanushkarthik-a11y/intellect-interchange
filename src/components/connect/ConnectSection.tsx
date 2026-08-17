import React from 'react';
import { 
  MessageCircle, 
  ExternalLink,
  Users
} from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';

export const ConnectSection: React.FC = () => {
  // Official WhatsApp Community Invite URL
  const COMMUNITY_URL = "https://chat.whatsapp.com/CfovYK1W1r72DxPB8dpmia";

  const handleJoinCommunity = () => {
    ambientAudio.playHarmonicChime(700, 'sine', 0.08);
    window.open(COMMUNITY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="community" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950/95 border-t border-slate-900 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.15)]">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>COMMUNITY INVITATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            JOIN OUR WHATSAPP COMMUNITY
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Join the Intellect Interchange community and stay connected with our conversations, updates and upcoming podcast announcements.
          </p>
        </div>

        {/* WhatsApp Community Banner Card */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-emerald-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.08)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  OFFICIAL COMMUNITY
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Intellect Interchange Circle
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md">
                Direct space for student thinkers, debate dispatches, and intellectual collaboration.
              </p>
            </div>

            <button
              onClick={handleJoinCommunity}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 border border-emerald-400/40 shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all hover:scale-[1.02] active:scale-95 shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>JOIN THE COMMUNITY</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
