"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BrandMono } from "@/components/chrome/brand-selector";
import { useBrand } from "@/lib/brand-context";
import { autoMono } from "@/lib/brand-defaults";

const inputCls =
  "w-full rounded-md border border-hair bg-bg px-3 py-2.5 text-[0.92rem] text-ink outline-none transition-colors focus:border-hair-strong placeholder:text-faint";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="label-mono text-[0.54rem]">{label}</span>
      {children}
    </label>
  );
}

function ColorPick({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2 rounded-md border border-hair bg-bg px-2 py-1.5">
        <label className="relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-md border border-hair">
          <span className="absolute inset-0" style={{ background: value }} />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="w-full bg-transparent font-mono text-[0.78rem] uppercase text-muted outline-none focus:text-ink"
        />
      </div>
    </Field>
  );
}

export function NewBrandDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const { addBrand, setBrandId } = useBrand();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [mono, setMono] = useState("");
  const [brand, setBrand] = useState("#5b8def");
  const [brand2, setBrand2] = useState("#2b4acb");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setName("");
      setCategory("");
      setMono("");
      setBrand("#5b8def");
      setBrand2("#2b4acb");
    }
  }, [open]);

  const effectiveMono = (mono || autoMono(name || "")).toUpperCase().slice(0, 2);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Poné un nombre para la marca.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/brands", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, category, mono: effectiveMono, brand, brand2 }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo crear la marca.");
      addBrand(data);
      setBrandId(data.id);
      onOpenChange(false);
      toast.success(`Marca "${data.name}" creada`);
      router.push("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al crear la marca.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,460px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-hair-strong bg-surface p-6 shadow-[var(--sh-pop)] data-[state=open]:anim-rise">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="label-mono">Nueva marca</span>
              <Dialog.Title className="serif text-[1.5rem] leading-none">
                Sumá un cliente
              </Dialog.Title>
            </div>
            <Dialog.Close
              aria-label="Cerrar"
              className="grid h-8 w-8 place-items-center rounded-full border border-hair text-muted transition-colors hover:text-ink"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </Dialog.Close>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <Field label="Nombre">
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Acme"
                className={inputCls}
              />
            </Field>
            <Field label="Categoría">
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Skincare, Fintech, Fitness…"
                className={inputCls}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <ColorPick label="Color primario" value={brand} onChange={setBrand} />
              <ColorPick label="Color oscuro" value={brand2} onChange={setBrand2} />
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-hair bg-surface-2 p-3">
              <BrandMono brand={brand} brand2={brand2} mono={effectiveMono} size={40} />
              <div className="min-w-0">
                <div className="truncate text-[0.92rem] text-ink">{name || "Tu marca"}</div>
                <div className="label-mono text-[0.54rem]">
                  {category || "Categoría"} · {effectiveMono}
                </div>
              </div>
              <input
                value={mono}
                onChange={(e) => setMono(e.target.value.toUpperCase().slice(0, 2))}
                placeholder="Mono"
                maxLength={2}
                aria-label="Monograma"
                className="ml-auto w-14 rounded-md border border-hair bg-bg px-2 py-1.5 text-center font-mono text-[0.8rem] uppercase text-ink outline-none focus:border-hair-strong"
              />
            </div>

            <div className="mt-1 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saving} className="gap-1.5">
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                )}
                Crear marca
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
