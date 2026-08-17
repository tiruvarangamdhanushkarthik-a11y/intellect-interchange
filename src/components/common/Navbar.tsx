import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Layers, 
  Zap,
  Users,
  Radio
} from 'lucide-react';
import { YouTubeIcon } from '../youtube/YouTubeSection';
import { ambientAudio } from '../../audio/ambientSynth';

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

  // Official WhatsApp Community Invite URL
  const COMMUNITY_URL = "https://chat.whatsapp.com/CfovYK1W1r72DxPB8dpmia";

  useEffect(() => {
    setIsMuted(ambientAudio.getIsMuted());

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = ambientAudio.toggleAudio();
    setIsMuted(!active);
  };

  const navItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'podcast', label: 'PODCAST — COMING SOON', icon: Radio },
    { id: 'youtube', label: 'YOUTUBE', icon: YouTubeIcon },
    { id: 'community', label: 'COMMUNITY', icon: Users },
  ];

  const handleOpenCommunity = () => {
    ambientAudio.playHarmonicChime(700, 'sine', 0.08);
    onNavigate('community');
  };

  const handleOpenCommunityDirect = () => {
    ambientAudio.playHarmonicChime(700, 'sine', 0.08);
    window.open(COMMUNITY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-7 h-7 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-white block group-hover:text-cyan-300 transition-colors">
              INTELLECT INTERCHANGE
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 block -mt-0.5">
              .CO
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {item.icon && <item.icon className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Community Direct Action */}
          <button
            onClick={handleOpenCommunity}
            title="Join WhatsApp Community"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 text-xs font-mono tracking-wider transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)]"
          >
            <Users className="w-3.5 h-3.5" />
            <span>COMMUNITY</span>
          </button>

          {/* Ambient Audio Synth Toggle */}
          <button
            onClick={handleAudioToggle}
            aria-label={isMuted ? 'Unmute ambient soundscape' : 'Mute ambient soundscape'}
            title={isMuted ? 'Enable Ambient Atmosphere' : 'Mute Atmosphere'}
            className={`p-2 rounded-full border transition-all ${
              !isMuted
                ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Performance 3D/2D Mode Toggle */}
          <button
            onClick={onToggleLowPower}
            aria-label="Toggle 3D performance tier"
            title={isLowPowerMode ? 'Low Graphics Mode Active (Optimized)' : 'High Graphics 3D Active'}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[11px] font-mono transition-all ${
              isLowPowerMode
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isLowPowerMode ? <Zap className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
            <span>{isLowPowerMode ? '2D/LITE' : '3D HIGH'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800/90 backdrop-blur-xl px-4 py-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 text-left rounded-xl text-xs font-mono tracking-wider transition-colors flex items-center gap-2 ${
                  activeSection === item.id
                    ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.icon && <item.icon className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={handleOpenCommunityDirect}
              className="text-xs font-mono text-emerald-400 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Join WhatsApp Community</span>
            </button>
            <button
              onClick={handleAudioToggle}
              className="text-xs font-mono text-slate-400 flex items-center gap-2"
            >
              {!isMuted ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
              <span>{!isMuted ? 'Sound On' : 'Muted'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
