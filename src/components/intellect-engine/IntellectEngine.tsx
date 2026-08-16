import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  HelpCircle, 
  BookOpen, 
  Scale, 
  ShieldAlert, 
  Edit3, 
  Check, 
  RotateCcw, 
  Terminal, 
  Layers,
  Settings
} from 'lucide-react';
import type { SocraticSynthesis } from '../../types';
import { CURATED_SOCRATIC_SYNTHESES, DEFAULT_FALLBACK_SYNTHESIS } from '../../data/intellectEnginePrompts';
import { ambientAudio } from '../../audio/ambientSynth';
import confetti from 'canvas-confetti';

interface IntellectEngineProps {
  initialQuery?: string;
}

export const IntellectEngine: React.FC<IntellectEngineProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [synthesis, setSynthesis] = useState<SocraticSynthesis | null>(CURATED_SOCRATIC_SYNTHESES['failure']);
  const [userConclusion, setUserConclusion] = useState<string>('');
  const [savedConclusion, setSavedConclusion] = useState<boolean>(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);
  const [customApiKey, setCustomApiKey] = useState<string>(() => localStorage.getItem('intellect_custom_gemini_key') || '');
  const [activeEngineMode, setActiveEngineMode] = useState<'curated' | 'live'>(customApiKey ? 'live' : 'curated');

  const samplePrompts = [
    'Why are students afraid of failure?',
    'Is our education system teaching knowledge or memorisation?',
    'Will AI make students smarter or more dependent?',
    'Does comfort kill human ambition?',
    'Can algorithmic curation ever allow true free will?',
    'Why is solitude so difficult for the modern mind?'
  ];

  const handleSynthesize = async (targetQuery?: string) => {
    const q = (targetQuery || query).trim();
    if (!q) return;

    setIsLoading(true);
    ambientAudio.playHarmonicChime(528, 'sine', 0.08);

    // 1. Try server backend proxy
    try {
      const serverRes = await fetch('/api/ai/socratic-synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      if (serverRes.ok) {
        const data = await serverRes.json();
        if (data?.synthesis) {
          setSynthesis(data.synthesis);
          setUserConclusion('');
          setSavedConclusion(false);
          setIsLoading(false);
          ambientAudio.playHarmonicChime(700, 'sine', 0.1);
          return;
        }
      }
    } catch {
      // Backend unreachable or offline, continue to client engine
    }

    // 2. Try direct client Gemini API key if configured
    if (activeEngineMode === 'live' && customApiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${customApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are the Socratic Intellect Engine for Intellect Interchange.co. 
Analyze this philosophical question deeply: "${q}".
You MUST respond strictly in valid JSON matching this schema:
{
  "question": "${q}",
  "semanticAnalysis": "Detailed analysis of what the question is truly asking and the hidden assumptions within it.",
  "perspectives": [
    { "lens": "Lens 1 (e.g. Sociological)", "framework": "Framework name", "argument": "Core argument", "critique": "Critique of this lens" },
    { "lens": "Lens 2 (e.g. Cognitive/Biological)", "framework": "Framework name", "argument": "Core argument", "critique": "Critique of this lens" },
    { "lens": "Lens 3 (e.g. Philosophical)", "framework": "Framework name", "argument": "Core argument", "critique": "Critique of this lens" }
  ],
  "empiricalEvidence": [
    { "context": "Empirical study or historical context", "finding": "Key finding", "caveat": "Limitation or nuance" }
  ],
  "counterArgument": {
    "coreChallenge": "Strongest challenge to the premise of the question",
    "blindSpot": "What is often overlooked"
  },
  "thingsToQuestion": [
    "First critical inquiry prompt for the user",
    "Second critical inquiry prompt for the user",
    "Third critical inquiry prompt for the user"
  ],
  "yourConclusionPrompt": "Socratic prompt challenging the user to formulate their own conclusion."
}
Return ONLY the raw JSON without markdown code fences.`
              }]
            }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanedText);
          setSynthesis(parsed);
          setUserConclusion('');
          setSavedConclusion(false);
          setIsLoading(false);
          ambientAudio.playHarmonicChime(700, 'sine', 0.1);
          return;
        }
      } catch (err) {
        console.warn('Direct Gemini API call failed, falling back to curated repository', err);
      }
    }

    // Fallback: Check curated Socratic knowledge database
    setTimeout(() => {
      const lower = q.toLowerCase();
      let matched: SocraticSynthesis = DEFAULT_FALLBACK_SYNTHESIS;

      if (lower.includes('fail') || lower.includes('mistake')) {
        matched = CURATED_SOCRATIC_SYNTHESES['failure'];
      } else if (lower.includes('memor') || lower.includes('teach') || lower.includes('school') || lower.includes('educat')) {
        matched = CURATED_SOCRATIC_SYNTHESES['memorisation'];
      } else if (lower.includes('ai') || lower.includes('machine') || lower.includes('depend') || lower.includes('smart')) {
        matched = CURATED_SOCRATIC_SYNTHESES['ai-thinking'];
      } else {
        matched = {
          ...DEFAULT_FALLBACK_SYNTHESIS,
          question: q,
          semanticAnalysis: `Deconstructing the inquiry: "${q}". The question interrogates how human experience, societal expectations, and cognitive structures intersect to form our assumptions.`,
        };
      }

      setSynthesis(matched);
      setUserConclusion('');
      setSavedConclusion(false);
      setIsLoading(false);
      ambientAudio.playHarmonicChime(700, 'sine', 0.1);
    }, 850);
  };

  const handleSavePersonalConclusion = () => {
    if (!userConclusion.trim()) return;
    setSavedConclusion(true);
    ambientAudio.playHarmonicChime(880, 'sine', 0.12);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f0ff', '#818cf8', '#ffffff']
    });
  };

  const handleSaveApiKey = () => {
    localStorage.setItem('intellect_custom_gemini_key', customApiKey.trim());
    if (customApiKey.trim()) {
      setActiveEngineMode('live');
    }
    setApiKeyModalOpen(false);
  };

  return (
    <section id="intellect-engine" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/40 text-[11px] font-mono uppercase tracking-widest text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            SOCRATIC AI SYNTHESIZER
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            THE INTELLECT ENGINE
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Unlike standard AI chatbots that deliver flat declarations, the Intellect Engine deconstructs 
            questions into perspectives, historical tensions, and counter-arguments so you can think for yourself.
          </p>
        </div>

        {/* Query Input Box */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.06)] space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSynthesize()}
                placeholder="Ask something worth thinking about..."
                className="glass-input w-full pl-12 pr-4 py-4 rounded-2xl text-sm sm:text-base font-sans placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleSynthesize()}
                disabled={isLoading || !query.trim()}
                className="btn-interchange w-full sm:w-auto py-4 px-7 text-xs sm:text-sm shrink-0 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Dissect Question</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setApiKeyModalOpen(true)}
                title="Configure Live Gemini AI API"
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sample Prompts Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 mr-1">
              Explore Questions:
            </span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(prompt);
                  handleSynthesize(prompt);
                }}
                className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800/80 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Prominent Socratic Banner Warning */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-violet-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 block">
                AI CAN PROVIDE PERSPECTIVES. YOU DECIDE WHAT TO BELIEVE.
              </span>
              <span className="text-[11px] text-slate-400 font-light">
                Intellect Interchange rejects uncritical algorithmic certainty. Every synthesis is a catalyst for your own discernment.
              </span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 px-3 py-1 rounded bg-slate-900/80 border border-slate-800 shrink-0">
            ENGINE: {activeEngineMode === 'live' && customApiKey ? 'LIVE GEMINI 1.5' : 'CURATED SOCRATIC REPOSITORY'}
          </div>
        </div>

        {/* 6-Part Structured Socratic Output */}
        {synthesis && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* 1. QUESTION — Semantic Analysis */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                <HelpCircle className="w-4 h-4" />
                <span>01. QUESTION ANALYSIS — What are we actually asking?</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                “{synthesis.question}”
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {synthesis.semanticAnalysis}
              </p>
            </div>

            {/* 2. PERSPECTIVES — Multiple Lenses */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-violet-400 text-xs font-mono uppercase tracking-widest">
                <Layers className="w-4 h-4" />
                <span>02. PERSPECTIVES — Different Ways of Understanding the Issue</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {synthesis.perspectives.map((p, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                      Lens: {p.lens}
                    </span>
                    <h4 className="text-xs font-bold text-white">{p.framework}</h4>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {p.argument}
                    </p>
                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono text-rose-400 uppercase block mb-0.5">
                        Inherent Critique
                      </span>
                      <p className="text-[11px] text-slate-400 italic">
                        {p.critique}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. EVIDENCE & EMPIRICAL CONTEXT */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest">
                <BookOpen className="w-4 h-4" />
                <span>03. EVIDENCE & EMPIRICAL CONTEXT</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {synthesis.empiricalEvidence.map((e, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-200 block">
                      {e.context}
                    </span>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {e.finding}
                    </p>
                    <span className="text-[11px] text-slate-500 font-mono block">
                      Nuance/Caveat: {e.caveat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. COUNTER-ARGUMENT & HIDDEN BLIND SPOTS */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/20 bg-rose-950/10 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-widest">
                <Scale className="w-4 h-4" />
                <span>04. COUNTER-ARGUMENT — What Challenges the Initial Assumption?</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-100 font-light leading-relaxed">
                {synthesis.counterArgument.coreChallenge}
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                <span className="text-[10px] font-mono uppercase text-amber-400 block mb-1">
                  Overlooked Blind Spot
                </span>
                {synthesis.counterArgument.blindSpot}
              </div>
            </div>

            {/* 5. THINGS TO QUESTION — Inquiry Prompts */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest">
                <ShieldAlert className="w-4 h-4" />
                <span>05. THINGS TO QUESTION — What Should You Investigate Further?</span>
              </div>

              <div className="space-y-2.5">
                {synthesis.thingsToQuestion.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                    <span className="text-xs font-mono text-amber-400 shrink-0 mt-0.5">0{idx + 1}.</span>
                    <p className="text-xs text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. YOUR CONCLUSION — Socratic Synthesis Prompt */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900/90 to-cyan-950/20 space-y-4 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase tracking-widest">
                <Edit3 className="w-4 h-4" />
                <span>06. YOUR CONCLUSION — Formulate Your Sovereign Stance</span>
              </div>

              <p className="text-xs sm:text-sm italic font-serif text-slate-300">
                {synthesis.yourConclusionPrompt}
              </p>

              <div className="space-y-3">
                <textarea
                  value={userConclusion}
                  onChange={(e) => setUserConclusion(e.target.value)}
                  placeholder="Articulate your own reasoned conclusion after reviewing these perspectives..."
                  rows={4}
                  className="glass-input w-full p-4 rounded-2xl text-xs sm:text-sm font-sans"
                />

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-mono text-slate-500">
                    {savedConclusion ? '✓ Reflection documented in local storage' : 'Write and solidify your independent viewpoint'}
                  </span>

                  <button
                    onClick={handleSavePersonalConclusion}
                    disabled={!userConclusion.trim()}
                    className="btn-interchange text-xs disabled:opacity-40"
                  >
                    {savedConclusion ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Solidify My Conclusion</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* API Key Configuration Modal */}
      {apiKeyModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <div className="w-full max-w-md glass-panel p-6 rounded-2xl border border-cyan-500/40 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-cyan-400" />
              Intellect Engine AI Settings
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Intellect Interchange comes with pre-loaded Socratic syntheses. If you have a personal Google Gemini API Key, you can enter it here to synthesize any arbitrary question in real-time.
            </p>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-slate-400 block">
                Gemini API Key (Stored only in your browser)
              </label>
              <input
                type="password"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="glass-input w-full p-3 rounded-xl text-xs font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setApiKeyModalOpen(false)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApiKey}
                className="btn-interchange text-xs"
              >
                Save & Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
