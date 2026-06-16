"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ChevronDown,
  GalleryHorizontalEnd,
  Image as ImageIcon,
  Sparkles,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/chrome/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Switch } from "@/components/ui/switch";
import { GeneratingState } from "@/components/domain/generating-state";
import { ProposalImage } from "@/components/domain/proposal-image";
import { ProposalCopy } from "@/components/domain/proposal-copy";
import { useBrand } from "@/lib/brand-context";
import { getCopyProposals } from "@/lib/data";
import { cn } from "@/lib/utils";
import { type Ratio } from "@/lib/brands";

type GenType = "single" | "carrusel" | "video";
type Phase = "idle" | "generating" | "done";

const FORMATS: { id: string; label: string; short: string; ratio: Ratio }[] = [
  { id: "feed", label: "Feed 4:5", short: "4:5", ratio: "4:5" },
  { id: "square", label: "Cuadrado", short: "1:1", ratio: "1:1" },
  { id: "story", label: "Story 9:16", short: "9:16", ratio: "9:16" },
  { id: "horizontal", label: "Horizontal", short: "16:9", ratio: "16:9" },
];
const COUNTS = [1, 2, 3, 4, 6];

export default function StudioPage() {
  const { brand } = useBrand();
  const [type, setType] = useState<GenType>("single");
  const [pillarName, setPillarName] = useState<string>(
    brand.pillars[1]?.name ?? brand.pillars[0].name,
  );
  const [count, setCount] = useState(2);
  const [format, setFormat] = useState(FORMATS[0]);
  const [voiceover, setVoiceover] = useState(false);
  const [music, setMusic] = useState(true);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState({ count: 2, format: FORMATS[0] });

  const activePillar =
    brand.pillars.find((p) => p.name === pillarName) ?? brand.pillars[0];

  const generate = () => {
    setResult({ count, format });
    setPhase("generating");
    window.setTimeout(() => {
      setPhase("done");
      toast.success(`${count} ${count === 1 ? "propuesta lista" : "propuestas listas"}`);
    }, 2600);
  };

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.08em] transition-all",
      active
        ? "border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-accent-soft text-accent"
        : "border-hair text-muted hover:border-hair-strong hover:text-ink",
    );

  return (
    <>
      <PageHeader
        eyebrow={`Studio · ${brand.name}`}
        title={
          <span className="text-center nav:text-left">
            ¿Qué creamos hoy para <em className="em-accent">{brand.name}</em>?
          </span>
        }
      />

      {/* Composer */}
      <div className="rounded-xl border border-hair bg-surface p-1.5 shadow-[var(--sh-2)]">
        <div className="rounded-[16px] border border-hair bg-bg/40 p-5">
          <textarea
            defaultValue={`Hacé ${count} ${type === "single" ? "single image" : type} para el pilar ${activePillar.name}, formato ${format.label}, con foco en la rutina de noche.`}
            rows={2}
            className="w-full resize-none bg-transparent text-[1.05rem] leading-relaxed text-ink caret-[color:var(--accent)] outline-none placeholder:text-faint"
            placeholder={`Describí qué querés crear para ${brand.name}…`}
          />

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-hair pt-4">
            <SegmentedControl<GenType>
              value={type}
              onValueChange={setType}
              options={[
                { value: "single", label: "Single", icon: <ImageIcon className="h-3.5 w-3.5" strokeWidth={2} /> },
                { value: "carrusel", label: "Carrusel", icon: <GalleryHorizontalEnd className="h-3.5 w-3.5" strokeWidth={2} /> },
                { value: "video", label: "Video", icon: <Video className="h-3.5 w-3.5" strokeWidth={2} /> },
              ]}
            />

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="ring-focus flex items-center gap-2 rounded-full border border-hair bg-surface-3 px-3.5 py-1.5 text-[0.82rem] text-ink transition-colors hover:border-hair-strong">
                  <span className="h-2 w-2 rounded-full" style={{ background: "var(--brand)" }} />
                  {activePillar.name}
                  <ChevronDown className="h-3.5 w-3.5 text-muted" strokeWidth={2} />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="start"
                  sideOffset={6}
                  className="glass z-50 w-52 rounded-xl border border-hair-strong p-1.5 shadow-[var(--sh-pop)]"
                >
                  <div className="label-mono px-2.5 py-1.5 text-[0.54rem]">Pilar</div>
                  {brand.pillars.map((p) => (
                    <DropdownMenu.Item
                      key={p.id}
                      onSelect={() => setPillarName(p.name)}
                      className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-[0.85rem] text-ink outline-none data-[highlighted]:bg-surface-2"
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: "var(--brand)" }} />
                      {p.name}
                      <span className="num ml-auto text-[0.7rem] text-faint">{p.count}</span>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {type === "video" && (
              <div className="flex flex-wrap items-center gap-4 rounded-full border border-hair bg-surface-3 px-4 py-2">
                <span className="label-mono text-[0.56rem]">Animar imagen</span>
                <label className="flex cursor-pointer items-center gap-2 text-[0.78rem] text-muted">
                  <Switch checked={voiceover} onCheckedChange={setVoiceover} />
                  Voiceover
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-[0.78rem] text-muted">
                  <Switch checked={music} onCheckedChange={setMusic} />
                  Música
                </label>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="label-mono">Propuestas</span>
              <div className="flex items-center gap-1.5">
                {COUNTS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCount(c)}
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full font-mono text-[0.74rem] transition-all",
                      c === count
                        ? "bg-accent text-accent-ink shadow-[var(--glow-accent)]"
                        : "border border-hair text-muted hover:text-ink",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={generate} className="gap-1.5">
              <Sparkles className="h-4 w-4" strokeWidth={2} />
              Generar
            </Button>
          </div>
        </div>
      </div>

      {/* Format row */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="label-mono mr-1">Formato</span>
        {FORMATS.map((f) => (
          <button key={f.id} onClick={() => setFormat(f)} className={chip(f.id === format.id)}>
            {f.label}
          </button>
        ))}
      </div>

      {/* State area */}
      <div className="mt-9">
        {phase === "idle" && (
          <div className="anim-rise">
            <div className="mb-5 flex flex-wrap gap-2">
              {[
                `3 single image para ${brand.pillars[0].name}`,
                `Carrusel de 4 para ${brand.pillars[1]?.name ?? brand.pillars[0].name}`,
                "Animar tu último hero a video",
              ].map((s) => (
                <button key={s} className={chip(false)}>
                  {s}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass rounded-lg p-5">
                <div className="label-mono mb-2">Usa tus assets</div>
                <p className="text-[0.88rem] leading-relaxed text-muted">
                  Combina los {brand.stats.assets} archivos de tu biblioteca,
                  categorizados por pilar, para que cada propuesta sea fiel a {brand.name}.
                </p>
              </div>
              <div className="glass rounded-lg p-5">
                <div className="label-mono mb-2">Respeta el sistema de diseño</div>
                <p className="text-[0.88rem] leading-relaxed text-muted">
                  Paleta, tipografía y voz de {brand.name} se aplican automáticamente a
                  imagen y copy.
                </p>
              </div>
            </div>
          </div>
        )}

        {phase === "generating" && <GeneratingState count={result.count} />}

        {phase === "done" && (
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="label-mono">
                {result.count} imágenes · {result.count} copys
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={generate}>
                  Regenerar todo
                </Button>
                <Button size="sm" onClick={() => toast.success("Todo guardado en Outputs")}>
                  Guardar todo
                </Button>
              </div>
            </div>
            <div className="grid gap-7 lg:grid-cols-2">
              <div>
                <div className="label-mono mb-3 flex items-center gap-2">
                  Imágenes <Badge tone="brand">{format.short}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: result.count }).map((_, i) => (
                    <ProposalImage
                      key={i}
                      index={i}
                      ratio={result.format.ratio}
                      format={result.format.short}
                      seed={`${brand.id}-prop-${i}-${result.format.id}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="label-mono mb-3">Copys</div>
                <div className="flex flex-col gap-3">
                  {getCopyProposals(result.count).map((p, i) => (
                    <ProposalCopy key={i} index={i} proposal={p} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
