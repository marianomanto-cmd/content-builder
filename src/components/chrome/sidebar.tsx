"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Images,
  LayoutDashboard,
  LayoutGrid,
  LibraryBig,
  Palette,
  Settings,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useBrand } from "@/lib/brand-context";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

interface NavEntry {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

const PRIMARY: NavEntry[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/studio", label: "Studio", icon: Sparkles, badge: "AI" },
  { href: "/biblioteca", label: "Biblioteca", icon: LibraryBig },
  { href: "/outputs", label: "Outputs", icon: Images },
  { href: "/calendario", label: "Calendario", icon: CalendarDays },
  { href: "/sistema", label: "Sistema de diseño", icon: Palette },
];

const SECONDARY: NavEntry[] = [
  { href: "/marcas", label: "Marcas", icon: LayoutGrid },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavItem({ href, label, icon: Icon, badge }: NavEntry) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={cn(
        "ring-focus group relative flex items-center gap-3 rounded-md px-3 py-2 text-[0.9rem] transition-colors duration-150",
        active ? "bg-surface-2 text-ink" : "text-muted hover:bg-surface/50 hover:text-ink",
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-accent shadow-[var(--glow-accent)]" />
      )}
      <Icon
        className={cn("h-[18px] w-[18px] shrink-0", active && "text-ink")}
        strokeWidth={1.75}
      />
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="rounded-full bg-accent-soft px-1.5 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-accent">
          {badge}
        </span>
      )}
    </Link>
  );
}

function UserChip() {
  const { brands } = useBrand();
  return (
    <div className="mt-2 flex items-center gap-3 border-t border-hair px-1 pt-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-3 font-mono text-[0.7rem] font-semibold tracking-[0.06em] text-ink">
        VS
      </span>
      <div className="min-w-0">
        <div className="truncate text-[0.85rem] text-ink">Valentina S.</div>
        <div className="label-mono truncate text-[0.58rem]">
          {brands.length} marcas · Plan Studio
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { brand } = useBrand();
  return (
    <aside
      className="hidden h-screen w-[248px] shrink-0 flex-col gap-6 border-r border-hair px-4 py-5 nav:flex"
      style={{ background: "linear-gradient(180deg,#0c0a13,var(--bg))" }}
    >
      <Logo />
      <div className="label-mono -mt-2 px-1">
        <span className="text-accent">{brand.name}</span> · Workspace
      </div>
      <nav className="flex flex-col gap-1">
        {PRIMARY.map((e) => (
          <NavItem key={e.href} {...e} />
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-1">
        {SECONDARY.map((e) => (
          <NavItem key={e.href} {...e} />
        ))}
        <UserChip />
      </div>
    </aside>
  );
}
