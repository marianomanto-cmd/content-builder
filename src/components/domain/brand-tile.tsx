"use client";

import { useRef, useState } from "react";
import { RATIO_DIMS, type Ratio } from "@/lib/brands";
import { stockPhoto, stockVideo } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * A media tile backed by free stock photos (and optional hover-play video),
 * with a subtle brand wash so each workspace's color still comes through.
 */
export function BrandTile({
  ratio = "1:1",
  seed = "",
  video = false,
  tint = true,
  className,
  children,
}: {
  ratio?: Ratio;
  seed?: string;
  video?: boolean;
  tint?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  const vref = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    if (!video) return;
    setActive(true);
    vref.current?.play().catch(() => {});
  };
  const onLeave = () => {
    if (!video) return;
    setActive(false);
    vref.current?.pause();
  };

  return (
    <div
      className={cn("relative overflow-hidden rounded-md bg-surface-2", className)}
      style={{ aspectRatio: `${RATIO_DIMS[ratio].w} / ${RATIO_DIMS[ratio].h}` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={stockPhoto(seed, ratio)}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {video && (
        <video
          ref={vref}
          src={stockVideo(seed)}
          muted
          loop
          playsInline
          preload="none"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0",
          )}
        />
      )}
      {tint && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{ background: "linear-gradient(140deg, var(--brand), var(--brand-2))" }}
        />
      )}
      {children}
    </div>
  );
}
