import React from 'react';
import { Landmark, Sparkles } from 'lucide-react';

export const FormalHeader: React.FC = () => {
  return (
    <header id="formal-header" className="w-full border-b border-amber-500/20 bg-slate-950/80 backdrop-blur-md px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-sm border border-amber-500/40 bg-gradient-to-br from-amber-500/20 to-transparent flex items-center justify-center shadow-[0_0_15px_rgba(217,119,6,0.15)]">
            <Landmark className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-400/90 font-medium">
                Protocol Control
              </span>
              <span className="inline-block w-1 h-1 rounded-full bg-amber-500/60" />
              <span className="text-xs tracking-wider text-slate-400">Grand Hall Display</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100 font-display">
              Atmospheric Presentation Console
            </h1>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-right">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-sm border border-slate-800 bg-slate-900/60 text-xs text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-slate-300">HD 60 FPS ENGINE</span>
          </div>
        </div>
      </div>
    </header>
  );
};
