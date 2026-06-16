"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/chrome/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useBrand } from "@/lib/brand-context";
import { PLATFORM_VAR } from "@/lib/brands";

const NETWORK_FORMATS = [
  { id: "instagram", label: "Instagram", ratio: "4:5" },
  { id: "tiktok", label: "TikTok", ratio: "9:16" },
  { id: "youtube", label: "YouTube", ratio: "16:9" },
] as const;

function Row({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-hair py-5 first:pt-0 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="text-[0.95rem] text-ink">{title}</div>
        {desc && <div className="mt-0.5 text-[0.8rem] text-muted">{desc}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { brand } = useBrand();
  const [count, setCount] = useState<"1" | "2" | "3" | "4" | "6">("2");
  const [voiceover, setVoiceover] = useState(false);
  const [music, setMusic] = useState(true);

  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title={
          <>
            Conexiones y <em className="em-accent">generación</em>
          </>
        }
      />

      <div className="flex max-w-3xl flex-col gap-4">
        {/* Drive */}
        <Card className="p-6">
          <div className="label-mono mb-4">Google Drive</div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 place-items-center rounded-md border border-hair bg-surface-3 font-mono text-[0.7rem] text-muted">
                Dr
              </span>
              <div>
                <div className="text-[0.95rem] text-ink">Drive de {brand.name}</div>
                <div className="mt-0.5 inline-flex items-center gap-2 text-[0.8rem] text-muted">
                  <span className="h-2 w-2 rounded-full bg-positive shadow-[0_0_8px_var(--positive)]" />
                  Conectado · sync cada 5 min · {brand.drive.files} archivos
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => toast("Drive desconectado", { description: "Reconectá cuando quieras." })}
            >
              Desconectar
            </Button>
          </div>
        </Card>

        {/* Generación */}
        <Card className="p-6">
          <div className="label-mono mb-2">Generación</div>
          <Row title="Propuestas por defecto" desc="Cuántas imágenes y copys genera cada pedido">
            <SegmentedControl<"1" | "2" | "3" | "4" | "6">
              value={count}
              onValueChange={setCount}
              options={["1", "2", "3", "4", "6"].map((n) => ({ value: n as never, label: n }))}
            />
          </Row>
          <Row title="Formato por red" desc="Relación de aspecto por defecto">
            <div className="flex flex-col gap-2">
              {NETWORK_FORMATS.map((n) => (
                <div
                  key={n.id}
                  className="flex w-56 items-center justify-between rounded-md border border-hair bg-surface-3 px-3 py-2"
                >
                  <span className="inline-flex items-center gap-2 text-[0.85rem] text-ink">
                    <span className="h-2 w-2 rounded-full" style={{ background: PLATFORM_VAR[n.id] }} />
                    {n.label}
                  </span>
                  <span className="num font-mono text-[0.74rem] text-faint">{n.ratio}</span>
                </div>
              ))}
            </div>
          </Row>
        </Card>

        {/* Video defaults */}
        <Card className="p-6">
          <div className="label-mono mb-2">Video por defecto</div>
          <Row title="Voiceover automático" desc="Narración generada con Kling 3.0">
            <Switch checked={voiceover} onCheckedChange={setVoiceover} />
          </Row>
          <Row title="Música de fondo" desc="Pista ambiente acorde a la marca">
            <Switch checked={music} onCheckedChange={setMusic} />
          </Row>
        </Card>
      </div>
    </>
  );
}
