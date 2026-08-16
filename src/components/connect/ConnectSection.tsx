import React from 'react';
import { 
  MessageCircle, 
  ExternalLink 
} from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';

export const ConnectSection: React.FC = () => {
  const WHATSAPP_NUMBER = "+91 9177611305";
  const WHATSAPP_RAW = "919177611305";

  const handleOpenWhatsApp = () => {
    ambientAudio.playHarmonicChime(700, 'sine', 0.08);
    const text = encodeURIComponent("Hello Intellect Interchange! I would like to connect.");
    window.open(`https://wa.me/${WHATSAPP_RAW}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="connect" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950/95 border-t border-slate-900 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.15)]">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>DIRECT CONNECT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            CONNECT WITH US
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Have an idea or want to connect with Intellect Interchange?
          </p>
        </div>

        {/* WhatsApp Direct Banner Card */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-emerald-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.08)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                OFFICIAL WHATSAPP
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-wider">
                {WHATSAPP_NUMBER}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md">
                Direct channel for inquiries, conversations, and connecting with the team.
              </p>
            </div>

            <button
              onClick={handleOpenWhatsApp}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 border border-emerald-400/40 shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all hover:scale-[1.02] active:scale-95 shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>CHAT ON WHATSAPP</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
