import React, { useState, useEffect, useCallback } from 'react';
import { EffectType } from './types';
import { AtmosphereCanvas } from './components/AtmosphereCanvas';
import { FormalHeader } from './components/FormalHeader';
import { FormalConsole } from './components/FormalConsole';
import { FormalFooter } from './components/FormalFooter';

export default function App() {
  const [activeEffect, setActiveEffect] = useState<EffectType>('none');
  const [effectStartTime, setEffectStartTime] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const SEQUENCE_DURATION_SECONDS = 5;

  const handleTriggerSnowflakes = useCallback(() => {
    const now = Date.now();
    setActiveEffect('snowflakes');
    setEffectStartTime(now);
    setRemainingSeconds(SEQUENCE_DURATION_SECONDS);
    setIsActive(true);
  }, []);

  const handleTriggerBalloons = useCallback(() => {
    const now = Date.now();
    setActiveEffect('balloons');
    setEffectStartTime(now);
    setRemainingSeconds(SEQUENCE_DURATION_SECONDS);
    setIsActive(true);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - effectStartTime;
      const remaining = Math.max(0, SEQUENCE_DURATION_SECONDS * 1000 - elapsed) / 1000;
      setRemainingSeconds(remaining);

      if (elapsed >= SEQUENCE_DURATION_SECONDS * 1000) {
        setIsActive(false);
        setActiveEffect('none');
        setRemainingSeconds(0);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isActive, effectStartTime]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Formal atmospheric background layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle radial spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-amber-500/5 via-slate-800/10 to-transparent rounded-full blur-3xl opacity-70" />
        
        {/* Formal architectural grid watermark */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(217, 119, 6, 0.4) 1px, transparent 1px), radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />

        {/* Framing border hairlines */}
        <div className="absolute inset-4 sm:inset-8 border border-amber-500/10 pointer-events-none rounded-lg" />
      </div>

      {/* Real-time 60fps Particle Canvas for medium-sized Snowflakes and Balloons */}
      <AtmosphereCanvas
        effect={activeEffect}
        isActive={isActive}
        effectStartTime={effectStartTime}
      />

      {/* Top Formal Header */}
      <div className="relative z-10 w-full">
        <FormalHeader />
      </div>

      {/* Main Presentation Console Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <FormalConsole
          activeEffect={activeEffect}
          remainingSeconds={remainingSeconds}
          totalDurationSeconds={SEQUENCE_DURATION_SECONDS}
          onTriggerSnowflakes={handleTriggerSnowflakes}
          onTriggerBalloons={handleTriggerBalloons}
        />
      </main>

      {/* Bottom Formal Footer */}
      <div className="relative z-10 w-full">
        <FormalFooter />
      </div>
    </div>
  );
}
