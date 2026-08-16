import React, { useState } from 'react';
import { STUDENT_PRESSURE_TOPICS, FEATURED_DIGITAL_DRAIN } from '../../data/studentRealityData';
import type { StudentPressureItem } from '../../types';
import { 
  HeartPulse, 
  Sparkles, 
  ArrowRight, 
  X, 
  AlertTriangle, 
  HelpCircle, 
  Smartphone, 
  Compass
} from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';
import { DigitalDrainCalculator } from './DigitalDrainCalculator';

export const StudentRealitySection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<StudentPressureItem | null>(null);
  const [digitalDrainOpen, setDigitalDrainOpen] = useState<boolean>(false);

  return (
    <section id="student-reality" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950/80">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/40 border border-rose-500/40 text-[11px] font-mono uppercase tracking-widest text-rose-300">
            <HeartPulse className="w-3.5 h-3.5" />
            LIVED STUDENT CHRONICLES
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            THE SILENT WAR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-200 to-amber-200">
              INSIDE EVERY STUDENT
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Behind high percentile scores and curated online achievements lies an unacknowledged 
            landscape of existential friction. We bring what is suffered in silence into honest inquiry.
          </p>
        </div>

        {/* Featured Card: DIGITAL DRAIN */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-cyan-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.06)] group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                <Smartphone className="w-4 h-4" />
                <span>Featured Deep Dive</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-bold text-white font-display">
                {FEATURED_DIGITAL_DRAIN.title}
              </h3>

              <p className="text-base sm:text-lg italic font-serif text-slate-200">
                “{FEATURED_DIGITAL_DRAIN.headline}”
              </p>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {FEATURED_DIGITAL_DRAIN.manifesto}
              </p>

              {/* Data Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {FEATURED_DIGITAL_DRAIN.stats.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 block">
                      {stat.value}
                    </span>
                    <span className="text-[11px] font-medium text-slate-300 block mt-0.5">
                      {stat.label}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      {stat.context}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
              <button
                onClick={() => {
                  setDigitalDrainOpen(true);
                  ambientAudio.playHarmonicChime(600, 'sine', 0.08);
                }}
                className="btn-interchange w-full py-4 text-xs"
              >
                <span>Read Full Digital Drain Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block">
                  Cognitive Takeaway
                </span>
                <p className="italic font-light">
                  {FEATURED_DIGITAL_DRAIN.takeaways[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Live Drain Calculator */}
          <div className="mt-8 pt-8 border-t border-slate-800/80">
            <DigitalDrainCalculator />
          </div>
        </div>

        {/* 9 Topics Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              9 Unspoken Dimensions of Student Reality
            </h3>
            <span className="text-xs font-mono text-slate-500">Click to dissect causes & solutions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STUDENT_PRESSURE_TOPICS.map((topic) => (
              <div
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  ambientAudio.playHarmonicChime(500, 'sine', 0.05);
                }}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between cursor-pointer space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                        topic.severityGrade === 'Critical'
                          ? 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                          : topic.severityGrade === 'Pervasive'
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                          : 'bg-violet-950/60 text-violet-300 border border-violet-500/30'
                      }`}
                    >
                      {topic.severityGrade}
                    </span>
                    <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                      Inspect →
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {topic.title}
                  </h4>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {topic.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <p className="text-[11px] italic font-serif text-slate-400 group-hover:text-slate-200 transition-colors">
                    {topic.manifestoQuote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep-Dive Modal for Selected Student Reality Topic */}
      {selectedTopic && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedTopic(null);
          }}
        >
          <div className="w-full max-w-2xl max-h-[90vh] glass-panel rounded-2xl border border-rose-500/30 flex flex-col overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 block mb-1">
                  Student Reality Inquiry
                </span>
                <h3 className="text-xl font-bold text-white">
                  {selectedTopic.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTopic(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-serif italic text-slate-300">
                {selectedTopic.manifestoQuote}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Root Psychological & Structural Analysis
                </span>
                <p className="font-light leading-relaxed text-slate-300">
                  {selectedTopic.deepAnalysis}
                </p>
              </div>

              {/* Symptoms */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Recognizable Symptoms
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTopic.symptoms.map((sym, i) => (
                    <li key={i} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                      • {sym}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Systemic Drivers */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  Hidden Systemic Drivers
                </span>
                <ul className="space-y-1.5">
                  {selectedTopic.hiddenSystemicDrivers.map((driver, i) => (
                    <li key={i} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                      → {driver}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Counter Action & Reflection */}
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Liberating Counter-Action
                </span>
                <p className="text-xs sm:text-sm text-cyan-100 font-light leading-relaxed">
                  {selectedTopic.counterAction}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Contemplative Question for You
                </span>
                <p className="text-xs text-slate-300 italic">
                  {selectedTopic.reflectionQuestion}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-end">
              <button
                onClick={() => setSelectedTopic(null)}
                className="btn-secondary text-xs"
              >
                Close Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Featured Digital Drain Full Modal */}
      {digitalDrainOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDigitalDrainOpen(false);
          }}
        >
          <div className="w-full max-w-2xl max-h-[90vh] glass-panel rounded-2xl border border-cyan-500/30 flex flex-col overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
                  Special Investigation
                </span>
                <h3 className="text-xl font-bold text-white">
                  {FEATURED_DIGITAL_DRAIN.title}
                </h3>
              </div>
              <button
                onClick={() => setDigitalDrainOpen(false)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-xs sm:text-sm">
              <p className="text-base font-serif italic text-cyan-200">
                “{FEATURED_DIGITAL_DRAIN.headline}”
              </p>

              <div className="space-y-3 font-light leading-relaxed text-slate-300">
                {FEATURED_DIGITAL_DRAIN.deepDiveAnalysis.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Core Intellectual Principles
                </span>
                <div className="space-y-2">
                  {FEATURED_DIGITAL_DRAIN.takeaways.map((takeaway, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      • {takeaway}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                  Practical Intervention
                </span>
                <p className="text-xs text-cyan-100 leading-relaxed">
                  {FEATURED_DIGITAL_DRAIN.actionableFramework}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-end">
              <button
                onClick={() => setDigitalDrainOpen(false)}
                className="btn-secondary text-xs"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
