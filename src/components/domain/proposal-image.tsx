"use client";

import { Check, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { BrandTile } from "./brand-tile";
import { type Ratio } from "@/lib/brands";

export function ProposalImage({
  index,
  ratio,
  format,
  seed,
}: {
  index: number;
  ratio: Ratio;
  format: string;
  seed: string;
}) {
  return (
    <div
      className="anim-rise group relative"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <BrandTile ratio={ratio} seed={seed} className="w-full">
        <span className="absolute left-2 top-2 rounded bg-black/45 px-1.5 py-0.5 font-mono text-[0.55rem] tracking-[0.08em] text-white/90 backdrop-blur-sm">
          {format} · #{index + 1}
        </span>
        <div className="absolute inset-x-2 bottom-2 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={() => toast("Variando propuesta…")}
            className="glass flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ink hover:border-hair-strong"
          >
            <RotateCw className="h-3.5 w-3.5" strokeWidth={2} />
            Variar
          </button>
          <button
            onClick={() => toast.success("Guardado en Outputs")}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-accent py-2 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-accent-ink shadow-[var(--glow-accent)]"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            Guardar
          </button>
        </div>
      </BrandTile>
    </div>
  );
}
