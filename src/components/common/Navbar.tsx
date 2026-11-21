import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  ExternalLink 
} from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';
import { OFFICIAL_WHATSAPP_COMMUNITY_URL } from '../../data/communitiesData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(ambientAudio.getIsMuted());

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = ambientAudio.toggleAudio();
    setIsMuted(!active);
  };

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'founder', label: 'FOUNDER' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'connect', label: 'CONNECT' },
  ];

  const handleJoinCommunity = () => {
    window.open(OFFICIAL_WHATSAPP_COMMUNITY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-4 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto rounded-full pointer-events-auto transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between ${
          scrolled
            ? 'norxy-glass-panel border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.8)]'
            : 'norxy-glass border-white/10'
        }`}
      >
        {/* Brand Logo & Name */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
          aria-label="Intellect Interchange Home"
        >
          <div className="w-7 h-7 rounded-full bg-[#11151C] border border-white/20 flex items-center justify-center group-hover:border-[#F28A45] transition-colors relative overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-[#F28A45] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-[#F5F5F5] group-hover:text-white transition-colors">
                INTELLECT INTERCHANGE
              </span>
              <span className="px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-[8px] font-mono text-[#31B9E8]">
                2.0
              </span>
            </div>
            <span className="text-[8px] font-mono tracking-widest text-[#A8ADB7] block -mt-0.5">
              THINK BEYOND THE SYLLABUS
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/15 text-[#F5F5F5] font-semibold border border-white/20 shadow-sm'
                    : 'text-[#A8ADB7] hover:text-[#F5F5F5] hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Audio toggle & WhatsApp CTA */}
        <div className="flex items-center gap-2.5">
          {/* Subtle Ambient Audio Toggle (OFF by default) */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              !isMuted
                ? 'bg-[#F28A45]/20 border-[#F28A45]/40 text-[#F28A45]'
                : 'bg-white/5 border-white/10 text-[#A8ADB7] hover:text-[#F5F5F5]'
            }`}
            title={isMuted ? 'Enable subtle ambient resonance' : 'Mute ambient resonance'}
            aria-label={isMuted ? 'Enable ambient audio' : 'Mute ambient audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
          </button>

          {/* Quick CTA */}
          <button
            onClick={handleJoinCommunity}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5F5F5] text-[#08090C] hover:bg-white text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer shadow-sm hover:shadow-[0_0_16px_rgba(242,138,69,0.25)]"
          >
            <span>JOIN HUB</span>
            <ExternalLink className="w-3 h-3 text-[#08090C]" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-[#A8ADB7] hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-sm mx-auto norxy-glass-panel rounded-2xl p-4 border border-white/15 pointer-events-auto space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-colors ${
                activeSection === item.id
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-[#A8ADB7] hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                handleJoinCommunity();
                setMobileMenuOpen(false);
              }}
              className="w-full btn-norxy-primary text-xs py-2.5 justify-center"
            >
              JOIN WHATSAPP COMMUNITY
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
