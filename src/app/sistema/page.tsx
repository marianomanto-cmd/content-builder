"use client";

import { useEffect, useState } from "react";
import { Check, Pencil, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/chrome/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BrandMono } from "@/components/chrome/brand-selector";
import { useBrand } from "@/lib/brand-context";
import { type BrandTokens } from "@/lib/brands";
import { cn } from "@/lib/utils";

const PALETTE_FIELDS: { key: keyof BrandTokens; label: string }[] = [
  { key: "ink", label: "Ink" },
  { key: "primary", label: "Primario" },
  { key: "accent", label: "Acento" },
  { key: "tint", label: "Tint" },
  { key: "paper", label: "Paper" },
];

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="relative block h-24 cursor-pointer overflow-hidden rounded-md border border-hair">
        <span className="absolute inset-0" style={{ background: value }} />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
      <div>
        <div className="text-[0.86rem] text-ink">{label}</div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="w-full bg-transparent font-mono text-[0.68rem] uppercase text-faint outline-none focus:text-ink"
        />
      </div>
    </div>
  );
}

function VoiceEditor({
  items,
  onChange,
  tone,
}: {
  items: string[];
  onChange: (v: string[]) => void;
  tone: "positive" | "accent";
}) {
  const color = tone === "positive" ? "text-positive" : "text-accent";
  const Icon = tone === "positive" ? Check : X;
  return (
    <ul className="flex flex-col gap-2">
      {items.map((v, i) => (
        <li key={i} className="flex items-center gap-2.5">
          <Icon className={cn("h-4 w-4 shrink-0", color)} strokeWidth={2} />
          <input
            value={v}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="flex-1 rounded-md border border-hair bg-bg px-2.5 py-1.5 text-[0.88rem] text-ink outline-none focus:border-hair-strong"
          />
          <button
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            aria-label="Quitar"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-faint transition-colors hover:text-accent"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => onChange([...items, ""])}
          className="inline-flex items-center gap-1.5 rounded-md px-1 py-1 text-[0.8rem] text-muted transition-colors hover:text-ink"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          Agregar
        </button>
      </li>
    </ul>
  );
}

export default function SistemaPage() {
  const { brand, updateBrand } = useBrand();
  const [editing, setEditing] = useState(false);
  const [tokens, setTokens] = useState<BrandTokens>(brand.tokens);
  const [doList, setDoList] = useState<string[]>(brand.voice.do);
  const [avoidList, setAvoidList] = useState<string[]>(brand.voice.avoid);

  // Reset any in-progress edit when switching brand
  useEffect(() => {
    setEditing(false);
  }, [brand.id]);

  const startEdit = () => {
    setTokens(brand.tokens);
    setDoList(brand.voice.do);
    setAvoidList(brand.voice.avoid);
    setEditing(true);
  };

  const save = () => {
    updateBrand(brand.id, {
      tokens,
      brand: tokens.accent,
      brand2: tokens.primary,
      voice: {
        do: doList.map((s) => s.trim()).filter(Boolean),
        avoid: avoidList.map((s) => s.trim()).filter(Boolean),
      },
    });
    setEditing(false);
    toast.success(`Sistema de diseño de ${brand.name} actualizado`);
  };

  const palette = editing ? tokens : brand.tokens;

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
          editing ? (
            <>
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancelar
              </Button>
              <Button className="gap-1.5" onClick={save}>
                <Check className="h-4 w-4" strokeWidth={2.5} />
                Guardar
              </Button>
            </>
          ) : (
            <Button variant="outline" className="gap-1.5" onClick={startEdit}>
              <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
              Editar
            </Button>
          )
        }
      />

      <div className="flex flex-col gap-4">
        {/* Palette */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="label-mono">Paleta</span>
            {editing && (
              <span className="label-mono text-[0.5rem] text-accent">Editando</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {PALETTE_FIELDS.map(({ key, label }) =>
              editing ? (
                <ColorField
                  key={key}
                  label={label}
                  value={tokens[key]}
                  onChange={(v) => setTokens((t) => ({ ...t, [key]: v }))}
                />
              ) : (
                <div key={key} className="flex flex-col gap-2">
                  <div className="h-24 rounded-md border border-hair" style={{ background: palette[key] }} />
                  <div>
                    <div className="text-[0.86rem] text-ink">{label}</div>
                    <div className="num font-mono text-[0.68rem] uppercase text-faint">
                      {palette[key]}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
          {editing && (
            <p className="mt-4 text-[0.78rem] text-faint">
              <span className="text-accent">Acento</span> y{" "}
              <span className="text-accent">Primario</span> recolorean toda la app
              de {brand.name} al instante.
            </p>
          )}
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
                style={{ background: palette.paper }}
              >
                <BrandMono brand={brand.brand} brand2={brand.brand2} mono={brand.mono} size={38} />
                <span className="serif text-[1.5rem]" style={{ color: palette.ink }}>
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
              {editing ? (
                <VoiceEditor items={doList} onChange={setDoList} tone="positive" />
              ) : (
                <ul className="flex flex-col gap-2.5">
                  {brand.voice.do.map((v) => (
                    <li key={v} className="flex items-start gap-2.5 text-[0.9rem] text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" strokeWidth={2} />
                      {v}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent">
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                Evitá
              </div>
              {editing ? (
                <VoiceEditor items={avoidList} onChange={setAvoidList} tone="accent" />
              ) : (
                <ul className="flex flex-col gap-2.5">
                  {brand.voice.avoid.map((v) => (
                    <li key={v} className="flex items-start gap-2.5 text-[0.9rem] text-muted">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                      {v}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
