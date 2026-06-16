"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/chrome/page-header";
import { Button } from "@/components/ui/button";
import { AddBrandTile, BrandCard } from "@/components/domain/brand-card";
import { NewBrandDialog } from "@/components/domain/new-brand-dialog";
import { useBrand } from "@/lib/brand-context";

export default function MarcasPage() {
  const { brands } = useBrand();
  const [newOpen, setNewOpen] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("new")
    ) {
      setNewOpen(true);
    }
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Tus marcas"
        title={
          <>
            {brands.length} {brands.length === 1 ? "marca" : "marcas"}, un mismo{" "}
            <em className="em-accent">estudio</em>.
          </>
        }
        lead="Cada marca trae su sistema de diseño y su biblioteca. Elegí una y todo se re-contextualiza."
        actions={
          <Button onClick={() => setNewOpen(true)} className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Nueva marca
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
        <AddBrandTile onClick={() => setNewOpen(true)} />
      </div>

      <NewBrandDialog open={newOpen} onOpenChange={setNewOpen} />
    </>
  );
}
