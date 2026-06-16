import { RATIO_DIMS, type Ratio } from "@/lib/brands";
import { cn, seeded } from "@/lib/utils";

/**
 * A brand-tinted gradient surface — stands in for generated imagery.
 * Pulls from --brand / --brand-2 so it re-themes with the active workspace.
 */
export function BrandTile({
  ratio,
  seed = "",
  className,
  children,
}: {
  ratio?: Ratio;
  seed?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const px = 18 + Math.floor(seeded(seed + "x") * 64);
  const py = 14 + Math.floor(seeded(seed + "y") * 60);
  const angle = Math.floor(seeded(seed + "a") * 360);
  return (
    <div
      className={cn("relative overflow-hidden rounded-md", className)}
      style={{
        aspectRatio: ratio
          ? `${RATIO_DIMS[ratio].w} / ${RATIO_DIMS[ratio].h}`
          : undefined,
        background: `radial-gradient(120% 120% at ${px}% ${py}%, color-mix(in srgb, var(--brand) 82%, white 8%), var(--brand-2) 98%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(${angle}deg, transparent, color-mix(in srgb, var(--brand-2) 55%, transparent))`,
        }}
      />
      {children}
    </div>
  );
}
