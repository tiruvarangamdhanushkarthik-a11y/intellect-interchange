import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Terminal, 
  Layers, 
  ChevronRight, 
  ChevronDown, 
  Archive, 
  GitBranch 
} from 'lucide-react';

interface ProjectUpdate {
  phase: string;
  title: string;
  detail: string;
  date: string;
  completed: boolean;
}

interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  status: string;
  statusType: 'amber' | 'cyan' | 'blue';
  description: string;
  icon: typeof Bot;
  stack: string[];
  updates: ProjectUpdate[];
}

export const ProjectsSection: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('studymate');
  const [showArchive, setShowArchive] = useState<boolean>(false);

  const projects: ProjectItem[] = [
    {
      id: 'studymate',
      name: 'STUDYMATE AI',
      tagline: 'Adaptive Socratic Learning System & Concept Synthesizer',
      category: 'COGNITIVE ARCHITECTURE',
      status: 'ACTIVE DEVELOPMENT',
      statusType: 'amber',
      icon: Bot,
      stack: ['Python', 'FastAPI', 'Socratic Prompt Engine', 'Vector Graph', 'React'],
      description:
        'An intelligent cognitive learning system engineered to deconstruct dense academic syllabi into first-principles conceptual maps. Replaces passive memorization with continuous adaptive Socratic dialogue and dynamic synthesis.',
      updates: [
        {
          phase: 'Phase 01',
          title: 'Syllabus Ingestion & Parsing',
          detail: 'Architected hierarchical syllabus parsing engine capable of extracting core prerequisites and knowledge dependencies.',
          date: 'Completed',
          completed: true,
        },
        {
          phase: 'Phase 02',
          title: 'Dynamic Concept Graph Visualization',
          detail: 'Integrated interactive concept topology rendering enabling visual exploration of interconnected topic nodes.',
          date: 'Completed',
          completed: true,
        },
        {
          phase: 'Phase 03',
          title: 'Socratic Memory & Dialogue Context',
          detail: 'Currently testing long-term retrieval-augmented conversation memory to challenge student assumptions during study sessions.',
          date: 'In Progress',
          completed: false,
        },
      ],
    },
    {
      id: 'iiro',
      name: 'IIRO',
      tagline: 'Intelligent Software Robotics & Systems Middleware',
      category: 'SOFTWARE ROBOTICS',
      status: 'ARCHITECTURE PHASE',
      statusType: 'cyan',
      icon: Cpu,
      stack: ['Go', 'TypeScript', 'Event Driven Microservices', 'Distributed State'],
      description:
        'A high-performance software robotics framework and automation middleware engineered for reliable background execution, cross-platform telemetry, and autonomous micro-task routing.',
      updates: [
        {
          phase: 'Phase 01',
          title: 'Core Protocol & Service Architecture',
          detail: 'Defined type-safe microservices communication specification and asynchronous RPC pipeline.',
          date: 'Completed',
          completed: true,
        },
        {
          phase: 'Phase 02',
          title: 'Fault-Tolerant Task Orchestrator',
          detail: 'Engineered high-throughput queuing with automatic self-healing retry strategies for long-running batch jobs.',
          date: 'Completed',
          completed: true,
        },
        {
          phase: 'Phase 03',
          title: 'Cross-System Operational Telemetry',
          detail: 'Developing native system hooks and unified telemetry daemon for real-time workload synchronization.',
          date: 'In Progress',
          completed: false,
        },
      ],
    },
    {
      id: 'jarvis',
      name: 'JARVIS MARK 53',
      tagline: 'Autonomous Multimodal Desktop & System Companion',
      category: 'AUTONOMOUS AGENTS',
      status: 'ACTIVE R&D',
      statusType: 'amber',
      icon: Terminal,
      stack: ['Local LLMs', 'Vision OCR', 'Voice Telemetry', 'Desktop Automation'],
      description:
        'A customized multimodal system assistant operating at OS level. Features automated developer workflow assistance, screen context parsing, and hands-free voice-directed system control.',
      updates: [
        {
          phase: 'Phase 01',
          title: 'Vision Perception & Screen Parsing',
          detail: 'Implemented real-time active window capture and DOM/UI element coordinate resolution for localized command execution.',
          date: 'Completed',
          completed: true,
        },
        {
          phase: 'Phase 02',
          title: 'On-Device Inference Latency Tuning',
          detail: 'Quantized neural weights and optimized GPU compute shaders, reducing local voice interaction latency by 40%.',
          date: 'Completed',
          completed: true,
        },
        {
          phase: 'Phase 03',
          title: 'Developer Toolchain Autopilot',
          detail: 'Iterating on autonomous git orchestration, test-failure root cause analysis, and multi-workspace indexing.',
          date: 'In Progress',
          completed: false,
        },
      ],
    },
    {
      id: 'horizon',
      name: 'FUTURE HORIZON',
      tagline: 'Decentralized Knowledge Commons & Cognitive Interfaces',
      category: 'FRONTIER INCUBATION',
      status: 'INCUBATING',
      statusType: 'blue',
      icon: Layers,
      stack: ['Cognitive Modeling', 'P2P Sync', 'Zero-Knowledge Proofs'],
      description:
        'Exploratory research exploring open neural peer-to-peer protocols where student-built AI agents collaborate and verify proofs without central platform rent-seeking.',
      updates: [
        {
          phase: 'Phase 01',
          title: 'Theoretical Problem Formulation',
          detail: 'Documented foundational whitepaper on decentralizing institutional credential barriers through algorithmic merit.',
          date: 'Completed',
          completed: true,
        },
        {
          phase: 'Phase 02',
          title: 'Architecture Blueprint Formulation',
          detail: 'Synthesizing technical requirements for peer-to-peer knowledge graphs and reproducible verification.',
          date: 'Active',
          completed: false,
        },
      ],
    },
  ];

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <section
      id="projects"
      className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#31B9E8]" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#31B9E8] uppercase">
              SYSTEM PORTFOLIO & DEVELOPMENT ROADMAP
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-[#F5F5F5]">
            OUR PROJECTS.
          </h2>
        </div>

        <span className="text-xs font-mono text-[#A8ADB7] tracking-wider">
          GENUINE SYSTEM PROGRESS • CONTINUOUS ITERATION
        </span>
      </div>

      {/* Grid Layout: Project Selection Tabs & Deep Dive Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List of Projects */}
        <div className="lg:col-span-5 space-y-3">
          {projects.map((proj) => {
            const isSelected = proj.id === activeProject.id;
            const Icon = proj.icon;
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'norxy-glass-panel border-white/20 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.8)]'
                    : 'norxy-glass border-white/5 hover:border-white/15'
                }`}
              >
                {/* Active Indicator Accent Line */}
                {isSelected && (
                  <div
                    className={`absolute top-0 left-0 bottom-0 w-1 ${
                      proj.statusType === 'amber'
                        ? 'bg-[#F28A45]'
                        : proj.statusType === 'cyan'
                        ? 'bg-[#31B9E8]'
                        : 'bg-[#527DA8]'
                    }`}
                  />
                )}

                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-white/10 text-[#F5F5F5]'
                          : 'bg-white/5 text-[#A8ADB7] group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight text-[#F5F5F5] font-display">
                        {proj.name}
                      </h3>
                      <span className="text-[10px] font-mono tracking-widest text-[#A8ADB7] uppercase">
                        {proj.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                      proj.statusType === 'amber'
                        ? 'border-[#F28A45]/30 bg-[#F28A45]/10 text-[#F28A45]'
                        : proj.statusType === 'cyan'
                        ? 'border-[#31B9E8]/30 bg-[#31B9E8]/10 text-[#31B9E8]'
                        : 'border-[#527DA8]/30 bg-[#527DA8]/10 text-[#527DA8]'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>

                <p className="text-xs text-[#A8ADB7] line-clamp-2 font-light">
                  {proj.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Detail Showcase: Active Project Overview & Timeline */}
        <div className="lg:col-span-7 norxy-glass-panel rounded-2xl p-6 sm:p-8 space-y-7 border border-white/15">
          {/* Active Project Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    activeProject.statusType === 'amber'
                      ? 'bg-[#F28A45]'
                      : activeProject.statusType === 'cyan'
                      ? 'bg-[#31B9E8]'
                      : 'bg-[#527DA8]'
                  }`}
                />
                <span className="text-[10px] font-mono tracking-widest text-[#A8ADB7] uppercase">
                  {activeProject.status}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F5F5F5] font-display">
                {activeProject.name}
              </h3>
              <p className="text-xs text-[#F28A45] font-mono mt-0.5">
                {activeProject.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 max-w-xs sm:justify-end">
              {activeProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#A8ADB7]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#F5F5F5]/90 font-light leading-relaxed">
            {activeProject.description}
          </p>

          {/* Development Update Timeline */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#A8ADB7] uppercase">
              <GitBranch className="w-3.5 h-3.5 text-[#31B9E8]" />
              <span>DEVELOPMENT UPDATES & TIMELINE</span>
            </div>

            <div className="space-y-4 border-l border-white/10 pl-5 ml-2 relative">
              {activeProject.updates.map((update, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      update.completed
                        ? 'border-[#31B9E8] bg-[#08090C]'
                        : 'border-[#F28A45] bg-[#F28A45]/30 animate-pulse'
                    }`}
                  >
                    {update.completed && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#31B9E8]" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#F28A45] tracking-widest uppercase">
                        {update.phase}
                      </span>
                      <span className="text-[10px] font-mono text-[#A8ADB7]">
                        • {update.date}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-semibold text-[#F5F5F5]">
                      {update.title}
                    </h4>

                    <p className="text-xs text-[#A8ADB7] font-light leading-relaxed">
                      {update.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Closed Project Archive Accordion (Explicitly stating Pavanputra Muscle Factory is closed and inactive) */}
      <div className="mt-14 pt-6 border-t border-white/[0.08]">
        <button
          onClick={() => setShowArchive(!showArchive)}
          className="flex items-center gap-2.5 text-xs font-mono text-[#A8ADB7] hover:text-[#F5F5F5] transition-colors cursor-pointer group"
          aria-expanded={showArchive}
        >
          <Archive className="w-3.5 h-3.5 text-[#A8ADB7] group-hover:text-[#F28A45] transition-colors" />
          <span className="uppercase tracking-widest font-medium">
            Archived Systems & Historical Client Engagements
          </span>
          {showArchive ? (
            <ChevronDown className="w-3 h-3 text-[#A8ADB7]" />
          ) : (
            <ChevronRight className="w-3 h-3 text-[#A8ADB7]" />
          )}
        </button>

        {showArchive && (
          <div className="mt-4 p-5 rounded-xl norxy-glass border border-white/5 space-y-3 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
              <div>
                <h4 className="text-xs font-mono font-bold text-[#F5F5F5] uppercase">
                  PAVANPUTRA MUSCLE FACTORY
                </h4>
                <p className="text-[11px] text-[#A8ADB7] font-light">
                  Gymnasium brand identity and early digital presence architecture.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-[9px] font-mono text-zinc-400 self-start sm:self-auto">
                CLOSED ARCHIVE • INACTIVE
              </span>
            </div>
            <p className="text-[11px] text-[#A8ADB7]/80 font-light leading-relaxed">
              Note: This client engagement was concluded and closed. Intellect Interchange now focuses 100% on proprietary AI systems, software robotics, and student learning ecosystems.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
