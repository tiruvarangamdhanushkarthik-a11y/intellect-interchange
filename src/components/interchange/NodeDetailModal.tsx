import React, { useState } from 'react';
import type { KnowledgeNodeData } from '../../types';
import { 
  X, 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  Compass, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  GraduationCap,
  HeartPulse,
  Users,
  Atom,
  Hourglass,
  Brain,
  Check,
  Copy
} from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';

interface NodeDetailModalProps {
  node: KnowledgeNodeData | null;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  GraduationCap,
  HeartPulse,
  Users,
  Atom,
  Hourglass,
  Brain,
  Sparkles
};

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  node,
  onClose,
}) => {
  const [expandedArticleIdx, setExpandedArticleIdx] = useState<number | null>(0);
  const [copiedQuestion, setCopiedQuestion] = useState<string | null>(null);

  if (!node) return null;

  const IconComponent = ICON_MAP[node.iconName] || Sparkles;

  const handleCopyQuestion = (q: string) => {
    navigator.clipboard.writeText(q);
    setCopiedQuestion(q);
    ambientAudio.playHarmonicChime(750, 'sine', 0.05);
    setTimeout(() => setCopiedQuestion(null), 2000);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="node-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-end md:p-6 bg-slate-950/80 backdrop-blur-md transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full md:max-w-2xl h-full md:h-[92vh] flex flex-col glass-panel md:rounded-2xl border border-cyan-500/20 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-right duration-300"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              aria-label="Return to central universe"
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center border"
                style={{ 
                  backgroundColor: `${node.color}15`, 
                  borderColor: `${node.color}40`,
                  color: node.color 
                }}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                  {node.shortTag}
                </span>
                <h2 id="node-modal-title" className="text-lg font-bold text-white tracking-wide">
                  {node.name}
                </h2>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-slate-200">
          {/* Tagline & Core Dilemma */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 bottom-0 w-1"
              style={{ backgroundColor: node.color }}
            />
            <p className="text-sm italic font-serif text-slate-300 leading-relaxed mb-2">
              "{node.tagline}"
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-start gap-2">
              <Compass className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-0.5">
                  Core Epistemic Dilemma
                </span>
                <p className="text-xs text-slate-300 leading-normal">
                  {node.coreDilemma}
                </p>
              </div>
            </div>
          </div>

          {/* Domain Manifesto */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Domain Manifesto
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {node.manifesto}
            </p>
          </div>

          {/* Provocative Questions */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              Questions That Demand Examination
            </h3>
            <div className="space-y-2.5">
              {node.provocativeQuestions.map((question, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 group"
                >
                  <p className="text-xs font-medium text-slate-200 leading-relaxed mb-2.5">
                    {question}
                  </p>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => handleCopyQuestion(question)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {copiedQuestion === question ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-300">Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In-depth Articles / Breakdowns */}
          {node.inDepthArticles.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Featured Intellectual Essays
              </h3>
              <div className="space-y-3">
                {node.inDepthArticles.map((article, idx) => {
                  const isExpanded = expandedArticleIdx === idx;
                  return (
                    <div 
                      key={idx}
                      className="rounded-xl border border-slate-800/90 bg-slate-900/40 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedArticleIdx(isExpanded ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-cyan-400 uppercase">
                              {article.readTime}
                            </span>
                          </div>
                          <h4 className="text-sm font-semibold text-white">
                            {article.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1">
                            {article.summary}
                          </p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-0 border-t border-slate-800/60 text-xs text-slate-300 space-y-3 bg-slate-950/40">
                          <p className="leading-relaxed font-light mt-3">
                            {article.fullText}
                          </p>
                          <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-cyan-200">
                            <span className="text-[10px] font-mono uppercase tracking-wider block text-cyan-400 mb-1">
                              Philosophical Takeaway
                            </span>
                            <p className="italic">{article.keyTakeaway}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Media References */}
          {node.mediaReferences.length > 0 && (
            <div className="space-y-3 pb-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                Curated Media & Primary Studies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {node.mediaReferences.map((ref, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase text-violet-400">
                        {ref.type}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {ref.durationOrPages}
                      </span>
                    </div>
                    <h5 className="text-xs font-semibold text-slate-200 mb-1">
                      {ref.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {ref.description}
                    </p>
                    <span className="text-[10px] text-slate-500 block mt-2 font-mono">
                      By {ref.creator}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Bar */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/80 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="btn-secondary text-xs w-full sm:w-auto"
          >
            ← Return to Orbit
          </button>
          <button
            onClick={() => handleCopyQuestion(node.provocativeQuestions[0])}
            className="btn-interchange text-xs w-full sm:w-auto"
          >
            <Copy className="w-3.5 h-3.5 text-cyan-400" />
            <span>{copiedQuestion === node.provocativeQuestions[0] ? '✓ Copied' : 'Copy Primary Inquiry'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
