"use client";

import { AlertTriangle, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BrandTile } from "./brand-tile";
import { type AssetItem } from "@/lib/data";

export function AssetTile({ asset }: { asset: AssetItem }) {
  return (
    <div className="group flex cursor-grab flex-col gap-1.5 active:cursor-grabbing">
      <BrandTile
        ratio={asset.ratio}
        seed={asset.id}
        video={asset.isVideo}
        className="w-full transition-transform group-hover:-translate-y-0.5"
      >
        <Badge tone="glass" className="absolute left-2 top-2">
          {asset.pillar}
        </Badge>
        {!asset.synced && (
          <span
            className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-black/55 text-warn backdrop-blur-sm"
            title="Sin sincronizar"
          >
            <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        )}
        {asset.isVideo && (
          <span className="pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-200 group-hover:opacity-0">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm">
              <Play className="h-4 w-4 translate-x-px fill-white" strokeWidth={0} />
            </span>
          </span>
        )}
        <span className="absolute bottom-2 right-2 rounded bg-black/45 px-1.5 py-0.5 font-mono text-[0.5rem] text-white/90 backdrop-blur-sm">
          {asset.ratio}
        </span>
      </BrandTile>
      <span className="truncate font-mono text-[0.7rem] text-muted">{asset.name}</span>
    </div>
  );
}
