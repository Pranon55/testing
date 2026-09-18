import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const FormalFooter: React.FC = () => {
  return (
    <footer id="formal-footer" className="w-full border-t border-slate-800/80 bg-slate-950/60 py-4 px-6 text-center text-xs text-slate-400">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-amber-500/70" />
          <span>Formal Atmosphere Presentation Console</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
          <span>SEQUENCE TIMER: 5.0s</span>
          <span>•</span>
          <span>CALIBRATION: ACTIVE</span>
        </div>
      </div>
    </footer>
  );
};
