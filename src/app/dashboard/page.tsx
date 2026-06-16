"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/chrome/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StatCallout } from "@/components/domain/stat-callout";
import { BrandTile } from "@/components/domain/brand-tile";
import { Vortex } from "@/components/domain/vortex";
import { useBrand } from "@/lib/brand-context";
import { PLATFORM_VAR } from "@/lib/brands";
import { getEvents, getOutputs, STATUS_META } from "@/lib/data";

function TileHead({ title, href }: { title: string; href?: string }) {
  const body = (
    <>
      <span className="label-mono">{title}</span>
      {href && (
        <ArrowUpRight
          className="h-4 w-4 text-muted transition-colors group-hover:text-ink"
          strokeWidth={2}
        />
      )}
    </>
  );
  return href ? (
    <Link href={href} className="group mb-4 flex items-center justify-between">
      {body}
    </Link>
  ) : (
    <div className="mb-4 flex items-center justify-between">{body}</div>
  );
}

export default function DashboardPage() {
  const { brand } = useBrand();
  const outputs = getOutputs(brand).slice(0, 6);
  const upcoming = getEvents(brand, 2026, 5)
    .filter((e) => e.status === "scheduled" || e.status === "draft")
    .slice(0, 4);
  const maxPillar = Math.max(...brand.pillars.map((p) => p.count));

  return (
    <>
      <PageHeader
        eyebrow={`Dashboard · ${brand.name}`}
        title="Buen día, Valentina."
        lead={
          <>
            Hoy hay <em className="em-accent">movimiento</em> en {brand.name}.
          </>
        }
        actions={
          <>
            <Button asChild variant="outline" className="gap-1.5">
              <Link href="/calendario">
                <CalendarDays className="h-4 w-4" strokeWidth={2} />
                Ver calendario
              </Link>
            </Button>
            <Button asChild className="gap-1.5">
              <Link href="/studio">
                <Sparkles className="h-4 w-4" strokeWidth={2} />
                Abrir Studio
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {/* Studio hero */}
        <Card className="relative min-h-[320px] overflow-hidden sm:col-span-2 lg:col-span-7 lg:row-span-2">
          <div className="absolute inset-0 opacity-90">
            <Vortex density={80} />
          </div>
          <div className="scrim" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6 nav:p-7">
            <Eyebrow>Studio · Generación con IA</Eyebrow>
            <p className="serif mt-3.5 max-w-md text-[1.7rem] italic leading-[1.15] text-ink">
              “Hacé dos single image para Lifestyle”
            </p>
            <p className="mt-3 max-w-sm text-[0.9rem] leading-relaxed text-muted">
              La app combina tus assets y el sistema de diseño de {brand.name}{" "}
              para proponer imagen y copy listos para publicar.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button asChild className="gap-1.5">
                <Link href="/studio">
                  <Sparkles className="h-4 w-4" strokeWidth={2} />
                  Empezar a generar
                </Link>
              </Button>
              <Badge tone="glass">Nano Banana Pro · Kling 3.0</Badge>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <Card className="flex items-start justify-between gap-4 p-6 lg:col-span-5">
          <StatCallout
            label="Outputs · mes"
            value={brand.stats.outputsMonth}
            trend={brand.stats.trend}
          />
          <StatCallout
            label="Programadas"
            value={brand.stats.scheduled}
            hint="próximos 14 días"
          />
        </Card>

        {/* Design system snapshot */}
        <Card className="p-6 lg:col-span-5">
          <TileHead title="Sistema de diseño" href="/sistema" />
          <div className="flex gap-2">
            {[
              brand.tokens.ink,
              brand.tokens.primary,
              brand.tokens.accent,
              brand.tokens.tint,
              brand.tokens.paper,
            ].map((c, i) => (
              <div
                key={i}
                className="h-12 flex-1 rounded-md border border-hair"
                style={{ background: c }}
              />
            ))}
          </div>
          <div className="mt-5 flex items-end gap-5 text-ink">
            <span className="serif text-[2rem] leading-none">Aa</span>
            <span className="text-[1.6rem] leading-none">Aa</span>
            <span className="font-mono text-[1.3rem] leading-none">Aa</span>
            <span className="label-mono ml-auto">{brand.fontPair.display} · {brand.fontPair.body}</span>
          </div>
        </Card>

        {/* Library pillars */}
        <Card className="p-6 lg:col-span-4">
          <TileHead title="Biblioteca" href="/biblioteca" />
          <div className="flex flex-col gap-3">
            {brand.pillars.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="w-24 shrink-0 truncate text-[0.78rem] text-muted">
                  {p.name}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-3">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(p.count / maxPillar) * 100}%`,
                      background:
                        "linear-gradient(90deg, var(--brand-2), var(--brand))",
                    }}
                  />
                </div>
                <span className="num w-5 text-right text-[0.74rem] text-faint">
                  {p.count}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Latest outputs */}
        <Card className="p-6 sm:col-span-2 lg:col-span-8">
          <TileHead title="Últimos outputs" href="/outputs" />
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {outputs.map((o) => (
              <div key={o.id} className="flex flex-col gap-1.5">
                <BrandTile
                  ratio="1:1"
                  seed={o.id}
                  video={o.kind === "video"}
                  className="w-full"
                >
                  <span className="absolute right-1.5 top-1.5 z-10 rounded bg-black/45 px-1.5 py-0.5 font-mono text-[0.5rem] text-white/90 backdrop-blur-sm">
                    {o.ratio}
                  </span>
                </BrandTile>
                <span className="label-mono truncate text-[0.5rem]">{o.pillar}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming */}
        <Card className="p-6 sm:col-span-2 lg:col-span-12">
          <div className="mb-4 flex items-center justify-between">
            <span className="label-mono">Próximas publicaciones</span>
            <Button asChild size="sm" variant="ghost" className="gap-1.5">
              <Link href="/calendario?ideas=1">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                Tirame ideas
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {upcoming.map((e) => (
              <div
                key={e.id}
                className="flex items-center gap-3 border-b border-hair py-3 last:border-0"
              >
                <span
                  className="h-9 w-1 shrink-0 rounded-full"
                  style={{ background: PLATFORM_VAR[e.platform] }}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[0.88rem] text-ink">{e.title}</div>
                  <div className="label-mono text-[0.54rem]">
                    {e.day} jun · {e.time}
                  </div>
                </div>
                <Badge tone={e.status === "scheduled" ? "accent" : "data"}>
                  {STATUS_META[e.status].label}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
