import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Plus, 
  ThumbsUp, 
  MessageSquare, 
  Search, 
  X, 
  Send,
  HelpCircle
} from 'lucide-react';
import type { IdeaQuestion, NodeCategory } from '../../types';
import { INITIAL_IDEAS_QUESTIONS } from '../../data/ideasLabInitialQuestions';
import { ambientAudio } from '../../audio/ambientSynth';
import { QuestionGalaxy3D } from './QuestionGalaxy3D';
import confetti from 'canvas-confetti';

interface IdeasLabProps {
  onInquireInEngine: (question: string) => void;
}

export const IdeasLabSection: React.FC<IdeasLabProps> = ({ onInquireInEngine }) => {
  const [questions, setQuestions] = useState<IdeaQuestion[]>(() => {
    const saved = localStorage.getItem('intellect_ideas_questions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_IDEAS_QUESTIONS;
      }
    }
    return INITIAL_IDEAS_QUESTIONS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [showCosmos3D, setShowCosmos3D] = useState<boolean>(true);
  const [submitModalOpen, setSubmitModalOpen] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<IdeaQuestion | null>(null);

  // New question form state
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newCategory, setNewCategory] = useState<NodeCategory>('education');
  const [newTags, setNewTags] = useState<string>('Student Voice, Inquiry');

  // New perspective on active question state
  const [newPerspectiveText, setNewPerspectiveText] = useState<string>('');
  const [newPerspectiveAuthor, setNewPerspectiveAuthor] = useState<string>('');

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('intellect_ideas_questions', JSON.stringify(questions));
  }, [questions]);

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q))
    );
    if (activeQuestion && activeQuestion.id === id) {
      setActiveQuestion((prev) => (prev ? { ...prev, upvotes: prev.upvotes + 1 } : null));
    }
    ambientAudio.playHarmonicChime(720, 'sine', 0.06);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: IdeaQuestion = {
      id: `idea-${Date.now()}`,
      text: newQuestionText.trim(),
      category: newCategory,
      author: newAuthor.trim() || 'Anonymous Student Thinker',
      submittedAt: 'Just now',
      upvotes: 1,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      perspectives: []
    };

    setQuestions([newQ, ...questions]);
    setNewQuestionText('');
    setNewAuthor('');
    setSubmitModalOpen(false);
    ambientAudio.playHarmonicChime(880, 'sine', 0.1);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00f0ff', '#38bdf8', '#ffffff']
    });
  };

  const handleAddPerspective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuestion || !newPerspectiveText.trim()) return;

    const newP = {
      id: `p-${Date.now()}`,
      author: newPerspectiveAuthor.trim() || 'Student Contributor',
      text: newPerspectiveText.trim(),
      timestamp: 'Just now',
      upvotes: 1
    };

    const updatedQ = {
      ...activeQuestion,
      perspectives: [...activeQuestion.perspectives, newP]
    };

    setQuestions((prev) =>
      prev.map((q) => (q.id === activeQuestion.id ? updatedQ : q))
    );
    setActiveQuestion(updatedQ);
    setNewPerspectiveText('');
    setNewPerspectiveAuthor('');
    ambientAudio.playHarmonicChime(640, 'sine', 0.08);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesCat = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch =
      q.text.toLowerCase().includes(searchFilter.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="ideas-lab" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950/80">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-950/40 border border-violet-500/40 text-[11px] font-mono uppercase tracking-widest text-violet-300">
            <HelpCircle className="w-3.5 h-3.5" />
            THE STUDENT INQUIRY REPOSITORY
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            WHAT SHOULD WE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-cyan-200 to-white">
              BE ASKING?
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Society rewards those who have fast answers. True innovation begins with those who have 
            the audacity to formulate better questions.
          </p>
        </div>

        {/* Action Controls & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search inquiries or tags..."
              className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-xs"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {['all', 'education', 'ai-tech', 'student-reality', 'society', 'psychology'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode & Submit Button */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setShowCosmos3D(!showCosmos3D)}
              className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
                showCosmos3D
                  ? 'bg-violet-950/80 border-violet-400 text-violet-300 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {showCosmos3D ? '★ 3D Cosmos Mode' : '☷ Grid View'}
            </button>

            <button
              onClick={() => {
                setSubmitModalOpen(true);
                ambientAudio.playHarmonicChime(500, 'sine', 0.05);
              }}
              className="btn-interchange text-xs py-2.5 px-5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Question</span>
            </button>
          </div>
        </div>

        {/* 3D Question Galaxy Cosmos View */}
        {showCosmos3D && (
          <QuestionGalaxy3D
            questions={filteredQuestions}
            onSelectQuestion={(q) => {
              setActiveQuestion(q);
              ambientAudio.playHarmonicChime(550, 'sine', 0.05);
            }}
          />
        )}

        {/* Questions Grid / Cosmos Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              onClick={() => {
                setActiveQuestion(q);
                ambientAudio.playHarmonicChime(550, 'sine', 0.05);
              }}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between cursor-pointer space-y-4 group relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                    {q.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {q.submittedAt}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                  “{q.text}”
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {q.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-800/80">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Author, Upvotes & Perspectives count */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-light truncate max-w-[140px]">
                  {q.author}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleUpvote(q.id, e)}
                    className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 font-mono transition-colors p-1"
                    title="Upvote inquiry"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{q.upvotes}</span>
                  </button>

                  <div className="flex items-center gap-1 text-slate-400 font-mono">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{q.perspectives.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit New Question Modal */}
      {submitModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSubmitModalOpen(false);
          }}
        >
          <div className="w-full max-w-lg glass-panel rounded-2xl border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
                  Ideas Lab
                </span>
                <h3 className="text-lg font-bold text-white">
                  Formulate a Question Worth Asking
                </h3>
              </div>
              <button
                onClick={() => setSubmitModalOpen(false)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  The Core Question *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="e.g. Is our definition of academic success preventing genuine intellectual courage?"
                  className="glass-input w-full p-3 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">
                    Domain Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as NodeCategory)}
                    className="glass-input w-full p-2.5 rounded-xl text-xs bg-slate-900"
                  >
                    <option value="education">Education</option>
                    <option value="ai-tech">AI & Technology</option>
                    <option value="student-reality">Student Reality</option>
                    <option value="society">Society</option>
                    <option value="psychology">Psychology</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    <option value="future">Future</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">
                    Your Name / Academic Role
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Tara M., 2nd Yr Philosophy"
                    className="glass-input w-full p-2.5 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Pedagogy, Curiosity, Systems"
                  className="glass-input w-full p-2.5 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSubmitModalOpen(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-interchange text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Publish to Universe</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Question Details & Perspectives Discussion Modal */}
      {activeQuestion && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveQuestion(null);
          }}
        >
          <div className="w-full max-w-2xl max-h-[90vh] glass-panel rounded-2xl border border-violet-500/30 flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400 block mb-1">
                  Inquiry Dissection • {activeQuestion.category}
                </span>
                <h3 className="text-lg font-bold text-white">
                  “{activeQuestion.text}”
                </h3>
              </div>
              <button
                onClick={() => setActiveQuestion(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content & Perspectives */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <span className="text-slate-400">
                  Formulated by <span className="text-white font-medium">{activeQuestion.author}</span> ({activeQuestion.submittedAt})
                </span>
                <button
                  onClick={(e) => handleUpvote(activeQuestion.id, e)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{activeQuestion.upvotes} Upvotes</span>
                </button>
              </div>

              {/* Fast shortcut to Intellect Engine */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between gap-4">
                <div className="text-xs text-cyan-200 font-light">
                  Want a comprehensive 6-part philosophical synthesis of this question?
                </div>
                <button
                  onClick={() => {
                    onInquireInEngine(activeQuestion.text);
                    setActiveQuestion(null);
                  }}
                  className="btn-interchange text-xs shrink-0 py-2 px-3"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Inquire in Engine</span>
                </button>
              </div>

              {/* Existing Perspectives */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Student Perspectives ({activeQuestion.perspectives.length})
                </h4>

                {activeQuestion.perspectives.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                    No student perspectives recorded yet. Be the first to contribute a viewpoint below.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {activeQuestion.perspectives.map((p) => (
                      <div key={p.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span className="text-cyan-300">{p.author}</span>
                          <span>{p.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-200 font-light leading-relaxed">
                          {p.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Perspective Form */}
              <form onSubmit={handleAddPerspective} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  Add Your Perspective
                </h4>
                <input
                  type="text"
                  value={newPerspectiveAuthor}
                  onChange={(e) => setNewPerspectiveAuthor(e.target.value)}
                  placeholder="Your Name & Discipline (e.g. Neil, 1st Yr Economics)"
                  className="glass-input w-full p-2.5 rounded-xl text-xs"
                />
                <textarea
                  required
                  rows={2}
                  value={newPerspectiveText}
                  onChange={(e) => setNewPerspectiveText(e.target.value)}
                  placeholder="Contribute your philosophical argument or counter-perspective..."
                  className="glass-input w-full p-2.5 rounded-xl text-xs"
                />
                <div className="flex justify-end">
                  <button type="submit" className="btn-interchange text-xs py-2 px-4">
                    <Send className="w-3 h-3" />
                    <span>Publish Perspective</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
