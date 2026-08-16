import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Radio, 
  Volume2, 
  VolumeX, 
  Disc,
  Play
} from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';

export const PodcastSection: React.FC = () => {
  const [isPlayingTeaser, setIsPlayingTeaser] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Real-time canvas equalizer waveform animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += isPlayingTeaser ? 0.08 : 0.02;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 48;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const distFromCenter = Math.abs(i - bars / 2) / (bars / 2);
        const baseHeight = (1 - distFromCenter * 0.6);
        const wave = Math.sin(time + i * 0.25) * 0.5 + 0.5;
        const wave2 = Math.cos(time * 1.5 + i * 0.4) * 0.3;
        const multiplier = isPlayingTeaser ? 1.8 : 0.7;
        const h = Math.max(6, (wave + wave2) * baseHeight * 70 * multiplier);

        const x = i * barWidth;
        const y = (canvas.height - h) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + h);
        if (isPlayingTeaser) {
          grad.addColorStop(0, '#00f0ff');
          grad.addColorStop(0.5, '#818cf8');
          grad.addColorStop(1, '#a855f7');
        } else {
          grad.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
          grad.addColorStop(1, 'rgba(129, 140, 248, 0.2)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x + 2, y, barWidth - 4, h, 3);
        ctx.fill();
      }
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlayingTeaser]);

  const handleToggleTeaser = () => {
    setIsPlayingTeaser(!isPlayingTeaser);
    ambientAudio.playHarmonicChime(600, 'sine', 0.08);
  };

  return (
    <section id="podcast" className="relative py-28 px-4 sm:px-6 z-20 bg-slate-950/90 overflow-hidden border-t border-slate-900">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/40 text-violet-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Radio className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
            <span>PODCAST • COMING SOON</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            INTELLECT INTERCHANGE PODCAST
          </h2>

          <p className="text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-cyan-200 to-white font-medium">
            Conversations beyond the classroom.
          </p>
        </div>

        {/* 3D Audio Visualizer Studio Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-violet-500/30 relative overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.1)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Studio Microphone Visual */}
            <div className="lg:col-span-5 space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-violet-900/50 via-slate-900 to-cyan-950/50 border border-violet-500/40 flex items-center justify-center text-violet-300 shadow-[0_0_40px_rgba(168,85,247,0.3)] relative group">
                <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-300 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-violet-600/90 text-white font-mono text-[9px] uppercase font-bold tracking-widest">
                  AUDIO
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  COMING SOON
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 leading-relaxed">
                  A dedicated audio space exploring deep ideas, technological shifts, cognitive depth, and the authentic lived reality of students.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleToggleTeaser}
                  className="btn-interchange text-xs py-3 px-5 flex items-center gap-2"
                >
                  {isPlayingTeaser ? (
                    <>
                      <VolumeX className="w-4 h-4 text-cyan-400" />
                      <span>Pause Spectrum</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-cyan-400" />
                      <span>Preview Studio Tone</span>
                    </>
                  )}
                </button>

                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Disc className={`w-4 h-4 text-violet-400 ${isPlayingTeaser ? 'animate-spin' : ''}`} />
                  <span>Binaural Soundscape</span>
                </div>
              </div>
            </div>

            {/* Right: Waveform Canvas */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-violet-300 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                    STUDIO FREQUENCY SPECTRUM
                  </span>
                  <span className="text-slate-500">
                    {isPlayingTeaser ? 'TRANSMITTING • 48.0 kHz' : 'STANDBY'}
                  </span>
                </div>

                <canvas
                  ref={canvasRef}
                  width={600}
                  height={110}
                  className="w-full h-24 rounded-xl bg-slate-950/90 border border-slate-800/80"
                />

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span>20 Hz</span>
                  <span>1.2 kHz Vocal Core</span>
                  <span>20 kHz</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
