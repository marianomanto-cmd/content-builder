"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BRANDS, type Brand } from "./brands";

interface BrandContextValue {
  brand: Brand;
  brandId: string;
  setBrandId: (id: string) => void;
  brands: Brand[];
}

const BrandContext = createContext<BrandContextValue | null>(null);
const STORAGE_KEY = "cb.activeBrand";

export function BrandProvider({
  brands = BRANDS,
  children,
}: {
  brands?: Brand[];
  children: React.ReactNode;
}) {
  const [brandId, setBrandIdState] = useState<string>(brands[0]?.id ?? "lumen");

  // Hydrate persisted selection
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && brands.some((b) => b.id === saved)) setBrandIdState(saved);
    } catch {
      /* ignore */
    }
  }, [brands]);

  const brand = brands.find((b) => b.id === brandId) ?? brands[0];

  // Re-theme the whole document (incl. portals) when the brand changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--brand", brand.brand);
    root.style.setProperty("--brand-2", brand.brand2);
  }, [brand]);

  const setBrandId = useCallback((id: string) => {
    setBrandIdState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <BrandContext.Provider value={{ brand, brandId, setBrandId, brands }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
