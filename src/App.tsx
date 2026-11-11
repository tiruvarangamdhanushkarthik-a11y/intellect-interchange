import React, { useState, useEffect } from 'react';
import { UniverseCanvas } from './components/3d/UniverseCanvas';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { EntrySequence } from './components/hero/EntrySequence';
import { AboutSection } from './components/about/AboutSection';
import { StudioPortfolio } from './components/portfolio/StudioPortfolio';
import { AIProductsShowcase } from './components/ai-products/AIProductsShowcase';
import { CommunityEcosystem } from './components/communities/CommunityEcosystem';
import { StudioEnquirySection } from './components/connect/StudioEnquirySection';
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

  // Track active scroll section for Navbar capsule highlighting
  useEffect(() => {
    const sections = [
      'hero',
      'about',
      'portfolio',
      'ai-showcase',
      'communities',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
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
    <div className="relative min-h-screen bg-[#030508] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Floating Glass Studio Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isLowPowerMode={isLowPowerMode}
        onToggleLowPower={handleToggleLowPower}
      />

      {/* Floating Spatial Core Interaction Notification */}
      {showCoreToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full glass-studio border border-sky-400/50 bg-slate-950/90 text-sky-200 text-xs font-mono tracking-wider shadow-[0_8px_32px_rgba(56,189,248,0.25)] animate-in slide-in-from-top duration-300 flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-sky-400 animate-spin" />
          <span className="font-bold">THE INTELLECT CORE • NAVIGATING TO COMMUNITIES</span>
        </div>
      )}

      {/* 1. CINEMATIC HERO & SIGNATURE 3D INTELLECT CORE */}
      <section id="hero" className="relative w-full h-screen min-h-[720px] flex items-center justify-center overflow-hidden">
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
            onExploreStudio={() => handleNavigate('portfolio')}
            onJoinCommunity={() => handleNavigate('contact')}
          />
        </div>

        {/* Minimal Scroll Down Cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => handleNavigate('about')}
            className="text-slate-500 hover:text-white transition-colors flex flex-col items-center gap-1 group"
            aria-label="Scroll to Philosophy"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-slate-300">
              DISCOVER STUDIO
            </span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-slate-400 group-hover:text-white" />
          </button>
        </div>
      </section>

      {/* 2. BRAND PHILOSOPHY & EDITORIAL MANIFESTO */}
      <AboutSection />

      {/* 3. DIGITAL EXPERIENCE PORTFOLIO (Podcast, YouTube, Cognitive Study, Whitepapers) */}
      <StudioPortfolio />

      {/* 4. AI PRODUCTS SHOWCASE (Operational Socratic Engine + Experimental Cognitive Simulator) */}
      <AIProductsShowcase />

      {/* 5. INNOVATION & COMMUNITY ECOSYSTEM (5 Interactive Communities) */}
      <CommunityEcosystem
        activeCommunityId={activeCommunityId}
        onSelectCommunity={handleSelectCommunity}
      />

      {/* 6. STUDIO CONNECT & ENQUIRY DESK (WhatsApp Community + Collaboration Briefs) */}
      <StudioEnquirySection />

      {/* 7. ARCHITECTURAL MINIMAL STUDIO FOOTER */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
