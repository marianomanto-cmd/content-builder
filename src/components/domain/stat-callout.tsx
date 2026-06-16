import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCallout({
  label,
  value,
  suffix,
  trend,
  hint,
  className,
}: {
  label: string;
  value: React.ReactNode;
  suffix?: string;
  trend?: number;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="label-mono">{label}</span>
      <span className="serif num text-[2.7rem] leading-[0.9] text-ink">
        {value}
        {suffix && <span className="ml-1 text-[1.1rem] text-muted">{suffix}</span>}
      </span>
      {typeof trend === "number" && (
        <span className="inline-flex items-center gap-1 font-mono text-[0.66rem] font-medium tracking-[0.08em] text-positive">
          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.2} />
          +{trend}% vs. mes previo
        </span>
      )}
      {hint && <span className="text-[0.72rem] text-faint">{hint}</span>}
    </div>
  );
}
