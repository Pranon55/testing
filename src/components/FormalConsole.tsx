import React from 'react';
import { Snowflake, CircleDot, Play, Timer, Sparkles, CheckCircle2 } from 'lucide-react';
import { EffectType } from '../types';

interface FormalConsoleProps {
  activeEffect: EffectType;
  remainingSeconds: number;
  totalDurationSeconds: number;
  onTriggerSnowflakes: () => void;
  onTriggerBalloons: () => void;
}

export const FormalConsole: React.FC<FormalConsoleProps> = ({
  activeEffect,
  remainingSeconds,
  totalDurationSeconds,
  onTriggerSnowflakes,
  onTriggerBalloons,
}) => {
  const isSnowflakesActive = activeEffect === 'snowflakes' && remainingSeconds > 0;
  const isBalloonsActive = activeEffect === 'balloons' && remainingSeconds > 0;
  const hasActiveEffect = isSnowflakesActive || isBalloonsActive;

  const progressPercent = hasActiveEffect
    ? Math.max(0, Math.min(100, (remainingSeconds / totalDurationSeconds) * 100))
    : 0;

  return (
    <div
      id="formal-console-card"
      className="relative w-full max-w-2xl mx-auto rounded-lg border border-amber-500/20 bg-slate-900/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl shadow-black/60"
    >
      {/* Corner ornamental brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400/50 rounded-tl-sm -mt-0.5 -ml-0.5" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400/50 rounded-tr-sm -mt-0.5 -mr-0.5" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400/50 rounded-bl-sm -mb-0.5 -ml-0.5" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400/50 rounded-br-sm -mb-0.5 -mr-0.5" />

      {/* Header section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-medium tracking-widest uppercase mb-3">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Ceremonial Display Sequence</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
          Atmospheric Control Interface
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
          Select an atmospheric protocol below to initiate a calibrated 5-second presentation across the screen.
        </p>
      </div>

      {/* The Two Primary Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {/* Snowflakes Button */}
        <button
          id="button-snowflakes"
          onClick={onTriggerSnowflakes}
          type="button"
          aria-label="Trigger Snowflakes Sequence"
          className={`group relative flex flex-col items-center justify-center p-6 rounded-md border text-center transition-all duration-200 cursor-pointer select-none overflow-hidden ${
            isSnowflakesActive
              ? 'border-sky-400/80 bg-gradient-to-b from-sky-950/60 to-slate-900/90 shadow-[0_0_25px_rgba(56,189,248,0.25)] ring-2 ring-sky-400/40'
              : 'border-slate-700/80 bg-slate-800/40 hover:bg-slate-800/80 hover:border-sky-400/40 hover:shadow-lg hover:shadow-sky-900/20 active:scale-[0.98]'
          }`}
        >
          {/* Subtle hover background highlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Icon frame */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${
              isSnowflakesActive
                ? 'bg-sky-500/20 text-sky-200 border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'bg-slate-800/90 text-sky-300 border border-slate-700 group-hover:border-sky-400/40 group-hover:text-sky-200'
            }`}
          >
            <Snowflake className={`w-7 h-7 ${isSnowflakesActive ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </div>

          <span className="text-lg font-semibold text-slate-100 group-hover:text-white font-display tracking-wide">
            Snowflakes
          </span>
          <span className="text-xs text-slate-400 mt-1">
            Top to bottom descent
          </span>

          <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-[11px] font-mono text-sky-300">
            {isSnowflakesActive ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                <span>ACTIVE · {remainingSeconds.toFixed(1)}s</span>
              </>
            ) : (
              <span>5.0s Sequence</span>
            )}
          </div>
        </button>

        {/* Balloons Button */}
        <button
          id="button-balloons"
          onClick={onTriggerBalloons}
          type="button"
          aria-label="Trigger Balloons Sequence"
          className={`group relative flex flex-col items-center justify-center p-6 rounded-md border text-center transition-all duration-200 cursor-pointer select-none overflow-hidden ${
            isBalloonsActive
              ? 'border-amber-400/80 bg-gradient-to-b from-amber-950/60 to-slate-900/90 shadow-[0_0_25px_rgba(245,158,11,0.25)] ring-2 ring-amber-400/40'
              : 'border-slate-700/80 bg-slate-800/40 hover:bg-slate-800/80 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-900/20 active:scale-[0.98]'
          }`}
        >
          {/* Subtle hover background highlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Icon frame */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${
              isBalloonsActive
                ? 'bg-amber-500/20 text-amber-200 border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-slate-800/90 text-amber-300 border border-slate-700 group-hover:border-amber-400/40 group-hover:text-amber-200'
            }`}
          >
            <CircleDot className={`w-7 h-7 ${isBalloonsActive ? 'animate-pulse' : ''}`} />
          </div>

          <span className="text-lg font-semibold text-slate-100 group-hover:text-white font-display tracking-wide">
            Balloons
          </span>
          <span className="text-xs text-slate-400 mt-1">
            Bottom to top ascent
          </span>

          <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-[11px] font-mono text-amber-300">
            {isBalloonsActive ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>ACTIVE · {remainingSeconds.toFixed(1)}s</span>
              </>
            ) : (
              <span>5.0s Sequence</span>
            )}
          </div>
        </button>
      </div>

      {/* Sequence Telemetry & Progress Panel */}
      <div
        id="sequence-telemetry-panel"
        className="rounded-md border border-slate-800 bg-slate-950/70 p-4 transition-all duration-300"
      >
        <div className="flex items-center justify-between text-xs mb-2.5">
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-wider font-semibold text-slate-400">
              Protocol Status:
            </span>
            {hasActiveEffect ? (
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {isSnowflakesActive ? 'Snowflakes Cascading' : 'Balloons Ascending'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                Standby Ready
              </span>
            )}
          </div>

          <div className="font-mono text-slate-300">
            {hasActiveEffect ? (
              <span className="text-amber-300 font-semibold">{remainingSeconds.toFixed(1)}s / 5.0s</span>
            ) : (
              <span className="text-slate-500">Duration: 5.0s</span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full transition-all duration-75 ${
              isSnowflakesActive
                ? 'bg-gradient-to-r from-sky-400 to-sky-200 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                : 'bg-gradient-to-r from-amber-500 to-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Technical telemetry specs */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
          <div>
            <span className="block text-slate-400 uppercase tracking-wider font-medium text-[10px]">Active Protocol</span>
            <span className="font-mono text-slate-200 capitalize">
              {hasActiveEffect ? activeEffect : 'None'}
            </span>
          </div>
          <div>
            <span className="block text-slate-400 uppercase tracking-wider font-medium text-[10px]">Vector Motion</span>
            <span className="font-mono text-slate-200">
              {isSnowflakesActive ? 'Top ↓ Bottom' : isBalloonsActive ? 'Bottom ↑ Top' : 'Stationary'}
            </span>
          </div>
          <div>
            <span className="block text-slate-400 uppercase tracking-wider font-medium text-[10px]">Particle Scale</span>
            <span className="font-mono text-slate-200">Medium</span>
          </div>
        </div>
      </div>
    </div>
  );
};
