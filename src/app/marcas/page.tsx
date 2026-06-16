"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/chrome/page-header";
import { Button } from "@/components/ui/button";
import { AddBrandTile, BrandCard } from "@/components/domain/brand-card";
import { BRANDS } from "@/lib/brands";

export default function MarcasPage() {
  const addBrand = () =>
    toast("Nueva marca", {
      description: "El flujo de onboarding de marca llega pronto.",
    });

  return (
    <>
      <PageHeader
        eyebrow="Tus marcas"
        title={
          <>
            6 marcas, un mismo <em>estudio</em>.
          </>
        }
        lead="Cada marca trae su sistema de diseño y su biblioteca. Elegí una y todo se re-contextualiza."
        actions={
          <Button onClick={addBrand} className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Nueva marca
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BRANDS.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
        <AddBrandTile onClick={addBrand} />
      </div>
    </>
  );
}
