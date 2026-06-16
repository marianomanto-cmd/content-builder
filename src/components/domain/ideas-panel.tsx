"use client";

import { Drawer } from "vaul";
import { Plus, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useBrand } from "@/lib/brand-context";
import { getIdeas } from "@/lib/data";
import { PLATFORM_LABEL } from "@/lib/brands";

const KIND_LABEL: Record<string, string> = {
  image: "Single",
  carousel: "Carrusel",
  video: "Video",
};

export function IdeasPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { brand } = useBrand();
  const ideas = getIdeas(brand);

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px]" />
        <Drawer.Content className="fixed bottom-0 right-0 top-0 z-50 flex w-[min(92vw,430px)] flex-col border-l border-hair-strong bg-surface outline-none">
          <div className="flex items-center justify-between border-b border-hair px-5 py-4">
            <Eyebrow>Ideas IA</Eyebrow>
            <Drawer.Close
              aria-label="Cerrar"
              className="grid h-8 w-8 place-items-center rounded-full border border-hair text-muted transition-colors hover:text-ink"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </Drawer.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <Drawer.Title className="serif text-[1.7rem] leading-tight text-ink">
              5 ideas para <em className="em-accent">{brand.name}</em>
            </Drawer.Title>
            <p className="mt-1.5 text-[0.86rem] text-muted">
              En base a lo que venís creando y los huecos del mes.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {ideas.map((idea) => (
                <div key={idea.id} className="rounded-lg border border-hair bg-surface-2 p-4">
                  <div className="label-mono flex items-center gap-2 text-[0.52rem]">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand)" }} />
                    {idea.pillar} · {PLATFORM_LABEL[idea.platform]} · {KIND_LABEL[idea.kind]}
                  </div>
                  <h4 className="serif mt-2 text-[1.18rem] leading-snug text-ink">
                    “{idea.hook}”
                  </h4>
                  <div className="mt-3.5 flex items-center justify-between">
                    <span className="label-mono text-[0.52rem]">Sug. {idea.suggestedDay}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                      onClick={() => toast.success(`Agendado · ${idea.suggestedDay}`)}
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                      Agregar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-hair p-5">
            <Button
              className="w-full gap-1.5"
              onClick={() => {
                onOpenChange(false);
                toast("Abriendo Studio con las 5 ideas…");
              }}
            >
              <Sparkles className="h-4 w-4" strokeWidth={2} />
              Crear todo en Studio
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
