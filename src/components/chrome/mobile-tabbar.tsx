"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Home,
  Images,
  LibraryBig,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/biblioteca", label: "Assets", icon: LibraryBig },
  { href: "/studio", label: "Studio", icon: Sparkles, fab: true },
  { href: "/outputs", label: "Outputs", icon: Images },
  { href: "/calendario", label: "Plan", icon: CalendarDays },
];

export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav className="glass fixed inset-x-0 bottom-0 z-40 flex h-[68px] items-stretch justify-around border-t border-hair px-2 pb-[env(safe-area-inset-bottom)] nav:hidden">
      {ITEMS.map(({ href, label, icon: Icon, fab }) => {
        const active = pathname.startsWith(href);
        if (fab) {
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="relative -top-4 grid h-14 w-14 place-items-center self-center rounded-full bg-accent text-accent-ink shadow-[var(--glow-accent)]"
            >
              <Icon className="h-6 w-6" strokeWidth={2} />
            </Link>
          );
        }
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 text-[0.58rem] font-medium uppercase tracking-[0.1em]",
              active ? "text-accent" : "text-faint",
            )}
          >
            <Icon className="h-[20px] w-[20px]" strokeWidth={1.75} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
