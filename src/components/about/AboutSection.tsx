import React from 'react';
import { 
  Sparkles, 
  Cpu, 
  Users, 
  Lightbulb, 
  Radio, 
  Network,
  Compass,
  Award
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const PILLARS = [
    {
      icon: Lightbulb,
      title: 'Autodidactic Inquiry',
      desc: 'True mastery begins where the examination rubric ends. We develop tools and frameworks for deep, sovereign intellectual exploration.',
      number: '01'
    },
    {
      icon: Cpu,
      title: 'Applied Frontier Technology',
      desc: 'From generative neural architectures to semiconductor VLSI design, we translate complex computer science into intuitive digital tools.',
      number: '02'
    },
    {
      icon: Users,
      title: 'Authentic Student Perspectives',
      desc: 'Amplifying honest student voices examining mental fatigue, career uncertainty, and structural realities of modern education.',
      number: '03'
    },
    {
      icon: Network,
      title: 'Cross-Disciplinary Studio',
      desc: 'Fostering collaboration between engineers, designers, policy strategists, and researchers across universities.',
      number: '04'
    },
    {
      icon: Radio,
      title: 'Intellectual Audio & Media',
      desc: 'Binaural podcast productions, visual essays, and unscripted dialogues deconstructing standard industry narratives.',
      number: '05'
    }
  ];

  return (
    <section id="about" className="relative py-32 px-4 sm:px-6 z-20 bg-slate-950/80 border-t border-white/[0.06]">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono uppercase tracking-[0.2em] text-slate-300">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>BRAND PHILOSOPHY & MANIFESTO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            THINK BEYOND <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-sky-200">
              THE SYLLABUS
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Intellect Interchange 2.0 is a premium digital experience studio and intellectual collective 
            dedicated to returning cognitive autonomy and craftsmanship to the student mind.
          </p>
        </div>

        {/* Central Editorial Manifesto Box */}
        <div className="glass-studio p-8 sm:p-14 rounded-3xl border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-sky-400 block font-bold">
              THE STUDIO CREED
            </span>
            <p className="text-xl sm:text-3xl font-serif italic text-white leading-relaxed font-light">
              “We build what comes next: an open digital ecosystem where minds question systems, explore breakthrough technology, dismantle dogmas, and collaborate without artificial boundaries.”
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                <span>HOST & CURATOR: T. DHANUSH KARTHIK</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                <span>STUDIO DISPATCH • 2026</span>
              </span>
            </div>
          </div>
        </div>

        {/* 5 Architectural Focus Area Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.number}
                className="glass-studio p-7 rounded-2xl border border-white/[0.07] hover:border-white/20 transition-all duration-300 space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-sky-300 group-hover:border-sky-400/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 font-bold">
                    {pillar.number}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white uppercase font-display tracking-tight group-hover:text-sky-100 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
