"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BRANDS, type Brand } from "./brands";
import { loadOverrides, saveOverride } from "./brand-overrides";
import { persistBrand } from "./supabase/persist";

interface BrandContextValue {
  brand: Brand;
  brandId: string;
  setBrandId: (id: string) => void;
  brands: Brand[];
  updateBrand: (id: string, patch: Partial<Brand>) => void;
  addBrand: (brand: Brand) => void;
}

const BrandContext = createContext<BrandContextValue | null>(null);
const STORAGE_KEY = "cb.activeBrand";

export function BrandProvider({
  brands: initialBrands = BRANDS,
  children,
}: {
  brands?: Brand[];
  children: React.ReactNode;
}) {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [brandId, setBrandIdState] = useState<string>(
    initialBrands[0]?.id ?? "lumen",
  );

  // Hydrate persisted selection + local design-system overrides
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && initialBrands.some((b) => b.id === saved)) {
        setBrandIdState(saved);
      }
    } catch {
      /* ignore */
    }
    const overrides = loadOverrides();
    if (Object.keys(overrides).length) {
      setBrands((cur) =>
        cur.map((b) => (overrides[b.id] ? { ...b, ...overrides[b.id] } : b)),
      );
    }
  }, [initialBrands]);

  const brand = brands.find((b) => b.id === brandId) ?? brands[0];

  // Re-theme the whole document (incl. portals) when the active brand changes
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

  const updateBrand = useCallback((id: string, patch: Partial<Brand>) => {
    setBrands((cur) => cur.map((b) => (b.id === id ? { ...b, ...patch } : b)));
    saveOverride(id, patch); // local, authoritative for the session
    persistBrand(id, patch); // best-effort cross-device when Supabase is configured
  }, []);

  const addBrand = useCallback((b: Brand) => {
    setBrands((cur) => (cur.some((x) => x.id === b.id) ? cur : [...cur, b]));
  }, []);

  return (
    <BrandContext.Provider
      value={{ brand, brandId, setBrandId, brands, updateBrand, addBrand }}
    >
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
