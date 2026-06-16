"use client";

import Link from "next/link";
import { Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandSelector } from "./brand-selector";

export function Topbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  return (
    <header className="glass sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-hair px-4 nav:px-6">
      <BrandSelector />

      <button
        onClick={onOpenCommand}
        className="ring-focus hidden h-10 max-w-md flex-1 items-center gap-2.5 rounded-full border border-hair bg-bg/60 px-4 text-left text-[0.85rem] text-faint transition-colors hover:border-hair-strong sm:flex"
      >
        <span className="flex-1">Buscar o ejecutar acción…</span>
        <kbd className="rounded border border-hair px-1.5 py-0.5 font-mono text-[0.6rem]">
          ⌘K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden items-center gap-2 rounded-full border border-hair bg-surface-2 px-3 py-2 font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-muted sm:flex">
          <span className="h-2 w-2 rounded-full bg-positive shadow-[0_0_8px_var(--positive)]" />
          Drive OK
        </span>

        <button
          aria-label="Notificaciones"
          className="ring-focus relative grid h-10 w-10 place-items-center rounded-full border border-hair bg-surface-2 text-muted transition-colors hover:text-ink"
        >
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent shadow-[var(--glow-accent)]" />
        </button>

        <Button asChild className="gap-1.5">
          <Link href="/studio">
            <Sparkles className="h-4 w-4" strokeWidth={2} />
            Generar
          </Link>
        </Button>
      </div>
    </header>
  );
}
