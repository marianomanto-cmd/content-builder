import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "accent" | "data" | "brand" | "glass" | "positive" | "solid";

const TONES: Record<Tone, string> = {
  default: "border border-hair text-muted",
  accent:
    "text-accent border border-[color-mix(in_srgb,var(--accent)_34%,transparent)] bg-accent-soft",
  data: "text-viz border border-[color-mix(in_srgb,var(--viz)_34%,transparent)] bg-[var(--viz-soft)]",
  brand:
    "text-[var(--brand)] border border-[color-mix(in_srgb,var(--brand)_34%,transparent)] bg-[color-mix(in_srgb,var(--brand)_13%,transparent)]",
  glass: "glass text-ink",
  positive:
    "text-positive border border-[color-mix(in_srgb,var(--positive)_34%,transparent)] bg-[var(--positive-soft)]",
  solid: "bg-ink text-bg",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.62rem] font-medium uppercase leading-none tracking-[0.12em]",
        TONES[tone],
        className,
      )}
      {...props}
    />
  );
}
