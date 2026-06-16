"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "ring-focus peer inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer items-center rounded-full border border-hair transition-colors duration-200 data-[state=checked]:bg-accent data-[state=unchecked]:bg-surface-3",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-[16px] w-[16px] translate-x-[3px] rounded-full bg-[var(--text)] shadow-[var(--sh-1)] transition-transform duration-200 data-[state=checked]:translate-x-[21px] data-[state=checked]:bg-[var(--accent-ink)]",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";
