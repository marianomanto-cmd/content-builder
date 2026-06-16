"use client";

import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown, Plus } from "lucide-react";
import { useBrand } from "@/lib/brand-context";
import { cn } from "@/lib/utils";

export function BrandMono({
  brand,
  brand2,
  mono,
  size = 36,
  className,
}: {
  brand: string;
  brand2: string;
  mono: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-[10px] font-mono font-semibold tracking-[0.04em] text-[#0a0810]",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: `linear-gradient(145deg, ${brand}, ${brand2})`,
        boxShadow: `0 0 18px color-mix(in srgb, ${brand} 36%, transparent)`,
      }}
    >
      {mono}
    </span>
  );
}

export function BrandSelector() {
  const { brand, brands, setBrandId } = useBrand();
  const router = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="ring-focus group flex items-center gap-2.5 rounded-full border border-hair bg-surface-2 py-1.5 pl-1.5 pr-3 transition-colors hover:border-hair-strong">
          <BrandMono brand={brand.brand} brand2={brand.brand2} mono={brand.mono} size={32} />
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[0.92rem] font-medium text-ink">{brand.name}</span>
            <span className="label-mono hidden text-[0.54rem] sm:block">
              {brand.category}
            </span>
          </span>
          <ChevronDown
            className="ml-0.5 h-4 w-4 text-muted transition-transform group-data-[state=open]:rotate-180"
            strokeWidth={2}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          className="glass z-50 w-[280px] rounded-xl border border-hair-strong p-1.5 shadow-[var(--sh-pop)] data-[state=open]:anim-rise"
        >
          <div className="label-mono px-2.5 py-2 text-[0.56rem]">Tus marcas</div>
          {brands.map((b) => {
            const active = b.id === brand.id;
            return (
              <DropdownMenu.Item
                key={b.id}
                onSelect={() => setBrandId(b.id)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 outline-none transition-colors data-[highlighted]:bg-surface-2",
                  active && "bg-surface-2",
                )}
              >
                <BrandMono brand={b.brand} brand2={b.brand2} mono={b.mono} size={30} />
                <span className="flex min-w-0 flex-1 flex-col leading-tight">
                  <span className="truncate text-[0.9rem] text-ink">{b.name}</span>
                  <span className="label-mono truncate text-[0.54rem]">{b.category}</span>
                </span>
                {active && <Check className="h-4 w-4 text-accent" strokeWidth={2.5} />}
              </DropdownMenu.Item>
            );
          })}
          <DropdownMenu.Separator className="my-1.5 h-px bg-[var(--border)]" />
          <DropdownMenu.Item
            onSelect={() => router.push("/marcas?new=1")}
            className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-muted outline-none transition-colors data-[highlighted]:bg-surface-2 data-[highlighted]:text-ink"
          >
            <span className="grid h-[30px] w-[30px] place-items-center rounded-[10px] border border-dashed border-hair-strong">
              <Plus className="h-4 w-4" strokeWidth={2} />
            </span>
            <span className="text-[0.9rem]">Nueva marca</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
