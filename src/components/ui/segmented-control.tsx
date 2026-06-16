"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SegOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface Props<T extends string> {
  options: SegOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  className,
  size = "md",
}: Props<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-surface-3 p-1",
        className,
      )}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            onClick={() => onValueChange(o.value)}
            className={cn(
              "ring-focus inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-[0.1em] transition-all duration-150 ease-[var(--ease-converge)]",
              size === "sm" ? "px-2.5 py-1 text-[0.6rem]" : "px-3.5 py-1.5 text-[0.64rem]",
              active
                ? "bg-surface text-ink shadow-[var(--sh-1)]"
                : "text-muted hover:text-ink",
            )}
          >
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
