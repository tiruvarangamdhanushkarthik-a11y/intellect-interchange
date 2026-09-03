import React, { useEffect, useRef } from 'react';
import { Radio, Disc, Mic, User } from 'lucide-react';

export const PodcastSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Futuristic audio frequency spectrum visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.03;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 42;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const distFromCenter = Math.abs(i - bars / 2) / (bars / 2);
        const baseHeight = 1 - distFromCenter * 0.55;
        const wave = Math.sin(time + i * 0.28) * 0.5 + 0.5;
        const wave2 = Math.cos(time * 1.4 + i * 0.35) * 0.3;
        const h = Math.max(8, (wave + wave2) * baseHeight * 65);

        const x = i * barWidth;
        const y = (canvas.height - h) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + h);
        grad.addColorStop(0, '#34d399');
        grad.addColorStop(0.5, '#00f0ff');
        grad.addColorStop(1, '#818cf8');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x + 2, y, barWidth - 4, h, 3);
        ctx.fill();
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="podcast" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950/90 overflow-hidden border-t border-slate-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(52,211,153,0.2)]">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>PODCAST • COMING SOON</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            INTELLECT INTERCHANGE PODCAST
          </h2>

          <p className="text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-white font-medium">
            Real conversations. Real ideas. Real student perspectives.
          </p>
        </div>

        {/* Futuristic Audio Studio Showcase Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-emerald-500/30 relative overflow-hidden shadow-[0_0_60px_rgba(52,211,153,0.08)]">
          <div className="space-y-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.3)]">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                    STUDIO DISPATCHES
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                    Conversations Beyond the Classroom
                  </h3>
                </div>
              </div>

              {/* Host & Status Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[11px] font-mono text-cyan-300 uppercase tracking-wider font-bold">
                  <User className="w-3 h-3 text-cyan-400" />
                  HOST: T. DHANUSH KARTHIK
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-[11px] font-mono text-emerald-300 uppercase tracking-wider font-bold">
                  IN STUDIO PRODUCTION
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl">
              Hosted by <strong className="text-cyan-300 font-semibold">T. Dhanush Karthik</strong>, recording unscripted dialogues with engineering innovators, civil services mentors, 
              researchers, and students deconstructing industrial dogmas and exploring sovereign ideas.
            </p>

            {/* Spectrum Visualizer Canvas */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-emerald-300 flex items-center gap-1.5">
                  <Disc className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  AUDIO SPECTRUM CORE • HOSTED BY T. DHANUSH KARTHIK
                </span>
                <span className="text-slate-500">BINAURAL FREQUENCIES</span>
              </div>

              <canvas
                ref={canvasRef}
                width={600}
                height={90}
                className="w-full h-20 rounded-xl bg-slate-950/90 border border-slate-800/80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
