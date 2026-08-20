import React, { useState, useEffect } from 'react';
import { UniverseCanvas } from './components/3d/UniverseCanvas';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { EntrySequence } from './components/hero/EntrySequence';
import { CommunityEcosystem } from './components/communities/CommunityEcosystem';
import { ConnectSection } from './components/connect/ConnectSection';
import { PodcastSection } from './components/podcast/PodcastSection';
import { AboutSection } from './components/about/AboutSection';
import { ArrowDown, Sparkles } from 'lucide-react';
import { ambientAudio } from './audio/ambientSynth';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeCommunityId, setActiveCommunityId] = useState<string | null>(null);
  const [showCoreToast, setShowCoreToast] = useState<boolean>(false);
  const [isLowPowerMode, setIsLowPowerMode] = useState<boolean>(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const saved = localStorage.getItem('intellect_low_power');
    return saved !== null ? saved === 'true' : isMobile;
  });

  // Track active scroll section for Navbar
  useEffect(() => {
    const sections = [
      'hero',
      'communities',
      'community',
      'podcast',
      'about',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id === 'community' ? 'communities' : id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleToggleLowPower = () => {
    const next = !isLowPowerMode;
    setIsLowPowerMode(next);
    localStorage.setItem('intellect_low_power', next.toString());
  };

  const handleSelectCommunity = (id: string | null) => {
    setActiveCommunityId(id);
  };

  const handleCoreClick = () => {
    setShowCoreToast(true);
    ambientAudio.playHarmonicChime(880, 'sine', 0.1);
    setTimeout(() => setShowCoreToast(false), 3500);
    handleNavigate('communities');
  };

  return (
    <div className="relative min-h-screen bg-[#030508] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar with navigation links and Community CTA */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isLowPowerMode={isLowPowerMode}
        onToggleLowPower={handleToggleLowPower}
      />

      {/* Floating Core Click Toast */}
      {showCoreToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl glass-panel border border-cyan-400/60 bg-slate-950/90 text-cyan-200 text-xs font-mono tracking-wider shadow-[0_0_35px_rgba(0,240,255,0.4)] animate-in slide-in-from-top duration-300 flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span className="font-bold">THE INTELLECT CORE: EXPLORE YOUR INTERESTS BELOW</span>
        </div>
      )}

      {/* 1. HERO & 3D INTELLECT CORE */}
      <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* 3D WebGL Canvas Layer */}
        <div className="absolute inset-0 z-0">
          <UniverseCanvas
            activeCommunityId={activeCommunityId}
            onSelectCommunity={handleSelectCommunity}
            onCoreClick={handleCoreClick}
            isLowPowerMode={isLowPowerMode}
          />
        </div>

        {/* Hero Overlay & Entry Sequence */}
        <div className="relative z-10 w-full">
          <EntrySequence
            onExploreCommunities={() => handleNavigate('communities')}
            onJoinInterchange={() => handleNavigate('communities')}
          />
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => handleNavigate('communities')}
            className="text-slate-500 hover:text-cyan-300 transition-colors flex flex-col items-center gap-1 group"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-cyan-300">
              EXPLORE COMMUNITIES
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </button>
        </div>
      </section>

      {/* 2. CHOOSE YOUR COMMUNITY: Community Ecosystem */}
      <CommunityEcosystem
        activeCommunityId={activeCommunityId}
        onSelectCommunity={handleSelectCommunity}
      />

      {/* 3. WHATSAPP COMMUNITY CTA */}
      <ConnectSection />

      {/* 4. INTELLECT INTERCHANGE PODCAST (COMING SOON) */}
      <PodcastSection />

      {/* 5. ABOUT SECTION */}
      <AboutSection />

      {/* 6. MINIMAL ARCHITECTURAL FOOTER */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
