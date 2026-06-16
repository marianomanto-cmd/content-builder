"use client";

import { useMemo, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Play, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/chrome/page-header";
import { BrandTile } from "@/components/domain/brand-tile";
import { useBrand } from "@/lib/brand-context";
import {
  PLATFORM_LABEL,
  PLATFORM_VAR,
  type OutputKind,
  type Platform,
} from "@/lib/brands";
import { getOutputs, OUTPUT_GROUP_LABEL, type OutputItem } from "@/lib/data";
import { cn } from "@/lib/utils";

const KINDS: { id: OutputKind | "all"; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "image", label: "Imagen" },
  { id: "carousel", label: "Carrusel" },
  { id: "video", label: "Video" },
];

function OutputTile({ o }: { o: OutputItem }) {
  return (
    <div className="group flex flex-col gap-1.5">
      <BrandTile
        ratio={o.ratio}
        seed={o.id}
        video={o.kind === "video"}
        className="w-full transition-transform group-hover:-translate-y-0.5"
      >
        <span
          className="absolute left-2 top-2 z-10 h-2.5 w-2.5 rounded-full ring-2 ring-black/20"
          style={{ background: PLATFORM_VAR[o.platform] }}
          title={PLATFORM_LABEL[o.platform]}
        />
        {o.kind === "video" && (
          <span className="pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-200 group-hover:opacity-0">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm">
              <Play className="h-4 w-4 translate-x-px fill-white" strokeWidth={0} />
            </span>
          </span>
        )}
        <span className="absolute bottom-2 right-2 rounded bg-black/45 px-1.5 py-0.5 font-mono text-[0.5rem] text-white/90 backdrop-blur-sm">
          {o.ratio}
        </span>
      </BrandTile>
      <div>
        <div className="truncate text-[0.82rem] text-ink">{o.pillar}</div>
        <div className="label-mono text-[0.5rem]">{o.label}</div>
      </div>
    </div>
  );
}

export default function OutputsPage() {
  const { brand } = useBrand();
  const all = useMemo(() => getOutputs(brand), [brand]);
  const [kind, setKind] = useState<OutputKind | "all">("all");
  const [platform, setPlatform] = useState<Platform | "all">("all");

  const filtered = all.filter(
    (o) =>
      (kind === "all" || o.kind === kind) &&
      (platform === "all" || o.platform === platform),
  );
  const groups = ["hoy", "ayer", "semana"] as const;

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-all",
      active
        ? "border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-accent-soft text-accent"
        : "border-hair text-muted hover:border-hair-strong hover:text-ink",
    );

  return (
    <>
      <PageHeader
        eyebrow={`Outputs · ${brand.name}`}
        title={
          <>
            Todo lo <em className="em-accent">generado</em>
          </>
        }
      />

      <div className="mb-7 flex flex-wrap items-center gap-2">
        {KINDS.map((k) => (
          <button key={k.id} className={chip(kind === k.id)} onClick={() => setKind(k.id)}>
            {k.label}
          </button>
        ))}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={cn(
                "ml-1 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-all",
                platform === "all"
                  ? "border-hair text-muted hover:border-hair-strong hover:text-ink"
                  : "border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-accent-soft text-accent",
              )}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} />
              {platform === "all" ? "Red" : PLATFORM_LABEL[platform]}
              <ChevronDown className="h-3.5 w-3.5 opacity-70" strokeWidth={2} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="start"
              sideOffset={6}
              className="glass z-50 w-44 rounded-xl border border-hair-strong p-1.5 shadow-[var(--sh-pop)]"
            >
              {(["all", "instagram", "tiktok", "youtube", "x"] as const).map((p) => (
                <DropdownMenu.Item
                  key={p}
                  onSelect={() => setPlatform(p)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-[0.85rem] text-ink outline-none data-[highlighted]:bg-surface-2"
                >
                  {p !== "all" && (
                    <span className="h-2 w-2 rounded-full" style={{ background: PLATFORM_VAR[p] }} />
                  )}
                  {p === "all" ? "Todas las redes" : PLATFORM_LABEL[p]}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <div className="flex flex-col gap-9">
        {groups.map((g) => {
          const items = filtered.filter((o) => o.group === g);
          if (!items.length) return null;
          return (
            <section key={g}>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="serif text-[1.5rem] leading-none text-ink">
                  {OUTPUT_GROUP_LABEL[g].title}
                </h2>
                <span className="label-mono">{OUTPUT_GROUP_LABEL[g].date}</span>
                <span className="h-px flex-1 bg-[var(--border)]" />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((o) => (
                  <OutputTile key={o.id} o={o} />
                ))}
              </div>
            </section>
          );
        })}
        {!filtered.length && (
          <div className="grid place-items-center rounded-xl border border-hair bg-surface/60 py-20 text-center">
            <p className="label-mono">Sin outputs para este filtro</p>
          </div>
        )}
      </div>
    </>
  );
}
