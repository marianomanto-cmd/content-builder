export function Placeholder({ note }: { note?: string }) {
  return (
    <div className="relative grid min-h-[44vh] place-items-center overflow-hidden rounded-xl border border-hair bg-surface/60">
      <div className="aurora" />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <span className="relative grid h-12 w-12 place-items-center rounded-full border border-hair-strong">
          <span
            className="h-3.5 w-3.5 rounded-full bg-accent"
            style={{ boxShadow: "var(--glow-core)" }}
          />
        </span>
        <p className="label-mono">{note ?? "En construcción"}</p>
      </div>
    </div>
  );
}
