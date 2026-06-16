"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function DropZone({ className }: { className?: string }) {
  const [over, setOver] = useState(false);
  return (
    <button
      onClick={() => toast("Subí archivos o pegá un link de Drive")}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        toast.success("Archivos en cola · se categorizan por pilar");
      }}
      className={cn(
        "flex min-h-[160px] flex-col items-center justify-center gap-2.5 rounded-md border border-dashed p-5 text-center transition-colors",
        over
          ? "border-accent bg-accent-soft/50 text-ink"
          : "border-hair-strong text-muted hover:border-accent hover:text-ink",
        className,
      )}
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-surface-3 text-accent">
        <Upload className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <span className="text-[0.84rem] text-ink">Arrastrá tus archivos</span>
      <span className="text-[0.72rem] leading-snug text-faint">
        o pegá un link de Drive · se categorizan por pilar
      </span>
    </button>
  );
}
