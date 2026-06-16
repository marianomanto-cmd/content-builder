"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Vortex } from "./vortex";

const STEPS = [
  "Assets cargados",
  "Componiendo imagen",
  "Generando copy",
  "Aplicando sistema de diseño",
];

export function GeneratingState({ count }: { count: number }) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setDone(i + 1), 450 + i * 540),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative grid min-h-[380px] place-items-center overflow-hidden rounded-xl border border-hair bg-surface">
      <div className="absolute inset-0">
        <Vortex density={150} intensity={1.35} />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 58% at 50% 50%, transparent, var(--bg) 94%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        <Eyebrow>Generando · Nano Banana Pro</Eyebrow>
        <p className="serif text-[1.8rem] italic leading-tight text-ink">
          Convergiendo {count} {count === 1 ? "propuesta" : "propuestas"}…
        </p>
        <div className="mt-1 flex flex-col gap-2.5 text-left">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3 text-[0.86rem]">
              {i < done ? (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-positive text-[#06120b]">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              ) : i === done ? (
                <span className="spinner h-5 w-5" />
              ) : (
                <span className="h-5 w-5 rounded-full border border-hair" />
              )}
              <span className={i <= done ? "text-ink" : "text-faint"}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
