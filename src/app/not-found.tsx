import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative grid min-h-[60vh] place-items-center overflow-hidden">
      <div className="aurora" />
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <span className="relative grid h-14 w-14 place-items-center rounded-full border border-hair-strong">
          <span
            className="h-4 w-4 rounded-full bg-accent"
            style={{ boxShadow: "var(--glow-core)" }}
          />
        </span>
        <p className="label-mono">Error 404</p>
        <h1 className="serif text-[clamp(1.8rem,3vw,2.4rem)] leading-tight">
          Esta página se <em className="em-accent">dispersó</em>.
        </h1>
        <p className="max-w-sm text-[0.95rem] text-muted">
          No encontramos lo que buscabas. Volvé al estudio y seguí creando.
        </p>
        <Button asChild>
          <Link href="/marcas">Volver a Marcas</Link>
        </Button>
      </div>
    </div>
  );
}
