import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  lead,
  actions,
  className,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "mb-9 flex flex-col gap-5 nav:flex-row nav:items-end nav:justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-3.5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="serif text-[clamp(1.9rem,3.1vw,2.7rem)] leading-[1.0]">
          {title}
        </h1>
        {lead && (
          <p className="max-w-xl text-[1.02rem] leading-[1.55] text-muted">
            {lead}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2.5">{actions}</div>
      )}
    </header>
  );
}
