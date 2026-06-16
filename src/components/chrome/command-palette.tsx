"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import {
  CalendarDays,
  Images,
  LayoutDashboard,
  LayoutGrid,
  LibraryBig,
  Palette,
  Plus,
  Search,
  Settings,
  Sparkles,
  Video,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { useBrand } from "@/lib/brand-context";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const { brand, brands, setBrandId } = useBrand();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[3px] data-[state=open]:animate-[ignite_var(--dur-2)_var(--ease-out)]" />
        <Dialog.Content className="fixed left-1/2 top-[16%] z-50 w-[min(94vw,620px)] -translate-x-1/2 overflow-hidden rounded-xl border border-hair-strong bg-[var(--surface)] shadow-[var(--sh-pop)] data-[state=open]:anim-rise">
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Command
            className="[&_[cmdk-group-heading]]:label-mono"
            loop
          >
            <div className="flex items-center gap-3 border-b border-hair px-4">
              <Search className="h-4 w-4 text-muted" strokeWidth={2} />
              <Command.Input
                autoFocus
                placeholder="Buscar o ejecutar acción…"
                className="h-13 flex-1 bg-transparent py-4 text-[0.95rem] text-ink outline-none placeholder:text-faint"
              />
              <kbd className="hidden rounded border border-hair px-1.5 py-0.5 font-mono text-[0.6rem] text-faint sm:block">
                ESC
              </kbd>
            </div>
            <Command.List className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
              <Command.Empty className="px-3 py-8 text-center text-sm text-muted">
                Sin resultados.
              </Command.Empty>

              <Command.Group heading={`Acciones de IA · ${brand.name}`}>
                <Item icon={Sparkles} onSelect={() => go("/studio")}>
                  Generar single image
                </Item>
                <Item icon={Video} onSelect={() => go("/studio")}>
                  Animar a video
                </Item>
                <Item
                  icon={Wand2}
                  onSelect={() => {
                    onOpenChange(false);
                    router.push("/calendario?ideas=1");
                  }}
                >
                  Tirame ideas
                </Item>
              </Command.Group>

              <Command.Group heading="Ir a">
                <Item icon={LayoutDashboard} onSelect={() => go("/dashboard")}>
                  Dashboard
                </Item>
                <Item icon={Sparkles} onSelect={() => go("/studio")}>
                  Studio
                </Item>
                <Item icon={LibraryBig} onSelect={() => go("/biblioteca")}>
                  Biblioteca
                </Item>
                <Item icon={Images} onSelect={() => go("/outputs")}>
                  Outputs
                </Item>
                <Item icon={CalendarDays} onSelect={() => go("/calendario")}>
                  Calendario
                </Item>
                <Item icon={Palette} onSelect={() => go("/sistema")}>
                  Sistema de diseño
                </Item>
                <Item icon={LayoutGrid} onSelect={() => go("/marcas")}>
                  Marcas
                </Item>
                <Item icon={Plus} onSelect={() => go("/marcas?new=1")}>
                  Nueva marca
                </Item>
                <Item icon={Settings} onSelect={() => go("/settings")}>
                  Settings
                </Item>
              </Command.Group>

              <Command.Group heading="Cambiar de marca">
                {brands
                  .filter((b) => b.id !== brand.id)
                  .map((b) => (
                    <Command.Item
                      key={b.id}
                      value={`marca ${b.name}`}
                      onSelect={() => {
                        setBrandId(b.id);
                        onOpenChange(false);
                        toast(`Workspace: ${b.name}`, { description: b.category });
                      }}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-[0.92rem] text-ink outline-none data-[selected=true]:bg-surface-2"
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: b.brand }}
                      />
                      {b.name}
                      <span className="label-mono ml-auto text-[0.54rem]">
                        {b.category}
                      </span>
                    </Command.Item>
                  ))}
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Item({
  icon: Icon,
  children,
  onSelect,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-[0.92rem] text-ink outline-none data-[selected=true]:bg-surface-2"
    >
      <Icon className="h-[18px] w-[18px] text-muted" strokeWidth={1.75} />
      {children}
    </Command.Item>
  );
}
