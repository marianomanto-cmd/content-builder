"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BrandMono } from "@/components/chrome/brand-selector";
import { useBrand } from "@/lib/brand-context";
import { type Brand } from "@/lib/brands";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="num text-[1.05rem] font-semibold leading-none text-ink">
        {value}
      </span>
      <span className="label-mono text-[0.52rem]">{label}</span>
    </div>
  );
}

export function BrandCard({ brand }: { brand: Brand }) {
  const router = useRouter();
  const { brandId, setBrandId } = useBrand();
  const active = brand.id === brandId;

  const open = () => {
    setBrandId(brand.id);
    router.push("/dashboard");
  };

  return (
    <Card hover onClick={open} className="group overflow-hidden">
      <div
        className="relative h-28"
        style={{
          background: `linear-gradient(135deg, ${brand.brand2}, ${brand.brand})`,
        }}
      >
        <div className="aurora opacity-30" />
        <Badge tone="glass" className="absolute right-3 top-3">
          {brand.category}
        </Badge>
      </div>

      <div className="px-5 pb-5">
        <div className="-mt-7 mb-3.5 flex items-end justify-between">
          <BrandMono
            brand={brand.brand}
            brand2={brand.brand2}
            mono={brand.mono}
            size={54}
            className="ring-4 ring-[var(--surface)]"
          />
          {active && (
            <Badge tone="accent" className="mb-1.5">
              Activa
            </Badge>
          )}
        </div>

        <h3 className="serif text-[1.6rem] leading-none">{brand.name}</h3>
        <p className="mt-1.5 text-[0.86rem] leading-snug text-muted">
          {brand.tagline}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-hair pt-4">
          <div className="flex gap-6">
            <Stat label="Outputs" value={brand.stats.outputsMonth} />
            <Stat label="Assets" value={brand.stats.assets} />
            <Stat label="Pilares" value={brand.pillars.length} />
          </div>
          <ChevronRight
            className="h-5 w-5 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-ink"
            strokeWidth={2}
          />
        </div>
      </div>
    </Card>
  );
}

export function AddBrandTile({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="ring-focus group flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-hair-strong text-muted transition-colors hover:border-accent hover:text-ink"
    >
      <span className="grid h-12 w-12 place-items-center rounded-full border border-dashed border-hair-strong text-2xl transition-colors group-hover:border-accent">
        +
      </span>
      <span className="text-[0.9rem]">Agregar marca</span>
    </button>
  );
}
