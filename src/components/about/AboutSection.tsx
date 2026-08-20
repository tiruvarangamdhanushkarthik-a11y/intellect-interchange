import React from 'react';
import { 
  Sparkles, 
  Cpu, 
  Users, 
  Lightbulb, 
  Radio, 
  Network
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const PILLARS = [
    {
      icon: Lightbulb,
      title: 'Learning Beyond Syllabi',
      desc: 'Reclaiming autodidactic inquiry, critical thinking, and fundamental first-principles mastery.',
      color: '#00f0ff'
    },
    {
      icon: Cpu,
      title: 'Technology & Innovation',
      desc: 'Exploring AI architectures, digital VLSI silicon design, and computational frontiers.',
      color: '#a855f7'
    },
    {
      icon: Users,
      title: 'Student Perspectives',
      desc: 'Amplifying authentic voices deconstructing academic pressures, career choices, and real challenges.',
      color: '#f43f5e'
    },
    {
      icon: Network,
      title: 'Interdisciplinary Collaboration',
      desc: 'Connecting engineers, policy thinkers, designers, and creators across colleges.',
      color: '#fbbf24'
    },
    {
      icon: Radio,
      title: 'Meaningful Conversations',
      desc: 'Deep-dive dialogues, roundtables, and unscripted intellectual podcasts.',
      color: '#34d399'
    }
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950/80 border-t border-slate-900">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Main Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-xs font-mono uppercase tracking-widest text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLATFORM MANIFESTO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            ABOUT INTELLECT INTERCHANGE
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            INTELLECT INTERCHANGE.CO is a student-driven platform built around ideas, technology, conversations and community.
          </p>
        </div>

        {/* Mission Box */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.06)]">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 block font-bold">
              OUR CORE PHILOSOPHY
            </span>
            <p className="text-lg sm:text-2xl font-serif italic text-white leading-relaxed">
              “To build an open space where student minds question systems, explore breakthrough technology, share real experiences, and collaborate without boundaries.”
            </p>
          </div>
        </div>

        {/* 5 Focus Area Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-md"
                  style={{
                    backgroundColor: `${pillar.color}15`,
                    borderColor: `${pillar.color}40`,
                    color: pillar.color
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
