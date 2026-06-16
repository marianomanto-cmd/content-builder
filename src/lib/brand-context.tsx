"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BRANDS, DEFAULT_BRAND_ID, getBrand, type Brand } from "./brands";

interface BrandContextValue {
  brand: Brand;
  brandId: string;
  setBrandId: (id: string) => void;
  brands: Brand[];
}

const BrandContext = createContext<BrandContextValue | null>(null);
const STORAGE_KEY = "cb.activeBrand";

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brandId, setBrandIdState] = useState<string>(DEFAULT_BRAND_ID);

  // Hydrate persisted selection
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && BRANDS.some((b) => b.id === saved)) setBrandIdState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const brand = getBrand(brandId);

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
    <BrandContext.Provider value={{ brand, brandId, setBrandId, brands: BRANDS }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
