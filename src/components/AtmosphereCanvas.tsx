import React, { useEffect, useRef } from 'react';
import { EffectType, SnowflakeParticle, BalloonParticle } from '../types';

interface AtmosphereCanvasProps {
  effect: EffectType;
  isActive: boolean;
  effectStartTime: number;
}

const BALLOON_PALETTES = [
  {
    name: 'Imperial Burgundy',
    primary: '#7f1d1d',
    highlight: 'rgba(254, 202, 202, 0.65)',
    shadow: '#450a0a',
    string: 'rgba(254, 226, 226, 0.7)',
  },
  {
    name: 'Midnight Navy',
    primary: '#1e3a8a',
    highlight: 'rgba(191, 219, 254, 0.7)',
    shadow: '#0f172a',
    string: 'rgba(219, 234, 254, 0.7)',
  },
  {
    name: 'Champagne Gold',
    primary: '#b45309',
    highlight: 'rgba(254, 240, 138, 0.75)',
    shadow: '#78350f',
    string: 'rgba(254, 243, 199, 0.75)',
  },
  {
    name: 'Regal Emerald',
    primary: '#065f46',
    highlight: 'rgba(167, 243, 208, 0.65)',
    shadow: '#022c22',
    string: 'rgba(209, 250, 229, 0.7)',
  },
  {
    name: 'Royal Amethyst',
    primary: '#581c87',
    highlight: 'rgba(233, 213, 255, 0.7)',
    shadow: '#2e1065',
    string: 'rgba(243, 232, 255, 0.7)',
  },
  {
    name: 'Platinum Silver',
    primary: '#475569',
    highlight: 'rgba(255, 255, 255, 0.85)',
    shadow: '#1e293b',
    string: 'rgba(226, 232, 240, 0.8)',
  },
  {
    name: 'Rose Quartz',
    primary: '#9d174d',
    highlight: 'rgba(251, 207, 232, 0.7)',
    shadow: '#500724',
    string: 'rgba(252, 231, 243, 0.7)',
  },
];

export const AtmosphereCanvas: React.FC<AtmosphereCanvasProps> = ({
  effect,
  isActive,
  effectStartTime,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snowflakesRef = useRef<SnowflakeParticle[]>([]);
  const balloonsRef = useRef<BalloonParticle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnTimeRef = useRef<number>(0);
  const nextParticleIdRef = useRef<number>(1);

  // Reset or initialize particles when effect changes
  useEffect(() => {
    snowflakesRef.current = [];
    balloonsRef.current = [];
    lastSpawnTimeRef.current = 0;
  }, [effectStartTime, effect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const spawnSnowflake = (startY?: number): SnowflakeParticle => {
      const size = 26 + Math.random() * 10; // Medium size: ~26-36px
      return {
        id: nextParticleIdRef.current++,
        x: Math.random() * width,
        y: startY !== undefined ? startY : -40 - Math.random() * 30,
        size,
        speedY: (height / 3.8) * (0.8 + Math.random() * 0.4) / 60, // Falls smoothly across the screen within ~4s
        speedX: (Math.random() - 0.5) * 0.6,
        wobbleSpeed: 0.03 + Math.random() * 0.04,
        wobbleAngle: Math.random() * Math.PI * 2,
        wobbleAmplitude: 15 + Math.random() * 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.85 + Math.random() * 0.15,
        branches: 6,
        patternType: Math.floor(Math.random() * 3),
      };
    };

    const spawnBalloon = (startY?: number): BalloonParticle => {
      const palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];
      const widthSize = 38 + Math.random() * 8; // Medium size: ~38-46px width
      const heightSize = widthSize * (1.25 + Math.random() * 0.15); // ~48-58px height
      return {
        id: nextParticleIdRef.current++,
        x: Math.random() * (width - 100) + 50,
        y: startY !== undefined ? startY : height + 60 + Math.random() * 40,
        width: widthSize,
        height: heightSize,
        speedY: -(height / 3.6) * (0.85 + Math.random() * 0.35) / 60, // Floats from bottom to top within ~3.8s
        wobbleSpeed: 0.035 + Math.random() * 0.035,
        wobbleAngle: Math.random() * Math.PI * 2,
        wobbleAmplitude: 12 + Math.random() * 18,
        tiltAngle: (Math.random() - 0.5) * 0.1,
        primaryColor: palette.primary,
        highlightColor: palette.highlight,
        shadowColor: palette.shadow,
        stringColor: palette.string,
        stringLength: 32 + Math.random() * 14,
        stringWavePhase: Math.random() * Math.PI * 2,
        opacity: 0.9 + Math.random() * 0.1,
      };
    };

    // Draw single snowflake crystal with formal geometric branches
    const drawSnowflake = (sf: SnowflakeParticle, currentAlpha: number) => {
      ctx.save();
      ctx.translate(sf.x + Math.sin(sf.wobbleAngle) * sf.wobbleAmplitude, sf.y);
      ctx.rotate(sf.rotation);
      ctx.globalAlpha = sf.opacity * currentAlpha;

      const r = sf.size / 2;

      // Soft icy crystalline glow
      const glow = ctx.createRadialGradient(0, 0, 1, 0, 0, r * 1.3);
      glow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      glow.addColorStop(0.5, 'rgba(224, 242, 254, 0.75)');
      glow.addColorStop(1, 'rgba(186, 230, 253, 0)');

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Crystalline arms
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.75;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 4;

      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);

        // Main arm
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r);
        ctx.stroke();

        // Branch 1 (outer chevron)
        const b1Y = -r * 0.65;
        const b1Len = r * 0.35;
        ctx.beginPath();
        ctx.moveTo(0, b1Y);
        ctx.lineTo(-b1Len * 0.7, b1Y - b1Len * 0.7);
        ctx.moveTo(0, b1Y);
        ctx.lineTo(b1Len * 0.7, b1Y - b1Len * 0.7);
        ctx.stroke();

        // Branch 2 (inner chevron)
        const b2Y = -r * 0.38;
        const b2Len = r * 0.25;
        ctx.beginPath();
        ctx.moveTo(0, b2Y);
        ctx.lineTo(-b2Len * 0.7, b2Y - b2Len * 0.7);
        ctx.moveTo(0, b2Y);
        ctx.lineTo(b2Len * 0.7, b2Y - b2Len * 0.7);
        ctx.stroke();

        // Arm tip crystal point
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, -r, 1.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Central hexagonal core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const hx = Math.cos(angle) * (r * 0.22);
        const hy = Math.sin(angle) * (r * 0.22);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fill();

      // Delicate inner sapphire/ice point
      ctx.fillStyle = '#bae6fd';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Draw single 3D shaded balloon with tied knot and wavy silk string
    const drawBalloon = (b: BalloonParticle, currentAlpha: number) => {
      ctx.save();
      const posX = b.x + Math.sin(b.wobbleAngle) * b.wobbleAmplitude;
      const posY = b.y;
      const tilt = b.tiltAngle + Math.cos(b.wobbleAngle) * 0.08;

      ctx.translate(posX, posY);
      ctx.rotate(tilt);
      ctx.globalAlpha = b.opacity * currentAlpha;

      const halfW = b.width / 2;
      const halfH = b.height / 2;

      // Drop shadow for depth
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 6;

      // Balloon body shape using bezier curve
      ctx.beginPath();
      ctx.moveTo(0, -halfH); // Top center
      // Right curve to bottom
      ctx.bezierCurveTo(halfW * 1.05, -halfH, halfW * 1.05, halfH * 0.4, halfW * 0.25, halfH * 0.95);
      // Knot neck right to center bottom
      ctx.lineTo(halfW * 0.15, halfH);
      ctx.lineTo(-halfW * 0.15, halfH);
      // Left curve back to top
      ctx.lineTo(-halfW * 0.25, halfH * 0.95);
      ctx.bezierCurveTo(-halfW * 1.05, halfH * 0.4, -halfW * 1.05, -halfH, 0, -halfH);
      ctx.closePath();

      // 3D Spherical Volume Gradient
      const grad = ctx.createRadialGradient(
        -halfW * 0.35,
        -halfH * 0.4,
        b.width * 0.1,
        0,
        0,
        b.height * 0.75
      );
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.18, b.highlightColor);
      grad.addColorStop(0.65, b.primaryColor);
      grad.addColorStop(1, b.shadowColor);

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      // Specular reflection highlight on top-left
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(-halfW * 0.38, -halfH * 0.42, halfW * 0.25, halfH * 0.18, -Math.PI / 4.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.fill();
      ctx.restore();

      // Tied Knot at bottom
      const knotY = halfH;
      ctx.fillStyle = b.shadowColor;
      ctx.beginPath();
      ctx.moveTo(-halfW * 0.18, knotY);
      ctx.lineTo(halfW * 0.18, knotY);
      ctx.lineTo(halfW * 0.22, knotY + 4.5);
      ctx.lineTo(0, knotY + 3.5);
      ctx.lineTo(-halfW * 0.22, knotY + 4.5);
      ctx.closePath();
      ctx.fill();

      // Dangling wavy silk ribbon / string
      ctx.save();
      ctx.strokeStyle = b.stringColor;
      ctx.lineWidth = 1.3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, knotY + 4);

      const strLen = b.stringLength;
      const wave = Math.sin(b.stringWavePhase + posY * 0.05) * 6;
      const wave2 = Math.cos(b.stringWavePhase + posY * 0.08) * 8;

      ctx.bezierCurveTo(
        wave,
        knotY + strLen * 0.33,
        -wave2,
        knotY + strLen * 0.66,
        wave * 0.5,
        knotY + strLen
      );
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    };

    const renderLoop = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      const elapsedSinceStart = now - effectStartTime;
      const isWithin5Seconds = isActive && elapsedSinceStart >= 0 && elapsedSinceStart <= 5000;

      // Calculate global fade alpha for clean ending at 5.0 seconds
      // Fades out gently during the last 400ms of the 5-second window
      let effectAlpha = 1;
      if (elapsedSinceStart > 4600 && elapsedSinceStart <= 5000) {
        effectAlpha = Math.max(0, (5000 - elapsedSinceStart) / 400);
      } else if (elapsedSinceStart > 5000) {
        effectAlpha = 0;
      }

      // Spawning logic: active for 5 seconds
      if (isWithin5Seconds && effectAlpha > 0.05) {
        // Continuous spawn
        if (timestamp - lastSpawnTimeRef.current > 110) {
          lastSpawnTimeRef.current = timestamp;
          if (effect === 'snowflakes') {
            // Spawn 2-3 flakes per tick for a majestic snowfall
            snowflakesRef.current.push(spawnSnowflake());
            snowflakesRef.current.push(spawnSnowflake());
            if (Math.random() > 0.4) {
              snowflakesRef.current.push(spawnSnowflake());
            }
          } else if (effect === 'balloons') {
            // Spawn 1-2 balloons per tick for a grand ascension
            balloonsRef.current.push(spawnBalloon());
            if (Math.random() > 0.5) {
              balloonsRef.current.push(spawnBalloon());
            }
          }
        }
      }

      // Render Snowflakes
      if (effect === 'snowflakes' && isWithin5Seconds) {
        for (let i = snowflakesRef.current.length - 1; i >= 0; i--) {
          const sf = snowflakesRef.current[i];
          sf.y += sf.speedY;
          sf.x += sf.speedX;
          sf.wobbleAngle += sf.wobbleSpeed;
          sf.rotation += sf.rotationSpeed;

          drawSnowflake(sf, effectAlpha);

          if (sf.y > height + 60) {
            snowflakesRef.current.splice(i, 1);
          }
        }
      }

      // Render Balloons
      if (effect === 'balloons' && isWithin5Seconds) {
        for (let i = balloonsRef.current.length - 1; i >= 0; i--) {
          const b = balloonsRef.current[i];
          b.y += b.speedY;
          b.wobbleAngle += b.wobbleSpeed;
          b.stringWavePhase += 0.08;

          drawBalloon(b, effectAlpha);

          if (b.y < -120) {
            balloonsRef.current.splice(i, 1);
          }
        }
      }

      if (isWithin5Seconds) {
        animationFrameRef.current = requestAnimationFrame(renderLoop);
      } else {
        // Clear canvas when sequence finished
        ctx.clearRect(0, 0, width, height);
      }
    };

    if (isActive && effect !== 'none') {
      // Initial burst of particles so the screen immediately displays falling snowflakes or rising balloons
      if (effect === 'snowflakes') {
        snowflakesRef.current = [];
        // Populate particles across upper half and top so the effect is instantly visibly cascading down
        for (let i = 0; i < 22; i++) {
          snowflakesRef.current.push(spawnSnowflake(Math.random() * (height * 0.45) - 30));
        }
      } else if (effect === 'balloons') {
        balloonsRef.current = [];
        // Populate particles across lower half and bottom so ascension starts immediately
        for (let i = 0; i < 16; i++) {
          balloonsRef.current.push(spawnBalloon(height - Math.random() * (height * 0.35)));
        }
      }
      animationFrameRef.current = requestAnimationFrame(renderLoop);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [effect, isActive, effectStartTime]);

  return (
    <canvas
      id="atmospheric-canvas"
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 w-full h-full"
    />
  );
};
