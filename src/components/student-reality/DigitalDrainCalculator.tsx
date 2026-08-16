import React, { useState } from 'react';
import { Smartphone, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { ambientAudio } from '../../audio/ambientSynth';

export const DigitalDrainCalculator: React.FC = () => {
  const [dailyHours, setDailyHours] = useState<number>(6);

  const yearlyHours = dailyHours * 365;
  const yearlyDays = Math.round(yearlyHours / 24);
  const decadeYears = ((yearlyHours * 10) / (24 * 365)).toFixed(1);
  const booksLost = Math.round(yearlyHours / 6); // Avg 6 hours per deep book

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Smartphone className="w-4 h-4" />
          <span>Interactive Attention Drain Calculator</span>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Slide to inspect lifetime cost
        </span>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Daily Algorithmic Screen Time:</span>
          <span className="font-mono font-bold text-cyan-300 text-base">{dailyHours} Hours / Day</span>
        </div>
        <input
          type="range"
          min="1"
          max="14"
          step="0.5"
          value={dailyHours}
          onChange={(e) => {
            setDailyHours(parseFloat(e.target.value));
            ambientAudio.playHarmonicChime(300 + parseFloat(e.target.value) * 40, 'sine', 0.03);
          }}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>1 Hour (Mindful)</span>
          <span>7.5 Hours (Student Avg)</span>
          <span>14 Hours (Extreme Drain)</span>
        </div>
      </div>

      {/* Dynamic Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/90 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>Annual Time Siphon</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {yearlyDays} Days
          </div>
          <p className="text-[11px] text-slate-400">
            {yearlyHours.toLocaleString()} continuous hours lost every 12 months.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/90 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>10-Year Mortality Cost</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {decadeYears} Years
          </div>
          <p className="text-[11px] text-slate-400">
            Consecutive waking years of your 20s and 30s surrendered.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/90 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Great Works Unread</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            ~{booksLost} Books
          </div>
          <p className="text-[11px] text-slate-400">
            Foundational philosophical & scientific texts never explored.
          </p>
        </div>
      </div>
    </div>
  );
};
