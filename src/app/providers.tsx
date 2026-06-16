"use client";

import { Toaster } from "sonner";
import { BrandProvider } from "@/lib/brand-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrandProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--glass-fill)",
            backdropFilter: "var(--glass-blur)",
            border: "1px solid var(--border-strong)",
            color: "var(--text)",
            fontFamily: "var(--font-sans)",
            borderRadius: "14px",
          },
        }}
      />
    </BrandProvider>
  );
}
