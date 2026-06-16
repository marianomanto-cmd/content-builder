"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  ang: number;
  rad: number;
  speed: number;
  size: number;
}

/**
 * The convergence motif: dispersed signals spiral inward and ignite at an
 * incandescent core. Canvas-based, cheap, and honors reduced-motion.
 */
export function Vortex({
  className,
  density = 90,
  intensity = 1,
}: {
  className?: string;
  density?: number;
  intensity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let maxR = 1;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = w / 2;
      cy = h / 2;
      maxR = Math.hypot(w, h) * 0.55;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawn = (): Particle => ({
      ang: Math.random() * Math.PI * 2,
      rad: maxR * (0.55 + Math.random() * 0.7),
      speed: 0.003 + Math.random() * 0.006,
      size: 0.5 + Math.random() * 1.7,
    });
    const N = Math.round(density);
    const parts: Particle[] = Array.from({ length: N }, spawn);

    const drawCore = () => {
      const coreR = 22 * intensity;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3.2);
      g.addColorStop(0, "rgba(255,160,185,0.95)");
      g.addColorStop(0.28, "rgba(242,58,94,0.55)");
      g.addColorStop(1, "rgba(242,58,94,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,210,222,0.9)";
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 0.42, 0, Math.PI * 2);
      ctx.fill();
      // accretion streak
      ctx.strokeStyle = "rgba(255,125,155,0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - coreR * 2.4, cy);
      ctx.lineTo(cx + coreR * 2.4, cy);
      ctx.stroke();
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      drawCore();
      const coreR = 22 * intensity;
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        p.ang += p.speed * (1 + (1 - p.rad / maxR) * 3.2);
        p.rad -= p.rad * 0.006 + 0.2;
        if (p.rad < coreR * 0.5) Object.assign(p, spawn());
        const x = cx + Math.cos(p.ang) * p.rad;
        const y = cy + Math.sin(p.ang) * p.rad * 0.6;
        const a = Math.min(1, 1 - p.rad / maxR) * 0.7;
        const tail = p.rad * 0.06;
        ctx.strokeStyle = `rgba(244,241,234,${a * 0.55})`;
        ctx.lineWidth = p.size;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
          cx + Math.cos(p.ang - p.speed * 6) * (p.rad + tail),
          cy + Math.sin(p.ang - p.speed * 6) * (p.rad + tail) * 0.6,
        );
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0;
    const loop = () => {
      step();
      raf = requestAnimationFrame(loop);
    };
    if (reduce) {
      step();
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density, intensity]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("h-full w-full", className)}
    />
  );
}
