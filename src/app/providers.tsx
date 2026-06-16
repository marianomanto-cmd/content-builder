"use client";

import { Toaster } from "sonner";
import { BrandProvider } from "@/lib/brand-context";
import { type Brand } from "@/lib/brands";

export function Providers({
  brands,
  children,
}: {
  brands?: Brand[];
  children: React.ReactNode;
}) {
  return (
    <BrandProvider brands={brands}>
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
