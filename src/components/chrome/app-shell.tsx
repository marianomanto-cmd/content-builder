"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { MobileTabBar } from "./mobile-tabbar";
import { CommandPalette } from "./command-palette";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenCommand={() => setCmdOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-[88px] nav:pb-0">
          <div className="mx-auto w-full max-w-[1200px] px-5 py-8 nav:px-10 nav:py-10">
            {children}
          </div>
        </main>
      </div>
      <MobileTabBar />
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  );
}
