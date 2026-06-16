"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, LayoutGrid, List, Upload } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/chrome/page-header";
import { Button } from "@/components/ui/button";
import { AssetTile } from "@/components/domain/asset-tile";
import { DropZone } from "@/components/domain/drop-zone";
import { useBrand } from "@/lib/brand-context";
import { getAssets } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function BibliotecaPage() {
  const { brand } = useBrand();
  const assets = useMemo(() => getAssets(brand), [brand]);
  const [pillar, setPillar] = useState<string>("todos");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered =
    pillar === "todos" ? assets : assets.filter((a) => a.pillar === pillar);

  const chip = (active: boolean) =>
    cn(
      "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-all",
      active
        ? "border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-accent-soft text-accent"
        : "border-hair text-muted hover:border-hair-strong hover:text-ink",
    );

  return (
    <>
      <PageHeader
        eyebrow={`Biblioteca · ${brand.name}`}
        title={
          <>
            Assets por <em className="em-accent">pilar</em>
          </>
        }
        actions={
          <>
            <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-surface-2 px-3.5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
              <CheckCircle2 className="h-3.5 w-3.5 text-positive" strokeWidth={2} />
              Drive sincronizado · hace {brand.drive.lastSyncMin} min
            </span>
            <Button
              className="gap-1.5"
              onClick={() => toast("Subí archivos o pegá un link de Drive")}
            >
              <Upload className="h-4 w-4" strokeWidth={2} />
              Subir
            </Button>
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button className={chip(pillar === "todos")} onClick={() => setPillar("todos")}>
          Todos
          <span className="num text-[0.7rem] opacity-70">{assets.length}</span>
        </button>
        {brand.pillars.map((p) => (
          <button
            key={p.id}
            className={chip(pillar === p.name)}
            onClick={() => setPillar(p.name)}
          >
            {p.name}
            <span className="num text-[0.7rem] opacity-70">{p.count}</span>
          </button>
        ))}

        <div className="ml-auto flex items-center gap-1 rounded-full border border-hair bg-surface-3 p-1">
          {(["grid", "list"] as const).map((v) => {
            const Icon = v === "grid" ? LayoutGrid : List;
            return (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-label={v}
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full transition-colors",
                  view === v ? "bg-surface text-ink shadow-[var(--sh-1)]" : "text-muted hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
              </button>
            );
          })}
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 items-start gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {pillar === "todos" && <DropZone />}
          {filtered.map((a) => (
            <AssetTile key={a.id} asset={a} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-hair">
          {filtered.map((a, i) => (
            <div
              key={a.id}
              className={cn(
                "flex items-center gap-4 px-4 py-3 text-[0.86rem]",
                i % 2 ? "bg-surface/40" : "",
              )}
            >
              <span
                className="h-8 w-8 shrink-0 rounded-md"
                style={{ background: "linear-gradient(145deg,var(--brand),var(--brand-2))" }}
              />
              <span className="flex-1 truncate font-mono text-muted">{a.name}</span>
              <span className="label-mono w-32 truncate">{a.pillar}</span>
              <span className="num w-12 text-faint">{a.ratio}</span>
              <span className={cn("w-20 text-right text-[0.68rem]", a.synced ? "text-positive" : "text-warn")}>
                {a.synced ? "Sync" : "Pendiente"}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
