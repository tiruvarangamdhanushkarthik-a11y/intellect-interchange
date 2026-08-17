import React, { useState, useEffect } from 'react';
import { UniverseCanvas } from './components/3d/UniverseCanvas';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { EntrySequence } from './components/hero/EntrySequence';
import { NodeDetailModal } from './components/interchange/NodeDetailModal';
import { PhilosophySection } from './components/philosophy/PhilosophySection';
import { PodcastSection } from './components/podcast/PodcastSection';
import { YouTubeSection } from './components/youtube/YouTubeSection';
import { ConnectSection } from './components/connect/ConnectSection';
import { KNOWLEDGE_NODES_DATA } from './data/knowledgeNodesData';
import type { NodeCategory } from './types';
import { ambientAudio } from './audio/ambientSynth';
import { ArrowDown } from 'lucide-react';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeNodeId, setActiveNodeId] = useState<NodeCategory | null>(null);
  const [isLowPowerMode, setIsLowPowerMode] = useState<boolean>(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const saved = localStorage.getItem('intellect_low_power');
    return saved !== null ? saved === 'true' : isMobile;
  });

  // Track active scroll section for Navbar
  useEffect(() => {
    const sections = [
      'hero',
      'interchange',
      'philosophy',
      'podcast',
      'youtube',
      'community',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
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
    if (sectionId === 'hero' || sectionId === 'interchange') {
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

  const handleSelectNode = (nodeId: NodeCategory | null) => {
    setActiveNodeId(nodeId);
    if (nodeId) {
      const nodeData = KNOWLEDGE_NODES_DATA.find((n) => n.id === nodeId);
      if (nodeData) {
        ambientAudio.playNodeHoverSound(KNOWLEDGE_NODES_DATA.indexOf(nodeData));
      }
    }
  };

  const activeNodeData = KNOWLEDGE_NODES_DATA.find((n) => n.id === activeNodeId) || null;

  return (
    <div className="relative min-h-screen bg-[#030508] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar with audio toggle, low power switch, and WhatsApp trigger */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isLowPowerMode={isLowPowerMode}
        onToggleLowPower={handleToggleLowPower}
      />

      {/* 1. ENTER & 2. INTELLECT INTERCHANGE: Hero & 3D Interactive Knowledge Universe */}
      <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* 3D WebGL Canvas Layer */}
        <div className="absolute inset-0 z-0">
          <UniverseCanvas
            activeNodeId={activeNodeId}
            onSelectNode={handleSelectNode}
            isLowPowerMode={isLowPowerMode}
          />
        </div>

        {/* Hero Overlay & Cinematic Entry Sequence */}
        <div className="relative z-10 w-full">
          <EntrySequence
            onEnterApp={() => handleNavigate('interchange')}
            onExploreIdeas={() => handleNavigate('interchange')}
          />
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => handleNavigate('interchange')}
            className="text-slate-500 hover:text-cyan-300 transition-colors flex flex-col items-center gap-1 group"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-cyan-300">
              EXPLORE KNOWLEDGE GALAXY
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </button>
        </div>
      </section>

      {/* 2D / 3D Node Selector Bar */}
      <div id="interchange" className="relative z-20 bg-slate-950/90 border-y border-slate-800/80 py-6 px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                The Interchange • Spatial Knowledge Matrix
              </span>
              <h3 className="text-lg font-bold text-white">
                Select a Knowledge Domain to Inspect
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              8 Interconnected Spheres of Human Inquiry
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {KNOWLEDGE_NODES_DATA.map((node) => {
              const isSelected = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => handleSelectNode(isSelected ? null : node.id)}
                  className={`p-3 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all duration-200 border ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: node.color }}
                  />
                  <span className="text-[11px] font-mono font-semibold tracking-wider uppercase">
                    {node.shortTag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. THINK BEYOND THE SYLLABUS: Philosophy Section */}
      <PhilosophySection />

      {/* 4. PODCAST: COMING SOON */}
      <PodcastSection />

      {/* 5. YOUTUBE: INTELLECT_INTERCHANGE.CO. */}
      <YouTubeSection />

      {/* 6. WHATSAPP COMMUNITY: Join the Community */}
      <ConnectSection />

      {/* 7. Minimal Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 3D Knowledge Node Inspection Modal */}
      <NodeDetailModal
        node={activeNodeData}
        onClose={() => setActiveNodeId(null)}
      />
    </div>
  );
};
