import React, { useState } from 'react';
import { 
  MessageCircle, 
  ExternalLink,
  Send,
  CheckCircle2,
  Sparkles,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';

export const StudioEnquirySection: React.FC = () => {
  const COMMUNITY_URL = "https://chat.whatsapp.com/CfovYK1W1r72DxPB8dpmia";

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    interest: 'General Inquiry / Community',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleJoinCommunity = () => {
    ambientAudio.playHarmonicChime(700, 'sine', 0.08);
    window.open(COMMUNITY_URL, '_blank', 'noopener,noreferrer');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    ambientAudio.playHarmonicChime(880, 'sine', 0.1);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-6 z-20 bg-slate-950 border-t border-white/[0.06] overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-slate-800/[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono uppercase tracking-[0.2em] text-slate-300">
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>CONNECT & ENQUIRY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            CONNECT WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-sky-200">
              THE STUDIO
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Join the verified WhatsApp community or submit an inquiry to collaborate on technology, 
            research, or feature as a guest on our podcast.
          </p>
        </div>

        {/* Dual Wing: WhatsApp Community + Studio Enquiry Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Wing A: Verified WhatsApp Community Portal */}
          <div className="lg:col-span-5 glass-studio p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                    INSTANT ACCESS
                  </span>
                  <span className="text-sm font-bold text-white font-mono">
                    OFFICIAL COMMUNITY
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white font-display uppercase tracking-tight">
                  JOIN OUR WHATSAPP COMMUNITY
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Join the Intellect Interchange community and stay connected with our conversations, 
                  updates and upcoming podcast announcements.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06] space-y-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2 text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Direct verified community link</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Active spaces for AI, VLSI, civil services, student mindset, and creative engineers.
                </p>
              </div>
            </div>

            <button
              onClick={handleJoinCommunity}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full font-mono text-xs uppercase tracking-wider font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-md transition-all hover:scale-[1.01] active:scale-95 shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current text-emerald-600" />
              <span>JOIN COMMUNITY</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>

          {/* Wing B: Studio Collaboration Enquiry Desk */}
          <div className="lg:col-span-7 glass-studio p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-sky-300 font-bold">
                  STUDIO COLLABORATION DESK
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Propose a Project, Research Paper, or Podcast Dialogue
              </h3>
              <p className="text-xs text-slate-400 font-light">
                Curated by T. Dhanush Karthik and the Intellect Interchange Collective.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Enquiry Received</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out to Intellect Interchange. Our studio desk will review your proposal and get in touch with you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 px-4 py-1.5 rounded-full text-xs font-mono text-slate-400 hover:text-white bg-white/5 border border-white/10"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Sharma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@university.edu"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Nature of Enquiry</label>
                  <select
                    value={formState.interest}
                    onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs bg-slate-900 text-slate-200"
                  >
                    <option value="Podcast Guest Application">Podcast Guest Proposal (Hosted by T. Dhanush Karthik)</option>
                    <option value="AI & Technology Collaboration">AI & Technology Engineering Collaboration</option>
                    <option value="Research & Whitepaper Submission">Research & Whitepaper Submission</option>
                    <option value="General Inquiry / Community">General Studio Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Your Message / Proposal</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Briefly describe what you are building, researching, or wish to discuss..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT STUDIO ENQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
