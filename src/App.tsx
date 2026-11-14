import React, { useState, useEffect } from 'react';
import { BrainCanvas } from './components/3d/BrainCanvas';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { FounderSection } from './components/founder/FounderSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ConnectSection } from './components/connect/ConnectSection';
import { Footer } from './components/common/Footer';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Synchronized scroll listener for 3D brain coordination and navigation highlighting
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? Math.min(Math.max(scrollY / totalHeight, 0), 1) : 0;
          setScrollProgress(progress);

          // Section tracking
          const sections = ['home', 'founder', 'projects', 'connect'];
          const scrollPos = scrollY + window.innerHeight * 0.35;

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
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08090C] text-[#F5F5F5] font-sans selection:bg-[#F28A45]/30 selection:text-white overflow-x-hidden">
      {/* Dual-Tone Ambient Background Lighting Sheens */}
      <div className="fixed inset-0 pointer-events-none z-0 ambient-glow-amber opacity-70" />
      <div className="fixed inset-0 pointer-events-none z-0 ambient-glow-cyan opacity-60" />

      {/* Persistent 3D Interactive Human Brain Layer */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <BrainCanvas
          scrollProgress={scrollProgress}
          onBrainClick={() => handleNavigate('projects')}
        />
      </div>

      {/* Floating Translucent Glass Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Layers (Z-10, Pointer Events Managed for Cards) */}
      <main className="relative z-10 flex flex-col w-full">
        {/* 1. HERO SECTION */}
        <HeroSection onNavigate={handleNavigate} />

        {/* 2. FOUNDER SECTION */}
        <FounderSection />

        {/* 3. PROJECTS & DEVELOPMENT UPDATES SECTION */}
        <ProjectsSection />

        {/* 4. CONNECT & COMMUNITY SECTION */}
        <ConnectSection />
      </main>

      {/* Architectural Studio Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
