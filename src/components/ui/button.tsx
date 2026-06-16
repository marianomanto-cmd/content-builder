"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "brand" | "outline" | "ghost" | "subtle";
type Size = "sm" | "md" | "lg" | "icon";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[var(--glow-accent)] hover:brightness-110 hover:-translate-y-px",
  brand:
    "bg-brand text-[#0a0810] shadow-[var(--glow-brand)] hover:brightness-110 hover:-translate-y-px",
  outline:
    "border border-hair-strong text-ink hover:border-ink hover:-translate-y-px",
  ghost: "glass text-ink hover:border-hair-strong hover:-translate-y-px",
  subtle:
    "bg-surface-3 text-muted hover:text-ink hover:bg-surface-2",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-[0.64rem]",
  md: "h-10 px-5 text-[0.69rem]",
  lg: "h-12 px-7 text-[0.73rem]",
  icon: "h-10 w-10 p-0 text-[0.69rem]",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "ring-focus inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-mono font-medium uppercase tracking-[0.06em] transition-all duration-150 ease-[var(--ease-converge)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
          VARIANTS[variant],
          SIZES[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
