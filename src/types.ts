export type EffectType = 'none' | 'snowflakes' | 'balloons';

export interface SnowflakeParticle {
  id: number;
  x: number;
  y: number;
  size: number; // 24 - 36 px (medium)
  speedY: number;
  speedX: number;
  wobbleSpeed: number;
  wobbleAngle: number;
  wobbleAmplitude: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  branches: number;
  patternType: number;
}

export interface BalloonParticle {
  id: number;
  x: number;
  y: number;
  width: number; // 38 - 46 px (medium)
  height: number; // 48 - 58 px (medium)
  speedY: number;
  wobbleSpeed: number;
  wobbleAngle: number;
  wobbleAmplitude: number;
  tiltAngle: number;
  primaryColor: string;
  highlightColor: string;
  shadowColor: string;
  stringColor: string;
  stringLength: number;
  stringWavePhase: number;
  opacity: number;
}

export interface ActiveEffectState {
  type: EffectType;
  startTime: number;
  durationMs: number; // 5000ms
  remainingMs: number;
  isActive: boolean;
}
