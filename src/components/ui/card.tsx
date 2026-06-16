import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-hair bg-surface",
        hover &&
          "cursor-pointer transition-all duration-200 ease-[var(--ease-converge)] hover:-translate-y-[3px] hover:border-hair-strong hover:shadow-[var(--sh-3)]",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";
