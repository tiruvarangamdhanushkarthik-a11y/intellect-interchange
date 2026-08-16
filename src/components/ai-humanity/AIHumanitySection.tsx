import React, { useState } from 'react';
import { 
  Bot, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Zap, 
  ShieldAlert, 
  RefreshCw 
} from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';

export const AIHumanitySection: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'A' | 'B'>('B');
  const [simStep, setSimStep] = useState<number>(1);

  const handleStepSimulation = () => {
    setSimStep((prev) => (prev >= 4 ? 1 : prev + 1));
    ambientAudio.playHarmonicChime(400 + simStep * 100, 'sine', 0.05);
  };

  return (
    <section id="ai-humanity" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950/90">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-[11px] font-mono uppercase tracking-widest text-cyan-300">
            <Bot className="w-3.5 h-3.5" />
            SYNTHETIC COGNITION VS HUMAN ESSENCE
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            WHEN MACHINES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-indigo-300">
              THINK FOR US
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Artificial Intelligence has solved the challenge of information retrieval. 
            Now comes the philosophical crisis: Will humans preserve the capacity for original, 
            friction-filled thought?
          </p>
        </div>

        {/* The Core Manifesto Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-violet-950/40 border border-cyan-500/30 text-center relative overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.08)]">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 block mb-2">
            The Fundamental Interchange Axiom
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            “AI should assist thinking, not replace it.”
          </h3>
        </div>

        {/* Interactive Model A vs Model B Simulator */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Interactive Cognitive Workflow Simulator
              </h3>
              <p className="text-xs text-slate-400">
                Compare the psychological divergence between passive reliance and Socratic collaboration.
              </p>
            </div>

            {/* Model Switcher Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => {
                  setActiveModel('A');
                  setSimStep(1);
                  ambientAudio.playHarmonicChime(350, 'sine', 0.05);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all ${
                  activeModel === 'A'
                    ? 'bg-rose-950/70 text-rose-300 border border-rose-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Model A: The Passive Trap
              </button>
              <button
                onClick={() => {
                  setActiveModel('B');
                  setSimStep(1);
                  ambientAudio.playHarmonicChime(550, 'sine', 0.05);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all ${
                  activeModel === 'B'
                    ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Model B: The Intellect Way
              </button>
            </div>
          </div>

          {/* Model Display Visual Container */}
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-8">
            {activeModel === 'A' ? (
              /* Model A Flow */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider">
                  <XCircle className="w-4 h-4" />
                  <span>MODEL A: Passive Automation (Cognitive Atrophy)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                  {/* Step 1 */}
                  <div className={`p-4 rounded-xl border transition-all ${simStep >= 1 ? 'bg-slate-900 border-slate-700' : 'opacity-40 border-slate-800'}`}>
                    <span className="text-[10px] font-mono text-slate-500 block mb-1">01. INITIATION</span>
                    <h4 className="text-xs font-bold text-white mb-1">HUMAN QUESTION</h4>
                    <p className="text-[11px] text-slate-400">Student queries AI for an answer to complete an assignment.</p>
                  </div>

                  {/* Step 2 */}
                  <div className={`p-4 rounded-xl border transition-all ${simStep >= 2 ? 'bg-slate-900 border-slate-700' : 'opacity-40 border-slate-800'}`}>
                    <span className="text-[10px] font-mono text-slate-500 block mb-1">02. SYNTHESIS</span>
                    <h4 className="text-xs font-bold text-white mb-1">INSTANT AI ANSWER</h4>
                    <p className="text-[11px] text-slate-400">AI produces a polished, authoritative summary in 2 seconds.</p>
                  </div>

                  {/* Step 3 */}
                  <div className={`p-4 rounded-xl border transition-all ${simStep >= 3 ? 'bg-rose-950/30 border-rose-500/30' : 'opacity-40 border-slate-800'}`}>
                    <span className="text-[10px] font-mono text-rose-400 block mb-1">03. BEHAVIOR</span>
                    <h4 className="text-xs font-bold text-rose-200 mb-1">BLIND DEPENDENCY</h4>
                    <p className="text-[11px] text-slate-400">Student copy-pastes without questioning underlying assumptions.</p>
                  </div>

                  {/* Step 4 */}
                  <div className={`p-4 rounded-xl border transition-all ${simStep >= 4 ? 'bg-rose-950/60 border-rose-500/60' : 'opacity-40 border-slate-800'}`}>
                    <span className="text-[10px] font-mono text-rose-300 block mb-1">04. OUTCOME</span>
                    <h4 className="text-xs font-bold text-rose-200 mb-1">LESS THINKING</h4>
                    <p className="text-[11px] text-slate-300">Neural pathways for sustained logical struggle degrade over time.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 flex items-start gap-3 text-xs text-rose-200">
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">The Danger of Frictionless Answers:</span>
                    When you never struggle through cognitive ambiguity, you lose the ability to detect when an algorithm is hallucinating or misleading you.
                  </div>
                </div>
              </div>
            ) : (
              /* Model B Flow */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>MODEL B: The Intellect Interchange Philosophy (Sovereign Expansion)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                  {/* Step 1 */}
                  <div className={`p-4 rounded-xl border transition-all ${simStep >= 1 ? 'bg-slate-900 border-slate-700' : 'opacity-40 border-slate-800'}`}>
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1">01. INITIATION</span>
                    <h4 className="text-xs font-bold text-white mb-1">HUMAN QUESTION</h4>
                    <p className="text-[11px] text-slate-400">Student formulates a rigorous, hypothesis-driven inquiry.</p>
                  </div>

                  {/* Step 2 */}
                  <div className={`p-4 rounded-xl border transition-all ${simStep >= 2 ? 'bg-slate-900 border-slate-700' : 'opacity-40 border-slate-800'}`}>
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1">02. CATALYST</span>
                    <h4 className="text-xs font-bold text-white mb-1">AI PERSPECTIVES</h4>
                    <p className="text-[11px] text-slate-400">AI provides divergent viewpoints, historical counter-examples, and evidence.</p>
                  </div>

                  {/* Step 3 */}
                  <div className={`p-4 rounded-xl border transition-all ${simStep >= 3 ? 'bg-cyan-950/40 border-cyan-500/40' : 'opacity-40 border-slate-800'}`}>
                    <span className="text-[10px] font-mono text-cyan-300 block mb-1">03. SYNTHESIS</span>
                    <h4 className="text-xs font-bold text-cyan-200 mb-1">CRITICAL ANALYSIS</h4>
                    <p className="text-[11px] text-slate-200">Human compares perspectives, challenges biases, and examines evidence.</p>
                  </div>

                  {/* Step 4 */}
                  <div className={`p-4 rounded-xl border transition-all ${simStep >= 4 ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'opacity-40 border-slate-800'}`}>
                    <span className="text-[10px] font-mono text-cyan-200 block mb-1">04. OUTCOME</span>
                    <h4 className="text-xs font-bold text-white mb-1">DEEPER THINKING</h4>
                    <p className="text-[11px] text-cyan-100 font-medium">Student internalizes first principles and formulates their own sovereign conclusion.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3 text-xs text-cyan-200">
                  <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">The Intellect Standard:</span>
                    AI serves as a tireless intellectual sparring partner. The synthesis, moral conviction, and final judgment remain exclusively human.
                  </div>
                </div>
              </div>
            )}

            {/* Simulation Controller */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-400">
                Simulation Stage: <span className="text-cyan-300 font-bold">{simStep} / 4</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleStepSimulation}
                  className="btn-interchange text-xs w-full sm:w-auto"
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Advance Simulation Step</span>
                </button>
                <button
                  onClick={() => setSimStep(1)}
                  className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  title="Reset Simulator"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6 AI Inquiry Topics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'HOW AI IS REDUCING HUMAN THINKING CAPACITY',
              desc: 'The neurological cost of instant summarization and the disappearance of cognitive friction.'
            },
            {
              title: 'DIGITAL DRAIN',
              desc: 'How continuous algorithmic notifications hijack executive attention networks.'
            },
            {
              title: 'ALGORITHMIC LIFE',
              desc: 'When feed engines curate friendship circles, political beliefs, and taste before we are aware.'
            },
            {
              title: 'AI DEPENDENCY',
              desc: 'What happens when a generation loses the ability to write a structured argument without synthetic aid?'
            },
            {
              title: 'HUMAN VS MACHINE THINKING',
              desc: 'Statistical token prediction vs subjective qualitative consciousness and ethical responsibility.'
            },
            {
              title: 'THE FUTURE OF LEARNING',
              desc: 'From industrial grading compliance to sovereign autodidactic mastery.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30 transition-colors space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase">Topic 0{idx + 1}</span>
              <h4 className="text-sm font-bold text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
