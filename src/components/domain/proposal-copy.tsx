"use client";

import { ArrowRight, Copy, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { type CopyProposal } from "@/lib/data";

export function ProposalCopy({
  index,
  proposal,
}: {
  index: number;
  proposal: CopyProposal;
}) {
  const copyText = () => {
    const text = `${proposal.hook}\n\n${proposal.body}\n\n${proposal.tags.join(" ")}`;
    navigator.clipboard?.writeText(text);
    toast.success("Copy copiado al portapapeles");
  };

  return (
    <Card
      className="anim-rise p-4"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mb-2.5 flex items-center justify-between">
        <span className="label-mono">Copy {index + 1}</span>
        <div className="flex gap-1.5">
          <button
            onClick={() => toast("Variando copy…")}
            aria-label="Variar copy"
            className="grid h-7 w-7 place-items-center rounded-md border border-hair text-muted transition-colors hover:text-ink"
          >
            <RotateCw className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <button
            onClick={copyText}
            aria-label="Copiar copy"
            className="grid h-7 w-7 place-items-center rounded-md border border-hair text-muted transition-colors hover:text-ink"
          >
            <Copy className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
      <h4 className="serif text-[1.3rem] leading-tight text-ink">
        {proposal.hook}
      </h4>
      <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">
        {proposal.body}
      </p>
      <div className="mt-3.5 flex items-center justify-between">
        <div className="flex gap-2 font-mono text-[0.74rem]" style={{ color: "var(--brand)" }}>
          {proposal.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <button className="inline-flex items-center gap-1 font-mono text-[0.72rem] font-medium text-accent">
          {proposal.cta}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
    </Card>
  );
}
