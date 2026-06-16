import { cn } from "@/lib/utils";

/** The incandescent core mark + CONTENT / BUILDER wordmark. */
export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-hair-strong">
        <span
          className="h-[11px] w-[11px] rounded-full bg-accent"
          style={{ boxShadow: "var(--glow-core)" }}
        />
        <span className="absolute h-px w-6 bg-accent-glow/70 blur-[1px]" />
      </span>
      {!compact && (
        <div className="font-mono text-[0.72rem] font-medium leading-[1.05] tracking-[0.22em]">
          <div className="text-ink">CONTENT</div>
          <div className="text-muted">BUILDER</div>
        </div>
      )}
    </div>
  );
}
