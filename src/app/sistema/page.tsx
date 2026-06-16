"use client";

import { Check, Pencil, X } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/chrome/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BrandMono } from "@/components/chrome/brand-selector";
import { useBrand } from "@/lib/brand-context";

export default function SistemaPage() {
  const { brand } = useBrand();

  const palette = [
    { name: "Ink", hex: brand.tokens.ink },
    { name: "Primario", hex: brand.tokens.primary },
    { name: "Acento", hex: brand.tokens.accent },
    { name: "Tint", hex: brand.tokens.tint },
    { name: "Paper", hex: brand.tokens.paper },
  ];

  const typeScale = [
    { label: "Display", sample: "Una lectura clara", cls: "serif text-[2.4rem] leading-none", spec: "Newsreader · 56 / 0.96" },
    { label: "Título", sample: "Cada detalle importa", cls: "serif text-[1.5rem] leading-tight", spec: "Newsreader · 24 / 1.1" },
    { label: "Cuerpo", sample: "El texto que la gente realmente lee, claro y cálido.", cls: "text-[0.98rem] leading-relaxed text-muted", spec: "Geist · 16 / 1.55" },
    { label: "Label", sample: "ETIQUETA · DATA · META", cls: "font-mono text-[0.74rem] uppercase tracking-[0.16em] text-faint", spec: "JetBrains Mono · 12" },
  ];

  return (
    <>
      <PageHeader
        eyebrow={`Sistema de diseño · ${brand.name}`}
        title={
          <>
            Los <em className="em-accent">tokens</em> de la marca
          </>
        }
        actions={
          <Button
            variant="outline"
            className="gap-1.5"
            onClick={() => toast("Modo edición de tokens")}
          >
            <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
            Editar
          </Button>
        }
      />

      <div className="flex flex-col gap-4">
        {/* Palette */}
        <Card className="p-6">
          <div className="label-mono mb-4">Paleta</div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {palette.map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <div
                  className="h-24 rounded-md border border-hair"
                  style={{ background: c.hex }}
                />
                <div>
                  <div className="text-[0.86rem] text-ink">{c.name}</div>
                  <div className="num font-mono text-[0.68rem] uppercase text-faint">
                    {c.hex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          {/* Type scale */}
          <Card className="p-6">
            <div className="label-mono mb-5">Escala tipográfica</div>
            <div className="flex flex-col divide-y divide-[var(--border)]">
              {typeScale.map((t) => (
                <div key={t.label} className="flex items-baseline justify-between gap-4 py-4 first:pt-0 last:pb-0">
                  <span className={`${t.cls} min-w-0 truncate text-ink`}>{t.sample}</span>
                  <span className="label-mono shrink-0 text-right text-[0.5rem]">{t.spec}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Logos */}
          <Card className="p-6">
            <div className="label-mono mb-5">Logos</div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-md border border-hair bg-bg p-5">
                <BrandMono brand={brand.brand} brand2={brand.brand2} mono={brand.mono} size={38} />
                <span className="serif text-[1.5rem] text-ink">{brand.name}</span>
              </div>
              <div
                className="flex items-center gap-3 rounded-md border border-hair p-5"
                style={{ background: brand.tokens.paper }}
              >
                <BrandMono brand={brand.brand} brand2={brand.brand2} mono={brand.mono} size={38} />
                <span className="serif text-[1.5rem]" style={{ color: brand.tokens.ink }}>
                  {brand.name}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Voice */}
        <Card className="p-6">
          <div className="label-mono mb-5">Voz / tono</div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-positive">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                Hacé
              </div>
              <ul className="flex flex-col gap-2.5">
                {brand.voice.do.map((v) => (
                  <li key={v} className="flex items-start gap-2.5 text-[0.9rem] text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" strokeWidth={2} />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent">
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                Evitá
              </div>
              <ul className="flex flex-col gap-2.5">
                {brand.voice.avoid.map((v) => (
                  <li key={v} className="flex items-start gap-2.5 text-[0.9rem] text-muted">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
