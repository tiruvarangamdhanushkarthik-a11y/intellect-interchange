import React from 'react';
import founderImage from '../../assets/founder.png';
import { Sparkles, Terminal, Cpu, Compass, Quote } from 'lucide-react';

export const FounderSection: React.FC = () => {
  return (
    <section
      id="founder"
      className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F28A45]" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#F28A45] uppercase">
              LEADERSHIP & ARCHITECTURE
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-[#F5F5F5]">
            THE FOUNDER.
          </h2>
        </div>

        <span className="text-xs font-mono text-[#A8ADB7] tracking-wider">
          ARCHITECTING REAL SYSTEMS BEYOND CONFINED CURRICULA
        </span>
      </div>

      {/* Main Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Authentic Founder Portrait in Frosted Glass Frame */}
        <div className="lg:col-span-5 relative group">
          <div className="norxy-glass rounded-2xl p-2.5 sm:p-3 relative overflow-hidden transition-all duration-500 hover:border-white/20">
            {/* Ambient Dual-Tone Glow Behind Image */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#31B9E8]/20 via-transparent to-[#F28A45]/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />

            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#11151C] border border-white/10">
              <img
                src={founderImage}
                alt="T. Dhanush Karthik - Founder of Intellect Interchange"
                className="w-full h-full object-cover object-center filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                loading="lazy"
              />

              {/* Frosted Identity Tag Overlay */}
              <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-lg norxy-glass border border-white/15 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-[#F5F5F5] font-display">
                      T. DHANUSH KARTHIK
                    </h3>
                    <p className="text-[10px] font-mono tracking-wider text-[#F28A45] uppercase">
                      FOUNDER & CHIEF SYSTEMS ARCHITECT
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#11151C] border border-white/10 flex items-center justify-center">
                    <Terminal className="w-3.5 h-3.5 text-[#31B9E8]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Credential Highlights */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-left">
            <div className="norxy-glass p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono tracking-widest text-[#A8ADB7] uppercase block mb-1">
                DOMAIN FOCUS
              </span>
              <span className="text-xs font-semibold text-[#F5F5F5]">
                AI & Systems Robotics
              </span>
            </div>
            <div className="norxy-glass p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono tracking-widest text-[#A8ADB7] uppercase block mb-1">
                ORIGIN
              </span>
              <span className="text-xs font-semibold text-[#F5F5F5]">
                Intellect Interchange
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Biography, Vision, and Mission */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Founder Punchline Card */}
          <div className="norxy-glass-panel p-6 sm:p-8 rounded-2xl relative border-l-2 border-l-[#F28A45] overflow-hidden">
            <Quote className="w-8 h-8 text-[#F28A45]/30 mb-3" />
            <blockquote className="text-xl sm:text-2xl lg:text-[1.65rem] font-medium tracking-tight text-[#F5F5F5] leading-snug font-display">
              “Think beyond books. Turn knowledge into action.”
            </blockquote>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#F28A45] tracking-wider uppercase">
                T. DHANUSH KARTHIK
              </span>
              <span className="text-xs text-[#A8ADB7]">• Founder</span>
            </div>
          </div>

          {/* Biography Breakdown */}
          <div className="norxy-glass p-6 sm:p-7 rounded-2xl space-y-4">
            <h4 className="text-sm font-mono tracking-widest uppercase text-[#31B9E8] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#31B9E8]" />
              <span>THE ARCHITECT'S JOURNEY</span>
            </h4>
            <p className="text-sm sm:text-base text-[#A8ADB7] leading-relaxed font-light">
              <strong className="text-[#F5F5F5] font-medium">T. Dhanush Karthik</strong> is a systems engineer, software craftsman, and creator pioneering sovereign learning technologies. Witnessing the severe intellectual bottleneck created by standardized examinations, he established <strong className="text-[#F5F5F5] font-medium">Intellect Interchange</strong> as an independent technological sanctuary for builders who reject artificial limits.
            </p>
            <p className="text-sm sm:text-base text-[#A8ADB7] leading-relaxed font-light">
              Directly orchestrating projects ranging from <span className="text-[#F5F5F5] font-mono text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10">StudyMate AI</span> to the <span className="text-[#F5F5F5] font-mono text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10">IIRO</span> robotics framework and the <span className="text-[#F5F5F5] font-mono text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10">JARVIS Mark 53</span> autonomous system, he champions a return to first-principles creation, code execution, and peer-to-peer intellect.
            </p>
          </div>

          {/* Two-Column Vision and Mission Dual Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Vision Card */}
            <div className="norxy-glass-interactive p-5 rounded-2xl border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#F28A45]/10 border border-[#F28A45]/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#F28A45]" />
              </div>
              <h5 className="text-sm font-bold tracking-tight text-[#F5F5F5] uppercase font-mono">
                THE VISION
              </h5>
              <p className="text-xs text-[#A8ADB7] leading-relaxed font-light">
                To transform passive consumers of technology into active architects of autonomous intelligence, providing a launchpad for ideas that matter.
              </p>
            </div>

            {/* Mission Card */}
            <div className="norxy-glass-interactive p-5 rounded-2xl border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#31B9E8]/10 border border-[#31B9E8]/30 flex items-center justify-center">
                <Compass className="w-4 h-4 text-[#31B9E8]" />
              </div>
              <h5 className="text-sm font-bold tracking-tight text-[#F5F5F5] uppercase font-mono">
                THE MISSION
              </h5>
              <p className="text-xs text-[#A8ADB7] leading-relaxed font-light">
                Engineering open, robust technological infrastructure that dismantles educational barriers and enables students to deploy master-grade systems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Compact Team Subsection Placed Immediately Below Founder */}
      <div className="mt-16 sm:mt-20 pt-10 border-t border-white/[0.08]">
        {/* Subsection Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#31B9E8]" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#31B9E8] uppercase">
                CORE COLLECTIVE
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-display text-[#F5F5F5]">
              THE PEOPLE BEHIND THE IDEAS
            </h3>
          </div>
          <p className="text-xs font-mono text-[#A8ADB7] tracking-wider">
            Different strengths. One shared vision.
          </p>
        </div>

        {/* Compact Team Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Member 1: A. Bharath Chand */}
          <div className="norxy-glass p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group flex items-center gap-4 sm:gap-5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border border-white/15 bg-[#11151C] shadow-inner group-hover:border-[#31B9E8]/50 transition-colors">
              <img
                src="/images/team/bharath-chand.png"
                alt="A. Bharath Chand - Co-Founder"
                className="w-full h-full object-cover object-[center_20%] filter grayscale contrast-105 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="space-y-1 min-w-0">
              <h4 className="text-base sm:text-lg font-bold text-[#F5F5F5] font-display tracking-tight truncate">
                A. Bharath Chand
              </h4>
              <p className="text-xs font-mono text-[#31B9E8] tracking-wider uppercase">
                Co-Founder, Intellect Interchange
              </p>
            </div>
          </div>

          {/* Member 2: V.B.N. Swamy */}
          <div className="norxy-glass p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group flex items-center gap-4 sm:gap-5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border border-white/15 bg-[#11151C] shadow-inner group-hover:border-[#F28A45]/50 transition-colors">
              <img
                src="/images/team/vbn-swamy.png"
                alt="V.B.N. Swamy - Editor & Social Media Handler"
                className="w-full h-full object-cover object-[center_20%] filter grayscale contrast-105 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="space-y-1 min-w-0">
              <h4 className="text-base sm:text-lg font-bold text-[#F5F5F5] font-display tracking-tight truncate">
                V.B.N. Swamy
              </h4>
              <p className="text-xs font-mono text-[#F28A45] tracking-wider uppercase">
                Editor & Social Media Handler
              </p>
              <p className="text-[11px] font-mono text-[#A8ADB7] tracking-wider">
                Intellect Interchange
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
