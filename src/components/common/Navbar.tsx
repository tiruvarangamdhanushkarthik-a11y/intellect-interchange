import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Layers, 
  Zap,
  Users,
  Radio,
  Sparkles,
  Compass,
  Briefcase,
  Bot,
  ExternalLink
} from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';
import { OFFICIAL_WHATSAPP_COMMUNITY_URL } from '../../data/communitiesData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isLowPowerMode: boolean;
  onToggleLowPower: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  isLowPowerMode,
  onToggleLowPower,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(ambientAudio.getIsMuted());

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = ambientAudio.toggleAudio();
    setIsMuted(!active);
  };

  const navItems = [
    { id: 'hero', label: 'STUDIO', icon: Sparkles },
    { id: 'about', label: 'PHILOSOPHY', icon: Compass },
    { id: 'portfolio', label: 'PORTFOLIO', icon: Briefcase },
    { id: 'ai-showcase', label: 'AI PRODUCTS', icon: Bot },
    { id: 'communities', label: 'INNOVATION', icon: Users },
    { id: 'contact', label: 'CONTACT', icon: Radio },
  ];

  const handleJoinCommunity = () => {
    ambientAudio.playHarmonicChime(700, 'sine', 0.08);
    window.open(OFFICIAL_WHATSAPP_COMMUNITY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-4 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto rounded-full pointer-events-auto transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between ${
          scrolled
            ? 'glass-studio bg-slate-950/85 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            : 'bg-slate-950/40 backdrop-blur-md border border-white/[0.06]'
        }`}
      >
        {/* Brand Logo & Name */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 text-left group"
          aria-label="Intellect Interchange Home"
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center group-hover:border-sky-400 transition-colors shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-white group-hover:text-sky-300 transition-colors">
                INTELLECT INTERCHANGE
              </span>
              <span className="px-1.5 py-0.2 rounded bg-sky-950/80 border border-sky-400/30 text-[9px] font-mono text-sky-300">
                2.0
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 block -mt-0.5">
              DIGITAL EXPERIENCE STUDIO
            </span>
          </div>
        </button>

        {/* Desktop Minimal Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-white/10 border border-white/20 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer Mood Toggle (OFF by default) */}
          <button
            onClick={handleAudioToggle}
            aria-label={isMuted ? 'Unmute ambient soundscape' : 'Mute ambient soundscape'}
            title={isMuted ? 'Enable Ambient Drone (Sound Off)' : 'Disable Ambient Drone (Sound On)'}
            className={`p-2 rounded-full border text-xs transition-all ${
              !isMuted
                ? 'bg-sky-950/70 border-sky-400/50 text-sky-300 shadow-[0_0_14px_rgba(56,189,248,0.25)]'
                : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Performance Tier Toggle */}
          <button
            onClick={onToggleLowPower}
            aria-label="Toggle 3D performance tier"
            title={isLowPowerMode ? '2D Lite Mode Active (Optimized)' : '3D High Mode Active'}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[10px] font-mono transition-all ${
              isLowPowerMode
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isLowPowerMode ? <Zap className="w-3 h-3" /> : <Layers className="w-3 h-3" />}
            <span>{isLowPowerMode ? 'LITE' : '3D'}</span>
          </button>

          {/* WhatsApp Verified Community CTA Button */}
          <button
            onClick={handleJoinCommunity}
            title="Join Official WhatsApp Community"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 text-[11px] font-mono font-bold tracking-wider transition-all shadow-sm hover:scale-[1.02] active:scale-95"
          >
            <Users className="w-3 h-3" />
            <span>COMMUNITY</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-6xl mx-auto rounded-3xl glass-studio bg-slate-950/95 border border-white/10 p-5 space-y-3 pointer-events-auto animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 text-left rounded-xl text-xs font-mono tracking-wider transition-colors flex items-center gap-2 ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-3.5 h-3.5 text-sky-400" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={handleJoinCommunity}
              className="text-xs font-mono text-sky-300 flex items-center gap-1.5 font-bold"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Join WhatsApp Community</span>
            </button>
            <button
              onClick={handleAudioToggle}
              className="text-xs font-mono text-slate-400 flex items-center gap-1.5"
            >
              {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-sky-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{!isMuted ? 'Sound On' : 'Sound Off'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
